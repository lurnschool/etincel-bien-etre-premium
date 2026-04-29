import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Users, User, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { whisperLines, disclaimers } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Constellations familiales & de naissance — Bordeaux Gironde",
  description:
    "Constellation familiale ou de naissance Rebirth — 95 € la séance. Explorer les dynamiques familiales et symboliques avec Céline Dusseval, en Gironde.",
};

const explore = [
  "Une dynamique familiale qui se rejoue",
  "Une loyauté invisible qui pèse",
  "Un schéma transgénérationnel",
  "Une mémoire d'enfance qui demande la lumière",
  "Une question liée à votre naissance",
  "Une place à reprendre dans la lignée",
];

const formats = [
  {
    icon: User,
    title: "Constellation individuelle",
    description:
      "Un travail à deux avec Céline — figurines, symboles ou imaginaire actif selon ce qui se présente.",
    duration: "1h30 à 2h",
    price: "95 €",
    href: "/contact?sujet=Constellation%20individuelle",
    cta: "Réserver une séance",
  },
  {
    icon: Users,
    title: "Constellation en groupe",
    description:
      "Le groupe devient miroir et soutien. Chaque place qu'on prend dans le cercle révèle quelque chose de l'histoire.",
    duration: "Demi-journée",
    price: "95 €",
    href: "/contact?sujet=Constellation%20en%20groupe",
    cta: "Rejoindre la prochaine session",
  },
  {
    icon: Calendar,
    title: "Constellation de naissance · Rebirth",
    description:
      "Un voyage symbolique au cœur de votre venue au monde et des empreintes qu'elle a laissées.",
    duration: "1h30 à 2h",
    price: "95 €",
    href: "/contact?sujet=Constellation%20de%20naissance%20Rebirth",
    cta: "Demander un Rebirth",
  },
];

const deroule = [
  "Échange préalable pour poser l'intention",
  "Mise en place du champ — figures, symboles, ressentis",
  "Lecture sensible de ce qui se présente",
  "Mouvements, paroles, gestes qui dénouent",
  "Clôture symbolique et intégration",
];

const faq = [
  {
    q: "Quel est le tarif d'une constellation ?",
    a: "95 € la séance — quel que soit le format (individuelle, en groupe, ou Rebirth de naissance). La séance dure entre 1h30 et 2h.",
  },
  {
    q: "Faut-il connaître son arbre généalogique en détail ?",
    a: "Non. Souvent, ce qui se présente n'a pas besoin d'être nommé. Le champ travaille avec ce qui est juste — y compris ce que vous ne savez pas consciemment.",
  },
  {
    q: "Est-ce une thérapie ?",
    a: "Non. C'est une démarche symbolique et systémique. Elle ne remplace pas un suivi psychologique ou médical lorsque celui-ci est nécessaire.",
  },
  {
    q: "Combien de séances faut-il ?",
    a: "Une seule séance peut suffire pour un nœud précis. D'autres demandent un cheminement plus long. Céline propose un format adapté après le premier échange.",
  },
  {
    q: "Quelle différence entre familiale et Rebirth ?",
    a: "La constellation familiale travaille les liens systémiques (parents, ascendants, transmissions). La constellation de naissance Rebirth explore spécifiquement les empreintes de votre venue au monde.",
  },
  {
    q: "Faut-il être en présentiel ?",
    a: "Oui — les constellations se déroulent en présentiel dans le cabinet de Céline (Le Taillan-Médoc) ou à Univers'elles (Martignas-sur-Jalle), selon la session.",
  },
];

