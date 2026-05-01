"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { VisualAsset } from "./VisualAsset";

type Props = {
  /** Liste d'identifiants visualAssetMap. 4 à 8 mini-photos. */
  assetIds: string[];
  /** Tonalité/thème — change la couleur du fond et des séparateurs. */
  tone?: "warm" | "sand" | "rose" | "sage" | "clay" | "night";
  /** Taille des vignettes. Défaut "md" (h-32). */
  size?: "sm" | "md" | "lg";
  /** Activer le défilement automatique horizontal lent. Défaut true. */
  autoScroll?: boolean;
  /** Légende discrète sous le strip. */
  caption?: string;
  /** Classe wrapper externe. */
  className?: string;
};

const TONE_BG: Record<NonNullable<Props["tone"]>, string> = {
  warm: "bg-bg-base",
  sand: "paper-sand",
  rose: "bg-rose-soft/40",
  sage: "bg-sage-soft/45",
  clay: "bg-[#f4d3c2]/45",
  night: "bg-[#2d2540]",
};

const TONE_BORDER: Record<NonNullable<Props["tone"]>, string> = {
  warm: "border-border-soft/60",
  sand: "border-border-soft/60",
  rose: "border-rose/40",
  sage: "border-sage/50",
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
 * Sprint C "pages-pièces" + ajustement Sprint D :
 *  - autoScroll par DÉFAUT (le brief : "cette bande pourrait défiler")
 *  - Centré horizontalement quand pas en autoScroll OU sur viewport large
 *  - Effet polaroid posé : rotations alternées, hover restaure et scale
 *  - Touch-friendly mobile (swipe natif)
 *  - Respect prefers-reduced-motion (autoScroll OFF)
 *  - 6 tons (warm, sand, rose, sage, clay, night)
 *  - 3 tailles (sm 96px, md 128px, lg 160px)
 *
 * Quand autoScroll est actif : on duplique la liste pour boucle infinie
 * en CSS (transform translateX, pas de JS).
 */
export function DetailStrip({
  assetIds,
  tone = "warm",
  size = "md",
  autoScroll = true,
  caption,
  className,
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (assetIds.length === 0) return null;

  const isAnimating = autoScroll && !reducedMotion;

  // En mode autoScroll on duplique pour boucle CSS
  const items = isAnimating ? [...assetIds, ...assetIds] : assetIds;

  return (
    <section
      className={cn(
        "relative w-full py-10 md:py-14 border-y overflow-hidden",
        TONE_BG[tone],
        TONE_BORDER[tone],
        className,
      )}
      aria-label={caption ?? "Fragments visuels"}
    >
      <div
        className={cn(
          "relative flex gap-5 md:gap-6 px-6 md:px-10",
          // Sans autoScroll : strip centré dans le viewport
          !isAnimating && "justify-center flex-wrap md:flex-nowrap overflow-x-auto",
          // Avec autoScroll : translation continue, pause au hover
          isAnimating && "animate-[detail-scroll_55s_linear_infinite] hover:[animation-play-state:paused] w-max",
        )}
        style={!isAnimating ? { scrollbarWidth: "none" } : undefined}
      >
        {items.map((id, i) => (
          <div
            key={`${id}-${i}`}
            className={cn(
              "shrink-0 overflow-hidden rounded-[0.9rem] shadow-[0_8px_22px_rgba(31,26,46,0.12)] ring-1",
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
          </div>
        ))}
      </div>
      {caption && (
        <p
          className={cn(
            "mt-5 text-center font-display-italic text-xs md:text-sm",
            tone === "night" ? "text-text-on-dark-soft" : "text-text-soft",
          )}
        >
          {caption}
        </p>
      )}

      <style jsx>{`
        @keyframes detail-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
