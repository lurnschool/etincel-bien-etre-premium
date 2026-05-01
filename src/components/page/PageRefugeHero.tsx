"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { cn } from "@/lib/utils";

type CtaConfig = {
  label: string;
  href: string;
};

type Props = {
  /** Petit chapeau (uppercase espacé). */
  eyebrow: string;
  /** Phrase d'introduction italique courte (optionnelle). */
  greeting?: string;
  /** Titre principal (peut contenir du JSX, italique). */
  title: React.ReactNode;
  /** Texte d'accompagnement court (1-2 lignes). */
  body?: React.ReactNode;
  /** CTA principal doux. */
  primaryCta?: CtaConfig;
  /** CTA secondaire (souvent WhatsApp ou contact). */
  secondaryCta?: CtaConfig;
  /** ID de visual dans visualAssetMap pour la photo posée à droite. */
  visualId?: string;
  /** Tonalité de fond — défaut 'paper-warm'. */
  background?: "paper-warm" | "paper-sand" | "bg-base";
  /** Permet de marquer ce hero comme attente d'une voix Céline. */
  contentStatus?: "ok" | "waiting-celine-voice" | "waiting-final-copy";
};

const BG_CLASS: Record<NonNullable<Props["background"]>, string> = {
  "paper-warm": "paper-warm",
  "paper-sand": "paper-sand",
  "bg-base": "bg-bg-base",
};

/**
 * PageRefugeHero — hero refuge réutilisable pour les pages internes.
 *
 * Sprint B "refuge connecté".
 *  - Pas de halo violet pulsé, pas de gradient dramatique.
 *  - Optionnel : photo posée à droite (VisualAsset).
 *  - 0, 1 ou 2 CTA doux — jamais d'orbit-shine pulsant.
 *  - Padding plus petit que PageHeader pour ne pas dominer la page.
 *
 * Le composant `data-content-status` permet de tracer ce qui attend
 * encore la voix de Céline sans le rendre visible côté visiteur.
 */
export function PageRefugeHero({
  eyebrow,
  greeting,
  title,
  body,
  primaryCta,
  secondaryCta,
  visualId,
  background = "paper-warm",
  contentStatus = "ok",
}: Props) {
  return (
    <section
      data-content-status={contentStatus}
      className={cn(
        "relative w-full overflow-hidden pt-[68px] md:pt-[68px]",
        BG_CLASS[background],
      )}
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20 lg:py-24">
        <div
          className={cn(
            "grid gap-12 items-center",
            visualId ? "lg:grid-cols-12 lg:gap-16" : "max-w-3xl",
          )}
        >
          {/* Colonne texte. NOTE: `whileInView` plutôt que `animate`
              pour fiabilité en static export GitHub Pages. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "space-y-6",
              visualId && "lg:col-span-7 lg:order-1 order-2",
            )}
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{eyebrow}</span>
            </div>

            <div className="space-y-3">
              {greeting && (
                <p className="font-display-italic text-xl md:text-2xl text-gold-deep leading-tight">
                  {greeting}
                </p>
              )}
              <h1 className="font-display text-balance text-[2.2rem] sm:text-4xl lg:text-[3.2rem] leading-[1.08] tracking-tight text-text-deep">
                {title}
              </h1>
            </div>

            {body && (
              <div className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
                {body}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="soft-glow group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Colonne photo optionnelle */}
          {visualId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-5 lg:order-2 order-1"
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-rose-soft/35 via-gold-soft/25 to-transparent blur-xl -z-10"
                />
                <VisualAsset
                  id={visualId}
                  ratio="4:5"
                  priority
                  className="rounded-[1.75rem] shadow-[0_14px_40px_rgba(31,26,46,0.10)]"
                  sizes="(max-width: 1024px) 80vw, 35vw"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
