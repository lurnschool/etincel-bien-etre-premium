"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { asset } from "@/lib/assets";

/**
 * Section éditoriale immersive — grande citation + portrait en arche,
 * parallax doux. Pas de card, pas de bloc, juste deux éléments qui se
 * répondent en élégance.
 */
export function EditorialIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      {/* Halos lumineux d'ambiance */}
      <div className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-rose-soft/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full bg-gold-soft/40 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.36em] text-gold-deep">
              <Etincelle size={12} />
              <span>Une rencontre</span>
            </div>

            <h2 className="font-display text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05] tracking-tight text-text-deep">
              Parfois, il suffit d&apos;une{" "}
              <span className="font-display-italic text-gold-gradient">étincelle</span>{" "}
              sur le chemin.
            </h2>

            <div className="space-y-5 text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
              <p>
                Un mot. Un regard. Une rencontre qui éveille un appel intérieur — celui de revenir à soi, à son corps, à son histoire.
              </p>
              <p>
                Céline accompagne depuis des années des femmes et des hommes qui traversent une transition, un blocage ou un appel sensible. Sa pratique mêle écoute fine, soin énergétique, rituels symboliques et présence chamanique.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep"
              >
                Découvrir Céline
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#approche"
                className="text-sm text-text-medium hover:text-accent transition-colors"
              >
                Sa pratique
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{ y: portraitY }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-8 bg-gradient-to-br from-gold-soft/40 via-rose-soft/30 to-bg-soft rounded-[3rem] blur-2xl -z-10" />
              <Image
                src={asset("/images/celine/portrait-celine.png")}
                alt="Portrait de Céline Dusseval"
                width={640}
                height={900}
                className="w-full h-auto"
                sizes="(max-width: 768px) 80vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
