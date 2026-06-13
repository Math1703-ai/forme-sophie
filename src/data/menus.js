// ───────────────────────────────────────────────────────────
//  MENUS DE SOPHIE
//  • objectif : affiner + dégonfler le ventre, sans frustration
//  • petit-déj SUCRÉ mais rassasiant (pour tenir sans grignoter)
//  • anti-grignotage : une collation prévue = pas de craquage
//  • dîners légers et digestes (anti-ventre gonflé)
//  • niveau : 'leger' | 'equilibre' | 'gourmand' → sert au coach du soir
// ───────────────────────────────────────────────────────────

export const waterGoal = 8 // verres de ~200 ml = ~1,5 L / jour

// Petit-déjeuner : tendance sucrée, mais avec protéines + fibres
// pour caler la faim et éviter la fringale de 11h.
export const petitDej = [
  {
    id: 'pd-yaourt', emoji: '🍓', name: 'Bowl yaourt grec & fruits rouges', niveau: 'equilibre',
    desc: 'Yaourt grec + fruits rouges + 1 c. à café de miel + 2 c. à soupe de flocons d’avoine. Sucré, crémeux et rassasiant.',
  },
  {
    id: 'pd-porridge', emoji: '🥣', name: 'Porridge banane-cacao', niveau: 'equilibre',
    desc: 'Flocons d’avoine cuits dans du lait, 1/2 banane écrasée, 1 c. à café de cacao non sucré. Le « chocolat chaud » qui tient au corps.',
  },
  {
    id: 'pd-pancakes', emoji: '🥞', name: 'Pancakes avoine-banane', niveau: 'gourmand',
    desc: '1 banane + 1 œuf + 3 c. à soupe de flocons d’avoine mixés, à la poêle. Un filet de miel ou de sirop d’érable. Effet plaisir garanti.',
  },
  {
    id: 'pd-tartine', emoji: '🍞', name: 'Tartines complètes & purée d’amande', niveau: 'equilibre',
    desc: '2 tranches de pain complet + purée d’amande + rondelles de banane. Le bon gras + le sucre lent.',
  },
  {
    id: 'pd-smoothie', emoji: '🥤', name: 'Smoothie fraise-banane protéiné', niveau: 'leger',
    desc: 'Fraises + 1/2 banane + yaourt grec ou fromage blanc + un peu de lait. Frais et doux pour les matins pressés.',
  },
]

export const dejeuners = [
  {
    id: 'dj-poulet', emoji: '🍗', name: 'Poulet + légumes + riz', niveau: 'equilibre',
    desc: 'Blanc de poulet, belle portion de légumes (courgettes, poivrons…), 4-5 c. à soupe de riz. L’assiette équilibrée de référence.',
  },
  {
    id: 'dj-poisson', emoji: '🐟', name: 'Poisson + patate douce + légumes verts', niveau: 'equilibre',
    desc: 'Filet de poisson au four, patate douce, haricots verts ou brocoli. Léger et complet.',
  },
  {
    id: 'dj-buddha', emoji: '🥗', name: 'Buddha bowl quinoa', niveau: 'leger',
    desc: 'Quinoa, pois chiches, avocat, crudités, œuf dur. Fibres + protéines végétales, très rassasiant.',
  },
  {
    id: 'dj-omelette', emoji: '🍳', name: 'Omelette + grande salade', niveau: 'leger',
    desc: 'Omelette 2-3 œufs aux herbes, grande salade variée, un peu de pain complet. Express et léger.',
  },
  {
    id: 'dj-resto', emoji: '🍽️', name: 'Repas extérieur / resto', niveau: 'gourmand',
    desc: 'Tu manges dehors : choisis plutôt une viande/poisson grillé + légumes, et garde le dessert pour le partager. (Le coach du soir s’adaptera 😉)',
  },
]

