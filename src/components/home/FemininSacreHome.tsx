import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { disclaimers } from "@/lib/data";

const themes = [
  "Reconnexion au corps",
  "Cycles & saisons intérieures",
  "Mémoire émotionnelle",
  "Énergie créatrice",
  "Espace de parole",
  "Rituels symboliques",
];

export function FemininSacreHome() {
  return (
    <section className="section relative overflow-hidden bg-bg-deep text-text-on-dark">
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-0 h-[40rem] w-[40rem] rounded-full bg-accent/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[40rem] w-[40rem] rounded-full bg-rose/20 blur-[140px]" />
      </div>
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                <span className="text-gold">
                  <Etincelle size={14} />
                </span>
                <span>Féminin sacré</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-text-on-dark">
                Revenir au corps, à l'intuition et à l'
                <span className="font-display-italic text-gold-gradient">
                  énergie créatrice
                </span>
                .
              </h2>
              <p className="text-text-on-dark-soft text-lg leading-relaxed max-w-xl">
                Un accompagnement symbolique et énergétique autour du féminin, de la mémoire du corps, des cycles et de la reconnexion à soi.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/feminin-sacre" className="btn-gold">
                  Explorer le féminin sacré
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cercles-de-femmes"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-text-on-dark hover:border-gold hover:text-gold transition-colors text-sm font-medium"
                >
                  Cercles de femmes
                </Link>
              </div>
              <p className="text-xs text-text-on-dark-soft/70 leading-relaxed pt-6 border-t border-white/10 mt-8 max-w-xl">
                {disclaimers.feminin}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme, i) => (
                <div
                  key={theme}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-gold/40 transition-colors"
                  style={{
                    transform: `translateY(${i % 2 === 0 ? "0" : "1.5rem"})`,
                  }}
                >
                  <div className="flex items-center gap-2 text-gold mb-3">
                    <Etincelle size={12} />
                  </div>
                  <p className="font-display text-lg leading-snug text-text-on-dark">
                    {theme}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
