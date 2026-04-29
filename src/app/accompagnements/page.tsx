import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { accompagnementsIndividuels, disclaimers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accompagnements individuels",
  description:
    "Numérologie, hypnose, CellRelease®, massage énergétique, réflexologie amérindienne, breathwork, innerdance, féminin sacré : choisissez la séance qui vous correspond.",
};

const familyConfig = [
  { id: "comprendre", label: "Comprendre son chemin", color: "from-gold-soft/40 to-bg-card" },
  { id: "apaiser", label: "Apaiser, libérer", color: "from-accent-soft/30 to-bg-card" },
  { id: "corps", label: "Revenir au corps", color: "from-rose-soft/40 to-bg-card" },
  { id: "explorer", label: "Explorer l'intérieur", color: "from-bg-soft to-bg-card" },
  { id: "feminin", label: "Féminin sacré", color: "from-rose-soft/50 to-bg-card" },
] as const;

export default function AccompagnementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accompagnements individuels"
        title={
          <>
            Une séance pour{" "}
            <span className="font-display-italic text-gold-deep">votre histoire</span>
          </>
        }
        description="Chaque pratique est une porte d'entrée. Céline ajuste l'approche, le rythme, la profondeur."
      />

      <section className="pb-24">
        <Container>
          <div className="space-y-20">
            {familyConfig.map((family) => {
              const items = accompagnementsIndividuels.filter((a) => a.family === family.id);
              if (!items.length) return null;
              return (
                <div key={family.id} className="space-y-6">
                  <Reveal>
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Famille</p>
                        <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep mt-2">
                          {family.label}
                        </h2>
                      </div>
                    </div>
                  </Reveal>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => (
                      <Reveal key={item.slug} delay={i * 0.04}>
                        <article className={`group relative h-full overflow-hidden rounded-3xl border border-border-soft bg-gradient-to-br ${family.color} p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.1)] hover:border-gold-soft`}>
                          <h3 className="font-display text-2xl leading-tight text-text-deep mb-3">
                            {item.name}
                          </h3>
                          <p className="text-sm text-text-medium leading-relaxed flex-1">
                            {item.pitch}
                          </p>
                          <p className="text-xs text-text-soft mt-4 italic">
                            {item.forWho}
                          </p>
                          <dl className="mt-5 pt-5 border-t border-border-soft space-y-1.5 text-xs text-text-soft">
                            <div className="flex justify-between gap-3">
                              <dt>Format</dt>
                              <dd className="text-text-medium">{item.format}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt>Durée</dt>
                              <dd className="text-text-medium">{item.duration}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt>Tarif</dt>
                              <dd className="text-text-medium font-medium">{item.price}</dd>
                            </div>
                          </dl>
                          {item.disclaimer && (
                            <p className="mt-4 text-[0.65rem] leading-relaxed text-text-soft border border-gold-soft/40 bg-bg-card/60 rounded-xl p-3">
                              {item.disclaimer}
                            </p>
                          )}
                          <div className="mt-5 flex items-center justify-between">
                            <Link
                              href={`/contact?sujet=${encodeURIComponent(item.name)}`}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep"
                            >
                              Demander un rendez-vous
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-20 rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed">
              {disclaimers.bienEtre}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
