"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SacredVisual } from "@/components/ornaments/SacredVisual";
import type { SacredFallbackKey } from "@/lib/visualAssetMap";

type Props = {
  src?: string;
  alt: string;
  fallback: SacredFallbackKey;
  ratio?: "square" | "portrait" | "landscape" | "hero" | "tall";
  className?: string;
  priority?: boolean;
};

/**
 * Affiche une image réelle si `src` est fourni,
 * sinon un fallback artistique aligné sur l'univers de Céline.
 */
export function SmartImage({
  src,
  alt,
  fallback,
  ratio = "portrait",
  className,
  priority = false,
}: Props) {
  if (src) {
    const ratioClass = {
      square: "aspect-square",
      portrait: "aspect-[4/5]",
      landscape: "aspect-[16/10]",
      hero: "aspect-[16/9]",
      tall: "aspect-[3/4]",
    }[ratio];
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem]",
          ratioClass,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }
  return <SacredVisual variant={fallback} ratio={ratio} className={className} />;
}
