// Affiche le contenu détaillé d'une séance (échauffement, exos, retour, musique).
export default function SeanceDetail({ seance }) {
  if (!seance) return null

  // Jour de repos : message simple
  if (seance.type === 'repos') {
    return <p className="seance-intro">{seance.intro}</p>
  }

  return (
    <div className="seance-detail">
      {seance.intro && <p className="seance-intro">{seance.intro}</p>}

      {seance.musique && (
        <div className="musique-note">🎵 {seance.musique}</div>
      )}

      {seance.echauffement && (
        <div className="phase-line">
          <span className="phase-pill warm">Échauffement</span>
          <span>{seance.echauffement}</span>
        </div>
      )}

      {seance.exos?.length > 0 && (
        <ul className="exo-list">
          {seance.exos.map((e, i) => (
            <li className="exo-item" key={i}>
              <div className="exo-item-head">
                <span className="exo-item-name">{e.nom}</span>
                <span className="exo-item-dose">{e.dose}</span>
              </div>
              {e.note && <p className="exo-item-cue">{e.note}</p>}
            </li>
          ))}
        </ul>
      )}

      {seance.retour && (
        <div className="phase-line">
          <span className="phase-pill cool">Retour au calme</span>
          <span>{seance.retour}</span>
        </div>
      )}

      {seance.epaules && (
        <div className="epaules-note">🦋 Épaules : {seance.epaules}</div>
      )}
    </div>
  )
}
