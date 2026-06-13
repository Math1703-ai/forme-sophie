import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { todayISO, frDateLong, totalSeances, joursEauOk } from '../utils.js'
import { waterGoal } from '../data/menus.js'
import { defaultProfile, imc, imcMot } from '../profile.js'

function WeightChart({ series }) {
  if (series.length < 2) {
    return <p className="muted center" style={{ padding: '8px 0' }}>Note ton poids quelques jours pour voir apparaître ta courbe 🌷</p>
  }
  const W = 320, H = 130, pad = 24
  const kgs = series.map((s) => s.kg)
  let min = Math.min(...kgs), max = Math.max(...kgs)
  if (max - min < 1) { min -= 0.5; max += 0.5 }
  const x = (i) => pad + (i * (W - 2 * pad)) / (series.length - 1)
  const y = (kg) => H - pad - ((kg - min) / (max - min)) * (H - 2 * pad)
  const pts = series.map((s, i) => `${x(i)},${y(s.kg)}`).join(' ')
  const area = `${pad},${H - pad} ${pts} ${x(series.length - 1)},${H - pad}`

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <polygon points={area} fill="url(#g)" opacity="0.25" />
        <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {series.map((s, i) => <circle key={i} cx={x(i)} cy={y(s.kg)} r="3.5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />)}
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function ProgresTab({ done }) {
  const [log, setLog] = useLocalStorage('forme:poids-log', {})
  const [val, setVal] = useState('')

  const series = Object.entries(log)
    .map(([iso, kg]) => ({ iso, kg: Number(kg) }))
    .filter((s) => s.kg > 0)
    .sort((a, b) => (a.iso < b.iso ? -1 : 1))

  const enregistrer = () => {
    const kg = parseFloat(String(val).replace(',', '.'))
    if (!isNaN(kg) && kg > 20 && kg < 200) {
      setLog((l) => ({ ...l, [todayISO()]: kg }))
      setVal('')
    }
  }

  const actuel = series.length ? series[series.length - 1].kg : defaultProfile.poidsDepart
  const depart = series.length ? series[0].kg : defaultProfile.poidsDepart
  const diff = Math.round((actuel - depart) * 10) / 10
  const seances = totalSeances(done)
  const eauOk = joursEauOk(waterGoal)
  const imcVal = imc(actuel, defaultProfile.taille)

  return (
    <div className="tabview">
      {/* Saisie du poids */}
      <div className="card info-box">
        <h3>⚖️ Mon poids du jour</h3>
        <p className="muted" style={{ marginTop: -4 }}>{frDateLong(todayISO())}</p>
        <div className="poids-row">
          <input
            type="text" inputMode="decimal" value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="ex : 57,5"
          />
          <span className="poids-unit">kg</span>
          <button className="btn primary" onClick={enregistrer}>Enregistrer</button>
        </div>
        <p className="poids-tip">
          💡 Pèse-toi le matin, 1 à 2 fois par semaine — pas tous les jours. Le poids monte et descend avec l’eau,
          c’est la <strong>tendance sur plusieurs semaines</strong> qui compte, pas le chiffre d’un matin.
        </p>
      </div>

      {/* Courbe */}
      <div className="card chart-card">
        <p className="chart-title">📉 Ma tendance</p>
        <p className="chart-sub">
          {series.length >= 2
            ? `${diff <= 0 ? `${Math.abs(diff)} kg en moins` : `${diff} kg`} depuis la 1ʳᵉ pesée · doucement mais sûrement`
            : 'On vise la régularité, pas la vitesse 🌸'}
        </p>
        <WeightChart series={series} />
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="card stat">
          <div className="stat-big">{seances}</div>
          <div className="stat-label">séances faites 💪</div>
        </div>
        <div className="card stat">
          <div className="stat-big">{eauOk}</div>
          <div className="stat-label">jours d’eau au top 💧</div>
        </div>
        <div className="card stat">
          <div className="stat-big">{actuel}</div>
          <div className="stat-label">poids actuel (kg)</div>
        </div>
        <div className="card stat">
          <div className="stat-big">{imcVal ?? '—'}</div>
          <div className="stat-label">IMC · {imcMot(imcVal)}</div>
        </div>
      </div>

      {/* Encouragement */}
      <div className="card info-box accent" style={{ marginTop: 14 }}>
        <h3>🌟 Ce qui compte vraiment</h3>
        <ul className="tiplist">
          <li>Ton jean qui tombe mieux et le ventre plus plat se voient avant la balance.</li>
          <li>Plus d’énergie, un meilleur sommeil, moins de fringales : c’est déjà gagné.</li>
          <li>Chaque séance cochée est une victoire. {seances > 0 ? `Tu en es déjà à ${seances} 👏` : 'La première arrive très vite !'}</li>
        </ul>
      </div>
    </div>
  )
}
