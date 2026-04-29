import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Cercles de femmes, breathwork, innerdance, ateliers, retraites : retrouvez les prochaines dates dès qu'elles sont confirmées.",
};

const filters = [
  "Tous",
  "Cercles de femmes",
  "Breathwork",
  "Innerdance",
  "Constellations",
  "Retraites",
  "Formations",
  "Ateliers",
];

export default function EvenementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title={
          <>
            Les prochains{" "}
            <span className="font-display-italic text-gold-deep">rendez-vous</span>
          </>
        }
        description="Les dates des cercles, ateliers, breathwork, retraites et formations seront publiées dès qu'elles sont confirmées."
      />

      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                    i === 0
                      ? "bg-accent text-text-on-dark border-accent"
                      : "border-border-medium text-text-medium hover:border-accent hover:text-accent"
                  }`}
                  type="button"
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-[2rem] border border-border-soft bg-gradient-to-br from-bg-soft via-bg-card to-bg-card p-10 md:p-16 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                <Calendar className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-text-deep max-w-2xl mx-auto leading-tight">
                Les prochaines dates seront bientôt annoncées.
              </h2>
              <p className="text-text-medium leading-relaxed max-w-xl mx-auto">
                Pour ne rien manquer, rejoignez la liste d'intérêt — vous recevrez un email dès que les prochains événements seront ouverts aux inscriptions.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link href="/contact?sujet=Liste événements" className="btn-primary">
                  Être informée des prochains événements
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/cercles-de-femmes" className="btn-secondary">
                  Cercles de femmes
                </Link>
                <Link href="/retraites" className="btn-secondary">
                  Retraites
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-16 rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <Etincelle size={12} />
              <span>
                Cette page n'affiche aucun événement passé comme à venir. Le programme est mis à jour uniquement quand de nouvelles dates sont confirmées par Céline.
              </span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
