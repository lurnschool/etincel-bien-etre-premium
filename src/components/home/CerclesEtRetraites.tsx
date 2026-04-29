import Link from "next/link";
import { Calendar, Mountain, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";

export function CerclesEtRetraites() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-soft via-bg-soft to-bg-card border border-border-soft p-8 md:p-12 flex flex-col">
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-rose/30 blur-3xl pointer-events-none" />
              <div className="relative space-y-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Mensuel · sur Bordeaux</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Cercles de femmes
                </h3>
                <p className="text-text-medium leading-relaxed flex-1">
                  Un rendez-vous mensuel pour déposer, partager et revenir à soi. Espace confidentiel, écoute, pratiques corporelles douces, respiration, ancrage et rituels symboliques.
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-text-medium pt-2">
                  <li className="flex items-center gap-2">
                    <Etincelle size={10} /> Sororité
                  </li>
                  <li className="flex items-center gap-2">
                    <Etincelle size={10} /> Reconnexion
                  </li>
                  <li className="flex items-center gap-2">
                    <Etincelle size={10} /> Souffle
                  </li>
                  <li className="flex items-center gap-2">
                    <Etincelle size={10} /> Rituels
                  </li>
                </ul>
                <div className="pt-2">
                  <Link href="/cercles-de-femmes" className="btn-primary">
                    Être informée du prochain cercle
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-bg-deep to-accent-deep text-text-on-dark p-8 md:p-12 flex flex-col">
              <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
              <div className="relative space-y-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <Mountain className="h-3.5 w-3.5" />
                  <span>Immersion · prochaines dates à venir</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight text-text-on-dark">
                  Retraites
                </h3>
                <p className="text-text-on-dark-soft leading-relaxed flex-1">
                  Une parenthèse pour ralentir, respirer, se reconnecter et revenir à l'essentiel. Souffle, innerdance, cercles, féminin sacré, nature, partages.
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-text-on-dark-soft pt-2">
                  <li className="flex items-center gap-2">
                    <span className="text-gold"><Etincelle size={10} /></span> Souffle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold"><Etincelle size={10} /></span> Nature
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold"><Etincelle size={10} /></span> Pratiques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold"><Etincelle size={10} /></span> Repos
                  </li>
                </ul>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link href="/retraites" className="btn-gold">
                    Rejoindre la liste d'intérêt
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/retraites"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-text-on-dark hover:border-gold hover:text-gold transition-colors text-sm font-medium"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
