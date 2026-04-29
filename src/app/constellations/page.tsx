import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Users, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { whisperLines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Constellations familiales & de naissance — Bordeaux Gironde",
  description:
    "Explorer les dynamiques familiales, symboliques ou intérieures qui influencent votre chemin. Constellations familiales et de naissance Rebirth avec Céline Dusseval.",
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
    note: "Modalités précises à confirmer avec Céline",
  },
  {
    icon: Users,
    title: "Constellation en groupe",
    description:
      "Le groupe devient miroir et soutien. Chaque place qu'on prend dans le cercle révèle quelque chose de l'histoire.",
    note: "Sessions ponctuelles — dates à venir",
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
    q: "Faut-il connaître son arbre généalogique en détail ?",
    a: "Non. Souvent, ce qui se présente n'a pas besoin d'être nommé. Le champ travaille avec ce qui est juste — y compris ce que vous ne savez pas consciemment.",
  },
  {
    q: "Est-ce une thérapie ?",
    a: "Non. C'est une démarche symbolique et systémique. Elle ne remplace pas un suivi psychologique ou médical lorsque celui-ci est nécessaire.",
  },
  {
    q: "Combien de séances faut-il ?",
    a: "Une seule séance peut suffire pour un nœud précis. D'autres demandent un cheminement plus long. À évaluer avec Céline.",
  },
  {
    q: "Quelle différence entre familiale et Rebirth ?",
    a: "La constellation familiale travaille les liens systémiques (parents, ascendants, transmissions). La constellation de naissance Rebirth explore spécifiquement les empreintes de votre venue au monde.",
  },
];

export default function ConstellationsPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Pilier · Constellations"
        title={
          <>
            Éclairer les{" "}
            <span className="font-display-italic text-gold-gradient">
              liens invisibles
            </span>
          </>
        }
        description="Une démarche symbolique et systémique pour explorer ce qui se transmet, ce qui se rejoue, ce qui demande à être vu."
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

      <section className="relative bg-bg-soft py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Deux formats
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Individuel ou en cercle.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <article className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8 h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep mb-3 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-text-medium leading-relaxed">{f.description}</p>
                  <p className="text-xs text-text-soft italic mt-4">{f.note}</p>
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
                Bonnes choses à savoir.
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
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-10 md:p-14 text-center max-w-3xl mx-auto space-y-5">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center justify-center gap-3">
                <Etincelle size={11} />
                Premier pas
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Demander un échange préalable.
              </h2>
              <p className="text-text-medium leading-relaxed max-w-xl mx-auto">
                Aucune constellation ne se fait sans un premier échange. Céline vous appelle pour comprendre votre intention et proposer le format le plus juste.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link href="/contact?sujet=Constellations" className="btn-primary">
                  Demander un échange
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/diagnostic" className="btn-secondary">
                  Faire le diagnostic
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
