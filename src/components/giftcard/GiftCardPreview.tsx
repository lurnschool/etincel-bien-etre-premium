"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/data";
import {
  Sparkler,
  Paperclip,
  FourPointStar,
} from "./PremiumGiftCard";

export type GiftCardData = {
  fromName: string;
  toName: string;
  message: string;
  cardType: string;
  amount: string; // libre : "120 €", "À convenir", etc.
  occasion: string;
  style: GiftCardStyle;
};

export type GiftCardStyle =
  | "doree"
  | "feminin"
  | "reconnexion"
  | "elegance"
  | "cacao"
  | "retraite";

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
  retraite: {
    label: "Retraite immersive",
    description: "Nuit étoilée, mandala doré, esprit immersion.",
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

/** Palette dorée par style — module juste glow/deep, structure identique. */
const STYLE_TINT: Record<GiftCardStyle, { glow: string; deep: string; handInk: string }> = {
  doree:       { glow: "#e8c98e", deep: "#a07a3c", handInk: "#c9a86a" },
  feminin:     { glow: "#e7c08e", deep: "#b78b4f", handInk: "#d3a86a" },
  cacao:       { glow: "#dca866", deep: "#7a4e2a", handInk: "#cf9a52" },
  retraite:    { glow: "#efd2a0", deep: "#a47438", handInk: "#caa05f" },
  reconnexion: { glow: "#e3c285", deep: "#8a6a3a", handInk: "#c9a86a" },
  elegance:    { glow: "#d9bd84", deep: "#6e5530", handInk: "#b89556" },
};

/**
 * Carte cadeau personnalisable — aperçu live et exportable en PNG.
 * Refondue 2026-05-02 sur le même langage visuel que PremiumGiftCard
 * (l'originale utilisée par Céline) : recto noir avec polaroid + sparkler
 * + diagonale dorée à droite portant le contenu personnalisé.
 *
 * Format paysage 7:5 (carte imprimée). Statique (pas de flip) — c'est un
 * aperçu unique qui sera exporté en PNG via html-to-image.
 *
 * `watermark` (true par défaut) ajoute :
 *  - une bande "APERÇU · NON VALIDE" diagonale + bandeau du haut
 *  - "REF: APERÇU" à la place du fromName
 */
export const GiftCardPreview = forwardRef<
  HTMLDivElement,
  { data: GiftCardData; watermark?: boolean }
>(function GiftCardPreview({ data, watermark = true }, ref) {
  const tint = STYLE_TINT[data.style];

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[7/5] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(31,26,46,0.18)] ring-1 ring-black/40 bg-[#0c0a0c]"
    >
      {/* === Fond noir + bokeh doré (côté gauche, pour le polaroid) === */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 22%, ${tint.glow}66 0%, transparent 28%),
            radial-gradient(circle at 38% 78%, ${tint.glow}44 0%, transparent 30%),
            radial-gradient(circle at 8% 60%, ${tint.glow}33 0%, transparent 30%),
            radial-gradient(ellipse at 22% 50%, #1a1418 0%, #0a0809 100%)
          `,
        }}
      />

      {/* Bokeh dots éparpillés à gauche */}
      {[
        { top: "12%", left: "6%", size: 14, opacity: 0.55, blur: 5 },
        { top: "28%", left: "18%", size: 10, opacity: 0.65, blur: 3 },
        { top: "76%", left: "8%", size: 18, opacity: 0.55, blur: 6 },
        { top: "62%", left: "30%", size: 12, opacity: 0.6, blur: 4 },
      ].map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: tint.glow,
            opacity: d.opacity,
            filter: `blur(${d.blur}px)`,
          }}
        />
      ))}

      {/* Étoiles 4 branches dans la zone noire gauche */}
      {[
        { top: "8%", left: "12%", size: 8, rotate: 0 },
        { top: "18%", left: "32%", size: 6, rotate: 25 },
        { top: "82%", left: "22%", size: 7, rotate: -10 },
        { top: "48%", left: "4%", size: 5, rotate: 15 },
      ].map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            color: tint.glow,
            opacity: 0.85,
            transform: `rotate(${s.rotate}deg)`,
          }}
        >
          <FourPointStar style={{ width: s.size, height: s.size }} />
        </div>
      ))}

      {/* === Diagonale dorée à droite portant le contenu personnalisé === */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: "polygon(38% 0%, 100% 0%, 100% 100%, 52% 100%)",
          background: `linear-gradient(135deg, ${tint.deep} 0%, ${tint.glow} 100%)`,
          boxShadow: `inset 1px 0 0 ${tint.glow}`,
        }}
      />

      {/* Paillettes dans la zone dorée */}
      {[
        { top: "16%", left: "62%", size: 2.5 },
        { top: "30%", left: "82%", size: 3 },
        { top: "48%", left: "70%", size: 2 },
        { top: "62%", left: "92%", size: 2.5 },
        { top: "78%", left: "78%", size: 2 },
      ].map((g, i) => (
        <span
          key={`g${i}`}
          aria-hidden
          className="absolute rounded-full"
          style={{
            top: g.top,
            left: g.left,
            width: g.size,
            height: g.size,
            background: tint.deep,
            opacity: 0.7,
            boxShadow: `0 0 ${g.size * 2}px #fff8e3aa`,
          }}
        />
      ))}

      {/* Étoiles 4 branches dorées scintillantes côté droit */}
      {[
        { top: "10%", left: "92%", size: 9, color: "#fff8e3" },
        { top: "26%", left: "60%", size: 6, color: tint.deep },
        { top: "70%", left: "62%", size: 7, color: "#fff8e3" },
        { top: "88%", left: "88%", size: 8, color: "#fff8e3" },
      ].map((s, i) => (
        <div
          key={`vs${i}`}
          aria-hidden
          className="absolute"
          style={{ top: s.top, left: s.left, color: s.color, opacity: 0.85 }}
        >
          <FourPointStar style={{ width: s.size, height: s.size }} />
        </div>
      ))}

      {/* === Polaroid à gauche avec sparkler === */}
      <div className="absolute left-[6%] top-1/2 -translate-y-1/2 w-[28%] -rotate-[4deg]">
        <div
          className="bg-[#fbf8f1] p-2 pb-6"
          style={{
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1212]">
            <Sparkler glow={tint.glow} />
          </div>
          <div className="absolute bottom-0.5 left-0 right-0 text-center">
            <p
              className="font-handwritten leading-none text-[0.65rem]"
              style={{ color: tint.handInk }}
            >
              Retrouver son
            </p>
            <p
              className="font-handwritten italic leading-tight text-[0.85rem]"
              style={{ color: tint.handInk }}
            >
              Etin&apos;Cel
            </p>
          </div>
          {/* Trombone doré */}
          <div
            aria-hidden
            className="absolute -top-2 right-3"
            style={{ color: tint.glow }}
          >
            <Paperclip
              style={{
                width: 18,
                height: 24,
                filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
              }}
            />
          </div>
        </div>
      </div>

      {/* === Contenu personnalisé sur la partie dorée === */}
      <div className="absolute right-0 top-0 h-full w-[55%] flex flex-col justify-between p-6 md:p-8">
        {/* En-tête : Pour + occasion */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <p
              className="text-[0.55rem] uppercase tracking-[0.32em]"
              style={{ color: "#fff8e3", opacity: 0.85 }}
            >
              Pour
            </p>
            {data.occasion && (
              <span
                className="text-[0.55rem] uppercase tracking-[0.24em] px-2 py-0.5 rounded-full border"
                style={{
                  color: "#fff8e3",
                  borderColor: "#fff8e3",
                  opacity: 0.85,
                }}
              >
                {data.occasion}
              </span>
            )}
          </div>
          <h3
            className="font-display text-2xl md:text-3xl leading-tight"
            style={{ color: "#fff8e3" }}
          >
            {data.toName ? (
              <span className="font-display-italic">{data.toName}</span>
            ) : (
              <span className="italic opacity-70">Pour vous</span>
            )}
          </h3>
        </div>

        {/* Centre : titre "Carte cadeau" + message personnel */}
        <div className="space-y-2">
          <p
            className="font-handwritten leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            style={{
              color: "#fff8e3",
              fontSize: "1.8rem",
              textShadow: `0 1px 0 ${tint.deep}`,
            }}
          >
            Carte
          </p>
          <p
            className="font-handwritten italic leading-tight -mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
            style={{
              color: "#fff8e3",
              fontSize: "2rem",
              textShadow: `0 1px 0 ${tint.deep}`,
            }}
          >
            cadeau
          </p>
          {data.message && (
            <p
              className="text-xs md:text-sm leading-snug italic max-w-[24ch] pt-1"
              style={{ color: "#fff8e3", opacity: 0.95 }}
            >
              « {data.message} »
            </p>
          )}
        </div>

        {/* Pied : type + montant + de la part de + identité */}
        <div className="space-y-2">
          <div className="flex items-end justify-between gap-3 pb-1.5 border-b border-white/30">
            <div className="space-y-0.5">
              <p
                className="text-[0.55rem] uppercase tracking-[0.32em]"
                style={{ color: "#fff8e3", opacity: 0.85 }}
              >
                {data.cardType || "Cadeau"}
              </p>
              <p
                className="font-display text-base md:text-lg leading-none"
                style={{ color: "#fff8e3" }}
              >
                {data.amount || "Montant à définir"}
              </p>
            </div>
            <div className="text-right space-y-0.5">
              <p
                className="text-[0.55rem] uppercase tracking-[0.28em]"
                style={{ color: "#fff8e3", opacity: 0.85 }}
              >
                {watermark ? "Référence" : "De la part de"}
              </p>
              <p
                className="font-display-italic text-sm md:text-base leading-none"
                style={{ color: "#fff8e3" }}
              >
                {watermark ? "APERÇU" : data.fromName || "—"}
              </p>
            </div>
          </div>
          <div className="space-y-0.5">
            <p
              className="font-handwritten italic leading-none"
              style={{ color: "#fff8e3", fontSize: "1.2rem" }}
            >
              Etin&apos;Cel
            </p>
            <p
              className="text-[0.55rem] italic leading-snug"
              style={{ color: "#fff8e3", opacity: 0.85 }}
            >
              Trouver l&apos;endroit en soi où tout est possible
            </p>
            <p
              className="text-[0.55rem] pt-0.5"
              style={{ color: "#fff8e3", opacity: 0.85 }}
            >
              {contact.phone} · etinceldebienetre.fr
            </p>
          </div>
        </div>
      </div>

      {/* === Watermark "APERÇU" === */}
      {watermark && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <span
              className="font-display-italic text-3xl md:text-5xl tracking-[0.3em] uppercase opacity-25 select-none"
              style={{
                transform: "rotate(-22deg)",
                color: "rgba(255, 255, 255, 0.55)",
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              Aperçu · Non valide
            </span>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 inset-x-0 bg-rose/85 text-white text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.32em] uppercase text-center py-1.5 z-10"
          >
            Aperçu — paiement non finalisé
          </div>
        </>
      )}
    </div>
  );
});
