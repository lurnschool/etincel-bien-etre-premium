/**
 * Route serveur unifiée pour tous les formulaires du site.
 *
 * Reçoit un payload typé par `intent` :
 *   - "contact"            — message libre depuis /contact ou ContactRapide
 *   - "diagnostic"         — récap du bilan d'orientation
 *   - "retreat-interest"   — intérêt pour une retraite
 *   - "reservation-manual" — réservation séance, règlement avec Céline
 *   - "gift-card-manual"   — carte cadeau, règlement avec Céline
 *
 * Envoie un email :
 *   - À Céline (info structurée + lien WhatsApp pour répondre vite)
 *   - Au client (accusé de réception + délai 24h)
 *
 * Sans `RESEND_API_KEY`, renvoie 503 + `fallback: true` — le front bascule
 * sur WhatsApp / mailto sans simuler un envoi.
 */

import { sendEmail, sanitizeForEmail, escapeHtml, type EmailResult } from "@/lib/email";

export const dynamic = "force-dynamic";

const CELINE_EMAIL = "etincel33@gmail.com";
const CELINE_NAME = "Céline";
const WA_NUMBER = "33627438104";

type Intent =
  | "contact"
  | "diagnostic"
  | "retreat-interest"
  | "reservation-manual"
  | "gift-card-manual";

type ContactPayload = {
  intent: Intent;
  contact: {
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
  };
  fields?: Record<string, string | number | boolean | null | undefined>;
  message?: string;
  metadata?: Record<string, string>;
};

const intentLabels: Record<Intent, { subject: string; cta: string; clientHeading: string }> = {
  contact: {
    subject: "Nouveau message — site Etincel",
    cta: "Message libre",
    clientHeading: "Votre message est arrivé",
  },
  diagnostic: {
    subject: "Bilan d'orientation — nouvelle réponse",
    cta: "Bilan d'orientation",
    clientHeading: "Votre bilan est arrivé chez Céline",
  },
  "retreat-interest": {
    subject: "Intérêt retraite — nouvelle inscription",
    cta: "Intérêt retraite",
    clientHeading: "Votre intérêt pour la retraite est noté",
  },
  "reservation-manual": {
    subject: "Réservation séance — règlement manuel",
    cta: "Réservation à confirmer",
    clientHeading: "Votre demande de réservation est arrivée",
  },
  "gift-card-manual": {
    subject: "Carte cadeau — règlement manuel",
    cta: "Carte cadeau à confirmer",
    clientHeading: "Votre demande de carte cadeau est arrivée",
  },
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function formatFields(fields: ContactPayload["fields"]): { text: string; html: string } {
  if (!fields) return { text: "", html: "" };
  const entries = Object.entries(fields).filter(
    ([, v]) => v !== null && v !== undefined && v !== "",
  );
  if (entries.length === 0) return { text: "", html: "" };

  const text = entries
    .map(([k, v]) => `• ${k} : ${String(v)}`)
    .join("\n");
  const html = `<table style="border-collapse:collapse;margin:12px 0;">${entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#7a6f80;font-size:13px;">${escapeHtml(k)}</td><td style="padding:4px 0;color:#1f1a2e;font-size:14px;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("")}</table>`;
  return { text, html };
}

function buildCelineEmail(payload: ContactPayload, label: { subject: string; cta: string }): { subject: string; text: string; html: string } {
  const { contact, message } = payload;
  const fullName = [contact.firstname, contact.lastname].filter(Boolean).join(" ") || "(prénom non renseigné)";
  const fields = formatFields(payload.fields);

  const textParts = [
    `${label.cta}`,
    `De : ${fullName} <${contact.email}>`,
    contact.phone ? `Téléphone : ${contact.phone}` : null,
    "",
    fields.text,
    "",
    message ? `Message :\n${sanitizeForEmail(message)}` : null,
    "",
    "—",
    `Pour répondre rapidement : https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour ${contact.firstname ?? ""}, `)}`,
    `Ou répondre à cet email : ${contact.email}`,
  ].filter(Boolean);

  const htmlMessage = message ? `<p style="white-space:pre-wrap;color:#1f1a2e;font-size:14px;line-height:1.6;">${escapeHtml(sanitizeForEmail(message))}</p>` : "";

  const html = `
<!DOCTYPE html>
<html lang="fr"><body style="margin:0;padding:24px;background:#faf6ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e0d4;border-radius:16px;padding:32px;">
    <p style="margin:0 0 8px;color:#9b8451;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Site Etincel</p>
    <h1 style="margin:0 0 16px;color:#1f1a2e;font-size:22px;font-weight:500;">${escapeHtml(label.cta)}</h1>
    <p style="margin:0 0 12px;color:#1f1a2e;font-size:15px;"><strong>${escapeHtml(fullName)}</strong> &lt;${escapeHtml(contact.email)}&gt;</p>
    ${contact.phone ? `<p style="margin:0 0 12px;color:#1f1a2e;font-size:14px;">Téléphone : ${escapeHtml(contact.phone)}</p>` : ""}
    ${fields.html}
    ${htmlMessage}
    <hr style="border:none;border-top:1px solid #e8e0d4;margin:24px 0;" />
    <p style="margin:0 0 8px;color:#7a6f80;font-size:12px;">Pour répondre vite :</p>
    <p style="margin:0;">
      <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Bonjour ${contact.firstname ?? ""}, `)}" style="display:inline-block;padding:8px 14px;background:#25D366;color:#fff;border-radius:999px;text-decoration:none;font-size:13px;">WhatsApp ${escapeHtml(contact.firstname ?? "")}</a>
      <a href="mailto:${escapeHtml(contact.email)}" style="display:inline-block;padding:8px 14px;background:#6b4f8a;color:#fff;border-radius:999px;text-decoration:none;font-size:13px;margin-left:8px;">Répondre par email</a>
    </p>
  </div>
</body></html>`;

  return {
    subject: label.subject,
    text: textParts.join("\n"),
    html,
  };
}

