import { useState } from 'react'
import { types } from '../data/program.js'
import { slotKey } from '../utils.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import SeanceDetail from './SeanceDetail.jsx'

function Ressenti({ weekNum, dayCode }) {
  const [r, setR] = useLocalStorage(`forme:note:${weekNum}:${dayCode}`, { energie: 0, note: '' })
  const set = (patch) => setR((v) => ({ ...v, ...patch }))
  return (
    <div className="ressenti">
      <div className="field">
        <span>✨ Comment tu t’es sentie ?</span>
        <div className="form-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" className={`form-dot ${r.energie >= n ? 'on' : ''}`} onClick={() => set({ energie: r.energie === n ? 0 : n })}>
              {n}
            </button>
          ))}
        </div>
      </div>
      <label className="field full">
        <textarea rows={2} value={r.note} onChange={(e) => set({ note: e.target.value })} placeholder="Un mot sur ta séance (facultatif)…" />
      </label>
    </div>
  )
}

export default function DayCard({ day, weekNum, done, setDone, today }) {
  const seance = day.main
  const isRepos = seance.type === 'repos'
  const key = slotKey(weekNum, day.code)
  const isDone = !!done[key]
  const [open, setOpen] = useState(today && !isRepos)
  const t = types[seance.type]

  const toggle = (e) => {
    e.stopPropagation()
    setDone((d) => ({ ...d, [key]: !d[key] }))
  }

  return (
    <article className={`card day-card ${today ? 'is-today' : ''} ${isDone ? 'all-done' : ''} ${isRepos ? 'is-repos' : ''}`}>
      <button className="day-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="day-badge" style={{ background: `linear-gradient(140deg, ${t.color}, ${t.color}aa)` }}>{day.code}</span>
        <span className="day-head-text">
          <span className="day-date">
            {seance.title}
            {today && <span className="today-chip">aujourd’hui</span>}
          </span>
          <span className="day-sub">
            <span className="mini-chip">{t.emoji}</span>
            {seance.sub} · {seance.duree}
          </span>
        </span>
        {!isRepos && (
          <span
            className={`day-check ${isDone ? 'on' : ''}`}
            role="checkbox"
            aria-checked={isDone}
            onClick={toggle}
          >
            {isDone ? '✓' : ''}
          </span>
        )}
        {isRepos && <span className="rest-emoji">{t.emoji}</span>}
      </button>

      {open && (
        <div className="day-body">
          {day.note && <div className="day-note">💡 {day.note}</div>}
          <SeanceDetail seance={seance} />
          {!isRepos && (
            <>
              <button className={`big-check ${isDone ? 'on' : ''}`} onClick={toggle}>
                {isDone ? '✓ Séance faite — bravo !' : 'Cocher : séance faite'}
              </button>
              <Ressenti weekNum={weekNum} dayCode={day.code} />
            </>
          )}
        </div>
      )}
    </article>
  )
}
