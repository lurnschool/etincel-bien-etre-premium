import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getVisualAsset,
  resolveAssetSrc,
  type VisualAssetEntry,
} from "@/lib/visualAssetMap";

const RATIO_CLASS: Record<VisualAssetEntry["ratio"], string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "3:4": "aspect-[3/4]",
  "5:4": "aspect-[5/4]",
  "3:2": "aspect-[3/2]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
  "9:16": "aspect-[9/16]",
};

type VisualAssetProps = {
  /** Identifiant déclaré dans visualAssetMap.ts */
  id: string;
  /** Classes appliquées au wrapper (positionnement, ombres, bordures…). */
  className?: string;
  /** Classes appliquées à l'image elle-même (object-position, transform, blur…). */
  imageClassName?: string;
  /** Force un ratio différent de celui déclaré dans la map. */
  ratio?: VisualAssetEntry["ratio"];
  /** Désactive l'aspect-ratio (utile quand on contrôle la hauteur via le parent). */
  fill?: boolean;
  /** Sizes Next/Image — laisse défaut sauf cas spécifique. */
  sizes?: string;
  /** Priority hint Next/Image (uniquement pour l'image LCP). */
  priority?: boolean;
  /** Override le alt si vraiment nécessaire (sinon utilise celui de la map). */
  altOverride?: string;
};

/**
 * Rend un visuel à partir de la cartographie centrale.
 *
 * Avantages :
 *   - On change un fichier dans visualAssetMap.ts → tout le site est mis à jour.
 *   - Le ratio, le alt, le object-position viennent du registre central.
 *   - Aucun mot "placeholder" n'est exposé côté public.
 *   - Les SVG placeholders s'affichent en object-cover comme une vraie image.
 *
 * Usage :
 *   <VisualAsset id="home-hero-celine" priority />
 *   <VisualAsset id="home-univers-1" className="rounded-3xl" />
 */
export function VisualAsset({
  id,
  className,
  imageClassName,
  ratio,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  altOverride,
}: VisualAssetProps) {
  const entry = getVisualAsset(id);
  const src = resolveAssetSrc(entry);
  const alt = altOverride ?? entry.altText;
  const ratioClass = RATIO_CLASS[ratio ?? entry.ratio];
  const objectPosition = entry.objectPosition ?? "object-center";

  if (fill) {
    // Mode "fill" — le parent doit avoir position:relative et une hauteur.
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", objectPosition, imageClassName)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-bg-soft",
        ratioClass,
        className,
      )}
      data-asset-id={entry.id}
      data-asset-status={entry.status}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", objectPosition, imageClassName)}
      />
    </div>
  );
}

/**
 * Variante "background" — image en couverture absolue d'un parent
 * existant. Utile pour les hero où le wrapper est déjà construit.
 */
export function VisualAssetBackground({
  id,
  imageClassName,
  sizes = "100vw",
  priority = false,
  altOverride,
}: Pick<VisualAssetProps, "id" | "imageClassName" | "sizes" | "priority" | "altOverride">) {
  const entry = getVisualAsset(id);
  const src = resolveAssetSrc(entry);
  const alt = altOverride ?? entry.altText;
  const objectPosition = entry.objectPosition ?? "object-center";

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", objectPosition, imageClassName)}
    />
  );
}
