"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { heroRefuge } from "@/lib/data";

/**
 * Hero refuge — statique, calme, incarné.
 * Sprint A : remplace l'ancien CinematicHeroSlider (5 slides + Ken Burns
 * + marquee 32s). Ici : une photo de Céline, une phrase d'accueil simple,
 * deux CTA doux. Aucun ornement, aucun halo blur, aucune numérotation.
 *
 * "Le site doit être un refuge qui sait guider, pas une vitrine qui expose,
 *  ni un tunnel qui force."
 */
export function HeroRefuge() {
  return (
    <section
      className="relative w-full paper-warm overflow-hidden pt-[68px] md:pt-[68px]"
      aria-labelledby="hero-refuge-title"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:order-1 order-2 space-y-7"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{heroRefuge.eyebrow}</span>
            </div>

            <div className="space-y-3">
              <p className="font-display-italic text-2xl md:text-3xl text-gold-deep leading-tight">
                {heroRefuge.greeting}
              </p>
              <h1
                id="hero-refuge-title"
                className="font-display text-balance text-[2.4rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep"
              >
                {heroRefuge.title}
              </h1>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
              {heroRefuge.body}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={heroRefuge.primaryCta.href}
                className="soft-glow group inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                {heroRefuge.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={heroRefuge.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-7 py-3.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                {heroRefuge.secondaryCta.label}
              </Link>
            </div>
          </motion.div>

          {/* Colonne photo — Céline en présence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-5 lg:order-2 order-1 relative"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Halo très doux derrière la photo */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-rose-soft/40 via-gold-soft/30 to-transparent blur-2xl -z-10"
              />
              <VisualAsset
                id="home-hero-celine"
                priority
                ratio="4:5"
                className="rounded-[2rem] shadow-[0_18px_50px_rgba(31,26,46,0.14)]"
                sizes="(max-width: 1024px) 80vw, 35vw"
              />
              {/* Petite photo posée comme un souvenir, en marge */}
              <div className="absolute -bottom-6 -left-6 hidden md:block w-32 lg:w-40 rotate-[-3deg] shadow-[0_12px_30px_rgba(31,26,46,0.18)] rounded-[1rem] overflow-hidden ring-1 ring-bg-base/50">
                <VisualAsset
                  id="home-bienvenue-detail"
                  ratio="1:1"
                  sizes="160px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
