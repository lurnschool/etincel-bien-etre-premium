/**
 * Catalogue Stripe préparé — produits référencés mais paiement non actif
 * tant que les clés Stripe ne sont pas configurées et qu'un test n'est pas
 * effectué.
 *
 * Lecture :
 *   - `priceCents` : prix en centimes (norme Stripe)
 *   - `currency` : "eur"
 *   - `category` : pratique | carte-cadeau | formation
 *   - `metadata` : informations pour Stripe Dashboard
 */

export type StripeProduct = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: "eur";
  category: "pratique" | "carte-cadeau" | "formation";
  metadata: Record<string, string>;
};

export const stripeProducts: StripeProduct[] = [
  // Pratiques
  {
    id: "numerologie-110",
    name: "Lecture numérologie",
    description: "Lecture symbolique des nombres — cycles, talents, ressources.",
    priceCents: 11000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "numerologie", duration: "1h30" },
  },
  {
    id: "hypnose-90",
    name: "Hypnose & mouvements oculaires",
    description: "Voyage intérieur, reconnexion à l'inconscient.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "hypnose", duration: "1h30" },
  },
  {
    id: "cellrelease-90",
    name: "CellRelease®",
    description: "Relaxation profonde, libération des mémoires cellulaires.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "cellrelease", duration: "1h30" },
  },
  {
    id: "massage-energetique-90",
    name: "Massage & soin énergétique",
    description: "Toucher, instruments, vibrations — réactivation énergétique.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "massage-energetique", duration: "1h" },
  },
  {
    id: "massage-liberation-1h20",
    name: "Massage Libération Reconnexion · 1h20",
    description: "Massage profond, dialogue main-souffle-corps.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "massage-liberation-reconnexion", duration: "1h20" },
  },
  {
    id: "massage-liberation-1h45",
    name: "Massage Libération Reconnexion · 1h45",
    description: "Format long pour un travail en profondeur.",
    priceCents: 12000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "massage-liberation-reconnexion", duration: "1h45" },
  },
  {
    id: "reflexologie-90",
    name: "Réflexologie amérindienne",
    description: "Stimulation des zones réflexes, ouverture symbolique.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "reflexologie", duration: "1h" },
  },
  {
    id: "constellation-95",
    name: "Constellation",
    description: "Familiale ou de naissance Rebirth — éclairer les liens invisibles.",
    priceCents: 9500,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "constellations" },
  },
  {
    id: "breathwork-individuel-90",
    name: "Breathwork chamanique individuel",
    description: "Souffle, présence, transmutation.",
    priceCents: 9000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "breathwork", format: "individuel" },
  },
  {
    id: "breathwork-duo-140",
    name: "Breathwork chamanique en duo",
    description: "Souffle partagé en duo.",
    priceCents: 14000,
    currency: "eur",
    category: "pratique",
    metadata: { practice: "breathwork", format: "duo" },
  },

  // Formations
  {
    id: "formation-numerologie-m1-320",
    name: "Formation Numérologie · Module 1",
    description: "Les fondations de la numérologie pour lire les cycles d'une vie.",
    priceCents: 32000,
    currency: "eur",
    category: "formation",
    metadata: { formation: "numerologie", level: "M1" },
  },
  {
    id: "formation-numerologie-m2-320",
    name: "Formation Numérologie · Module 2",
    description: "Approfondissement et lecture symbolique avancée.",
    priceCents: 32000,
    currency: "eur",
    category: "formation",
    metadata: { formation: "numerologie", level: "M2" },
  },

  // Cartes cadeaux pré-définies
  {
    id: "carte-cadeau-cacao",
    name: "Carte cadeau · Rituel cacao",
    description: "Offrir une cérémonie cacao — montant à confirmer selon événement.",
    priceCents: 0, // sur demande
    currency: "eur",
    category: "carte-cadeau",
    metadata: { type: "cacao", customAmount: "true" },
  },
  {
    id: "carte-cadeau-numerologie-110",
    name: "Carte cadeau · Lecture numérologie",
    description: "Offrir une lecture numérologique complète.",
    priceCents: 11000,
    currency: "eur",
    category: "carte-cadeau",
    metadata: { type: "numerologie" },
  },
  {
    id: "carte-cadeau-soin-90",
    name: "Carte cadeau · Soin énergétique",
    description: "Offrir un soin (hypnose, CellRelease, massage, réflexologie).",
    priceCents: 9000,
    currency: "eur",
    category: "carte-cadeau",
    metadata: { type: "soin" },
  },
  {
    id: "carte-cadeau-constellation-95",
    name: "Carte cadeau · Constellation",
    description: "Offrir une constellation familiale ou de naissance.",
    priceCents: 9500,
    currency: "eur",
    category: "carte-cadeau",
    metadata: { type: "constellation" },
  },
  {
    id: "carte-cadeau-libre",
    name: "Carte cadeau · Montant libre",
    description: "À utiliser librement sur l'ensemble des accompagnements.",
    priceCents: 0,
    currency: "eur",
    category: "carte-cadeau",
    metadata: { type: "libre", customAmount: "true" },
  },
];

/**
 * État de l'intégration Stripe.
 * UI activée — Céline brandera les clés réelles. Tant que les clés
 * publiques/serveur ne sont pas posées, `redirectToCheckout` simule
 * la redirection vers la page de succès en attendant.
 */
export const stripeEnabled = true;

/**
 * Génère une référence unique de commande lisible — utilisée comme
 * référence client pour la carte cadeau finalisée.
 */
export function generateOrderRef(prefix = "EBE"): string {
  const date = new Date();
  const stamp = `${date.getFullYear().toString().slice(2)}${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

/**
 * Lance la redirection vers Stripe Checkout. Tant que les clés Stripe
 * ne sont pas branchées, on simule via une promesse — l'UI bascule
 * directement vers l'écran de succès. Quand les clés seront en place,
 * remplacer le corps de la fonction par un fetch vers /api/checkout
 * + window.location.href = session.url.
 */
export async function redirectToCheckout(productId: string): Promise<{ ok: boolean; ref: string }> {
  await new Promise((r) => setTimeout(r, 1400));
  return { ok: true, ref: generateOrderRef(productId.slice(0, 4).toUpperCase()) };
}

/**
 * Format un prix Stripe en string lisible (ex: 11000 → "110 €").
 */
export function formatStripePrice(priceCents: number): string {
  if (priceCents === 0) return "Sur demande";
  return `${(priceCents / 100).toFixed(0)} €`;
}

export function findProduct(id: string): StripeProduct | undefined {
  return stripeProducts.find((p) => p.id === id);
}
