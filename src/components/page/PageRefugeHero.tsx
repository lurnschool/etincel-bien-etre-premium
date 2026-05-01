import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { cn } from "@/lib/utils";

type CtaConfig = {
  label: string;
  href: string;
};

/**
 * Variantes de mise en scène du hero — chaque page est une "pièce"
 * différente du refuge. Sprint C : la cohérence vient des composants
 * partagés ; la différenciation vient des variants.
 */
export type HeroVariant =
  | "portrait" // défaut — texte gauche, photo droite (4:5), paper-warm
  | "ritual"   // centré, photo en bas chaude (terre cuite/cacao), atmosphère enveloppante
  | "circle"   // vertical, photo carrée centrée au-dessus, palette nuit profonde
  | "movement" // photo bandeau pleine largeur 21:9 + texte centré dessous, palette eau/sauge
  | "nature"   // photo bandeau ample + texte respirant, palette horizon
  | "gift"     // gauche carte stylisée, droite texte, palette papier kraft
  | "contact"; // minimal sans photo, texte centré, fond neutre clair

type Props = {
  /** Petit chapeau (uppercase espacé). */
  eyebrow: string;
  /** Phrase d'introduction italique courte (optionnelle). */
  greeting?: string;
  /** Titre principal (peut contenir du JSX, italique). */
  title: React.ReactNode;
  /** Texte d'accompagnement court (1-2 lignes). */
  body?: React.ReactNode;
  /** CTA principal doux. */
  primaryCta?: CtaConfig;
  /** CTA secondaire (souvent WhatsApp ou contact). */
  secondaryCta?: CtaConfig;
  /** ID de visual dans visualAssetMap (selon variant). */
  visualId?: string;
  /** Variante de mise en scène — défaut "portrait". */
  variant?: HeroVariant;
  /** Permet de marquer ce hero comme attente d'une voix Céline. */
  contentStatus?: "ok" | "waiting-celine-voice" | "waiting-final-copy";
};

/**
 * Configuration par variant : fond, couleur d'accent, pré-réglages
 * de mise en page. Toutes les variantes partagent la typo, les CTA
 * doux et l'animation `animate-fade-up` — la différence vient du
 * layout, du fond et du traitement de l'image.
 */
const VARIANT_BG: Record<HeroVariant, string> = {
  portrait: "paper-warm",
  ritual: "bg-[linear-gradient(135deg,#fbeadf,#f5dfd9_45%,#e0a988_100%)]",
  // Sprint E : circle adouci — sortie du fond nuit profonde "cosmique"
  // pour passer en papier sable doré, plus ancré et humain.
  circle: "bg-[linear-gradient(180deg,#fbf7ef_0%,#f1eadc_55%,#ead7af_100%)]",
  movement: "bg-[linear-gradient(180deg,#fbf7ef_0%,#dfe5d4_55%,#b6c2a8_100%)]",
  nature: "bg-[linear-gradient(180deg,#fce8d4_0%,#f0c9a3_55%,#d39775_100%)]",
  gift: "bg-[linear-gradient(135deg,#f4e8d2_0%,#e6c79a_60%,#caa376_100%)]",
  contact: "bg-bg-base",
};

const VARIANT_ACCENT_TEXT: Record<HeroVariant, string> = {
  portrait: "text-text-soft",
  ritual: "text-[#7a4630]",
  circle: "text-text-soft",
  movement: "text-[#5e7359]",
  nature: "text-[#8a4f37]",
  gift: "text-[#7a5d3a]",
  contact: "text-text-soft",
};

const VARIANT_GREETING_COLOR: Record<HeroVariant, string> = {
  portrait: "text-gold-deep",
  ritual: "text-[#a04a32]",
  circle: "text-gold-deep",
  movement: "text-[#4a6353]",
  nature: "text-[#a8542d]",
  gift: "text-[#8b6936]",
  contact: "text-gold-deep",
};

