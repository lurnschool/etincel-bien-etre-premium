import { cn } from "@/lib/utils";
import { Etincelle } from "./Etincelle";

type Variant =
  | "letter"        // mot doré chaud avec tracé lumineux animé au mount
  | "glow"          // texte doré + scintillement permanent + flash au mount
  | "signature"     // signature manuscrite "Étincel" + sparkle 4 branches
  | "handwritten"   // mot manuscrit cuivré chaud, sobre, sans anim
  | "lighttrace";   // texte tracé par lumière dorée — version forte (Cormorant ou autre)

type Props = {
  /** Le mot ou la lettre à mettre en valeur. */
  children: React.ReactNode;
  /** Le mode d'accent. Défaut "glow". */
  variant?: Variant;
  /** Forcer une taille (sinon hérite du parent). */
  className?: string;
  /** Afficher une étincelle juste avant le mot. Défaut false sauf en "signature". */
  withSparkle?: boolean;
  /** Délai de l'animation au mount (ms). Défaut 400 (après le hero text). */
  delay?: number;
};

/**
 * EtincelleAccent — accentue un mot ou une lettre avec l'identité dorée
 * de Céline (basée sur ses stories Insta `etincel_debienetre`).
 *
 * Sprint C → D :
 *  - letter      — gradient doré chaud + ANIMATION DE TRACÉ LUMINEUX au mount
 *                  (clip-path + tête de lumière qui se déplace + flash final)
 *  - glow        — ombre dorée + scintillement permanent + flash de glow au mount
 *  - signature   — script Caveat doré + étincelle 4 branches qui flash
 *  - handwritten — script Caveat cuivré chaud, sobre, sans anim
 *  - lighttrace  — variante forte du letter, pour titres importants
 *
 * À utiliser ponctuellement (1-2 mots par titre max) pour rester précieux.
 */
export function EtincelleAccent({
  children,
  variant = "glow",
  className,
  withSparkle,
  delay = 400,
}: Props) {
  const showSparkle = withSparkle ?? variant === "signature";

  if (variant === "signature") {
    return (
      <span className={cn("relative inline-flex items-baseline gap-1.5", className)}>
        {showSparkle && (
          <span
            aria-hidden
            className="text-[#c9924a] -translate-y-1 inline-flex motion-safe:animate-[etincelle-flash_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0"
            style={{ animationDelay: `${delay + 600}ms` }}
          >
            <SparkleSmall />
          </span>
        )}
        <span
          className="font-handwritten text-[#b88a3d] inline-block motion-safe:[clip-path:inset(-30%_100%_-30%_0)] motion-safe:animate-[etincelle-trace_1.4s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: `${delay}ms` }}
        >
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

  if (variant === "letter" || variant === "lighttrace") {
    // Variant "letter" / "lighttrace" — mot doré tracé par lumière au mount
    return (
      <span
        className={cn(
          "relative inline-block whitespace-nowrap",
          className,
        )}
      >
        <span
          className={cn(
            "inline-block bg-clip-text text-transparent",
            "bg-[linear-gradient(135deg,#a06b2a_0%,#b88a3d_30%,#d2b078_60%,#ead7af_90%)]",
            "motion-safe:[clip-path:inset(-30%_100%_-30%_0)]",
            "motion-safe:animate-[etincelle-trace_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]",
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          {children}
        </span>
        {/* Tête de lumière qui se déplace en synchro */}
        <span
          aria-hidden
          className="motion-safe:absolute pointer-events-none top-[-25%] bottom-[-25%] w-[14%] rounded-full opacity-0 motion-safe:animate-[etincelle-light-head_1.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{
            animationDelay: `${delay}ms`,
            background:
              "radial-gradient(circle, rgba(255,235,180,0.9) 0%, rgba(255,215,130,0.5) 35%, transparent 75%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
        />
      </span>
    );
  }

  // glow (défaut) — flash doré au mount + scintillement permanent
  return (
    <span
      className={cn(
        "relative inline-block text-[#b88a3d]",
        "motion-safe:[clip-path:inset(-30%_100%_-30%_0)]",
        "motion-safe:animate-[etincelle-trace_1.4s_cubic-bezier(0.22,1,0.36,1)_forwards,etincelle-scintille_4s_ease-in-out_infinite]",
        "[text-shadow:0_0_18px_rgba(184,138,61,0.45),_0_0_32px_rgba(184,138,61,0.20)]",
        className,
      )}
      style={{
        animationDelay: `${delay}ms, ${delay + 1400}ms`,
      }}
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
