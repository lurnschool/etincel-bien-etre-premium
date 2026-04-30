/**
 * Source de vérité pour toutes les données affichées sur le site.
 *
 * Convention :
 *  - `confirmed` : donnée vérifiée depuis le site etinceldebienetre.fr (audit 2026-04-29)
 *  - `briefed` : donnée fournie par le chef de projet (à valider avec Céline)
 *  - `pending` : donnée à demander à la cliente avant publication
 *
 * Ne jamais inventer de tarif, date, lieu, certification, avis Google,
 * témoignage ou disponibilité sans validation explicite.
 */

export type DataSource = "confirmed" | "briefed" | "pending";

export const brand = {
  name: "Etincel de bien être",
  practitioner: "Céline Dusseval",
  tagline: "Accompagnatrice bien-être",
  positioning: "Praticienne holistique en Gironde",
  promise:
    "Un espace pour vous reconnecter à votre corps, à votre histoire et à votre élan intérieur.",
  promiseAlt:
    "Des accompagnements sensibles et profonds pour retrouver votre équilibre, libérer ce qui vous freine et rallumer votre étincelle intérieure.",
  shortDescription:
    "Céline Dusseval vous accompagne à travers des pratiques sensibles, corporelles, énergétiques et symboliques pour retrouver de l'apaisement, de la clarté et votre élan intérieur.",
} as const;

export const contact = {
  phone: "06 27 43 81 04",
  phoneInternational: "+33 6 27 43 81 04",
  phoneLink: "tel:+33627438104",
  whatsappLink: "https://wa.me/33627438104",
  email: "etincel33@gmail.com",
  emailLink: "mailto:etincel33@gmail.com",
  addressMain: {
    label: "Le Taillan-Médoc",
    street: "87 Avenue de Germignan",
    city: "33320 Le Taillan-Médoc",
    source: "confirmed" as DataSource,
  },
  addressSecondary: {
    label: "Univers'elles · Martignas-sur-Jalle",
    note: "ou selon événement",
    city: "33127 Martignas-sur-Jalle",
    source: "confirmed" as DataSource,
  },
  region: "Bordeaux Métropole · Gironde",
  // Lien Google Business à brancher dès que Céline aura confirmé l'URL officielle
  // (format attendu : https://maps.app.goo.gl/... ou https://g.co/...).
  // Le composant GoogleReviewsTeaser détecte les placeholders et désactive
  // le bouton "Voir les avis Google" tant que le lien n'est pas authentique.
  googleReviewsUrl: "",
  social: {
    facebook: {
      label: "Etincel — Céline Dusseval",
      url: "https://www.facebook.com/",
      handle: "Etincel Céline Dusseval",
      source: "confirmed" as DataSource,
    },
    instagram: {
      label: "@celine_dusseval_etincel",
      url: "https://www.instagram.com/celine_dusseval_etincel/",
      handle: "celine_dusseval_etincel",
      source: "confirmed" as DataSource,
    },
  },
} as const;

/**
 * Navigation principale — 6 items centrés autour des 3 axes de Céline.
 * Le logo Etincel sert de retour à l'accueil (pas besoin d'item « Accueil »).
 * Les labels visibles sont courts mais les slugs sont explicites pour le SEO.
 */
