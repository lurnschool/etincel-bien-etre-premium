"use client";

import { motion } from "framer-motion";

export function Etincelle({ size = 16 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
        rotate: [0, 45, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}
