"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AnkhSymbol,
  CacaoCup,
  FeminineSun,
  FlameSpirit,
  LotusOrnament,
  MandalaOrnament,
  MoonPhases,
  ShamanicDrum,
  TripleSpiral,
} from "./SacredOrnaments";
import type { SacredFallbackKey } from "@/lib/visualAssetMap";

/**
 * Composition visuelle artistique alignée sur l'univers de Céline.
 * Sert de fallback élégant tant que les vraies photos ne sont pas
 * intégrées — bien plus qualitatif qu'un simple gradient.
 */

type Props = {
  variant: SacredFallbackKey;
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "hero" | "tall";
  withGrain?: boolean;
};

const ratios: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  hero: "aspect-[16/9]",
  tall: "aspect-[3/4]",
};

const compositions: Record<
  SacredFallbackKey,
  {
    bg: string;
    primaryOrnament: React.ReactNode;
    accentOrnament?: React.ReactNode;
    centerLabel: { eyebrow: string; title: string };
    tone: "light" | "dark";
  }
> = {
  reconnexion: {
    bg: "bg-gradient-to-br from-[#f7e6c4] via-[#f1d9b4] to-[#e7c89a]",
    primaryOrnament: (
      <FeminineSun size={280} strokeWidth={0.8} className="text-gold-deep/30" />
    ),
    accentOrnament: (
      <AnkhSymbol size={64} strokeWidth={1} className="text-gold-deep/40" />
    ),
    centerLabel: { eyebrow: "Reconnexion", title: "Espace de présence" },
    tone: "light",
  },
  corps: {
    bg: "bg-gradient-to-br from-[#f1d9d4] via-[#f7e6dc] to-[#e9cf9d]",
    primaryOrnament: (
      <LotusOrnament size={260} strokeWidth={0.8} className="text-gold-deep/35" />
    ),
    accentOrnament: (
      <FlameSpirit size={72} strokeWidth={0.9} className="text-gold-deep/40" />
    ),
    centerLabel: { eyebrow: "Corps & énergie", title: "Mains, souffle, présence" },
    tone: "light",
  },
  collectif: {
    bg: "bg-gradient-to-br from-[#3a2342] via-[#2a1832] to-[#1a0d24]",
    primaryOrnament: (
      <MandalaOrnament size={320} strokeWidth={0.6} className="text-gold/45" />
    ),
    accentOrnament: (
      <MoonPhases size={180} strokeWidth={0.7} className="text-gold/50" />
    ),
    centerLabel: { eyebrow: "Collectif", title: "Cercle & présence partagée" },
    tone: "dark",
  },
  feminin: {
    bg: "bg-gradient-to-br from-[#3a1f3d] via-[#4a2742] to-[#2a1232]",
    primaryOrnament: (
      <AnkhSymbol size={140} strokeWidth={1} className="text-gold/55" />
    ),
    accentOrnament: (
      <TripleSpiral size={120} strokeWidth={0.8} className="text-gold/40" />
    ),
    centerLabel: { eyebrow: "Féminin sacré", title: "Symbolique d'Isis" },
    tone: "dark",
  },
  offrir: {
    bg: "bg-gradient-to-br from-[#fbf2dc] via-[#e9cf9d] to-[#c9a86a]",
    primaryOrnament: (
      <FeminineSun size={220} strokeWidth={0.7} className="text-gold-deep/35" />
    ),
    accentOrnament: (
      <CacaoCup size={70} strokeWidth={1} className="text-gold-deep/45" />
    ),
    centerLabel: { eyebrow: "Offrir", title: "Carte cadeau Etincel" },
    tone: "light",
  },
  cacao: {
    bg: "bg-gradient-to-br from-[#3d2a1f] via-[#2d1f15] to-[#1a120b]",
    primaryOrnament: (
      <CacaoCup size={200} strokeWidth={1} className="text-gold/55" />
    ),
    accentOrnament: (
      <FlameSpirit size={90} strokeWidth={0.9} className="text-gold/45" />
    ),
    centerLabel: { eyebrow: "Cacao sacré", title: "Cérémonie & ouverture du cœur" },
    tone: "dark",
  },
  retraite: {
    bg: "bg-gradient-to-br from-[#15102a] via-[#241a3f] to-[#0a0617]",
    primaryOrnament: (
      <MandalaOrnament size={420} strokeWidth={0.5} className="text-gold/40" />
    ),
    accentOrnament: (
      <MoonPhases size={240} strokeWidth={0.6} className="text-gold-soft/55" />
    ),
    centerLabel: { eyebrow: "Retraite immersive", title: "Temps long, nature, partage" },
    tone: "dark",
  },
  souffle: {
    bg: "bg-gradient-to-br from-[#2a1f44] via-[#3a2842] to-[#1d1530]",
    primaryOrnament: (
      <ShamanicDrum size={260} strokeWidth={0.8} className="text-gold/55" />
    ),
    accentOrnament: (
      <FlameSpirit size={90} strokeWidth={0.9} className="text-gold/40" />
    ),
    centerLabel: { eyebrow: "Souffle", title: "Tambour, breathwork, présence" },
    tone: "dark",
  },
  numerologie: {
    bg: "bg-gradient-to-br from-[#1d1530] via-[#2a1f44] to-[#15102a]",
    primaryOrnament: (
      <MandalaOrnament size={340} strokeWidth={0.5} className="text-gold/40" />
    ),
    accentOrnament: (
      <FeminineSun size={140} strokeWidth={0.7} className="text-gold-soft/45" />
    ),
    centerLabel: { eyebrow: "Numérologie", title: "Symbolique des nombres" },
    tone: "dark",
  },
  hypnose: {
    bg: "bg-gradient-to-br from-[#2d1530] via-[#1d1030] to-[#15102a]",
    primaryOrnament: (
      <TripleSpiral size={240} strokeWidth={0.7} className="text-gold/45" />
    ),
    accentOrnament: (
      <MoonPhases size={160} strokeWidth={0.6} className="text-gold/35" />
    ),
    centerLabel: { eyebrow: "Hypnose", title: "Voyage intérieur" },
    tone: "dark",
  },
  portrait: {
    bg: "bg-gradient-to-br from-[#f1d9d4] via-[#fbe9c7] to-[#e9cf9d]",
    primaryOrnament: (
      <FeminineSun size={220} strokeWidth={0.7} className="text-gold-deep/35" />
    ),
    accentOrnament: (
      <AnkhSymbol size={72} strokeWidth={0.9} className="text-gold-deep/40" />
    ),
    centerLabel: { eyebrow: "Portrait à venir", title: "Photo de Céline" },
    tone: "light",
  },
  ambiance: {
    bg: "bg-gradient-to-br from-[#f7e6dc] via-[#f3ecdf] to-[#e9cf9d]",
    primaryOrnament: (
      <MandalaOrnament size={300} strokeWidth={0.5} className="text-gold-deep/30" />
    ),
    accentOrnament: undefined,
    centerLabel: { eyebrow: "Ambiance", title: "Visuel à intégrer" },
    tone: "light",
  },
};

