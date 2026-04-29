import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { experiencesCollectives } from "@/lib/data";

export function CollectifHome() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Expériences collectives"
            title={
              <>
                La force du{" "}
                <span className="font-display-italic text-gold-deep">groupe</span>
              </>
            }
            description="Des espaces à plusieurs pour partager, ressentir et avancer ensemble. Chaque cercle est unique."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experiencesCollectives.map((experience, index) => (
            <Reveal key={experience.slug} delay={index * 0.04}>
              <Link
                href={experience.href}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-border-soft bg-gradient-to-br from-bg-card to-bg-soft/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.1)] hover:border-gold-soft"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-deep">
                  <Users className="h-3.5 w-3.5" />
                  <span>{experience.rhythm}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-text-deep">
                  {experience.name}
                </h3>
                <p className="text-sm text-text-medium leading-relaxed flex-1">
                  {experience.pitch}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep">
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
