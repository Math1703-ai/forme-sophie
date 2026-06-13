// ───────────────────────────────────────────────────────────
//  ANALYSE PHOTO D'UNE ASSIETTE → aliments + calories (via Claude)
//  Claude "regarde" la photo, liste les aliments et estime les calories.
// ───────────────────────────────────────────────────────────
import Anthropic from '@anthropic-ai/sdk'

// Modèle utilisé. Claude Opus 4.8 = la meilleure vision (lecture fine d'une assiette).
// Pour réduire le coût (~5× moins cher, un peu moins précis), remplace par 'claude-haiku-4-5'.
const MODEL = 'claude-opus-4-8'

// Schéma de la réponse attendue (Claude renvoie un JSON propre).
const SCHEMA = {
  type: 'object',
  properties: {
    plat: { type: 'string', description: 'Nom court du plat / repas vu sur la photo' },
    aliments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nom: { type: 'string' },
          quantite: { type: 'string', description: 'Portion estimée, ex : "1 part", "150 g", "1 bol"' },
          calories: { type: 'integer', description: 'Calories estimées de cet aliment (kcal)' },
        },
        required: ['nom', 'quantite', 'calories'],
        additionalProperties: false,
      },
    },
    total_calories: { type: 'integer' },
    commentaire: { type: 'string', description: '1 à 2 phrases bienveillantes en français, adaptées à un objectif d’affinement.' },
  },
  required: ['plat', 'aliments', 'total_calories', 'commentaire'],
  additionalProperties: false,
}

const SYSTEME = `Tu es un nutritionniste francophone bienveillant. On te montre la photo d'une assiette ou d'un repas.
Identifie chaque aliment visible, estime sa portion et ses calories (kcal). Calcule le total.
Sois réaliste : ce sont des estimations, pas des mesures exactes. En cas de doute, donne une fourchette moyenne.
Le commentaire (1 à 2 phrases, en français) est encourageant et adapté à un objectif d'affinement / perte de poids douce.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, exactement à ce format :
{"plat": "...", "aliments": [{"nom":"...","quantite":"...","calories": 0}], "total_calories": 0, "commentaire": "..."}`

// Réduit la photo (téléphone = grosses images) pour aller plus vite et coûter moins cher.
export function fichierVersImage(file, maxDim = 1024) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      const max = Math.max(width, height)
      if (max > maxDim) {
        const s = maxDim / max
        width = Math.round(width * s)
        height = Math.round(height * s)
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
      resolve({ base64: dataUrl.split(',')[1], mediaType: 'image/jpeg', preview: dataUrl })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Image illisible'))
    }
    img.src = url
  })
}

// Extraction défensive du JSON (au cas où Claude ajoute du texte autour).
function extraireJSON(texte) {
  if (!texte) throw new Error('Réponse vide')
  const debut = texte.indexOf('{')
  const fin = texte.lastIndexOf('}')
  if (debut === -1 || fin === -1) throw new Error('Réponse inattendue')
  return JSON.parse(texte.slice(debut, fin + 1))
}

export async function analyserAssiette({ apiKey, base64, mediaType }) {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEME,
    output_config: { format: { type: 'json_schema', schema: SCHEMA } },
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: 'Analyse cette assiette : liste les aliments avec leurs calories estimées et donne le total.' },
        ],
      },
    ],
  })

  const texte = response.content.find((b) => b.type === 'text')?.text
  const data = extraireJSON(texte)
  // petits garde-fous
  data.aliments = Array.isArray(data.aliments) ? data.aliments : []
  if (typeof data.total_calories !== 'number') {
    data.total_calories = data.aliments.reduce((s, a) => s + (Number(a.calories) || 0), 0)
  }
  return data
}
