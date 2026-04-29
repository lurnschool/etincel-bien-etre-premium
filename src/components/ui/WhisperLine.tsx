"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  position?: "left" | "right";
  orientation?: "vertical" | "horizontal";
  tone?: "gold" | "amethyst";
  className?: string;
};

/**
 * WhisperLine — phrase poétique discrète intégrée en latéral d'une section.
 * Opacité faible (12-22%), masquée sur mobile, animation douce.
 * Ne doit jamais gêner la lecture du contenu principal.
 */
export function WhisperLine({
  text,
  position = "right",
  orientation = "vertical",
  tone = "gold",
  className,
}: Props) {
  const toneClass = tone === "gold" ? "text-gold-deep/20" : "text-accent/15";

  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      className={cn(
        "absolute pointer-events-none select-none hidden xl:block",
        "font-display-italic font-light italic",
        toneClass,
        orientation === "vertical" && "top-1/2 -translate-y-1/2 origin-center",
        orientation === "vertical" && position === "left" && "left-6 -rotate-90 whitespace-nowrap",
        orientation === "vertical" && position === "right" && "right-6 rotate-90 whitespace-nowrap",
        orientation === "horizontal" && "bottom-6 max-w-md text-pretty leading-snug text-base",
        orientation === "horizontal" && position === "left" && "left-6",
        orientation === "horizontal" && position === "right" && "right-6 text-right",
        className,
      )}
      style={{
        fontSize: orientation === "vertical" ? "0.8rem" : undefined,
        letterSpacing: orientation === "vertical" ? "0.18em" : undefined,
      }}
    >
      {text}
    </motion.span>
  );
}
