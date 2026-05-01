"use client";

import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import { temoignages, retoursDexperience } from "@/lib/data";

/**
 * "Retours d'expérience" — refonte de l'ancien Temoignages.
 *
 * Sprint A "refuge" :
 *  - Plus de fond noir profond avec § 05 et chiffres romains.
 *  - Plus de grille rigide alignée façon avis Trustpilot.
 *  - À la place : 3 cartes-souvenirs sur papier crème, légèrement
 *    décalées, avec une rotation douce comme posées à la main.
 *  - Verbatim conservé tel quel — aucune reformulation.
 */
export function RetoursDexperience() {
  const rotations = ["rotate-[-1.2deg]", "rotate-[0.8deg]", "rotate-[-0.6deg]"];

  return (
    <section className="relative paper-warm py-16 md:py-22 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{retoursDexperience.eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            {retoursDexperience.title}
          </h2>
          <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
            {retoursDexperience.body}
          </p>
        </motion.div>

        <ul className="grid gap-8 md:gap-10 md:grid-cols-3">
          {temoignages.map((t, i) => (
            <motion.li
              key={t.fullName}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${rotations[i % rotations.length]} hover:rotate-0 transition-transform duration-500`}
            >
              <article className="h-full flex flex-col rounded-[1.25rem] bg-bg-card border border-border-soft p-7 md:p-8 shadow-[0_10px_30px_rgba(31,26,46,0.08)]">
                <span
                  aria-hidden
                  className="font-display-italic text-3xl text-gold-deep/40 leading-none"
                >
                  &ldquo;
                </span>
                <blockquote className="font-display text-[1.1rem] md:text-[1.18rem] leading-[1.45] text-text-deep flex-1 mt-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-border-soft/60 flex items-center gap-2.5">
                  <span className="text-gold-deep">
                    <Etincelle size={9} />
                  </span>
                  <span className="font-display-italic text-[0.95rem] text-text-deep">
                    {t.name}
                  </span>
                </figcaption>
              </article>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft text-center"
        >
          Témoignages réels — d&apos;autres viendront avec le temps
        </motion.p>
      </div>
    </section>
  );
}
