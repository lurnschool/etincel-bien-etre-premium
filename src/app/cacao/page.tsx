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
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { carouselsRefuge, disclaimers } from "@/lib/data";

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

const cacaoPourQui = {
  eyebrow: "Pour qui",
  title: "Quand le besoin est de ralentir et d'ouvrir.",
  paragraphs: [
    "Pour celles et ceux qui cherchent à ralentir, à ouvrir un espace de présence, à se déposer un instant. Pour les femmes qui souhaitent se relier au féminin, en cercle ou en duo.",
    "Pour les personnes en transition qui cherchent un rituel doux pour marquer un passage. Pour les groupes (équipes, collectifs, cercles d'amis) qui veulent vivre une parenthèse alignée.",
    "Aucun pré-requis. Aucune connaissance préalable nécessaire. Juste l'envie de se poser.",
  ],
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
 * Page /cacao — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - PageHeader variant "deep" + gold-gradient titre
 *  - SmartImage sticky + ImageMosaic trio + SacredBackdrop "cacao" (×2)
 *  - WhisperLine
 *  - Bloc "Précautions" sur fond bg-deep dramatique
 *  - "Pratiques en résonance" en grille 4 cards
 *
 * À la place :
 *  - PageRefugeHero refuge
 *  - PathwayBadge adouci (chemin féminin)
 *  - PillarPourQuiSection en prose
 *  - PillarFormatsSection 3 cards
 *  - SoftCarousel "Cercles & cérémonies cacao"
 *  - PillarFaqSection 5 questions
 *  - PillarDisclaimer santé
 *  - GuidanceFooter contact
 */
export default function CacaoPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={cacaoHero.eyebrow}
        greeting={cacaoHero.greeting}
        title={cacaoHero.title}
        body={cacaoHero.body}
        primaryCta={cacaoHero.primaryCta}
        secondaryCta={cacaoHero.secondaryCta}
        visualId="cacao-detail"
        background="paper-warm"
      />

      <PathwayBadge pathway="feminin" />

      <PillarPourQuiSection
        eyebrow={cacaoPourQui.eyebrow}
        title={cacaoPourQui.title}
        paragraphs={cacaoPourQui.paragraphs}
        background="bg-base"
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