const VARIANT_TITLE_COLOR: Record<HeroVariant, string> = {
  portrait: "text-text-deep",
  ritual: "text-[#3a2418]",
  circle: "text-text-deep",
  movement: "text-text-deep",
  nature: "text-[#3a2418]",
  gift: "text-[#3a2418]",
  contact: "text-text-deep",
};

const VARIANT_BODY_COLOR: Record<HeroVariant, string> = {
  portrait: "text-text-medium",
  ritual: "text-[#5e3a28]",
  circle: "text-text-medium",
  movement: "text-text-medium",
  nature: "text-[#5e3a28]",
  gift: "text-[#5a4530]",
  contact: "text-text-medium",
};

/**
 * PageRefugeHero — hero refuge réutilisable, mais avec 7 mises en scène.
 *
 * Sprint C "pages-pièces" : chaque page du refuge est une pièce
 * différente — la cohérence vient des CTA doux et du système typographique,
 * la différenciation vient du `variant`.
 *
 * Toutes les variantes :
 *  - text-on-fond garantissant le contraste
 *  - animate-fade-up sur le texte
 *  - PT 68 px (sous le header fixed)
 *  - max-w-7xl + padding standard
 *
 * Sans Framer Motion (problème opacity:0 en static export — voir commit
 * 55037c0 pour le fix).
 */
