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
import { femininRefuge, carouselsRefuge } from "@/lib/data";

export const metadata: Metadata = {
  title: "Féminin & cacao — un espace pour le corps, le cœur, le féminin",
  description:
    "Cérémonies cacao, cercles de femmes, accompagnement symbolique du féminin. Un espace doux et sensible pour revenir au corps, aux cycles et à l'intuition.",
};

/**
 * Page /feminin-cacao — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - Stats-block, "Ce que vous portez" 01–06, "Quatre formats" cards 2×2,
 *    "Outils mobilisés" grille séparée, SmartImage sticky, SacredBackdrop
 *    "cacao", WhisperLine, BilanGiftBanner.
 *
 * À la place, structure refuge :
 *  - PageRefugeHero avec photo cacao (feminin-cacao-tasse)
 *  - PillarPourQuiSection
 *  - PillarFormatsSection 4 cards (cercles, cacao, féminin sacré, massage)
 *  - SoftCarousel "Cercles & cérémonies cacao"
 *  - PillarFaqSection 4 questions
 *  - PillarDisclaimer santé
 *  - GuidanceFooter "Écrivez-moi un mot"
 */
export default function FemininCacaoPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={femininRefuge.hero.eyebrow}
        greeting={femininRefuge.hero.greeting}
        title={femininRefuge.hero.title}
        body={femininRefuge.hero.body}
        primaryCta={femininRefuge.hero.primaryCta}
        secondaryCta={femininRefuge.hero.secondaryCta}
        visualId="feminin-cacao-tasse"
        background="paper-warm"
        contentStatus={femininRefuge.contentStatus}
      />

      <PillarPourQuiSection
        eyebrow={femininRefuge.pourQui.eyebrow}
        title={femininRefuge.pourQui.title}
        paragraphs={femininRefuge.pourQui.paragraphs}
        background="bg-base"
      />

      <PillarFormatsSection
        eyebrow={femininRefuge.formats.eyebrow}
        title={femininRefuge.formats.title}
        body={femininRefuge.formats.body}
        cards={femininRefuge.formats.cards}
        background="paper-sand"
      />

      <CerclesCacaoCarrousel />

      <PillarFaqSection items={femininRefuge.faq} background="bg-base" />

      <PillarDisclaimer text={femininRefuge.disclaimer} />

      <GuidanceFooter variant="contact" />
    </>
  );
}

function CerclesCacaoCarrousel() {
  const c = carouselsRefuge.cerclesEtCacao;
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
