"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { cerclesEtRetraites } from "@/lib/data";

/**
 * "Cercles, cacao, retraites" — invitation douce à la dimension collective.
 * Sprint A : 3 cartes-souvenirs douces, pas de grille de produits.
 * Chaque carte = un format collectif avec son CTA propre (cercle, cacao, retraite).
 */
export function CerclesEtRetraites() {
  return (
    <section className="relative bg-bg-base py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Intro avec image retraite en bandeau doux */}
        <div className="grid gap-10 md:gap-14 lg:grid-cols-12 items-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{cerclesEtRetraites.eyebrow}</span>
            </div>
            <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
              {cerclesEtRetraites.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
              {cerclesEtRetraites.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sage-soft/40 via-gold-soft/25 to-transparent blur-xl -z-10"
              />
              <VisualAsset
                id="home-retraites"
                ratio="16:9"
                className="rounded-[1.5rem] shadow-[0_14px_36px_rgba(31,26,46,0.10)]"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        {/* 3 cartes douces */}
        <ul className="grid gap-6 md:gap-8 md:grid-cols-3">
          {cerclesEtRetraites.cards.map((card, i) => (
            <motion.li
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: i * 0.1 }}
              className="group flex flex-col rounded-[1.5rem] bg-bg-card border border-border-soft p-7 md:p-8 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500"
            >
              <h3 className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-text-medium flex-1">
                {card.body}
              </p>
              <Link
                href={card.cta.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
              >
                {card.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
