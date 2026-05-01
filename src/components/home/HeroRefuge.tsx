import Link from "next/link";
import { ArrowRight, MessageSquare, MapPin } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { EtincelleHandwritten } from "@/components/ui/EtincelleHandwritten";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { PracticesMarquee } from "@/components/ui/PracticesMarquee";
import { heroRefuge, practicesMarquee } from "@/lib/data";

/**
 * HeroRefuge — Sprint F : densifié, équilibré, premium.
 *
 * Pour réduire le vide :
 *  - Padding top réduit (pt-[68px] → pt-[64px], py-16/24/28 → py-10/16/20)
 *  - Mention de lieu en marge gauche (Bordeaux · Gironde) — petit ancrage
 *  - 3 mini-tags de spécialités en bas du texte (mémoires/féminin/corps)
 *  - Mosaïque visuelle à droite : grand portrait + 2 mini-polaroids
 *    posés en marge (au lieu d'un seul) — superpositions fines
 *  - Filets dorés discrets en accent
 *  - Halo doré derrière la mosaïque pour donner de la profondeur
 *
 * Sensation cible : refuge incarné, premium, légèrement habillé,
 * jamais surchargé.
 */
export function HeroRefuge() {
  return (
    <section
      className="relative w-full paper-warm overflow-hidden pt-[64px]"
      aria-labelledby="hero-refuge-title"
    >
      {/* Halos décoratifs très subtils — donnent de la profondeur sans bruit */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-rose-soft/35 via-gold-soft/20 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-gold-soft/25 via-rose-soft/15 to-transparent blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* === Colonne texte (gauche, 7 cols sur lg) === */}
          <div className="lg:col-span-7 lg:order-1 order-2 space-y-6 animate-fade-up">
            {/* Mention de lieu — petit ancrage premium discret */}
            <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3 w-3 text-gold-deep" />
                Bordeaux · Gironde
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-gold/60 to-transparent" />
              <span>{heroRefuge.eyebrow}</span>
            </div>

            <div className="space-y-3">
              {/* Bienvenue manuscrite dorée — animation cursive + flash sparkle */}
              <EtincelleHandwritten size="lg" delay={300} sparklePosition="right-top">
                Bienvenue.
              </EtincelleHandwritten>
              <h1
                id="hero-refuge-title"
                className="font-display text-balance text-[2.4rem] sm:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep mt-2"
              >
                Ici, vous pouvez vous{" "}
                <EtincelleAccent variant="glow">poser</EtincelleAccent>{" "}
                un instant.
              </h1>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-text-medium max-w-xl">
              {heroRefuge.body}
            </p>

            {/* CTA + mini-tags de spécialités — densifie sans surcharger */}
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href={heroRefuge.primaryCta.href}
                  className="soft-glow group inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                >
                  {heroRefuge.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={heroRefuge.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-7 py-3.5 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  {heroRefuge.secondaryCta.label}
                </Link>
              </div>

              {/* Mini-tags spécialités, posés comme une signature */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-text-soft pt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Etincelle size={8} />
                  <span className="font-display-italic text-text-medium">
                    Mémoires & constellations
                  </span>
                </span>
                <span className="text-gold/40" aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Etincelle size={8} />
                  <span className="font-display-italic text-text-medium">
                    Féminin & cacao
                  </span>
                </span>
                <span className="text-gold/40" aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Etincelle size={8} />
                  <span className="font-display-italic text-text-medium">
                    Corps & intégration
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* === Colonne mosaïque visuelle (droite, 5 cols) === */}
          <div className="lg:col-span-5 lg:order-2 order-1 relative animate-fade-up">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Halo doré chaud derrière la mosaïque */}
              <div
                aria-hidden
                className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-rose-soft/40 via-gold-soft/35 to-transparent blur-3xl -z-10"
              />

              {/* Photo principale — Céline + tambour */}
              <VisualAsset
                id="home-hero-celine"
                priority
                ratio="4:5"
                className="rounded-[2rem] shadow-[0_24px_60px_rgba(31,26,46,0.16)] ring-1 ring-bg-base/30"
                sizes="(max-width: 1024px) 80vw, 38vw"
              />

              {/* Mini-polaroid 1 — bas-gauche (un détail) */}
              <div className="absolute -bottom-6 -left-6 hidden md:block w-32 lg:w-36 rotate-[-4deg] shadow-[0_14px_32px_rgba(31,26,46,0.20)] rounded-[1rem] overflow-hidden ring-1 ring-bg-base/60 hover:rotate-[-1deg] transition-transform duration-500">
                <VisualAsset
                  id="home-bienvenue-detail"
                  ratio="1:1"
                  sizes="144px"
                />
              </div>

              {/* Mini-polaroid 2 — haut-droite (autre détail) */}
              <div className="absolute -top-5 -right-5 hidden lg:block w-28 rotate-[5deg] shadow-[0_12px_28px_rgba(31,26,46,0.18)] rounded-[0.85rem] overflow-hidden ring-1 ring-bg-base/60 hover:rotate-[1deg] transition-transform duration-500">
                <VisualAsset
                  id="home-univers-3"
                  ratio="1:1"
                  sizes="112px"
                />
              </div>

              {/* Étincelle décorative dorée — flotte en marge haute */}
              <div
                aria-hidden
                className="absolute -top-3 left-8 hidden md:block text-gold-deep opacity-70 motion-safe:animate-[float_6s_ease-in-out_infinite]"
              >
                <Etincelle size={14} />
              </div>

              {/* Filet doré décoratif vertical en marge */}
              <div
                aria-hidden
                className="absolute -right-3 top-1/4 bottom-1/4 hidden lg:block w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"
              />
            </div>

            {/* Mini-citation en marge sous la mosaïque (mobile : sous le texte) */}
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

      {/* Bande défilante des pratiques (variante soft, cycle 55s) */}
      <PracticesMarquee items={practicesMarquee} tone="soft" durationS={55} />
    </section>
  );
}
