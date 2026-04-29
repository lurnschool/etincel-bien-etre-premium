"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Heart, Gift, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { brand, contact, cta } from "@/lib/data";

const proofs = [
  { icon: MapPin, label: "Bordeaux · Gironde · Le Taillan-Médoc" },
  { icon: Heart, label: "Individuel & collectif" },
  { icon: Calendar, label: "Cercles, ateliers & retraites" },
  { icon: Gift, label: "Cartes cadeaux disponibles" },
];

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-soft via-bg-base to-bg-base" />
        <div className="absolute top-20 -left-32 h-[36rem] w-[36rem] rounded-full bg-rose-soft/40 blur-[140px]" />
        <div className="absolute -top-20 right-0 h-[40rem] w-[40rem] rounded-full bg-gold-soft/40 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent-soft/20 blur-[120px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-border-medium bg-bg-card/70 backdrop-blur px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-gold-deep"
            >
              <span className="text-gold">
                <Etincelle size={14} />
              </span>
              {brand.tagline} · {contact.region.split(" · ")[0]}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-balance text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-text-deep"
            >
              Un espace pour vous{" "}
              <span className="font-display-italic text-gold-gradient">
                reconnecter
              </span>{" "}
              à vous-même.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-text-medium leading-relaxed max-w-xl"
            >
              {brand.shortDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link href={cta.primary.href} className="btn-primary group">
                {cta.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href={cta.discoverPractices.href} className="btn-secondary">
                {cta.discoverPractices.label}
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-2 gap-x-8 gap-y-3 pt-6 max-w-xl"
            >
              {proofs.map((proof) => (
                <li
                  key={proof.label}
                  className="flex items-center gap-3 text-sm text-text-medium"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-card border border-border-soft text-accent shrink-0">
                    <proof.icon className="h-3.5 w-3.5" />
                  </span>
                  {proof.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-accent-soft via-rose-soft to-gold-soft shadow-[0_30px_90px_rgba(31,26,46,0.18)]">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/30 via-transparent to-transparent" />
              <div className="absolute inset-0 grain" />

              {/* Placeholder visuel — à remplacer par photo de Céline (audit du site existant a confirmé qu'une photo de profil existe) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-text-on-dark/80 px-8 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-gold-soft">
                    <Etincelle size={12} />
                    Visuel à intégrer
                  </div>
                  <p className="font-display-italic text-3xl text-text-on-dark">
                    Photo de Céline
                  </p>
                  <p className="text-xs text-text-on-dark/70 max-w-xs mx-auto">
                    Récupération depuis le site existant ou nouvelle séance photo recommandée.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-6 md:-left-12 max-w-xs rounded-2xl bg-bg-card border border-border-soft shadow-[0_20px_50px_rgba(31,26,46,0.12)] p-5"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold-deep mb-2">
                <Etincelle size={10} />
                <span>Promesse</span>
              </div>
              <p className="font-display text-lg leading-snug text-text-deep">
                Retrouver l'apaisement, la clarté et votre élan intérieur.
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -top-6 -right-6 rounded-2xl bg-bg-deep text-text-on-dark border border-white/10 px-5 py-4 shadow-[0_20px_50px_rgba(31,26,46,0.25)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gold-soft mb-1">
                Trois portes
              </p>
              <p className="font-display text-base">
                Individuel · Collectif · Retraites
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
