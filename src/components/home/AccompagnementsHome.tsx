import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { accompagnementsIndividuels } from "@/lib/data";

const familyLabels: Record<string, string> = {
  comprendre: "Comprendre son chemin",
  apaiser: "Apaiser, libérer",
  corps: "Revenir au corps",
  explorer: "Explorer l'intérieur",
  feminin: "Féminin sacré",
};

export function AccompagnementsHome() {
  // On affiche un échantillon représentatif sur la page d'accueil
  const featured = accompagnementsIndividuels.filter((a) =>
    ["numerologie", "hypnose", "cellrelease", "massage-energetique", "breathwork", "innerdance-individuel"].includes(a.slug),
  );

  return (
    <section className="section bg-bg-soft relative overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16 items-end">
          <Reveal>
            <SectionTitle
              align="left"
              eyebrow="Accompagnements individuels"
              title={
                <>
                  Une séance pour{" "}
                  <span className="font-display-italic text-gold-deep">votre histoire</span>
                </>
              }
              description="Chaque pratique est une porte d'entrée. Céline ajuste l'approche à votre rythme, votre besoin, votre sensibilité."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex lg:justify-end">
              <Link href="/accompagnements" className="btn-secondary">
                Voir tous les accompagnements
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((practice, index) => (
            <Reveal key={practice.slug} delay={index * 0.05}>
              <Link
                href={`/accompagnements/${practice.slug}`}
                className="group flex h-full flex-col rounded-3xl bg-bg-card border border-border-soft p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_24px_60px_rgba(31,26,46,0.1)]"
              >
                <span className="text-xs uppercase tracking-[0.24em] text-gold-deep mb-4">
                  {familyLabels[practice.family]}
                </span>
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight text-text-deep mb-3">
                  {practice.name}
                </h3>
                <p className="text-sm text-text-medium leading-relaxed flex-1">
                  {practice.pitch}
                </p>
                <div className="mt-6 pt-6 border-t border-border-soft flex items-center justify-between text-sm">
                  <span className="text-text-soft">{practice.price}</span>
                  <span className="flex items-center gap-1.5 font-medium text-accent group-hover:text-accent-deep transition-colors">
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
