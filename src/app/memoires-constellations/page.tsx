import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import {
  PillarFormatsSection,
  PillarFaqSection,
} from "@/components/page/PillarSections";
import { CircleLinksSection } from "@/components/page/sections/CircleLinksSection";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { memoiresRefuge, memoiresConstellationsNodes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mémoires & constellations — libérer ce qui vous traverse",
  description:
    "Constellations familiales, transgénérationnel, mémoires portées. Mettre en lumière les loyautés invisibles pour retrouver une place plus juste dans la lignée.",
};

/**
 * Page /memoires-constellations — Sprint C "pages-pièces".
 *
 * Pièce du refuge : L'ESPACE OÙ L'ON DÉPOSE LES HISTOIRES FAMILIALES.
 * Émotion : profondeur, mise en lumière, réparation symbolique.
 *
 * Différenciation :
 *  - Hero variant "circle" — fond nuit profonde, photo carrée centrée,
 *    palette améthyste/or, texte plus grand pour gravité du sujet
 *  - DetailStrip ton "night" sous le hero — détails sombres et symboliques
 *  - CircleLinksSection — composition visuelle de cercle avec 6 nœuds
 *    (la place / les loyautés / les répétitions / les exclus /
 *    la transmission / l'origine) — PAS de cards alignées
 *  - PillarFormatsSection conservée pour les 4 formats pratiques
 *  - PillarFaqSection conservée
 *  - GuidanceFooter variant "contact"
 */
export default function MemoiresConstellationsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={memoiresRefuge.hero.eyebrow}
        greeting={memoiresRefuge.hero.greeting}
        title={
          <>
            Libérer ce qui ne vous{" "}
            <EtincelleAccent variant="glow">appartient</EtincelleAccent>{" "}
            pas tout à fait.
          </>
        }
        body={memoiresRefuge.hero.body}
        primaryCta={memoiresRefuge.hero.primaryCta}
        secondaryCta={memoiresRefuge.hero.secondaryCta}
        visualId="memoires-detail-1"
        variant="circle"
        contentStatus={memoiresRefuge.contentStatus}
      />

      <DetailStrip
        assetIds={[
          "micro-memoires-1",
          "micro-memoires-2",
          "micro-memoires-3",
          "micro-memoires-4",
          "micro-memoires-5",
          "micro-memoires-6",
        ]}
        tone="night"
        size="md"
        caption="Fragments d'objets et d'ambiances — éléments du cercle."
      />

      <CircleLinksSection
        eyebrow={memoiresRefuge.pourQui.eyebrow}
        title="Ce qui peut se rejouer dans une constellation."
        intro="Aucune loyauté n'est forcée à émerger. C'est ce qui appelle au moment de la séance qui se met en place."
        nodes={memoiresConstellationsNodes}
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