export default function ConstellationsPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Pilier · Constellations · 95 €"
        title={
          <>
            Éclairer les{" "}
            <span className="font-display-italic text-gold-gradient">
              liens invisibles
            </span>
          </>
        }
        description="Une démarche symbolique et systémique pour explorer ce qui se transmet, ce qui se rejoue, ce qui demande à être vu. 95 € la séance, en individuel ou en groupe."
      />

      <section className="relative py-24 md:py-32 overflow-hidden">
        <SacredBackdrop variant="feminin" />
        <WhisperLine text={whisperLines[0]} position="left" tone="amethyst" />

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Etincelle size={11} />
                  Ce que les constellations permettent d&apos;explorer
                </span>
                <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-deep">
                  Quand l&apos;invisible{" "}
                  <span className="font-display-italic text-gold-deep">
                    travaille
                  </span>{" "}
                  en silence.
                </h2>
                <SmartImage
                  fallback="feminin"
                  alt="Espace de constellation — bougies et figurines"
                  ratio="landscape"
                  className="mt-6"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border-soft border-y border-border-soft">
                {explore.map((item, i) => (
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

      <section id="formats" className="relative bg-bg-soft py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Trois formats · 95 € la séance
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Individuel, en cercle ou Rebirth.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Chaque format permet d&apos;explorer ce qui demande à être vu. Céline ajuste sa proposition après un premier échange préalable.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-text-medium leading-relaxed flex-1">{f.description}</p>
                  <dl className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-border-soft">
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Durée</dt>
                      <dd className="font-display text-sm text-text-deep">{f.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Tarif</dt>
                      <dd className="font-display text-sm text-text-deep">{f.price}</dd>
                    </div>
                  </dl>
                  <Link
                    href={f.href}
                    className="inline-flex items-center justify-between gap-2 rounded-full bg-accent-deep px-4 py-2.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                  >
                    {f.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-4">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Etincelle size={11} />
                  Le déroulé indicatif
                </span>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Comment se passe une séance.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Chaque séance est unique — Céline ajuste à votre intention et à ce qui demande à émerger. Voici un repère.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="space-y-px border-y border-border-soft">
                {deroule.map((step, i) => (
                  <Reveal key={step} delay={i * 0.05}>
                    <li className="flex items-baseline gap-4 py-5 md:py-6 border-b border-border-soft last:border-b-0">
                      <span className="font-display-italic text-[0.85rem] tabular-nums text-gold-deep shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl text-text-deep leading-snug">
                        {step}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-6 text-xs text-text-soft italic">
                Aucune promesse de résolution garantie. Le travail constellation ouvre un espace — ce qui s&apos;en dégage demande parfois du temps pour s&apos;ancrer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-soft py-24 md:py-32">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de réserver.
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

      <section className="py-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Premier pas</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Réserver une{" "}
                  <span className="font-display-italic text-gold-deep">constellation</span>.
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Aucune constellation ne se fait sans un échange préalable. Céline vous appelle pour comprendre votre intention et proposer le format le plus juste.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact?sujet=Constellations" className="btn-primary w-full justify-center">
                  Demander un échange
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton
                  message={whatsappMessages.constellations}
                  className="w-full justify-center"
                >
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

      <section className="bg-bg-soft py-16">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-8">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Continuer l&apos;exploration
              </span>
              <h2 className="font-display text-2xl md:text-3xl leading-tight text-text-deep">
                Pratiques en résonance.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Numérologie", href: "/accompagnements/numerologie", desc: "Lire les cycles et vos ressources." },
              { label: "Hypnose", href: "/accompagnements/hypnose", desc: "Apaiser, libérer schémas." },
              { label: "Cacao", href: "/cacao", desc: "Ouvrir le cœur en cérémonie." },
              { label: "Cercles de femmes", href: "/cercles-de-femmes", desc: "Sororité mensuelle." },
            ].map((l, i) => (
              <Reveal key={l.href} delay={i * 0.05}>
                <Link
                  href={l.href}
                  className="group block rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                >
                  <p className="font-display text-lg text-text-deep">{l.label}</p>
                  <p className="text-sm text-text-medium mt-1.5 leading-relaxed">{l.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent mt-3 group-hover:text-accent-deep">
                    Découvrir
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed">
              {disclaimers.bienEtre}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
