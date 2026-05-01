import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import {
  PillarPourQuiSection,
  PillarFormatsSection,
  PillarFaqSection,
} from "@/components/page/PillarSections";
import { memoiresRefuge } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mémoires & constellations — libérer ce qui vous traverse",
  description:
    "Constellations familiales, transgénérationnel, mémoires portées. Mettre en lumière les loyautés invisibles pour retrouver une place plus juste dans la lignée.",
};

/**
 * Page /memoires-constellations — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - L'ancien stats-block (95€ / 1+1+1 / 100% confidentialité / 0 promesse)
 *  - "Ce que vous portez" liste numérotée 01–06
 *  - "5 outils mobilisés" en grille de cards
 *  - "Déroulé en 5 étapes" 01–05
 *  - SacredBackdrop, WhisperLine, BilanGiftBanner
 *
 * À la place, structure refuge :
 *  - PageRefugeHero avec photo (memoires-detail-1)
 *  - PillarPourQuiSection en prose
 *  - PillarFormatsSection : 4 cards douces
 *  - PillarFaqSection : 4 questions douces
 *  - GuidanceFooter "Pas sûre par où commencer ?"
 */
export default function MemoiresConstellationsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={memoiresRefuge.hero.eyebrow}
        greeting={memoiresRefuge.hero.greeting}
        title={memoiresRefuge.hero.title}
        body={memoiresRefuge.hero.body}
        primaryCta={memoiresRefuge.hero.primaryCta}
        secondaryCta={memoiresRefuge.hero.secondaryCta}
        visualId="memoires-detail-1"
        background="paper-warm"
        contentStatus={memoiresRefuge.contentStatus}
      />

      <PillarPourQuiSection
        eyebrow={memoiresRefuge.pourQui.eyebrow}
        title={memoiresRefuge.pourQui.title}
        paragraphs={memoiresRefuge.pourQui.paragraphs}
        background="bg-base"
      />

      <PillarFormatsSection
        eyebrow={memoiresRefuge.formats.eyebrow}
        title={memoiresRefuge.formats.title}
        body={memoiresRefuge.formats.body}
        cards={memoiresRefuge.formats.cards}
        background="paper-sand"
      />

      <PillarFaqSection items={memoiresRefuge.faq} background="bg-base" />

      <GuidanceFooter variant="contact" />
    </>
  );
}
