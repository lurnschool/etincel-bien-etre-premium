"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisualAsset } from "./VisualAsset";

type SoftCarouselProps = {
  /** Liste d'identifiants visualAssetMap à faire défiler. */
  assetIds: string[];
  /** Durée d'affichage par image (en ms). Défaut : 6500. */
  intervalMs?: number;
  /** Durée du crossfade (en s). Défaut : 1.4. */
  fadeDurationS?: number;
  /** Ratio appliqué à toutes les images. Défaut : "4:5". */
  ratio?: "4:5" | "1:1" | "3:4" | "16:9" | "5:4" | "3:2";
  /** Légende optionnelle affichée sous le carrousel (en italique). */
  caption?: string;
  /** Classes du wrapper. */
  className?: string;
  /** Classes appliquées à chaque image. */
  imageClassName?: string;
  /** Désactive l'autoplay si l'utilisateur préfère réduire les animations. */
  respectReducedMotion?: boolean;
};

/**
 * SoftCarousel — carrousel doux et accessible.
 *
 * Caractéristiques :
 *  - crossfade lent (pas de slide brutal)
 *  - pause au hover desktop
 *  - pause si l'onglet n'est pas visible
 *  - boutons précédent/suivant accessibles + indicateurs cliquables
 *  - aria-roledescription="carousel" + aria-live="polite"
 *  - respect prefers-reduced-motion (autoplay désactivé)
 *  - swipe tactile horizontal
 *
 * Usage typique :
 *   <SoftCarousel
 *     assetIds={["home-univers-1", "home-univers-2", "home-univers-3"]}
 *     caption="Quelques fragments de mon univers"
 *   />
 */
export function SoftCarousel({
  assetIds,
  intervalMs = 6500,
  fadeDurationS = 1.4,
  ratio = "4:5",
  caption,
  className,
  imageClassName,
  respectReducedMotion = true,
}: SoftCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = assetIds.length;

  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const goTo = useCallback((i: number) => setIndex(i), []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (!respectReducedMotion) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [respectReducedMotion]);

  // Pause si l'onglet n'est pas visible
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused || reducedMotion || total <= 1) return;
    const timer = window.setTimeout(next, intervalMs);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion, next, intervalMs, total]);

  // Swipe tactile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <figure
      className={cn("relative w-full", className)}
      aria-roledescription="carousel"
      aria-label={caption ?? "Carrousel d'images"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full overflow-hidden rounded-[1.75rem] shadow-[0_18px_60px_rgba(31,26,46,0.12)]">
        <AnimatePresence mode="sync">
          <motion.div
            key={assetIds[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDurationS, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            aria-live="polite"
          >
            <VisualAsset
              id={assetIds[index]!}
              ratio={ratio}
              imageClassName={imageClassName}
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Contrôles précédent / suivant — visibles uniquement >md, tactile via swipe sur mobile */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Image précédente"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-bg-card/80 backdrop-blur-md border border-border-soft text-text-deep hover:bg-bg-card transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Image suivante"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-bg-card/80 backdrop-blur-md border border-border-soft text-text-deep hover:bg-bg-card transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Indicateurs cliquables */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {assetIds.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à l'image ${i + 1} sur ${total}`}
              aria-current={i === index}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === index
                  ? "w-8 bg-gold-deep"
                  : "w-3 bg-border-medium hover:bg-text-soft/60",
              )}
            />
          ))}
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 text-center font-display-italic text-sm text-text-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
