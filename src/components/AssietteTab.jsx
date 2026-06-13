import { useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { fichierVersImage, analyserAssiette } from '../analyseAssiette.js'

export default function AssietteTab() {
  const [apiKey] = useLocalStorage('forme:apikey', '')
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultat, setResultat] = useState(null)
  const [erreur, setErreur] = useState('')

  const onPhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setErreur('')
    setResultat(null)
    try {
      const img = await fichierVersImage(file)
      setPreview(img.preview)
      setLoading(true)
      const data = await analyserAssiette({ apiKey, base64: img.base64, mediaType: img.mediaType })
      setResultat(data)
    } catch (err) {
      setErreur(messageErreur(err))
    } finally {
      setLoading(false)
    }
  }

  // Pas de clé API → on explique gentiment
  if (!apiKey) {
    return (
      <div className="tabview">
        <div className="card info-box accent">
          <h3>📸 Analyse photo d’une assiette</h3>
          <p className="muted">
            Prends ton repas en photo et Claude (l’IA) te dit les aliments et les calories estimées.
          </p>
        </div>
        <div className="card info-box warn">
          <h3>🔑 Une petite étape avant</h3>
          <p className="muted" style={{ marginTop: -4 }}>
            Cette fonction utilise l’intelligence artificielle, qui demande une clé personnelle (gratuite à créer,
            quelques centimes par photo). Va dans l’onglet <strong>Profil 🌿</strong> → « Analyse photo » pour
            coller ta clé. Mathieu peut t’aider 😉
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="tabview">
      <div className="card info-box accent">
        <h3>📸 Analyse photo</h3>
        <p className="muted" style={{ marginTop: -4 }}>
          Prends ton assiette en photo : je liste les aliments et j’estime les calories.
        </p>
      </div>

      {erreur && <div className="analyse-error">{erreur}</div>}

      {!loading && (
        <button className={`shoot-btn ${resultat || preview ? 'secondary' : ''}`} onClick={() => fileRef.current?.click()}>
          <span className="shoot-ico">📷</span>
          <span>{resultat || preview ? 'Nouvelle photo' : 'Prendre / choisir une photo'}</span>
          {!(resultat || preview) && <small>l’appareil photo ou la galerie</small>}
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPhoto} hidden />

      {preview && <img className="photo-preview" src={preview} alt="assiette" />}

      {loading && (
        <div className="analyse-loading">
          <div className="spinner" />
          <span>Analyse en cours…</span>
        </div>
      )}

      {resultat && !loading && (
        <>
          <div className="card analyse-card">
            <h3 className="plat-title">{resultat.plat || 'Ton repas'}</h3>
            <ul className="aliment-list">
              {resultat.aliments.map((a, i) => (
                <li className="aliment-row" key={i}>
                  <span className="aliment-name">
                    {a.nom}
                    {a.quantite && <span className="aliment-qty"> · {a.quantite}</span>}
                  </span>
                  <span className="aliment-kcal">{a.calories} kcal</span>
                </li>
              ))}
            </ul>
            <div className="total-row">
              <span className="total-label">Total estimé</span>
              <span className="total-kcal">{resultat.total_calories} kcal</span>
            </div>
            {resultat.commentaire && <p className="commentaire">💬 {resultat.commentaire}</p>}
          </div>
          <p className="disclaimer">⚠️ Estimations indicatives d’après la photo — pas une mesure exacte.</p>
        </>
      )}
    </div>
  )
}

function messageErreur(err) {
  const m = String(err?.message || err)
  if (m.includes('401') || /authentication/i.test(m)) return '🔑 Clé API invalide. Vérifie-la dans Profil.'
  if (m.includes('429')) return '⏳ Trop de demandes d’un coup. Réessaie dans un instant.'
  if (m.includes('Image')) return '🖼️ Photo illisible. Réessaie avec une autre image.'
  if (/network|fetch|Failed/i.test(m)) return '📶 Pas de connexion. L’analyse photo a besoin d’internet.'
  return '😕 L’analyse a échoué. Réessaie dans un moment.'
}
