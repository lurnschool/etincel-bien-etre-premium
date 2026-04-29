"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";
import type { SacredFallbackKey } from "@/lib/visualAssetMap";

type Item = {
  src?: string;
  alt: string;
  fallback: SacredFallbackKey;
};

type Props = {
  items: Item[];
  layout?: "trio" | "stripe" | "feature-pair" | "duo";
  className?: string;
};

/**
 * Galerie modulaire — donne de la matière sans alourdir.
 * Plusieurs layouts pour s'adapter au contexte de la section.
 */
export function ImageMosaic({ items, layout = "trio", className }: Props) {
  if (layout === "trio" && items.length >= 3) {
    return (
      <div className={cn("grid grid-cols-12 gap-3 md:gap-4", className)}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="col-span-12 md:col-span-7"
        >
          <SmartImage {...items[0]} ratio="landscape" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="col-span-6 md:col-span-5 md:translate-y-12"
        >
          <SmartImage {...items[1]} ratio="portrait" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="col-span-6 md:col-span-5"
        >
          <SmartImage {...items[2]} ratio="square" />
        </motion.div>
      </div>
    );
  }

  if (layout === "stripe") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
        {items.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.alt}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <SmartImage {...item} ratio="square" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (layout === "feature-pair" && items.length >= 2) {
    return (
      <div className={cn("grid grid-cols-12 gap-4", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-8"
        >
          <SmartImage {...items[0]} ratio="hero" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="col-span-12 md:col-span-4 md:translate-y-16"
        >
          <SmartImage {...items[1]} ratio="tall" />
        </motion.div>
      </div>
    );
  }

  if (layout === "duo" && items.length >= 2) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
        {items.slice(0, 2).map((item, i) => (
          <motion.div
            key={item.alt}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <SmartImage {...item} ratio="portrait" />
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
