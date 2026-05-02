"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/data";

type GiftCardTheme = "feminin" | "cacao" | "retraite" | "libre";
type GiftCardFormat = "portrait" | "landscape";

type Props = {
  /** Thème visuel — colore le polaroid au recto et la diagonale au verso. */
  theme?: GiftCardTheme;
  /** Format d'affichage : portrait (default, 5:7) ou landscape (16:9, façon carte imprimée). */
  format?: GiftCardFormat;
  /** Nom du destinataire (affiché au verso). Défaut "À une personne précieuse". */
  recipient?: string;
  /** Type de l'offre (affiché au verso). Défaut "Un moment d'écoute". */
  offerLabel?: string;
  /** Valeur affichée (ex: "120 €" ou "Sur demande"). */
  value?: string;
  /** Référence visible au verso (cosmétique). */
  reference?: string;
  /** Activer le clic pour flipper (en plus du hover). */
  clickable?: boolean;
  className?: string;
};

const THEME_TINT: Record<
  GiftCardTheme,
  {
    label: string;
    /** Teinte chaude des paillettes/bokeh — colore le verso et le sparkler. */
    glow: string;
    /** Teinte profonde de la diagonale au verso. */
    deep: string;
    /** Couleur du tampon manuscrit "Retrouver son Etin'Cel". */
    handInk: string;
  }
> = {
  feminin: {
    label: "Féminin & cacao",
    glow: "#e7c08e",
    deep: "#b78b4f",
    handInk: "#d3a86a",
  },
  cacao: {
    label: "Cérémonie cacao",
    glow: "#dca866",
    deep: "#7a4e2a",
    handInk: "#cf9a52",
  },
  retraite: {
    label: "Retraite & immersion",
    glow: "#efd2a0",
    deep: "#a47438",
    handInk: "#caa05f",
  },
  libre: {
    label: "Montant libre",
    glow: "#e8c98e",
    deep: "#a07a3c",
    handInk: "#c9a86a",
  },
};

/**
 * PremiumGiftCard — refondue 2026-05-02 d'après la carte cadeau originale
 * que Céline utilise déjà : recto noir profond + polaroid avec trombone +
 * texte manuscrit "Retrouver son Etin'Cel" + bokeh doré ; verso crème
 * avec souffle de paillettes dorées + bande diagonale dorée + identité.
 *
 * Le flip 3D recto/verso est conservé (interaction hover + clic). Quatre
 * teintes (feminin/cacao/retraite/libre) modulent la palette dorée. Deux
 * formats : portrait (5:7) ou landscape (16:9, façon carte imprimée).
 */
