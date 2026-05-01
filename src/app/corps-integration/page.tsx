import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import {
  PillarPourQuiSection,
  PillarFormatsSection,
  PillarFaqSection,
  PillarDisclaimer,
} from "@/components/page/PillarSections";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { Reveal } from "@/components/ui/Reveal";
import { corpsRefuge, carouselsRefuge } from "@/lib/data";

export const metadata: Metadata = {
  title: "Corps & intégration — souffle, mouvement et présence",
  description:
    "Innerdance, breathwork chamanique, retraites immersives. Le souffle, le mouvement et l'expérience intérieure pour ancrer ce qui demande à être ancré.",
};

/**
 * Page /corps-integration — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - Stats-block, "Ce qui appelle l'intégration" 01–06, "Trois formats"
 *    cards 3× marketing, "Outils complémentaires" grille, "Comment se
 *    préparer" 5 cards, SacredBackdrop "souffle", WhisperLine,
 *    BilanGiftBanner.
 *
 * À la place, structure refuge :
 *  - PageRefugeHero avec photo corps (corps-innerdance)
 *  - PillarPourQuiSection
 *  - PillarFormatsSection 4 cards (breathwork, innerdance, retraites, massage)
 *  - SoftCarousel "Retraites & immersions"
 *  - PillarFaqSection 4 questions
 *  - PillarDisclaimer breathwork
 *  - GuidanceFooter "Écrivez-moi un mot"
 */
export default function CorpsIntegrationPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={corpsRefuge.hero.eyebrow}
        greeting={corpsRefuge.hero.greeting}
        title={corpsRefuge.hero.title}
        body={corpsRefuge.hero.body}
        primaryCta={corpsRefuge.hero.primaryCta}
        secondaryCta={corpsRefuge.hero.secondaryCta}
        visualId="corps-innerdance"
        background="paper-warm"
        contentStatus={corpsRefuge.contentStatus}
      />

      <PillarPourQuiSection
        eyebrow={corpsRefuge.pourQui.eyebrow}
        title={corpsRefuge.pourQui.title}
        paragraphs={corpsRefuge.pourQui.paragraphs}
        background="bg-base"
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
