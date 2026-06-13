// ───────────────────────────────────────────────────────────
//  PROGRAMME SPORT DE SOPHIE
//  • 30 min par séance · sur fond musical 🎵
//  • zéro pompe, doux pour les épaules (épaules fragiles)
//  • cible : cuisses, fesses, ventre + cardio plaisir
//  • matériel maison : élastiques, haltères légers, vélo, tapis de marche
// ───────────────────────────────────────────────────────────

export const meta = {
  title: 'EN FORME',
  eyebrow: 'Le programme de Sophie',
  subtitle: 'Tonus · ventre plat · énergie — en douceur',
  // Le « défi 14 jours » = semaines 1 et 2.
  start: '2026-06-15',
  challengeEnd: '2026-06-28',
}

// Types de séances → emoji + couleur (pour les petites pastilles)
export const types = {
  bas:     { emoji: '🍑', color: '#ff6fa5', label: 'Cuisses & fesses' },
  cardio:  { emoji: '🎵', color: '#ff8a5b', label: 'Cardio dansé' },
  ventre:  { emoji: '🤍', color: '#c084fc', label: 'Ventre plat' },
  circuit: { emoji: '🔥', color: '#fb7185', label: 'Circuit tonus' },
  marche:  { emoji: '🚶‍♀️', color: '#34d399', label: 'Marche plaisir' },
  stretch: { emoji: '🧘‍♀️', color: '#38bdf8', label: 'Souplesse' },
  repos:   { emoji: '😴', color: '#b9a6b0', label: 'Repos' },
}

// Les règles d'or — à relire quand la motivation ou la fatigue varie
export const cadre = [
  'Épaules fragiles : jamais de pompes, ni de poids au-dessus de la tête. Si un mouvement tire dans l’épaule, on l’allège ou on le remplace.',
  'On bouge sur la musique : choisis une playlist qui donne la pêche, c’est elle qui porte la séance 💃',
  'La régularité bat l’intensité : 3 séances tranquilles tenues chaque semaine valent mieux qu’une séance « à fond » puis le canapé.',
  'On va à son rythme : essoufflée mais capable de parler = bon rythme. Une vraie douleur (pas une brûlure musculaire) = on s’arrête.',
  'Le ventre gonflé vient surtout de la digestion : le gainage doux + bien mâcher + dîner léger feront plus que 200 abdos.',
  'Le résultat se voit au miroir et à l’énergie bien avant la balance. On regarde comment le jean tombe, pas seulement les kilos.',
]

// ───────────────────────────────────────────────────────────
//  Les séances (réutilisées dans le planning de la semaine)
// ───────────────────────────────────────────────────────────

