"use client";

import { forwardRef } from "react";
import { Etincelle } from "@/components/ui/Etincelle";
import { cn } from "@/lib/utils";

export type GiftCardData = {
  fromName: string;
  toName: string;
  message: string;
  cardType: string;
  amount: string; // libre : "120 €", "À convenir", etc.
  occasion: string;
  style: GiftCardStyle;
};

export type GiftCardStyle = "doree" | "feminin" | "reconnexion" | "elegance" | "cacao";

export const giftCardStyles: Record<
  GiftCardStyle,
  { label: string; description: string }
> = {
  doree: {
    label: "Douceur dorée",
    description: "Sable chaud, lumière dorée, esprit lumineux.",
  },
  feminin: {
    label: "Féminin sacré",
    description: "Velours rose profond, accents dorés, intimité.",
  },
  cacao: {
    label: "Cacao & cœur",
    description: "Brun chaleureux, ankh doré, esprit cérémonie.",
  },
  reconnexion: {
    label: "Reconnexion",
    description: "Nuit améthyste, étincelle dorée, profondeur.",
  },
  elegance: {
    label: "Élégance profonde",
    description: "Ivoire, encre profonde, simplicité radicale.",
  },
};

/**
 * Carte cadeau visuelle — rendue dans une div forwarded
 * pour pouvoir l'exporter en PNG via html-to-image.
 */
export const GiftCardPreview = forwardRef<HTMLDivElement, { data: GiftCardData }>(
  function GiftCardPreview({ data }, ref) {
    const styleConfig = renderStyles[data.style];
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full aspect-[7/5] rounded-2xl overflow-hidden",
          "shadow-[0_30px_80px_rgba(31,26,46,0.18)]",
          styleConfig.container,
        )}
        style={{ minHeight: 360 }}
      >
        {styleConfig.background}

        <div className={cn("relative h-full p-7 md:p-9 flex flex-col justify-between", styleConfig.text)}>
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className={styleConfig.iconColor}>
                <Etincelle size={16} />
              </span>
              <div className="leading-none">
                <p className="font-display text-lg md:text-xl">Etincel</p>
                <p className={cn("font-display-italic text-[0.55rem] md:text-[0.6rem] tracking-[0.28em] uppercase mt-0.5", styleConfig.subtle)}>
                  de bien être · Céline Dusseval
                </p>
              </div>
            </div>
            {data.occasion && (
              <span className={cn("text-[0.6rem] uppercase tracking-[0.24em] px-2.5 py-1 rounded-full border", styleConfig.badge)}>
                {data.occasion}
              </span>
            )}
          </header>

          <div className="space-y-3 max-w-md">
            <p className={cn("text-[0.6rem] uppercase tracking-[0.32em]", styleConfig.label)}>
              Carte cadeau personnalisée
            </p>
            <h3 className="font-display text-2xl md:text-[2rem] leading-[1.05]">
              {data.toName ? (
                <>
                  <span className={styleConfig.italic}>Pour</span>{" "}
                  <span className="font-display-italic">{data.toName}</span>
                </>
              ) : (
                <span className={styleConfig.placeholder}>Pour vous</span>
              )}
            </h3>
            <p className={cn("text-sm md:text-[0.95rem] leading-relaxed", styleConfig.body)}>
              {data.message || "Une parenthèse pour revenir à soi."}
            </p>
          </div>

          <footer className="flex items-end justify-between gap-4 pt-4">
            <div className="space-y-0.5">
              <p className={cn("text-[0.55rem] uppercase tracking-[0.28em]", styleConfig.label)}>
                {data.cardType || "Type de cadeau"}
              </p>
              <p className="font-display text-lg md:text-xl">
                {data.amount || "Montant à définir"}
              </p>
            </div>
            <div className="text-right space-y-0.5">
              <p className={cn("text-[0.55rem] uppercase tracking-[0.28em]", styleConfig.label)}>
                Offert par
              </p>
              <p className="font-display-italic text-base md:text-lg">
                {data.fromName || "—"}
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  },
);

