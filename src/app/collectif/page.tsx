import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { experiencesCollectives } from "@/lib/data";

export const metadata: Metadata = {
  title: "Expériences collectives",
  description:
    "Cercles de femmes, breathwork, innerdance, constellations, ateliers et week-ends reconnexion : la force du groupe.",
};

export default function CollectifPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Expériences collectives"
        title={
          <>
            La force du{" "}
            <span className="font-display-italic text-gold-deep">groupe</span>
          </>
        }
        description="Des espaces partagés pour traverser, ressentir et avancer ensemble. Chaque expérience est unique."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {experiencesCollectives.map((experience, i) => (
              <Reveal key={experience.slug} delay={i * 0.05}>
                <article id={experience.slug} className="group flex h-full flex-col gap-4 rounded-3xl border border-border-soft bg-bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.1)] hover:border-gold-soft">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-deep">
                    <Users className="h-3.5 w-3.5" />
                    <span>{experience.rhythm}</span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-text-deep">
                    {experience.name}
                  </h3>
                  <p className="text-text-medium leading-relaxed flex-1">
                    {experience.pitch}
                  </p>
                  <Link
                    href={experience.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep mt-2"
                  >
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