export const collations = [
  {
    id: 'co-pomme', emoji: '🍎', name: 'Fruit + quelques amandes', niveau: 'leger',
    desc: 'Une pomme et 8-10 amandes. Le combo fibres + bon gras qui coupe la faim de l’après-midi.',
  },
  {
    id: 'co-yaourt', emoji: '🥛', name: 'Yaourt nature + miel', niveau: 'leger',
    desc: 'Yaourt nature (ou skyr) avec une c. à café de miel. Doux, sucré, protéiné.',
  },
  {
    id: 'co-choco', emoji: '🍫', name: '2 carrés de chocolat noir', niveau: 'equilibre',
    desc: 'Chocolat noir 70 % + une clémentine ou quelques noisettes. La dose de plaisir sucré qui évite le craquage du soir.',
  },
  {
    id: 'co-compote', emoji: '🍏', name: 'Compote sans sucre ajouté', niveau: 'leger',
    desc: 'Une gourde de compote pomme sans sucre ajouté. Quand la pulsion sucrée frappe.',
  },
]

export const diners = [
  {
    id: 'di-soupe', emoji: '🥣', name: 'Soupe de légumes + œuf', niveau: 'leger',
    desc: 'Grand bol de soupe maison (poireau, courgette, carotte) + 1 œuf dur ou un peu de fromage. Hyper digeste, dégonfle le ventre.',
  },
  {
    id: 'di-poisson', emoji: '🐟', name: 'Poisson vapeur + légumes cuits', niveau: 'leger',
    desc: 'Poisson blanc + légumes CUITS (les crudités le soir ballonnent). Léger, parfait avant de dormir.',
  },
  {
    id: 'di-poelee', emoji: '🍲', name: 'Poêlée de légumes + protéine', niveau: 'equilibre',
    desc: 'Courgettes/champignons/brocoli sautés + blanc de poulet ou tofu. Peu ou pas de féculents le soir.',
  },
  {
    id: 'di-omelette', emoji: '🍳', name: 'Omelette aux légumes', niveau: 'equilibre',
    desc: '2 œufs + épinards ou courgettes. Rapide, rassasiant, léger pour la nuit.',
  },
  {
    id: 'di-plaisir', emoji: '🍷', name: 'Dîner plaisir (week-end / sortie)', niveau: 'gourmand',
    desc: 'Tu te fais plaisir ce soir ? Profite ! Mange lentement, bois un grand verre d’eau entre chaque verre de vin, et on repart léger demain.',
  },
]

// Le menu « par défaut » suggéré chaque jour (elle peut choisir autre chose).
export const menuDefaut = {
  pd: 'pd-yaourt',
  dj: 'dj-poulet',
  co: 'co-choco',
  di: 'di-poisson',
}

// Réflexes du week-end (quand Sophie sort davantage)
export const weekendTips = {
  title: 'Tu sors ce week-end ? 🥂',
  intro: 'On ne se prive pas — on profite intelligemment. Aucune culpabilité : un repas festif ne défait pas une semaine de bonne hygiène.',
  tips: [
    '🥗 À l’apéro : pioche dans les crudités/olives, pose-toi loin du saladier de chips.',
    '🍽️ Au plat : privilégie une viande ou un poisson grillé + des légumes. Le féculent, en accompagnement, pas en montagne.',
    '🍫 Dessert : partage-le, ou prends-en la moitié. Le plaisir est dans les 3 premières bouchées.',
    '🍷 Alcool : un grand verre d’eau entre chaque verre. Ça hydrate, ça ralentit, et le réveil est bien meilleur.',
    '🚶‍♀️ Le lendemain : une bonne marche + une journée « légère » (soupe, légumes, beaucoup d’eau) et tout est rééquilibré.',
  ],
}

// Petits messages du coach selon l'équilibre de la journée (voir utils → coachMessage)
export const coachLignes = {
  vide: 'Coche ce que tu manges au fil de la journée 🍽️ — je t’aiderai à ajuster le dîner ce soir.',
  leger: 'Journée légère et carrée 👏 Tu peux dîner normalement, et même t’accorder 2 carrés de chocolat noir si l’envie est là.',
  equilibre: 'Belle journée équilibrée ✨ Pour le dîner, vise léger et digeste (poisson/légumes ou soupe) : tu dormiras mieux et le ventre restera plat.',
  gourmand: 'Repas un peu riche aujourd’hui, et c’est ok 💗 Ce soir, on allège : soupe ou poisson + légumes cuits, un grand verre d’eau, et demain on repart en pleine forme. Zéro culpabilité.',
}
