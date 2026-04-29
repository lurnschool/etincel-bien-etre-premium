"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { contact } from "@/lib/data";

/**
 * Hero immersif — photo de Céline pleine hauteur, parallax au scroll,
 * texte qui apparaît avec délicatesse. Une seule scène forte, pas un slider.
 */
export function HeroLiving() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-bg-deep"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/celine/approche-philosophie.jpg"
          alt="Céline Dusseval avec son tambour chamanique au lever du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/60 via-transparent to-transparent md:from-bg-deep/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-end pb-24 md:pb-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft">
              <span className="text-gold">
                <Etincelle size={12} />
              </span>
              <span>Céline Dusseval · {contact.region.split(" · ")[0]}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1] tracking-tight text-text-on-dark"
            >
              Trouver l&apos;endroit en soi{" "}
              <span className="font-display-italic text-gold-gradient block sm:inline">
                où tout est possible
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="text-base md:text-lg text-text-on-dark-soft leading-relaxed max-w-xl"
            >
              Soins, cercles, rituels et retraites — un accompagnement sensible et profond pour celles et ceux qui cherchent à se reconnecter à leur corps, à leur étincelle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link
                href="/#boussole"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-all duration-400"
              >
                Trouver ma porte d&apos;entrée
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
              >
                Échanger avec Céline
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-on-dark-soft/60"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.32em]">
          Faire défiler
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
