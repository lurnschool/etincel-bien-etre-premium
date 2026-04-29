import Link from "next/link";
import { ArrowUpRight, User, Users, Flower, Gift } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { portesEntree } from "@/lib/data";

const icons = [User, Users, Flower, Gift];

const accentClasses: Record<string, string> = {
  accent: "from-accent/15 via-bg-card to-bg-card text-accent",
  rose: "from-rose-soft via-bg-card to-bg-card text-rose",
  gold: "from-gold-soft via-bg-card to-bg-card text-gold-deep",
  "accent-deep": "from-accent-deep/15 via-bg-card to-bg-card text-accent-deep",
};

export function Portes() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Quatre portes d'entrée"
            title={
              <>
                Quelle est{" "}
                <span className="font-display-italic text-gold-deep">la vôtre</span>{" "}
                aujourd'hui&nbsp;?
              </>
            }
            description="Choisissez la porte qui résonne avec votre besoin du moment. Toutes les pratiques se rejoignent : revenir à soi."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portesEntree.map((porte, index) => {
            const Icon = icons[index] || User;
            const accentClass = accentClasses[porte.accent] || accentClasses.accent;
            return (
              <Reveal key={porte.title} delay={index * 0.08}>
                <Link
                  href={porte.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-soft bg-bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.12)] hover:border-gold-soft"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-60 ${accentClass}`}
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-card border border-border-soft mb-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl leading-tight text-text-deep mb-3">
                      {porte.title}
                    </h3>
                    <p className="text-sm text-text-medium leading-relaxed flex-1">
                      {porte.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-deep">
                      {porte.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
