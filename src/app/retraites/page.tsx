import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { PillarFaqSection } from "@/components/page/PillarSections";
import { SoftCarousel } from "@/components/ui/SoftCarousel";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { RetreatInterestForm } from "@/components/retraites/RetreatInterestForm";
import { temoignages, carouselsRefuge, retraitesQuitteRetrouve } from "@/lib/data";

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
 * Page /retraites — Sprint C "pages-pièces".
 *
 * Pièce du refuge : L'OUVERTURE VERS LE DEHORS, LA NATURE, LE TEMPS LONG.
 * Émotion : ouverture, nature, temps long.
 *
 * Différenciation :
 *  - Hero variant "nature" — bandeau visuel ample (paysage horizon),
 *    texte centré respirant en dessous, palette sable/horizon
 *  - DetailStrip ton "warm" sous le hero — détails de retraite
 *  - QuitteRetrouveSection : 2 colonnes face-à-face "Ce qu'on quitte / Ce qu'on retrouve"
 *    — pas une grille de cards
 *  - SoftCarousel "Retraites & immersions"
 *  - Témoignage — un seul, en carte-souvenir
 *  - RetreatInterestForm CONSERVÉ (Resend)
 *  - PillarFaqSection
 *  - GuidanceFooter variant "gift"
 */
export default function RetraitesPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={retraitesHero.eyebrow}
        greeting={retraitesHero.greeting}
        title={
          <>
            Quelques jours pour{" "}
            <EtincelleAccent variant="glow">ralentir</EtincelleAccent>,
            respirer, traverser.
          </>
        }
        body={retraitesHero.body}
        primaryCta={retraitesHero.primaryCta}
        secondaryCta={retraitesHero.secondaryCta}
        visualId="retraites-hero"
        variant="nature"
      />

      <DetailStrip
        assetIds={[
          "micro-retraites-1",
          "micro-retraites-2",
          "micro-retraites-3",
          "micro-retraites-4",
          "micro-retraites-5",
          "micro-retraites-6",
        ]}
        tone="sand"
        size="md"
        caption="Fragments de moments partagés en retraite."
      />

      <QuitteRetrouveSection />

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

/** Section "Ce qu'on quitte / Ce qu'on retrouve" — 2 colonnes face-à-face. */
function QuitteRetrouveSection() {
  const { quitte, retrouve } = retraitesQuitteRetrouve;
  return (
    <section className="relative bg-bg-base py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20 space-y-5">
          <Reveal>
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>Le mouvement d&apos;une retraite</span>
            </div>
            <h2 className="font-display text-balance text-3xl md:text-4xl leading-[1.15] tracking-tight text-text-deep">
              Ce qu&apos;on quitte, ce qu&apos;on retrouve.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Quitte — palette grise/sable */}
          <Reveal>
            <article className="rounded-[1.5rem] border border-border-soft bg-bg-soft/40 p-7 md:p-9 space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display-italic text-3xl text-text-soft">←</span>
                <h3 className="font-display text-xl md:text-2xl text-text-deep">
                  {quitte.title}
                </h3>
              </div>
              <ul className="space-y-3 text-text-medium">
                {quitte.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-[0.95rem] leading-relaxed line-through decoration-text-soft/40 decoration-1 underline-offset-2"
                  >
                    <span className="text-text-soft">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Retrouve — palette dorée chaude */}
          <Reveal delay={0.1}>
            <article className="rounded-[1.5rem] border border-gold-soft/50 bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card p-7 md:p-9 space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display-italic text-3xl text-gold-deep">→</span>
                <h3 className="font-display text-xl md:text-2xl text-text-deep">
                  {retrouve.title}
                </h3>
              </div>
              <ul className="space-y-3 text-text-deep">
                {retrouve.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-[0.95rem] leading-relaxed"
                  >
                    <span className="text-gold-deep">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function RetraitesCarrousel() {
  const c = carouselsRefuge.retraitesImmersions;
  return (
    <section className="relative paper-sand py-20 md:py-28 overflow-hidden">
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

function TemoignageSection() {
  const t = temoignages[0]!;
  return (
    <section className="relative bg-bg-base py-20 md:py-28 overflow-hidden">
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
