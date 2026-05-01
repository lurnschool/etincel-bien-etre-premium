"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VisualAsset } from "./VisualAsset";

type Props = {
  /** Liste d'identifiants visualAssetMap. 4 à 8 mini-photos. */
  assetIds: string[];
  /** Tonalité/thème — change la couleur du fond et des séparateurs. */
  tone?: "warm" | "sand" | "rose" | "sage" | "clay" | "night";
  /** Taille des vignettes. Défaut "md" (h-32). */
  size?: "sm" | "md" | "lg";
  /** Activer le défilement automatique horizontal lent. Défaut false. */
  autoScroll?: boolean;
  /** Légende discrète sous le strip. */
  caption?: string;
  /** Classe wrapper externe. */
  className?: string;
};

const TONE_BG: Record<NonNullable<Props["tone"]>, string> = {
  warm: "bg-bg-base",
  sand: "paper-sand",
  rose: "bg-rose-soft/30",
  sage: "bg-sage-soft/40",
  clay: "bg-[#f4d3c2]/40",
  night: "bg-[#2d2540]",
};

const TONE_BORDER: Record<NonNullable<Props["tone"]>, string> = {
  warm: "border-border-soft/60",
  sand: "border-border-soft/60",
  rose: "border-rose/30",
  sage: "border-sage/40",
  clay: "border-[#a06548]/30",
  night: "border-white/15",
};

const SIZE_HEIGHT: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-24 w-24",
  md: "h-32 w-32",
  lg: "h-40 w-40",
};

const ROTATIONS = [
  "rotate-[-2deg]",
  "rotate-[1.5deg]",
  "rotate-[-1deg]",
  "rotate-[2.5deg]",
  "rotate-[-2.2deg]",
  "rotate-[1.2deg]",
  "rotate-[-0.8deg]",
  "rotate-[2deg]",
];

/**
 * DetailStrip — strip horizontal de mini-photos posées comme des souvenirs.
 *
 * Sprint C "pages-pièces" : permet d'ajouter de la personnalité visuelle
 * entre 2 sections sans imposer un grand carrousel. Petites vignettes
 * carrées avec rotation aléatoire douce (effet polaroid posé).
 *
 * Usage typique :
 *   <DetailStrip assetIds={["a-propos-detail-1", "a-propos-detail-2", ...]} tone="warm" />
 *
 * Caractéristiques :
 *  - Strip scrollable horizontalement (overflow-x-auto avec snap).
 *  - Chaque vignette ~96-160 px, ratio carré, rotation alternée.
 *  - Pas d'animation lourde — juste un fade-in subtil au mount.
 *  - Mode autoScroll optionnel : translateX très lent en boucle CSS.
 *  - Touch-friendly mobile (swipe natif).
 */
export function DetailStrip({
  assetIds,
  tone = "warm",
  size = "md",
  autoScroll = false,
  caption,
  className,
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (assetIds.length === 0) return null;

  // En mode autoScroll, on duplique la liste pour effet boucle infinie
  const items = autoScroll && !reducedMotion ? [...assetIds, ...assetIds] : assetIds;

  return (
    <section
      className={cn("relative w-full py-10 md:py-14 border-y", TONE_BG[tone], TONE_BORDER[tone], className)}
      aria-label={caption ?? "Fragments visuels"}
    >
      <div
        ref={scrollRef}
        className={cn(
          "relative flex gap-5 md:gap-6 px-6 md:px-10 overflow-x-auto scroll-smooth snap-x snap-mandatory",
          autoScroll && !reducedMotion && "animate-[detail-scroll_45s_linear_infinite] [animation-play-state:running] hover:[animation-play-state:paused]",
        )}
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((id, i) => (
          <motion.div
            key={`${id}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: (i % assetIds.length) * 0.05 }}
            className={cn(
              "shrink-0 snap-start overflow-hidden rounded-[0.9rem] shadow-[0_8px_22px_rgba(31,26,46,0.12)] ring-1",
              tone === "night" ? "ring-white/10" : "ring-bg-base/40",
              SIZE_HEIGHT[size],
              ROTATIONS[i % ROTATIONS.length],
              "transition-transform duration-500 hover:rotate-0 hover:scale-105",
            )}
          >
            <VisualAsset
              id={id}
              ratio="1:1"
              sizes={size === "sm" ? "96px" : size === "lg" ? "160px" : "128px"}
            />
          </motion.div>
        ))}
      </div>
      {caption && (
        <p className={cn(
          "mt-5 text-center font-display-italic text-xs md:text-sm",
          tone === "night" ? "text-text-on-dark-soft" : "text-text-soft",
        )}>
          {caption}
        </p>
      )}

      <style jsx>{`
        @keyframes detail-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
