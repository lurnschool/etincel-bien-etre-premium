import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function DiagnosticTeaser() {
  return (
    <section className="section relative overflow-hidden bg-bg-soft">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-soft bg-bg-card p-10 md:p-14">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent-soft/20 blur-3xl pointer-events-none" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Bilan d&apos;orientation Etincel</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-deep max-w-2xl">
                  Vous ne savez pas{" "}
                  <span className="font-display-italic text-gold-deep">
                    quel accompagnement choisir
                  </span>{" "}
                  ?
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Un parcours doux et confidentiel pour identifier la pratique qui correspond à votre besoin du moment. Le résultat reste indicatif — il prépare l'échange avec Céline.
                </p>
              </div>
              <Link href="/diagnostic" className="btn-primary orbit-shine self-start lg:self-center">
                Faire le bilan d&apos;orientation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
