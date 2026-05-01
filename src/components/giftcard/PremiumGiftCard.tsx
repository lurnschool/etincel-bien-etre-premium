"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Etincelle } from "@/components/ui/Etincelle";

type GiftCardTheme = "feminin" | "cacao" | "retraite" | "libre";

type Props = {
  /** Thème visuel de la carte. Défaut "feminin". */
  theme?: GiftCardTheme;
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

const THEME_STYLES: Record<
  GiftCardTheme,
  {
    label: string;
    gradient: string;
    accent: string;
    motif: string;
  }
> = {
  feminin: {
    label: "Féminin & cacao",
    gradient:
      "bg-[linear-gradient(135deg,#f4d3c2_0%,#e0a988_50%,#a06548_100%)]",
    accent: "#7a4630",
    motif:
      "radial-gradient(circle at 20% 25%, rgba(255,215,150,0.30) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(122,70,48,0.25) 0%, transparent 45%)",
  },
  cacao: {
    label: "Cérémonie cacao",
    gradient:
      "bg-[linear-gradient(135deg,#7a5037_0%,#4e3220_55%,#2c1c12_100%)]",
    accent: "#ead7af",
    motif:
      "radial-gradient(circle at 30% 30%, rgba(255,215,150,0.22) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,200,110,0.12) 0%, transparent 50%)",
  },
  retraite: {
    label: "Retraite & immersion",
    gradient:
      "bg-[linear-gradient(135deg,#fce8d4_0%,#f0c9a3_55%,#a06548_100%)]",
    accent: "#5e3724",
    motif:
      "radial-gradient(ellipse at 50% 100%, rgba(94,55,36,0.30) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(255,240,200,0.35) 0%, transparent 50%)",
  },
  libre: {
    label: "Montant libre",
    gradient:
      "bg-[linear-gradient(135deg,#f4e8d2_0%,#e6c79a_60%,#caa376_100%)]",
    accent: "#7a5d3a",
    motif:
      "radial-gradient(circle at 70% 25%, rgba(255,235,180,0.40) 0%, transparent 50%), radial-gradient(circle at 25% 80%, rgba(122,93,58,0.20) 0%, transparent 50%)",
  },
};

/**
 * PremiumGiftCard — carte cadeau premium avec flip 3D recto/verso.
 *
 * Sprint F : module cadeau premium et désirable.
 *
 * Composition :
 *  - Container `.gift-card-3d` avec perspective 1400px
 *  - Inner avec transform-style preserve-3d
 *  - Recto : visuel premium thématique (feminin/cacao/retraite/libre)
 *    + signature manuscrite "Etincel" + étincelle dorée + texte "Carte cadeau"
 *  - Verso : informations (destinataire, offre, valeur, référence)
 *  - Animation flip au hover ET au clic (state interne)
 *  - Sweep doré qui passe au hover (effet lumière qui glisse)
 *  - Effet papier réaliste : bord avec ring + ombre profonde
 *
 * Usage typique :
 *   <PremiumGiftCard theme="cacao" recipient="Marie" offerLabel="Cérémonie cacao" value="60 €" />
 */
export function PremiumGiftCard({
  theme = "feminin",
  recipient = "À une personne précieuse",
  offerLabel = "Un moment d'écoute",
  value = "Sur demande",
  reference = "EBE · 2026",
  clickable = true,
  className,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const styles = THEME_STYLES[theme];

  const handleClick = () => {
    if (clickable) setIsFlipped((f) => !f);
  };

  return (
    <div
      className={cn(
        "gift-card-3d relative w-full aspect-[5/7] max-w-xs mx-auto",
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
      aria-label={`Carte cadeau ${styles.label} — cliquer pour retourner`}
    >
      {/* Halo doré derrière la carte — donne profondeur premium */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-rose-soft/30 via-gold-soft/40 to-transparent blur-2xl -z-10"
      />

      <div className="gift-card-3d-inner">
        {/* === RECTO === */}
        <div
          className={cn(
            "gift-card-face gift-card-shine rounded-[1.4rem] overflow-hidden shadow-[0_24px_60px_rgba(31,26,46,0.22)] ring-1 ring-bg-base/20",
            styles.gradient,
          )}
        >
          {/* Motif décoratif radial sur le recto */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: styles.motif }}
          />

          {/* Grain de papier subtil */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Cadre élégant double — premium éditorial */}
          <div
            aria-hidden
            className="absolute inset-3 rounded-[1.1rem]"
            style={{ boxShadow: `inset 0 0 0 1px ${styles.accent}40` }}
          />
          <div
            aria-hidden
            className="absolute inset-[14px] rounded-[1rem]"
            style={{ boxShadow: `inset 0 0 0 1px ${styles.accent}18` }}
          />

          {/* Ornements de coin façon Art Déco — 4 angles */}
          {[
            { pos: "top-3.5 left-3.5", rotate: "0deg" },
            { pos: "top-3.5 right-3.5", rotate: "90deg" },
            { pos: "bottom-3.5 right-3.5", rotate: "180deg" },
            { pos: "bottom-3.5 left-3.5", rotate: "270deg" },
          ].map((c, i) => (
            <div
              key={i}
              aria-hidden
              className={`absolute ${c.pos}`}
              style={{ color: styles.accent, transform: `rotate(${c.rotate})` }}
            >
              <CornerOrnament className="h-5 w-5 opacity-65" />
            </div>
          ))}

          {/* Monogramme É en watermark central très diffus */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <p
              className="font-display select-none leading-none"
              style={{
                color: styles.accent,
                opacity: 0.07,
                fontSize: "16rem",
                fontStyle: "italic",
              }}
            >
              É
            </p>
          </div>

          {/* Constellation de petites étincelles secondaires */}
          {[
            { top: "18%", left: "14%", size: 6, delay: "0s" },
            { top: "32%", left: "78%", size: 5, delay: "1.4s" },
            { top: "62%", left: "20%", size: 4, delay: "0.7s" },
            { top: "76%", left: "70%", size: 5, delay: "2.1s" },
          ].map((s, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute motion-safe:animate-[twinkle_3s_ease-in-out_infinite]"
              style={{
                top: s.top,
                left: s.left,
                color: styles.accent,
                opacity: 0.5,
                animationDelay: s.delay,
              }}
            >
              <SparkleIcon style={{ width: s.size, height: s.size }} />
            </div>
          ))}

          {/* Étincelle décorative principale en haut à droite */}
          <div
            className="absolute top-5 right-5 motion-safe:animate-[center-pulse_3s_ease-in-out_infinite]"
            style={{ color: styles.accent }}
            aria-hidden
          >
            <SparkleIcon className="h-5 w-5" />
          </div>

          {/* Contenu principal du recto — composition premium */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
            {/* En-tête : libellé thématique */}
            <div>
              <p
                className="text-[0.6rem] uppercase tracking-[0.36em] font-medium opacity-90"
                style={{ color: styles.accent }}
              >
                {styles.label}
              </p>
            </div>

            {/* Centre : titre carte cadeau cursif */}
            <div className="text-center space-y-2">
              <p
                className="font-handwritten text-3xl md:text-4xl leading-none"
                style={{
                  color: styles.accent,
                  textShadow: `0 0 20px ${styles.accent}40`,
                }}
              >
                Carte
              </p>
              <p
                className="font-handwritten text-3xl md:text-4xl leading-none"
                style={{
                  color: styles.accent,
                  textShadow: `0 0 20px ${styles.accent}40`,
                }}
              >
                cadeau
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${styles.accent}, transparent)`,
                  }}
                />
                <Etincelle size={9} />
                <span
                  className="h-px w-8"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${styles.accent}, transparent)`,
                  }}
                />
              </div>
            </div>

            {/* Pied : signature Etincel manuscrite */}
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p
                  className="text-[0.55rem] uppercase tracking-[0.32em] opacity-75"
                  style={{ color: styles.accent }}
                >
                  Étincel
                </p>
                <p
                  className="font-display-italic text-xs opacity-80"
                  style={{ color: styles.accent }}
                >
                  Céline Dusseval
                </p>
              </div>
              <p
                className="text-[0.55rem] uppercase tracking-[0.28em] opacity-60"
                style={{ color: styles.accent }}
              >
                {reference}
              </p>
            </div>
          </div>
        </div>

        {/* === VERSO === */}
        <div
          className={cn(
            "gift-card-face gift-card-back rounded-[1.4rem] overflow-hidden shadow-[0_24px_60px_rgba(31,26,46,0.22)] ring-1 ring-bg-base/30",
            "bg-gradient-to-br from-bg-base via-bg-soft to-bg-base",
          )}
        >
          {/* Bord doré */}
          <div
            aria-hidden
            className="absolute inset-3 rounded-[1.1rem] border border-gold-soft/50"
          />

          {/* Filigrane Etincel très discret */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <p className="font-handwritten text-7xl text-gold-deep/8 rotate-[-15deg] select-none">
              Étincel
            </p>
          </div>

          {/* Contenu verso */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
            {/* En-tête : "Pour" */}
            <div className="space-y-2">
              <p className="text-[0.55rem] uppercase tracking-[0.32em] text-text-soft">
                Pour
              </p>
              <p className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                {recipient}
              </p>
            </div>

            {/* Centre : offre */}
            <div className="space-y-3 py-4 border-y border-gold-soft/40">
              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.32em] text-text-soft mb-1">
                  Offre
                </p>
                <p className="font-display text-base md:text-lg text-text-deep leading-snug">
                  {offerLabel}
                </p>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-[0.55rem] uppercase tracking-[0.32em] text-text-soft">
                  Valeur
                </p>
                <p className="font-display-italic text-lg md:text-xl text-gold-deep">
                  {value}
                </p>
              </div>
            </div>

            {/* Pied : référence + signature */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Etincelle size={9} />
                <p className="font-display-italic text-sm text-text-deep">
                  Avec délicatesse, Céline.
                </p>
              </div>
              <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.28em] text-text-soft pt-2 border-t border-gold-soft/30">
                <span>Réf · {reference}</span>
                <span>etinceldebienetre.fr</span>
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

function SparkleIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M 12 0 L 13.4 10.6 L 24 12 L 13.4 13.4 L 12 24 L 10.6 13.4 L 0 12 L 10.6 10.6 Z" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Petit ornement de coin Art Déco — 2 lignes courbées + point central.
 * Décor premium qui habille les angles de la carte sans surcharger.
 */
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M 2 8 Q 2 2, 8 2" />
      <path d="M 2 4 Q 4 2, 6 4" opacity="0.6" />
      <circle cx="3.5" cy="3.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
