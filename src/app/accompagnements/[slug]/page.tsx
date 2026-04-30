import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { NumerologyInvitation } from "@/components/numerology/NumerologyInvitation";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { accompagnementsIndividuels, disclaimers, whisperLines } from "@/lib/data";
import type { SacredFallbackKey } from "@/lib/visualAssetMap";

const familyLabels: Record<string, string> = {
  comprendre: "Comprendre son chemin",
  apaiser: "Apaiser, libérer",
  corps: "Revenir au corps",
  explorer: "Explorer l'intérieur",
  feminin: "Féminin sacré",
  cacao: "Cœur & rituel",
};

const RESERVABLE_SLUGS: string[] = [
  "numerologie",
  "hypnose",
  "cellrelease",
  "massage-energetique",
  "massage-liberation-reconnexion",
  "reflexologie",
  "breathwork",
];

/** Mapping de chaque pratique vers son axe principal (recontextualisation). */
const PATHWAY_BY_SLUG: Record<string, "memoires" | "feminin" | "corps" | "transverse"> = {
  hypnose: "memoires",
  cellrelease: "memoires",
  numerologie: "transverse",
  "massage-energetique": "feminin",
  "massage-liberation-reconnexion": "feminin",
  reflexologie: "feminin",
  "feminin-sacre": "feminin",
  "cacao-rituel": "feminin",
  breathwork: "corps",
  "innerdance-individuel": "corps",
};

const familyVisuals: Record<string, SacredFallbackKey> = {
  comprendre: "numerologie",
  apaiser: "hypnose",
  corps: "corps",
  explorer: "souffle",
  feminin: "feminin",
  cacao: "cacao",
};

const familyBackdrops: Record<
  string,
  "feminin" | "cacao" | "retraite" | "souffle" | "collectif" | "reconnexion" | "subtle"
> = {
  comprendre: "subtle",
  apaiser: "subtle",
  corps: "souffle",
  explorer: "souffle",
  feminin: "feminin",
  cacao: "cacao",
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return accompagnementsIndividuels.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const practice = accompagnementsIndividuels.find((a) => a.slug === slug);
  if (!practice) return { title: "Accompagnement" };
  return {
    title: practice.name,
    description: practice.pitch,
  };
}

