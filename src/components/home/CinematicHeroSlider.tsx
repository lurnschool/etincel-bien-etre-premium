"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides, practicesMarquee, type HeroSlide } from "@/lib/data";
import { Etincelle } from "@/components/ui/Etincelle";
import {
  AnkhSymbol,
  CacaoCup,
  FeminineSun,
  LotusOrnament,
  MandalaOrnament,
  MoonPhases,
  ShamanicDrum,
} from "@/components/ornaments/SacredOrnaments";

const SLIDE_DURATION_MS = 8000;

type PaletteConfig = {
  bg: string;
  halo: string;
  tone: "light" | "dark";
  primaryOrnament: React.ReactNode;
  accentOrnament: React.ReactNode;
};

const palettes: Record<HeroSlide["palette"], PaletteConfig> = {
  amethyst: {
    bg: "from-[#1d1530] via-[#2a1f44] to-[#3a2358]",
    halo: "from-accent/40 via-rose/15 to-gold/10",
    tone: "dark",
    primaryOrnament: <FeminineSun size={420} strokeWidth={0.5} className="text-gold/30" />,
    accentOrnament: <AnkhSymbol size={120} strokeWidth={0.7} className="text-gold-soft/50" />,
  },
  "rose-gold": {
    bg: "from-[#f7e6dc] via-[#f1d9d4] to-[#fbe9c7]",
    halo: "from-rose/30 via-gold/20 to-bg-base",
    tone: "light",
    primaryOrnament: <LotusOrnament size={360} strokeWidth={0.6} className="text-gold-deep/25" />,
    accentOrnament: <ShamanicDrum size={130} strokeWidth={0.7} className="text-gold-deep/35" />,
  },
  "deep-night": {
    bg: "from-[#15102a] via-[#241a3f] to-[#0f0a1f]",
    halo: "from-gold/20 via-accent-deep/40 to-transparent",
    tone: "dark",
    primaryOrnament: <MandalaOrnament size={520} strokeWidth={0.4} className="text-gold/30" />,
    accentOrnament: <MoonPhases size={220} strokeWidth={0.6} className="text-gold-soft/45" />,
  },
  "rose-velvet": {
    bg: "from-[#3a1f3d] via-[#4a2742] to-[#2a1232]",
    halo: "from-rose/25 via-gold/15 to-accent/20",
    tone: "dark",
    primaryOrnament: <AnkhSymbol size={220} strokeWidth={0.7} className="text-gold/40" />,
    accentOrnament: <FeminineSun size={140} strokeWidth={0.6} className="text-gold-soft/40" />,
  },
  "gold-warm": {
    bg: "from-[#f3e1c0] via-[#e9cf9d] to-[#fbf2dc]",
    halo: "from-gold/40 via-rose-soft/30 to-bg-base",
    tone: "light",
    primaryOrnament: <FeminineSun size={360} strokeWidth={0.6} className="text-gold-deep/25" />,
    accentOrnament: <CacaoCup size={120} strokeWidth={0.8} className="text-gold-deep/35" />,
  },
  cacao: {
    bg: "from-[#3d2a1f] via-[#2d1f15] to-[#1a120b]",
    halo: "from-gold/25 via-rose/15 to-transparent",
    tone: "dark",
    primaryOrnament: <CacaoCup size={320} strokeWidth={0.7} className="text-gold/40" />,
    accentOrnament: <AnkhSymbol size={150} strokeWidth={0.7} className="text-gold-soft/45" />,
  },
};

/**
 * Hero cinématique — slider pleine largeur avec photos réelles
 * en arrière-plan (Ken Burns + parallax doux). Auto-play 8s,
 * transitions fade lentes, indicateurs progress.
 */
