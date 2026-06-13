import { weeks, meta } from './data/program.js'

// ───────── Séances : suivi « fait / pas fait » ─────────
// Une séance active par jour → clé = "numSemaine:codeJour" (ex "1:Lun")
export const slotKey = (weekNum, dayCode) => `${weekNum}:${dayCode}`

// Jours « cochables » d'une semaine (on ignore le repos)
export function weekSlots(week) {
  return week.days
    .filter((d) => d.main && d.main.type !== 'repos')
    .map((d) => ({ key: slotKey(week.num, d.code) }))
}

export function weekProgress(week, done) {
  const slots = weekSlots(week)
  const completed = slots.filter((s) => done[s.key]).length
  return { completed, total: slots.length }
}

export function globalProgress(done) {
  let completed = 0
  let total = 0
  for (const w of weeks) {
    const p = weekProgress(w, done)
    completed += p.completed
    total += p.total
  }
  return { completed, total }
}

// Nombre total de séances cochées (toutes semaines)
export function totalSeances(done) {
  return globalProgress(done).completed
}

// ───────── Dates ─────────
const pad = (n) => String(n).padStart(2, '0')
export const isoOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => isoOf(new Date())

export function isoAddDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number)
  return isoOf(new Date(y, m - 1, d + n))
}

export function isoToDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function frDateLong(iso) {
  return isoToDate(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function isWeekendISO(iso) {
  const j = isoToDate(iso).getDay()
  return j === 0 || j === 6
}

// Code jour (Lun..Dim) à partir d'une date / d'un iso
const CODES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
export const todayDayCode = () => CODES[new Date().getDay()]
export const dayCodeOfISO = (iso) => CODES[isoToDate(iso).getDay()]

// Numéro de la semaine de programme en cours selon la date du jour
export function currentWeekNum() {
  const t = isoToDate(todayISO()).getTime()
  for (const w of weeks) {
    const start = isoToDate(w.start).getTime()
    const end = isoToDate(w.end).getTime() + 24 * 3600 * 1000 - 1
    if (t >= start && t <= end) return w.num
  }
  const firstStart = isoToDate(weeks[0].start).getTime()
  if (t < firstStart) return 1
  return weeks[weeks.length - 1].num
}

// Jours avant une date cible (ex : fin du défi 14 jours)
export function daysTo(dateISO) {
  const t0 = isoToDate(todayISO()).getTime()
  const t1 = isoToDate(dateISO).getTime()
  return Math.round((t1 - t0) / (1000 * 60 * 60 * 24))
}

export function daysToChallengeEnd() {
  return daysTo(meta.challengeEnd)
}

// ───────── Eau ─────────
export const waterKey = (iso) => `forme:eau:${iso}`

// ───────── Repas ─────────
export const mealsKey = (iso) => `forme:repas:${iso}`

// Message du coach selon les niveaux des repas cochés du jour
export function coachLevel(niveaux) {
  const chosen = niveaux.filter(Boolean)
  if (chosen.length === 0) return 'vide'
  if (chosen.includes('gourmand')) return 'gourmand'
  if (chosen.length >= 2 && chosen.every((n) => n === 'leger')) return 'leger'
  return 'equilibre'
}

// ───────── Poids ─────────
export const poidsKey = (iso) => `forme:poids:${iso}`

// Toutes les pesées enregistrées, triées par date → [{iso, kg}]
export function poidsSeries() {
  const out = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith('forme:poids:')) {
      try {
        const kg = parseFloat(String(JSON.parse(localStorage.getItem(k))).replace(',', '.'))
        if (!isNaN(kg) && kg > 0) out.push({ iso: k.replace('forme:poids:', ''), kg })
      } catch {
        /* ignore */
      }
    }
  }
  return out.sort((a, b) => (a.iso < b.iso ? -1 : 1))
}

// Nombre de jours où le quota d'eau a été atteint
export function joursEauOk(goal) {
  let n = 0
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith('forme:eau:')) {
      try {
        if (Number(JSON.parse(localStorage.getItem(k))) >= goal) n++
      } catch {
        /* ignore */
      }
    }
  }
  return n
}
