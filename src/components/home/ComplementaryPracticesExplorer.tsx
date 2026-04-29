"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { secondaryIntents } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Explorateur des pratiques secondaires — l'intention d'abord,
 * la pratique ensuite. Évite la grille de 12 cartes en proposant
 * un panneau latéral révélé au clic. Inspiré du style éditorial
 * magazine avec lignes divisées plutôt que cards.
 */
export function ComplementaryPracticesExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = secondaryIntents.find((i) => i.id === activeId);

  return (
    <section className="relative bg-bg-soft py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 lg:col-span-1">
            <span className="block font-display-italic text-[0.85rem] tracking-[0.2em] text-gold-deep">
              § 03
            </span>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Pratiques complémentaires
              </span>
              <h2 className="font-display mt-6 text-balance text-[clamp(36px,6vw,84px)] leading-[0.96] tracking-[-0.02em] text-text-deep">
                Et si vous suiviez{" "}
                <span className="font-display-italic text-gold-deep">
                  une intention&nbsp;?
                </span>
              </h2>
              <p className="mt-6 text-text-medium leading-relaxed text-base md:text-lg max-w-2xl">
                Au-delà des trois piliers, Céline propose un large éventail de pratiques. Choisissez l&apos;intention qui résonne — les pratiques associées s&apos;ouvrent à droite.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          {/* Liste des intentions */}
          <ul className="col-span-12 lg:col-span-5 space-y-px border-y border-text-deep/10 bg-text-deep/10">
            {secondaryIntents.map((intent, i) => {
              const isActive = activeId === intent.id;
              return (
                <li key={intent.id} className="bg-bg-soft">
                  <button
                    onClick={() => setActiveId(isActive ? null : intent.id)}
                    aria-expanded={isActive}
                    className={cn(
                      "group w-full text-left flex items-baseline gap-4 px-2 py-5 md:py-6 transition-colors cursor-pointer",
                      isActive
                        ? "text-accent-deep bg-bg-card/40"
                        : "text-text-deep hover:text-accent",
                    )}
                  >
                    <span className="font-display-italic text-[0.8rem] tabular-nums text-gold-deep shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="font-display text-xl md:text-[1.55rem] leading-tight block">
                        {intent.label}
                      </span>
                      <span className="font-display-italic text-sm text-text-soft block mt-1">
                        {intent.catchphrase}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 h-px transition-all duration-500",
                        isActive ? "w-12 bg-gold" : "w-4 bg-border-medium group-hover:w-8 group-hover:bg-accent",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panneau latéral des pratiques */}
          <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-10 space-y-8"
                >
                  <header className="flex items-start justify-between gap-4 pb-6 border-b border-border-soft">
                    <div className="space-y-2">
                      <span className="text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep">
                        Intention
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                        {active.label}
                      </h3>
                      <p className="font-display-italic text-lg text-gold-deep">
                        {active.catchphrase}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveId(null)}
                      aria-label="Fermer"
                      className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-border-medium text-text-soft hover:border-accent hover:text-accent transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </header>

                  <ul className="space-y-px">
                    {active.practices.map((p, i) => (
                      <motion.li
                        key={p.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                      >
                        <Link
                          href={p.href}
                          className="group flex items-center justify-between gap-4 py-4 border-b border-border-soft hover:bg-bg-soft/40 -mx-3 px-3 rounded-lg transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-xl text-text-deep group-hover:text-accent transition-colors leading-tight">
                              {p.name}
                            </p>
                            {p.format && (
                              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-text-soft mt-1.5">
                                {p.format}
                              </p>
                            )}
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-text-soft transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent shrink-0" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-border-soft flex flex-wrap gap-3">
                    <Link
                      href="/diagnostic"
                      className="text-sm text-text-medium hover:text-accent transition-colors"
                    >
                      Faire le diagnostic →
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm text-text-medium hover:text-accent transition-colors"
                    >
                      Échanger avec Céline →
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[2rem] border border-dashed border-border-medium bg-bg-card/40 p-10 md:p-14 text-center min-h-[24rem] flex flex-col items-center justify-center gap-4"
                >
                  <span className="text-gold-deep">
                    <Etincelle size={20} />
                  </span>
                  <p className="font-display-italic text-2xl text-text-medium leading-snug max-w-md">
                    Choisissez une intention.
                    <br />
                    Les pratiques s&apos;ouvrent ici.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
