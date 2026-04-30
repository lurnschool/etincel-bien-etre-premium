/**
 * Configuration Calendly — système de booking réel pour les pratiques
 * individuelles. Tant que Céline n'a pas branché son compte Calendly,
 * `username` reste vide et le flow réservation utilise son fallback
 * (formulaire de demande envoyé à Céline).
 *
 * Pour activer Calendly :
 * 1. Créer un compte Calendly (Premium recommandé pour intégrer Stripe).
 * 2. Configurer un type d'événement par pratique (durée, prix, créneaux).
 * 3. Brancher Stripe dans Calendly > Settings > Payments.
 * 4. Renseigner `username` ci-dessous (ex: "celine-etincel") +
 *    le mapping `events` avec le slug de chaque type d'événement.
 *
 * Le composant CalendlyInline détecte automatiquement si le booking
 * est branché et affiche le widget en remplacement du formulaire.
 */

export const calendlyConfig = {
  username: "", // ex: "celine-etincel"
  events: {
    numerologie: "lecture-numerologie",
    hypnose: "seance-hypnose",
    cellrelease: "seance-cellrelease",
    "massage-energetique": "massage-energetique",
    "massage-liberation-reconnexion": "massage-liberation",
    reflexologie: "reflexologie",
    breathwork: "breathwork-individuel",
    "constellation-individuelle": "constellation",
    "constellation-naissance-rebirth": "constellation-rebirth",
    "formation-numerologie-m1": "formation-numerologie-m1",
    "formation-numerologie-m2": "formation-numerologie-m2",
  } as Record<string, string>,
} as const;

export function getCalendlyUrl(slug: string): string | null {
  if (!calendlyConfig.username) return null;
  const event = calendlyConfig.events[slug];
  if (!event) return null;
  return `https://calendly.com/${calendlyConfig.username}/${event}`;
}

export function isCalendlyEnabled(): boolean {
  return calendlyConfig.username.length > 0;
}
