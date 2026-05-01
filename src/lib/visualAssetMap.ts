/**
 * VISUAL ASSET MAP — cartographie centrale de tous les visuels du site.
 *
 * Sprint A · 2026-05-01 — réécrit pour le passage "refuge connecté".
 * Sprint I · 2026-05-01 — AUDIT IMAGES (brief chef de projet).
 *
 * Chaque visuel est un slot stable :
 *   - emplacement (page, section)
 *   - intention humaine (usage)
 *   - nom de fichier final attendu (expectedFileName)
 *   - source actuelle (currentFile + sourceKind + status)
 *   - ratio recommandé pour la mise en page
 *   - alt accessible
 *   - priorité (indispensable / important / bonus)
 *   - instructions de remplacement quand la photo finale arrive
 *
 * Quand Céline livre une photo, on remplace `currentFile` + `sourceKind` +
 * `status`. Le composant <VisualAsset id="..." /> rend automatiquement la
 * bonne image, sans aucune modification de mise en page.
 *
 * ÉTAT AU 2026-05-01 (audit Sprint I) :
 *   - 32 entrées sourceKind="site-original" → 16 fichiers PNG/JPG du site
 *     original etinceldebienetre.fr, légitimes (Céline propriétaire).
 *   - 24 entrées sourceKind="placeholder"   → SVG textures internes neutres,
 *     créées pour ce projet (pas de scraping, pas d'image stock).
 *   - 0 entrée sourceKind="instagram"       → AUCUNE image Instagram
 *     téléchargée. Le composant InstagramFeed est en mode "fallback"
 *     tant que Céline n'a pas validé une sélection ou qu'un widget tiers
 *     n'est pas branché.
 *   - 0 entrée provenant de banques d'images stock (Unsplash, Pexels,
 *     etc.) — interdit par la direction artistique.
 *
 * RÈGLE FERME : aucun mot "placeholder" visible côté public.
 * RÈGLE FERME : ne jamais inventer une image stock — un placeholder propre
 *   vaut toujours mieux qu'une image générique.
 * RÈGLE FERME : aucune photo Instagram ne sera affichée tant que Céline
 *   n'aura pas validé explicitement la sélection (ou qu'un widget tiers
 *   officiel ne sera pas branché). Cf. src/components/home/InstagramFeed.tsx.
 */

import { asset } from "./assets";

export type VisualSourceKind =
  /** Image téléchargée légalement depuis le site original etinceldebienetre.fr */
  | "site-original"
  /** Image Instagram (uniquement avec autorisation explicite + sélection validée) */
  | "instagram"
  /** SVG ou texture neutre créés pour ce projet (jamais image stock) */
  | "placeholder"
  /** Photo finale fournie par Céline */
  | "final";

export type VisualStatus =
  /** L'image en place est satisfaisante (finale ou originale exploitable) */
  | "ok"
  /** Licence et droits d'usage explicitement vérifiés (Sprint I) */
  | "license-verified"
  /** Remplacement attendu par photo finale Céline */
  | "waiting-client-photo"
  /** Remplacement attendu par photo Instagram avec autorisation */
  | "waiting-instagram-auth"
  /** Remplacement attendu par mini-shooting dédié */
  | "waiting-shooting"
  /** Marquée pour suppression — image douteuse ou non validée */
  | "to-remove";

export type VisualPriority = "indispensable" | "important" | "bonus";

export type VisualRatio =
  | "16:9"
  | "4:5"
  | "1:1"
  | "9:16"
  | "3:4"
  | "21:9"
  | "5:4"
  | "3:2";

export type VisualAssetEntry = {
  id: string;
  page: string;
  section: string;
  usage: string;
  expectedFileName: string;
  currentFile: string; // chemin sous /public (ex: /images/source-site-original/portrait-celine.png)
  sourceKind: VisualSourceKind;
  status: VisualStatus;
  ratio: VisualRatio;
  altText: string;
  priority: VisualPriority;
  replacementInstructions: string;
  /** Recadrage Tailwind object-position si nécessaire (ex: "object-[center_30%]"). */
  objectPosition?: string;
};

