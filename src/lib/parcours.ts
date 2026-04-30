/**
 * Catalogue des parcours d'accompagnement 3 mois et de l'abonnement
 * Studio « Le Cercle Etincel ».
 *
 * Modèle business :
 *  - Niveau 1 : Studio en ligne récurrent (29 €/mois) — démultiplie le
 *    temps de Céline et crée une communauté fidèle.
 *  - Niveau 2 : Séances individuelles (déjà gérées via /reserver).
 *  - Niveau 3 : Parcours 3 mois (1 800 € - 3 200 €) — formules templates
 *    construites par Céline mais perçues comme sur-mesure car attribuées
 *    après un échange préalable de 30 min. Studio inclus pendant le parcours.
 *  - Niveau 4 : Retraites premium (déjà gérées via /retraites).
 */

export type ParcoursBrick = {
  name: string;
  detail?: string;
};

export type Parcours = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  forWhom: string[];
  duration: string;
  price: number;
  priceLabel: string;
  installments: string;
  bricks: ParcoursBrick[];
  bonuses: string[];
  level: 1 | 2 | 3;
  productId: string;
};

export const parcours: Parcours[] = [
  {
    id: "reflet",
    slug: "reflet",
    name: "Reflet",
    tagline: "Pour déposer ce qui pèse et retrouver le calme.",
    description:
      "Un parcours pensé pour les périodes d'épuisement, de charge émotionnelle ou de fatigue qui ne se règle plus seule. Le travail commence par le relâchement, puis la libération vient quand l'espace est revenu.",
    forWhom: [
      "Personnes en épuisement progressif (pro, parental, émotionnel)",
      "Charges anciennes qui pèsent encore sans qu'on sache les nommer",
      "Besoin profond d'apaisement avant tout travail d'analyse",
    ],
    duration: "12 semaines",
    price: 1800,
    priceLabel: "1 800 €",
    installments: "ou 3 × 600 € sans frais",
    bricks: [
      { name: "Échange préalable de 30 min", detail: "Pour poser l'intention juste" },
      { name: "6 séances individuelles", detail: "Hypnose · CellRelease® · Massage Libération · selon votre fil" },
      { name: "2 cercles de femmes mensuels", detail: "Sororité, partage, intégration" },
      { name: "Synthèse écrite mi-parcours", detail: "Céline relit votre cheminement et propose des ajustements" },
    ],
    bonuses: [
      "Le Cercle Etincel offert pendant 3 mois (méditations, cercles live, communauté)",
      "Suivi WhatsApp continu avec Céline entre les séances",
      "Accès prioritaire aux créneaux",
    ],
    level: 1,
    productId: "parcours-reflet-1800",
  },
  {
    id: "boussole",
    slug: "boussole",
    name: "Boussole",
    tagline: "Pour comprendre votre chemin et orienter ce qui vient.",
    description:
      "Un parcours pour les femmes en quête de sens, en transition de vie ou dans une période de redéfinition. La numérologie ouvre la lecture, les pratiques sensibles incarnent ce qui s'éclaire.",
    forWhom: [
      "Personnes en transition de vie (rupture, parentalité, virage pro)",
      "Quête de clarté et de sens — comprendre avant d'agir",
      "Besoin d'une vue d'ensemble de votre trajectoire et de vos cycles",
    ],
    duration: "12 semaines",
    price: 2400,
    priceLabel: "2 400 €",
    installments: "ou 3 × 800 € sans frais",
    bricks: [
      { name: "Échange préalable de 30 min", detail: "Pour ajuster le parcours à votre élan" },
      { name: "1 lecture numérologie complète", detail: "Avec synthèse écrite remise" },
      { name: "4 séances individuelles", detail: "Selon ce qui s'ouvre — hypnose, soins, breathwork" },
      { name: "1 constellation familiale ou Rebirth", detail: "Pour éclairer ce qui se transmet" },
      { name: "1 cercle de femmes mensuel", detail: "Sororité, écho, intégration" },
      { name: "1 cérémonie cacao", detail: "Pour ancrer l'élan en présence" },
    ],
    bonuses: [
      "Le Cercle Etincel offert pendant 3 mois",
      "Suivi WhatsApp continu",
      "Accès prioritaire aux créneaux",
      "Bilan final écrit en fin de parcours",
    ],
    level: 2,
    productId: "parcours-boussole-2400",
  },
  {
    id: "metamorphose",
    slug: "metamorphose",
    name: "Métamorphose",
    tagline: "Pour traverser, vraiment, et inscrire le changement dans le corps.",
    description:
      "Le parcours le plus profond. Pour les femmes prêtes à un travail puissant qui mobilise tout l'être — corps, lignée, intuition, communauté. Une retraite week-end est intégrée comme passage central.",
    forWhom: [
      "Personnes prêtes à un travail de transformation profonde",
      "Besoin d'immersion, pas seulement de séances ponctuelles",
      "Expérience préalable bienvenue (yoga, méditation, thérapie)",
    ],
    duration: "12 semaines",
    price: 3200,
    priceLabel: "3 200 €",
    installments: "ou 3 × 1 067 € · ou 6 × 533 € sans frais",
    bricks: [
      { name: "Échange préalable de 45 min", detail: "Pour calibrer l'intensité juste" },
      { name: "1 lecture numérologie complète", detail: "Avec synthèse écrite" },
      { name: "1 constellation familiale Rebirth", detail: "Le travail systémique en profondeur" },
      { name: "4 séances corporelles intenses", detail: "Breathwork chamanique, massages, soins énergétiques" },
      { name: "1 retraite week-end (3 jours)", detail: "Hébergement + repas inclus, en petit groupe" },
      { name: "1 cercle de femmes mensuel", detail: "Sororité tout au long du parcours" },
      { name: "Bilan final 1h en visio", detail: "Pour ancrer ce qui s'est levé" },
    ],
    bonuses: [
      "Le Cercle Etincel offert pendant 6 mois (3 mois bonus après la fin du parcours)",
      "Séance individuelle bonus avec Céline pendant la retraite",
      "Suivi WhatsApp continu et prioritaire",
      "Accès prioritaire aux créneaux et aux dates de retraite",
      "Carnet personnel envoyé en début de parcours",
    ],
    level: 3,
    productId: "parcours-metamorphose-3200",
  },
];

