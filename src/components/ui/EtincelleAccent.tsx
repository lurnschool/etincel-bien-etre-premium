"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Etincelle } from "./Etincelle";

type Variant =
  | "letter"        // mot doré chaud avec écriture lettre-par-lettre + halo orbital
  | "glow"          // mot doré + écriture lettre-par-lettre + scintillement permanent
  | "signature"     // signature manuscrite "Étincel" + sparkle 4 branches
  | "handwritten"   // mot manuscrit cuivré chaud, sobre, sans anim
  | "lighttrace";   // alias de letter

type Props = {
  /** Le mot ou la lettre à mettre en valeur. String pour split par lettre. */
  children: ReactNode;
  /** Le mode d'accent. Défaut "glow". */
  variant?: Variant;
  /** Forcer une taille (sinon hérite du parent). */
  className?: string;
  /** Afficher une étincelle juste avant le mot. Défaut false sauf en "signature". */
  withSparkle?: boolean;
  /** Délai de l'animation au mount (ms). Défaut 500. */
  delay?: number;
  /** Délai entre chaque lettre (ms). Défaut 75. */
  letterDelay?: number;
};

/**
 * EtincelleAccent v4 — accent doré écrit lettre par lettre par la lumière.
 *
 * Toutes les variantes (sauf "handwritten") splittent le mot en lettres
 * individuelles et appliquent l'animation `letter-light` cascade. Effet
 * "Céline écrit le mot avec une plume lumineuse".
 *
 *  - letter      — gradient doré chaud + écriture cascade
 *  - glow        — text-shadow doré + écriture cascade + scintillement
 *  - signature   — Caveat doré + écriture cascade + sparkle 4 branches
 *  - handwritten — Caveat cuivré sobre, sans anim
 *  - lighttrace  — alias de letter
 */
export function EtincelleAccent({
  children,
  variant = "glow",
  className,
  withSparkle,
  delay = 500,
  letterDelay = 75,
}: Props) {
  const [replayKey, setReplayKey] = useState(0);

  // Si children n'est pas un string (composant complexe), on tombe sur
  // l'animation classique sans split par lettre.
  const text = typeof children === "string" ? children : "";
  const canSplit = text.length > 0;

  const showSparkle = withSparkle ?? variant === "signature";

  // Re-trigger l'animation au hover
  const handleMouseEnter = () => setReplayKey((k) => k + 1);

  if (variant === "handwritten") {
    return (
      <span className={cn("font-handwritten text-[#b88a3d]", className)}>
        {children}
      </span>
    );
  }

  // === Variant signature ===
  if (variant === "signature") {
    const letters = canSplit ? text.split("").map((c) => (c === " " ? " " : c)) : [];
    const totalDuration = delay + letters.length * letterDelay + 700;
    return (
      <span
        className={cn("relative inline-flex items-baseline gap-1.5 cursor-default", className)}
        onMouseEnter={handleMouseEnter}
      >
        {showSparkle && (
          <span
            key={`sparkle-${replayKey}`}
            aria-hidden
            className="text-[#c9924a] -translate-y-1 inline-flex motion-safe:animate-[etincelle-flash_1s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0"
            style={{ animationDelay: `${totalDuration - 200}ms` }}
          >
            <SparkleSmall />
          </span>
        )}
        <span className="font-handwritten text-[#b88a3d] inline-block">
          {canSplit ? (
            letters.map((letter, i) => (
              <span
                key={`${replayKey}-${i}`}
                className="inline-block motion-safe:opacity-0 motion-safe:animate-[letter-light_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{
                  animationDelay: `${delay + i * letterDelay}ms`,
                  whiteSpace: "pre",
                }}
              >
                {letter}
              </span>
            ))
          ) : (
            children
          )}
        </span>
      </span>
    );
  }

  // === Variant letter / lighttrace — gradient doré + écriture cascade ===
  if (variant === "letter" || variant === "lighttrace") {
    if (!canSplit) {
      // Fallback si children non string
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
    const letters = text.split("").map((c) => (c === " " ? " " : c));
    return (
      <span
        className={cn("inline-block cursor-default", className)}
        onMouseEnter={handleMouseEnter}
      >
        {letters.map((letter, i) => (
          <span
            key={`${replayKey}-${i}`}
            className={cn(
              "inline-block bg-clip-text text-transparent",
              "bg-[linear-gradient(135deg,#a06b2a_0%,#b88a3d_30%,#d2b078_60%,#ead7af_90%)]",
              "motion-safe:opacity-0 motion-safe:animate-[letter-light_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]",
            )}
            style={{
              animationDelay: `${delay + i * letterDelay}ms`,
              whiteSpace: "pre",
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    );
  }

  // === Variant glow (défaut) — écriture cascade + scintillement permanent ===
  if (!canSplit) {
    return (
      <span
        className={cn(
          "inline-block text-[#b88a3d]",
          "[text-shadow:0_0_18px_rgba(184,138,61,0.45),_0_0_32px_rgba(184,138,61,0.20)]",
          "motion-safe:animate-[etincelle-scintille_4s_ease-in-out_infinite]",
          className,
        )}
      >
        {children}
      </span>
    );
  }
  const letters = text.split("").map((c) => (c === " " ? " " : c));
  const lettersDuration = delay + letters.length * letterDelay + 700;
  return (
    <span
      className={cn("inline-block cursor-default", className)}
      onMouseEnter={handleMouseEnter}
    >
      {letters.map((letter, i) => (
        <span
          key={`${replayKey}-${i}`}
          className={cn(
            "inline-block text-[#b88a3d]",
            "motion-safe:opacity-0",
            "motion-safe:animate-[letter-light_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]",
            "[text-shadow:0_0_14px_rgba(184,138,61,0.40),_0_0_26px_rgba(184,138,61,0.16)]",
          )}
          style={{
            animationDelay: `${delay + i * letterDelay}ms`,
            whiteSpace: "pre",
          }}
        >
          {letter}
        </span>
      ))}
      {/* Scintillement permanent qui démarre après l'écriture cascade */}
      <span
        aria-hidden
        className="motion-safe:absolute motion-safe:inset-0 pointer-events-none motion-safe:animate-[etincelle-scintille_4s_ease-in-out_infinite]"
        style={{ animationDelay: `${lettersDuration}ms`, opacity: 0 }}
      />
    </span>
  );
}

function SparkleSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path d="M 12 2 L 13 11 L 22 12 L 13 13 L 12 22 L 11 13 L 2 12 L 11 11 Z" />
    </svg>
  );
}

export { Etincelle };
