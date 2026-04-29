import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { whisperLines } from "@/lib/data";

const sensations = [
  "Ralentir",
  "Respirer",
  "Se déposer",
  "Vivre le collectif",
  "Revenir au corps",
  "Explorer le féminin",
  "Se réhabiter",
];

/**
 * Bande immersive pleine largeur pour les retraites — pas de cards.
 * Grande typo, fond profond, sensations énumérées comme un texte.
 */
export function RetreatImmersionBand() {
  return (
    <section className="relative w-full overflow-hidden py-32 md:py-40 bg-gradient-to-br from-[#150f25] via-[#1d1530] to-[#0e0a1d] text-text-on-dark">
      <div className="absolute -top-40 right-1/4 h-[44rem] w-[44rem] rounded-full bg-accent/30 blur-[180px]" />
      <div className="absolute -bottom-40 left-1/4 h-[44rem] w-[44rem] rounded-full bg-gold/15 blur-[180px]" />
      <div className="absolute inset-0 grain opacity-30" />

      <WhisperLine text={whisperLines[3]} position="left" tone="gold" />

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>Immersions · Retraites</span>
              </div>
              <h2 className="font-display text-balance text-5xl md:text-6xl lg:text-[5rem] leading-[1.02] tracking-tight text-text-on-dark">
                Une parenthèse pour{" "}
                <span className="font-display-italic text-gold-gradient">
                  revenir à l&apos;essentiel
                </span>
                .
              </h2>
              <p className="text-text-on-dark-soft text-lg md:text-xl leading-relaxed max-w-xl">
                Quelques jours pour ralentir, respirer, partager et se réinhabiter pleinement. Souffle, innerdance, cercles, féminin sacré, nature.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/retraites#interet"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-deep hover:bg-gold-soft hover:-translate-y-0.5 transition-all"
                >
                  Rejoindre la liste d&apos;intérêt
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/retraites"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
                >
                  Découvrir les retraites
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="lg:border-l lg:border-white/10 lg:pl-12">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-soft/80 mb-5">
                Ce que l&apos;on vient vivre
              </p>
              <ul className="space-y-2">
                {sensations.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-baseline gap-4 group"
                    style={{ paddingLeft: `${(i % 3) * 12}px` }}
                  >
                    <span className="font-display-italic text-gold-soft/60 text-sm tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl md:text-3xl text-text-on-dark group-hover:text-gold transition-colors">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs text-text-on-dark-soft/60 italic max-w-sm">
                Les prochaines dates seront annoncées dès qu&apos;elles seront confirmées.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