export function SacredVisual({
  variant,
  className,
  ratio = "portrait",
  withGrain = true,
}: Props) {
  const c = compositions[variant];
  const isDark = c.tone === "dark";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem]",
        ratios[ratio],
        c.bg,
        className,
      )}
    >
      {/* Halos lumineux */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-rose/15 blur-3xl" />

      {/* Ornement principal centré, animation lente */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 280, repeat: Infinity, ease: "linear" }}
      >
        {c.primaryOrnament}
      </motion.div>

      {/* Ornement accent décalé */}
      {c.accentOrnament && (
        <motion.div
          className="absolute right-[12%] bottom-[15%]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {c.accentOrnament}
        </motion.div>
      )}

      {/* Label central discret */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-8 max-w-xs">
          <p
            className={cn(
              "text-[0.65rem] uppercase tracking-[0.32em] mb-2",
              isDark ? "text-gold-soft" : "text-gold-deep/80",
            )}
          >
            {c.centerLabel.eyebrow}
          </p>
          <p
            className={cn(
              "font-display-italic text-2xl md:text-3xl leading-snug",
              isDark ? "text-text-on-dark/90" : "text-text-deep/85",
            )}
          >
            {c.centerLabel.title}
          </p>
        </div>
      </div>

      {withGrain && <div className="absolute inset-0 grain opacity-30" />}
    </div>
  );
}
