"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";

type Fragment = {
  /** ID dans visualAssetMap pour la mini-photo. */
  visualId?: string;
  /** Titre court (style "page de carnet"). */
  title: string;
  /** Texte court en italique. */
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 4 à 6 fragments de carnet. */
  fragments: readonly Fragment[];
};

const ROTATIONS = ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]", "rotate-[-1.5deg]", "rotate-[1deg]"];

/**
 * RefugeNotebookSection — fragments style carnet intime.
 *
 * Sprint C "pages-pièces" — pour /a-propos notamment.
 * Mosaïque asymétrique de fragments : chacun a une mini-photo
 * (style polaroid avec rotation) + un titre court + une phrase
 * en italique. L'ensemble donne une sensation de carnet personnel
 * plutôt qu'une grille marketing.
 */
export function RefugeNotebookSection({ eyebrow, title, intro, fragments }: Props) {
  return (
    <section className="relative paper-warm py-18 md:py-24 overflow-hidden">
      <Container>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep"><Etincelle size={11} /></span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            {title}
          </h2>
          {intro && (
            <p className="text-base md:text-lg leading-relaxed text-text-medium">
              {intro}
            </p>
          )}
        </motion.div>

        {/* Grille asymétrique de fragments */}
        <ul className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {fragments.map((frag, i) => (
            <motion.li
              key={frag.title + i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${ROTATIONS[i % ROTATIONS.length]} hover:rotate-0 transition-transform duration-500 ${i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-6"}`}
            >
              <article className="space-y-3">
                {frag.visualId && (
                  <div className="relative w-full aspect-[5/4] overflow-hidden rounded-[0.85rem] shadow-[0_10px_28px_rgba(31,26,46,0.10)] ring-1 ring-bg-base/40">
                    <VisualAsset id={frag.visualId} fill sizes="(max-width: 768px) 90vw, 30vw" />
                  </div>
                )}
                <div className="px-2 space-y-1">
                  <h3 className="font-display text-lg md:text-xl text-text-deep leading-tight">
                    {frag.title}
                  </h3>
                  <p className="font-display-italic text-sm md:text-[0.95rem] leading-relaxed text-text-medium">
                    {frag.body}
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
