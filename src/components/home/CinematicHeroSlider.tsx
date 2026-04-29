"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides, practicesMarquee, type HeroSlide } from "@/lib/data";
import { Etincelle } from "@/components/ui/Etincelle";

const SLIDE_DURATION_MS = 8000;

const palettes: Record<HeroSlide["palette"], { bg: string; halo: string; tone: "light" | "dark" }> = {
  amethyst: {
    bg: "from-[#1d1530] via-[#2a1f44] to-[#3a2358]",
    halo: "from-accent/40 via-rose/15 to-gold/10",
    tone: "dark",
  },
  "rose-gold": {
    bg: "from-[#f7e6dc] via-[#f1d9d4] to-[#fbe9c7]",
    halo: "from-rose/30 via-gold/20 to-bg-base",
    tone: "light",
  },
  "deep-night": {
    bg: "from-[#15102a] via-[#241a3f] to-[#0f0a1f]",
    halo: "from-gold/20 via-accent-deep/40 to-transparent",
    tone: "dark",
  },
  "rose-velvet": {
    bg: "from-[#3a1f3d] via-[#4a2742] to-[#2a1232]",
    halo: "from-rose/25 via-gold/15 to-accent/20",
    tone: "dark",
  },
  "gold-warm": {
    bg: "from-[#f3e1c0] via-[#e9cf9d] to-[#fbf2dc]",
    halo: "from-gold/40 via-rose-soft/30 to-bg-base",
    tone: "light",
  },
};

/**
 * Hero cinématique pleine largeur — 5 slides éditoriales.
 * Auto-play 8s, transition douce, indicateurs discrets, swipe mobile.
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

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Présentation des univers d'Etincel"
    >
      <div className="relative w-full h-[78vh] md:h-[78vh] lg:h-[82vh] min-h-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute inset-0 bg-gradient-to-br", palette.bg)}
          >
            <div className={cn("absolute -top-32 -left-32 h-[44rem] w-[44rem] rounded-full blur-[160px] bg-gradient-to-br", palette.halo)} />
            <div className={cn("absolute -bottom-40 -right-40 h-[44rem] w-[44rem] rounded-full blur-[180px] bg-gradient-to-tl", palette.halo)} />
            <div className="absolute inset-0 grain opacity-50" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-10 flex items-end pb-24 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${slide.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-8 max-w-3xl space-y-6"
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
                      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-400",
                      isDark
                        ? "bg-gold text-text-deep hover:bg-gold-soft hover:-translate-y-0.5"
                        : "bg-accent-deep text-text-on-dark hover:bg-accent hover:-translate-y-0.5",
                    )}
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors",
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
                    isDark ? "bg-white/30 group-hover/dot:bg-white/50" : "bg-text-deep/20 group-hover/dot:bg-text-deep/40",
                  )}
                />
                {i === index && (
                  <motion.span
                    key={`progress-${slide.id}-${index}`}
                    initial={{ width: 0 }}
                    animate={{ width: paused ? "100%" : "100%" }}
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
                "h-9 w-9 rounded-full flex items-center justify-center border transition-colors",
                isDark
                  ? "border-white/25 text-text-on-dark hover:border-gold hover:text-gold"
                  : "border-text-deep/20 text-text-deep hover:border-accent hover:text-accent",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Slide suivant"
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center border transition-colors",
                isDark
                  ? "border-white/25 text-text-on-dark hover:border-gold hover:text-gold"
                  : "border-text-deep/20 text-text-deep hover:border-accent hover:text-accent",
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <PracticesMarquee inline />
    </section>
  );
}

/**
 * Bande défilante des pratiques — éditoriale, infinie, douce.
 */
function PracticesMarquee({ inline = false }: { inline?: boolean }) {
  const items = [...practicesMarquee, ...practicesMarquee];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-border-soft/40 bg-bg-base/80 backdrop-blur",
        inline && "border-t border-b-0",
      )}
    >
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
