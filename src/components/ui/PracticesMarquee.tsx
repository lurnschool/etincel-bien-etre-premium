"use client";

import { cn } from "@/lib/utils";

type Props = {
  /** Liste de pratiques à faire défiler. */
  items: readonly string[];
  /** Vitesse de défilement (durée du cycle complet en secondes). Défaut 50s. */
  durationS?: number;
  /** Tonalité — défaut "soft" (fond crème + texte sage). */
  tone?: "soft" | "ivory" | "rose";
  /** Classe wrapper externe. */
  className?: string;
};

const TONE_STYLE: Record<NonNullable<Props["tone"]>, { bg: string; text: string; border: string; sep: string }> = {
  soft: {
    bg: "bg-bg-soft/60 backdrop-blur-sm",
    text: "text-text-soft",
    border: "border-border-soft/50",
    sep: "text-[#b88a3d]/50",
  },
  ivory: {
    bg: "bg-bg-base",
    text: "text-text-medium",
    border: "border-border-soft/60",
    sep: "text-gold-deep/40",
  },
  rose: {
    bg: "bg-rose-soft/30",
    text: "text-[#7a4630]",
    border: "border-rose/30",
    sep: "text-[#b88a3d]/55",
  },
};

/**
 * PracticesMarquee — bande défilante éditoriale des pratiques de Céline.
 *
 * Sprint D : réintroduit (avait été supprimé Sprint A car jugé trop
 * agence). Cette fois en version douce : typo display, vitesse 50s
 * (très lent), pause au hover, séparateur étincelle dorée.
 *
 * Animations CSS pures (pas Framer). Respecte prefers-reduced-motion
 * (animation arrêtée).
 *
 * Usage : import du tableau `practicesMarquee` depuis data.ts.
 */
export function PracticesMarquee({
  items,
  durationS = 50,
  tone = "soft",
  className,
}: Props) {
  const style = TONE_STYLE[tone];
  // Doubler pour boucle continue
  const list = [...items, ...items];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y",
        style.bg,
        style.border,
        className,
      )}
      aria-label="Pratiques mobilisées par Céline"
    >
      <div
        className="flex gap-12 py-4 whitespace-nowrap motion-safe:hover:[animation-play-state:paused] motion-safe:animate-[practices-marquee_var(--marquee-duration)_linear_infinite] w-max"
        style={{ ["--marquee-duration" as string]: `${durationS}s` }}
      >
        {list.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn("flex items-center gap-12 shrink-0", style.text)}
          >
            <span className="font-display-italic text-base md:text-lg tracking-tight">
              {item}
            </span>
            <span className={cn("text-base", style.sep)} aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes practices-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
