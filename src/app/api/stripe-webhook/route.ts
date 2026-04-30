/**
 * Webhook Stripe — endpoint à configurer dans le Dashboard Stripe :
 *
 *   URL          : https://etinceldebienetre.fr/api/stripe-webhook
 *   Évènements   : checkout.session.completed
 *
 * Variables d'environnement requises :
 *   STRIPE_SECRET_KEY        clé serveur Stripe (déjà utilisée par /api/checkout)
 *   STRIPE_WEBHOOK_SECRET    secret signing du webhook
 *   RESEND_API_KEY           pour notifier Céline + le client (optionnel mais
 *                             vivement recommandé pour activer la traçabilité)
 *
 * À la réception d'un `checkout.session.completed`, on envoie deux emails :
 *   - À Céline   : récap commande + lien Stripe pour ouvrir la session
 *   - Au client  : remerciement + rappel des prochaines étapes
 *
 * Sans signature valide → 400. Sans STRIPE_WEBHOOK_SECRET → 503.
 * Sans RESEND_API_KEY → 200 mais avec warning dans la réponse (le paiement
 * lui-même est validé par Stripe, l'email est best-effort).
 */

import { sendEmail, escapeHtml, sanitizeForEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const CELINE_EMAIL = "etincel33@gmail.com";
const WA_NUMBER = "33627438104";

type StripeLineItem = {
  description?: string;
  quantity?: number;
  amount_total?: number;
  price?: { product?: string };
};

type StripeSession = {
  id: string;
  amount_total?: number;
  currency?: string;
  customer_email?: string | null;
  customer_details?: { email?: string | null; name?: string | null; phone?: string | null };
  metadata?: Record<string, string>;
  mode?: string;
  payment_status?: string;
  status?: string;
  livemode?: boolean;
  url?: string;
};

/**
 * Vérifie la signature `stripe-signature` selon la spécification officielle.
 * Format : `t=<timestamp>,v1=<sig>[,v0=<legacy>]`. On compare en HMAC-SHA256
 * sur `<timestamp>.<rawBody>` avec `STRIPE_WEBHOOK_SECRET`.
 */
async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300,
): Promise<boolean> {
  const parts = signatureHeader.split(",").reduce<Record<string, string[]>>((acc, p) => {
    const [k, v] = p.split("=");
    if (k && v) {
      (acc[k] ??= []).push(v);
    }
    return acc;
  }, {});
  const timestamp = parts.t?.[0];
  const signatures = parts.v1 ?? [];
  if (!timestamp || signatures.length === 0) return false;

  const ts = parseInt(timestamp, 10);
  if (!Number.isFinite(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > toleranceSeconds) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(`${timestamp}.${rawBody}`));
  const hex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signatures.some((expected) => timingSafeEqual(expected, hex));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function formatAmount(amountCents: number | undefined, currency: string | undefined): string {
  if (typeof amountCents !== "number") return "—";
  const cur = (currency ?? "eur").toUpperCase();
  return `${(amountCents / 100).toFixed(2)} ${cur}`;
}

async function fetchLineItems(sessionId: string, apiKey: string): Promise<StripeLineItem[]> {
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}/line_items?limit=20`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );
    if (!res.ok) return [];
    const body = (await res.json()) as { data?: StripeLineItem[] };
    return body.data ?? [];
  } catch {
    return [];
  }
}

function buildCelineEmail(session: StripeSession, items: StripeLineItem[]) {
  const customerName = session.customer_details?.name ?? "(client·e sans nom renseigné)";
  const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";
  const customerPhone = session.customer_details?.phone ?? "";
  const total = formatAmount(session.amount_total, session.currency);
  const flow = session.metadata?.flow ?? "panier";

  const itemsText =
    items.length > 0
      ? items
          .map(
            (it) =>
              `• ${it.description ?? "Article"} × ${it.quantity ?? 1} — ${formatAmount(it.amount_total, session.currency)}`,
          )
          .join("\n")
      : "(détail des lignes indisponible — voir Stripe Dashboard)";

  const itemsHtml = items
    .map(
      (it) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#1f1a2e;font-size:14px;">${escapeHtml(it.description ?? "Article")} <span style="color:#7a6f80;">× ${it.quantity ?? 1}</span></td><td style="padding:6px 0;color:#1f1a2e;font-size:14px;text-align:right;white-space:nowrap;">${escapeHtml(formatAmount(it.amount_total, session.currency))}</td></tr>`,
    )
    .join("");

  const text = [
    `🎉 Nouveau paiement Stripe — ${total}`,
    "",
    `Référence : ${session.id}`,
    `Mode : ${session.mode ?? "payment"}${session.livemode === false ? " (TEST)" : ""}`,
    `Flow : ${flow}`,
    "",
    `Client : ${customerName}`,
    `Email  : ${customerEmail}`,
    customerPhone ? `Téléphone : ${customerPhone}` : null,
    "",
    "Articles :",
    itemsText,
    "",
    "—",
    `Fiche Stripe : https://dashboard.stripe.com/${session.livemode === false ? "test/" : ""}payments`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr"><body style="margin:0;padding:24px;background:#faf6ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e0d4;border-radius:16px;padding:32px;">
    <p style="margin:0 0 8px;color:#9b8451;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Paiement reçu</p>
    <h1 style="margin:0 0 16px;color:#1f1a2e;font-size:24px;font-weight:500;">${escapeHtml(total)}${session.livemode === false ? ' <span style="font-size:12px;color:#9b8451;">(TEST)</span>' : ""}</h1>
    <p style="margin:0 0 6px;color:#1f1a2e;font-size:15px;"><strong>${escapeHtml(customerName)}</strong>${customerEmail ? ` &lt;${escapeHtml(customerEmail)}&gt;` : ""}</p>
    ${customerPhone ? `<p style="margin:0 0 12px;color:#1f1a2e;font-size:14px;">Téléphone : ${escapeHtml(customerPhone)}</p>` : ""}
    <p style="margin:6px 0 18px;color:#7a6f80;font-size:12px;">Flow : ${escapeHtml(flow)} · Réf : ${escapeHtml(session.id)}</p>
    ${itemsHtml ? `<table style="width:100%;border-collapse:collapse;margin:0 0 18px;border-top:1px solid #e8e0d4;border-bottom:1px solid #e8e0d4;">${itemsHtml}</table>` : ""}
    <p style="margin:0;">
      ${customerPhone ? `<a href="https://wa.me/${customerPhone.replace(/[^\d]/g, "")}" style="display:inline-block;padding:8px 14px;background:#25D366;color:#fff;border-radius:999px;text-decoration:none;font-size:13px;">WhatsApp client</a>` : `<a href="https://wa.me/${WA_NUMBER}" style="display:inline-block;padding:8px 14px;background:#25D366;color:#fff;border-radius:999px;text-decoration:none;font-size:13px;">WhatsApp</a>`}
      ${customerEmail ? `<a href="mailto:${escapeHtml(customerEmail)}" style="display:inline-block;padding:8px 14px;background:#6b4f8a;color:#fff;border-radius:999px;text-decoration:none;font-size:13px;margin-left:8px;">Répondre</a>` : ""}
      <a href="https://dashboard.stripe.com/${session.livemode === false ? "test/" : ""}payments" style="display:inline-block;padding:8px 14px;background:transparent;color:#6b4f8a;border:1px solid #6b4f8a;border-radius:999px;text-decoration:none;font-size:13px;margin-left:8px;">Voir sur Stripe</a>
    </p>
  </div>
</body></html>`;

  return { subject: `Nouveau paiement — ${total}`, text, html };
}

function buildClientEmail(session: StripeSession) {
  const firstname = session.customer_details?.name?.split(" ")[0] ?? "";
  const total = formatAmount(session.amount_total, session.currency);

  const text = `${firstname ? `Bonjour ${firstname},` : "Bonjour,"}

Votre paiement de ${total} a été confirmé. Merci pour votre confiance.

Céline vous appelle ou vous écrit personnellement dans les 24h pour caler le créneau exact, le lieu et préparer votre venue.

En attendant, vous pouvez la joindre directement sur WhatsApp : https://wa.me/${WA_NUMBER}.

À très bientôt,
Céline — Etincel de bien être`;

  const html = `<!DOCTYPE html>
<html lang="fr"><body style="margin:0;padding:24px;background:#faf6ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e8e0d4;border-radius:16px;padding:32px;">
    <p style="margin:0 0 8px;color:#9b8451;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Paiement confirmé</p>
    <h1 style="margin:0 0 16px;color:#1f1a2e;font-size:22px;font-weight:500;">Merci, votre paiement de <strong>${escapeHtml(total)}</strong> est bien reçu.</h1>
    <p style="margin:0 0 12px;color:#1f1a2e;font-size:15px;line-height:1.6;">${firstname ? `Bonjour ${escapeHtml(firstname)},` : "Bonjour,"}</p>
    <p style="margin:0 0 12px;color:#1f1a2e;font-size:15px;line-height:1.6;">Céline vous appelle ou vous écrit personnellement dans les 24h pour caler le créneau exact, le lieu et préparer votre venue.</p>
    <p style="margin:24px 0 0;">
      <a href="https://wa.me/${WA_NUMBER}" style="display:inline-block;padding:10px 18px;background:#25D366;color:#fff;border-radius:999px;text-decoration:none;font-size:14px;">Continuer sur WhatsApp</a>
    </p>
    <hr style="border:none;border-top:1px solid #e8e0d4;margin:32px 0 16px;" />
    <p style="margin:0;color:#7a6f80;font-size:12px;">Céline Dusseval · accompagnatrice holistique en Gironde · etinceldebienetre.fr</p>
  </div>
</body></html>`;

  return { subject: "Paiement confirmé — Etincel de bien être", text, html };
}

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return Response.json(
      {
        error: "Webhook Stripe non configuré (clé ou signing secret absent).",
        fallback: true,
      },
      { status: 503 },
    );
  }

  const signatureHeader = req.headers.get("stripe-signature");
  if (!signatureHeader) {
    return Response.json({ error: "Signature manquante" }, { status: 400 });
  }

  const rawBody = await req.text();
  const ok = await verifyStripeSignature(rawBody, signatureHeader, webhookSecret).catch(() => false);
  if (!ok) {
    return Response.json({ error: "Signature invalide" }, { status: 400 });
  }

  let event: { type: string; data?: { object?: StripeSession } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400 });
  }

  // On ne traite que les sessions complétées — les autres events sont ignorés
  // proprement (Stripe attend juste un 200).
  if (event.type !== "checkout.session.completed") {
    return Response.json({ ok: true, ignored: event.type });
  }

  const session = event.data?.object;
  if (!session?.id) {
    return Response.json({ error: "Session sans id" }, { status: 400 });
  }

  const items = await fetchLineItems(session.id, stripeKey);
  const celineMail = buildCelineEmail(session, items);
  const clientEmail = session.customer_details?.email ?? session.customer_email ?? null;

  const celineRes = await sendEmail({
    to: CELINE_EMAIL,
    subject: celineMail.subject,
    text: sanitizeForEmail(celineMail.text),
    html: celineMail.html,
    replyTo: clientEmail ?? undefined,
  });

  let clientResId: string | null = null;
  if (clientEmail) {
    const clientMail = buildClientEmail(session);
    const clientRes = await sendEmail({
      to: clientEmail,
      subject: clientMail.subject,
      text: sanitizeForEmail(clientMail.text),
      html: clientMail.html,
    });
    if (clientRes.ok) clientResId = clientRes.id;
  }

  return Response.json({
    ok: true,
    celineEmailId: celineRes.ok ? celineRes.id : null,
    celineEmailWarning: celineRes.ok ? null : celineRes.error,
    clientEmailId: clientResId,
  });
}
