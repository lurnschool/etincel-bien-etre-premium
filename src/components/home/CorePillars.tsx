"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { SacredVisual } from "@/components/ornaments/SacredVisual";
import { corePillars } from "@/lib/data";
import { asset } from "@/lib/assets";

/**
 * Les 3 piliers — Cacao · Constellations · Numérologie
 * Format triptyque éditorial : numéros de chapitre, ligne séparatrice,
 * grand titre en serif, image ou fallback artistique. Inspiré du
 * style éditorial magazine — pas une grille de cards.
 */
export function CorePillars() {
  return (
    <section className="relative bg-bg-base py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        {/* En-tête éditorial */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
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
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Les trois piliers
              </span>
              <h2 className="font-display mt-6 text-balance text-[clamp(40px,7vw,108px)] leading-[0.94] tracking-[-0.02em] text-text-deep">
                Trois portes d&apos;entrée,
                <br />
                <span className="font-display-italic text-gold-deep">
                  un même retour à soi.
                </span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Triptyque éditorial */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px border-y border-text-deep/10 bg-text-deep/10">
          {corePillars.map((pillar, i) => (
            <motion.li
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg-base"
            >
              <Link
                href={pillar.href}
                className="group flex h-full flex-col p-8 md:p-10 transition-colors hover:bg-bg-soft/40"
              >
                {/* Image / fallback artistique */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-8">
                  {pillar.image ? (
                    <Image
                      src={asset(pillar.image)}
                      alt={pillar.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                      <SacredVisual
                        variant={pillar.fallback}
                        ratio="portrait"
                        className="rounded-[1.5rem] !aspect-auto !h-full"
                      />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-text-on-dark/80">
                    <span className="font-display-italic text-[0.8rem] tracking-[0.2em] backdrop-blur-sm bg-bg-deep/30 px-2.5 py-1 rounded-full">
                      № {pillar.number}
                    </span>
                  </div>
                </div>

                {/* Texte éditorial */}
                <div className="flex-1 flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep mb-3">
                    Pilier {pillar.number}
                  </span>
                  <h3 className="font-display text-[clamp(28px,3.5vw,44px)] leading-[1.02] tracking-tight text-text-deep">
                    {pillar.name}
                  </h3>
                  <p className="font-display-italic text-xl text-gold-deep mt-3 leading-snug">
                    {pillar.catchphrase}
                  </p>
                  <p className="mt-5 text-text-medium leading-relaxed text-[0.95rem]">
                    {pillar.description}
                  </p>

                  {/* Outils mobilisés */}
                  <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-text-soft">
                    {pillar.tools.slice(0, 3).map((f) => (
                      <li key={f} className="border border-border-medium px-2.5 py-1">
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-border-soft flex items-center justify-between">
                    <span className="font-display text-base text-text-deep group-hover:text-accent transition-colors">
                      {pillar.cta}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-text-soft transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Pied de section */}
        <div className="mt-12 grid grid-cols-12 gap-6 text-[0.78rem]">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3 flex items-center justify-between gap-4 border-t border-border-soft pt-6">
            <p className="text-text-soft italic max-w-md">
              Les autres pratiques de Céline restent accessibles via la boussole et l&apos;explorateur ci-dessous.
            </p>
            <Link
              href="/diagnostic"
              className="text-text-deep hover:text-accent transition-colors flex items-center gap-1.5 shrink-0"
            >
              Faire le diagnostic
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
