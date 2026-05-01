import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { PillarFormatsSection, PillarFaqSection, PillarDisclaimer } from "@/components/page/PillarSections";
import { BreathSection } from "@/components/page/sections/BreathSection";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { disclaimers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Innerdance — écouter ce qui cherche à émerger",
  description:
    "Une expérience sensible mêlant musique, corps et états de présence. En individuel ou en collectif, pour ralentir et écouter ce qui cherche à émerger.",
};

const innerdancePhases = [
  { label: "Arriver", body: "Vous vous installez allongée, dans un cadre tenu. Rien à faire, rien à réussir. La musique commence." },
  { label: "Écouter", body: "Le corps reçoit la musique, des mouvements peuvent émerger d'eux-mêmes. Vous suivez ce qui vient, sans interpréter." },
  { label: "Revenir", body: "L'expérience se referme doucement. Un temps de présence, parfois de partage. Vous repartez plus présente, plus posée." },
];

const innerdanceFormats = {
  eyebrow: "Deux formats",
  title: "En individuel ou en cercle.",
  body: "Selon votre disponibilité et ce qui appelle, l'expérience peut se vivre en individuel (cadre intime) ou en collectif (énergie de groupe).",
  cards: [
    { id: "innerdance-individuel", title: "Innerdance individuel", body: "Une séance dédiée, dans un cadre tenu à deux. Vous arrivez, vous vous déposez, je tiens l'espace. La musique est choisie pour vous.", meta: "Sur demande" },
    { id: "innerdance-collectif", title: "Innerdance collectif", body: "Une session en petit groupe (6-10 personnes). L'énergie collective porte l'expérience individuelle. Plus immersif, plus enveloppant.", meta: "Sessions ponctuelles" },
  ],
} as const;

const innerdanceFaq = [
  { q: "Faut-il avoir déjà dansé ou pratiqué de la méditation ?", a: "Non, aucun pré-requis. L'expérience se vit allongée, à votre rythme. Il n'y a rien à « bien faire » ou à « réussir » — juste à laisser arriver." },
  { q: "Y a-t-il des contre-indications ?", a: "Très peu. C'est une pratique douce. Si vous suivez un traitement spécifique ou avez une condition particulière, on en parle avant pour s'assurer que c'est juste pour vous." },
  { q: "Combien de temps dure une séance ?", a: "En individuel, environ 1h30 (musique + temps de présence). En collectif, généralement 2h (avec temps de partage en cercle)." },
  { q: "Comment me préparer ?", a: "Vêtements confortables, repas léger 2h avant, et l'envie de vous déposer. Rien d'autre. Le reste est posé sur place." },
];

export default function InnerdancePage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Innerdance"
        greeting="Une expérience sensible."
        title={
          <>
            Écouter ce qui cherche à{" "}
            <EtincelleAccent variant="glow">émerger</EtincelleAccent>,
            par le corps.
          </>
        }
        body="Allongée, portée par une musique conçue pour l'expérience, vous laissez les mouvements arriver d'eux-mêmes. Pas de chorégraphie, pas de performance — une écoute du corps, en présence."
        primaryCta={{ label: "Écrire à Céline", href: "/contact?sujet=Innerdance" }}
        secondaryCta={{ label: "Voir le chemin Corps", href: "/corps-integration" }}
        visualId="corps-innerdance"
        variant="movement"
      />

      <PathwayBadge pathway="corps" />

      <DetailStrip
        assetIds={["micro-corps-1", "micro-corps-2", "micro-corps-3", "micro-corps-4", "micro-corps-5", "micro-corps-6"]}
        tone="sage"
        size="md"
        caption="Fragments — souffle, eau, mouvement, silhouettes."
      />

      <BreathSection
        eyebrow="Le mouvement intérieur"
        title="Arriver, écouter, revenir."
        intro="Une séance d'innerdance se vit en trois temps. On ne force rien, on suit."
        phases={innerdancePhases}
      />

      <PillarFormatsSection
        eyebrow={innerdanceFormats.eyebrow}
        title={innerdanceFormats.title}
        body={innerdanceFormats.body}
        cards={innerdanceFormats.cards}
        background="paper-sand"
      />

      <PillarFaqSection items={innerdanceFaq} background="bg-base" />
      <PillarDisclaimer text={disclaimers.bienEtre} />
      <GuidanceFooter variant="contact" />
    </>
  );
}