export default async function AccompagnementDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const practice = accompagnementsIndividuels.find((a) => a.slug === slug);
  if (!practice) notFound();

  const related = accompagnementsIndividuels
    .filter((a) => a.family === practice.family && a.slug !== practice.slug)
    .slice(0, 4);

  const fallbackVariant = familyVisuals[practice.family] ?? "ambiance";
  const backdropVariant = familyBackdrops[practice.family] ?? "subtle";

  // Approche éditoriale par famille
  const venirChercher = chercherFor(practice.family);
  const deroule = derouleFor(practice.family);

  return (
    <>
      <PageHeader
        eyebrow={familyLabels[practice.family]}
        title={practice.name}
        description={practice.pitch}
      />

      {/* Bandeau de recontextualisation : cet outil sert un des 3 axes */}
      {PATHWAY_BY_SLUG[practice.slug] && (
        <PathwayBadge pathway={PATHWAY_BY_SLUG[practice.slug]} />
      )}

      {/* Animation numérologie remontée juste après le hero pour les visiteurs
          de cette page — la danse des chiffres est l'accroche principale. */}
      {practice.slug === "numerologie" && <NumerologyInvitation />}

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant={backdropVariant} />
        <WhisperLine
          text={whisperLines[(slug.length + 7) % whisperLines.length]}
          position="left"
          tone="gold"
        />
        <Container>
          <Link
            href="/accompagnements"
            className="inline-flex items-center gap-2 text-sm text-text-medium hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Tous les accompagnements
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
            <Reveal>
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Heart className="h-3.5 w-3.5" />
                    <span>Pour qui ?</span>
                  </div>
                  <p className="font-display text-2xl md:text-3xl leading-tight text-text-deep">
                    {practice.forWho}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Ce que l&apos;on vient chercher</span>
                  </div>
                  <ul className="space-y-2">
                    {venirChercher.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-text-medium leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Comment se déroule la séance ?</span>
                  </div>
                  <ol className="space-y-3">
                    {deroule.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-4 text-text-medium leading-relaxed"
                      >
                        <span className="font-display-italic text-gold-deep tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-text-soft italic">
                    Déroulé indicatif — chaque séance s&apos;ajuste à votre intention et à votre rythme. Modalités précises à confirmer avec Céline.
                  </p>
                </div>

                <div className="rounded-2xl border border-border-soft bg-bg-card p-6 space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Format</span>
                  </div>
                  <dl className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.2em] text-text-soft mb-1">
                        Modalité
                      </dt>
                      <dd className="font-display text-base text-text-deep">
                        {practice.format}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.2em] text-text-soft mb-1">
                        Durée
                      </dt>
                      <dd className="font-display text-base text-text-deep">
                        {practice.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.2em] text-text-soft mb-1">
                        Tarif
                      </dt>
                      <dd className="font-display text-base text-text-deep">
                        {practice.price}
                      </dd>
                    </div>
                  </dl>
                </div>

                {practice.disclaimer && (
                  <p className="text-xs text-text-soft leading-relaxed border border-gold-soft/40 bg-bg-soft rounded-xl p-4 flex gap-3">
                    <span className="text-gold mt-0.5 shrink-0">
                      <Etincelle size={10} />
                    </span>
                    <span>{practice.disclaimer}</span>
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  {RESERVABLE_SLUGS.includes(practice.slug) ? (
                    <Link href={`/reserver/${practice.slug}`} className="btn-primary">
                      Réserver une séance — {practice.price}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href={`/contact?sujet=${encodeURIComponent(practice.name)}`}
                      className="btn-primary"
                    >
                      Demander un rendez-vous
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <WhatsAppButton
                    message={`Bonjour Céline, j'aimerais réserver une séance de ${practice.name}.`}
                    variant="outline"
                  >
                    WhatsApp
                  </WhatsAppButton>
                  <Link href="/diagnostic" className="btn-secondary">
                    Faire le bilan
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="lg:sticky lg:top-28 space-y-5">
                <SmartImage
                  fallback={fallbackVariant}
                  alt={`Univers visuel — ${practice.name}`}
                  ratio="portrait"
                />
                <p className="text-xs uppercase tracking-[0.22em] text-text-soft text-center">
                  Visuel d&apos;ambiance — à remplacer par photo dédiée
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ce que cette pratique n'est pas — pour les pratiques sensibles */}
      {nestPasFor(practice.family).length > 0 && (
        <section className="section bg-bg-soft">
          <Container size="narrow">
            <Reveal>
              <div className="space-y-5 mb-10">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Etincelle size={12} />
                  <span>Ce que cette pratique n&apos;est pas</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Pour rester juste et clair.
                </h2>
              </div>
              <ul className="space-y-3">
                {nestPasFor(practice.family).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-medium leading-relaxed"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-text-soft shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Mini FAQ */}
      <section className="section">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-8">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Questions fréquentes</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Bonnes choses à savoir.
              </h2>
            </div>
            <div className="space-y-3">
              {faqFor(practice.family, practice.name).map((item) => (
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

      {related.length > 0 && (
        <section className="section bg-bg-soft">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">
                    Dans la même famille
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep mt-2">
                    {familyLabels[practice.family]}
                  </h2>
                </div>
                <Link
                  href="/accompagnements"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep"
                >
                  Voir tout l&apos;atlas
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin -mx-6 px-6">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.05}>
                  <Link
                    href={`/accompagnements/${r.slug}`}
                    className="group block w-[280px] sm:w-[320px] shrink-0 rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft hover:bg-bg-card hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)] transition-all"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-gold-deep mb-2">
                      {r.intent}
                    </p>
                    <p className="font-display text-2xl text-text-deep leading-tight mb-3">
                      {r.name}
                    </p>
                    <p className="text-sm text-text-medium leading-relaxed line-clamp-3">
                      {r.pitch}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep mt-4">
                      Découvrir
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

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

function chercherFor(family: string): string[] {
  switch (family) {
    case "comprendre":
      return [
        "Donner du sens à votre trajectoire et vos cycles",
        "Lire vos talents et vos ressources",
        "Éclairer une transition ou une décision",
        "Identifier ce qui se rejoue",
      ];
    case "apaiser":
      return [
        "Relâcher la pression et la fatigue émotionnelle",
        "Libérer ce qui demande à l'être",
        "Sortir d'un schéma répétitif",
        "Retrouver un rythme intérieur plus calme",
      ];
    case "corps":
      return [
        "Réhabiter votre corps comme une maison",
        "Relâcher les tensions accumulées",
        "Retrouver une circulation plus fluide",
        "Vous reconnecter à votre sensorialité",
      ];
    case "explorer":
      return [
        "Ouvrir un espace intérieur sans forcer",
        "Écouter ce qui cherche à émerger",
        "Vivre un état de présence inhabituel",
        "Revenir avec plus de clarté",
      ];
    case "feminin":
      return [
        "Vous reconnecter au corps et aux cycles",
        "Honorer votre énergie créatrice",
        "Déposer des héritages émotionnels",
        "Vous retrouver dans votre singularité féminine",
      ];
    case "cacao":
      return [
        "Ouvrir le cœur et la présence",
        "Vivre un rituel sensoriel doux",
        "Ralentir et écouter",
        "Vous relier au geste, au goût, au moment",
      ];
    default:
      return [
        "Ralentir et écouter",
        "Déposer ce qui demande à l'être",
        "Retrouver votre étincelle intérieure",
      ];
  }
}

function derouleFor(family: string): string[] {
  switch (family) {
    case "comprendre":
      return [
        "Accueil et échange autour de votre demande",
        "Lecture symbolique de votre carte ou date",
        "Mise en mots des cycles, des ressources, des appels",
        "Synthèse écrite et temps d'échange",
      ];
    case "apaiser":
      return [
        "Accueil et pose de l'intention",
        "Installation dans un espace tenu",
        "Pratique adaptée — souffle, voix, présence",
        "Temps d'intégration et retour calme",
      ];
    case "corps":
      return [
        "Accueil et écoute de l'état du jour",
        "Installation et préparation de l'espace",
        "Soin sur table — toucher, vibration, présence",
        "Temps de repos et intégration",
      ];
    case "explorer":
      return [
        "Échange et pose de l'intention",
        "Préparation, installation allongée ou assise",
        "Pratique soutenue par la musique ou le souffle",
        "Temps long d'intégration",
      ];
    case "feminin":
      return [
        "Accueil sensible et pose d'intention",
        "Pratique symbolique et énergétique adaptée",
        "Temps de parole confidentielle si bienvenu",
        "Clôture et retour au quotidien",
      ];
    case "cacao":
      return [
        "Accueil dans un espace tenu",
        "Préparation et partage du cacao en pleine conscience",
        "Pratique de présence — souffle, geste, silence",
        "Intégration et clôture du rituel",
      ];
    default:
      return [
        "Accueil et écoute",
        "Pratique adaptée à votre besoin",
        "Temps d'intégration",
      ];
  }
}

function nestPasFor(family: string): string[] {
  switch (family) {
    case "apaiser":
      return [
        "Ce n'est pas un acte médical ni une psychothérapie.",
        "Ce n'est pas une promesse de guérison ou de résultat.",
        "Ce n'est pas une mise en sommeil — vous restez consciente, en lien avec ce qui se passe.",
      ];
    case "explorer":
      return [
        "Ce n'est pas un acte médical, ni une psychothérapie conventionnelle.",
        "Ce n'est pas une promesse de résultat — chaque expérience est singulière.",
        "Ce n'est pas une transe forcée — Céline ajuste l'intensité à votre rythme.",
      ];
    case "feminin":
      return [
        "Ce n'est pas un soin gynécologique ou médical.",
        "Ce n'est pas une promesse de guérison de troubles physiques.",
        "Ce n'est pas un substitut à un suivi médical ou psychologique.",
        "Ce n'est pas un univers fermé — l'accompagnement est ouvert à toutes les histoires.",
      ];
    case "cacao":
      return [
        "Ce n'est pas une cérémonie psychédélique — le cacao consommé est faiblement actif.",
        "Ce n'est pas un acte médical ni une promesse de guérison.",
        "Ce n'est pas un protocole figé — chaque cérémonie s'adapte au cercle.",
      ];
    case "corps":
      return [
        "Ce n'est pas une kinésithérapie ni un acte médical.",
        "Ce n'est pas une promesse de résultat physique précis.",
      ];
    default:
      return [];
  }
}

function faqFor(family: string, name: string): { q: string; a: string }[] {
  const generic = [
    {
      q: "Comment se passe un premier rendez-vous ?",
      a: `Un premier échange par téléphone ou email permet à Céline de comprendre votre intention et de proposer le format le plus juste pour la séance de ${name}.`,
    },
    {
      q: "Y a-t-il des précautions particulières ?",
      a: "Si vous suivez un traitement médical ou avez une condition particulière (cardiaque, psychiatrique, grossesse), parlez-en à Céline avant la séance. Modalités précises à confirmer ensemble.",
    },
    {
      q: "Faut-il avoir déjà pratiqué ?",
      a: "Non. Cet accompagnement est ouvert aux personnes débutantes comme expérimentées. Céline ajuste à votre rythme.",
    },
    {
      q: "Combien de séances faut-il prévoir ?",
      a: "Cela dépend de votre intention et de ce qui se déploie. Une seule séance peut suffire — d'autres demandent un cheminement plus long. À évaluer ensemble.",
    },
  ];

  if (family === "feminin") {
    return [
      {
        q: "Cet accompagnement est-il réservé aux femmes ?",
        a: "Le travail s'inscrit dans une exploration symbolique du féminin. Il s'adresse principalement aux femmes, mais Céline peut accueillir d'autres situations sur demande.",
      },
      ...generic.slice(1, 4),
    ];
  }

  if (family === "cacao") {
    return [
      {
        q: "Quelle quantité de cacao est consommée ?",
        a: "Une dose cérémonielle, douce, qui ouvre l'écoute sans altération psychique. Le cacao utilisé est cru et non sucré.",
      },
      {
        q: "Y a-t-il des contre-indications ?",
        a: "Les personnes sous antidépresseurs (IMAO/ISRS), avec une condition cardiaque ou enceintes doivent demander un avis médical. Parlez-en à Céline avant l'inscription.",
      },
      ...generic.slice(2, 4),
    ];
  }

  return generic;
}
