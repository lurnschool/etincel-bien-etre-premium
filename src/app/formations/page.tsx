import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { formations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Formations en numérologie modules 1 et 2 — apprendre à lire la symbolique des nombres et accompagner avec rigueur.",
};

export default function FormationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Se former auprès de Céline"
        title={
          <>
            Apprendre, transmettre,{" "}
            <span className="font-display-italic text-gold-deep">incarner</span>
          </>
        }
        description="Des parcours de formation pour développer une pratique solide et juste, à votre rythme."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {formations.map((formation, i) => (
              <Reveal key={formation.slug} delay={i * 0.05}>
                <article className="group flex h-full flex-col rounded-3xl border border-border-soft bg-bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.1)] hover:border-gold-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-text-deep mb-3">
                    {formation.name}
                  </h3>
                  <p className="text-text-medium leading-relaxed flex-1">
                    {formation.pitch}
                  </p>
                  <dl className="mt-6 pt-6 border-t border-border-soft space-y-2 text-sm">
                    <div className="flex justify-between text-text-soft">
                      <dt>Durée</dt>
                      <dd className="text-text-medium">{formation.duration}</dd>
                    </div>
                    <div className="flex justify-between text-text-soft">
                      <dt>Tarif</dt>
                      <dd className="text-text-medium font-medium">{formation.price}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/contact?sujet=${encodeURIComponent(formation.name)}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep"
                  >
                    Demander plus d'informations
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 text-center text-sm text-text-soft max-w-2xl mx-auto">
              Programme détaillé, dates et modalités d'inscription : à valider avec Céline avant publication.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
