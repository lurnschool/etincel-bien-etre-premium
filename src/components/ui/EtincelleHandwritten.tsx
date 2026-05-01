"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Le mot à afficher (string uniquement pour pouvoir splitter en lettres). */
  children: string;
  /** Taille — défaut "lg". */
  size?: "md" | "lg" | "xl";
  /** Délai avant le démarrage de l'animation (ms). Défaut 600. */
  delay?: number;
  /** Délai entre chaque lettre (ms). Défaut 90. */
  letterDelay?: number;
  /** Position de la petite étincelle dorée. Défaut "right-top". */
  sparklePosition?: "right-top" | "right-bottom" | "left-top" | "none";
  /** Forcer la police. Défaut "handwritten" (Caveat cursive). */
  font?: "handwritten" | "display";
  /** Re-trigger l'animation au hover (utile pour démo). Défaut true. */
  replayOnHover?: boolean;
  /** Afficher le halo doré qui tourne autour. Défaut true. */
  showOrbit?: boolean;
  className?: string;
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
};

/**
 * EtincelleHandwritten v4 — écriture lumineuse lettre par lettre.
 *
 * Comme si Céline écrivait à la plume de lumière :
 *  1. Le mot est splitté en lettres individuelles
 *  2. Chaque lettre apparaît cascade (90ms entre chaque) avec un
 *     mini-flash doré : commence brillante et floue, se condense en
 *     lettre dorée nette avec un petit halo qui reste
 *  3. Pendant l'écriture, un halo doré conic-gradient tourne autour
 *     du mot (style orbit-shine des boutons), s'estompe à la fin
 *  4. Une étincelle 4 branches flash à la fin
 *
 * Inspiré directement des stories Insta de Céline + de l'orbit-shine
 * doré qu'on utilise sur les CTA principaux.
 *
 * Animations CSS pures (motion-safe). Replay au hover par défaut.
 */
export function EtincelleHandwritten({
  children,
  size = "lg",
  delay = 600,
  letterDelay = 90,
  sparklePosition = "right-top",
  font = "handwritten",
  replayOnHover = true,
  showOrbit = true,
  className,
}: Props) {
  const [replayKey, setReplayKey] = useState(0);

  // Split en caractères, en convertissant les espaces en espaces insécables
  const letters = children.split("").map((c) => (c === " " ? " " : c));
  const totalDuration = delay + letters.length * letterDelay + 1100;
  const sparkleDelay = totalDuration - 600;

  const fontClass = font === "handwritten" ? "font-handwritten" : "font-display";

  // Replay au hover : on incrémente une key qui force React à re-mount
  // les spans (et donc à relancer les CSS animations)
  const handleMouseEnter = () => {
    if (replayOnHover) setReplayKey((k) => k + 1);
  };

  return (
    <span
      className={cn(
        "relative inline-flex items-baseline",
        replayOnHover && "cursor-default",
        className,
      )}
      onMouseEnter={handleMouseEnter}
    >
      {/* Halo doré qui tourne autour du mot — style orbit-shine.
          Conic-gradient masqué en radial pour faire un anneau lumineux
          qui rotate. Visible pendant l'écriture puis s'estompe. */}
      {showOrbit && (
        <span
          key={`orbit-${replayKey}`}
          aria-hidden
          className="motion-safe:absolute pointer-events-none -inset-x-6 -inset-y-3 motion-safe:opacity-0 motion-safe:animate-[orbit-fade_3s_ease-out_forwards]"
          style={{
            animationDelay: `${delay}ms`,
          }}
        >
          <span
            className="block w-full h-full motion-safe:animate-[orbit-rotate_4s_linear_infinite]"
            style={{
              background: `conic-gradient(
                from 0deg,
                transparent 0%,
                rgba(255, 240, 180, 0.45) 12%,
                rgba(255, 215, 130, 0.85) 18%,
                rgba(255, 240, 180, 0.45) 24%,
                transparent 36%,
                transparent 60%,
                rgba(255, 215, 130, 0.55) 70%,
                rgba(255, 240, 180, 0.30) 78%,
                transparent 90%,
                transparent 100%
              )`,
              maskImage:
                "radial-gradient(ellipse 90% 80% at center, transparent 50%, black 60%, black 95%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at center, transparent 50%, black 60%, black 95%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />
        </span>
      )}

      <span className="relative inline-block leading-[0.95]">
        {/* Lettres une par une — chacune apparaît avec un mini-flash doré */}
        <span className={cn(fontClass, SIZE[size], "inline-block")}>
          {letters.map((letter, i) => (
            <span
              key={`${replayKey}-${i}`}
              className="inline-block text-[#b88a3d] motion-safe:opacity-0 motion-safe:animate-[letter-light_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{
                animationDelay: `${delay + i * letterDelay}ms`,
                whiteSpace: "pre",
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>

      {sparklePosition !== "none" && (
        <SparkleIcon
          key={`sparkle-${replayKey}`}
          className={cn(
            "absolute opacity-0 motion-safe:animate-[etincelle-flash_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards] text-[#c9924a]",
            sparklePosition === "right-top" && "right-[-1.8rem] top-[-0.6rem] h-9 w-9",
            sparklePosition === "right-bottom" && "right-[-1.4rem] bottom-[-0.8rem] h-8 w-8",
            sparklePosition === "left-top" && "left-[-1.8rem] top-[-0.6rem] h-9 w-9",
          )}
          style={{ animationDelay: `${sparkleDelay}ms` }}
        />
      )}
    </span>
  );
}

/**
 * Étincelle 4 branches (style Insta de Céline).
 */
function SparkleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M 12 0 L 13.4 10.6 L 24 12 L 13.4 13.4 L 12 24 L 10.6 13.4 L 0 12 L 10.6 10.6 Z" />
      <circle cx="12" cy="12" r="1.4" fill="#fff0d5" opacity="0.9" />
    </svg>
  );
}
