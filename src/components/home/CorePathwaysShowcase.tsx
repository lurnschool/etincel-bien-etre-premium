"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { corePathways } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { SacredVisual } from "@/components/ornaments/SacredVisual";

/**
 * Triptyque éditorial des 3 axes structurants — Mémoires & constellations,
 * Féminin & cacao, Corps & intégration. Mise en scène premium :
 * grands chiffres romains, hairlines dorées, micro-interaction sur hover,
 * pas de cards banales empilées.
 */
export function CorePathwaysShowcase() {
  return (
    <section id="chemins" className="relative bg-bg-base py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 -left-40 h-[40rem] w-[40rem] rounded-full bg-gold-soft/20 blur-[180px]" />
        <div className="absolute bottom-0 -right-40 h-[40rem] w-[40rem] rounded-full bg-rose-soft/25 blur-[180px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="col-span-12 lg:col-span-1">
            <span className="block font-display-italic text-[0.85rem] tracking-[0.2em] text-gold-deep">
              § 02
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
                Trois chemins pour revenir à soi
              </span>
              <h2 className="font-display mt-6 text-balance text-[clamp(36px,6vw,84px)] leading-[0.96] tracking-[-0.02em] text-text-deep">
                Pas un catalogue. Trois{" "}
                <span className="font-display-italic text-gold-deep">portes profondes</span>.
              </h2>
              <p className="mt-7 text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
                Céline n&apos;empile pas les pratiques. Elle accompagne autour de trois axes — chacun mobilise ses propres outils, mais le travail reste global.
              </p>
            </motion.div>
          </div>
        </div>

        <ul className="grid grid-cols-12 gap-6 lg:gap-8">
          {corePathways.map((pathway, i) => (
            <motion.li
              key={pathway.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 md:col-span-6 lg:col-span-4 group"
            >
              <Link
                href={pathway.href}
                className="flex flex-col h-full rounded-[1.5rem] bg-bg-card border border-border-soft transition-all duration-700 hover:border-gold/60 hover:shadow-[0_30px_80px_rgba(31,26,46,0.12)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative aspect-[5/4] overflow-hidden shrink-0">
                  <SacredVisual
                    variant={pathway.fallback}
                    ratio="landscape"
                    className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-text-on-dark/85">
                    <span className="font-display-italic text-[0.85rem] tracking-[0.2em] backdrop-blur-sm bg-bg-deep/35 px-2.5 py-1 rounded-full">
                      Axe № {pathway.number}
                    </span>
                  </div>
                </div>

                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <h3 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.05] tracking-tight text-text-deep">
                    {pathway.name}
                  </h3>
                  <p className="font-display-italic text-lg text-gold-deep leading-snug mt-3">
                    {pathway.catchphrase}
                  </p>
                  <p className="text-text-medium leading-relaxed text-[0.93rem] mt-3">
                    {pathway.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-text-soft">
                    {pathway.tools.slice(0, 4).map((t) => (
                      <li key={t} className="border border-border-medium px-2.5 py-1 rounded-full">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-border-soft flex items-center justify-between">
                    <span className="font-display text-base text-text-deep group-hover:text-accent transition-colors">
                      {pathway.cta}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-text-soft transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-14 lg:mt-20 grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 lg:col-span-9 lg:col-start-3 flex items-center justify-between gap-4 border-t border-border-soft pt-6 flex-wrap">
            <p className="text-text-soft italic max-w-md text-[0.92rem] leading-relaxed">
              Pas sûre de votre axe ? Le bilan d&apos;orientation guide en 4 minutes — gratuit, avec PDF offert.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 font-display text-[0.95rem] text-accent hover:text-accent-deep border-b border-accent pb-1 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Faire mon bilan
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