export function PremiumGiftCard({
  theme = "feminin",
  format = "portrait",
  recipient = "À une personne précieuse",
  offerLabel = "Un moment d'écoute",
  value = "Sur demande",
  reference = "EBE · 2026",
  clickable = true,
  className,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const tint = THEME_TINT[theme];
  const isLandscape = format === "landscape";

  const handleClick = () => {
    if (clickable) setIsFlipped((f) => !f);
  };

  return (
    <div
      className={cn(
        "gift-card-3d group relative w-full mx-auto",
        isLandscape ? "aspect-[16/9] max-w-2xl" : "aspect-[5/7] max-w-xs",
        clickable && "cursor-pointer",
        isFlipped && "is-flipped",
        className,
      )}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Carte cadeau ${tint.label} — cliquer pour retourner`}
    >
      {/* Halo doré derrière la carte */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-amber-200/25 via-amber-100/20 to-transparent blur-2xl -z-10"
      />

      <div className="gift-card-3d-inner">
        {/* ============== RECTO ============== */}
        <div
          className={cn(
            "gift-card-face gift-card-shine rounded-[1.4rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/40",
            "bg-[#0c0a0c]",
          )}
        >
          {/* Bokeh doré profond */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 18% 22%, ${tint.glow}66 0%, transparent 28%),
                radial-gradient(circle at 78% 18%, ${tint.glow}44 0%, transparent 22%),
                radial-gradient(circle at 88% 78%, ${tint.glow}66 0%, transparent 32%),
                radial-gradient(circle at 22% 82%, ${tint.glow}33 0%, transparent 30%),
                radial-gradient(ellipse at 50% 50%, #1a1418 0%, #0a0809 100%)
              `,
            }}
          />

          {/* Petites particules de bokeh — points lumineux flous */}
          {BOKEH_DOTS.map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute rounded-full motion-safe:animate-[twinkle_3.4s_ease-in-out_infinite]"
              style={{
                top: d.top,
                left: d.left,
                width: d.size,
                height: d.size,
                background: tint.glow,
                opacity: d.opacity,
                filter: `blur(${d.blur}px)`,
                animationDelay: d.delay,
              }}
            />
          ))}

          {/* Étoiles 4 branches scintillantes éparpillées */}
          {STARS.map((s, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute motion-safe:animate-[twinkle_2.8s_ease-in-out_infinite]"
              style={{
                top: s.top,
                left: s.left,
                color: tint.glow,
                opacity: s.opacity,
                animationDelay: s.delay,
                transform: `rotate(${s.rotate}deg)`,
              }}
            >
              <FourPointStar style={{ width: s.size, height: s.size }} />
            </div>
          ))}

          {/* Polaroid central, légèrement incliné */}
          <div className="absolute inset-0 flex items-center justify-center px-5 md:px-6">
            <div
              className={cn(
                "relative bg-[#fbf8f1] shadow-[0_18px_40px_rgba(0,0,0,0.55)]",
                "p-2.5 pb-7 md:p-3 md:pb-9",
                isLandscape
                  ? "w-[34%] -rotate-[4deg]"
                  : "w-[68%] -rotate-[3deg]",
              )}
              style={{
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              {/* Photo polaroid : sparkler CSS pur */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1212]">
                <Sparkler glow={tint.glow} />
              </div>

              {/* Texte manuscrit "Retrouver son Etin'Cel" */}
              <div className="absolute bottom-1.5 left-0 right-0 text-center">
                <p
                  className="font-handwritten leading-none"
                  style={{
                    color: tint.handInk,
                    fontSize: isLandscape ? "0.78rem" : "0.95rem",
                  }}
                >
                  Retrouver son
                </p>
                <p
                  className="font-handwritten leading-tight italic"
                  style={{
                    color: tint.handInk,
                    fontSize: isLandscape ? "0.95rem" : "1.15rem",
                  }}
                >
                  Etin&apos;Cel
                </p>
              </div>

              {/* Trombone doré métallique posé en haut à droite du polaroid */}
              <div
                aria-hidden
                className="absolute -top-3 right-4 md:right-6"
                style={{ color: tint.glow }}
              >
                <Paperclip
                  style={{
                    width: isLandscape ? 22 : 28,
                    height: isLandscape ? 28 : 38,
                    filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Coin info — référence + signature discrète */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-[0.55rem] uppercase tracking-[0.32em]">
            <span style={{ color: tint.glow, opacity: 0.7 }}>{tint.label}</span>
            <span style={{ color: tint.glow, opacity: 0.5 }}>{reference}</span>
          </div>
        </div>

        {/* ============== VERSO ============== */}
        <div
          className={cn(
            "gift-card-face gift-card-back rounded-[1.4rem] overflow-hidden shadow-[0_24px_60px_rgba(31,26,46,0.22)] ring-1 ring-black/10",
            "bg-[#f5ead4]",
          )}
        >
          {/* Photo "souffle de paillettes" — gradient chaud + paillettes en pluie */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 65% 38%, ${tint.glow}99 0%, transparent 45%),
                radial-gradient(ellipse at 30% 55%, ${tint.glow}40 0%, transparent 55%),
                linear-gradient(135deg, #f5ead4 0%, #ecdcb6 40%, #d6b988 100%)
              `,
            }}
          />

          {/* Pluie de paillettes dorées (dots scintillants) */}
          {GLITTER.map((g, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute rounded-full motion-safe:animate-[twinkle_2.6s_ease-in-out_infinite]"
              style={{
                top: g.top,
                left: g.left,
                width: g.size,
                height: g.size,
                background: tint.deep,
                opacity: g.opacity,
                animationDelay: g.delay,
                boxShadow: `0 0 ${g.size * 2}px ${tint.glow}88`,
              }}
            />
          ))}

          {/* Bande diagonale dorée — bas à gauche vers haut à droite */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              clipPath: isLandscape
                ? "polygon(0% 100%, 100% 100%, 100% 28%, 38% 100%)"
                : "polygon(0% 100%, 100% 100%, 100% 38%, 12% 100%)",
              background: `linear-gradient(135deg, ${tint.deep} 0%, ${tint.glow} 100%)`,
              boxShadow: `inset 0 1px 0 ${tint.glow}`,
            }}
          />

          {/* Étoiles dorées scintillantes au verso */}
          {VERSO_STARS.map((s, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute motion-safe:animate-[twinkle_3.2s_ease-in-out_infinite]"
              style={{
                top: s.top,
                left: s.left,
                color: i < 2 ? tint.deep : "#fff8e3",
                opacity: s.opacity,
                animationDelay: s.delay,
                transform: `rotate(${s.rotate}deg)`,
              }}
            >
              <FourPointStar style={{ width: s.size, height: s.size }} />
            </div>
          ))}

          {/* Contenu verso */}
          <div
            className={cn(
              "relative h-full flex flex-col p-5 md:p-7",
              isLandscape ? "justify-between" : "justify-between",
            )}
          >
            {/* En-tête : "Pour" + destinataire */}
            <div className="space-y-1">
              <p className="text-[0.55rem] uppercase tracking-[0.32em] text-stone-700/70">
                Pour
              </p>
              <p
                className={cn(
                  "font-display leading-tight text-stone-900",
                  isLandscape ? "text-base md:text-lg" : "text-lg md:text-xl",
                )}
              >
                {recipient}
              </p>
            </div>

            {/* Centre : titre "Carte cadeau" en manuscrit blanc */}
            <div className="relative z-10 text-center my-2">
              <p
                className="font-handwritten leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                style={{
                  color: "#fff8e3",
                  fontSize: isLandscape ? "2.2rem" : "2.6rem",
                  textShadow: `0 1px 0 ${tint.deep}, 0 0 30px ${tint.glow}66`,
                }}
              >
                Carte
              </p>
              <p
                className="font-handwritten leading-tight italic -mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                style={{
                  color: "#fff8e3",
                  fontSize: isLandscape ? "2.4rem" : "2.8rem",
                  textShadow: `0 1px 0 ${tint.deep}, 0 0 30px ${tint.glow}66`,
                }}
              >
                cadeau
              </p>
            </div>

            {/* Bloc identité + offre, posé sur la diagonale dorée */}
            <div className="relative z-10 space-y-2.5">
              {/* Offre */}
              <div className="space-y-0.5">
                <p
                  className="text-[0.55rem] uppercase tracking-[0.32em]"
                  style={{ color: "#fff8e3", opacity: 0.85 }}
                >
                  Offre
                </p>
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className="font-display leading-snug"
                    style={{ color: "#fff8e3" }}
                  >
                    {offerLabel}
                  </p>
                  <p
                    className="font-display-italic whitespace-nowrap"
                    style={{
                      color: "#fff8e3",
                      fontSize: isLandscape ? "1.05rem" : "1.15rem",
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>

              {/* Identité Etin'Cel */}
              <div className="pt-1.5 border-t border-white/30 space-y-0.5">
                <p
                  className="font-handwritten italic leading-none"
                  style={{
                    color: "#fff8e3",
                    fontSize: isLandscape ? "1.4rem" : "1.6rem",
                  }}
                >
                  Etin&apos;Cel
                </p>
                <p
                  className="text-[0.6rem] tracking-wide italic"
                  style={{ color: "#fff8e3", opacity: 0.85 }}
                >
                  Trouver l&apos;endroit en soi où tout est possible
                </p>
                <div
                  className="flex items-center gap-2 text-[0.6rem] pt-0.5"
                  style={{ color: "#fff8e3", opacity: 0.9 }}
                >
                  <span>Tél&nbsp;: {contact.phone}</span>
                  <span aria-hidden>·</span>
                  <span className="truncate">etinceldebienetre.fr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur "cliquer pour retourner" — visible au hover */}
      {clickable && (
        <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.28em] text-text-soft opacity-0 group-hover:opacity-70 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {isFlipped ? "Retour" : "Retourner la carte"}
        </p>
      )}
    </div>
  );
}

/* -----------------------------------------------------------
 * Sparkler SVG — feu de Bengale stylisé en SVG, posé sur une
 * scène d'ambiance floutée (cosy, bougies, déco) en bokeh.
 * ----------------------------------------------------------- */
export function Sparkler({
  glow,
  backgroundSrc = "/images/celine-2026/soin.jpg",
}: {
  glow: string;
  /** Photo d'ambiance affichée floutée en arrière-plan derrière l'étincelle. */
  backgroundSrc?: string;
}) {
  const RAYS = 28;
  return (
    <div className="absolute inset-0">
      {/* Photo d'ambiance floutée en arrière-plan (cosy, on devine la scène) */}
      {backgroundSrc && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${backgroundSrc}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px) brightness(0.7) saturate(1.4) contrast(1.1)",
            transform: "scale(1.12)",
          }}
        />
      )}

      {/* Vignettage doux pour ramener l'attention vers le centre */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Halo doré diffus posé sur la photo, autour du sparkler uniquement */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glow}55 0%, ${glow}22 18%, transparent 40%)`,
        }}
      />

      <svg
        viewBox="-50 -50 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="sparkler-core">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#fff3b8" stopOpacity="0.95" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sparkler-ray" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#fff3b8" stopOpacity="0.9" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Halo lumineux derrière le cœur */}
        <circle cx="0" cy="0" r="22" fill="url(#sparkler-core)" opacity="0.85" />

        {/* Rayons rayonnants — 28 traits émergeant du centre */}
        <g stroke="url(#sparkler-ray)" strokeLinecap="round" strokeWidth="0.9">
          {Array.from({ length: RAYS }).map((_, i) => {
            const angle = (i * 360) / RAYS;
            const len = 30 + ((i * 11) % 14);
            const rad = (angle * Math.PI) / 180;
            const x2 = Math.cos(rad) * len;
            const y2 = Math.sin(rad) * len;
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={x2}
                y2={y2}
                opacity={i % 2 ? 0.75 : 0.55}
              />
            );
          })}
        </g>

        {/* Cœur incandescent — point blanc avec halo flou */}
        <circle cx="0" cy="0" r="4.5" fill="#ffffff">
          <animate
            attributeName="r"
            values="4;5.5;4"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="0" cy="0" r="2" fill="#ffffff" />

        {/* Particules satellites */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 + 12) * (Math.PI / 180);
          const r = 28 + (i % 3) * 5;
          return (
            <circle
              key={`p${i}`}
              cx={Math.cos(angle) * r}
              cy={Math.sin(angle) * r}
              r={i % 2 ? 0.6 : 1}
              fill={glow}
              opacity={0.85}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.95;0.3"
                dur={`${1.6 + (i % 4) * 0.4}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.15) % 2}s`}
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

/* -----------------------------------------------------------
 * Trombone doré métallique — SVG inline simple et élégant.
 * ----------------------------------------------------------- */
export function Paperclip({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden
    >
      {/* Boucle externe */}
      <path d="M 6 6 L 6 26 Q 6 32, 12 32 Q 18 32, 18 26 L 18 10 Q 18 6, 14 6 Q 10 6, 10 10 L 10 24" />
    </svg>
  );
}

/* -----------------------------------------------------------
 * Étoile à 4 branches scintillante — rendu net, pas de halo dur.
 * Forme classique d'étoile filante (sparkle).
 * ----------------------------------------------------------- */
export function FourPointStar({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden>
      <path d="M 12 0 L 13.4 10.6 L 24 12 L 13.4 13.4 L 12 24 L 10.6 13.4 L 0 12 L 10.6 10.6 Z" />
    </svg>
  );
}

/* ============================================================
 * Constantes décoratives (positions & tailles fixes — évite le
 * recalcul aléatoire à chaque render et garde le SSR stable).
 * ============================================================ */

const BOKEH_DOTS = [
  { top: "12%", left: "8%", size: 14, opacity: 0.55, blur: 5, delay: "0s" },
  { top: "8%", left: "82%", size: 18, opacity: 0.6, blur: 6, delay: "0.6s" },
  { top: "32%", left: "62%", size: 10, opacity: 0.7, blur: 3, delay: "1.2s" },
  { top: "68%", left: "12%", size: 16, opacity: 0.6, blur: 5, delay: "0.3s" },
  { top: "84%", left: "72%", size: 22, opacity: 0.5, blur: 7, delay: "1.6s" },
  { top: "48%", left: "92%", size: 12, opacity: 0.65, blur: 4, delay: "0.9s" },
  { top: "92%", left: "38%", size: 14, opacity: 0.5, blur: 5, delay: "2.1s" },
  { top: "22%", left: "28%", size: 8, opacity: 0.75, blur: 2, delay: "1.5s" },
] as const;

const STARS = [
  { top: "6%", left: "16%", size: 9, opacity: 0.85, delay: "0s", rotate: 0 },
  { top: "10%", left: "70%", size: 7, opacity: 0.9, delay: "1.1s", rotate: 25 },
  { top: "26%", left: "8%", size: 5, opacity: 0.8, delay: "0.6s", rotate: -10 },
  { top: "28%", left: "88%", size: 6, opacity: 0.85, delay: "1.6s", rotate: 12 },
  { top: "78%", left: "8%", size: 6, opacity: 0.85, delay: "0.4s", rotate: 18 },
  { top: "82%", left: "82%", size: 9, opacity: 0.9, delay: "1.3s", rotate: -8 },
  { top: "92%", left: "44%", size: 5, opacity: 0.75, delay: "2s", rotate: 30 },
] as const;

const GLITTER = [
  { top: "12%", left: "18%", size: 2, opacity: 0.6, delay: "0s" },
  { top: "18%", left: "62%", size: 3, opacity: 0.75, delay: "0.5s" },
  { top: "26%", left: "38%", size: 2, opacity: 0.55, delay: "1.1s" },
  { top: "32%", left: "82%", size: 2.5, opacity: 0.7, delay: "0.3s" },
  { top: "44%", left: "20%", size: 2, opacity: 0.6, delay: "1.4s" },
  { top: "48%", left: "70%", size: 3, opacity: 0.75, delay: "0.8s" },
  { top: "56%", left: "48%", size: 2, opacity: 0.5, delay: "1.7s" },
  { top: "62%", left: "12%", size: 2.5, opacity: 0.65, delay: "0.6s" },
  { top: "12%", left: "88%", size: 2, opacity: 0.7, delay: "2s" },
  { top: "38%", left: "8%", size: 2.5, opacity: 0.6, delay: "1.2s" },
] as const;

const VERSO_STARS = [
  { top: "20%", left: "8%", size: 11, opacity: 0.85, delay: "0s", rotate: 0 },
  { top: "10%", left: "82%", size: 8, opacity: 0.75, delay: "0.8s", rotate: 18 },
  { top: "60%", left: "78%", size: 9, opacity: 0.85, delay: "1.4s", rotate: -10 },
  { top: "78%", left: "92%", size: 7, opacity: 0.8, delay: "0.4s", rotate: 22 },
  { top: "88%", left: "12%", size: 6, opacity: 0.7, delay: "1.6s", rotate: -15 },
] as const;
