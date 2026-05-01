/**
 * Route API Stripe Checkout — crée une Session de paiement réelle.
 *
 * Cette route NE FONCTIONNE PAS sur GitHub Pages (export statique).
 * Elle est utilisable :
 *   - en local (`next dev`) avec `STRIPE_SECRET_KEY` dans `.env.local`
 *   - sur un déploiement Node/Edge (Vercel, Render, etc.)
 *
 * En l'absence de clé serveur, on renvoie une 503 propre — le front
 * traite la réponse et bascule sur le règlement manuel (WhatsApp / email).
 *
 * Aucune simulation : si le serveur ne peut pas créer une session, il le
 * dit explicitement. Pas de fausse redirection.
 */

import { findProduct } from "@/lib/stripeProducts";

export const dynamic = "force-dynamic";

type CheckoutLine = {
  productId: string;
  quantity: number;
  customAmountCents?: number;
  noteToCeline?: string;
};

type CheckoutPayload = {
  lines: CheckoutLine[];
  contact?: {
    firstname?: string;
    email?: string;
    phone?: string;
  };
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
  mode?: "payment" | "subscription";
};

const MAX_QTY_PER_LINE = 10;
const MAX_LINES = 12;
const MIN_AMOUNT_CENTS = 100;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function buildOrigin(req: Request): string {
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? url.host;
  return `${proto}://${host}`;
}

function safeUrl(input: string | undefined, origin: string, fallbackPath: string): string {
  const fallback = `${origin}${fallbackPath}`;
  if (!input) return fallback;
  try {
    const parsed = new URL(input, origin);
    if (parsed.origin !== origin) return fallback;
    return parsed.toString();
  } catch {
    return fallback;
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: "STRIPE_SECRET_KEY absente — paiement Stripe inactif sur cet hébergement.",
        fallback: true,
      },
      { status: 503 },
    );
  }

  let payload: CheckoutPayload;
  try {
    payload = (await req.json()) as CheckoutPayload;
  } catch {
    return Response.json({ error: "Payload invalide" }, { status: 400 });
  }

  const lines = Array.isArray(payload.lines) ? payload.lines : [];
  if (lines.length === 0) {
    return Response.json({ error: "Aucun article à régler" }, { status: 400 });
  }
  if (lines.length > MAX_LINES) {
    return Response.json({ error: "Trop d'articles dans le panier" }, { status: 400 });
  }

  const mode = payload.mode === "subscription" ? "subscription" : "payment";
  const origin = buildOrigin(req);
  const successUrl = safeUrl(payload.successUrl, origin, "/panier/merci/?session_id={CHECKOUT_SESSION_ID}");
  const cancelUrl = safeUrl(payload.cancelUrl, origin, "/panier/annule/");

  const form = new URLSearchParams();
  form.append("mode", mode);
  form.append("success_url", successUrl);
  form.append("cancel_url", cancelUrl);
  form.append("locale", "fr");
  form.append("billing_address_collection", "auto");
  form.append("payment_method_types[0]", "card");
  form.append("allow_promotion_codes", "true");

  if (payload.contact?.email && isValidEmail(payload.contact.email)) {
    form.append("customer_email", payload.contact.email);
  }

  const flatMetadata: Record<string, string> = {
    source: "etincel-cart",
    ...payload.metadata,
  };
  if (payload.contact?.firstname) flatMetadata.contact_firstname = payload.contact.firstname.slice(0, 80);
  if (payload.contact?.phone) flatMetadata.contact_phone = payload.contact.phone.slice(0, 40);

  let lineIndex = 0;
  for (const line of lines) {
    if (!line || typeof line.productId !== "string") {
      return Response.json({ error: "Article invalide" }, { status: 400 });
    }
    const quantity = Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(line.quantity ?? 1)));
    const product = findProduct(line.productId);
    if (!product) {
      return Response.json(
        { error: `Produit inconnu : ${line.productId}` },
        { status: 400 },
      );
    }
    const allowsCustom = product.metadata.customAmount === "true";
    const unitCents =
      allowsCustom && typeof line.customAmountCents === "number"
        ? Math.round(line.customAmountCents)
        : product.priceCents;
    if (unitCents < MIN_AMOUNT_CENTS) {
      return Response.json(
        { error: `Montant trop faible pour ${product.name} (min 1 €)` },
        { status: 400 },
      );
    }

    const prefix = `line_items[${lineIndex}]`;
    form.append(`${prefix}[quantity]`, String(quantity));
    form.append(`${prefix}[price_data][currency]`, product.currency);
    form.append(`${prefix}[price_data][unit_amount]`, String(unitCents));
    form.append(`${prefix}[price_data][product_data][name]`, product.name);
    if (product.description) {
      form.append(`${prefix}[price_data][product_data][description]`, product.description.slice(0, 500));
    }
    form.append(`${prefix}[price_data][product_data][metadata][product_id]`, product.id);
    form.append(`${prefix}[price_data][product_data][metadata][category]`, product.category);
    for (const [k, v] of Object.entries(product.metadata)) {
      form.append(`${prefix}[price_data][product_data][metadata][${k}]`, v);
    }
    if (mode === "subscription") {
      form.append(
        `${prefix}[price_data][recurring][interval]`,
        product.id.includes("annuel") ? "year" : "month",
      );
    }
    if (line.noteToCeline) {
      flatMetadata[`note_${product.id}`] = line.noteToCeline.slice(0, 240);
    }
    lineIndex += 1;
  }

  for (const [k, v] of Object.entries(flatMetadata)) {
    if (typeof v === "string" && v.length > 0) {
      form.append(`metadata[${k}]`, v.slice(0, 500));
    }
  }

  try {
    const upstream = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return Response.json(
        {
          error: "Stripe a refusé la création de la session.",
          detail: detail.slice(0, 600),
        },
        { status: 502 },
      );
    }

    const session = (await upstream.json()) as { id: string; url: string };
    return Response.json({ id: session.id, url: session.url });
  } catch (err) {
    return Response.json(
      {
        error: "Échec de l'appel à l'API Stripe.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
}
