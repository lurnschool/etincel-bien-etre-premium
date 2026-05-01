"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Step = {
  label: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 3 temps narratifs : entrer / déposer / partager (par exemple). */
  steps: readonly Step[];
};

/**
 * RitualStepsSection — narration en 3 temps pour une cérémonie / rituel.
 *
 * Sprint C "pages-pièces" — pour /cacao notamment.
 * Pas une grille de cards alignées : trois moments rituels présentés
 * comme une partition verticale, avec un fil doré conducteur entre eux
 * (style notation musicale). Palette terre cuite chaude.
 *
 * Usage typique pour un rituel cacao :
 *   1. Entrer (poser l'intention)
 *   2. Déposer (recevoir le cacao, écouter)
 *   3. Partager (reformer le lien au monde)
 */
export function RitualStepsSection({ eyebrow, title, intro, steps }: Props) {
  return (
    <section className="relative paper-warm py-24 md:py-32 overflow-hidden">
      {/* Halo doux chaud en fond */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#f4d3c2]/35 via-[#fff0d5]/25 to-transparent blur-[120px]" />
      </div>

      <Container>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#7a4630]">
            <span className="text-[#a04a32]"><Etincelle size={11} /></span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-[#3a2418]">
            {title}
          </h2>
          {intro && (
            <p className="text-base md:text-lg leading-relaxed text-[#5e3a28]">
              {intro}
            </p>
          )}
        </motion.div>

        {/* 3 temps en partition verticale */}
        <div className="relative max-w-3xl mx-auto">
          {/* Fil doré vertical qui relie les 3 temps */}
          <div
            aria-hidden
            className="absolute left-[1.6rem] md:left-12 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#a04a32]/35 to-transparent"
          />

          <ol className="space-y-12 md:space-y-16 relative">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 md:pl-28"
              >
                {/* Marqueur sur le fil doré */}
                <div
                  aria-hidden
                  className="absolute left-0 md:left-7 top-1.5 flex items-center justify-center"
                >
                  <span className="absolute h-10 w-10 md:h-12 md:w-12 rounded-full bg-[radial-gradient(circle,rgba(255,217,162,0.45)_0%,rgba(255,217,162,0)_70%)] blur-md" />
                  <span className="relative flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#fff0d5] to-[#caa093] text-[#7a4630] font-display-italic text-base md:text-lg ring-1 ring-[#a04a32]/30 shadow-[0_4px_12px_rgba(74,30,12,0.18)]">
                    {step.label}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl md:text-3xl text-[#3a2418] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-[1.05rem] leading-relaxed text-[#5e3a28]">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