const W = {
  bas: {
    id: 'bas', type: 'bas', title: 'Cuisses & Fessiers', sub: 'Galber le bas du corps', duree: '30 min',
    intro: 'La séance qui sculpte les cuisses et remonte les fessiers. On prend des haltères légers (ou des bouteilles d’eau) et un élastique.',
    echauffement: '5 min en musique : marche sur place genoux hauts, talons-fesses, rotations de hanches, 10 squats lents.',
    exos: [
      { nom: 'Squats', dose: '3 × 15', note: 'Pieds largeur de hanches, descends comme pour t’asseoir, pousse dans les talons. Genoux derrière les orteils.' },
      { nom: 'Fentes alternées', dose: '3 × 12', note: '6 par jambe. Grand pas en avant, genou arrière vers le sol, buste droit. Appuie-toi à un mur si besoin.' },
      { nom: 'Pont fessier (au sol)', dose: '3 × 15', note: 'Allongée sur le dos, pieds au sol, monte le bassin en serrant les fesses en haut 1 seconde.' },
      { nom: 'Squat sumo + haltère', dose: '3 × 15', note: 'Pieds larges, pointes vers l’extérieur. Tiens un haltère à deux mains devant toi. Cible l’intérieur des cuisses.' },
      { nom: 'Abductions à l’élastique', dose: '3 × 15 / côté', note: 'Élastique aux chevilles, debout : écarte une jambe sur le côté, contrôle le retour. Brûle les hanches/culotte de cheval.' },
      { nom: 'Donkey kicks', dose: '3 × 15 / côté', note: 'À quatre pattes, pousse un talon vers le plafond, genou plié. Top fessiers, zéro charge sur les épaules.' },
    ],
    retour: '3 min d’étirements : quadriceps debout, fessiers allongée, ischios.',
    musique: 'Playlist rythmée ~120 bpm — 6 ou 7 morceaux qui te donnent la pêche.',
    epaules: 'Aucune charge sur les épaules dans cette séance. ✅',
  },
  cardio: {
    id: 'cardio', type: 'cardio', title: 'Cardio dansé', sub: 'Brûle-graisses sur musique', duree: '30 min',
    intro: 'Le moment plaisir : on bouge, on transpire, on s’amuse. Au choix : danse dans le salon, vélo, ou tapis de marche rapide — l’important c’est que ça envoie sur la musique 🎶',
    echauffement: '3 min : on commence doucement, on monte le rythme morceau après morceau.',
    exos: [
      { nom: 'Bloc danse libre', dose: '20 min', note: 'Enchaîne pas chassés, montées de genoux, squats rythmés, talons-fesses. Lâche-toi sur tes morceaux préférés.' },
      { nom: 'OU Vélo', dose: '20 min', note: 'Alterne 2 min tranquille / 1 min plus appuyée (résistance un peu plus dure). Répète.' },
      { nom: 'OU Tapis de marche', dose: '20 min', note: 'Marche rapide avec un peu de pente. Tu dois être essoufflée mais encore capable de chanter le refrain.' },
    ],
    retour: '5 min : on ralentit, marche sur place, grandes respirations, étirement mollets et cuisses.',
    musique: 'Ta playlist « bonne humeur » à fond. C’est la séance où la musique fait tout le travail de motivation.',
    epaules: 'Garde les bras sous la hauteur des épaules (pas de bras tendus au-dessus de la tête).',
  },
  ventre: {
    id: 'ventre', type: 'ventre', title: 'Ventre plat', sub: 'Sangle abdo & anti-ballonnement', duree: '30 min',
    intro: 'La séance « taille de guêpe ». On travaille la sangle profonde (celle qui rentre le ventre), tout doux pour les épaules et le dos.',
    echauffement: '4 min : rotations du buste, bascule du bassin, respirations ventre.',
    exos: [
      { nom: 'Vacuum abdominal', dose: '3 × 15 sec', note: 'Debout ou à quatre pattes : souffle tout l’air puis rentre le nombril au maximum vers la colonne. LE mouvement anti-petit-ventre.' },
      { nom: 'Dead bug', dose: '3 × 12', note: 'Allongée sur le dos, bras vers le plafond : tends une jambe + le bras opposé, sans creuser le bas du dos. Doux et efficace.' },
      { nom: 'Relevés de jambes', dose: '3 × 12', note: 'Allongée, jambes tendues, descends-les lentement sans décoller le bas du dos. Plie les genoux si c’est trop dur.' },
      { nom: 'Bicyclette', dose: '3 × 20', note: 'Coude vers le genou opposé, en pédalant. Travaille la taille (les obliques).' },
      { nom: 'Gainage sur les genoux', dose: '3 × 20 sec', note: 'Planche sur les avant-bras ET les genoux (pas les pieds) pour soulager les épaules. Si ça tire dans l’épaule → refais un vacuum à la place.' },
      { nom: 'Gainage latéral genou', dose: '3 × 20 sec / côté', note: 'Sur le côté, en appui sur l’avant-bras et le genou. Affûte la taille.' },
    ],
    retour: '4 min : étirement cobra doux, posture de l’enfant, 5 grandes respirations ventrales.',
    musique: 'Playlist plus posée — on cherche le contrôle et la respiration, pas la vitesse.',
    epaules: 'Gainage sur les genoux et avant-bras = épaules ménagées. Si gêne, remplace par le vacuum. ✅',
  },
  circuit: {
    id: 'circuit', type: 'circuit', title: 'Circuit Tonus', sub: 'Tout le corps, en musique', duree: '30 min',
    intro: 'Un circuit dynamique qui réveille tout le corps et fait grimper le cœur. On enchaîne 6 exercices : 40 secondes d’effort, 20 secondes de repos. On fait le tour 3 fois.',
    echauffement: '4 min : marche genoux hauts, talons-fesses, 10 squats, rotations de hanches.',
    exos: [
      { nom: 'Squats rythmés', dose: '40 sec', note: 'Sur le tempo de la musique.' },
      { nom: 'Fentes alternées', dose: '40 sec', note: 'Change de jambe à chaque fois, buste droit.' },
      { nom: 'Pont fessier', dose: '40 sec', note: 'Monte/descends le bassin en serrant les fesses.' },
      { nom: 'Montées de genoux', dose: '40 sec', note: 'Sur place, le plus dynamique possible. Le cardio du circuit.' },
      { nom: 'Abductions élastique', dose: '40 sec', note: '20 sec par jambe, élastique aux chevilles.' },
      { nom: 'Gainage genoux', dose: '40 sec', note: 'Sur avant-bras + genoux. Souffle, garde le ventre rentré.' },
    ],
    retour: '4 min : étirements complets cuisses, fessiers, dos, grandes respirations.',
    musique: 'Une playlist énergique de 26 min : elle rythme tes 40/20. Quand ça pulse, tu pousses 💪',
    epaules: 'Pas de pompes ni de burpees. Le gainage est sur les genoux. ✅',
  },
  marche: {
    id: 'marche', type: 'marche', title: 'Marche plaisir', sub: 'Cardio doux du week-end', duree: '30–45 min',
    intro: 'La séance « tête en l’air ». Marche rapide dehors ou sur le tapis, ou vélo tranquille. Brûle des calories sans s’en rendre compte, déstresse et dégonfle.',
    echauffement: '5 min en démarrant tranquillement.',
    exos: [
      { nom: 'Marche rapide', dose: '30–45 min', note: 'Bon pas, tu transpires légèrement. Mets un podcast ou ta playlist détente. Dehors c’est encore mieux.' },
      { nom: 'OU Vélo tranquille', dose: '30 min', note: 'Allure de balade, résistance douce. Parfait après un repas un peu festif.' },
    ],
    retour: 'Étirement mollets et cuisses au retour.',
    musique: 'Playlist détente ou un bon podcast — c’est la séance « on décroche ».',
    epaules: 'Zéro contrainte sur les épaules. ✅',
  },
  stretch: {
    id: 'stretch', type: 'stretch', title: 'Souplesse & détente', sub: 'Étirements + respiration', duree: '20–30 min',
    intro: 'La récompense de la semaine. On étire tout ce qui a travaillé, on relâche, on respire. Idéal le dimanche pour récupérer.',
    echauffement: 'Quelques rotations douces (cou, hanches, chevilles).',
    exos: [
      { nom: 'Étirement cuisses & fessiers', dose: '5 min', note: 'Tiens chaque position 30 sec sans à-coups, en respirant.' },
      { nom: 'Ouverture des hanches', dose: '5 min', note: 'Position du pigeon douce, papillon assise. Détend le bas du corps.' },
      { nom: 'Dos & taille', dose: '5 min', note: 'Posture de l’enfant, torsions allongée, chat-vache à quatre pattes.' },
      { nom: 'Respiration ventrale', dose: '5 min', note: 'Allongée, main sur le ventre : inspire en gonflant le ventre, souffle lentement. Anti-stress et anti-ballonnement.' },
    ],
    retour: 'Reste 2 min allongée, yeux fermés. Tu l’as méritée.',
    musique: 'Musique douce / lo-fi. On baisse le rythme cardiaque.',
    epaules: 'Évite les étirements qui forcent sur les épaules. ✅',
  },
  repos: {
    id: 'repos', type: 'repos', title: 'Repos', sub: 'Le corps se transforme au repos', duree: '—',
    intro: 'Jour off. Le muscle se renforce et s’affine pendant la récupération, pas seulement pendant l’effort. Bouge un peu dans la journée (marche, escaliers) et profite.',
    exos: [],
    musique: '',
    epaules: '',
  },
}

