"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, MessageCircle } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

type Props = {
  /** Phrase d'invitation (sensible, pas commerciale). */
  intro: string;
  /** Texte du CTA principal. Défaut "Offrir ce moment". */
  ctaLabel?: string;
  /** Cible du CTA. Défaut /cartes-cadeaux. */
  ctaHref?: string;
  /** Message WhatsApp pré-rempli pour la question. */
  whatsappMessage?: string;
};

/**
 * OfferStrip — bande "Offrir" légère (Sprint H).
 *
 * À insérer sur les pages-axes (féminin, cacao, retraites, etc.) en
 * complément du GuidanceFooter pour rappeler la porte cadeau.
 * Ne remplace pas la section OffrirUnMoment de l'accueil — c'est une
 * mention contextuelle plus discrète, qui s'intègre dans le fil de page.
 *
 * Design : bande horizontale sobre, fond crème, 1 CTA halo + 1 lien WhatsApp.
 * Reste dans l'esprit refuge (douceur, pas de pression commerciale).
 */
export function OfferStrip({
  intro,
  ctaLabel = "Offrir ce moment",
  ctaHref = "/cartes-cadeaux",
  whatsappMessage = whatsappMessages.generic,
}: Props) {
  const wa = whatsappLink(whatsappMessage);
  return (
    <section className="relative bg-bg-base py-12 md:py-14">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85 }}
          className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 rounded-[1.5rem] border border-gold/25 bg-gradient-to-br from-bg-card via-bg-card to-rose-soft/15 px-6 md:px-9 py-6 md:py-7 shadow-[0_8px_32px_rgba(31,26,46,0.05)]"
        >
          <div className="flex items-start gap-4 max-w-2xl">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
              <Gift className="h-4 w-4" />
            </span>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={9} />
                </span>
                <span>Offrir un moment</span>
              </div>
              <p className="text-[0.95rem] md:text-base leading-relaxed text-text-deep">
                {intro}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ButtonHalo tone="gold">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-2.5 text-[0.82rem] font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                <Gift className="h-3.5 w-3.5" />
                {ctaLabel}
              </Link>
            </ButtonHalo>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.82rem] font-medium text-text-medium hover:text-accent transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Une question
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