export function CinematicHeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), []);
  const prev = () => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(next, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, next]);

  const slide = heroSlides[index];
  const palette = palettes[slide.palette];
  const isDark = palette.tone === "dark";
  const hasImage = !!slide.image;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Présentation des univers d'Etincel"
    >
      <div className="relative w-full h-[88vh] md:h-[88vh] lg:h-[92vh] min-h-[640px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Photo réelle en arrière-plan + Ken Burns subtil */}
            {hasImage && slide.image && (
              <motion.div
                key={`img-${slide.id}`}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 9, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={cn(
                    "object-cover",
                    slide.imagePosition ?? "object-center",
                  )}
                />
                {/* Overlay pour lisibilité */}
                {isDark ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/80 via-bg-deep/40 to-transparent md:from-bg-deep/70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-deep/60" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-base/90 via-bg-base/60 to-transparent md:from-bg-base/80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base/40" />
                  </>
                )}
              </motion.div>
            )}

            {/* Si pas de photo : fallback gradient + ornements */}
            {!hasImage && (
              <>
                <div className={cn("absolute inset-0 bg-gradient-to-br", palette.bg)} />
                <div className={cn("absolute -top-32 -left-32 h-[44rem] w-[44rem] rounded-full blur-[160px] bg-gradient-to-br", palette.halo)} />
                <div className={cn("absolute -bottom-40 -right-40 h-[44rem] w-[44rem] rounded-full blur-[180px] bg-gradient-to-tl", palette.halo)} />
                <motion.div
                  className="absolute right-[-4rem] md:right-[2%] top-1/2 -translate-y-1/2 hidden md:block"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 360, repeat: Infinity, ease: "linear" }}
                  aria-hidden
                >
                  {palette.primaryOrnament}
                </motion.div>
                <motion.div
                  className="absolute right-[14%] top-[18%] hidden lg:block"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  {palette.accentOrnament}
                </motion.div>
              </>
            )}

            <div className="absolute inset-0 grain opacity-30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-10 flex items-end pb-28 md:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-6"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.36em]",
                  isDark ? "text-gold-soft" : "text-gold-deep",
                )}
              >
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>{slide.category}</span>
              </div>

              <h1
                className={cn(
                  "font-display text-balance text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[1.02] tracking-tight",
                  isDark ? "text-text-on-dark" : "text-text-deep",
                )}
              >
                {slide.title}
              </h1>

              <p
                className={cn(
                  "text-base md:text-lg leading-relaxed max-w-xl",
                  isDark ? "text-text-on-dark-soft" : "text-text-medium",
                )}
              >
                {slide.text}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={slide.primaryCta.href}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-400",
                    isDark
                      ? "bg-gold text-text-deep hover:bg-gold-soft hover:-translate-y-0.5"
                      : "bg-accent-deep text-text-on-dark hover:bg-accent hover:-translate-y-0.5",
                  )}
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={slide.secondaryCta.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors",
                    isDark
                      ? "border-white/30 text-text-on-dark hover:border-gold hover:text-gold"
                      : "border-text-deep/20 text-text-deep hover:border-accent hover:text-accent",
                  )}
                >
                  {slide.secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Aller au slide ${i + 1} : ${s.category}`}
                className="group/dot relative h-1 rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                style={{ width: i === index ? 56 : 28 }}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full transition-colors",
                    isDark
                      ? "bg-white/30 group-hover/dot:bg-white/50"
                      : "bg-text-deep/20 group-hover/dot:bg-text-deep/40",
                  )}
                />
                {i === index && (
                  <motion.span
                    key={`progress-${slide.id}-${index}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: paused ? 0 : SLIDE_DURATION_MS / 1000,
                      ease: "linear",
                    }}
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      isDark ? "bg-gold" : "bg-accent-deep",
                    )}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Slide précédent"
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border backdrop-blur-sm transition-colors",
                isDark
                  ? "border-white/25 bg-white/5 text-text-on-dark hover:border-gold hover:text-gold"
                  : "border-text-deep/20 bg-bg-base/40 text-text-deep hover:border-accent hover:text-accent",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Slide suivant"
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border backdrop-blur-sm transition-colors",
                isDark
                  ? "border-white/25 bg-white/5 text-text-on-dark hover:border-gold hover:text-gold"
                  : "border-text-deep/20 bg-bg-base/40 text-text-deep hover:border-accent hover:text-accent",
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <PracticesMarquee />
    </section>
  );
}

/**
 * Bande défilante des pratiques — éditoriale, infinie, douce.
 */
function PracticesMarquee() {
  const items = [...practicesMarquee, ...practicesMarquee];
  return (
    <div className="relative w-full overflow-hidden border-y border-border-soft/40 bg-bg-base/80 backdrop-blur">
      <div className="flex gap-12 py-4 whitespace-nowrap animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 text-[0.85rem] tracking-[0.18em] uppercase text-text-soft/80 font-medium shrink-0"
          >
            {item}
            <span className="text-gold/60" aria-hidden>·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
