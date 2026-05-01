import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import {
  PillarPourQuiSection,
  PillarFaqSection,
} from "@/components/page/PillarSections";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { RetreatInterestForm } from "@/components/retraites/RetreatInterestForm";
import { temoignages, carouselsRefuge } from "@/lib/data";

export const metadata: Metadata = {
  title: "Retraites & immersions",
  description:
    "Quelques jours en petit groupe pour ralentir, respirer, traverser. 6 à 12 personnes, accompagnement individuel intégré, écrin choisi avec soin. Liste d'intérêt sur inscription.",
};

const retraitesHero = {
  eyebrow: "Retraites & immersions",
  greeting: "Sortir vraiment.",
  title: "Quelques jours pour ralentir, respirer, traverser.",
  body: "6 à 12 personnes, lieu choisi avec soin, séance individuelle intégrée. Souffle, innerdance, cercles, cacao, féminin sacré, nature. Pensé comme un retour, pas comme un séjour.",
  primaryCta: { label: "Recevoir les prochaines dates", href: "#interet" },
  secondaryCta: { label: "Écrire à Céline", href: "/contact" },
};

const retraitesPourQui = {
  eyebrow: "Quand une retraite prend tout son sens",
  title: "Quand le quotidien ne suffit plus.",
  paragraphs: [
    "Quand vous sentez qu'il faut un temps long, pas une heure entre deux. Quand l'envie est de couper vraiment, de ralentir, de poser plusieurs jours hors du quotidien.",
    "Quand vous traversez une transition de vie qui demande de la place. Quand vous voulez approfondir un travail commencé en séance individuelle. Quand l'appel est de vivre quelque chose de fort, en cercle, en présence d'autres.",
    "Aucune connaissance préalable nécessaire. Aucune performance attendue. Juste l'envie de vous déposer pleinement.",
  ],
};

const retraitesFaq = [
  {
    q: "Quel est le format type ?",
    a: "Trois à cinq jours en pension complète, dans un lieu sélectionné avec soin (domaine en pleine nature, en bord d'océan ou en moyenne montagne). Petit groupe de 6 à 12 personnes maximum.",
  },
  {
    q: "Faut-il avoir une expérience préalable ?",
    a: "Non. Aucune connaissance des pratiques (souffle, cacao, innerdance) n'est requise. Céline tient l'espace pour que chacun·e puisse découvrir à son rythme.",
  },
  {
    q: "Quel est le tarif ?",
    a: "Variable selon le format, le lieu et la durée. Une fourchette indicative est partagée à l'inscription à la liste d'intérêt — le détail arrive avec chaque ouverture de retraite.",
  },
  {
    q: "Comment se passe l'inscription ?",
    a: "Vous rejoignez la liste d'intérêt en bas de cette page. Quand une retraite ouvre, vous recevez un email avec les détails complets. L'inscription définitive se fait après un échange préalable avec Céline.",
  },
  {
    q: "Y a-t-il des contre-indications médicales ?",
    a: "Selon les pratiques mobilisées (notamment le breathwork chamanique), des précautions s'appliquent. L'échange préalable permet de vérifier que la retraite vous convient.",
  },
  {
    q: "L'hébergement est-il individuel ?",
    a: "Selon le lieu et la disponibilité : individuel ou en duo (chambre partagée). Précisé pour chaque retraite dans le détail envoyé.",
  },
];

/**
 * Page /retraites — Sprint B "refuge connecté".
 *
 * Sortie de :
 *  - L'ancien stats-block (6-12 / 1+1+1 / 100% / 0)
 *  - "Cinq piliers non négociables" cards 3×
 *  - Programme type 8 étapes timeline
 *  - "Trois formats" cards avec fourchettes tarifaires
 *  - "Pour qui / pas pour qui" colonnes asymétriques
 *  - SacredBackdrop "retraite", WhisperLine
 *  - BilanGiftBanner final
 *
 * À la place :
 *  - PageRefugeHero refuge avec photo retraite
 *  - PillarPourQuiSection en prose
 *  - SoftCarousel "Retraites & immersions"
 *  - Bandeau "Ce qu'on tient" (5 piliers en prose unifiée)
 *  - Témoignage cartes-souvenirs
 *  - RetreatInterestForm CONSERVÉ (Resend branché)
 *  - PillarFaqSection 6 questions
 *  - GuidanceFooter variant gift (offrir une retraite)
 */
