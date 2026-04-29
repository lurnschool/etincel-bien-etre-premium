"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { asset } from "@/lib/assets";

/**
 * Scène pleine largeur — image avec parallax fort + citation
 * qui apparait par-dessus. Pas de card, juste une respiration.
 */
type Props = {
  image: string;
  alt: string;
  eyebrow: string;
  quote: string;
  attribution?: string;
  body?: string;
  cta?: { label: string; href: string };
};

export function QuoteScene({
  image,
  alt,
  eyebrow,
  quote,
  attribution,
  body,
  cta,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center overflow-hidden bg-bg-deep"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={asset(image)}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/85 via-bg-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep/40" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft">
            <span className="text-gold">
              <Etincelle size={12} />
            </span>
            <span>{eyebrow}</span>
          </div>

          <blockquote className="font-display-italic text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-text-on-dark">
            « {quote} »
          </blockquote>

          {attribution && (
            <p className="text-sm uppercase tracking-[0.24em] text-gold-soft">
              — {attribution}
            </p>
          )}

          {body && (
            <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg max-w-xl pt-3">
              {body}
            </p>
          )}

          {cta && (
            <div className="pt-3">
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors group"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
