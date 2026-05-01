"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Node = {
  label: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 5 à 7 thèmes qui peuvent émerger en constellation. */
  nodes: readonly Node[];
};

/**
 * CircleLinksSection — composition visuelle douce d'un cercle de liens.
 *
 * Sprint C "pages-pièces" — pour /memoires-constellations et /constellations.
 * Représente les "thèmes qui peuvent émerger" en disposition autour
 * d'un cercle central, avec lignes connectrices subtiles.
 *
 * Pas de cards alignées en grille — composition visuelle qui rappelle
 * la disposition au sol d'une constellation.
 */
export function CircleLinksSection({ eyebrow, title, intro, nodes }: Props) {
  // Calcul des positions angulaires autour du cercle central
  const total = nodes.length;

  return (
    <section className="relative bg-bg-deep text-text-on-dark py-24 md:py-32 overflow-hidden">
      {/* Étoiles d'arrière-plan très discrètes */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-[12%] left-[18%] h-1 w-1 rounded-full bg-gold-soft" />
        <div className="absolute top-[28%] right-[24%] h-0.5 w-0.5 rounded-full bg-gold-soft" />
        <div className="absolute bottom-[22%] left-[32%] h-1 w-1 rounded-full bg-gold-soft" />
        <div className="absolute bottom-[15%] right-[18%] h-0.5 w-0.5 rounded-full bg-gold-soft" />
        <div className="absolute top-[55%] left-[8%] h-0.5 w-0.5 rounded-full bg-gold-soft" />
        <div className="absolute top-[65%] right-[8%] h-1 w-1 rounded-full bg-gold-soft" />
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
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft">
            <Etincelle size={11} />
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-on-dark">
            {title}
          </h2>
          {intro && (
            <p className="text-base md:text-lg leading-relaxed text-text-on-dark-soft">
              {intro}
            </p>
          )}
        </motion.div>

        {/* Composition cercle + nœuds */}
        <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[5/4] flex items-center justify-center">
          {/* Cercle central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            aria-hidden
            className="absolute"
            style={{ width: "min(50%, 18rem)", height: "min(50%, 18rem)" }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(234,215,175,0.12)_0%,rgba(234,215,175,0.04)_55%,rgba(234,215,175,0)_100%)]" />
            <div className="absolute inset-[15%] rounded-full ring-1 ring-gold/20" />
            <div className="absolute inset-[28%] rounded-full ring-1 ring-gold/15" />
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gold/70 shadow-[0_0_12px_rgba(201,168,106,0.6)]" />
          </motion.div>

          {/* Nœuds disposés en arc */}
          {nodes.map((node, i) => {
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            const radiusPct = 42; // % du parent
            const left = 50 + Math.cos(angle) * radiusPct;
            const top = 50 + Math.sin(angle) * radiusPct;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[180px] md:max-w-[200px] text-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="inline-flex flex-col items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/80 shadow-[0_0_8px_rgba(201,168,106,0.5)] mb-2.5" />
                  <p className="font-display-italic text-sm md:text-base text-gold-soft mb-1">
                    {node.label}
                  </p>
                  <p className="text-[0.72rem] md:text-xs leading-relaxed text-text-on-dark-soft/85 px-1">
                    {node.body}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Lignes connectrices très discrètes (SVG en overlay) */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {nodes.map((_, i) => {
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              const r = 42;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="rgba(201,168,106,0.18)"
                  strokeWidth="0.15"
                  strokeDasharray="0.6 1.2"
                />
              );
            })}
          </svg>
        </div>
      </Container>
    </section>
  );
}
