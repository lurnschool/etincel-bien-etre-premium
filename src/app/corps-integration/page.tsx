import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  Compass,
  Flame,
  Mountain,
  Quote,
  Shield,
  Sparkles,
  Wind,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { whisperLines, disclaimers, temoignages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Corps & intégration — Innerdance, Breathwork, retraites · Bordeaux",
  description:
    "Innerdance, breathwork chamanique, retraites immersives avec Céline Dusseval. Intégrer par le corps ce que les mots ne suffisent pas à transformer. Le souffle, le mouvement et l'expérience intérieure.",
};

const whatYouCarry = [
  "Vous avez déjà beaucoup compris — les mots ne suffisent plus",
  "Une transformation entamée qui demande à s'inscrire dans le corps",
  "Le besoin d'aller chercher ce qui demande à émerger sans détour analytique",
  "Une intuition qu'il faut traverser, pas seulement parler",
  "Le sentiment qu'une séance individuelle ne suffit plus à déplacer",
  "Le désir d'une expérience puissante, intense, mémorable",
];

const formats = [
  {
    icon: Wind,
    title: "Innerdance",
    description:
      "Une immersion sonore et somatique mêlant musique, présence et écoute du corps. Pour laisser émerger ce qui demande à être vu sans passer par la parole. Format individuel ou collectif.",
    duration: "Format à confirmer selon session",
    price: "Sur demande",
    href: "/innerdance",
  },
  {
    icon: Flame,
    title: "Breathwork chamanique",
    description:
      "La puissance du souffle pour traverser et transmuter ce qui demande à être déposé. Pratique respiratoire intense — un échange préalable avec Céline est systématique pour vérifier les contre-indications.",
    duration: "2h",
    price: "90 € individuel · 140 € en duo",
    href: "/accompagnements/breathwork",
  },
  {
    icon: Mountain,
    title: "Retraites immersives",
    description:
      "Le format où l'intégration corporelle trouve son plein déploiement : 2 à 7 jours, petits groupes, séance individuelle intégrée, écrins choisis. Le souffle, le cacao, l'innerdance, les cercles s'orchestrent ensemble.",
    duration: "Journée · week-end · 5 à 7 jours",
    price: "180 € à 1 890 €",
    href: "/retraites",
  },
];

const tools = [
  {
    name: "Massage énergétique",
    description:
      "Pour préparer le terrain corporel avant le travail intense — réactiver la circulation, relâcher les tensions accumulées.",
    href: "/accompagnements/massage-energetique",
  },
  {
    name: "Réflexologie amérindienne",
    description: "Une pratique chamanique mexicaine qui stimule des zones réflexes des pieds pour ouvrir le corporel et le symbolique en même temps.",
    href: "/accompagnements/reflexologie",
  },
  {
    name: "Hypnose & mouvements oculaires",
    description: "Quand un voyage intérieur préparatoire ou complémentaire éclaire le travail corporel.",
    href: "/accompagnements/hypnose",
  },
  {
    name: "CellRelease®",
    description: "Pour décanter dans le corps ce qui s'est levé pendant un breathwork ou une retraite.",
    href: "/accompagnements/cellrelease",
  },
];

const prepare = [
  {
    title: "Pas de repas lourd avant",
    description: "Privilégiez un repas léger 2-3 heures avant la pratique pour faciliter le souffle et le mouvement.",
  },
  {
    title: "Vêtements souples",
    description: "Confort total. Le corps doit être libre — pas de jeans, pas de boutons qui gênent l'allongé ou le mouvement.",
  },
  {
    title: "Hydratation",
    description: "Une bouteille d'eau à portée. Le breathwork notamment demande à être bien hydratée avant et après.",
  },
  {
    title: "Échange préalable obligatoire pour le breathwork",
    description: "Antécédents cardiaques, traitements (IMAO/ISRS), grossesse, troubles psychiatriques actifs : un point individuel est systématique avant.",
  },
  {
    title: "Confidentialité du cercle",
    description: "Pour les pratiques collectives, le cadre est posé : ce qui se vit dans le cercle reste dans le cercle.",
  },
];