/**
 * Studio en ligne « Le Cercle Etincel »
 * Abonnement mensuel ou annuel · accès méditations + cercles live + communauté.
 */
export const studio = {
  name: "Le Cercle Etincel",
  tagline: "L'espace privilégié de Céline, en ligne.",
  description:
    "Un abonnement pour avancer à votre rythme entre les séances individuelles : méditations guidées, cercles live mensuels en visio, replays disponibles, audio d'écriture, et une communauté tenue par Céline.",
  monthlyPrice: 29,
  monthlyPriceLabel: "29 €",
  yearlyPrice: 290,
  yearlyPriceLabel: "290 €",
  yearlySavingsLabel: "soit 17 % d'économie",
  productMonthly: "studio-mensuel-29",
  productYearly: "studio-annuel-290",
  pillars: [
    {
      icon: "Headphones",
      title: "30+ méditations guidées",
      description:
        "Audios de 10 à 30 minutes, classés par intention : apaiser, ancrer, ouvrir le cœur, retrouver le sommeil. Nouveaux contenus chaque mois.",
    },
    {
      icon: "Users",
      title: "1 cercle live mensuel",
      description:
        "Une visio en petit comité (max 30 personnes) — breathwork doux, cacao online, cercle de parole — animée par Céline en direct.",
    },
    {
      icon: "Repeat",
      title: "Replays disponibles 30 jours",
      description:
        "Si vous avez raté une séance live, le replay reste disponible 30 jours pour la vivre à votre rythme.",
    },
    {
      icon: "PenLine",
      title: "Carnet d'écriture mensuel",
      description:
        "Chaque mois, Céline pose une question et propose un audio d'introspection à faire chez vous, à votre rythme.",
    },
    {
      icon: "MessageCircle",
      title: "Communauté privée",
      description:
        "Un espace WhatsApp où Céline pose des intentions, propose des prompts, et où les membres se relient. Pas un groupe de bavardage — un cercle tenu.",
    },
    {
      icon: "Zap",
      title: "Accès prioritaire",
      description:
        "Les abonnées sont averties en avant-première des nouvelles dates de retraites et des prochains parcours 3 mois.",
    },
  ],
  faq: [
    {
      q: "Combien de temps me prend l'abonnement chaque mois ?",
      a: "Tout est libre. Une méditation de 15 min suffit certaines semaines. Le cercle live mensuel dure environ 90 min. Vous picorez selon votre rythme — l'idée n'est pas d'ajouter une obligation à votre agenda, mais d'avoir accès à Céline quand vous en avez besoin.",
    },
    {
      q: "Comment se passe le cercle live ?",
      a: "Sur Zoom, le 2e dimanche du mois à 10h30. Petit groupe (max 30), caméra optionnelle, possibilité de rester en silence. Replays envoyés par email dans les 24h.",
    },
    {
      q: "Je n'ai pas de compte WhatsApp, c'est un problème ?",
      a: "Non. La communauté WhatsApp est optionnelle — vous pouvez profiter du Studio sans la rejoindre. Tous les contenus sont aussi accessibles par email.",
    },
    {
      q: "Puis-je arrêter à tout moment ?",
      a: "Oui. L'abonnement mensuel se résilie en 1 clic depuis votre espace personnel. Aucun engagement — vous restez tant que ça vous nourrit.",
    },
    {
      q: "Est-ce inclus dans les parcours 3 mois ?",
      a: "Oui — le Studio est offert pendant toute la durée du parcours (3 mois minimum, 6 mois pour Métamorphose). Une fois le parcours terminé, vous pouvez choisir de continuer en mensuel ou non.",
    },
    {
      q: "Différence avec une chaîne YouTube méditation ?",
      a: "Tout est créé par Céline, pour Céline — pas de contenu générique. Les cercles live ne sont pas des replays. La communauté est privée et tenue. Et l'argent rémunère le travail réel d'une praticienne, pas les algorithmes.",
    },
  ],
} as const;

export function getParcours(slug: string): Parcours | undefined {
  return parcours.find((p) => p.slug === slug);
}
