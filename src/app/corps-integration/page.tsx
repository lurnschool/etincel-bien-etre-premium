import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import {
  PillarFormatsSection,
  PillarFaqSection,
  PillarDisclaimer,
} from "@/components/page/PillarSections";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { BreathSection } from "@/components/page/sections/BreathSection";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { Reveal } from "@/components/ui/Reveal";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { corpsRefuge, carouselsRefuge, corpsBreathPhases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Corps & intégration — souffle, mouvement et présence",
  description:
    "Innerdance, breathwork chamanique, retraites immersives. Le souffle, le mouvement et l'expérience intérieure pour ancrer ce qui demande à être ancré.",
};

/**
 * Page /corps-integration — Sprint C "pages-pièces".
 *
 * Pièce du refuge : L'ESPACE DU SOUFFLE, DU MOUVEMENT, DU CORPS.
 * Émotion : souffle, mouvement, traversée.
 *
 * Différenciation :
 *  - Hero variant "movement" — bandeau visuel large palette eau/sauge +
 *    texte centré dans une carte qui flotte au-dessus
 *  - DetailStrip ton "sage" sous le hero
 *  - BreathSection : cercle qui respire (animation CSS pulse 8s) +
 *    3 phases (inspirer / traverser / intégrer) — PAS de grille de cards
 *  - PillarFormatsSection 4 cards
 *  - SoftCarousel "Retraites & immersions"
 *  - PillarFaqSection
 *  - PillarDisclaimer breathwork
 *  - GuidanceFooter variant "contact"
 */
export default function CorpsIntegrationPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={corpsRefuge.hero.eyebrow}
        greeting={corpsRefuge.hero.greeting}
        title={
          <>
            Intégrer par le{" "}
            <EtincelleAccent variant="glow">souffle</EtincelleAccent>{" "}
            ce que les mots ne suffisent pas à transformer.
          </>
        }
        body={corpsRefuge.hero.body}
        primaryCta={corpsRefuge.hero.primaryCta}
        secondaryCta={corpsRefuge.hero.secondaryCta}
        visualId="corps-innerdance"
        variant="movement"
        contentStatus={corpsRefuge.contentStatus}
      />

      <DetailStrip
        assetIds={[
          "micro-corps-1",
          "micro-corps-2",
          "micro-corps-3",
          "micro-corps-4",
          "micro-corps-5",
          "micro-corps-6",
        ]}
        tone="sage"
        size="md"
        caption="Fragments — souffle, eau, mouvement, silhouettes."
      />

      <BreathSection
        eyebrow={corpsRefuge.pourQui.eyebrow}
        title="Inspirer, traverser, intégrer."
        intro="Ce travail se vit en trois temps — comme un souffle. On ne le force pas, on le suit."
        phases={corpsBreathPhases}
      />

      <PillarFormatsSection
        eyebrow={corpsRefuge.formats.eyebrow}
        title={corpsRefuge.formats.title}
        body={corpsRefuge.formats.body}
        cards={corpsRefuge.formats.cards}
        background="paper-sand"
      />

      <RetraitesCarrousel />

      <PillarFaqSection items={corpsRefuge.faq} background="bg-base" />

      <PillarDisclaimer text={corpsRefuge.disclaimer} />

      <GuidanceFooter variant="contact" />
    </>
  );
}

function RetraitesCarrousel() {
  const c = carouselsRefuge.retraitesImmersions;
  return (
    <section className="relative bg-bg-base py-20 md:py-28 overflow-hidden">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-5">
          <Reveal>
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{c.title}</span>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <SoftCarousel
              assetIds={[...c.assetIds]}
              ratio="4:5"
              caption={c.caption}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