const faq = [
  {
    q: "Quelle différence entre Innerdance et Breathwork ?",
    a: "L'Innerdance mobilise principalement la musique, la présence et l'écoute somatique — c'est plus doux et symbolique. Le Breathwork chamanique mobilise une respiration soutenue qui crée des états modifiés de conscience plus intenses. Les deux peuvent se compléter dans un parcours.",
  },
  {
    q: "Y a-t-il des contre-indications au Breathwork ?",
    a: "Oui. Antécédents cardiaques, traitements antidépresseurs (IMAO/ISRS), troubles psychiatriques actifs, grossesse à risque : un échange préalable systématique permet de valider votre participation et de proposer une alternative si nécessaire.",
  },
  {
    q: "Faut-il avoir déjà pratiqué ?",
    a: "Non. Ces pratiques accueillent débutantes et expérimentées. Céline ajuste l'intensité au groupe et propose des modulations individuelles pour chaque pratique.",
  },
  {
    q: "Est-ce une thérapie ?",
    a: "Non. Ce sont des démarches de bien-être et de développement personnel, basées sur la mobilisation du corps. Elles ne remplacent pas un suivi médical, psychologique ou thérapeutique conventionnel lorsque celui-ci est nécessaire.",
  },
  {
    q: "Combien de séances faut-il pour ressentir un effet ?",
    a: "Souvent une seule pratique suffit pour goûter l'effet. Pour un travail de fond, un parcours combinant 2-3 séances rapprochées + une retraite week-end est souvent plus juste.",
  },
  {
    q: "Et après une retraite, comment ça se passe ?",
    a: "Beaucoup de personnes prolongent en s'abonnant au Studio Le Cercle Etincel pour rester en lien (méditations, cercle live mensuel). D'autres reviennent pour une séance individuelle d'intégration.",
  },
];

