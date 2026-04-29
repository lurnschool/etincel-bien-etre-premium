import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { temoignages } from "@/lib/data";

export function Temoignages() {
  return (
    <section className="section bg-bg-soft relative overflow-hidden">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Retours d'expérience"
            title={
              <>
                Les mots de celles et ceux qui ont{" "}
                <span className="font-display-italic text-gold-deep">cheminé</span>
              </>
            }
            description="Témoignages partagés par les personnes qui ont travaillé avec Céline."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {temoignages.map((temoignage, index) => (
            <Reveal key={temoignage.fullName} delay={index * 0.08}>
              <figure className="relative h-full rounded-3xl bg-bg-card border border-border-soft p-8 flex flex-col">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-gold-soft" aria-hidden />
                <blockquote className="relative font-display text-xl md:text-2xl leading-snug text-text-deep flex-1">
                  « {temoignage.quote} »
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border-soft">
                  <p className="font-medium text-text-deep">{temoignage.name}</p>
                  <p className="text-xs text-text-soft uppercase tracking-[0.2em] mt-1">
                    Personne accompagnée
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-xs text-text-soft uppercase tracking-[0.24em]">
            Témoignages réels — autres avis sur demande
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
