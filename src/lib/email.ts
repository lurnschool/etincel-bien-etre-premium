/**
 * Helper email serveur (Resend).
 *
 * Utilisé uniquement par les routes API (`/api/contact`, `/api/stripe-webhook`).
 * NE PAS importer côté client — la clé Resend est privée.
 *
 * Si `RESEND_API_KEY` n'est pas posée, `sendEmail` renvoie `{ ok: false,
 * fallback: true }` pour que la route puisse répondre proprement et que le
 * front bascule sur WhatsApp / mailto sans simuler un envoi.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const DEFAULT_FROM = "Etincel <celine@etinceldebienetre.fr>";
const DEFAULT_REPLY_TO = "etincel33@gmail.com";

export type EmailPayload = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

export type EmailResult =
  | { ok: true; id: string }
  | { ok: false; fallback: boolean; error: string };

export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      fallback: true,
      error: "RESEND_API_KEY absente — email Resend inactif sur cet hébergement.",
    };
  }

  const body: Record<string, unknown> = {
    from: payload.from ?? process.env.RESEND_FROM ?? DEFAULT_FROM,
    to: payload.to,
    subject: payload.subject,
    reply_to: payload.replyTo ?? DEFAULT_REPLY_TO,
  };
  if (payload.text) body.text = payload.text;
  if (payload.html) body.html = payload.html;
  if (payload.cc) body.cc = payload.cc;
  if (payload.bcc) body.bcc = payload.bcc;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!res.ok || !data.id) {
      return {
        ok: false,
        fallback: false,
        error: data.message ?? data.name ?? `HTTP ${res.status}`,
      };
    }
    return { ok: true, id: data.id };
  } catch (err) {
    return {
      ok: false,
      fallback: true,
      error: err instanceof Error ? err.message : "Réseau Resend indisponible.",
    };
  }
}

/**
 * Normalise les sauts de ligne et tronque la valeur à `maxLength` pour
 * éviter d'inclure du contenu user illimité dans les emails.
 */
export function sanitizeForEmail(value: string, maxLength = 4000): string {
  const normalized = value.split("\r\n").join("\n");
  return normalized.slice(0, maxLength).trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
