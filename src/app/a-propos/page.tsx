import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { Reveal } from "@/components/ui/Reveal";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { aProposRefuge } from "@/lib/data";

export const metadata: Metadata = {
  title: "Céline Dusseval — accompagnatrice bien-être en Gironde",
  description:
    "Céline Dusseval reçoit à Bordeaux et accompagne celles et ceux qui souhaitent revenir à eux-mêmes — sans protocole, sans injonction. Présentation, posture, univers.",
};

/**
 * Page /a-propos — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - L'ancien hero "Accompagner les mémoires, le féminin et l'intégration par
 *    le corps" (trop conceptuel, en 3ème personne).
 *  - Des "quatre postures que je ne suis pas" (grille de cards défensives).
 *  - Des "trois axes structurants" affichés comme architecture visible.
 *  - Du BilanGiftBanner final.
 *
 * À la place, structure refuge :
 *  - PageRefugeHero avec photo Céline + greeting "Bienvenue."
 *  - Récit personnel en "je" (waiting-celine-voice — placeholder doux)
 *  - Posture "Pas un protocole. Un espace."
 *  - SoftCarousel "Mon univers" — 7 fragments du refuge
 *  - GuidanceFooter "Écrivez-moi un mot."
 *
 * Tous les blocs de récit sont en attente de la voix Céline. Marqué
 * `waiting-celine-voice` dans data.ts, prêt à être remplacé sans
 * toucher au layout.
 */
export default function AProposPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={aProposRefuge.hero.eyebrow}
        greeting={aProposRefuge.hero.greeting}
        title={aProposRefuge.hero.title}
        body={aProposRefuge.hero.body}
        primaryCta={aProposRefuge.hero.primaryCta}
        secondaryCta={aProposRefuge.hero.secondaryCta}
        visualId="about-portrait-main"
        contentStatus={aProposRefuge.contentStatus}
      />

      <RecitSection />
      <PostureSection />
      <UniversSection />

      <GuidanceFooter variant="contact" />
    </>
  );
}

/** Section récit personnel — en attente du vocal Céline. */
function RecitSection() {
  return (
    <section
      data-content-status="waiting-celine-voice"
      className="relative bg-bg-base py-20 md:py-28"
    >
      <Container>
        <div className="max-w-3xl mx-auto space-y-7">
          <Reveal>
            <div className="space-y-5 text-center">
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>{aProposRefuge.recit.eyebrow}</span>
              </div>
              <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
                {aProposRefuge.recit.title}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-5 max-w-2xl mx-auto pt-4">
            {aProposRefuge.recit.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base md:text-lg leading-relaxed text-text-medium">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section posture — "Pas un protocole. Un espace." */
function PostureSection() {
  return (
    <section className="relative paper-sand py-20 md:py-28">
      <Container>
        <div className="max-w-3xl mx-auto space-y-7 text-center">
          <Reveal>
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>{aProposRefuge.posture.eyebrow}</span>
              </div>
              <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.2] text-text-deep">
                {aProposRefuge.posture.title}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-5 max-w-2xl mx-auto pt-4 text-left">
            {aProposRefuge.posture.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Section univers — SoftCarousel de fragments du refuge. */
function UniversSection() {
  return (
    <section className="relative bg-bg-base py-20 md:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-5 mb-12 md:mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{aProposRefuge.univers.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
              {aProposRefuge.univers.title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-text-medium pt-3">
              {aProposRefuge.univers.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="max-w-2xl mx-auto">
            <SoftCarousel
              assetIds={[...aProposRefuge.univers.assetIds]}
              ratio="4:5"
              caption={aProposRefuge.recit.captionPhoto}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
