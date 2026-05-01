"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, MessageCircle, BellRing } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { whatsappLink } from "@/lib/whatsapp";

export type DateEntry = {
  /** Date au format ISO ou texte court (ex: "Sam. 14 juin 2026"). */
  when: string;
  /** Lieu (ex: "Le Taillan-Médoc · Univers'elles"). */
  where?: string;
  /** Format / type (ex: "Cercle de femmes · 19h–22h"). */
  format?: string;
  /** Lien d'inscription (paiement, formulaire, etc.). */
  href?: string;
  /** Statut (places restantes, complet, etc.). */
  badge?: string;
};

type Props = {
  /** Eyebrow court (ex: "Prochaines cérémonies cacao"). */
  eyebrow: string;
  /** Titre éditorial (ex: "Les prochaines dates."). */
  title?: string;
  /** Liste des dates connues. Vide ou non fourni → mode "préparation". */
  dates?: ReadonlyArray<DateEntry>;
  /** Type d'événement, utilisé pour personnaliser les messages WhatsApp/email. */
  kind: "cacao" | "cercle" | "retraite" | "innerdance" | "autre";
  /** Texte CTA principal en mode préparation. Défaut "Recevoir les prochaines dates". */
  notifyLabel?: string;
};

const kindWording: Record<Props["kind"], { label: string; soft: string }> = {
  cacao:     { label: "cérémonie cacao", soft: "des prochaines cérémonies cacao" },
  cercle:    { label: "cercle de femmes", soft: "des prochains cercles" },
  retraite:  { label: "retraite", soft: "des prochaines retraites" },
  innerdance:{ label: "innerdance", soft: "des prochaines sessions d'innerdance" },
  autre:     { label: "rencontre", soft: "des prochaines dates" },
};

/**
 * ProchainesDates — Sprint H Lot E.
 *
 * Bloc "Prochaines dates" pour les pages cercle / cacao / retraites.
 * Deux modes selon la présence du tableau `dates` :
 *
 *  1. Mode "dates connues" — liste douce de cards (date + lieu + CTA),
 *     avec inscription possible si href fourni.
 *  2. Mode "préparation" (défaut) — bloc unique "Dates en préparation,
 *     laissez votre contact pour être prévenue", CTA contact + WhatsApp
 *     pré-rempli avec un message contextualisé selon kind.
 *
 * Donne du mouvement commercial même sans calendrier figé, et bascule
 * naturellement en mode liste dès que Céline pose des dates dans data.ts.
 */
export function ProchainesDates({
  eyebrow,
  title,
  dates,
  kind,
  notifyLabel = "Recevoir les prochaines dates",
}: Props) {
  const hasDates = dates && dates.length > 0;
  const wording = kindWording[kind];
  const waMessage = `Bonjour Céline, je souhaite être prévenue ${wording.soft} dès qu'une date est posée.`;
  const wa = whatsappLink(waMessage);
  const contactHref = `/contact?sujet=${encodeURIComponent(`Prochaines ${wording.label}`)}`;

  return (
    <section className="relative bg-bg-base py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.2] text-text-deep">
              {title ?? "Les prochaines dates."}
            </h2>
          </div>

          {hasDates ? (
            <ul className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dates.map((d, i) => (
                <li key={`${d.when}-${i}`}>
                  {d.href ? (
                    <Link
                      href={d.href}
                      className="group flex flex-col gap-2 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 hover:border-gold/60 hover:shadow-[0_8px_24px_rgba(201,168,106,0.12)] transition-all h-full"
                    >
                      <DateCardInner d={d} />
                      <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-accent-deep font-medium">
                        S&apos;inscrire
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 h-full">
                      <DateCardInner d={d} />
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-text-medium hover:text-accent transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Demander à Céline
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[1.5rem] bg-gradient-to-br from-bg-card via-rose-soft/10 to-gold-soft/15 border border-gold/25 p-7 md:p-9 text-center space-y-5 max-w-2xl mx-auto">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                <BellRing className="h-5 w-5" />
              </div>
              <p className="font-display text-lg md:text-xl text-text-deep leading-snug max-w-md mx-auto">
                Dates en préparation — laissez-moi votre contact pour être
                prévenue dès qu&apos;une date est posée.
              </p>
              <p className="text-sm text-text-medium leading-relaxed max-w-md mx-auto">
                Pas de calendrier figé : chaque {wording.label} s&apos;ouvre
                quand le moment est juste. Vous serez prévenue en priorité.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <ButtonHalo tone="mixed">
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                  >
                    <BellRing className="h-4 w-4" />
                    {notifyLabel}
                  </Link>
                </ButtonHalo>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-5 py-2.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Plutôt sur WhatsApp
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function DateCardInner({ d }: { d: DateEntry }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-text-soft">
          <Calendar className="h-3.5 w-3.5 text-gold-deep" />
          <span>{d.when}</span>
        </div>
        {d.badge && (
          <span className="inline-flex items-center rounded-full bg-gold-soft/40 px-2 py-0.5 text-[0.65rem] font-medium text-gold-deep">
            {d.badge}
          </span>
        )}
      </div>
      {d.format && (
        <p className="font-display text-base md:text-lg text-text-deep leading-snug">
          {d.format}
        </p>
      )}
      {d.where && (
        <p className="inline-flex items-center gap-1.5 text-[0.78rem] text-text-medium">
          <MapPin className="h-3 w-3 text-text-soft" />
          {d.where}
        </p>
      )}
    </>
  );
}
