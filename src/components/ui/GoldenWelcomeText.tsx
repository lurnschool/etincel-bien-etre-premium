import { cn } from "@/lib/utils";

type Props = {
  /** Mot à afficher (par défaut "Bienvenue"). */
  children?: React.ReactNode;
  /** Tailles fluides. lg = home cérémoniel, md = section secondaire. */
  size?: "md" | "lg" | "xl";
  /** Étiquette accessible si le mot est purement décoratif (sinon laisser vide). */
  ariaLabel?: string;
  className?: string;
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  md: "text-[clamp(2.2rem,5vw,4rem)]",
  lg: "text-[clamp(2.8rem,7vw,6.5rem)]",
  xl: "text-[clamp(3.4rem,8vw,7.5rem)]",
};

/**
 * GoldenWelcomeText — inscription dorée vivante (Sprint G).
 *
 * Référence d'intention : effets lumineux Lurn School transposés à un mot.
 * Direction artistique :
 *  - or champagne (pas jaune vif)
 *  - lumière chaude, fine, organique
 *  - mouvement fluide, lent, presque cérémoniel
 *  - sensation de refuge, "le mot s'illumine de l'intérieur"
 *
 * Le sweep et le breathe sont définis dans globals.css (.golden-welcome).
 * Respect natif de prefers-reduced-motion (animations désactivées,
 * la lueur statique reste).
 *
 * Server component pur — aucune dépendance Framer Motion (perf + bundle).
 */
export function GoldenWelcomeText({
  children = "Bienvenue",
  size = "lg",
  ariaLabel,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "golden-welcome font-display leading-[1] tracking-[-0.04em]",
        SIZE[size],
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}
