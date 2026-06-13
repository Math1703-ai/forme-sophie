// Sauvegarde / restauration de TOUTES les données de l'appli (localStorage).
// Important : sur un téléphone, vider le cache du navigateur efface les données.
// Un export régulier (bouton dans Profil) permet de ne rien perdre.

const PREFIX = 'forme:'

function isOurKey(k) {
  return k.startsWith(PREFIX)
}

export function exportData() {
  const data = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    // on exporte tout SAUF la clé API (secret à ne pas mettre dans un fichier partagé)
    if (k && isOurKey(k) && k !== 'forme:apikey') data[k] = localStorage.getItem(k)
  }
  return {
    app: 'forme-sophie',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  }
}

export function downloadBackup() {
  const payload = exportData()
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const d = new Date()
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  a.href = url
  a.download = `sophie-en-forme-sauvegarde-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function importData(json) {
  if (!json || json.app !== 'forme-sophie' || !json.data) {
    throw new Error('Fichier de sauvegarde invalide')
  }
  let count = 0
  for (const [k, v] of Object.entries(json.data)) {
    if (!isOurKey(k) || typeof v !== 'string') continue
    try {
      JSON.parse(v) // on n'importe que des valeurs JSON valides
      localStorage.setItem(k, v)
      count++
    } catch {
      /* valeur corrompue → ignorée */
    }
  }
  return count
}

export function importFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(importData(JSON.parse(reader.result)))
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = () => reject(new Error('Lecture du fichier impossible'))
    reader.readAsText(file)
  })
}

export function resetAll() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && isOurKey(k)) keys.push(k)
  }
  keys.forEach((k) => localStorage.removeItem(k))
  return keys.length
}
