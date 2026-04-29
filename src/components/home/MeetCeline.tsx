"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { asset } from "@/lib/assets";

const traits = [
  "Écoute fine, posée, sans interprétation",
  "Soin énergétique et chamanique doux",
  "Médecine du cacao, féminin sacré",
  "Numérologie, hypnose, breathwork",
  "Cercles de femmes, retraites immersives",
];

/**
 * Section "Rencontrer Céline" — portrait + récit court + traits.
 * Positionnée juste après la boussole pour incarner la personne.
 */
export function MeetCeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-bg-base to-bg-soft"
    >
      <div className="absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-rose-soft/30 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 lg:order-1 order-2"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-br from-gold-soft/40 via-rose-soft/40 to-transparent rounded-[3rem] blur-2xl -z-10" />
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                <Image
                  src={asset("/images/celine/approche-philosophie.jpg")}
                  alt="Céline Dusseval — accompagnatrice bien-être en Gironde"
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <Reveal className="lg:col-span-7 lg:order-2 order-1 space-y-6">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-gold-deep">
              <Etincelle size={12} />
              <span>Rencontrer Céline</span>
            </div>

            <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep">
              Une praticienne au{" "}
              <span className="font-display-italic text-gold-deep">croisement</span>{" "}
              du sensible et du symbolique.
            </h2>

            <div className="space-y-4 text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
              <p>
                Céline accompagne depuis des années des femmes et des hommes en quête de sens, de réconciliation, de transformation. Sa pratique mêle écoute fine, soin énergétique, médecine du cacao, rituels symboliques et présence chamanique.
              </p>
              <p>
                Elle ne propose pas un protocole. Elle propose un espace — pour vous déposer, vous écouter, vous retrouver.
              </p>
            </div>

            <ul className="space-y-2 max-w-md pt-2">
              {traits.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 text-sm text-text-medium"
                >
                  <span className="mt-1.5 text-gold shrink-0">
                    <Etincelle size={9} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                Découvrir Céline
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="text-sm text-text-medium hover:text-accent transition-colors py-3"
              >
                Lui écrire un mot →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
