"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { PremiumGiftCard } from "@/components/giftcard/PremiumGiftCard";
import { cn } from "@/lib/utils";

type Theme = "feminin" | "cacao" | "retraite" | "libre";

const THEMES: Array<{
  id: Theme;
  label: string;
  short: string;
  recipient: string;
  offerLabel: string;
  value: string;
}> = [
  {
    id: "feminin",
    label: "Féminin & cacao",
    short: "Féminin",
    recipient: "Pour vous, ma chère",
    offerLabel: "Un cercle féminin",
    value: "Sur demande",
  },
  {
    id: "cacao",
    label: "Cérémonie cacao",
    short: "Cacao",
    recipient: "À toi qui ouvres ton cœur",
    offerLabel: "Une cérémonie cacao",
    value: "Selon format",
  },
  {
    id: "retraite",
    label: "Retraite immersive",
    short: "Retraite",
    recipient: "Pour t'offrir un temps long",
    offerLabel: "Une retraite immersive",
    value: "Selon retraite",
  },
  {
    id: "libre",
    label: "Montant libre",
    short: "Libre",
    recipient: "Au choix de qui reçoit",
    offerLabel: "Un moment chez Céline",
    value: "À convenir",
  },
];

/**
 * OffrirUnMoment v2 — Sprint F : module cadeau premium interactif.
 *
 * Refonte complète de la carte cadeau du début :
 *  - Vraie carte cadeau visuelle avec flip 3D recto/verso (PremiumGiftCard)
 *  - 4 thèmes au choix (féminin / cacao / retraite / libre) avec preview
 *  - Selecteur de thème en pastilles douces — change la carte affichée
 *  - Effet papier premium, signature manuscrite, étincelle qui pulse
 *  - Cliquer ou survoler la carte → flip 3D (révèle le verso)
 *  - CTA premium "Préparer une attention" → flow Stripe (page /cartes-cadeaux)
 *  - CTA secondaire WhatsApp pour question
 *
 * Conserve la logique : aucun téléchargement final sans paiement Stripe
 * ou validation manuelle. Le module ici est une vitrine désirable
 * qui mène vers le flow complet.
 */
export function OffrirUnMoment() {
  const [activeTheme, setActiveTheme] = useState<Theme>("feminin");
  const current = THEMES.find((t) => t.id === activeTheme)!;

  return (
    <section className="relative paper-sand py-16 md:py-22 overflow-hidden">
      {/* Halo décoratif chaud en fond */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-rose-soft/30 via-gold-soft/25 to-transparent blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-gold-soft/20 via-rose-soft/15 to-transparent blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-14 md:gap-20 lg:grid-cols-12 items-center">
          {/* === Colonne carte (premium 3D) === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95 }}
            className="lg:col-span-5 lg:order-1 order-2"
          >
            <div className="group relative">
              <PremiumGiftCard
                theme={current.id}
                recipient={current.recipient}
                offerLabel={current.offerLabel}
                value={current.value}
                reference="EBE · 2026"
              />
            </div>

            {/* Sélecteur de thème — pastilles douces sous la carte */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {THEMES.map((t) => {
                const active = t.id === activeTheme;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTheme(t.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[0.78rem] font-medium tracking-wide transition-all duration-300",
                      active
                        ? "bg-accent-deep text-text-on-dark shadow-[0_4px_14px_rgba(74,52,99,0.25)]"
                        : "bg-bg-card border border-border-soft text-text-medium hover:border-gold-soft hover:text-text-deep",
                    )}
                    aria-pressed={active}
                  >
                    {t.short}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-center text-[0.7rem] uppercase tracking-[0.28em] text-text-soft">
              Survolez ou cliquez pour retourner la carte
            </p>
          </motion.div>

          {/* === Colonne texte (droite) === */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="lg:col-span-7 lg:order-2 order-1 space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>Offrir un moment</span>
            </div>
            <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep max-w-xl">
              Une attention pour quelqu&apos;un que vous{" "}
              <EtincelleAccent variant="letter">aimez</EtincelleAccent>.
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
              Une carte préparée avec soin — pour offrir un cercle, une
              cérémonie, une retraite, ou simplement un moment de pause.
              Imprimée à la main, signée par Céline.
            </p>

            {/* Détails : 4 lignes de promesses douces */}
            <ul className="space-y-2.5 pt-2 max-w-md">
              {[
                "Choisissez le format ou laissez le montant libre",
                "Carte préparée et envoyée par email + version imprimable",
                "Validité 12 mois, transmissible librement",
                "Signée personnellement par Céline",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-sm text-text-medium"
                >
                  <span className="text-gold-deep mt-0.5 shrink-0">
                    <Etincelle size={8} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-3">
              <ButtonHalo tone="mixed">
                <Link
                  href="/cartes-cadeaux"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                >
                  Préparer une attention
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </ButtonHalo>
              <a
                href="https://wa.me/33627438104"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-7 py-3.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Poser une question
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
