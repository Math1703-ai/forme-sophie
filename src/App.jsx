import { useState } from 'react'
import { meta } from './data/program.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { currentWeekNum, daysToChallengeEnd, weekProgress } from './utils.js'
import { weeks } from './data/program.js'
import SemaineTab from './components/SemaineTab.jsx'
import MenusTab from './components/MenusTab.jsx'
import BougerTab from './components/BougerTab.jsx'
import ProgresTab from './components/ProgresTab.jsx'
import ProfilTab from './components/ProfilTab.jsx'

const TABS = [
  { id: 'semaine', label: 'Semaine', icon: '🗓️' },
  { id: 'menus', label: 'Menus', icon: '🥗' },
  { id: 'bouger', label: 'Bouger', icon: '🤸‍♀️' },
  { id: 'progres', label: 'Progrès', icon: '📈' },
  { id: 'profil', label: 'Profil', icon: '🌿' },
]

export default function App() {
  const [done, setDone] = useLocalStorage('forme:done', {})
  const [tab, setTab] = useState('semaine')
  const [selected, setSelected] = useState(() => currentWeekNum())

  const week = weeks.find((w) => w.num === currentWeekNum()) || weeks[0]
  const p = weekProgress(week, done)
  const pct = p.total ? Math.round((p.completed / p.total) * 100) : 0
  const j = daysToChallengeEnd()

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-eyebrow">{meta.eyebrow}</div>
        <h1>{meta.title}</h1>
        <div className="hero-sub">{meta.subtitle}</div>
        <div className="hero-stats">
          <span className="hero-pill">{j > 0 ? `Défi · J-${j}` : 'Routine 💗'}</span>
          <div className="hero-bar"><div className="hero-bar-fill" style={{ width: `${pct}%` }} /></div>
          <span className="hero-pct">{pct}%</span>
        </div>
        <div className="hero-week">Semaine {week.num} · {p.completed}/{p.total} séances cette semaine</div>
      </header>

      <main>
        {tab === 'semaine' && <SemaineTab selected={selected} setSelected={setSelected} done={done} setDone={setDone} />}
        {tab === 'menus' && <MenusTab />}
        {tab === 'bouger' && <BougerTab />}
        {tab === 'progres' && <ProgresTab done={done} />}
        {tab === 'profil' && <ProfilTab />}
      </main>

      <footer className="footer">
        <span>Allez Sophie, tu assures 💪 · régularité &gt; perfection</span>
        <span className="footer-sub">Tes données restent sur ton téléphone · disponible hors-ligne</span>
      </footer>

      <nav className="bottomnav">
        {TABS.map((t) => (
          <button key={t.id} className={`navbtn ${tab === t.id ? 'on' : ''}`} onClick={() => { setTab(t.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <span className="ico">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
