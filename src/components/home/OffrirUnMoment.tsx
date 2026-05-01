"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { offrirUnMoment } from "@/lib/data";

/**
 * "Offrir un moment" — refonte du GiftCardStudioTeaser.
 * Sprint A : sortie du vocabulaire "Studio carte cadeau" (e-commerce).
 * À la place : une attention douce, photo posée à gauche, deux CTA :
 * "Préparer une attention" (page Stripe) + "Poser une question" (WhatsApp).
 */
export function OffrirUnMoment() {
  return (
    <section className="relative paper-sand py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95 }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-rose-soft/35 via-gold-soft/25 to-transparent blur-xl -z-10"
              />
              <VisualAsset
                id="home-offrir"
                ratio="4:5"
                className="rounded-[1.75rem] rotate-[-1.5deg] shadow-[0_14px_36px_rgba(31,26,46,0.10)]"
                sizes="(max-width: 1024px) 80vw, 35vw"
              />
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{offrirUnMoment.eyebrow}</span>
            </div>
            <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep max-w-xl">
              {offrirUnMoment.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
              {offrirUnMoment.body}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={offrirUnMoment.primaryCta.href}
                className="soft-glow group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                {offrirUnMoment.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={offrirUnMoment.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {offrirUnMoment.secondaryCta.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
