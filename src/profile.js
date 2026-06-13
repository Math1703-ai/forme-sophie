// Profil de Sophie + petits calculs d'info.

export const defaultProfile = {
  prenom: 'Sophie',
  age: 49,
  taille: 171, // cm
  poidsDepart: 58, // kg au démarrage
  objectif: 'M’affiner, me tonifier et dégonfler le ventre — en douceur et avec le sourire.',
}

// IMC simple (information, pas un jugement)
export function imc(poids, tailleCm) {
  const t = tailleCm / 100
  if (!poids || !t) return null
  return Math.round((poids / (t * t)) * 10) / 10
}

// Petit commentaire bienveillant sur l'IMC
export function imcMot(valeur) {
  if (valeur == null) return ''
  if (valeur < 18.5) return 'Poids déjà mince — on vise le tonus, pas les kilos.'
  if (valeur < 25) return 'Poids tout à fait sain 💚 On joue sur la silhouette et l’énergie.'
  return 'On avance en douceur, à ton rythme.'
}

// Besoin en eau indicatif (~30-35 ml/kg) en litres
export function besoinEau(poids) {
  if (!poids) return 1.5
  return Math.round((poids * 0.033) * 10) / 10
}
