import { contact } from "./data";

/**
 * Construit un lien WhatsApp avec message pré-rempli.
 *
 * Numéro : 06 27 43 81 04 → format wa.me/33627438104
 */
export function whatsappLink(message?: string): string {
  if (!message) return contact.whatsappLink;
  return `${contact.whatsappLink}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  generic: "Bonjour Céline, j'aimerais échanger avec vous à propos d'un accompagnement.",
  cacao:
    "Bonjour Céline, je suis intéressée par les rituels cacao — pouvez-vous m'en dire plus sur les prochains rendez-vous ?",
  numerologie:
    "Bonjour Céline, j'aimerais réserver une lecture numérologique. Quelles sont vos disponibilités ?",
  constellations:
    "Bonjour Céline, je souhaiterais en savoir plus sur les constellations — est-ce possible d'échanger un instant ?",
  carteCadeau:
    "Bonjour Céline, j'ai préparé une carte cadeau sur le site. J'aimerais finaliser avec vous le règlement et les modalités.",
  retraite:
    "Bonjour Céline, je suis intéressée par les prochaines retraites — pouvez-vous me prévenir dès qu'une date est ouverte ?",
  bilan:
    "Bonjour Céline, j'ai fait le bilan d'orientation et j'aimerais échanger avec vous sur le résultat.",
};