const PLACEHOLDERS = {
  // Sprint A — placeholders neutres
  cream: "/images/placeholders/texture-cream-warm.svg",
  sand: "/images/placeholders/texture-sand-light.svg",
  rose: "/images/placeholders/texture-rose-ancient.svg",
  sage: "/images/placeholders/texture-sage-soft.svg",
  clay: "/images/placeholders/texture-clay-warm.svg",
  arch: "/images/placeholders/organic-arch-warm.svg",
  circle: "/images/placeholders/organic-circle-gold.svg",
  light: "/images/placeholders/detail-light-soft.svg",
  // Sprint C — placeholders thématiques par pièce du refuge
  memoiresNight: "/images/placeholders/memoires-night.svg",
  memoiresCircle: "/images/placeholders/memoires-circle.svg",
  femininWarm: "/images/placeholders/feminin-warm.svg",
  cacaoRitual: "/images/placeholders/cacao-ritual.svg",
  corpsWater: "/images/placeholders/corps-water.svg",
  breathFlow: "/images/placeholders/breath-flow.svg",
  natureHorizon: "/images/placeholders/nature-horizon.svg",
  paperKraft: "/images/placeholders/paper-kraft.svg",
} as const;

const SITE_ORIGINAL = "/images/source-site-original";

/* -------------------------------------------------------------------------- */
/*  HOME                                                                      */
/* -------------------------------------------------------------------------- */

