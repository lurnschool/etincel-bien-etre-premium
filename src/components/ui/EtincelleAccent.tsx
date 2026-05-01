import { cn } from "@/lib/utils";
import { Etincelle } from "./Etincelle";

type Variant =
  | "letter"      // mot/lettre en doré chaud avec petite étincelle au-dessus
  | "glow"        // texte avec ombre dorée lumineuse + scintillement subtil
  | "signature"   // signature "Étincel" cursive (script Caveat) + étincelle 4 branches
  | "handwritten"; // mot manuscrit cuivré chaud (style story Insta) — sobre, sans anim

type Props = {
  /** Le mot ou la lettre à mettre en valeur. */
  children: React.ReactNode;
  /** Le mode d'accent. Défaut "glow". */
  variant?: Variant;
  /** Forcer une taille (sinon hérite du parent). */
  className?: string;
  /** Afficher une étincelle juste avant le mot. Défaut false sauf en "signature". */
  withSparkle?: boolean;
};

/**
 * EtincelleAccent — accentue un mot ou une lettre avec l'identité dorée
 * de Céline (basée sur ses stories Insta `etincel_debienetre`).
 *
 * Sprint C "pages-pièces" + ajustement Sprint D :
 *  - letter      — gradient doré chaud (jaune-or)
 *  - glow        — ombre dorée + scintillement CSS subtil (renforcé Sprint D)
 *  - signature   — script Caveat doré + étincelle 4 branches (Insta de Céline)
 *  - handwritten — script Caveat cuivré chaud, sobre, sans anim
 *
 * À utiliser ponctuellement (1-2 mots par titre max) pour rester précieux.
 */
export function EtincelleAccent({
  children,
  variant = "glow",
  className,
  withSparkle,
}: Props) {
  const showSparkle = withSparkle ?? variant === "signature";

  if (variant === "signature") {
    return (
      <span className={cn("relative inline-flex items-baseline gap-1.5", className)}>
        {showSparkle && (
          <span
            aria-hidden
            className="text-[#c9924a] -translate-y-1 inline-flex motion-safe:animate-[etincelle-flash_1.4s_cubic-bezier(0.22,1,0.36,1)_0.3s_forwards] opacity-0"
          >
            <SparkleSmall />
          </span>
        )}
        <span className="font-handwritten text-[#b88a3d] [text-shadow:0_0_18px_rgba(184,138,61,0.35)]">
          {children}
        </span>
      </span>
    );
  }

  if (variant === "handwritten") {
    return (
      <span className={cn("font-handwritten text-[#b88a3d]", className)}>
        {children}
      </span>
    );
  }

  if (variant === "letter") {
    return (
      <span
        className={cn(
          "inline-block bg-clip-text text-transparent",
          "bg-[linear-gradient(135deg,#a06b2a_0%,#b88a3d_30%,#d2b078_60%,#ead7af_90%)]",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  // glow (défaut) — renforcé Sprint D avec scintillement subtil
  return (
    <span
      className={cn(
        "inline-block text-[#b88a3d] motion-safe:animate-[etincelle-scintille_4s_ease-in-out_infinite]",
        "[text-shadow:0_0_18px_rgba(184,138,61,0.45),_0_0_32px_rgba(184,138,61,0.20)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function SparkleSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path d="M 12 2 L 13 11 L 22 12 L 13 13 L 12 22 L 11 13 L 2 12 L 11 11 Z" />
    </svg>
  );
}

// Re-export legacy for compatibility
export { Etincelle };
