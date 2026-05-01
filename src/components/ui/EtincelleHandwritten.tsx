"use client";

import { cn } from "@/lib/utils";

type Props = {
  /** Le mot à afficher en cursive dorée (ex: "Bienvenue"). */
  children: React.ReactNode;
  /** Taille — défaut "lg". */
  size?: "md" | "lg" | "xl";
  /** Délai avant le démarrage de l'animation (ms). Défaut 200. */
  delay?: number;
  /** Position de la petite étincelle dorée. Défaut "right-top". */
  sparklePosition?: "right-top" | "right-bottom" | "left-top" | "none";
  className?: string;
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
};

/**
 * EtincelleHandwritten — mot cursif doré qui se révèle à l'arrivée
 * sur la page, suivi d'un flash d'étincelle dorée juste à côté.
 *
 * Inspiré directement des stories Insta de Céline (etincel_debienetre) :
 *  - "Bienvenue" / "se rejoignent" / "rencontrent" en script doré chaud
 *  - Petite étincelle 4 branches qui scintille
 *  - Filet doré effilé sous le mot (signature de plume)
 *
 * Animations CSS pures (déclarées dans globals.css) :
 *  - etincelle-glow : tracé qui apparaît avec halo doré qui pulse
 *  - etincelle-flash : étincelle qui scintille avec glow
 *
 * Pas de Framer Motion (problème opacity:0 en static export).
 * Respect prefers-reduced-motion via media query.
 */
export function EtincelleHandwritten({
  children,
  size = "lg",
  delay = 200,
  sparklePosition = "right-top",
  className,
}: Props) {
  const delayStyle = { animationDelay: `${delay}ms` } as React.CSSProperties;
  const sparkleDelay = { animationDelay: `${delay + 700}ms` } as React.CSSProperties;

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      <span
        className={cn(
          "font-handwritten leading-[0.95] text-[#b88a3d] opacity-0",
          "motion-safe:animate-[etincelle-glow_1.2s_ease-out_forwards]",
          SIZE[size],
        )}
        style={delayStyle}
      >
        {/* Astuce : on superpose deux fades pour révéler progressivement */}
        <span
          className="inline-block opacity-0 motion-safe:animate-[fadeUp_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={delayStyle}
        >
          {children}
        </span>
      </span>

      {sparklePosition !== "none" && (
        <SparkleIcon
          className={cn(
            "absolute opacity-0 motion-safe:animate-[etincelle-flash_1.4s_cubic-bezier(0.22,1,0.36,1)_forwards] text-[#c9924a]",
            sparklePosition === "right-top" && "right-[-1.4rem] top-[-0.4rem] h-7 w-7",
            sparklePosition === "right-bottom" && "right-[-1rem] bottom-[-0.6rem] h-6 w-6",
            sparklePosition === "left-top" && "left-[-1.4rem] top-[-0.4rem] h-7 w-7",
          )}
          style={sparkleDelay}
        />
      )}

      {/* Filet doré effilé sous le mot, dessiné en SVG comme un trait de plume */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 -bottom-1 h-2 opacity-0 motion-safe:animate-[fadeUp_0.9s_ease-out_forwards]"
        style={{ animationDelay: `${delay + 900}ms` }}
      >
        <svg viewBox="0 0 200 8" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 4 4 Q 50 1 100 4 T 196 4"
            stroke="#b88a3d"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
        </svg>
      </span>
    </span>
  );
}

/**
 * Étincelle 4 branches (style Insta de Céline) — pas un sparkle
 * générique. Forme étoile à 4 pointes effilées avec un petit centre brillant.
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
      {/* 4 branches effilées */}
      <path d="M 12 0 L 13.4 10.6 L 24 12 L 13.4 13.4 L 12 24 L 10.6 13.4 L 0 12 L 10.6 10.6 Z" />
      {/* Centre brillant */}
      <circle cx="12" cy="12" r="1.4" fill="#fff0d5" opacity="0.9" />
    </svg>
  );
}
