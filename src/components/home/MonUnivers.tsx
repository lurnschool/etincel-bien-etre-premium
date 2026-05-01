"use client";

import { motion } from "framer-motion";
import { Etincelle } from "@/components/ui/Etincelle";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { monUniversCarousel } from "@/lib/data";

/**
 * "Mon univers" — carrousel doux des fragments du refuge.
 * Sprint A : nouveau composant, premier carrousel SoftCarousel
 * sur la home. Mix images du site original + placeholders propres,
 * destinés à être remplacés au fil des livraisons photo.
 */
export function MonUnivers() {
  return (
    <section className="relative bg-bg-base py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{monUniversCarousel.eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            {monUniversCarousel.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            {monUniversCarousel.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <SoftCarousel
            assetIds={[...monUniversCarousel.assetIds]}
            ratio="4:5"
            intervalMs={6500}
            caption={monUniversCarousel.caption}
          />
        </motion.div>
      </div>
    </section>
  );
}
