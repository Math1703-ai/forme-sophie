import { useState } from 'react'
import { seancesLib, types } from '../data/program.js'
import SeanceDetail from './SeanceDetail.jsx'

export default function BougerTab() {
  const [open, setOpen] = useState(null)

  return (
    <div className="tabview">
      <div className="card info-box accent">
        <h3>💃 Toutes tes séances</h3>
        <p className="muted">
          Retrouve ici le détail de chaque séance, quand tu veux. Toutes durent ~30 min, se font à la maison
          et ménagent tes épaules (zéro pompe 🙅‍♀️). Mets ta musique et c’est parti !
        </p>
      </div>

      <div className="stack">
        {seancesLib.map((s) => {
          const t = types[s.type]
          const isOpen = open === s.id
          return (
            <div className="card ref-card" key={s.id} style={{ borderLeftColor: t.color }}>
              <button className="ref-head" onClick={() => setOpen(isOpen ? null : s.id)}>
                <span className="ref-emoji" style={{ background: `${t.color}22` }}>{t.emoji}</span>
                <span className="ref-head-text">
                  <strong>{s.title}</strong>
                  <span className="ref-sub">{s.sub} · {s.duree}</span>
                </span>
                <span className="chev" data-open={isOpen}>▾</span>
              </button>
              {isOpen && (
                <div className="ref-body">
                  <SeanceDetail seance={s} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
