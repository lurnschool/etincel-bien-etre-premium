"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Flower,
  HeartPulse,
  Wind,
  Gift,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";

type Porte = {
  /** Phrase courte commençant par "Je..." (ce que la visiteuse vient chercher). */
  intent: string;
  /** Vers où on l'envoie. */
  href: string;
  /** Étiquette du CTA (court). */
  ctaLabel: string;
  /** Icône Lucide cohérente avec l'axe. */
  icon: LucideIcon;
  /** Couleur d'accent au hover. */
  accent: "gold" | "rose" | "sage" | "violet";
};

const PORTES: Porte[] = [
  {
    intent: "Je porte une histoire familiale, une mémoire qui me dépasse.",
    href: "/memoires-constellations",
    ctaLabel: "Mémoires & constellations",
    icon: Compass,
    accent: "violet",
  },
  {
    intent: "Je veux revenir au corps, au cœur, au féminin.",
    href: "/feminin-cacao",
    ctaLabel: "Féminin & cacao",
    icon: Flower,
    accent: "rose",
  },
  {
    intent: "Je veux intégrer par le souffle et le mouvement.",
    href: "/corps-integration",
    ctaLabel: "Corps & intégration",
    icon: Wind,
    accent: "sage",
  },
  {
    intent: "Je veux offrir un moment à quelqu'un que j'aime.",
    href: "/cartes-cadeaux",
    ctaLabel: "Préparer une carte",
    icon: Gift,
    accent: "gold",
  },
  {
    intent: "Je ne sais pas encore. Je préfère me laisser guider.",
    href: "/diagnostic",
    ctaLabel: "Me laisser guider",
    icon: HeartPulse,
    accent: "violet",
  },
];

const ACCENT_CLASSES: Record<Porte["accent"], { hover: string; bg: string; ring: string; text: string }> = {
  gold:   { hover: "hover:border-gold/60 hover:shadow-[0_10px_28px_rgba(201,168,106,0.16)]", bg: "bg-gold-soft/40", ring: "", text: "text-gold-deep" },
  rose:   { hover: "hover:border-rose/60 hover:shadow-[0_10px_28px_rgba(224,179,174,0.18)]", bg: "bg-rose-soft/50", ring: "", text: "text-[#a86058]" },
  sage:   { hover: "hover:border-sage/70 hover:shadow-[0_10px_28px_rgba(182,194,168,0.20)]", bg: "bg-sage-soft/55", ring: "", text: "text-[#5a7250]" },
  violet: { hover: "hover:border-accent/60 hover:shadow-[0_10px_28px_rgba(122,96,154,0.16)]", bg: "bg-accent-soft/30", ring: "", text: "text-accent-deep" },
};

/**
 * VousVenezPour — Sprint I Lot 4.
 *
 * Section de guidage commercial de l'accueil :
 * "Quelle porte ouvrir aujourd'hui ?"
 *
 * 5 portes courtes (en "je") qui mappent l'intention de la visiteuse
 * vers le bon endroit du site :
 *  - Mémoires & constellations
 *  - Féminin & cacao
 *  - Corps & intégration
 *  - Offrir une carte
 *  - Me laisser guider (diagnostic)
 *
 * Pas un quiz RH, pas une grille catalogue — des phrases sensibles
 * qui aident à se reconnaître. Reste cohérent avec le ton refuge.
 *
 * Positionné entre CeQueVousVenezDeposer (prose émotionnelle) et
 * LesCheminsQuiSouvrent (récit éditorial long sur les 3 axes).
 */
export function VousVenezPour() {
  return (
    <section className="relative bg-bg-base py-16 md:py-22">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>Quelle porte ouvrir aujourd&apos;hui&nbsp;?</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            Vous venez pour…
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            Plusieurs portes, un même refuge. Choisissez celle qui vous parle —
            ou laissez-vous guider.
          </p>
        </motion.div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PORTES.map((p, i) => {
            const acc = ACCENT_CLASSES[p.accent];
            const Icon = p.icon;
            return (
              <motion.div
                key={p.intent}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.08 }}
              >
                <Link
                  href={p.href}
                  className={`group flex h-full flex-col gap-3 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 transition-all ${acc.hover}`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${acc.bg} ${acc.text}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-display text-[1.05rem] md:text-[1.1rem] leading-snug text-text-deep">
                    {p.intent}
                  </p>
                  <span className={`mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] font-medium ${acc.text}`}>
                    {p.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-text-soft italic">
          Toujours possible aussi : écrire directement à Céline, sur WhatsApp ou par email.
        </p>
      </div>
    </section>
  );
}
