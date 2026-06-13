import { useRef, useState } from 'react'
import { defaultProfile, besoinEau } from '../profile.js'
import { downloadBackup, importFromFile, resetAll } from '../storage.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function ProfilTab() {
  const p = defaultProfile
  const fileRef = useRef(null)
  const [toast, setToast] = useState('')
  const [apiKey, setApiKey] = useLocalStorage('forme:apikey', '')

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 3500) }

  const onImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const n = await importFromFile(file)
      flash(`✅ ${n} données restaurées. Recharge l’appli pour les voir.`)
    } catch {
      flash('❌ Fichier invalide.')
    }
    e.target.value = ''
  }

  const onReset = () => {
    if (confirm('Effacer toutes les données (séances, menus, eau, poids) ? Cette action est définitive.')) {
      const n = resetAll()
      flash(`🗑️ ${n} données effacées. Recharge l’appli.`)
    }
  }

  return (
    <div className="tabview">
      {/* Carte profil */}
      <div className="card">
        <div className="profile-head">
          <span className="avatar">S</span>
          <div className="profile-id">
            <strong>{p.prenom}</strong>
            <div className="obj">{p.objectif}</div>
          </div>
        </div>
        <div className="profile-grid">
          <div className="pf"><span className="pf-l">Âge</span><span className="pf-v">{p.age} ans</span></div>
          <div className="pf"><span className="pf-l">Taille</span><span className="pf-v">{p.taille} cm</span></div>
          <div className="pf"><span className="pf-l">Eau / jour</span><span className="pf-v">~{besoinEau(p.poidsDepart)} L</span></div>
          <div className="pf"><span className="pf-l">Séances</span><span className="pf-v">~30 min</span></div>
        </div>
        <div className="zones">
          <div className="zone"><div className="zt">Zones ciblées</div><div className="zv">🍑 Cuisses & fesses</div></div>
          <div className="zone"><div className="zt">+</div><div className="zv">🤍 Ventre plat</div></div>
          <div className="zone"><div className="zt">+</div><div className="zv">🎵 Cardio plaisir</div></div>
        </div>
      </div>

      {/* Note bienveillante */}
      <div className="card info-box warn">
        <h3>🌿 Un mot pour toi</h3>
        <p className="muted">
          L’objectif de cette appli, ce n’est pas un chiffre sur la balance — c’est de te sentir <strong>tonique,
          légère et pleine d’énergie</strong>. À 1m71 ton poids est déjà parfaitement sain : on joue sur la
          silhouette (muscle qui se dessine) et la digestion (ventre plat), pas sur la privation. Une perte douce
          de ~0,5 kg par semaine, c’est ce qui tient dans le temps. Écoute ton corps, et surtout : amuse-toi 🎶
        </p>
      </div>

      {/* Sauvegarde */}
      <div className="card info-box">
        <h3>💾 Mes données</h3>
        <p className="muted" style={{ marginTop: -4 }}>
          Tout est stocké sur ce téléphone. Pense à télécharger une sauvegarde de temps en temps (au cas où le
          téléphone change ou que le cache se vide).
        </p>
        <div className="settings-row">
          <button className="btn primary" onClick={() => { downloadBackup(); flash('💾 Sauvegarde téléchargée.') }}>⬇️ Télécharger</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>⬆️ Restaurer</button>
          <button className="btn danger" onClick={onReset}>🗑️ Tout effacer</button>
        </div>
        <input ref={fileRef} type="file" accept="application/json" onChange={onImport} hidden />
        {toast && <div className="toast">{toast}</div>}
      </div>

      {/* Clé API pour l'analyse photo */}
      <div className="card info-box">
        <h3>📸 Analyse photo (IA)</h3>
        <p className="muted" style={{ marginTop: -4 }}>
          La page <strong>Photo</strong> utilise l’intelligence artificielle Claude pour reconnaître les aliments
          et estimer les calories. Il faut une clé personnelle (créée sur <strong>console.anthropic.com</strong>) :
          c’est gratuit à créer et ça coûte quelques centimes par photo. Colle-la ici :
        </p>
        <div className="api-field">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value.trim())}
            placeholder="sk-ant-..."
            autoComplete="off"
          />
        </div>
        <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>
          {apiKey ? '✅ Clé enregistrée sur ce téléphone — la page Photo est active.' : 'La clé reste sur ce téléphone, elle n’est envoyée qu’à Claude pour analyser tes photos.'}
        </p>
      </div>

      {/* Installation */}
      <div className="card info-box accent">
        <h3>📲 Installer l’appli sur l’écran d’accueil</h3>
        <p className="muted" style={{ marginTop: -4 }}>Pour l’ouvrir comme une vraie appli, en plein écran :</p>
        <p style={{ fontWeight: 700, margin: '6px 0 4px' }}>Sur iPhone (Safari)</p>
        <ol className="install-steps">
          <li>Touche le bouton <strong>Partager</strong> (le carré avec une flèche ↑).</li>
          <li>Choisis <strong>« Sur l’écran d’accueil »</strong>.</li>
          <li>Touche <strong>Ajouter</strong>. L’icône 💗 apparaît !</li>
        </ol>
        <p style={{ fontWeight: 700, margin: '10px 0 4px' }}>Sur Android (Chrome)</p>
        <ol className="install-steps">
          <li>Touche le menu <strong>⋮</strong> en haut à droite.</li>
          <li>Choisis <strong>« Ajouter à l’écran d’accueil »</strong>.</li>
          <li>Confirme avec <strong>Ajouter</strong>.</li>
        </ol>
      </div>
    </div>
  )
}
