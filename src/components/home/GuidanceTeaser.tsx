"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { guidanceDouce } from "@/lib/data";

/**
 * "Pas sûre par où commencer ?" — refonte du DiagnosticTeaser.
 *
 * Sprint A "refuge" :
 *  - Plus de "Bilan d'orientation Etincel" (vocabulaire RH/conseil).
 *  - Plus de "Faire le bilan d'orientation" en gros bouton agressif.
 *  - À la place : invitation douce + 2 CTA équivalents
 *    ("Me laisser guider" → /diagnostic, "Écrire à Céline" → WhatsApp).
 *  - Bloc plus petit, intégré entre 2 sections, pas en pleine largeur dramatique.
 */
export function GuidanceTeaser() {
  return (
    <section className="relative bg-bg-base py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[1.75rem] paper-sand border border-border-soft p-8 md:p-12 text-center space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{guidanceDouce.eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2rem] leading-[1.2] text-text-deep">
            {guidanceDouce.title}
          </h2>
          <p className="text-base leading-relaxed text-text-medium max-w-xl mx-auto">
            {guidanceDouce.body}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <ButtonHalo tone="mixed">
              <Link
                href={guidanceDouce.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                {guidanceDouce.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </ButtonHalo>
            <a
              href={guidanceDouce.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {guidanceDouce.secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
