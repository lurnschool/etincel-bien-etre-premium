"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { temoignages } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Témoignages style avis premium — extraits courts visibles,
 * lecture complète au clic dans un panneau. Format grille 3 cols
 * inspiré du site Stéphanie : chapter-num, hairline doré, citation
 * resserrée. Pas de cards massives.
 */
export function Temoignages() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-bg-deep text-text-on-dark py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="col-span-12 lg:col-span-1">
            <span className="block font-display-italic text-[0.85rem] tracking-[0.2em] text-gold-soft/70">
              § 05
            </span>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold flex items-center gap-3">
                <Etincelle size={11} />
                Avis & témoignages
              </span>
              <h2 className="font-display mt-6 text-balance text-[clamp(36px,6vw,84px)] leading-[0.96] tracking-[-0.02em] text-text-on-dark">
                Les mots de ceux qui ont{" "}
                <span className="font-display-italic text-gold-soft">
                  cheminé.
                </span>
              </h2>
            </motion.div>
          </div>
        </div>

        <ul className="grid grid-cols-12 gap-x-6 gap-y-12">
          {temoignages.map((t, i) => {
            const extract = t.quote.length > 140 ? t.quote.slice(0, 140) + "…" : t.quote;
            const hasMore = t.quote.length > 140;
            return (
              <motion.li
                key={t.fullName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <article className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-display-italic text-[0.85rem] tabular-nums text-gold-soft/70">
                      №{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gold/40" />
                  </div>
                  <blockquote className="font-display text-[1.35rem] leading-[1.35] text-text-on-dark/95 flex-1">
                    « {extract} »
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 flex-wrap">
                    <span className="font-display-italic text-base text-gold-soft">
                      {t.name}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-text-on-dark-soft/60">
                      Personne accompagnée
                    </span>
                  </figcaption>
                  {hasMore && (
                    <button
                      onClick={() => setOpenIdx(i)}
                      className="mt-4 self-start text-[0.78rem] text-gold-soft hover:text-gold transition-colors border-b border-gold-soft/40 hover:border-gold pb-0.5"
                    >
                      Lire le témoignage complet →
                    </button>
                  )}
                </article>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-[0.7rem] uppercase tracking-[0.36em] text-text-on-dark-soft/50 text-center"
        >
          Témoignages réels — autres avis disponibles sur demande
        </motion.p>
      </div>

      <AnimatePresence>
        {openIdx !== null && temoignages[openIdx] && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-bg-deep/80 backdrop-blur-sm"
              onClick={() => setOpenIdx(null)}
            />
            <motion.div
              role="dialog"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                "w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-bg-card text-text-deep p-8 md:p-12 shadow-[0_30px_80px_rgba(31,26,46,0.35)]",
              )}
            >
              <button
                onClick={() => setOpenIdx(null)}
                aria-label="Fermer"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg-soft text-text-medium hover:text-text-deep transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep mb-3 inline-block">
                Témoignage complet
              </span>
              <blockquote className="font-display-italic text-[1.7rem] md:text-[2rem] leading-[1.25] text-text-deep mt-2">
                « {temoignages[openIdx].quote} »
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border-soft flex items-center gap-3">
                <span className="font-display text-lg text-text-deep">
                  {temoignages[openIdx].name}
                </span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span className="text-[0.7rem] uppercase tracking-[0.24em] text-text-soft">
                  Personne accompagnée par Céline
                </span>
              </figcaption>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
