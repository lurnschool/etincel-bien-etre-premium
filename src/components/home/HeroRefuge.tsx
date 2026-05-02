import Link from "next/link";
import { ArrowRight, MessageSquare, MapPin } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { EtincelleHandwritten } from "@/components/ui/EtincelleHandwritten";
import { GoldenWelcomeText } from "@/components/ui/GoldenWelcomeText";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { PracticesMarquee } from "@/components/ui/PracticesMarquee";
import { heroRefuge, practicesMarquee } from "@/lib/data";

/**
 * HeroRefuge — Sprint F (desktop) + Sprint J (mobile refondu).
 *
 * Mobile : photo Céline en fond plein écran, overlay sombre dégradé,
 * texte par-dessus en bas. Donne immédiatement la sensation de refuge
 * immersif au lieu d'une grosse photo qui pousse le message en bas.
 *
 * Desktop (md+) : mosaïque éditoriale conservée (portrait + 2 polaroids
 * + halo doré + filet décoratif), layout 2 colonnes inchangé.
 *
 * Sensation cible :
 *  - mobile  → un seul écran respirant, message lisible immédiatement
 *  - desktop → mosaïque éditoriale premium, ancrée Bordeaux · Gironde
 */
export function HeroRefuge() {
  return (
    <>
      {/* ============================================================
          MOBILE — photo en fond + overlay + texte par-dessus
          ============================================================ */}
      <section
        className="md:hidden relative w-full overflow-hidden pt-[60px]"
        aria-labelledby="hero-refuge-title-mobile"
      >
        {/* Photo en background plein écran */}
        <div className="absolute inset-0">
          <VisualAsset
            id="home-hero-celine"
            priority
            fill
            sizes="100vw"
            imageClassName="object-cover object-[center_top]"
          />
          {/* Overlay dégradé : transparent en haut → sombre en bas pour
              garantir la lisibilité du texte sans masquer la photo */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-bg-deep/25 via-bg-deep/40 to-bg-deep/85"
          />
        </div>

        {/* Contenu posé en bas du hero — texte renforcé pour rester lisible
            sur la photo (drop-shadow sombre + couleurs blanches plus contrastées).
            L'effet doré lumineux du H1 est conservé intact, on ajoute juste
            un drop-shadow sombre sur le wrapper qui amplifie sa silhouette. */}
        <div className="relative min-h-[88svh] flex flex-col justify-end px-6 pb-10 pt-24 space-y-5 text-text-on-dark [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
          {/* Mention de lieu — blanc plus marqué */}
          <div className="flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.32em] text-white/85 font-medium">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3 w-3 text-gold" />
              Bordeaux · Gironde
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-gold/80 to-transparent" />
            <span>Etincel · Céline Dusseval</span>
          </div>

          {/* Bienvenue manuscrite + H1 doré (drop-shadow sombre fort sur le H1
              pour faire ressortir le gradient or sur la photo claire). */}
          <div className="space-y-3">
            <EtincelleHandwritten size="lg" delay={300} sparklePosition="right-top">
              Bienvenue.
            </EtincelleHandwritten>
            <h1
              id="hero-refuge-title-mobile"
              className="font-display text-balance text-[2.4rem] sm:text-[2.7rem] leading-[1.05] tracking-tight [filter:drop-shadow(0_3px_6px_rgba(0,0,0,0.85))_drop-shadow(0_0_28px_rgba(0,0,0,0.5))]"
            >
              <GoldenWelcomeText size={false} sweep={false}>
                Ici, vous pouvez vous poser un instant.
              </GoldenWelcomeText>
            </h1>
          </div>

          {/* Body — blanc plus net pour contraste sur fond photo */}
          <p className="text-[1rem] leading-relaxed text-white/95 max-w-md font-medium">
            {heroRefuge.body}
          </p>

          {/* CTA — primaire violet (gardé), secondaire en border claire */}
          <div className="flex flex-wrap gap-3 pt-1 [text-shadow:none]">
            <ButtonHalo tone="mixed">
              <Link
                href={heroRefuge.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                {heroRefuge.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </ButtonHalo>
            <Link
              href={heroRefuge.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-bg-deep/40 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white hover:bg-bg-deep/60 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              {heroRefuge.secondaryCta.label}
            </Link>
          </div>

          {/* Mini-tags des 3 axes — blanc plus marqué */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.74rem] text-white/85 pt-3 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Etincelle size={7} />
              <span className="font-display-italic">Mémoires</span>
            </span>
            <span className="text-gold/70" aria-hidden>·</span>
            <span className="font-display-italic">Féminin & cacao</span>
            <span className="text-gold/70" aria-hidden>·</span>
            <span className="font-display-italic">Corps</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          DESKTOP (md+) — mosaïque éditoriale conservée
          ============================================================ */}
      <section
        className="hidden md:block relative w-full paper-warm overflow-hidden pt-[64px]"
        aria-labelledby="hero-refuge-title"
      >
        {/* Halos décoratifs très subtils — donnent de la profondeur sans bruit */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-rose-soft/35 via-gold-soft/20 to-transparent blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-gold-soft/25 via-rose-soft/15 to-transparent blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-10 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            {/* === Colonne texte (gauche, 7 cols sur lg) === */}
            <div className="lg:col-span-7 lg:order-1 space-y-6 animate-fade-up">
              <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gold-deep" />
                  Bordeaux · Gironde
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-gold/60 to-transparent" />
                <span>{heroRefuge.eyebrow}</span>
              </div>

              <div className="space-y-3">
                <EtincelleHandwritten size="lg" delay={300} sparklePosition="right-top">
                  Bienvenue.
                </EtincelleHandwritten>
                <h1
                  id="hero-refuge-title"
                  className="font-display text-balance text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight mt-2"
                >
                  <GoldenWelcomeText size={false} sweep={false}>
                    Ici, vous pouvez vous poser un instant.
                  </GoldenWelcomeText>
                </h1>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
                {heroRefuge.body}
              </p>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-3 pt-1">
                  <ButtonHalo tone="mixed">
                    <Link
                      href={heroRefuge.primaryCta.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                    >
                      {heroRefuge.primaryCta.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </ButtonHalo>
                  <Link
                    href={heroRefuge.secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-7 py-3.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {heroRefuge.secondaryCta.label}
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-text-soft pt-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Etincelle size={8} />
                    <span className="font-display-italic text-text-medium">
                      Constellations Familiales · Transgénérationnel
                    </span>
                  </span>
                  <span className="text-gold/40" aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Etincelle size={8} />
                    <span className="font-display-italic text-text-medium">
                      Accompagnement du Féminin · Cérémonie Cacao
                    </span>
                  </span>
                  <span className="text-gold/40" aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Etincelle size={8} />
                    <span className="font-display-italic text-text-medium">
                      Reliance au corps
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* === Colonne mosaïque visuelle (droite, 5 cols) === */}
            <div className="lg:col-span-5 lg:order-2 relative animate-fade-up">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-rose-soft/40 via-gold-soft/35 to-transparent blur-3xl -z-10"
                />

                <VisualAsset
                  id="home-hero-celine"
                  priority
                  ratio="4:5"
                  className="rounded-[2rem] shadow-[0_24px_60px_rgba(31,26,46,0.16)] ring-1 ring-bg-base/30"
                  sizes="(max-width: 1024px) 80vw, 38vw"
                />

                <div className="absolute -bottom-6 -left-6 hidden md:block w-32 lg:w-36 rotate-[-4deg] shadow-[0_14px_32px_rgba(31,26,46,0.20)] rounded-[1rem] overflow-hidden ring-1 ring-bg-base/60 hover:rotate-[-1deg] transition-transform duration-500">
                  <VisualAsset id="home-bienvenue-detail" ratio="1:1" sizes="144px" />
                </div>

                <div className="absolute -top-5 -right-5 hidden lg:block w-28 rotate-[5deg] shadow-[0_12px_28px_rgba(31,26,46,0.18)] rounded-[0.85rem] overflow-hidden ring-1 ring-bg-base/60 hover:rotate-[1deg] transition-transform duration-500">
                  <VisualAsset id="home-univers-3" ratio="1:1" sizes="112px" />
                </div>

                <div
                  aria-hidden
                  className="absolute -top-3 left-8 hidden md:block text-gold-deep opacity-70 motion-safe:animate-[float_6s_ease-in-out_infinite]"
                >
                  <Etincelle size={14} />
                </div>

                <div
                  aria-hidden
                  className="absolute -right-3 top-1/4 bottom-1/4 hidden lg:block w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"
                />
              </div>

              <div className="mt-12 lg:mt-10 max-w-sm mx-auto lg:max-w-none">
                <div className="relative pl-6 py-2 border-l-2 border-gold-soft/60">
                  <p className="font-display-italic text-base md:text-lg text-text-medium leading-snug">
                    Le corps garde parfois ce que les mots n&apos;ont pas encore déposé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bande défilante des pratiques (commune mobile + desktop) */}
      <PracticesMarquee items={practicesMarquee} tone="soft" durationS={55} />
    </>
  );
}
