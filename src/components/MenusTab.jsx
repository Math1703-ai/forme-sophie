import { useState } from 'react'
import {
  petitDej, dejeuners, collations, diners,
  menuDefaut, waterGoal, weekendTips, coachLignes,
} from '../data/menus.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import {
  todayISO, isoAddDays, frDateLong, isWeekendISO,
  mealsKey, waterKey, coachLevel,
} from '../utils.js'

const SLOTS = [
  { key: 'pd', titre: '🌅 Petit-déjeuner', hint: 'Sucré mais malin — pour tenir sans grignoter', options: petitDej },
  { key: 'dj', titre: '☀️ Déjeuner', hint: 'L’assiette équilibrée', options: dejeuners },
  { key: 'co', titre: '🍫 Collation', hint: 'La prévoir, c’est éviter de craquer', options: collations },
  { key: 'di', titre: '🌙 Dîner', hint: 'Léger & digeste pour un ventre plat', options: diners },
]

const NIVEAU_LABEL = { leger: 'Léger', equilibre: 'Équilibré', gourmand: 'Plaisir' }

function MealOption({ opt, chosen, suggested, onPick }) {
  return (
    <button className={`meal-opt ${chosen ? 'on' : ''}`} onClick={onPick}>
      <span className="meal-emoji">{opt.emoji}</span>
      <span className="meal-main">
        <span className="meal-name">
          {opt.name}
          {suggested && <span className="sugg-badge">suggestion</span>}
        </span>
        <span className="meal-desc">{opt.desc}</span>
        <span className={`niveau-tag ${opt.niveau}`}>{NIVEAU_LABEL[opt.niveau]}</span>
      </span>
      <span className={`meal-check ${chosen ? 'on' : ''}`}>{chosen ? '✓' : ''}</span>
    </button>
  )
}

function WaterTracker({ iso }) {
  const [n, setN] = useLocalStorage(waterKey(iso), 0)
  const litres = (n * 0.2).toFixed(1)
  const pct = Math.round((Math.min(n, waterGoal) / waterGoal) * 100)
  return (
    <div className="card water-card">
      <div className="water-top">
        <h3>💧 Mon eau du jour</h3>
        <span className="water-count">{litres} L / 1,5 L</span>
      </div>
      <div className="water-drops">
        {Array.from({ length: waterGoal }).map((_, i) => (
          <button
            key={i}
            className={`drop ${i < n ? 'on' : ''}`}
            onClick={() => setN(i + 1 === n ? i : i + 1)}
            aria-label={`verre ${i + 1}`}
          >
            💧
          </button>
        ))}
      </div>
      <div className="water-bar"><div className="water-bar-fill" style={{ width: `${pct}%` }} /></div>
      <p className="water-hint">
        {n >= waterGoal ? 'Quota atteint, bravo ! L’eau aide à dégonfler et à couper la faim 💗' : 'Un verre dès le réveil, un avant chaque repas : c’est plus facile qu’on croit.'}
      </p>
    </div>
  )
}

function DayMenus({ iso }) {
  const weekend = isWeekendISO(iso)
  const [meals, setMeals] = useLocalStorage(mealsKey(iso), { pd: '', dj: '', co: '', di: '' })

  const pick = (slot, id) => setMeals((m) => ({ ...m, [slot]: m[slot] === id ? '' : id }))

  // niveaux des repas choisis → message du coach
  const niveaux = SLOTS.map((s) => {
    const opt = s.options.find((o) => o.id === meals[s.key])
    return opt ? opt.niveau : null
  })
  const level = coachLevel(niveaux)

  return (
    <>
      {weekend && (
        <div className="card weekend-card">
          <h3>{weekendTips.title}</h3>
          <p className="weekend-intro">{weekendTips.intro}</p>
          <ul className="weekend-tips">
            {weekendTips.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      <WaterTracker iso={iso} />

      {/* Le coach du soir */}
      <div className={`card coach-card ${level}`}>
        <div className="coach-head">🤍 Le coach du soir</div>
        <p className="coach-msg">{coachLignes[level]}</p>
      </div>

      {/* Les repas */}
      {SLOTS.map((s) => (
        <div className="meal-section" key={s.key}>
          <div className="meal-title">{s.titre}</div>
          <div className="meal-hint">{s.hint}</div>
          <div className="meal-opts">
            {s.options.map((opt) => (
              <MealOption
                key={opt.id}
                opt={opt}
                chosen={meals[s.key] === opt.id}
                suggested={!weekend && menuDefaut[s.key] === opt.id}
                onPick={() => pick(s.key, opt.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default function MenusTab() {
  const [iso, setIso] = useState(todayISO())
  const isToday = iso === todayISO()

  return (
    <div className="tabview">
      {/* Navigation par jour */}
      <div className="day-nav">
        <button className="week-arrow" onClick={() => setIso(isoAddDays(iso, -1))}>‹</button>
        <div className="day-nav-label">
          <strong>{isToday ? 'Aujourd’hui' : frDateLong(iso)}</strong>
          {!isToday && <button className="today-link" onClick={() => setIso(todayISO())}>revenir à aujourd’hui</button>}
          {isToday && <span className="day-nav-date">{frDateLong(iso)}</span>}
        </div>
        <button className="week-arrow" onClick={() => setIso(isoAddDays(iso, 1))}>›</button>
      </div>

      {/* key={iso} : on recharge bien les données du bon jour */}
      <DayMenus key={iso} iso={iso} />
    </div>
  )
}
