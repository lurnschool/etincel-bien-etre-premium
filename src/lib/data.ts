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
  email: "etincel33@gmail.com",
  emailLink: "mailto:etincel33@gmail.com",
  addressMain: {
    label: "Le Taillan-Médoc",
    street: "87 Avenue de Germignan",
    city: "33320 Le Taillan-Médoc",
    source: "confirmed" as DataSource,
  },
  addressSecondary: {
    label: "Martignas-sur-Jalle",
    city: "33127 Martignas-sur-Jalle",
    source: "confirmed" as DataSource,
  },
  region: "Bordeaux Métropole · Gironde",
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
 * Navigation simplifiée — direction "boussole".
 * Le visiteur n'est plus confronté à un labyrinthe : il choisit d'abord
 * une intention via "Être guidée" ou explore les grandes familles.
 */
export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Être guidée", href: "/#boussole" },
  {
    label: "Individuel",
    href: "/accompagnements",
    children: [
      { label: "Tous les accompagnements", href: "/accompagnements" },
      { label: "Numérologie", href: "/accompagnements/numerologie" },
      { label: "Hypnose", href: "/accompagnements/hypnose" },
      { label: "CellRelease®", href: "/accompagnements/cellrelease" },
      { label: "Massage énergétique", href: "/accompagnements/massage-energetique" },
      { label: "Réflexologie amérindienne", href: "/accompagnements/reflexologie" },
      { label: "Breathwork", href: "/accompagnements/breathwork" },
      { label: "Innerdance", href: "/innerdance#individuel" },
      { label: "Féminin sacré", href: "/feminin-sacre" },
      { label: "Rituel cacao individuel", href: "/collectif/cacao#individuel" },
    ],
  },
  {
    label: "Collectif",
    href: "/collectif",
    children: [
      { label: "Cercles de femmes", href: "/cercles-de-femmes" },
      { label: "Cérémonie cacao", href: "/collectif/cacao" },
      { label: "Innerdance collectif", href: "/innerdance#collectif" },
      { label: "Breathwork collectif", href: "/collectif#breathwork" },
      { label: "Constellations", href: "/collectif#constellations" },
      { label: "Ateliers", href: "/collectif#ateliers" },
    ],
  },
  { label: "Retraites", href: "/retraites" },
  { label: "Offrir", href: "/cartes-cadeaux" },
  { label: "Contact", href: "/contact" },
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    duration: "Durée à confirmer",
    price: "Sur demande",
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
    rhythm: "Sessions ponctuelles",
    href: "/collectif#constellations",
    source: "confirmed" as DataSource,
  },
  {
    slug: "constellations-rebirth",
    name: "Constellations de naissance — Rebirth",
    pitch:
      "Un voyage symbolique au cœur de votre naissance et des empreintes qu'elle a laissées.",
    rhythm: "Sessions ponctuelles",
    href: "/collectif#rebirth",
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
    price: "Sur demande",
    source: "confirmed" as DataSource,
  },
  {
    slug: "numerologie-m2",
    name: "Numérologie · Module 2",
    pitch: "Approfondissement et lecture symbolique avancée des nombres.",
    duration: "À confirmer",
    price: "Sur demande",
    source: "confirmed" as DataSource,
  },
] as const;

/**
 * Témoignages réels du site existant — verbatim conservé.
 * Ne pas en ajouter sans validation écrite de la personne concernée.
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
      "Si vous avez des blocages à libérer, je vous garantis à 100% que la méthode de Céline en constellation familiale est l'une des meilleures que j'ai pu faire.",
    source: "confirmed" as DataSource,
  },
  {
    name: "Sandrine S.",
    fullName: "Sandrine Satsa",
    quote:
      "Céline a ce petit supplément d'âme qui inspire sa vie et accompagne l'autre sur son cheminement. Merci à toi belle Etincelle.",
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
  primary: { label: "Trouver ma porte d'entrée", href: "/#boussole" },
  secondary: { label: "Prendre contact", href: "/contact" },
  discoverPractices: { label: "Découvrir les pratiques", href: "/#atlas" },
  giftCard: { label: "Créer une carte cadeau", href: "/cartes-cadeaux" },
  retreats: { label: "Rejoindre la liste d'intérêt", href: "/retraites#interet" },
  cercles: { label: "Être informée du prochain cercle", href: "/cercles-de-femmes#inscription" },
} as const;

/**
 * Slides du CinematicHeroSlider — pleine largeur, narration éditoriale.
 */
export const heroSlides = [
  {
    id: "reconnexion",
    category: "Reconnexion",
    title: "Un espace pour revenir à vous.",
    text:
      "Céline vous accompagne à travers des pratiques sensibles, corporelles et symboliques pour retrouver de l'apaisement, de la clarté et votre élan intérieur.",
    primaryCta: { label: "Trouver ma porte d'entrée", href: "/#boussole" },
    secondaryCta: { label: "Découvrir les pratiques", href: "/#atlas" },
    palette: "amethyst",
  },
  {
    id: "corps",
    category: "Corps & énergie",
    title: "Quand le corps devient une porte.",
    text:
      "Massages, souffle, présence et écoute du corps ouvrent un espace pour déposer ce qui demande à l'être.",
    primaryCta: { label: "Explorer les accompagnements", href: "/accompagnements" },
    secondaryCta: { label: "Faire le diagnostic", href: "/diagnostic" },
    palette: "rose-gold",
  },
  {
    id: "collectif",
    category: "Collectif",
    title: "Avancer ensemble autrement.",
    text:
      "Cercles de femmes, Innerdance, breathwork, constellations et ateliers créent des espaces de partage et de transformation.",
    primaryCta: { label: "Découvrir les expériences", href: "/collectif" },
    secondaryCta: { label: "Voir les prochaines dates", href: "/evenements" },
    palette: "deep-night",
  },
  {
    id: "feminin",
    category: "Féminin sacré",
    title: "Revenir au corps, aux cycles et à l'intuition.",
    text:
      "Un accompagnement symbolique autour du féminin, de la mémoire du corps et de l'énergie créatrice.",
    primaryCta: { label: "Explorer le féminin sacré", href: "/feminin-sacre" },
    secondaryCta: { label: "Découvrir les cercles", href: "/cercles-de-femmes" },
    palette: "rose-velvet",
  },
  {
    id: "offrir",
    category: "Offrir",
    title: "Offrir une parenthèse de reconnexion.",
    text:
      "Créez une carte cadeau personnalisée pour offrir un moment sensible, profond et adapté.",
    primaryCta: { label: "Créer une carte cadeau", href: "/cartes-cadeaux" },
    secondaryCta: { label: "Découvrir les formats", href: "/cartes-cadeaux#formats" },
    palette: "gold-warm",
  },
  {
    id: "cacao",
    category: "Cacao sacré",
    title: "Le cacao comme cérémonie du cœur.",
    text:
      "Une expérience symbolique et sensorielle pour ralentir, ouvrir le cœur, déposer en présence — en individuel, en cercle ou en retraite.",
    primaryCta: { label: "Découvrir les rituels", href: "/collectif/cacao" },
    secondaryCta: { label: "Être informée du prochain rituel", href: "/contact?sujet=Cacao" },
    palette: "cacao",
  },
] as const;

export type HeroSlide = (typeof heroSlides)[number];

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
    recommendations: ["cacao-rituel", "/cercles-de-femmes", "/collectif/cacao"],
    cta: { label: "Découvrir les rituels cacao", href: "/collectif/cacao" },
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
      { label: "Page Cérémonie cacao", href: "/collectif/cacao" },
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
      { label: "Cérémonie cacao", href: "/collectif/cacao" },
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
