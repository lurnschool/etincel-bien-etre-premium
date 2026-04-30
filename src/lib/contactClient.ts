/**
 * Helper client pour POST /api/contact.
 *
 * Tous les formulaires du site utilisent cette fonction. En cas de
 * fallback (clé Resend absente / GitHub Pages / réseau coupé), elle
 * renvoie `{ ok: false, fallback: true }` pour que le composant puisse
 * afficher un message clair + boutons WhatsApp / mailto.
 */

export type ContactIntent =
  | "contact"
  | "diagnostic"
  | "retreat-interest"
  | "reservation-manual"
  | "gift-card-manual";

export type ContactRequest = {
  intent: ContactIntent;
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

export type ContactResponse =
  | { ok: true; celineEmailId: string; clientEmailId: string | null }
  | { ok: false; fallback: boolean; error: string };

export async function submitContact(req: ContactRequest): Promise<ContactResponse> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      celineEmailId?: string;
      clientEmailId?: string | null;
      error?: string;
      fallback?: boolean;
    };
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        fallback: Boolean(data.fallback) || res.status === 503,
        error: data.error ?? `HTTP ${res.status}`,
      };
    }
    return {
      ok: true,
      celineEmailId: data.celineEmailId ?? "",
      clientEmailId: data.clientEmailId ?? null,
    };
  } catch (err) {
    return {
      ok: false,
      fallback: true,
      error: err instanceof Error ? err.message : "Réseau indisponible.",
    };
  }
}
