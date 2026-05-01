"use client";

import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import { bienvenueEspace } from "@/lib/data";

/**
 * Section "Bienvenue dans mon espace" — premier moment d'incarnation.
 * Une seule colonne étroite, ton humain, en "je", sans card, sans grille.
 * Volontairement courte pour respirer après le hero.
 */
export function BienvenueEspace() {
  return (
    <section className="relative bg-gradient-to-b from-bg-base via-rose-soft/20 to-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10 text-center space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft"
        >
          <span className="text-gold-deep">
            <Etincelle size={11} />
          </span>
          <span>{bienvenueEspace.eyebrow}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.95, delay: 0.1 }}
          className="space-y-5"
        >
          {bienvenueEspace.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-display text-[1.5rem] md:text-[1.9rem] leading-[1.4] text-text-deep"
            >
              {p}
            </p>
          ))}
        </motion.div>

        {/* Petit filet doré, signe d'aération sans hairline industrielle */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
