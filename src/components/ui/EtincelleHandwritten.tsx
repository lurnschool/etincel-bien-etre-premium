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
  /** Forcer la police : "handwritten" (Caveat cursive) ou "display" (Cormorant). */
  font?: "handwritten" | "display";
  /** Nombre de particules dorées qui jaillissent autour. Défaut 6. */
  particleCount?: number;
  className?: string;
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
};

/**
 * EtincelleHandwritten v3 — naissance d'étincelle.
 *
 * Le mot émerge comme une boule de lumière dorée :
 *  1. Texte commence très flou + scale 1.5 + halo doré énorme (brightness 2.4)
 *  2. Se condense progressivement en mot net (1.6s, cubic-bezier doux)
 *  3. Particules dorées jaillissent autour pendant le bloom
 *  4. Étincelle 4 branches flash après que le texte soit cristallisé
 *
 * Aucun mouvement linéaire — le mot apparaît au centre comme une
 * étincelle qui jaillit. Inspiré des stories Insta de Céline (etincel_debienetre).
 *
 * Animations CSS pures, respect prefers-reduced-motion.
 */
export function EtincelleHandwritten({
  children,
  size = "lg",
  delay = 200,
  sparklePosition = "right-top",
  font = "handwritten",
  particleCount = 6,
  className,
}: Props) {
  const bloomDuration = 1600;
  const sparkleDelay = delay + bloomDuration - 600;

  const fontClass = font === "handwritten" ? "font-handwritten" : "font-display";

  // Génère des trajectoires de particules autour du mot
  const particles = generateParticles(particleCount);

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      <span className="relative inline-block leading-[0.95]">
        {/* Le texte qui bloom — naissance de l'étincelle */}
        <span
          className={cn(
            fontClass,
            SIZE[size],
            "inline-block text-[#b88a3d]",
            "motion-safe:opacity-0 motion-safe:animate-[etincelle-bloom_1.6s_cubic-bezier(0.22,1,0.36,1)_forwards]",
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          {children}
        </span>

        {/* Particules dorées qui jaillissent autour pendant le bloom */}
        {particles.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className="motion-safe:absolute pointer-events-none top-1/2 left-1/2 h-1.5 w-1.5 rounded-full opacity-0 motion-safe:animate-[etincelle-particle_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            style={{
              animationDelay: `${delay + 100 + i * 40}ms`,
              background:
                "radial-gradient(circle, rgba(255,235,180,1) 0%, rgba(255,200,110,0.8) 50%, transparent 80%)",
              boxShadow: "0 0 8px rgba(255,215,130,0.9), 0 0 4px rgba(184,138,61,0.7)",
              ["--tx-mid" as string]: `${p.midX}px`,
              ["--ty-mid" as string]: `${p.midY}px`,
              ["--tx-end" as string]: `${p.endX}px`,
              ["--ty-end" as string]: `${p.endY}px`,
            }}
          />
        ))}
      </span>

      {sparklePosition !== "none" && (
        <SparkleIcon
          className={cn(
            "absolute opacity-0 motion-safe:animate-[etincelle-flash_1s_cubic-bezier(0.22,1,0.36,1)_forwards] text-[#c9924a]",
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
 * Génère N trajectoires de particules autour du centre.
 * Chaque particule a un point intermédiaire (au pic du bloom)
 * et un point final (où elle s'estompe).
 */
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const midDistance = 30 + Math.random() * 20;
    const endDistance = 60 + Math.random() * 40;
    particles.push({
      midX: Math.round(Math.cos(angle) * midDistance),
      midY: Math.round(Math.sin(angle) * midDistance),
      endX: Math.round(Math.cos(angle) * endDistance),
      endY: Math.round(Math.sin(angle) * endDistance),
    });
  }
  return particles;
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