export function PageRefugeHero({
  eyebrow,
  greeting,
  title,
  body,
  primaryCta,
  secondaryCta,
  visualId,
  variant = "portrait",
  contentStatus = "ok",
}: Props) {
  return (
    <section
      data-content-status={contentStatus}
      data-hero-variant={variant}
      className={cn(
        "relative w-full overflow-hidden pt-[68px] md:pt-[68px]",
        VARIANT_BG[variant],
      )}
    >
      {/* Composition par variant */}
      {variant === "portrait" && (
        <PortraitLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "ritual" && (
        <RitualLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "circle" && (
        <CircleLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "movement" && (
        <MovementLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "nature" && (
        <NatureLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "gift" && (
        <GiftLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          visualId={visualId}
          variant={variant}
        />
      )}
      {variant === "contact" && (
        <ContactLayout
          eyebrow={eyebrow}
          greeting={greeting}
          title={title}
          body={body}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          variant={variant}
        />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sous-composants — un par variant                                          */
/* -------------------------------------------------------------------------- */

type LayoutProps = {
  eyebrow: string;
  greeting?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  primaryCta?: CtaConfig;
  secondaryCta?: CtaConfig;
  visualId?: string;
  variant: HeroVariant;
};

function HeroEyebrow({ children, variant }: { children: React.ReactNode; variant: HeroVariant }) {
  return (
    <div className={cn("inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em]", VARIANT_ACCENT_TEXT[variant])}>
      <span className="text-gold-deep">
        <Etincelle size={11} />
      </span>
      <span>{children}</span>
    </div>
  );
}

function HeroGreeting({ children, variant }: { children: React.ReactNode; variant: HeroVariant }) {
  return (
    <p className={cn("font-display-italic text-xl md:text-2xl leading-tight", VARIANT_GREETING_COLOR[variant])}>
      {children}
    </p>
  );
}

function HeroTitle({ children, variant, size = "lg" }: { children: React.ReactNode; variant: HeroVariant; size?: "lg" | "xl" }) {
  return (
    <h1
      className={cn(
        "font-display text-balance leading-[1.08] tracking-tight",
        size === "xl"
          ? "text-[2.6rem] sm:text-5xl lg:text-[4rem]"
          : "text-[2.2rem] sm:text-4xl lg:text-[3.2rem]",
        VARIANT_TITLE_COLOR[variant],
      )}
    >
      {children}
    </h1>
  );
}

function HeroBody({ children, variant }: { children: React.ReactNode; variant: HeroVariant }) {
  return (
    <div className={cn("text-base md:text-lg leading-relaxed max-w-xl", VARIANT_BODY_COLOR[variant])}>
      {children}
    </div>
  );
}

function HeroCtas({ primaryCta, secondaryCta, variant }: { primaryCta?: CtaConfig; secondaryCta?: CtaConfig; variant: HeroVariant }) {
  if (!primaryCta && !secondaryCta) return null;
  // Sprint E : plus de variant sombre — tous les hero sont sur fond clair
  void variant;
  const secondaryClass =
    "border-text-deep/15 text-text-deep hover:border-accent hover:text-accent";
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {primaryCta && (
        <Link
          href={primaryCta.href}
          className="soft-glow group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
        >
          {primaryCta.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors",
            secondaryClass,
          )}
        >
          <MessageSquare className="h-4 w-4" />
          {secondaryCta.label}
        </Link>
      )}
    </div>
  );
}

/** PORTRAIT — texte gauche, photo droite (défaut, conservé Sprint B). */
function PortraitLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20 lg:py-24">
      <div className={cn("grid gap-12 items-center", visualId ? "lg:grid-cols-12 lg:gap-16" : "max-w-3xl")}>
        <div className={cn("space-y-6 animate-fade-up", visualId && "lg:col-span-7 lg:order-1 order-2")}>
          <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
          <div className="space-y-3">
            {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
            <HeroTitle variant={variant}>{title}</HeroTitle>
          </div>
          {body && <HeroBody variant={variant}>{body}</HeroBody>}
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
        </div>
        {visualId && (
          <div className="lg:col-span-5 lg:order-2 order-1 animate-fade-up">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div aria-hidden className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-rose-soft/35 via-gold-soft/25 to-transparent blur-xl -z-10" />
              <VisualAsset id={visualId} ratio="4:5" priority className="rounded-[1.75rem] shadow-[0_14px_40px_rgba(31,26,46,0.10)]" sizes="(max-width: 1024px) 80vw, 35vw" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** RITUAL — centré, photo carrée chaude posée en bas sur fond terre cuite. */
function RitualLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative mx-auto max-w-5xl px-6 md:px-10 py-20 md:py-28">
      <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-up">
        <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
        <div className="space-y-3">
          {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
          <HeroTitle variant={variant}>{title}</HeroTitle>
        </div>
        {body && (
          <div className="mx-auto">
            <HeroBody variant={variant}>{body}</HeroBody>
          </div>
        )}
        <div className="flex justify-center pt-1">
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
        </div>
      </div>
      {visualId && (
        <div className="mt-12 md:mt-16 max-w-md mx-auto animate-fade-up">
          <div className="relative">
            <div aria-hidden className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#fff0d5]/45 via-[#caa093]/25 to-transparent blur-2xl -z-10" />
            <VisualAsset
              id={visualId}
              ratio="1:1"
              priority
              className="rounded-full overflow-hidden shadow-[0_18px_40px_rgba(74,30,12,0.18)] ring-1 ring-[#a04a32]/20"
              sizes="(max-width: 1024px) 70vw, 28rem"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** CIRCLE — vertical, photo carrée au-dessus. Sprint E : palette sable
    dorée claire (au lieu de nuit profonde cosmique). Plus ancré. */
function CircleLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-22">
      {visualId && (
        <div className="mb-10 md:mb-14 max-w-xs mx-auto animate-fade-up">
          <div className="relative">
            <div aria-hidden className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(234,215,175,0.45)_0%,rgba(234,215,175,0)_75%)] blur-xl" />
            <VisualAsset
              id={visualId}
              ratio="1:1"
              priority
              className="rounded-full overflow-hidden shadow-[0_14px_36px_rgba(31,26,46,0.18)] ring-1 ring-gold-deep/35"
              sizes="(max-width: 1024px) 65vw, 22rem"
            />
          </div>
        </div>
      )}
      <div className="text-center space-y-6 animate-fade-up">
        <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
        <div className="space-y-3">
          {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
          <HeroTitle variant={variant} size="xl">{title}</HeroTitle>
        </div>
        {body && (
          <div className="mx-auto">
            <HeroBody variant={variant}>{body}</HeroBody>
          </div>
        )}
        <div className="flex justify-center pt-1">
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
        </div>
      </div>
    </div>
  );
}

/** MOVEMENT — bandeau visuel large + texte centré dessous, palette eau/sauge. */
function MovementLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative">
      {visualId && (
        <div className="relative w-full h-[35vh] md:h-[42vh] overflow-hidden animate-fade-up">
          <VisualAsset
            id={visualId}
            fill
            priority
            sizes="100vw"
            imageClassName="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#9cb094]/55 via-transparent to-transparent" />
        </div>
      )}
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-20 -mt-8 md:-mt-12">
        <div className="rounded-[1.75rem] bg-bg-base/95 backdrop-blur-md border border-border-soft px-7 md:px-12 py-10 md:py-12 text-center space-y-6 animate-fade-up shadow-[0_18px_40px_rgba(31,26,46,0.08)]">
          <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
          <div className="space-y-3">
            {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
            <HeroTitle variant={variant}>{title}</HeroTitle>
          </div>
          {body && (
            <div className="mx-auto">
              <HeroBody variant={variant}>{body}</HeroBody>
            </div>
          )}
          <div className="flex justify-center pt-1">
            <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** NATURE — bandeau ample + texte respirant centré, palette horizon. */
function NatureLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative">
      {visualId && (
        <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden animate-fade-up">
          <VisualAsset
            id={visualId}
            fill
            priority
            sizes="100vw"
            imageClassName="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3a2418]/30" />
        </div>
      )}
      <div className="relative mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20 text-center space-y-6 animate-fade-up">
        <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
        <div className="space-y-3">
          {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
          <HeroTitle variant={variant} size="xl">{title}</HeroTitle>
        </div>
        {body && (
          <div className="mx-auto">
            <HeroBody variant={variant}>{body}</HeroBody>
          </div>
        )}
        <div className="flex justify-center pt-1">
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
        </div>
      </div>
    </div>
  );
}

/** GIFT — carte enveloppe à gauche, texte droite, palette papier kraft. */
function GiftLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, visualId, variant }: LayoutProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Carte cadeau stylisée */}
        <div className="lg:col-span-5 lg:order-1 order-2 animate-fade-up">
          <div className="relative max-w-sm mx-auto lg:max-w-none rotate-[-2deg]">
            <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#fff0d5]/45 via-[#caa376]/30 to-transparent blur-xl -z-10" />
            <div className="relative aspect-[5/7] rounded-[1.25rem] overflow-hidden shadow-[0_18px_40px_rgba(74,30,12,0.18)] ring-1 ring-[#7a5d3a]/30">
              {visualId ? (
                <VisualAsset id={visualId} fill priority sizes="(max-width: 1024px) 70vw, 28rem" />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f4e8d2,#e6c79a_60%,#caa376)]" />
              )}
              {/* Ruban doré horizontal stylisé */}
              <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-gradient-to-r from-transparent via-[#7a5d3a]/45 to-transparent" />
              <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-[#fff0d5]/45" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:order-2 order-1 space-y-6 animate-fade-up">
          <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
          <div className="space-y-3">
            {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
            <HeroTitle variant={variant}>{title}</HeroTitle>
          </div>
          {body && <HeroBody variant={variant}>{body}</HeroBody>}
          <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
        </div>
      </div>
    </div>
  );
}

/** CONTACT — minimal, sans photo, juste texte centré. */
function ContactLayout({ eyebrow, greeting, title, body, primaryCta, secondaryCta, variant }: LayoutProps) {
  return (
    <div className="relative mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28 text-center space-y-7 animate-fade-up">
      <HeroEyebrow variant={variant}>{eyebrow}</HeroEyebrow>
      <div className="space-y-3">
        {greeting && <HeroGreeting variant={variant}>{greeting}</HeroGreeting>}
        <HeroTitle variant={variant}>{title}</HeroTitle>
      </div>
      {body && (
        <div className="mx-auto">
          <HeroBody variant={variant}>{body}</HeroBody>
        </div>
      )}
      <div className="flex justify-center pt-1">
        <HeroCtas primaryCta={primaryCta} secondaryCta={secondaryCta} variant={variant} />
      </div>
    </div>
  );
}
