/**
 * Numérologie — calcul du chemin de vie + significations symboliques.
 *
 * Le chemin de vie = somme réduite de tous les chiffres de la date de
 * naissance, ramenée à un nombre entre 1 et 9, sauf si on tombe sur
 * un maître nombre (11, 22, 33) qu'on garde tel quel.
 *
 * Les significations sont écrites dans le ton du site Etincel
 * (sensible, symbolique, jamais "définitif"). Elles servent d'amorce
 * — la vraie lecture se fait avec Céline.
 */

const MASTER_NUMBERS = new Set([11, 22, 33]);

/** Réduit une somme à un seul chiffre, en préservant les maîtres nombres. */
function reduce(n: number): number {
  let result = n;
  while (result > 9 && !MASTER_NUMBERS.has(result)) {
    result = result
      .toString()
      .split("")
      .reduce((a, c) => a + Number(c), 0);
  }
  return result;
}

/**
 * Calcule le chemin de vie à partir d'une date au format YYYY-MM-DD.
 * Retourne un nombre entre 1-9, ou 11 / 22 / 33 (maîtres nombres).
 */
export function calculerCheminDeVie(dateISO: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return null;
  const digits = dateISO.replace(/-/g, "").split("").map(Number);
  if (digits.some((d) => Number.isNaN(d))) return null;
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduce(sum);
}

export type CheminDeVieInfo = {
  /** Nom symbolique du chemin (ton refuge, pas RH). */
  nom: string;
  /** Mots-clés essentiels (3-5 mots, en italique sur la page). */
  essence: string;
  /** Court message poétique (2-3 phrases) — amorce, pas lecture définitive. */
  message: string;
  /** Marqué true pour les maîtres nombres 11, 22, 33. */
  maitre?: boolean;
};

export const cheminDeVieSignifications: Record<number, CheminDeVieInfo> = {
  1: {
    nom: "L'élan",
    essence: "Indépendance · Initiative · Affirmation",
    message:
      "Vous êtes là pour ouvrir la voie, oser un mouvement qui vous appartient en propre. Cette vibration vous invite à l'autonomie sans dureté, à l'élan sans solitude.",
  },
  2: {
    nom: "La rencontre",
    essence: "Sensibilité · Coopération · Diplomatie",
    message:
      "Votre chemin se tisse dans le lien à l'autre. Vous portez une finesse d'écoute qui peut soit s'effacer, soit devenir une vraie boussole. Apprendre à se choisir tout en restant en lien.",
  },
  3: {
    nom: "L'expression",
    essence: "Créativité · Joie · Communication",
    message:
      "Une vibration qui appelle à laisser sortir ce qui est en vous — la voix, le geste, la couleur. La lumière vous traverse quand vous osez créer, sans attendre la permission.",
  },
  4: {
    nom: "L'ancrage",
    essence: "Stabilité · Travail · Construction",
    message:
      "Vous bâtissez dans le concret, lentement, solidement. Cette vibration vous rappelle qu'il y a une beauté dans la patience et que la sécurité vient d'abord du dedans.",
  },
  5: {
    nom: "Le mouvement",
    essence: "Liberté · Changement · Aventure",
    message:
      "Vous ne tenez pas en place — et c'est juste. Cette vibration appelle à apprivoiser le mouvement comme une force, à transformer l'instabilité en exploration consciente.",
  },
  6: {
    nom: "Le lien",
    essence: "Famille · Responsabilité · Amour",
    message:
      "Vous portez le souci de l'autre comme une vocation. Cette vibration vous invite à aimer sans vous oublier, à donner sans vous épuiser, à reconnaître où le lien commence vraiment.",
  },
  7: {
    nom: "L'introspection",
    essence: "Spiritualité · Intériorité · Sagesse",
    message:
      "Une vibration qui appelle au retrait, à l'écoute fine, à la quête de sens. Vous percevez ce que d'autres ne voient pas. Cette profondeur demande des espaces de silence.",
  },
  8: {
    nom: "L'incarnation",
    essence: "Pouvoir juste · Manifestation · Abondance",
    message:
      "Vous êtes là pour incarner, prendre votre place dans le matériel sans renier le sensible. Cette vibration appelle à apprivoiser le pouvoir et à le mettre au service du juste.",
  },
  9: {
    nom: "L'accomplissement",
    essence: "Compassion · Élargissement · Transmission",
    message:
      "Vous portez quelque chose qui dépasse votre seule histoire. Cette vibration appelle à transmettre, à servir, à laisser partir ce qui ne vous appartient plus.",
  },
  11: {
    nom: "L'inspiration",
    essence: "Intuition · Visionnaire · Lumière",
    message:
      "Maître nombre — vous portez une intensité qui peut éclairer ou submerger. Cette vibration demande à apprivoiser l'intuition vive et à l'ancrer dans le réel.",
    maitre: true,
  },
  22: {
    nom: "Le bâtisseur",
    essence: "Maître bâtisseur · Manifestation · Œuvre",
    message:
      "Maître nombre — vous êtes là pour construire quelque chose de plus grand. Cette vibration appelle à oser bâtir sans vous laisser écraser par l'ampleur du chemin.",
    maitre: true,
  },
  33: {
    nom: "Le passeur",
    essence: "Guide spirituel · Service · Transmission",
    message:
      "Maître nombre rare — vous portez une vibration de service profond. Cette présence appelle à transmettre par votre propre traversée, sans vous prendre pour le sauveur.",
    maitre: true,
  },
};

/** Récupère la signification (avec fallback sur 1 si nombre invalide). */
export function getCheminDeVieInfo(n: number): CheminDeVieInfo {
  return cheminDeVieSignifications[n] ?? cheminDeVieSignifications[1];
}
