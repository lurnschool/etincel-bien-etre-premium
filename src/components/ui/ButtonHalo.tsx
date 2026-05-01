import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /**
   * Active ou non l'effet halo. Quand false, rend les enfants tels quels
   * (utile pour conditionner par contexte sans changer de composant).
   */
  active?: boolean;
  /**
   * Ton dominant du halo.
   *  - mixed (défaut) : doré champagne + améthyste poudrée
   *  - gold : doré chaud uniquement
   *  - violet : améthyste profonde uniquement
   */
  tone?: "gold" | "violet" | "mixed";
  /** Forme du halo (suit le bouton). Par défaut "pill" (rounded-full). */
  shape?: "pill" | "rounded";
  className?: string;
};

/**
 * ButtonHalo — Sprint H : halo lumineux premium autour d'un CTA.
 *
 * Référence visuelle : effets lumineux Lurn School transposés à un bouton.
 * Direction artistique : champagne / doré / améthyste très doux,
 * mouvement fluide, premium, jamais néon ni agressif.
 *
 * Wrap autour d'un <Link> ou <button>. Rend un span avec :
 *  - ::before : halo radial doux qui respire (pulse 5s ease-in-out)
 *  - ::after  : reflet lumineux qui circule sur le border via conic-gradient
 *               + mask (rotation 5.5s linear)
 *
 * À utiliser uniquement sur les CTA principaux pour préserver l'effet rare.
 * CSS dans globals.css (.button-halo / --gold / --violet / --mixed).
 *
 * Server component pur. Respect natif de prefers-reduced-motion
 * (animations désactivées, halo statique discret conservé).
 */
export function ButtonHalo({
  children,
  active = true,
  tone = "mixed",
  shape = "pill",
  className,
}: Props) {
  if (!active) return <>{children}</>;
  return (
    <span
      className={cn(
        "button-halo",
        `button-halo--${tone}`,
        shape === "rounded" && "button-halo--rounded",
        className,
      )}
    >
      {children}
    </span>
  );
}
