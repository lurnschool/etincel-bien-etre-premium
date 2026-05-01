import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { PillarPourQuiSection, PillarFaqSection, PillarDisclaimer } from "@/components/page/PillarSections";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { disclaimers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Féminin sacré — un espace symbolique pour le corps et l'intuition",
  description:
    "Un accompagnement symbolique du féminin, des cycles, du corps comme territoire vivant. Démarche de bien-être — ne remplace pas un suivi médical, gynécologique ou psychologique.",
};

const fsPourQui = {
  eyebrow: "Quand cet espace prend tout son sens",
  title: "Quand le féminin appelle à être écouté.",
  paragraphs: [
    "Quand le corps demande de la place, quand un cycle devient inconfortable, quand une étape de vie de femme demande à être traversée. Quand l'intuition s'éloigne, quand le rapport à soi se brouille.",
    "Quand l'envie est de retrouver un lien doux avec son corps, ses ressentis, son énergie créatrice. Sans injonction, sans modèle imposé, sans pseudo-médecine.",
    "Cet espace s'adresse à toute personne se reconnaissant dans le féminin, à toute étape de la vie de femme.",
  ],
};

const fsFaq = [
  { q: "Est-ce que c'est un soin médical ?", a: "Non. C'est un accompagnement symbolique et sensible. Il ne remplace pas un suivi médical, gynécologique ou psychologique. Si vous avez une question de santé, parlez-en à votre médecin." },
  { q: "Comment se déroule une séance ?", a: "Une séance individuelle, dans un cadre confidentiel et sécure. On commence par un temps d'échange, puis on travaille avec ce qui se présente — souvent à partir d'un thème, d'un cycle, d'un ressenti corporel." },
  { q: "Faut-il être prête à parler de tout ?", a: "Non. Vous décidez de ce que vous partagez. Le cadre respecte votre intimité et votre rythme." },
  { q: "Quel est le tarif ?", a: "Sur demande — le format est ajusté à vous, donc le tarif aussi. Écrivez-moi avec votre intention pour qu'on en parle simplement." },
];

export default function FemininSacrePage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Féminin sacré"
        greeting="Revenir à votre corps."
        title={
          <>
            Un espace symbolique pour le corps, les{" "}
            <EtincelleAccent variant="letter">cycles</EtincelleAccent>,
            l&apos;intuition.
          </>
        }
        body="Un accompagnement individuel autour du féminin sacré et de la symbolique de l'utérus. Pas une médecine — un espace de reconnexion à soi, à son corps, à son histoire."
        primaryCta={{ label: "Écrire à Céline", href: "/contact?sujet=F%C3%A9minin%20sacr%C3%A9" }}
        secondaryCta={{ label: "Voir le chemin Féminin", href: "/feminin-cacao" }}
        visualId="feminin-cacao-tasse"
        variant="ritual"
      />

      <PathwayBadge pathway="feminin" />

      <DetailStrip
        assetIds={["micro-feminin-1", "micro-feminin-2", "micro-feminin-3", "micro-feminin-4", "micro-feminin-5", "micro-feminin-6"]}
        tone="rose"
        size="md"
        caption="Fragments — matières, lumière, mains, présence."
      />

      <PillarPourQuiSection
        eyebrow={fsPourQui.eyebrow}
        title={fsPourQui.title}
        paragraphs={fsPourQui.paragraphs}
        background="bg-base"
      />

      <PillarFaqSection items={fsFaq} background="paper-sand" />

      <PillarDisclaimer text={disclaimers.feminin} />

      <GuidanceFooter variant="contact" />
    </>
  );
}
