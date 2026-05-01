import { cn } from "@/lib/utils";
import { Etincelle } from "./Etincelle";

type Variant =
  | "letter"   // mot/lettre en doré chaud avec petite étincelle au-dessus
  | "glow"     // texte avec ombre dorée lumineuse subtle
  | "signature" // mot rendu comme la signature "Étincel" du site original

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
 * "Étincel". Utilisé pour singulariser des mots-clés sur les titres
 * (« cacao », « constellations », « refuge », « Bienvenue », etc.).
 *
 * Sprint C "pages-pièces" : permet d'apporter la signature lumineuse
 * du site original sur des titres ponctuels, sans surcharger.
 *
 * Trois variantes :
 *  - letter    — texte doré chaud (gradient gold) sans effet
 *  - glow      — texte avec ombre dorée lumineuse subtle
 *  - signature — accent "Étincel" du site original (italique + sparkle)
 *
 * À utiliser ponctuellement (1 mot par titre max) pour rester précieux.
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
      <span className={cn("inline-flex items-baseline gap-1.5", className)}>
        {showSparkle && (
          <span className="text-gold-deep -translate-y-1 inline-flex">
            <Etincelle size={14} />
          </span>
        )}
        <span className="font-display-italic text-gold-deep">{children}</span>
      </span>
    );
  }

  if (variant === "letter") {
    return (
      <span
        className={cn(
          "inline-block bg-clip-text text-transparent",
          "bg-[linear-gradient(135deg,#ad8e4a_0%,#d2b078_45%,#ead7af_85%)]",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  // glow (défaut)
  return (
    <span
      className={cn(
        "inline-block text-gold-deep",
        "[text-shadow:0_0_18px_rgba(201,168,106,0.45),_0_0_32px_rgba(201,168,106,0.18)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
