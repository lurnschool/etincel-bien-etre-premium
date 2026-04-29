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

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  {
    label: "Accompagnements",
    href: "/accompagnements",
    children: [
      { label: "Tous les accompagnements", href: "/accompagnements" },
      { label: "Numérologie", href: "/accompagnements/numerologie" },
      { label: "Hypnose", href: "/accompagnements/hypnose" },
      { label: "CellRelease®", href: "/accompagnements/cellrelease" },
      { label: "Massage énergétique", href: "/accompagnements/massage-energetique" },
      { label: "Réflexologie amérindienne", href: "/accompagnements/reflexologie" },
      { label: "Breathwork individuel", href: "/accompagnements/breathwork" },
      { label: "Innerdance individuel", href: "/innerdance#individuel" },
      { label: "Féminin sacré", href: "/feminin-sacre" },
    ],
  },
  {
    label: "Expériences collectives",
    href: "/collectif",
    children: [
      { label: "Toutes les expériences", href: "/collectif" },
      { label: "Cercles de femmes", href: "/cercles-de-femmes" },
      { label: "Innerdance collectif", href: "/innerdance#collectif" },
      { label: "Breathwork collectif", href: "/collectif#breathwork" },
      { label: "Constellations familiales", href: "/collectif#constellations" },
      { label: "Ateliers", href: "/collectif#ateliers" },
    ],
  },
  { label: "Retraites", href: "/retraites" },
  { label: "Formations", href: "/formations" },
  { label: "Cartes cadeaux", href: "/cartes-cadeaux" },
  { label: "Événements", href: "/evenements" },
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
  family: "comprendre" | "apaiser" | "corps" | "explorer" | "feminin";
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
] as const;

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
  primary: { label: "Trouver mon accompagnement", href: "/diagnostic" },
  secondary: { label: "Prendre contact", href: "/contact" },
  discoverPractices: { label: "Découvrir les pratiques", href: "/accompagnements" },
  giftCard: { label: "Découvrir les cartes cadeaux", href: "/cartes-cadeaux" },
  retreats: { label: "Rejoindre la liste d'intérêt", href: "/retraites#interet" },
  cercles: { label: "Être informée du prochain cercle", href: "/cercles-de-femmes#inscription" },
} as const;

export const seoDefaults = {
  siteUrl: "https://etinceldebienetre.fr",
  defaultTitle: "Etincel de bien être — Céline Dusseval, accompagnatrice holistique en Gironde",
  defaultDescription:
    "Céline Dusseval vous accompagne à Bordeaux et en Gironde : numérologie, hypnose, CellRelease®, massages énergétiques, breathwork, innerdance, cercles de femmes, retraites et féminin sacré.",
  ogImage: "/og-image.jpg",
  locale: "fr_FR",
} as const;
