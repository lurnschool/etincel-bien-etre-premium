"use client";

import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import { temoignages } from "@/lib/data";

/**
 * Témoignages en mode magazine — pas de cards.
 * Citations grandes en serif italique, séparées par des filets dorés.
 */
export function Temoignages() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-[36rem] w-[36rem] rounded-full bg-rose-soft/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-[36rem] w-[36rem] rounded-full bg-gold-soft/40 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-gold-deep">
            <Etincelle size={12} />
            <span>Retours d&apos;expérience</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep max-w-3xl mx-auto">
            Les mots de ceux qui ont{" "}
            <span className="font-display-italic text-gold-deep">cheminé</span>.
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.fullName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-3xl ${
                i % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0 md:text-right"
              }`}
            >
              <div
                className={`flex items-center gap-3 text-gold mb-4 ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                <span className="text-2xl font-display-italic text-gold-deep">«</span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
              </div>
              <blockquote className="font-display-italic text-balance text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.2] text-text-deep">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="font-display text-text-deep">{t.name}</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span className="text-text-soft uppercase tracking-[0.2em] text-xs">
                  Personne accompagnée
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center text-xs uppercase tracking-[0.32em] text-text-soft"
        >
          Témoignages réels — autres avis sur demande
        </motion.p>
      </div>
    </section>
  );
}