type StyleConfig = {
  container: string;
  background: React.ReactNode;
  text: string;
  subtle: string;
  body: string;
  iconColor: string;
  italic: string;
  label: string;
  placeholder: string;
  badge: string;
};

const renderStyles: Record<GiftCardStyle, StyleConfig> = {
  doree: {
    container: "bg-gradient-to-br from-[#fbf2dc] via-[#f3e1c0] to-[#e9cf9d] border border-gold-soft/40",
    background: (
      <>
        <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-rose-soft/40 blur-3xl" />
        <div className="absolute inset-0 grain opacity-30" />
      </>
    ),
    text: "text-text-deep",
    subtle: "text-gold-deep",
    body: "text-text-medium",
    iconColor: "text-gold-deep",
    italic: "text-gold-deep",
    label: "text-gold-deep/80",
    placeholder: "italic text-text-soft/70",
    badge: "border-gold-deep/30 text-gold-deep bg-bg-card/40",
  },
  feminin: {
    container: "bg-gradient-to-br from-[#3a1f3d] via-[#4a2742] to-[#2a1232]",
    background: (
      <>
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-rose/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute inset-0 grain opacity-40" />
      </>
    ),
    text: "text-text-on-dark",
    subtle: "text-gold-soft",
    body: "text-text-on-dark-soft",
    iconColor: "text-gold",
    italic: "text-gold-soft",
    label: "text-gold-soft/80",
    placeholder: "italic text-text-on-dark-soft/60",
    badge: "border-gold-soft/40 text-gold-soft bg-white/5",
  },
  reconnexion: {
    container: "bg-gradient-to-br from-[#15102a] via-[#241a3f] to-[#0f0a1f]",
    background: (
      <>
        <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute inset-0 grain opacity-40" />
      </>
    ),
    text: "text-text-on-dark",
    subtle: "text-gold-soft",
    body: "text-text-on-dark-soft",
    iconColor: "text-gold",
    italic: "text-gold-soft",
    label: "text-gold-soft/80",
    placeholder: "italic text-text-on-dark-soft/60",
    badge: "border-gold-soft/40 text-gold-soft bg-white/5",
  },
  elegance: {
    container: "bg-[#faf6f0] border border-text-deep/10",
    background: (
      <>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold via-accent to-gold" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-bg-soft blur-3xl" />
        <div className="absolute inset-0 grain opacity-20" />
      </>
    ),
    text: "text-text-deep",
    subtle: "text-accent",
    body: "text-text-medium",
    iconColor: "text-accent",
    italic: "text-accent",
    label: "text-text-soft",
    placeholder: "italic text-text-soft/70",
    badge: "border-text-deep/15 text-text-deep bg-bg-soft",
  },
  cacao: {
    container: "bg-gradient-to-br from-[#3d2a1f] via-[#2d1f15] to-[#1a120b]",
    background: (
      <>
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose/15 blur-3xl" />
        {/* Ornement Ankh subtil en arrière-plan */}
        <svg
          aria-hidden
          viewBox="0 0 32 44"
          className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-auto text-gold/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
        >
          <ellipse cx="16" cy="11" rx="9" ry="10" />
          <line x1="16" y1="21" x2="16" y2="42" />
          <line x1="6" y1="25" x2="26" y2="25" />
        </svg>
        <div className="absolute inset-0 grain opacity-40" />
      </>
    ),
    text: "text-text-on-dark",
    subtle: "text-gold-soft",
    body: "text-text-on-dark-soft",
    iconColor: "text-gold",
    italic: "text-gold-soft",
    label: "text-gold-soft/80",
    placeholder: "italic text-text-on-dark-soft/60",
    badge: "border-gold-soft/40 text-gold-soft bg-white/5",
  },
};
