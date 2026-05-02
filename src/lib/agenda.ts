import type { DateEntry } from "@/components/page/ProchainesDates";

/**
 * AGENDA — prochaines dates Céline.
 *
 * Édité par Céline (ou en son nom) pour ajouter, modifier ou retirer
 * les prochaines dates affichées sur le site.
 *
 * Comment ajouter une date :
 *   1. Identifier le `kind` correct (cacao / cercle / retraite / innerdance / autre)
 *   2. Renseigner :
 *      - when    : date affichable (ex: "Sam. 14 juin 2026 · 19h–22h")
 *      - where   : lieu (ex: "Le Taillan-Médoc · Univers'elles")
 *      - format  : type d'événement (ex: "Cercle de femmes mensuel")
 *      - href    : lien d'inscription (Stripe Checkout, formulaire, etc.) ou laisser vide
 *      - badge   : optionnel (ex: "Complet", "3 places", "Ouverture")
 *   3. Ajouter dans le bon tableau ci-dessous, en gardant l'ordre chronologique.
 *
 * Pour passer en mode "Dates en préparation" sur une catégorie :
 *   → laisser le tableau vide (le composant ProchainesDates bascule auto).
 *
 * Connexion future à Google Calendar :
 *   → on pourra remplacer ce fichier par un fetch côté serveur de
 *   l'API Google Calendar (via une route /api/agenda) et garder la
 *   même structure DateEntry. Aucun composant à modifier.
 */

export const cacaoDates: ReadonlyArray<DateEntry> = [
  // Exemples — à remplacer par les vraies dates de Céline
  // {
  //   when: "Sam. 14 juin 2026 · 19h–22h",
  //   where: "Le Taillan-Médoc · Univers'elles",
  //   format: "Cérémonie cacao · cercle de femmes",
  //   badge: "8 places",
  // },
];

export const cercleDates: ReadonlyArray<DateEntry> = [
  // À renseigner par Céline
];

export const retraiteDates: ReadonlyArray<DateEntry> = [
  // À renseigner par Céline
];

export const innerdanceDates: ReadonlyArray<DateEntry> = [
  // À renseigner par Céline
];

export const constellationDates: ReadonlyArray<DateEntry> = [
  // À renseigner par Céline
];

export const evenementsDates: ReadonlyArray<DateEntry> = [
  // À renseigner par Céline (toutes catégories confondues si besoin)
];
