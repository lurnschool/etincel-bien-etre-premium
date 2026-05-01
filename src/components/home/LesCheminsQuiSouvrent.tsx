"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { cheminsRefuge } from "@/lib/data";

/**
 * "Les chemins qui peuvent s'ouvrir" — refonte de CorePathwaysShowcase.
 *
 * Sprint A "refuge" :
 *  - Plus de "Axe № 01/02/03", plus de "§ 02", plus de chiffres romains
 *  - Plus de cards alignées en grille rigide 3 colonnes
 *  - À la place : 3 récits courts en alternance gauche/droite, avec
 *    photo posée en marge, écrits en "je" depuis le brief.
 *  - Lien texte "En savoir plus" plutôt qu'un gros bouton CTA produit.
 */
export function LesCheminsQuiSouvrent() {
  return (
    <section className="relative bg-bg-base py-16 md:py-22">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>Les chemins qui peuvent s&apos;ouvrir</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.15] tracking-tight text-text-deep">
            Trois manières d&apos;arriver chez moi.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            Vous n&apos;avez pas besoin de savoir avant de venir. Souvent,
            c&apos;est en parlant que l&apos;on comprend par où entrer.
          </p>
        </motion.div>

        {/* Trois récits en alternance */}
        <div className="space-y-20 md:space-y-28">
          {cheminsRefuge.map((chemin, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={chemin.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-10 md:gap-14 lg:grid-cols-12 items-center"
              >
                {/* Photo */}
                <div
                  className={`lg:col-span-5 ${
                    reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative max-w-sm mx-auto lg:max-w-none">
                    <div
                      aria-hidden
                      className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold-soft/30 via-rose-soft/25 to-transparent blur-xl -z-10"
                    />
                    <VisualAsset
                      id={chemin.visualId}
                      ratio="4:5"
                      className="rounded-[1.75rem] shadow-[0_14px_36px_rgba(31,26,46,0.10)]"
                      sizes="(max-width: 1024px) 80vw, 35vw"
                    />
                  </div>
                </div>

                {/* Texte */}
                <div
                  className={`lg:col-span-7 space-y-5 ${
                    reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep">
                    {chemin.eyebrow}
                  </p>
                  <h3 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.2] text-text-deep">
                    {chemin.title}
                  </h3>
                  <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium max-w-xl">
                    {chemin.body}
                  </p>
                  <Link
                    href={chemin.href}
                    className="group inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
                  >
                    {chemin.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