export default function RetraitesPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={retraitesHero.eyebrow}
        greeting={retraitesHero.greeting}
        title={retraitesHero.title}
        body={retraitesHero.body}
        primaryCta={retraitesHero.primaryCta}
        secondaryCta={retraitesHero.secondaryCta}
        visualId="retraites-hero"
        background="paper-warm"
      />

      <PillarPourQuiSection
        eyebrow={retraitesPourQui.eyebrow}
        title={retraitesPourQui.title}
        paragraphs={retraitesPourQui.paragraphs}
        background="bg-base"
      />

      <CeQuonTientSection />

      <RetraitesCarrousel />

      <TemoignageSection />

      <section
        id="interet"
        className="relative paper-sand py-24 md:py-32 overflow-hidden"
      >
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 space-y-5">
                <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                  <span className="text-gold-deep">
                    <Etincelle size={11} />
                  </span>
                  <span>Liste d&apos;intérêt</span>
                </div>
                <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
                  Recevoir les prochaines dates.
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-text-medium">
                  Les retraites sont annoncées en priorité aux personnes inscrites
                  sur la liste d&apos;intérêt. Pas de spam, juste les ouvertures.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <RetreatInterestForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <PillarFaqSection items={retraitesFaq} background="bg-base" />

      <GuidanceFooter
        variant="gift"
        title="Offrir une retraite ?"
        body="Vous pouvez préparer une carte cadeau pour une personne que vous aimez — montant libre ou retraite spécifique."
      />
    </>
  );
}

/** Section "Ce qu'on tient" — 5 piliers refondus en prose unifiée. */
function CeQuonTientSection() {
  return (
    <section className="relative paper-sand py-20 md:py-28">
      <Container>
        <div className="max-w-3xl mx-auto space-y-7 text-center">
          <Reveal>
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>Ce qu&apos;on tient</span>
              </div>
              <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.2] text-text-deep">
                Un cadre simple, posé, sans fioriture.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-5 max-w-2xl mx-auto pt-4 text-left">
            <Reveal delay={0.05}>
              <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                <strong className="text-text-deep">Un écrin choisi.</strong>{" "}
                Domaines en pleine nature, lieux d&apos;accueil sélectionnés un par
                un. Pas d&apos;usine à séminaires.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                <strong className="text-text-deep">Un petit groupe.</strong> 6 à 12
                personnes maximum. Chaque participante est connue par Céline avant
                l&apos;arrivée — la qualité du cercle fait la profondeur du travail.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                <strong className="text-text-deep">Des pratiques tenues.</strong>{" "}
                Souffle, cacao, féminin sacré, innerdance, cercles, marche
                silencieuse. Composées comme une partition, jamais empilées.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                <strong className="text-text-deep">Un fil personnel.</strong> Une
                séance individuelle avec Céline est intégrée dans le déroulé. Vous
                repartez avec quelque chose qui n&apos;appartient qu&apos;à vous.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-base md:text-[1.05rem] leading-relaxed text-text-medium">
                <strong className="text-text-deep">Un cadre sécure.</strong>{" "}
                Confidentialité totale du cercle, alimentation végétarienne soignée,
                hébergement individuel ou en duo selon préférence. Aucune injonction.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** SoftCarousel "Retraites & immersions". */
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

/** Témoignage doux — un seul, posé comme un souvenir. */
function TemoignageSection() {
  const t = temoignages[0]!;
  return (
    <section className="relative paper-warm py-20 md:py-28 overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <article className="rounded-[1.5rem] bg-bg-card border border-border-soft p-8 md:p-12 rotate-[-0.6deg] hover:rotate-0 transition-transform duration-500 shadow-[0_12px_36px_rgba(31,26,46,0.08)]">
              <span
                aria-hidden
                className="font-display-italic text-4xl text-gold-deep/40 leading-none"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-xl md:text-2xl leading-[1.4] text-text-deep -mt-2">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border-soft/60 flex items-center gap-2.5">
                <span className="text-gold-deep">
                  <Etincelle size={9} />
                </span>
                <span className="font-display-italic text-[0.95rem] text-text-deep">
                  {t.name}
                </span>
              </figcaption>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