export const navigation = [
  { label: "Mémoires", href: "/memoires-constellations" },
  { label: "Féminin & cacao", href: "/feminin-cacao" },
  { label: "Corps", href: "/corps-integration" },
  { label: "Retraites", href: "/retraites" },
  { label: "Céline", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Actions secondaires (header desktop allégé + footer + drawer mobile).
 * Le Cercle et Parcours 3 mois sont accessibles via le footer et les
 * pages piliers, pour ne pas surcharger le header.
 */
export const navigationActions = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Offrir", href: "/cartes-cadeaux" },
] as const;

/** Offres premium accessibles depuis le footer + drawer mobile. */
export const navigationOffers = [
  { label: "Le Cercle Etincel · 29 €/mois", href: "/le-cercle" },
  { label: "Parcours 3 mois · à partir de 1 800 €", href: "/accompagnement-3-mois" },
] as const;

/**
 * Outils mobilisés par Céline — accessibles depuis le footer et les
 * pages piliers. Ne sont PAS des offres centrales mais des moyens au
 * service des 3 axes.
 */
export const toolsLinks = [
  { label: "Numérologie", href: "/accompagnements/numerologie" },
  { label: "Hypnose", href: "/accompagnements/hypnose" },
  { label: "CellRelease®", href: "/accompagnements/cellrelease" },
  { label: "Massage Libération Reconnexion", href: "/accompagnements/massage-liberation-reconnexion" },
  { label: "Massage énergétique", href: "/accompagnements/massage-energetique" },
  { label: "Réflexologie amérindienne", href: "/accompagnements/reflexologie" },
  { label: "Breathwork chamanique", href: "/accompagnements/breathwork" },
  { label: "Innerdance", href: "/innerdance" },
  { label: "Cercles de femmes", href: "/cercles-de-femmes" },
  { label: "Cérémonie cacao", href: "/cacao" },
  { label: "Constellations", href: "/constellations" },
  { label: "Féminin sacré", href: "/feminin-sacre" },
  { label: "Formations numérologie", href: "/formations" },
  { label: "Catalogue complet", href: "/accompagnements" },
] as const;

export const portesEntree = [
  {
    title: "J'ai besoin d'un accompagnement individuel",
    description:
      "Une séance dédiée à votre histoire, votre rythme, votre besoin du moment.",
    href: "/accompagnements",
    cta: "Découvrir les pratiques",
    accent: "accent",
  },
  {
    title: "Je veux vivre une expérience collective",
    description:
      "Cercles, breathwork, innerdance, ateliers : la force du groupe et du partage.",
    href: "/collectif",
    cta: "Voir les expériences",
    accent: "rose",
  },
  {
    title: "Je souhaite explorer mon féminin",
    description:
      "Un espace symbolique et sensible pour revenir à son corps, ses cycles, son intuition.",
    href: "/feminin-sacre",
    cta: "Explorer le féminin sacré",
    accent: "gold",
  },
  {
    title: "Je veux offrir ou m'inscrire à un événement",
    description:
      "Cartes cadeaux, ateliers, retraites, cercles : un geste profond pour soi ou un proche.",
    href: "/cartes-cadeaux",
    cta: "Découvrir les cadeaux",
    accent: "accent-deep",
  },
] as const;

export type Practice = {
  slug: string;
  name: string;
  intent: string;
  family: "comprendre" | "apaiser" | "corps" | "explorer" | "feminin" | "cacao";
  pitch: string;
  forWho: string;
  duration: string;
  price: string;
  format: string;
  source: DataSource;
  disclaimer?: string;
};

/**
 * Catalogue des accompagnements individuels.
 * Tarifs et durées : confirmer avec Céline avant publication finale.
 */
export const accompagnementsIndividuels: Practice[] = [
  {
    slug: "numerologie",
    name: "Numérologie",
    intent: "Comprendre son chemin",
    family: "comprendre",
    pitch:
      "Lire la symbolique des nombres pour identifier vos talents, vos cycles et les ressources qui vous appartiennent déjà.",
    forWho:
      "Pour ceux et celles qui cherchent à donner du sens à leur trajectoire ou à éclairer une transition.",
    duration: "1h30",
    price: "110 €",
    format: "Présentiel · Distanciel à confirmer",
    source: "confirmed" as DataSource,
  },
  {
    slug: "hypnose",
    name: "Hypnose & mouvements oculaires",
    intent: "Apaiser, libérer",
    family: "apaiser",
    pitch:
      "Un voyage intérieur pour reconnecter à l'inconscient et aux potentialités souvent enfouies sous nos automatismes.",
    forWho:
      "Pour les personnes traversant un blocage, un schéma répétitif, un besoin d'apaisement profond.",
    duration: "1h30",
    price: "90 €",
    format: "Présentiel",
    source: "confirmed" as DataSource,
  },
  {
    slug: "cellrelease",
    name: "CellRelease®",
    intent: "Apaiser, libérer",
    family: "apaiser",
    pitch:
      "Une relaxation profonde qui invite à libérer les mémoires cellulaires et à se reconnecter à son essence.",
    forWho:
      "Pour ceux qui ressentent une fatigue émotionnelle, un trop-plein, ou cherchent un retour au calme.",
    duration: "1h30",
    price: "90 €",
    format: "Présentiel",
    source: "confirmed" as DataSource,
  },
  {
    slug: "massage-energetique",
    name: "Massage & soin énergétique",
    intent: "Revenir au corps",
    family: "corps",
    pitch:
      "Un soin combinant toucher, instruments et vibrations pour réactiver la circulation de l'énergie dans le corps.",
    forWho:
      "Pour les personnes qui ont besoin de se réinhabiter, de relâcher les tensions accumulées.",
    duration: "1h",
    price: "90 €",
    format: "Présentiel",
    source: "confirmed" as DataSource,
  },
  {
    slug: "massage-liberation-reconnexion",
    name: "Massage Libération Reconnexion",
    intent: "Revenir au corps",
    family: "corps",
    pitch:
      "Un massage en profondeur pensé comme un dialogue entre la main, le souffle et la mémoire du corps.",
    forWho: "Pour celles et ceux qui souhaitent un retour sensoriel doux et habité.",
    duration: "1h20 ou 1h45",
    price: "90 € (1h20) · 120 € (1h45)",
    format: "Présentiel",
    source: "confirmed" as DataSource,
  },
  {
    slug: "reflexologie",
    name: "Réflexologie amérindienne spirituelle",
    intent: "Revenir au corps",
    family: "corps",
    pitch:
      "Une pratique transmise par des chamans mexicains qui stimule des zones réflexes des pieds pour ouvrir l'inconscient.",
    forWho:
      "Pour explorer un travail subtil, à la fois corporel et symbolique.",
    duration: "1h",
    price: "90 €",
    format: "Présentiel",
    source: "confirmed" as DataSource,
  },
  {
    slug: "breathwork",
    name: "Breathwork chamanique individuel",
    intent: "Explorer l'intérieur",
    family: "explorer",
    pitch:
      "La puissance du souffle pour traverser et transmuter ce qui demande à être déposé.",
    forWho:
      "Pour les personnes prêtes à explorer un travail intense et profondément libérateur.",
    duration: "2h",
    price: "90 € individuel · 140 € en duo",
    format: "Présentiel",
    source: "confirmed" as DataSource,
    disclaimer:
      "Pratique respiratoire intense — un échange préalable avec Céline est nécessaire pour vérifier les contre-indications.",
  },
  {
    slug: "innerdance-individuel",
    name: "Innerdance individuel",
    intent: "Explorer l'intérieur",
    family: "explorer",
    pitch:
      "Une expérience sensible mêlant musique, corps et états de présence pour écouter ce qui cherche à émerger.",
    forWho: "Pour celles et ceux qui souhaitent ralentir et explorer autrement.",
    duration: "Durée à confirmer",
    price: "Sur demande",
    format: "Présentiel",
    source: "briefed" as DataSource,
  },
  {
    slug: "feminin-sacre",
    name: "Féminin sacré · médecine symbolique de l'utérus",
    intent: "Féminin sacré",
    family: "feminin",
    pitch:
      "Un accompagnement autour du féminin sacré et de la symbolique de l'utérus, pensé comme un espace de reconnexion à soi, à son corps, à son histoire et à son énergie créatrice.",
    forWho:
      "Pour les femmes en quête d'un espace sensible pour leur corps, leurs cycles et leur intuition.",
    duration: "Durée à confirmer",
    price: "Sur demande",
    format: "Présentiel",
    source: "briefed" as DataSource,
    disclaimer:
      "Démarche de bien-être et de développement personnel — ne remplace pas un suivi médical, gynécologique ou psychologique.",
  },
  {
    slug: "cacao-rituel",
    name: "Rituel cacao · cérémonie",
    intent: "Cœur & rituel",
    family: "cacao",
    pitch:
      "Une expérience symbolique et sensorielle autour du cacao, pensée comme un espace de présence, d'ouverture du cœur, de partage et de reconnexion à soi.",
    forWho:
      "Pour celles et ceux qui veulent ralentir, ouvrir un espace sensible, vivre un rituel doux en individuel ou en cercle.",
    duration: "Durée à confirmer",
    price: "Sur demande",
    format: "Présentiel · Individuel ou cercle",
    source: "briefed" as DataSource,
    disclaimer:
      "Le cacao cérémoniel est consommé en très petite quantité. Si vous suivez un traitement (notamment antidépresseurs), avez une condition cardiaque ou êtes enceinte, parlez-en avec votre médecin avant la cérémonie.",
  },
];

/**
 * Expériences collectives — incluent cercles, breathwork, innerdance, etc.
 */
export const experiencesCollectives = [
  {
    slug: "cercles-de-femmes",
    name: "Cercles de femmes mensuels",
    pitch:
      "Un rendez-vous mensuel pour déposer, partager et revenir à soi en sororité.",
    rhythm: "Mensuel · prochaine date à venir",
    href: "/cercles-de-femmes",
    source: "briefed" as DataSource,
  },
  {
    slug: "breathwork-collectif",
    name: "Breathwork collectif",
    pitch:
      "Une cérémonie de souffle en groupe pour traverser et déposer ce qui demande à l'être.",
    rhythm: "Sessions ponctuelles",
    href: "/collectif#breathwork",
    source: "confirmed" as DataSource,
  },
  {
    slug: "innerdance-collectif",
    name: "Innerdance collectif",
    pitch:
      "Une immersion sonore et corporelle, en groupe, pour écouter ce qui cherche à émerger.",
    rhythm: "Sessions ponctuelles",
    href: "/innerdance#collectif",
    source: "briefed" as DataSource,
  },
  {
    slug: "constellations",
    name: "Constellations familiales",
    pitch:
      "Une exploration symbolique des liens familiaux et de leurs transmissions invisibles.",
    rhythm: "Sessions ponctuelles · 95 €",
    href: "/constellations",
    source: "confirmed" as DataSource,
  },
  {
    slug: "constellations-rebirth",
    name: "Constellations de naissance — Rebirth",
    pitch:
      "Un voyage symbolique au cœur de votre naissance et des empreintes qu'elle a laissées.",
    rhythm: "Sessions ponctuelles · 95 €",
    href: "/constellations#rebirth",
    source: "confirmed" as DataSource,
  },
  {
    slug: "ateliers",
    name: "Ateliers thématiques",
    pitch:
      "Des temps courts pour explorer une pratique ou une thématique spécifique.",
    rhythm: "Programme à venir",
    href: "/collectif#ateliers",
    source: "confirmed" as DataSource,
  },
  {
    slug: "weekend-reconnexion",
    name: "Week-ends reconnexion",
    pitch:
      "Deux journées immersives pour ralentir, respirer et revenir à l'essentiel.",
    rhythm: "Dates à venir — rejoindre la liste d'intérêt",
    href: "/retraites",
    source: "confirmed" as DataSource,
  },
] as const;

export const formations = [
  {
    slug: "numerologie-m1",
    name: "Numérologie · Module 1",
    pitch: "Les fondations de la numérologie pour lire les cycles d'une vie.",
    duration: "À confirmer",
    price: "320 €",
    source: "confirmed" as DataSource,
  },
  {
    slug: "numerologie-m2",
    name: "Numérologie · Module 2",
    pitch: "Approfondissement et lecture symbolique avancée des nombres.",
    duration: "À confirmer",
    price: "320 €",
    source: "confirmed" as DataSource,
  },
] as const;

/**
 * Témoignages réels — verbatim aligné au site original etinceldebienetre.fr.
 * Ne pas en ajouter sans validation écrite de la personne concernée.
 * Ne pas reformuler — garder le sens et les mots réels.
 */
export const temoignages = [
  {
    name: "Patrick T.",
    fullName: "Patrick Troadek",
    quote:
      "J'ai rencontré Céline à un moment de ma vie où beaucoup de doutes existaient. N'hésitez pas à vous confier à elle, vous ne le regretterez pas. Dans votre vie, il y aura un avant et un après.",
    source: "confirmed" as DataSource,
  },
  {
    name: "Ludovic M.",
    fullName: "Ludovic Mauresmo",
    quote:
      "Si vous avez des blocages à libérer, je vous garantis à 100% que la méthode de Céline en constellation familiale est vraiment l'une des meilleures que j'ai pu faire.",
    source: "confirmed" as DataSource,
  },
  {
    name: "Sandrine S.",
    fullName: "Sandrine Satsa",
    quote:
      "Céline a ce petit supplément d'âme qui inspire. Chacun y trouvera ce dont il a besoin. Merci à toi belle Etincelle.",
    source: "confirmed" as DataSource,
  },
] as const;

export const disclaimers = {
  bienEtre:
    "Les accompagnements proposés s'inscrivent dans une démarche de bien-être, de développement personnel et de reconnexion à soi. Ils ne remplacent pas un suivi médical, psychologique, gynécologique ou thérapeutique conventionnel lorsque celui-ci est nécessaire.",
  feminin:
    "Cet accompagnement s'inscrit dans une démarche de bien-être et de reconnexion symbolique au corps. Il ne remplace pas un suivi médical, gynécologique ou psychologique.",
  breathwork:
    "Le breathwork est une pratique respiratoire intense. Un échange préalable est nécessaire pour vérifier les contre-indications éventuelles (cardiaques, respiratoires, psychiatriques, grossesse).",
  ia:
    "L'assistant ne remplace pas un échange direct avec Céline et ne fournit pas de conseil médical. En cas de douleur, trouble psychologique ou urgence, consultez un professionnel de santé.",
} as const;

export const cta = {
  primary: { label: "Faire mon bilan", href: "/diagnostic" },
  secondary: { label: "Prendre contact", href: "/contact" },
  discoverPractices: { label: "Découvrir les pratiques", href: "/#atlas" },
  giftCard: { label: "Créer une carte cadeau", href: "/cartes-cadeaux" },
  retreats: { label: "Rejoindre la liste d'intérêt", href: "/retraites#interet" },
  cercles: { label: "Être informée du prochain cercle", href: "/cercles-de-femmes#inscription" },
} as const;

/**
 * Slides du CinematicHeroSlider — Céline en premier (présence humaine
 * et message global), puis les 3 axes structurants (Mémoires · Féminin
 * & cacao · Corps & intégration), puis Retraites et Bilan.
 */
export const heroSlides = [
  {
    id: "celine",
    category: "Etincel · Céline Dusseval",
    title: "Libérer les mémoires, revenir au corps, retrouver votre élan.",
    text:
      "Céline Dusseval accompagne les mémoires, le féminin et l'intégration par le corps à travers les constellations, le cacao, les retraites et les pratiques sensibles.",
    primaryCta: { label: "Faire mon bilan d'orientation", href: "/diagnostic" },
    secondaryCta: { label: "Découvrir les 3 chemins", href: "/#chemins" },
    palette: "rose-velvet",
    image: "/images/celine/portrait-celine.png",
    imagePosition: "object-[center_top]",
  },
  {
    id: "memoires",
    category: "Axe 1 · Mémoires & constellations",
    title: "Libérer les mémoires qui ne vous appartiennent plus.",
    text:
      "Constellations familiales, transgénérationnel, mémoires portées — mettre en lumière les dynamiques invisibles qui influencent votre histoire pour retrouver votre place.",
    primaryCta: { label: "Découvrir l'axe Mémoires", href: "/memoires-constellations" },
    secondaryCta: { label: "Faire le bilan d'orientation", href: "/diagnostic" },
    palette: "deep-night",
    image: undefined,
    imagePosition: undefined,
  },
  {
    id: "feminin",
    category: "Axe 2 · Féminin & cacao",
    title: "Revenir au corps, au cœur et au féminin.",
    text:
      "Cérémonies cacao, cercles de femmes, accompagnement symbolique autour du féminin et de l'intuition. Un espace de douceur, de présence et de reconnexion.",
    primaryCta: { label: "Découvrir l'axe Féminin", href: "/feminin-cacao" },
    secondaryCta: { label: "Rejoindre un cercle", href: "/cercles-de-femmes" },
    palette: "rose-velvet",
    image: "/images/celine/approche-philosophie.jpg",
    imagePosition: "object-[center_30%]",
  },
  {
    id: "corps",
    category: "Axe 3 · Corps & intégration",
    title: "Intégrer par le corps ce que les mots ne suffisent pas à transformer.",
    text:
      "Innerdance, breathwork chamanique, retraites immersives — le souffle, le mouvement et l'expérience intérieure pour ancrer ce qui demande à se transformer.",
    primaryCta: { label: "Découvrir l'axe Corps", href: "/corps-integration" },
    secondaryCta: { label: "Voir les retraites", href: "/retraites" },
    palette: "amethyst",
    image: undefined,
    imagePosition: undefined,
  },
  {
    id: "retraites",
    category: "Immersions premium",
    title: "Retraites & cercles : avancer ensemble autrement.",
    text:
      "6 à 12 personnes · pension complète · séance individuelle intégrée · une expérience pensée comme une transformation, pas comme un séjour.",
    primaryCta: { label: "Découvrir les retraites", href: "/retraites" },
    secondaryCta: { label: "Voir les prochaines dates", href: "/retraites#interet" },
    palette: "rose-gold",
    image: undefined,
    imagePosition: undefined,
  },
  {
    id: "bilan",
    category: "Bilan d'orientation · gratuit · 4 minutes",
    title: "Trouver votre chemin parmi les trois axes.",
    text:
      "Huit questions sensibles pour identifier l'axe principal qui résonne avec votre moment de vie. Bilan personnalisé envoyé par email + guide PDF de 6 pages offert.",
    primaryCta: { label: "Faire mon bilan", href: "/diagnostic" },
    secondaryCta: { label: "Échanger avec Céline", href: "/contact" },
    palette: "cacao",
    image: undefined,
    imagePosition: undefined,
  },
] as const;

export type HeroSlide = (typeof heroSlides)[number];

/**
 * Les 3 axes structurants — repositionnement stratégique 2026.
 * Céline ne vend plus une liste de prestations : elle accompagne les
 * mémoires, le féminin et l'intégration par le corps. Chaque axe
 * mobilise différents outils selon la personne.
 *
 * Mis en avant dans le composant CorePathwaysShowcase de la home.
 */
export const corePathways = [
  {
    id: "memoires-constellations",
    number: "01",
    name: "Mémoires & constellations",
    catchphrase: "Libérer les mémoires qui ne vous appartiennent plus.",
    description:
      "Constellations familiales, transgénérationnel, mémoires portées. Mettre en lumière les loyautés, les répétitions et les dynamiques invisibles qui traversent votre histoire pour retrouver une place plus juste.",
    image: undefined,
    fallback: "hypnose" as const,
    href: "/memoires-constellations",
    cta: "Explorer cet axe",
    tools: ["Constellations familiales", "Constellation Rebirth", "Hypnose transgénérationnelle", "CellRelease®"],
    palette: "deep-night" as const,
  },
  {
    id: "feminin-cacao",
    number: "02",
    name: "Féminin & cacao",
    catchphrase: "Revenir au corps, au cœur et au féminin.",
    description:
      "Cérémonies cacao, cercles de femmes, accompagnement symbolique autour du féminin sacré, des cycles, du corps et de l'intuition. Un espace de douceur, de présence et de reconnexion.",
    image: "/images/celine/approche-philosophie.jpg",
    fallback: "cacao" as const,
    href: "/feminin-cacao",
    cta: "Explorer cet axe",
    tools: ["Cérémonies cacao", "Cercles de femmes", "Médecine symbolique de l'utérus", "Massages comme retour au corps"],
    palette: "rose-velvet" as const,
  },
  {
    id: "corps-integration",
    number: "03",
    name: "Corps & intégration",
    catchphrase: "Intégrer par le corps ce que les mots ne suffisent pas à transformer.",
    description:
      "Innerdance, breathwork chamanique, retraites immersives. Le souffle, le mouvement et l'expérience intérieure pour ancrer ce qui demande à se transformer après une constellation, un travail sur le féminin, ou une transition de vie.",
    image: undefined,
    fallback: "souffle" as const,
    href: "/corps-integration",
    cta: "Explorer cet axe",
    tools: ["Innerdance", "Breathwork chamanique", "Retraites immersives", "Pratiques corporelles"],
    palette: "amethyst" as const,
  },
];

/** Alias temporaire pour compatibilité avec l'ancien composant CorePillars.
 *  À supprimer quand le composant aura été remplacé par CorePathwaysShowcase. */
export const corePillars = corePathways;

/**
 * Pratiques secondaires regroupées par intention — alimentent
 * ComplementaryPracticesExplorer.
 */
export type SecondaryIntent = {
  id: string;
  label: string;
  catchphrase: string;
  practices: { name: string; href: string; format?: string }[];
};

export const secondaryIntents: SecondaryIntent[] = [
  {
    id: "apaiser",
    label: "Libérer une mémoire",
    catchphrase: "Quand le passé demande à être déposé.",
    practices: [
      { name: "Hypnose & mouvements oculaires", href: "/accompagnements/hypnose", format: "Individuel" },
      { name: "CellRelease®", href: "/accompagnements/cellrelease", format: "Individuel" },
    ],
  },
  {
    id: "corps",
    label: "Revenir au corps",
    catchphrase: "Quand le corps appelle à être réhabité.",
    practices: [
      { name: "Massage énergétique", href: "/accompagnements/massage-energetique", format: "Individuel" },
      { name: "Massage Libération Reconnexion", href: "/accompagnements/massage-liberation-reconnexion", format: "Individuel" },
      { name: "Réflexologie amérindienne", href: "/accompagnements/reflexologie", format: "Individuel" },
    ],
  },
  {
    id: "explorer",
    label: "Explorer l'intérieur",
    catchphrase: "Souffle, présence, états sensibles.",
    practices: [
      { name: "Breathwork chamanique", href: "/accompagnements/breathwork", format: "Individuel & collectif" },
      { name: "Innerdance", href: "/innerdance", format: "Individuel & collectif" },
    ],
  },
  {
    id: "feminin",
    label: "Explorer le féminin",
    catchphrase: "Cycles, intuition, énergie créatrice.",
    practices: [
      { name: "Féminin sacré", href: "/feminin-sacre", format: "Individuel" },
      { name: "Cercles de femmes", href: "/cercles-de-femmes", format: "Mensuel" },
    ],
  },
  {
    id: "collectif",
    label: "Vivre en groupe",
    catchphrase: "La force de la présence partagée.",
    practices: [
      { name: "Cercles de femmes", href: "/cercles-de-femmes", format: "Mensuel" },
      { name: "Innerdance collectif", href: "/innerdance#collectif", format: "Sessions ponctuelles" },
      { name: "Breathwork collectif", href: "/collectif#breathwork", format: "Sessions ponctuelles" },
      { name: "Ateliers thématiques", href: "/collectif#ateliers", format: "Programme à venir" },
    ],
  },
  {
    id: "immersion",
    label: "Vivre une immersion",
    catchphrase: "Un temps long pour se déposer pleinement.",
    practices: [
      { name: "Retraites", href: "/retraites", format: "Plusieurs jours" },
      { name: "Week-ends reconnexion", href: "/retraites", format: "Week-end" },
      { name: "Formations en numérologie", href: "/formations", format: "Modules M1 / M2" },
    ],
  },
  {
    id: "offrir",
    label: "Offrir un moment",
    catchphrase: "Une carte cadeau qui ressemble à la personne.",
    practices: [
      { name: "Cartes cadeaux personnalisées", href: "/cartes-cadeaux", format: "6 styles disponibles" },
    ],
  },
];

/**
 * Bande défilante des pratiques — élégante et éditoriale, pas publicitaire.
 */
export const practicesMarquee = [
  "Numérologie",
  "Hypnose",
  "CellRelease®",
  "Innerdance",
  "Breathwork",
  "Cercles de femmes",
  "Cérémonie cacao",
  "Retraites",
  "Féminin sacré",
  "Cartes cadeaux",
  "Massage énergétique",
  "Réflexologie amérindienne",
  "Constellations",
] as const;

/**
 * Boussole intérieure — 8 intentions + recommandations associées.
 * Renvoie un slug d'accompagnements ou de pages internes.
 */
export type GuidanceIntent = {
  id: string;
  label: string;
  description: string;
  recommendations: string[]; // slugs des pratiques (Practice.slug) ou pages (préfix /)
  cta: { label: string; href: string };
};

export const guidanceIntents: GuidanceIntent[] = [
  {
    id: "changement",
    label: "Je traverse une période de changement",
    description:
      "Quand le sol bouge, ces pratiques aident à retrouver une boussole intérieure et à éclairer la suite.",
    recommendations: ["numerologie", "hypnose", "innerdance-individuel"],
    cta: { label: "Explorer ces accompagnements", href: "/accompagnements" },
  },
  {
    id: "apaisement",
    label: "J'ai besoin d'apaisement",
    description:
      "Pour relâcher la pression, déposer la fatigue émotionnelle et revenir à un rythme plus doux.",
    recommendations: ["cellrelease", "hypnose", "massage-energetique"],
    cta: { label: "Voir ces pratiques", href: "/accompagnements" },
  },
  {
    id: "comprendre",
    label: "Je veux comprendre mon chemin",
    description:
      "Un travail symbolique pour lire les cycles, les motifs, les talents et les ressources qui vous appartiennent.",
    recommendations: ["numerologie"],
    cta: { label: "Découvrir la numérologie", href: "/accompagnements/numerologie" },
  },
  {
    id: "corps",
    label: "Je veux revenir à mon corps",
    description:
      "Ces pratiques ouvrent un espace corporel et sensible pour ralentir, ressentir et revenir à soi.",
    recommendations: [
      "massage-energetique",
      "reflexologie",
      "breathwork",
      "innerdance-individuel",
    ],
    cta: { label: "Voir ces accompagnements", href: "/accompagnements" },
  },
  {
    id: "collectif",
    label: "Je veux vivre une expérience collective",
    description:
      "Cercles, breathwork, innerdance, constellations : la force du groupe pour traverser, partager et avancer.",
    recommendations: ["/cercles-de-femmes", "/collectif", "/innerdance#collectif"],
    cta: { label: "Découvrir le collectif", href: "/collectif" },
  },
  {
    id: "feminin",
    label: "Je veux explorer mon féminin",
    description:
      "Un accompagnement symbolique du corps, des cycles et de l'énergie créatrice — en individuel ou en cercle.",
    recommendations: ["feminin-sacre", "/cercles-de-femmes", "/feminin-sacre"],
    cta: { label: "Explorer le féminin sacré", href: "/feminin-sacre" },
  },
  {
    id: "coeur",
    label: "Je veux ouvrir un espace autour du cœur",
    description:
      "Un rituel sensoriel et symbolique pour ralentir, ouvrir le cœur et déposer en présence — autour du cacao, du souffle ou en cercle.",
    recommendations: ["cacao-rituel", "/cercles-de-femmes", "/cacao"],
    cta: { label: "Découvrir les rituels cacao", href: "/cacao" },
  },
  {
    id: "offrir",
    label: "Je veux offrir un moment",
    description:
      "Une carte cadeau personnalisée — séance, expérience collective, retraite ou montant libre.",
    recommendations: ["/cartes-cadeaux"],
    cta: { label: "Créer une carte cadeau", href: "/cartes-cadeaux" },
  },
  {
    id: "former",
    label: "Je veux me former ou vivre une immersion",
    description:
      "Formations en numérologie ou retraites immersives pour aller plus loin dans la transmission.",
    recommendations: ["/formations", "/retraites"],
    cta: { label: "Découvrir les formats longs", href: "/formations" },
  },
];

/**
 * Phrases poétiques pour le composant WhisperLine — intégrées en discrétion.
 * Toujours latérales, opacité faible, jamais centrales.
 */
export const whisperLines = [
  "Le corps garde parfois ce que les mots n'ont pas encore déposé.",
  "Revenir à soi n'est pas reculer. C'est reprendre racine.",
  "Certaines portes ne s'ouvrent qu'en ralentissant.",
  "Votre souffle sait déjà le chemin.",
  "Il y a des passages qui ne se traversent pas seule.",
  "L'étincelle n'a pas disparu. Elle attendait un espace.",
  "La douceur peut être une force très structurante.",
  "Ce qui se libère n'a pas toujours besoin d'être expliqué.",
  "Un cercle n'impose rien. Il accueille.",
  "Offrir du temps, c'est parfois offrir un retour à soi.",
  "Il y a des passages qui demandent plus de douceur que d'effort.",
  "Le corps sait parfois avant les mots.",
  "Un rituel n'impose rien. Il ouvre un espace.",
  "Le cacao invite à ralentir, écouter, ressentir.",
  "Le souffle remet du mouvement là où tout semblait figé.",
  "Le féminin n'est pas un concept. C'est une présence à retrouver.",
  "Certaines réponses arrivent quand l'espace devient assez calme.",
  "Une retraite n'est pas une fuite. C'est un retour.",
  "Offrir une carte, c'est offrir un temps pour soi.",
  "La transformation commence souvent par une sensation discrète.",
] as const;

/**
 * Familles de l'atlas des pratiques — colonne gauche du PracticeAtlas.
 */
export type PracticeFamily = {
  id: string;
  label: string;
  description: string;
  practices: string[];
  extraLinks?: { label: string; href: string }[];
};

export const practiceFamilies: PracticeFamily[] = [
  {
    id: "comprendre",
    label: "Comprendre son chemin",
    description: "Lire les cycles, les talents, les ressources.",
    practices: ["numerologie"],
  },
  {
    id: "apaiser",
    label: "Apaiser et libérer",
    description: "Relâcher la pression, libérer ce qui demande à l'être.",
    practices: ["hypnose", "cellrelease"],
  },
  {
    id: "corps",
    label: "Revenir au corps",
    description: "Habiter à nouveau la maison qu'est votre corps.",
    practices: ["massage-energetique", "massage-liberation-reconnexion", "reflexologie"],
  },
  {
    id: "explorer",
    label: "Explorer l'intérieur",
    description: "Souffle, états de présence, écoute sensible.",
    practices: ["breathwork", "innerdance-individuel"],
  },
  {
    id: "feminin",
    label: "Féminin sacré",
    description: "Le corps, les cycles, l'intuition, la créativité.",
    practices: ["feminin-sacre"],
    extraLinks: [{ label: "Cercles de femmes", href: "/cercles-de-femmes" }],
  },
  {
    id: "cacao",
    label: "Cœur & rituel cacao",
    description: "Cérémonies cacao en individuel, en cercle ou en retraite.",
    practices: ["cacao-rituel"],
    extraLinks: [
      { label: "Page Cérémonie cacao", href: "/cacao" },
      { label: "Cercles de femmes", href: "/cercles-de-femmes" },
      { label: "Retraites", href: "/retraites" },
    ],
  },
  {
    id: "collectif",
    label: "Collectif & immersions",
    description: "La force du groupe, les retraites, les formations.",
    practices: [],
    extraLinks: [
      { label: "Cercles de femmes", href: "/cercles-de-femmes" },
      { label: "Cérémonie cacao", href: "/cacao" },
      { label: "Innerdance collectif", href: "/innerdance#collectif" },
      { label: "Breathwork collectif", href: "/collectif#breathwork" },
      { label: "Constellations", href: "/collectif#constellations" },
      { label: "Retraites", href: "/retraites" },
      { label: "Formations", href: "/formations" },
    ],
  },
];

export const seoDefaults = {
  siteUrl: "https://etinceldebienetre.fr",
  defaultTitle: "Etincel de bien être — Céline Dusseval, accompagnatrice holistique en Gironde",
  defaultDescription:
    "Céline Dusseval vous accompagne à Bordeaux et en Gironde : numérologie, hypnose, CellRelease®, massages énergétiques, breathwork, innerdance, cercles de femmes, retraites et féminin sacré.",
  ogImage: "/og-image.jpg",
  locale: "fr_FR",
} as const;
