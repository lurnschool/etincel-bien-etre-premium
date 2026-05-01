"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Etincelle } from "@/components/ui/Etincelle";
import { asset } from "@/lib/assets";
import { bienvenueEspace } from "@/lib/data";

/**
 * Section "Bienvenue dans mon espace" — premier moment d'incarnation.
 *
 * Sprint E : densifié — ajout d'une mini photo (Céline avec son tambour)
 * en marge gauche du texte, posée comme un polaroid avec rotation douce.
 * Donne immédiatement de l'incarnation à la section, plus que du texte
 * suspendu dans du beige.
 */
export function BienvenueEspace() {
  return (
    <section className="relative bg-gradient-to-b from-bg-base via-rose-soft/20 to-bg-base py-16 md:py-22">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-10 md:gap-14 md:grid-cols-[auto_1fr] items-center">
          {/* Mini photo posée comme un polaroid en marge */}
          <motion.div
            initial={{ opacity: 0, y: 14, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto md:mx-0 w-44 md:w-52 lg:w-56 shrink-0"
          >
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-rose-soft/45 via-gold-soft/30 to-transparent blur-xl -z-10"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] shadow-[0_12px_30px_rgba(31,26,46,0.15)] ring-1 ring-bg-base/40">
              <Image
                src={asset("/images/source-site-original/portrait-celine.png")}
                alt="Céline Dusseval — accueil dans son espace"
                fill
                sizes="(max-width: 768px) 176px, 220px"
                className="object-cover object-[center_top]"
              />
            </div>
          </motion.div>

          {/* Texte + eyebrow */}
          <div className="space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9 }}
              className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft"
            >
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{bienvenueEspace.eyebrow}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.95, delay: 0.1 }}
              className="space-y-5"
            >
              {bienvenueEspace.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-display text-[1.35rem] md:text-[1.65rem] leading-[1.4] text-text-deep"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Petit filet doré */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="h-px w-16 bg-gradient-to-r from-gold/70 via-gold to-transparent origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
