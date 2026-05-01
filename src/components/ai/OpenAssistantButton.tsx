"use client";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Optionnel : message de seed à transmettre à l'assistant (futur). */
  seed?: string;
};

/**
 * OpenAssistantButton — Sprint H.
 *
 * Petit wrapper client qui dispatch un event custom
 * `etincel:open-assistant` écouté par le FloatingAssistant pour ouvrir
 * le panel de conciergerie depuis n'importe quel endroit de la page
 * (CTA dans /tarifs, GuidanceFooter, etc.).
 *
 * Permet d'utiliser ce bouton dans des Server Components sans casser le
 * SSR — seul le wrapper est client.
 */
export function OpenAssistantButton({ children, className, seed }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(
          new CustomEvent("etincel:open-assistant", { detail: { seed } }),
        );
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
