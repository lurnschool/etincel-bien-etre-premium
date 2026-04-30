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
 * Génère une référence unique de commande lisible — utilisée comme
 * référence interne pour les flows manuels (carte cadeau finalisée,
 * envoi récap WhatsApp). Le vrai numéro de transaction côté Stripe
 * remonte via l'API.
 */
export function generateOrderRef(prefix = "EBE"): string {
  const date = new Date();
  const stamp = `${date.getFullYear().toString().slice(2)}${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

export type CheckoutLineInput = {
  productId: string;
  quantity?: number;
  customAmountCents?: number;
  noteToCeline?: string;
};

export type CheckoutContact = {
  firstname?: string;
  email?: string;
  phone?: string;
};

export type CheckoutResult =
  | { ok: true; url: string; sessionId: string }
  | { ok: false; fallback: boolean; error: string };

/**
 * Crée une session Stripe Checkout réelle via /api/checkout et renvoie
 * l'URL de redirection. En cas d'absence de clé serveur (export GitHub
 * Pages ou variable Vercel non configurée), renvoie `{ ok: false,
 * fallback: true }` pour que l'UI bascule sur le règlement manuel
 * (WhatsApp / email) — aucune simulation de paiement.
 */
export async function createCheckoutSession(
  lines: CheckoutLineInput[],
  options: {
    contact?: CheckoutContact;
    mode?: "payment" | "subscription";
    metadata?: Record<string, string>;
  } = {},
): Promise<CheckoutResult> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: options.mode ?? "payment",
        contact: options.contact,
        metadata: options.metadata,
        lines: lines.map((l) => ({
          productId: l.productId,
          quantity: l.quantity ?? 1,
          customAmountCents: l.customAmountCents,
          noteToCeline: l.noteToCeline,
        })),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      id?: string;
      error?: string;
      fallback?: boolean;
    };

    if (!res.ok || !data.url || !data.id) {
      return {
        ok: false,
        fallback: Boolean(data.fallback) || res.status === 503,
        error: data.error ?? "Création de session Stripe impossible.",
      };
    }
    return { ok: true, url: data.url, sessionId: data.id };
  } catch (err) {
    return {
      ok: false,
      fallback: true,
      error: err instanceof Error ? err.message : "Réseau indisponible.",
    };
  }
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