export default function CorpsIntegrationPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Axe 3 · Corps & intégration"
        title={
          <>
            Intégrer par le corps ce que les{" "}
            <span className="font-display-italic text-gold-gradient">mots</span>{" "}
            ne suffisent pas à transformer.
          </>
        }
        description="Innerdance, breathwork chamanique, retraites immersives. Le souffle, le mouvement et l'expérience intérieure pour ancrer ce qui demande à se transformer après une constellation, un travail sur le féminin, ou une transition de vie."
      />

      <section className="bg-bg-deep text-text-on-dark py-10 border-y border-white/10 relative overflow-hidden">
        <SacredBackdrop variant="souffle" intensity="soft" />
        <Container className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "90 €", label: "breathwork individuel · 2h" },
              { value: "6 à 12", label: "personnes en retraite max" },
              { value: "1+1", label: "individuel + immersion" },
              { value: "0", label: "promesse thérapeutique médicale" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="font-display text-3xl md:text-4xl text-gold">{s.value}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-text-on-dark-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="souffle" />
        <WhisperLine text={whisperLines[14]} position="left" tone="gold" />
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Activity className="h-3.5 w-3.5" />
                  Ce qui appelle l'intégration corporelle
                </span>
                <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-deep">
                  Comprendre ne{" "}
                  <span className="font-display-italic text-gold-deep">suffit pas</span>{" "}
                  toujours.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  À un certain point, l'analyse atteint sa limite. Ce qui doit changer en vous demande à être traversé physiquement — par le souffle, le mouvement, la sensation tenue dans la durée.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border-soft border-y border-border-soft">
                {whatYouCarry.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <li className="flex items-baseline gap-4 py-5 md:py-6">
                      <span className="font-display-italic text-[0.85rem] tabular-nums text-gold-deep shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl text-text-deep leading-snug">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5" />
                Trois formats principaux
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Du plus doux au plus immersif.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Chaque format engage le corps différemment. Céline ajuste l'intensité à votre niveau d'engagement et à ce qui se présente.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <article className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8 h-full flex flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep leading-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-text-medium leading-relaxed flex-1 mb-5">{f.description}</p>
                  <dl className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-border-soft mb-4">
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Durée</dt>
                      <dd className="font-display text-sm text-text-deep">{f.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Tarif</dt>
                      <dd className="font-display text-sm text-text-deep">{f.price}</dd>
                    </div>
                  </dl>
                  <Link href={f.href} className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1.5">
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Compass className="h-3.5 w-3.5" />
                Outils complémentaires
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Pour préparer ou ancrer le travail.
              </h2>
              <p className="text-text-medium leading-relaxed">
                L'innerdance ou le breathwork ne se font pas dans le vide. Avant ou après, ces outils peuvent préparer le terrain ou ancrer ce qui s'est levé.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.04}>
                <article className="rounded-2xl border border-border-soft bg-bg-card p-5 h-full flex flex-col">
                  <h3 className="font-display text-lg text-text-deep leading-tight mb-2">{t.name}</h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1">{t.description}</p>
                  <Link href={t.href} className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:text-accent-deep">
                    Découvrir
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Comment se préparer
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Quelques repères avant de venir.
              </h2>
            </div>
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prepare.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <li className="rounded-2xl border border-border-soft bg-bg-card p-5">
                  <p className="font-display text-base text-text-deep mb-1.5">{p.title}</p>
                  <p className="text-sm text-text-medium leading-relaxed">{p.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="souffle" intensity="medium" />
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="h-8 w-8 text-gold mx-auto" />
              <p className="font-display-italic text-2xl md:text-4xl leading-[1.2] text-text-on-dark">
                « {temoignages[0].quote} »
              </p>
              <p className="text-gold-soft font-display-italic">— {temoignages[0].name}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de pratiquer.
              </h2>
            </div>
            <div className="space-y-3">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border-soft bg-bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer flex items-center justify-between gap-4 list-none">
                    <span className="font-display text-lg text-text-deep">{item.q}</span>
                    <span className="text-text-soft group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-text-medium leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Mountain className="h-3.5 w-3.5" />
                  <span>Premier pas</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Vivre une{" "}
                  <span className="font-display-italic text-gold-deep">expérience corporelle</span>.
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Pour les pratiques individuelles : un échange préalable systématique. Pour les retraites : inscription à la liste d&apos;intérêt et programme envoyé en avant-première.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/retraites" className="btn-primary w-full justify-center">
                  Voir les retraites
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton message="Bonjour Céline, je m'intéresse à l'axe Corps & intégration (Innerdance, Breathwork, retraites)." className="w-full justify-center">
                  Échanger sur WhatsApp
                </WhatsAppButton>
                <Link href="/diagnostic" className="btn-secondary w-full justify-center">
                  Faire le bilan d&apos;orientation
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BilanGiftBanner
        variant="warm"
        title="Continuer l'exploration"
        subtitle="Cet axe résonne mais d'autres chemins peuvent ouvrir aussi le travail."
      />

      <section className="section">
        <Container>
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link
                href="/memoires-constellations"
                className="group rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft transition-colors"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-2">Axe 1</p>
                <p className="font-display text-xl text-text-deep">Mémoires & constellations</p>
                <p className="text-sm text-text-medium mt-2 leading-relaxed">
                  Libérer les mémoires qui ne vous appartiennent plus.
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-4 group-hover:text-accent-deep">
                  Découvrir
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/feminin-cacao"
                className="group rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft transition-colors"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-2">Axe 2</p>
                <p className="font-display text-xl text-text-deep">Féminin & cacao</p>
                <p className="text-sm text-text-medium mt-2 leading-relaxed">
                  Revenir au corps, au cœur et au féminin.
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-4 group-hover:text-accent-deep">
                  Découvrir
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <Shield className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
              <span>{disclaimers.breathwork}</span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
