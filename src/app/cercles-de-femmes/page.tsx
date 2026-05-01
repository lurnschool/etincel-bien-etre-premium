import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { ProchainesDates } from "@/components/page/ProchainesDates";
import { PillarPourQuiSection, PillarFaqSection } from "@/components/page/PillarSections";
import { RitualStepsSection } from "@/components/page/sections/RitualStepsSection";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";

export const metadata: Metadata = {
  title: "Cercles de femmes — sororité et présence",
  description:
    "Un rendez-vous mensuel pour déposer, partager, revenir à soi en sororité. Petit groupe, cadre confidentiel, sans préparation requise.",
};

const cerclesPourQui = {
  eyebrow: "Ce que vous pouvez y vivre",
  title: "Un espace de présence, sans injonction.",
  paragraphs: [
    "Un cercle, ce n'est pas un atelier. Pas de programme à suivre, pas de performance à fournir. C'est un temps tenu où chacune peut déposer ce qui pèse, partager ce qui se vit, ou simplement écouter.",
    "On y trouve une présence d'autres femmes, un cadre sécure, et la possibilité de mettre des mots sur ce qui parfois n'en a pas. Beaucoup repartent allégées sans même savoir précisément de quoi.",
    "Aucune connaissance préalable n'est nécessaire. Vous pouvez venir avec une intuition, un trop-plein, une transition de vie, ou simplement une envie de pause partagée.",
  ],
};

const cerclesSteps = [
  { label: "I", title: "Arriver.", body: "On s'installe en cercle, autour d'objets symboliques. Un temps de respiration. Chacune est accueillie comme elle est." },
  { label: "II", title: "Déposer.", body: "Un tour de parole optionnel — vous pouvez parler ou rester en silence. On peut s'appuyer sur un thème, une intention, ou laisser émerger." },
  { label: "III", title: "Refermer.", body: "Un dernier temps de présence en cercle, pour intégrer. Ce qui se dit dans le cercle reste dans le cercle." },
];

const cerclesFaq = [
  { q: "Faut-il être en couple, célibataire, mère, etc. ?", a: "Non. Le cercle accueille toutes les femmes (au sens large — toute personne se reconnaissant dans cette identité), à toute étape de vie. C'est précisément la diversité qui fait la richesse du cercle." },
  { q: "Combien de personnes dans un cercle ?", a: "Toujours en petit comité, généralement 6 à 10 personnes maximum. Pour préserver l'intimité et la sécurité du cadre." },
  { q: "Faut-il préparer quelque chose ?", a: "Non. Vous arrivez comme vous êtes. Si un thème est annoncé, vous pouvez y réfléchir, mais ce n'est pas obligatoire." },
  { q: "À quelle fréquence ont lieu les cercles ?", a: "Mensuellement, généralement. Les dates sont annoncées 2 à 3 semaines à l'avance aux personnes inscrites sur la liste d'intérêt." },
  { q: "Quel est le tarif ?", a: "Le tarif varie selon le lieu et la formule. Il est précisé à chaque ouverture de cercle. Si le tarif est un frein, parlez-en à Céline — on trouve des arrangements." },
];

export default function CerclesDeFemmesPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Cercles de femmes"
        greeting="Venir comme on est."
        title={
          <>
            Un espace mensuel pour déposer en{" "}
            <EtincelleAccent variant="letter">sororité</EtincelleAccent>.
          </>
        }
        body="Un cercle de femmes, en petit comité, où chacune peut venir avec ce qu'elle traverse — ou avec rien de précis. Un cadre confidentiel, sans préparation requise."
        primaryCta={{ label: "Être prévenue du prochain cercle", href: "/contact?sujet=Liste%20cercles%20de%20femmes" }}
        secondaryCta={{ label: "Voir le chemin Féminin", href: "/feminin-cacao" }}
        visualId="feminin-cacao-tasse"
        variant="ritual"
      />

      <PathwayBadge pathway="feminin" />

      <DetailStrip
        assetIds={["micro-feminin-1", "micro-feminin-2", "micro-feminin-3", "micro-feminin-4", "micro-feminin-5", "micro-feminin-6"]}
        tone="rose"
        size="md"
        caption="Fragments du cercle — bougies, mains, tissus."
      />

      <PillarPourQuiSection
        eyebrow={cerclesPourQui.eyebrow}
        title={cerclesPourQui.title}
        paragraphs={cerclesPourQui.paragraphs}
        background="bg-base"
      />

      <RitualStepsSection
        eyebrow="Comment se déroule un cercle"
        title="Arriver, déposer, refermer."
        intro="Une mécanique simple, tenue avec soin. Ce qui se dit dans le cercle reste dans le cercle — c'est la règle."
        steps={cerclesSteps}
      />

      <ProchainesDates
        eyebrow="Prochains cercles"
        title="Les prochains cercles de femmes."
        kind="cercle"
        notifyLabel="Recevoir l'invitation au prochain cercle"
      />

      <PillarFaqSection items={cerclesFaq} background="bg-base" />

      <GuidanceFooter
        variant="dates"
        title="Recevoir l'invitation au prochain cercle ?"
        body="Les dates sont annoncées en priorité aux personnes inscrites sur la liste d'intérêt — pas de spam, juste les ouvertures."
      />
    </>
  );
}
