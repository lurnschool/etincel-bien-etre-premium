"use client";

import { cn } from "@/lib/utils";

type Props = {
  /** Le mot à afficher (ex: "Bienvenue"). */
  children: React.ReactNode;
  /** Taille — défaut "lg". */
  size?: "md" | "lg" | "xl";
  /** Délai avant le démarrage de l'animation (ms). Défaut 200. */
  delay?: number;
  /** Position de la petite étincelle dorée. Défaut "right-top". */
  sparklePosition?: "right-top" | "right-bottom" | "left-top" | "none";
  /** Forcer la police : "handwritten" (Caveat cursive) ou "display" (Cormorant). Défaut handwritten. */
  font?: "handwritten" | "display";
  className?: string;
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
};

/**
 * EtincelleHandwritten v2 — texte révélé par une **tête de lumière dorée**
 * qui se déplace de gauche à droite, comme une plume lumineuse qui trace
 * le mot. Inspiré directement des stories Insta de Céline.
 *
 * Sprint D ajustement (l'effet précédent était juste un fade-up sans tracé).
 *
 * Composition :
 *  1. Le texte cursif doré est masqué par un clip-path qui se rétracte
 *     de gauche à droite (animation 1.6s).
 *  2. Une tête de lumière dorée flouée se déplace en synchro, donnant
 *     l'illusion d'une plume qui écrit.
 *  3. Une étincelle 4 branches flash à la fin du tracé.
 *  4. Un filet doré se dessine sous le mot après le tracé.
 *  5. Le mot reste affiché avec un glow doré statique.
 *
 * Animations CSS pures (pas Framer). Respect prefers-reduced-motion :
 * en mode reduce, le texte apparaît directement sans animation.
 */
export function EtincelleHandwritten({
  children,
  size = "lg",
  delay = 200,
  sparklePosition = "right-top",
  font = "handwritten",
  className,
}: Props) {
  const traceDuration = 1600; // ms — durée du tracé lumineux
  const sparkleDelay = delay + traceDuration - 200;
  const underlineDelay = delay + traceDuration - 400;

  const fontClass = font === "handwritten" ? "font-handwritten" : "font-display";

  return (
    <span className={cn("relative inline-flex items-baseline whitespace-nowrap", className)}>
      <span className="relative inline-block leading-[0.95]">
        {/* Le texte doré, révélé par clip-path animé */}
        <span
          className={cn(
            fontClass,
            SIZE[size],
            "inline-block text-[#b88a3d]",
            "motion-safe:[clip-path:inset(-30%_100%_-30%_0)]",
            "motion-safe:animate-[etincelle-trace_1.6s_cubic-bezier(0.22,1,0.36,1)_forwards]",
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          {children}
        </span>

        {/* Tête de lumière dorée qui se déplace en synchro avec le tracé.
            Mix-blend-mode screen pour fondre la lumière au texte. */}
        <span
          aria-hidden
          className="motion-safe:absolute pointer-events-none top-[-30%] bottom-[-30%] w-[16%] rounded-full opacity-0 motion-safe:animate-[etincelle-light-head_1.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{
            animationDelay: `${delay}ms`,
            background:
              "radial-gradient(circle, rgba(255,235,180,0.95) 0%, rgba(255,215,130,0.55) 35%, rgba(184,138,61,0.18) 65%, transparent 80%)",
            filter: "blur(6px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Filet doré effilé sous le mot (style trait de plume) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[3px] motion-safe:scale-x-0 motion-safe:animate-[etincelle-underline_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards] origin-left"
          style={{ animationDelay: `${underlineDelay}ms` }}
        >
          <svg viewBox="0 0 200 3" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="underline-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b88a3d" stopOpacity="0" />
                <stop offset="20%" stopColor="#b88a3d" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#d2b078" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ead7af" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 2 1.5 Q 50 0.5 100 1.5 T 198 1.5"
              stroke="url(#underline-grad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      </span>

      {sparklePosition !== "none" && (
        <SparkleIcon
          className={cn(
            "absolute opacity-0 motion-safe:animate-[etincelle-flash_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] text-[#c9924a]",
            sparklePosition === "right-top" && "right-[-1.6rem] top-[-0.4rem] h-7 w-7",
            sparklePosition === "right-bottom" && "right-[-1.2rem] bottom-[-0.6rem] h-6 w-6",
            sparklePosition === "left-top" && "left-[-1.6rem] top-[-0.4rem] h-7 w-7",
          )}
          style={{ animationDelay: `${sparkleDelay}ms` }}
        />
      )}
    </span>
  );
}

/**
 * Étincelle 4 branches (style Insta de Céline) — étoile à 4 pointes effilées
 * avec un petit centre brillant.
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