// raccourci pour fabriquer un jour
const day = (code, label, main, opts = {}) => ({ code, label, main, note: opts.note || null })

// Le squelette d'une semaine type : 3 séances ciblées + repos.
// Lun = cuisses/fesses · Mer = cardio · Ven = ventre (48h de récup entre chaque).
const semaineType = [
  day('Lun', 'Lundi', W.bas),
  day('Mar', 'Mardi', W.repos, { note: 'Repos. Bouge un peu dans la journée (marche, escaliers) si l’envie est là.' }),
  day('Mer', 'Mercredi', W.cardio),
  day('Jeu', 'Jeudi', W.repos, { note: 'Repos. Le corps s’affine et se renforce pendant la récupération.' }),
  day('Ven', 'Vendredi', W.ventre),
  day('Sam', 'Samedi', W.repos, { note: 'Bonus facultatif : une marche ou des étirements (onglet Bouger). Mais tes 3 séances suffisent largement 👍' }),
  day('Dim', 'Dimanche', W.repos, { note: 'Repos bien mérité. Pour récupérer en douceur : la séance souplesse de l’onglet Bouger.' }),
]

// 4 semaines : même structure, intensité ressentie qui monte.
export const weeks = [
  {
    num: 1, phase: 'Kick-start', emoji: '🌸', label: 'On démarre en douceur',
    start: '2026-06-15', end: '2026-06-21', dates: '15 → 21 juin',
    note: 'Semaine découverte : apprends bien les mouvements, sans forcer. Mieux vaut propre et léger que rapide et bâclé. L’objectif : tenir tes 3 séances.',
    days: semaineType,
  },
  {
    num: 2, phase: 'Kick-start', emoji: '🔥', label: 'On accélère — fin du défi 14 j',
    start: '2026-06-22', end: '2026-06-28', dates: '22 → 28 juin',
    note: 'Tu connais les mouvements : monte un peu l’intensité (descends plus bas dans les squats, serre plus fort les fesses). Dimanche = bilan des 2 premières semaines 🎉',
    days: semaineType,
  },
  {
    num: 3, phase: 'Routine', emoji: '💪', label: 'On installe l’habitude',
    start: '2026-06-29', end: '2026-07-05', dates: '29 juin → 5 juil.',
    note: 'Le plus dur (commencer) est derrière. Maintenant on ancre la routine. Ajoute 1 ou 2 répétitions par série si tu te sens bien.',
    days: semaineType,
  },
  {
    num: 4, phase: 'Routine', emoji: '✨', label: 'C’est devenu un réflexe',
    start: '2026-07-06', end: '2026-07-12', dates: '6 → 12 juillet',
    note: 'Un mois de bougeotte ! Le corps est plus tonique, le ventre plus plat, l’énergie au top. Tu peux reprendre ces semaines en boucle ou corser un peu.',
    days: semaineType,
  },
]

// Bibliothèque des séances pour l'onglet « Bouger » (sans le repos)
export const seancesLib = [W.bas, W.cardio, W.ventre, W.circuit, W.marche, W.stretch]
