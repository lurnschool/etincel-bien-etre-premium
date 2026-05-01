"use client";

import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const items = [
  "Une fatigue émotionnelle qui dure",
  "Un blocage qui se répète",
  "Une transition de vie inconfortable",
  "Un appel à revenir au corps",
  "Un appel du féminin",
  "Un trop-plein qui demande l'écoute",
  "Un schéma familial qui pèse",
  "Une envie de ralentir, de respirer",
];

/**
 * Section "Ce que vous pouvez venir déposer" — 2 colonnes, texte aérien,
 * pas de cards. Donne une porte d'entrée émotionnelle.
 */
export function WhatToDeposit() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-bg-base via-rose-soft/15 to-bg-base">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-gold-soft/25 blur-[140px]" />
        <div className="absolute -bottom-20 right-1/4 h-[26rem] w-[26rem] rounded-full bg-rose-soft/35 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-sage-soft/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-gold-deep">
            <Etincelle size={12} />
            <span>Ce que vous pouvez venir déposer</span>
          </div>
          <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep max-w-3xl mx-auto">
            Tout ce qui demande à être{" "}
            <span className="font-display-italic text-gold-deep">accueilli</span>{" "}
            sans être expliqué.
          </h2>
          <p className="text-text-medium leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Quel que soit votre point de départ, il y a un espace possible. Voici quelques entrées familières — vous pouvez en arriver avec d&apos;autres.
          </p>
        </motion.div>

        <ul className="grid gap-x-12 gap-y-3 sm:grid-cols-2 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="flex items-baseline gap-4 py-3 border-b border-border-soft/60"
            >
              <span className="font-display-italic text-gold-deep tabular-nums text-sm shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg md:text-xl text-text-deep leading-snug">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 rounded-full border border-border-medium px-7 py-3.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
          >
            Faire le diagnostic en 4 questions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
