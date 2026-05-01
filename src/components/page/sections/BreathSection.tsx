"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Phase = {
  label: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 3 temps : inspirer / traverser / intégrer. */
  phases: readonly Phase[];
};

/**
 * BreathSection — section avec animation de respiration subtile.
 *
 * Sprint C "pages-pièces" — pour /corps-integration et /innerdance.
 * Un cercle central qui pulse doucement (6 secondes par cycle) sert
 * de centre visuel ; les 3 phases sont disposées autour. Atmosphère
 * d'eau / sauge / souffle.
 *
 * Respect prefers-reduced-motion : si activé, le cercle reste statique.
 */
export function BreathSection({ eyebrow, title, intro, phases }: Props) {
  return (
    <section className="relative bg-gradient-to-b from-bg-base via-sage-soft/30 to-sage-soft/10 py-18 md:py-24 overflow-hidden">
      {/* Vagues douces en fond — animées en flottement très subtil */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-50">
        <svg
          className="absolute inset-0 w-full h-full motion-safe:animate-[float_12s_ease-in-out_infinite]"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
        >
          <path
            d="M 0 200 Q 200 160 400 200 T 800 200"
            stroke="rgba(156,176,148,0.35)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 280 Q 220 240 440 280 T 800 280"
            stroke="rgba(156,176,148,0.30)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 350 Q 240 310 480 350 T 800 350"
            stroke="rgba(156,176,148,0.25)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <Container>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#5e7359]">
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

        {/* Cercle pulsant + 3 phases */}
        <div className="relative max-w-5xl mx-auto">
          {/* Cercle central qui respire — animations CSS multicouches.
              Sprint F : amélioration premium (3 anneaux indépendants qui
              respirent à des rythmes différents, point central qui pulse). */}
          <div className="flex justify-center mb-12 md:mb-16">
            <div
              aria-hidden
              className="relative h-40 w-40 md:h-56 md:w-56"
            >
              {/* Halo radial principal qui respire (8s) */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(156,176,148,0.45)_0%,rgba(156,176,148,0.10)_60%,rgba(156,176,148,0)_100%)] motion-safe:animate-[breathe_8s_ease-in-out_infinite]" />
              {/* Anneau extérieur — respire 6s */}
              <div className="absolute inset-[10%] rounded-full ring-1 ring-sage/45 motion-safe:animate-[ring-breath_6s_ease-in-out_infinite]" />
              {/* Anneau intermédiaire — respire 5s, décalé */}
              <div
                className="absolute inset-[24%] rounded-full ring-1 ring-sage/35 motion-safe:animate-[ring-breath_5s_ease-in-out_infinite]"
                style={{ animationDelay: "0.6s" }}
              />
              {/* Anneau intérieur — respire 4s, encore décalé */}
              <div
                className="absolute inset-[40%] rounded-full ring-1 ring-sage/25 motion-safe:animate-[ring-breath_4s_ease-in-out_infinite]"
                style={{ animationDelay: "1.2s" }}
              />
              {/* Point central — pulse subtil */}
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-sage motion-safe:animate-[center-pulse_3.5s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* 3 phases en grille douce */}
          <ul className="grid gap-6 md:gap-8 md:grid-cols-3">
            {phases.map((phase, i) => (
              <motion.li
                key={phase.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="text-center space-y-3"
              >
                <p className="font-display-italic text-base md:text-lg text-[#5e7359] tracking-wide">
                  {phase.label}
                </p>
                <div aria-hidden className="mx-auto h-px w-10 bg-sage/40" />
                <p className="text-sm md:text-[0.95rem] leading-relaxed text-text-medium max-w-xs mx-auto">
                  {phase.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: scale(0.92); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
