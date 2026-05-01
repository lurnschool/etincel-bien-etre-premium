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
import { RitualStepsSection } from "@/components/page/sections/RitualStepsSection";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { Reveal } from "@/components/ui/Reveal";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { carouselsRefuge, disclaimers, cacaoRitualSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cérémonie cacao",
  description:
    "Une expérience symbolique et sensorielle autour du cacao, pensée comme un espace de présence et d'ouverture du cœur — en individuel, en cercle ou en retraite. Bordeaux & Gironde.",
};

const cacaoHero = {
  eyebrow: "Cérémonie cacao",
  greeting: "Une plante alliée.",
  title: "Le cacao comme espace de présence et d'ouverture du cœur.",
  body: "Un rituel sensoriel et symbolique, sans promesse de soin ni performance. Une dose cérémonielle, un espace tenu, et le temps de s'écouter.",
  primaryCta: { label: "Écrire à Céline", href: "/contact" },
  secondaryCta: { label: "Voir les retraites", href: "/retraites" },
};

const cacaoFormats = {
  eyebrow: "Plusieurs manières de vivre le cacao",
  title: "Trois formes possibles.",
  body: "Chaque cérémonie est construite sur-mesure. Le tarif tient compte du format, de la durée, du lieu et du nombre de participantes — Céline propose un cadre clair après un premier échange.",
  cards: [
    {
      id: "rituel-individuel",
      title: "Rituel individuel",
      body: "Une cérémonie en duo, ajustée à votre intention du jour. Un cheminement intime, en présence, sans temps imposé.",
      meta: "1h30 à 2h · tarif selon format",
    },
    {
      id: "cercle-cacao",
      title: "Cercle cacao",
      body: "Un cercle confidentiel en petit groupe, autour d'un thème ou d'un cycle. Partage, présence, écoute.",
      meta: "2h à 3h · tarif selon format",
    },
    {
      id: "cacao-retraite",
      title: "Cacao en retraite",
      body: "Une cérémonie intégrée à un temps long de retraite — souffle, féminin sacré, silence, nature.",
      meta: "Inclus dans la retraite",
    },
  ],
} as const;

const cacaoFaq = [
  {
    q: "Quel est le tarif d'une cérémonie cacao ?",
    a: "Le tarif dépend du format (individuel, cercle, retraite), du lieu et de la durée. Céline construit chaque cérémonie sur mesure — écrivez-lui pour recevoir une proposition adaptée.",
  },
  {
    q: "Quelle quantité de cacao est consommée ?",
    a: "Une dose cérémonielle, douce, qui ouvre l'écoute sans altération psychique. Le cacao utilisé est cru, non sucré, en provenance d'origine équitable.",
  },
  {
    q: "Y a-t-il des contre-indications ?",
    a: "Oui. Les personnes sous antidépresseurs (notamment IMAO ou ISRS), avec une condition cardiaque ou enceintes doivent demander un avis médical avant la cérémonie. Un échange préalable avec Céline est systématique.",
  },
  {
    q: "Faut-il avoir déjà pratiqué un rituel ?",
    a: "Non. Les cérémonies sont ouvertes aux personnes débutantes comme expérimentées. Céline tient l'espace pour que chacun·e puisse simplement être présent·e.",
  },
  {
    q: "Puis-je organiser une cérémonie pour mon équipe ou mon groupe ?",
    a: "Oui — Céline propose des cercles cacao sur-mesure pour des entreprises, des équipes ou des collectifs. Le format, la durée et le lieu sont définis ensemble.",
  },
];

/**
 * Page /cacao — Sprint C "pages-pièces".
 *
 * Pièce du refuge : LA TABLE RITUELLE OÙ L'ON OUVRE LE CŒUR.
 * Émotion : rituel, cœur, chaleur.
 *
 * Différenciation :
 *  - Hero variant "ritual" — fond terre cuite chaud, photo cacao centrée
 *    en cercle, EtincelleAccent doré sur "cacao"
 *  - PathwayBadge adouci (chemin féminin)
 *  - DetailStrip ton "clay" — détails de la table rituelle
 *  - RitualStepsSection : 3 temps narratifs (Entrer / Déposer / Partager)
 *    — partition verticale avec fil doré conducteur, PAS de grille
 *  - PillarFormatsSection 3 cards
 *  - SoftCarousel "Cercles & cérémonies cacao"
 *  - PillarFaqSection
 *  - PillarDisclaimer santé
 *  - GuidanceFooter variant "contact"
 */
export default function CacaoPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={cacaoHero.eyebrow}
        greeting={cacaoHero.greeting}
        title={
          <>
            Le{" "}
            <EtincelleAccent variant="letter">cacao</EtincelleAccent>{" "}
            comme espace de présence et d&apos;ouverture du cœur.
          </>
        }
        body={cacaoHero.body}
        primaryCta={cacaoHero.primaryCta}
        secondaryCta={cacaoHero.secondaryCta}
        visualId="cacao-detail"
        variant="ritual"
      />

      <PathwayBadge pathway="feminin" />

      <DetailStrip
        assetIds={[
          "micro-cacao-1",
          "micro-cacao-2",
          "micro-cacao-3",
          "micro-cacao-4",
          "micro-cacao-5",
          "micro-cacao-6",
        ]}
        tone="clay"
        size="md"
        caption="Détails du rituel — tasse, fève, mains, lumière chaude."
      />

      <RitualStepsSection
        eyebrow="Le rituel en trois temps"
        title="Entrer, déposer, partager."
        intro="Une cérémonie cacao n'est pas une suite d'étapes techniques. C'est un mouvement intérieur que je tiens avec vous."
        steps={cacaoRitualSteps}
      />

      <PillarFormatsSection
        eyebrow={cacaoFormats.eyebrow}
        title={cacaoFormats.title}
        body={cacaoFormats.body}
        cards={cacaoFormats.cards}
        background="paper-sand"
      />

      <CacaoCarrousel />

      <PillarFaqSection items={cacaoFaq} background="bg-base" />

      <PillarDisclaimer text={disclaimers.bienEtre} />

      <GuidanceFooter variant="contact" />
    </>
  );
}

function CacaoCarrousel() {
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