const homeAssets: VisualAssetEntry[] = [
  {
    id: "home-hero-celine",
    page: "home",
    section: "hero",
    usage: "Portrait de Céline pour l'entrée du site (hero refuge)",
    expectedFileName: "celine-portrait-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/approche-philosophie.jpg`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Céline Dusseval — accompagnatrice bien-être en Gironde",
    priority: "indispensable",
    objectPosition: "object-[center_30%]",
    replacementInstructions:
      "Photo réelle de Céline en lumière douce, regard naturel, plan moyen-rapproché, ambiance refuge. Pas de pose marketing.",
  },
  {
    id: "home-bienvenue-detail",
    page: "home",
    section: "bienvenue",
    usage: "Détail incrusté dans la section Bienvenue (objet/main/lieu)",
    expectedFileName: "celine-bienvenue-detail.jpg",
    currentFile: `${SITE_ORIGINAL}/portrait-celine.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Détail du lieu d'accueil de Céline",
    priority: "important",
    replacementInstructions:
      "Détail intime : main qui sert un thé, bougie, carnet ouvert, fleur posée. Lumière chaude.",
  },
  {
    id: "home-chemin-memoires",
    page: "home",
    section: "chemins",
    usage: "Visuel du chemin Mémoires & constellations",
    expectedFileName: "chemin-memoires.jpg",
    currentFile: `${SITE_ORIGINAL}/constellations.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Espace symbolique des constellations familiales",
    priority: "indispensable",
    replacementInstructions:
      "Photo d'ambiance constellation : objets symboliques au sol, mains posées, espace de cercle. Pas de visages identifiables.",
  },
  {
    id: "home-chemin-feminin",
    page: "home",
    section: "chemins",
    usage: "Visuel du chemin Féminin & cacao",
    expectedFileName: "chemin-feminin-cacao.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-individuel.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Cérémonie cacao et cercle féminin",
    priority: "indispensable",
    replacementInstructions:
      "Photo cacao : tasse posée, mains réunies, ambiance cercle, lumière chaude.",
  },
  {
    id: "home-chemin-corps",
    page: "home",
    section: "chemins",
    usage: "Visuel du chemin Corps & intégration",
    expectedFileName: "chemin-corps.jpg",
    currentFile: `${SITE_ORIGINAL}/breathwork.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Pratique du souffle et du corps",
    priority: "indispensable",
    replacementInstructions:
      "Photo souffle/innerdance/breathwork : silhouette en mouvement, mains, sol, ambiance douce.",
  },
  {
    id: "home-univers-1",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 1 (portrait)",
    expectedFileName: "univers-celine-01.jpg",
    currentFile: `${SITE_ORIGINAL}/portrait-celine.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "4:5",
    altText: "Céline dans son univers d'accompagnement",
    priority: "indispensable",
    replacementInstructions:
      "Photo libre — peut rester telle quelle ou être remplacée par un portrait plus récent.",
  },
  {
    id: "home-univers-2",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 2 (cacao)",
    expectedFileName: "univers-cacao.jpg",
    currentFile: PLACEHOLDERS.clay,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Cérémonie cacao — détail tasse et bougies",
    priority: "important",
    replacementInstructions:
      "Photo Instagram cacao avec autorisation — tasse, bougies, tissu, mains.",
  },
  {
    id: "home-univers-3",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 3 (cercle/groupe)",
    expectedFileName: "univers-cercle.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-groupe.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Cercle de partage avec Céline",
    priority: "important",
    replacementInstructions:
      "Photo réelle d'un cercle (silhouettes, mains, dos, bougies) — autorisations à confirmer pour les visages.",
  },
  {
    id: "home-univers-4",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 4 (constellations)",
    expectedFileName: "univers-constellations.jpg",
    currentFile: `${SITE_ORIGINAL}/constellations.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Espace symbolique des constellations familiales",
    priority: "important",
    replacementInstructions:
      "Photo réelle ambiance constellation : sol, objets, mouvement.",
  },
  {
    id: "home-univers-5",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 5 (souffle/corps)",
    expectedFileName: "univers-souffle.jpg",
    currentFile: `${SITE_ORIGINAL}/breathwork.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Pratique du souffle",
    priority: "important",
    replacementInstructions: "Photo réelle breathwork ou innerdance.",
  },
  {
    id: "home-univers-6",
    page: "home",
    section: "mon-univers",
    usage: "Carrousel L'univers de Céline — image 6 (détail/objet)",
    expectedFileName: "univers-detail.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Détail du refuge — objet du quotidien",
    priority: "bonus",
    replacementInstructions:
      "Mini-photo d'objet : carnet, plume, fleur, tissu plié, bougie posée.",
  },
  {
    id: "home-retraites",
    page: "home",
    section: "retraites",
    usage: "Image d'ambiance retraite (paysage / lieu)",
    expectedFileName: "retraite-ambiance.jpg",
    currentFile: `${SITE_ORIGINAL}/weekend.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "16:9",
    altText: "Lieu d'une retraite immersive — nature et accueil",
    priority: "indispensable",
    replacementInstructions:
      "Photo réelle d'un lieu de retraite (extérieur ou intérieur), lumière chaude, sentiment d'arrivée.",
  },
  {
    id: "home-offrir",
    page: "home",
    section: "offrir",
    usage: "Visuel carte cadeau — ambiance attention douce",
    expectedFileName: "offrir-attention.jpg",
    currentFile: `${SITE_ORIGINAL}/carte-cadeau.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Carte cadeau Etincel posée comme une attention",
    priority: "important",
    replacementInstructions:
      "Photo carte cadeau posée sur tissu/bois/papier, lumière chaude, esprit attention.",
  },
  {
    id: "home-contact",
    page: "home",
    section: "contact",
    usage: "Photo lieu d'accueil pour la section contact",
    expectedFileName: "contact-lieu.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-formations.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "16:9",
    altText: "Le lieu où Céline accueille — porte d'entrée du refuge",
    priority: "important",
    replacementInstructions:
      "Photo de la porte/seuil, du salon d'accueil, ou du jardin. Sensation d'arrivée.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CÉLINE / À PROPOS                                                         */
/* -------------------------------------------------------------------------- */

const aboutAssets: VisualAssetEntry[] = [
  {
    id: "about-portrait-main",
    page: "/a-propos",
    section: "hero",
    usage: "Portrait principal de Céline",
    expectedFileName: "celine-portrait-principal.jpg",
    currentFile: `${SITE_ORIGINAL}/portrait-celine.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Céline Dusseval, portrait principal",
    priority: "indispensable",
    objectPosition: "object-[center_top]",
    replacementInstructions:
      "Portrait large, plan poitrine, regard direct ou de trois-quarts, lumière naturelle.",
  },
  {
    id: "about-portrait-secondaire",
    page: "/a-propos",
    section: "recit",
    usage: "Photo de Céline en pratique (mains, tambour, soin)",
    expectedFileName: "celine-en-pratique.jpg",
    currentFile: `${SITE_ORIGINAL}/approche-philosophie.jpg`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "4:5",
    altText: "Céline en pratique chamanique avec son tambour",
    priority: "important",
    replacementInstructions:
      "Photo en situation : tambour, soin, mains posées, geste rituel.",
  },
  {
    id: "about-detail-1",
    page: "/a-propos",
    section: "univers",
    usage: "Détail univers — objet personnel",
    expectedFileName: "celine-detail-objet.jpg",
    currentFile: PLACEHOLDERS.clay,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "1:1",
    altText: "Détail d'un objet personnel de Céline",
    priority: "bonus",
    replacementInstructions:
      "Mini-shooting : tambour, bol, plume, cristal, autel. Format carré.",
  },
  {
    id: "about-detail-2",
    page: "/a-propos",
    section: "univers",
    usage: "Détail univers — lieu",
    expectedFileName: "celine-detail-lieu.jpg",
    currentFile: PLACEHOLDERS.sand,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "1:1",
    altText: "Coin du lieu d'accueil de Céline",
    priority: "bonus",
    replacementInstructions:
      "Coin du lieu : fauteuil, fenêtre, tissu, plante. Format carré.",
  },
  {
    id: "about-detail-3",
    page: "/a-propos",
    section: "univers",
    usage: "Détail univers — main / présence",
    expectedFileName: "celine-detail-main.jpg",
    currentFile: PLACEHOLDERS.rose,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "1:1",
    altText: "Main de Céline — présence sensible",
    priority: "bonus",
    replacementInstructions: "Gros plan main, geste, anneau, peau, lumière.",
  },
];

/* -------------------------------------------------------------------------- */
/*  PAGES PILIERS                                                             */
/* -------------------------------------------------------------------------- */

const memoiresAssets: VisualAssetEntry[] = [
  {
    id: "memoires-hero",
    page: "/memoires-constellations",
    section: "hero",
    usage: "Image hero ambiance cercle / constellation",
    expectedFileName: "memoires-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/constellations.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "21:9",
    altText: "Espace de constellation familiale",
    priority: "indispensable",
    replacementInstructions:
      "Photo grand format ambiance cercle constellation : sol, objets, lumière.",
  },
  {
    id: "memoires-detail-1",
    page: "/memoires-constellations",
    section: "details",
    usage: "Détail objets symboliques au sol",
    expectedFileName: "memoires-objets.jpg",
    currentFile: `${SITE_ORIGINAL}/constellations.png`,
    sourceKind: "placeholder",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Objets symboliques posés au sol",
    priority: "important",
    replacementInstructions:
      "Vue plongeante objets : foulards, cailloux, bougies, cordes.",
  },
  {
    id: "memoires-detail-2",
    page: "/memoires-constellations",
    section: "details",
    usage: "Mains qui se tiennent dans un cercle",
    expectedFileName: "memoires-mains.jpg",
    currentFile: PLACEHOLDERS.sage,
    sourceKind: "placeholder",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Mains qui se tiennent — cercle de partage",
    priority: "bonus",
    replacementInstructions: "Mains tenues, gros plan, peau, anneaux.",
  },
];

const femininAssets: VisualAssetEntry[] = [
  {
    id: "feminin-hero",
    page: "/feminin-cacao",
    section: "hero",
    usage: "Image hero cérémonie cacao",
    expectedFileName: "feminin-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/cell-release.png`,
    sourceKind: "site-original",
    status: "waiting-instagram-auth",
    ratio: "21:9",
    altText: "Cérémonie cacao — ambiance refuge féminin",
    priority: "indispensable",
    replacementInstructions:
      "Photo Instagram cacao en grand format avec autorisation.",
  },
  {
    id: "feminin-cacao-tasse",
    page: "/feminin-cacao",
    section: "rituel",
    usage: "Tasse de cacao tenue dans les mains",
    expectedFileName: "feminin-cacao-tasse.jpg",
    currentFile: `${SITE_ORIGINAL}/cell-release.png`,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Tasse de cacao tenue dans les mains",
    priority: "important",
    replacementInstructions: "Tasse cacao + mains, lumière chaude.",
  },
  {
    id: "feminin-cercle",
    page: "/feminin-cacao",
    section: "cercle",
    usage: "Cercle de femmes — ambiance",
    expectedFileName: "feminin-cercle.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-groupe.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Cercle de femmes — partage et présence",
    priority: "important",
    replacementInstructions:
      "Photo cercle de femmes : silhouettes, mains, dos, bougies. Visages selon autorisations.",
  },
  {
    id: "feminin-detail-tissu",
    page: "/feminin-cacao",
    section: "details",
    usage: "Détail tissu / bougie / objet rituel",
    expectedFileName: "feminin-tissu.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "1:1",
    altText: "Tissu et bougie sur l'autel",
    priority: "bonus",
    replacementInstructions: "Détail textile + bougie + objet rituel.",
  },
];

const corpsAssets: VisualAssetEntry[] = [
  {
    id: "corps-hero",
    page: "/corps-integration",
    section: "hero",
    usage: "Image hero corps / souffle",
    expectedFileName: "corps-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/breathwork.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "21:9",
    altText: "Pratique du souffle — corps en présence",
    priority: "indispensable",
    replacementInstructions:
      "Photo grand format breathwork ou innerdance, lumière douce.",
  },
  {
    id: "corps-innerdance",
    page: "/corps-integration",
    section: "pratiques",
    usage: "Innerdance — silhouette / mouvement",
    expectedFileName: "corps-innerdance.jpg",
    currentFile: `${SITE_ORIGINAL}/breathwork.png`,
    sourceKind: "placeholder",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Pratique de l'innerdance",
    priority: "important",
    replacementInstructions:
      "Photo innerdance : silhouettes au sol, mouvement, lumière tamisée.",
  },
  {
    id: "corps-mains",
    page: "/corps-integration",
    section: "details",
    usage: "Détail mains / sol / tissu",
    expectedFileName: "corps-mains.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "1:1",
    altText: "Détail mains posées au sol",
    priority: "bonus",
    replacementInstructions: "Gros plan mains, sol, tissu, geste lent.",
  },
];

/* -------------------------------------------------------------------------- */
/*  RETRAITES                                                                 */
/* -------------------------------------------------------------------------- */

const retraitesAssets: VisualAssetEntry[] = [
  {
    id: "retraites-hero",
    page: "/retraites",
    section: "hero",
    usage: "Image hero lieu de retraite (nature ou demeure)",
    expectedFileName: "retraite-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/weekend.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "21:9",
    altText: "Lieu d'une retraite immersive — accueil et nature",
    priority: "indispensable",
    replacementInstructions:
      "Photo grand format lieu de retraite : façade, jardin, vue.",
  },
  {
    id: "retraites-carrousel-1",
    page: "/retraites",
    section: "carrousel",
    usage: "Carrousel retraite — cercle au lever",
    expectedFileName: "retraite-cercle-lever.jpg",
    currentFile: PLACEHOLDERS.sand,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Cercle de partage au lever du soleil",
    priority: "important",
    replacementInstructions: "Photo cercle lever de soleil, ambiance douce.",
  },
  {
    id: "retraites-carrousel-2",
    page: "/retraites",
    section: "carrousel",
    usage: "Carrousel retraite — pratique en nature",
    expectedFileName: "retraite-pratique.jpg",
    currentFile: PLACEHOLDERS.sage,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Pratique en pleine nature pendant la retraite",
    priority: "important",
    replacementInstructions: "Photo pratique extérieure : tambour, souffle, marche.",
  },
  {
    id: "retraites-carrousel-3",
    page: "/retraites",
    section: "carrousel",
    usage: "Carrousel retraite — repas / convivialité",
    expectedFileName: "retraite-repas.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Moment de partage autour d'un repas",
    priority: "bonus",
    replacementInstructions: "Photo table, repas, partage, mains.",
  },
  {
    id: "retraites-carrousel-4",
    page: "/retraites",
    section: "carrousel",
    usage: "Carrousel retraite — détail intime",
    expectedFileName: "retraite-detail.jpg",
    currentFile: PLACEHOLDERS.clay,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Détail du lieu de retraite",
    priority: "bonus",
    replacementInstructions: "Détail intime : carnet, plume, fenêtre, tissu.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CACAO                                                                     */
/* -------------------------------------------------------------------------- */

const cacaoAssets: VisualAssetEntry[] = [
  {
    id: "cacao-hero",
    page: "/cacao",
    section: "hero",
    usage: "Image hero cérémonie cacao",
    expectedFileName: "cacao-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-individuel.png`,
    sourceKind: "site-original",
    status: "waiting-instagram-auth",
    ratio: "21:9",
    altText: "Cérémonie cacao — tasse posée et bougies",
    priority: "indispensable",
    replacementInstructions:
      "Photo Instagram cérémonie cacao grand format avec autorisation.",
  },
  {
    id: "cacao-detail",
    page: "/cacao",
    section: "details",
    usage: "Détail cacao — préparation",
    expectedFileName: "cacao-preparation.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-individuel.png`,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Préparation du cacao cérémoniel",
    priority: "important",
    replacementInstructions: "Cacao versé, fève, mains, ustensile.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CARTES CADEAUX / CONTACT                                                  */
/* -------------------------------------------------------------------------- */

const cartesCadeauxAssets: VisualAssetEntry[] = [
  {
    id: "cartes-hero",
    page: "/cartes-cadeaux",
    section: "hero",
    usage: "Image hero — carte posée comme une attention",
    expectedFileName: "carte-cadeau-hero.jpg",
    currentFile: PLACEHOLDERS.paperKraft,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "16:9",
    altText: "Carte cadeau Etincel posée sur un tissu",
    priority: "important",
    replacementInstructions:
      "Photo carte cadeau imprimée + tissu + papier + objet doux.",
  },
];

const contactAssets: VisualAssetEntry[] = [
  {
    id: "contact-celine",
    page: "/contact",
    section: "intro",
    usage: "Photo Céline souriante pour accueillir",
    expectedFileName: "contact-celine.jpg",
    currentFile: `${SITE_ORIGINAL}/portrait-celine.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Céline Dusseval — accueillir un premier message",
    priority: "indispensable",
    objectPosition: "object-[center_top]",
    replacementInstructions:
      "Portrait chaleureux, sourire doux, regard direct, format vertical.",
  },
  {
    id: "contact-lieu",
    page: "/contact",
    section: "lieu",
    usage: "Photo du lieu d'accueil",
    expectedFileName: "contact-lieu.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-formations.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "16:9",
    altText: "Le lieu d'accueil de Céline au Taillan-Médoc",
    priority: "important",
    replacementInstructions: "Photo extérieur ou seuil du lieu, lumière chaude.",
  },
];

/* -------------------------------------------------------------------------- */
/*  PAGES OUTILS (pages secondaires)                                          */
/* -------------------------------------------------------------------------- */

const toolsAssets: VisualAssetEntry[] = [
  {
    id: "tool-hypnose-hero",
    page: "/accompagnements/hypnose",
    section: "hero",
    usage: "Image d'ambiance hypnose",
    expectedFileName: "hypnose-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/hypnose.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Espace d'hypnose et de mouvements oculaires",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer par photo réelle plus tard.",
  },
  {
    id: "tool-cellrelease-hero",
    page: "/accompagnements/cellrelease",
    section: "hero",
    usage: "Image d'ambiance CellRelease",
    expectedFileName: "cellrelease-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/cell-release.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Séance de CellRelease",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-massage-hero",
    page: "/accompagnements/massage-energetique",
    section: "hero",
    usage: "Image d'ambiance massage énergétique",
    expectedFileName: "massage-energetique-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/massage-energetique.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Massage énergétique",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-reflexologie-hero",
    page: "/accompagnements/reflexologie",
    section: "hero",
    usage: "Image d'ambiance réflexologie",
    expectedFileName: "reflexologie-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/reflexologie.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Réflexologie amérindienne",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-breathwork-hero",
    page: "/accompagnements/breathwork",
    section: "hero",
    usage: "Image d'ambiance breathwork",
    expectedFileName: "breathwork-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/breathwork.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Breathwork chamanique",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-numerologie-hero",
    page: "/accompagnements/numerologie",
    section: "hero",
    usage: "Image d'ambiance numérologie",
    expectedFileName: "numerologie-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/numerologie.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Numérologie symbolique",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-rebirth-hero",
    page: "/constellations",
    section: "rebirth",
    usage: "Image d'ambiance Rebirth",
    expectedFileName: "rebirth-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/rebirth.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Constellation de naissance — Rebirth",
    priority: "important",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
  {
    id: "tool-ateliers-hero",
    page: "/collectif",
    section: "ateliers",
    usage: "Image d'ambiance ateliers",
    expectedFileName: "ateliers-hero.jpg",
    currentFile: `${SITE_ORIGINAL}/ateliers.png`,
    sourceKind: "site-original",
    status: "ok",
    ratio: "16:9",
    altText: "Ateliers collectifs",
    priority: "bonus",
    replacementInstructions: "À conserver ou remplacer plus tard.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CARROUSELS SECONDAIRES — Sprint B                                         */
/*                                                                            */
/*  Carrousels prêts dès maintenant avec mix images du site original +        */
/*  placeholders. Quand Céline livre des photos, on les substitue dans les    */
/*  bonnes entrées (currentFile + sourceKind + status).                       */
/* -------------------------------------------------------------------------- */

const carrouselDetailsRefuge: VisualAssetEntry[] = [
  {
    id: "carousel-refuge-1",
    page: "shared",
    section: "carousel-details",
    usage: "Détails du refuge — bougie",
    expectedFileName: "refuge-bougie.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Bougie posée sur un tissu",
    priority: "bonus",
    replacementInstructions: "Mini-shooting bougie + tissu, lumière chaude.",
  },
  {
    id: "carousel-refuge-2",
    page: "shared",
    section: "carousel-details",
    usage: "Détails du refuge — carnet ouvert",
    expectedFileName: "refuge-carnet.jpg",
    currentFile: PLACEHOLDERS.sand,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Carnet de notes ouvert avec un stylo",
    priority: "bonus",
    replacementInstructions: "Carnet ouvert + plume/stylo, papier kraft.",
  },
  {
    id: "carousel-refuge-3",
    page: "shared",
    section: "carousel-details",
    usage: "Détails du refuge — fleur posée",
    expectedFileName: "refuge-fleur.jpg",
    currentFile: PLACEHOLDERS.rose,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Fleur séchée posée sur le bord d'une fenêtre",
    priority: "bonus",
    replacementInstructions: "Fleur séchée, lumière naturelle, fond doux.",
  },
  {
    id: "carousel-refuge-4",
    page: "shared",
    section: "carousel-details",
    usage: "Détails du refuge — cristal / objet rituel",
    expectedFileName: "refuge-cristal.jpg",
    currentFile: PLACEHOLDERS.clay,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Cristal et objet rituel posés sur un tissu",
    priority: "bonus",
    replacementInstructions: "Cristal/améthyste + tissu noir ou crème.",
  },
];

const carrouselCerclesCacao: VisualAssetEntry[] = [
  {
    id: "carousel-cercles-1",
    page: "shared",
    section: "carousel-cercles",
    usage: "Cercle de femmes — vue d'ensemble douce",
    expectedFileName: "cercles-vue-ensemble.jpg",
    currentFile: `${SITE_ORIGINAL}/ambiance-groupe.png`,
    sourceKind: "site-original",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Cercle de partage en présence",
    priority: "important",
    replacementInstructions:
      "Photo cercle réel : silhouettes, mains, dos. Visages selon autorisations.",
  },
  {
    id: "carousel-cercles-2",
    page: "shared",
    section: "carousel-cercles",
    usage: "Cacao versé — détail",
    expectedFileName: "cercles-cacao-verse.jpg",
    currentFile: PLACEHOLDERS.clay,
    sourceKind: "placeholder",
    status: "waiting-instagram-auth",
    ratio: "4:5",
    altText: "Cacao versé dans une tasse",
    priority: "important",
    replacementInstructions: "Photo Instagram cacao versé, autorisation à confirmer.",
  },
  {
    id: "carousel-cercles-3",
    page: "shared",
    section: "carousel-cercles",
    usage: "Bougies en cercle",
    expectedFileName: "cercles-bougies.jpg",
    currentFile: PLACEHOLDERS.cream,
    sourceKind: "placeholder",
    status: "waiting-shooting",
    ratio: "4:5",
    altText: "Bougies disposées en cercle",
    priority: "important",
    replacementInstructions: "Vue plongeante bougies en cercle, sol bois ou tissu.",
  },
  {
    id: "carousel-cercles-4",
    page: "shared",
    section: "carousel-cercles",
    usage: "Mains réunies",
    expectedFileName: "cercles-mains.jpg",
    currentFile: PLACEHOLDERS.rose,
    sourceKind: "placeholder",
    status: "waiting-client-photo",
    ratio: "4:5",
    altText: "Mains réunies au centre d'un cercle",
    priority: "bonus",
    replacementInstructions: "Mains posées au centre, vue plongeante.",
  },
];

/* -------------------------------------------------------------------------- */
/*  MINI-DÉTAILS PAR PAGE — Sprint C (DetailStrip)                            */
/*                                                                            */
/*  Petits emplacements 1:1 (~96-160px) pour des sliders horizontaux de      */
/*  micro-photos qui personnalisent chaque page. Mix d'images du site         */
/*  original + placeholders thématiques.                                      */
/* -------------------------------------------------------------------------- */

const microHomeRefuge: VisualAssetEntry[] = makeMicros(
  "home",
  "micro-refuge",
  "Mini-photo refuge — détail de présence",
  ["light", "cream", "sand", "rose", "circle", "arch"],
);

const microAProposCarnet: VisualAssetEntry[] = makeMicros(
  "/a-propos",
  "carnet",
  "Fragment de carnet — détail personnel",
  ["light", "rose", "sand", "cream", "circle", "arch"],
);

const microMemoires: VisualAssetEntry[] = makeMicros(
  "/memoires-constellations",
  "micro-memoires",
  "Détail symbolique — objets du cercle",
  ["memoiresNight", "memoiresCircle", "clay", "memoiresNight", "circle", "memoiresCircle"],
);

const microFeminin: VisualAssetEntry[] = makeMicros(
  "/feminin-cacao",
  "micro-feminin",
  "Détail féminin — main, tissu, bougie",
  ["femininWarm", "cacaoRitual", "rose", "clay", "femininWarm", "cream"],
);

const microCorps: VisualAssetEntry[] = makeMicros(
  "/corps-integration",
  "micro-corps",
  "Détail corps — souffle, mouvement, silhouette",
  ["corpsWater", "breathFlow", "sage", "breathFlow", "corpsWater", "sand"],
);

const microCacao: VisualAssetEntry[] = makeMicros(
  "/cacao",
  "micro-cacao",
  "Détail cérémonie — tasse, fève, rituel",
  ["cacaoRitual", "clay", "cacaoRitual", "femininWarm", "cream", "rose"],
);

const microRetraites: VisualAssetEntry[] = makeMicros(
  "/retraites",
  "micro-retraites",
  "Détail retraite — nature, partage, accueil",
  ["natureHorizon", "sand", "sage", "cream", "natureHorizon", "rose"],
);

const microCartesCadeaux: VisualAssetEntry[] = makeMicros(
  "/cartes-cadeaux",
  "micro-cartes",
  "Détail cadeau — papier, ruban, attention",
  ["paperKraft", "cream", "paperKraft", "sand", "rose", "paperKraft"],
);

/**
 * Helper interne pour créer 6 mini-slots 1:1 par page de manière concise.
 * Toutes les micros sont en `waiting-shooting` priorité bonus,
 * remplaçables au fil des livraisons photo.
 */
function makeMicros(
  page: string,
  prefix: string,
  baseUsage: string,
  placeholderKeys: (keyof typeof PLACEHOLDERS)[],
): VisualAssetEntry[] {
  return placeholderKeys.map((key, i) => ({
    id: `${prefix}-${i + 1}`,
    page,
    section: "detail-strip",
    usage: `${baseUsage} (${i + 1})`,
    expectedFileName: `${prefix}-${i + 1}.jpg`,
    currentFile: PLACEHOLDERS[key],
    sourceKind: "placeholder" as VisualSourceKind,
    status: "waiting-shooting" as VisualStatus,
    ratio: "1:1" as VisualRatio,
    altText: `${baseUsage} — emplacement ${i + 1}`,
    priority: "bonus" as VisualPriority,
    replacementInstructions:
      "Mini-shooting carré (1:1) — détail intime, lumière chaude, objet ou main.",
  }));
}

/* -------------------------------------------------------------------------- */
/*  Index global + helpers                                                    */
/* -------------------------------------------------------------------------- */

export const visualAssetMap: VisualAssetEntry[] = [
  ...homeAssets,
  ...aboutAssets,
  ...memoiresAssets,
  ...femininAssets,
  ...corpsAssets,
  ...retraitesAssets,
  ...cacaoAssets,
  ...cartesCadeauxAssets,
  ...contactAssets,
  ...toolsAssets,
  ...carrouselDetailsRefuge,
  ...carrouselCerclesCacao,
  ...microHomeRefuge,
  ...microAProposCarnet,
  ...microMemoires,
  ...microFeminin,
  ...microCorps,
  ...microCacao,
  ...microRetraites,
  ...microCartesCadeaux,
];

const indexById = new Map(visualAssetMap.map((a) => [a.id, a]));

/**
 * Récupère un asset par son id. Lève une erreur claire au build si l'id
 * est inconnu — c'est intentionnel : on veut détecter les références
 * cassées au plus tôt.
 */
export function getVisualAsset(id: string): VisualAssetEntry {
  const entry = indexById.get(id);
  if (!entry) {
    throw new Error(
      `[visualAssetMap] Asset inconnu : "${id}". Vérifie l'id ou ajoute-le dans visualAssetMap.ts.`,
    );
  }
  return entry;
}

/** Retourne l'URL résolue (avec basePath) pour une entrée donnée. */
export function resolveAssetSrc(entry: VisualAssetEntry): string {
  return asset(entry.currentFile);
}

/** Liste des assets filtrée par page. */
export function visualAssetsForPage(page: string): VisualAssetEntry[] {
  return visualAssetMap.filter((a) => a.page === page);
}

/* -------------------------------------------------------------------------- */
/*  Sprint D : exports legacy (pageVisuals, VisualSlot, SacredFallbackKey,    */
/*  resolveVisual) supprimés. Toutes les pages utilisent désormais            */
/*  <VisualAsset id="..." />.                                                 */
/* -------------------------------------------------------------------------- */

/** Statistiques pour le rapport image. */
export function visualAssetReport() {
  const total = visualAssetMap.length;
  const byStatus = visualAssetMap.reduce<Record<string, number>>(
    (acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const byPriority = visualAssetMap.reduce<Record<string, number>>(
    (acc, a) => {
      acc[a.priority] = (acc[a.priority] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const bySource = visualAssetMap.reduce<Record<string, number>>((acc, a) => {
    acc[a.sourceKind] = (acc[a.sourceKind] ?? 0) + 1;
    return acc;
  }, {});
  return { total, byStatus, byPriority, bySource };
}
