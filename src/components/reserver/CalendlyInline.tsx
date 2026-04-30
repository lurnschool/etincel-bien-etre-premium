"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Embed Calendly inline. Charge le widget officiel Calendly et affiche
 * le calendrier des disponibilités réelles de Céline directement sur
 * la page /reserver/[slug].
 *
 * - Le widget gère lui-même : choix du créneau, coordonnées du client,
 *   email de confirmation et (si Calendly Premium configuré) paiement
 *   Stripe directement dans le flow Calendly.
 * - Une fois le rendez-vous pris, Calendly redirige automatiquement
 *   vers la page de remerciement (configurée dans Calendly Settings).
 */
export function CalendlyInline({
  url,
  prefill,
  height = 720,
}: {
  url: string;
  prefill?: { name?: string; email?: string };
  height?: number;
}) {
  useEffect(() => {
    const scriptId = "calendly-widget-script";
    if (document.getElementById(scriptId)) return;
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      // Pas de cleanup du script (Calendly s'attend à rester chargé)
    };
  }, []);

  const fullUrl = (() => {
    const params = new URLSearchParams();
    if (prefill?.name) params.set("name", prefill.name);
    if (prefill?.email) params.set("email", prefill.email);
    params.set("hide_event_type_details", "0");
    params.set("hide_gdpr_banner", "1");
    return `${url}?${params.toString()}`;
  })();

  return (
    <div className="space-y-4">
      <div
        className="calendly-inline-widget rounded-2xl border border-border-soft bg-bg-card overflow-hidden"
        data-url={fullUrl}
        style={{ minWidth: 320, height }}
      />
      <p className="text-xs text-text-soft text-center">
        Le calendrier est géré par Calendly · paiement sécurisé Stripe
        intégré · email de confirmation automatique.{" "}
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-deep inline-flex items-center gap-1"
        >
          Ouvrir Calendly dans un nouvel onglet
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
