import { cn } from "@/lib/utils";

type Props = {
  /** Mot ou phrase à afficher (par défaut "Bienvenue"). */
  children?: React.ReactNode;
  /**
   * Tailles fluides preset. Mettre à false pour hériter de la taille
   * du parent (utile quand on l'applique à un H1 déjà stylé).
   */
  size?: "md" | "lg" | "xl" | false;
  /**
   * Affiche le reflet lumineux qui traverse le texte de gauche à droite.
   * Par défaut true. Mettre à false pour garder uniquement le gradient or
   * + la respiration lumineuse (variante "still").
   */
  sweep?: boolean;
  /** Étiquette accessible si le texte est décoratif (sinon laisser vide). */
  ariaLabel?: string;
  className?: string;
};

const SIZE: Record<"md" | "lg" | "xl", string> = {
  md: "text-[clamp(2.2rem,5vw,4rem)]",
  lg: "text-[clamp(2.8rem,7vw,6.5rem)]",
  xl: "text-[clamp(3.4rem,8vw,7.5rem)]",
};

/**
 * GoldenWelcomeText — inscription dorée vivante (Sprint G).
 *
 * Référence d'intention : effets lumineux Lurn School transposés à du texte.
 * Direction artistique :
 *  - or champagne (pas jaune vif)
 *  - lumière chaude, fine, organique
 *  - mouvement fluide, lent, presque cérémoniel
 *  - sensation de refuge, "le texte s'illumine de l'intérieur"
 *
 * Deux variantes :
 *  - sweep (défaut) : gradient + respiration + reflet qui traverse
 *  - still (sweep={false}) : gradient + respiration seulement, sans reflet
 *    → utilisé sur les phrases longues pour ne pas distraire la lecture.
 *
 * CSS dans globals.css (.golden-welcome / .golden-welcome--still).
 * Respect natif de prefers-reduced-motion (animations désactivées,
 * la lueur statique reste).
 *
 * Server component pur — aucune dépendance Framer Motion.
 */
export function GoldenWelcomeText({
  children = "Bienvenue",
  size = "lg",
  sweep = true,
  ariaLabel,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "golden-welcome font-display tracking-[-0.04em]",
        size ? "leading-[1]" : "leading-[inherit]",
        !sweep && "golden-welcome--still",
        size && SIZE[size],
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}
