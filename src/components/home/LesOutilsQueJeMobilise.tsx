"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import { outilsMention } from "@/lib/data";

/**
 * "Les outils que j'utilise parfois" — Sprint A.
 *
 * Plus de grille de 8 cards comme sur l'ancien ToolsMobilized.
 * Une mention en prose courte, suivie d'une simple ligne de liens
 * texte vers les pages-outils. Les outils ne sont plus le sujet.
 */
export function LesOutilsQueJeMobilise() {
  return (
    <section className="relative paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10 text-center space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{outilsMention.eyebrow}</span>
          </div>

          <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.25] tracking-tight text-text-deep">
            {outilsMention.title}
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-2xl mx-auto">
            {outilsMention.body}
          </p>
        </motion.div>

        {/* Liens texte des outils — pas de cards */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-2 text-sm text-text-medium max-w-3xl mx-auto"
        >
          {outilsMention.tools.map((tool, i) => (
            <li key={tool.href} className="flex items-center gap-3">
              <Link
                href={tool.href}
                className="hover:text-accent transition-colors border-b border-transparent hover:border-gold pb-0.5"
              >
                {tool.label}
              </Link>
              {i < outilsMention.tools.length - 1 && (
                <span className="text-gold/50" aria-hidden>·</span>
              )}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
