import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { Reveal } from "@/components/ui/Reveal";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { RefugeNotebookSection } from "@/components/page/sections/RefugeNotebookSection";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { aProposRefuge, aProposFragments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Céline Dusseval — accompagnatrice bien-être en Gironde",
  description:
    "Céline Dusseval reçoit à Bordeaux et accompagne celles et ceux qui souhaitent revenir à eux-mêmes — sans protocole, sans injonction. Présentation, posture, univers.",
};

/**
 * Page /a-propos — Sprint C "pages-pièces".
 *
 * Pièce du refuge : LE SALON où Céline se présente.
 * Émotion : confiance, proximité, sincérité.
 *
 * Différenciation :
 *  - Hero variant "portrait" (cohérent home, mais ici on assume le portrait)
 *  - DetailStrip "carnet" sous le hero (mini-souvenirs personnels)
 *  - Récit en "je" en colonne étroite avec EtincelleAccent sur "Bienvenue."
 *  - Posture en prose centrée
 *  - RefugeNotebookSection : 6 fragments style carnet (le tambour, le cacao,
 *    les cercles, l'écoute, le corps, le silence) — pas une grille de cards
 *  - SoftCarousel "Mon univers" maintenu
 *  - GuidanceFooter variant "contact"
 */
export default function AProposPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={aProposRefuge.hero.eyebrow}
        greeting={aProposRefuge.hero.greeting}
        title={
          <>
            Je m&apos;appelle{" "}
            <EtincelleAccent variant="signature" withSparkle>
              Céline
            </EtincelleAccent>
            .
          </>
        }
        body={aProposRefuge.hero.body}
        primaryCta={aProposRefuge.hero.primaryCta}
        secondaryCta={aProposRefuge.hero.secondaryCta}
        visualId="about-portrait-main"
        variant="portrait"
        contentStatus={aProposRefuge.contentStatus}
      />

      {/* Mini-souvenirs en strip horizontal — fragments rapides du quotidien */}
      <DetailStrip
        assetIds={["carnet-1", "carnet-2", "carnet-3", "carnet-4", "carnet-5", "carnet-6"]}
        tone="warm"
        size="md"
        caption="Quelques fragments du quotidien — d'autres viendront s'ajouter."
      />

      <RecitSection />
      <PostureSection />

      {/* Carnet de fragments incarnés — pas une grille uniforme */}
      <RefugeNotebookSection
        eyebrow="Au fil des années"
        title="Quelques rencontres qui m'ont façonnée."
        intro="Un carnet de ce qui a compté — des outils, des présences, des moments."
        fragments={aProposFragments}
      />

      <UniversSection />

      <GuidanceFooter variant="contact" />
    </>
  );
}

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
                Pas un protocole.{" "}
                <EtincelleAccent variant="glow">Un espace</EtincelleAccent>.
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
