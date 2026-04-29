import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { accompagnementsIndividuels, disclaimers } from "@/lib/data";

const familyLabels: Record<string, string> = {
  comprendre: "Comprendre son chemin",
  apaiser: "Apaiser, libérer",
  corps: "Revenir au corps",
  explorer: "Explorer l'intérieur",
  feminin: "Féminin sacré",
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
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={familyLabels[practice.family]}
        title={practice.name}
        description={practice.pitch}
      />

      <section className="pb-24">
        <Container size="narrow">
          <div className="space-y-12">
            <Reveal>
              <Link
                href="/accompagnements"
                className="inline-flex items-center gap-2 text-sm text-text-medium hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Tous les accompagnements
              </Link>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-border-soft bg-bg-card p-8 md:p-10 space-y-6">
                <div>
                  <h2 className="font-display text-2xl text-text-deep mb-3">
                    Pour qui ?
                  </h2>
                  <p className="text-text-medium leading-relaxed">{practice.forWho}</p>
                </div>

                <dl className="grid gap-4 sm:grid-cols-3 pt-6 border-t border-border-soft">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-text-soft mb-1.5">Format</dt>
                    <dd className="font-display text-lg text-text-deep">{practice.format}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-text-soft mb-1.5">Durée</dt>
                    <dd className="font-display text-lg text-text-deep">{practice.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.24em] text-text-soft mb-1.5">Tarif</dt>
                    <dd className="font-display text-lg text-text-deep">{practice.price}</dd>
                  </div>
                </dl>

                {practice.disclaimer && (
                  <p className="text-xs text-text-soft leading-relaxed border border-gold-soft/40 bg-bg-soft rounded-xl p-4 flex gap-2">
                    <Etincelle size={10} />
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
                </div>
              </div>
            </Reveal>

            {related.length > 0 && (
              <Reveal>
                <div className="space-y-5 pt-8 border-t border-border-soft">
                  <h2 className="font-display text-2xl text-text-deep">
                    Dans la même famille
                  </h2>
                  <div className="grid gap-3 md:grid-cols-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/accompagnements/${r.slug}`}
                        className="group rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft hover:bg-bg-soft transition-all"
                      >
                        <p className="font-display text-lg text-text-deep">{r.name}</p>
                        <p className="text-sm text-text-medium mt-1 line-clamp-2">{r.pitch}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-3 group-hover:text-accent-deep">
                          Découvrir
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed">
                {disclaimers.bienEtre}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
