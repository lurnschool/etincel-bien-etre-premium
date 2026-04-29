/**
 * Cartographie des besoins visuels — page par page.
 * Chaque slot peut être :
 *   - alimenté par une image réelle dans /public/images/...
 *   - rendu par un fallback artistique (SacredVisual) tant que l'image n'est pas fournie
 *
 * Sources prévues :
 *   - photos existantes du site etinceldebienetre.fr (à récupérer)
 *   - compte Instagram @celine_dusseval_etincel (avec validation cliente)
 *   - séance photo dédiée à prévoir
 *
 * Convention de nommage :
 *   /public/images/{section}/{slug}.{ext}
 */

export type VisualSlot = {
  id: string;
  description: string;
  fallback: SacredFallbackKey;
  src?: string; // chemin /public/... une fois l'image fournie
  alt: string;
  source?: "site-existant" | "instagram" | "à-fournir";
};

/**
 * Familles de fallbacks artistiques.
 * Chaque clé correspond à une composition gradient + ornements alignée
 * sur l'univers de Céline (Isis, féminin sacré, chamanisme doux).
 */
export type SacredFallbackKey =
  | "reconnexion" // sable doré, ankh, soleil féminin
  | "corps" // mains, lumière chaude, lotus
  | "collectif" // cercle, lune, sororité
  | "feminin" // velours rose, ankh, triple spirale
  | "offrir" // doré chaud, cacao
  | "cacao" // brun chaleureux, tasse rituelle
  | "retraite" // nuit profonde, mandala, étoiles
  | "souffle" // dégradé éthéré, flammes spirituelles
  | "numerologie" // chiffres et symboles, encre profonde
  | "hypnose" // brume violette, intériorité
  | "portrait" // placeholder portrait Céline
  | "ambiance"; // ambiance générique chaude

export const heroSlideVisuals = {
  reconnexion: {
    fallback: "reconnexion" as SacredFallbackKey,
    src: undefined,
    alt: "Céline en présence sensible — espace de reconnexion",
    source: "à-fournir" as const,
  },
  corps: {
    fallback: "corps" as SacredFallbackKey,
    src: undefined,
    alt: "Mains en soin — corps comme porte d'entrée",
    source: "à-fournir" as const,
  },
  collectif: {
    fallback: "collectif" as SacredFallbackKey,
    src: undefined,
    alt: "Cercle de femmes — bougies et présence partagée",
    source: "instagram" as const,
  },
  feminin: {
    fallback: "feminin" as SacredFallbackKey,
    src: undefined,
    alt: "Symbolique du féminin sacré — ankh et tissus drapés",
    source: "instagram" as const,
  },
  offrir: {
    fallback: "offrir" as SacredFallbackKey,
    src: undefined,
    alt: "Carte cadeau Etincel — détail doré",
    source: "à-fournir" as const,
  },
} as const;

/**
 * Slots visuels par page interne.
 */
export const pageVisuals: Record<string, VisualSlot[]> = {
  home: [
    {
      id: "home-feminin-mosaic-1",
      description: "Cérémonie féminin sacré",
      fallback: "feminin",
      alt: "Cérémonie féminin sacré avec ankh",
      source: "instagram",
    },
    {
      id: "home-feminin-mosaic-2",
      description: "Tambour chamanique",
      fallback: "souffle",
      alt: "Tambour chamanique",
      source: "instagram",
    },
    {
      id: "home-feminin-mosaic-3",
      description: "Cacao",
      fallback: "cacao",
      alt: "Cérémonie cacao en yourte",
      source: "instagram",
    },
  ],
  aPropos: [
    {
      id: "about-portrait",
      description: "Portrait principal de Céline",
      fallback: "portrait",
      alt: "Céline Dusseval, accompagnatrice bien-être",
      source: "à-fournir",
    },
    {
      id: "about-pratique",
      description: "Céline en pratique (tambour, soin)",
      fallback: "corps",
      alt: "Céline en pratique chamanique",
      source: "instagram",
    },
  ],
  retraites: [
    {
      id: "retraite-hero",
      description: "Désert / océan / lieu de retraite",
      fallback: "retraite",
      alt: "Lieu de retraite immersive",
      source: "instagram",
    },
    {
      id: "retraite-mosaic-1",
      description: "Cercle au lever du soleil",
      fallback: "feminin",
      alt: "Cercle de femmes au lever du soleil",
      source: "instagram",
    },
    {
      id: "retraite-mosaic-2",
      description: "Tambour en montagne",
      fallback: "souffle",
      alt: "Pratique du tambour en pleine nature",
      source: "instagram",
    },
    {
      id: "retraite-mosaic-3",
      description: "Cacao en yourte",
      fallback: "cacao",
      alt: "Cérémonie cacao en yourte",
      source: "instagram",
    },
  ],
  cacao: [
    {
      id: "cacao-hero",
      description: "Tasse de cacao rituelle, ankh, bougies",
      fallback: "cacao",
      alt: "Cérémonie cacao : tasse, ankh et bougies",
      source: "instagram",
    },
    {
      id: "cacao-context",
      description: "Yourte avec cacao",
      fallback: "ambiance",
      alt: "Yourte de cérémonie cacao",
      source: "instagram",
    },
  ],
  contact: [
    {
      id: "contact-portrait",
      description: "Portrait chaleureux de Céline",
      fallback: "portrait",
      alt: "Céline Dusseval — accueillir un premier échange",
      source: "à-fournir",
    },
  ],
};

/**
 * Résolveur : retourne l'objet { src, alt, fallback } pour un slot donné.
 * Si src est défini, on utilisera <Image> ; sinon on rendra <SacredVisual>.
 */
export function resolveVisual(slot: VisualSlot) {
  return {
    src: slot.src,
    alt: slot.alt,
    fallback: slot.fallback,
    description: slot.description,
    source: slot.source,
  };
}
