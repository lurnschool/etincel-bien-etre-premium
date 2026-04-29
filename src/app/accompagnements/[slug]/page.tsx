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
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
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
                  <Link
                    href={`/contact?sujet=${encodeURIComponent(practice.name)}`}
                    className="btn-primary"
                  >
                    Demander un rendez-vous
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/diagnostic" className="btn-secondary">
                    Faire le diagnostic
                  </Link>
                  <Link
                    href="/contact?sujet=Question"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm text-text-medium hover:text-accent transition-colors"
                  >
                    Poser une question
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