function buildClientEmail(payload: ContactPayload, label: { clientHeading: string }): { subject: string; text: string; html: string } {
  const firstname = payload.contact.firstname ?? "";

  const text = `${firstname ? `Bonjour ${firstname},` : "Bonjour,"}

${label.clientHeading}.

Céline vous répond personnellement dans les 24h. En cas d'urgence, vous pouvez la joindre directement par WhatsApp : https://wa.me/${WA_NUMBER}.

À très bientôt,
${CELINE_NAME} — Etincel de bien être`;

  const html = `<!DOCTYPE html>
<html lang="fr"><body style="margin:0;padding:24px;background:#faf6ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e8e0d4;border-radius:16px;padding:32px;">
    <p style="margin:0 0 8px;color:#9b8451;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Etincel de bien être</p>
    <h1 style="margin:0 0 16px;color:#1f1a2e;font-size:22px;font-weight:500;">${escapeHtml(label.clientHeading)}.</h1>
    <p style="margin:0 0 12px;color:#1f1a2e;font-size:15px;line-height:1.6;">${firstname ? `Bonjour ${escapeHtml(firstname)},` : "Bonjour,"}</p>
    <p style="margin:0 0 12px;color:#1f1a2e;font-size:15px;line-height:1.6;">Céline vous répond personnellement dans les 24h. En cas d'urgence, vous pouvez la joindre directement par WhatsApp.</p>
    <p style="margin:24px 0 0;">
      <a href="https://wa.me/${WA_NUMBER}" style="display:inline-block;padding:10px 18px;background:#25D366;color:#fff;border-radius:999px;text-decoration:none;font-size:14px;">Continuer sur WhatsApp</a>
    </p>
    <hr style="border:none;border-top:1px solid #e8e0d4;margin:32px 0 16px;" />
    <p style="margin:0;color:#7a6f80;font-size:12px;">${CELINE_NAME} Dusseval · accompagnatrice holistique en Gironde · etinceldebienetre.fr</p>
  </div>
</body></html>`;

  return {
    subject: `${label.clientHeading} — Etincel`,
    text,
    html,
  };
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Payload invalide" }, { status: 400 });
  }

  if (!payload?.intent || !intentLabels[payload.intent]) {
    return Response.json({ error: "Intent inconnu" }, { status: 400 });
  }
  if (!payload.contact?.email || !isValidEmail(payload.contact.email)) {
    return Response.json({ error: "Email invalide" }, { status: 400 });
  }

  const label = intentLabels[payload.intent];

  const celineMail = buildCelineEmail(payload, label);
  const clientMail = buildClientEmail(payload, label);

  const [celineRes, clientRes]: [EmailResult, EmailResult] = await Promise.all([
    sendEmail({
      to: CELINE_EMAIL,
      subject: celineMail.subject,
      text: celineMail.text,
      html: celineMail.html,
      replyTo: payload.contact.email,
    }),
    sendEmail({
      to: payload.contact.email,
      subject: clientMail.subject,
      text: clientMail.text,
      html: clientMail.html,
    }),
  ]);

  if (celineRes.ok === false && celineRes.fallback) {
    return Response.json(
      {
        error: celineRes.error,
        fallback: true,
      },
      { status: 503 },
    );
  }

  if (celineRes.ok === false) {
    return Response.json(
      {
        error: "Envoi vers Céline en échec.",
        detail: celineRes.error,
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    celineEmailId: celineRes.id,
    clientEmailId: clientRes.ok ? clientRes.id : null,
    clientEmailWarning: clientRes.ok ? null : clientRes.error,
  });
}
