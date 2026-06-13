import { useState } from 'react'
import { weeks, cadre } from '../data/program.js'
import { weekProgress, todayDayCode, currentWeekNum } from '../utils.js'
import DayCard from './DayCard.jsx'

export default function SemaineTab({ selected, setSelected, done, setDone }) {
  const [showCadre, setShowCadre] = useState(false)
  const week = weeks.find((w) => w.num === selected)
  const p = weekProgress(week, done)
  const pct = p.total ? Math.round((p.completed / p.total) * 100) : 0
  const now = currentWeekNum()
  const isCurrent = now === selected
  const today = todayDayCode()

  return (
    <div className="tabview">
      {/* Sélecteur de semaine */}
      <div className="week-nav">
        <button className="week-arrow" onClick={() => setSelected(Math.max(1, selected - 1))} disabled={selected === 1}>‹</button>
        <div className="week-dots">
          {weeks.map((w) => {
            const wp = weekProgress(w, done)
            const full = wp.total > 0 && wp.completed === wp.total
            return (
              <button
                key={w.num}
                className={`week-dot ${w.num === selected ? 'on' : ''} ${now === w.num ? 'now' : ''} ${full ? 'full' : ''}`}
                onClick={() => setSelected(w.num)}
              >
                {w.num}
              </button>
            )
          })}
        </div>
        <button className="week-arrow" onClick={() => setSelected(Math.min(weeks.length, selected + 1))} disabled={selected === weeks.length}>›</button>
      </div>

      {/* Résumé de la semaine */}
      <div className="card week-card">
        <div className="week-top">
          <div>
            <div className="week-phase">{week.emoji} {week.phase}</div>
            <h2 className="week-title">Semaine {week.num} · {week.label}</h2>
            <div className="week-dates">{week.dates}</div>
          </div>
          {isCurrent && <span className="now-badge">en cours</span>}
        </div>
        <div className="week-bar">
          <div className="week-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="week-bar-label">{p.completed}/{p.total} séances · {pct}%</div>
        {week.note && <p className="week-note">{week.note}</p>}
      </div>

      {/* Les règles d'or */}
      <div className="card cadre">
        <button className="cadre-head" onClick={() => setShowCadre((s) => !s)}>
          <span>📋 Les règles d’or — à relire si besoin</span>
          <span className="chev" data-open={showCadre}>▾</span>
        </button>
        {showCadre && (
          <ul className="cadre-list">
            {cadre.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        )}
      </div>

      {/* Les jours */}
      <div className="days">
        {week.days.map((d) => (
          <DayCard
            key={`${week.num}-${d.code}`}
            day={d}
            weekNum={week.num}
            done={done}
            setDone={setDone}
            today={isCurrent && d.code === today}
          />
        ))}
      </div>
    </div>
  )
}
