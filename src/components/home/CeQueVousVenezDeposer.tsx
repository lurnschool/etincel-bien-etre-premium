"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { ceQueVousVenezDeposer } from "@/lib/data";

/**
 * "Ce que vous pouvez venir déposer" — refondu en prose.
 * Sprint A : plus de grille numérotée 01-08 façon fiche d'évaluation.
 * À la place : trois paragraphes en colonne étroite, une porte
 * d'entrée émotionnelle douce. CTA discret en sortie naturelle.
 */
export function CeQueVousVenezDeposer() {
  return (
    <section className="relative paper-sand py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="space-y-6 text-center"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{ceQueVousVenezDeposer.eyebrow}</span>
          </div>

          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.15] tracking-tight text-text-deep max-w-2xl mx-auto">
            {ceQueVousVenezDeposer.title}
          </h2>
        </motion.div>

        <div className="mt-10 md:mt-12 space-y-5 text-left max-w-2xl mx-auto">
          {ceQueVousVenezDeposer.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="text-base md:text-lg leading-relaxed text-text-medium"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href={ceQueVousVenezDeposer.cta.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
          >
            {ceQueVousVenezDeposer.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
