"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { asset } from "@/lib/assets";

const practices = [
  {
    slug: "numerologie",
    name: "Numérologie",
    image: "/images/celine/numerologie.png",
    intent: "Comprendre son chemin",
  },
  {
    slug: "hypnose",
    name: "Hypnose",
    image: "/images/celine/hypnose.png",
    intent: "Apaiser, libérer",
  },
  {
    slug: "cellrelease",
    name: "CellRelease®",
    image: "/images/celine/cell-release.png",
    intent: "Mémoires cellulaires",
  },
  {
    slug: "massage-energetique",
    name: "Massage énergétique",
    image: "/images/celine/massage-energetique.png",
    intent: "Revenir au corps",
  },
  {
    slug: "reflexologie",
    name: "Réflexologie amérindienne",
    image: "/images/celine/reflexologie.png",
    intent: "Ouvrir l'inconscient",
  },
  {
    slug: "breathwork",
    name: "Breathwork chamanique",
    image: "/images/celine/breathwork.png",
    intent: "Souffle & présence",
  },
  {
    slug: "innerdance-individuel",
    name: "Innerdance",
    image: "/images/celine/ambiance-individuel.png",
    intent: "Immersion sensorielle",
  },
  {
    slug: "feminin-sacre",
    name: "Féminin sacré",
    image: "/images/celine/ambiance-groupe.png",
    intent: "Cycles, intuition, corps",
  },
  {
    slug: "cacao-rituel",
    name: "Cérémonie cacao",
    image: "/images/celine/ambiance-formations.png",
    intent: "Cœur & rituel",
  },
];

/**
 * Défilement horizontal des pratiques — scroll naturel,
 * pas de cards empilées. Chaque pratique = une scène visuelle minimale.
 */
export function PracticesScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-50%"]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-bg-soft"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-gold-deep">
            <Etincelle size={12} />
            <span>Les pratiques</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep">
            Une palette de{" "}
            <span className="font-display-italic text-gold-deep">soins, rituels</span>{" "}
            et expériences.
          </h2>
          <p className="text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
            De la numérologie au breathwork chamanique, chaque pratique est une porte d&apos;entrée vers vous-même.
          </p>
        </motion.div>
      </div>

      <motion.div style={{ x }} className="flex gap-6 md:gap-10 will-change-transform pl-6 md:pl-10">
        {practices.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.04 }}
          >
            <Link
              href={`/accompagnements/${p.slug}`}
              className="group block w-[260px] md:w-[320px] shrink-0"
            >
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-bg-card mb-5 transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src={asset(p.image)}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-text-on-dark">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-soft mb-1.5">
                    {p.intent}
                  </p>
                </div>
              </div>
              <p className="font-display text-2xl md:text-[1.7rem] text-text-deep leading-tight px-1">
                {p.name}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-text-soft mt-2 px-1 group-hover:text-accent transition-colors">
                Découvrir
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
        <div className="shrink-0 w-12 md:w-32" aria-hidden />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12">
        <Link
          href="/accompagnements"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-deep"
        >
          Voir toutes les pratiques
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
