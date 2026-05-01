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
 * CircleLinksSection v2 — disposition de cercle au sol, plus ancrée.
 *
 * Sprint E ajustement (le brief : "réduire le côté orbital / portail /
 * astrologique, plus humain et plus ancré").
 *
 * Avant : fond nuit profonde + étoiles + arc orbital → trop spatial.
 * Maintenant : palette papier sable, cercle posé au sol comme une
 * vraie disposition de constellation (vue plongeante), nœuds en
 * disposition organique avec un point central doré et des liens
 * subtils. Garde le schéma (bien d'illustrer), enlève le côté cosmique.
 */
export function CircleLinksSection({ eyebrow, title, intro, nodes }: Props) {
  const total = nodes.length;

  return (
    <section className="relative paper-sand py-18 md:py-24 overflow-hidden">
      <Container>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.4rem] leading-[1.15] tracking-tight text-text-deep">
            {title}
          </h2>
          {intro && (
            <p className="text-base md:text-lg leading-relaxed text-text-medium">
              {intro}
            </p>
          )}
        </motion.div>

        {/* Composition cercle au sol — vue plongeante, palette claire */}
        <div className="relative max-w-3xl mx-auto aspect-square md:aspect-[5/4] flex items-center justify-center">
          {/* Cercle au sol stylisé — ressemble à la disposition réelle
              d'une constellation (plusieurs anneaux dorés concentriques) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            aria-hidden
            className="absolute"
            style={{ width: "min(60%, 22rem)", height: "min(60%, 22rem)" }}
          >
            {/* Anneaux dorés concentriques (style mandala posé au sol) */}
            <div className="absolute inset-0 rounded-full border border-gold/25" />
            <div className="absolute inset-[12%] rounded-full border border-gold/20" />
            <div className="absolute inset-[26%] rounded-full border border-gold/15" />
            {/* Halo sable doré subtil */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(234,215,175,0.30)_0%,rgba(234,215,175,0.10)_55%,transparent_85%)]" />
            {/* Point central doré (le focus de la constellation) */}
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-gold-deep shadow-[0_0_10px_rgba(201,168,106,0.6)]" />
          </motion.div>

          {/* Nœuds disposés autour du cercle */}
          {nodes.map((node, i) => {
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            const radiusPct = 44;
            const left = 50 + Math.cos(angle) * radiusPct;
            const top = 50 + Math.sin(angle) * radiusPct;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[170px] md:max-w-[190px] text-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="inline-flex flex-col items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-deep mb-2" />
                  <p className="font-display-italic text-sm md:text-base text-gold-deep mb-1">
                    {node.label}
                  </p>
                  <p className="text-[0.72rem] md:text-xs leading-relaxed text-text-medium px-1">
                    {node.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 md:mt-12 text-center text-xs italic text-text-soft max-w-md mx-auto">
          Aucun thème n&apos;est imposé. C&apos;est ce qui appelle au moment
          de la séance qui se met en place.
        </p>
      </Container>
    </section>
  );
}
