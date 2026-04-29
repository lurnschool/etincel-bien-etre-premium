import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";

export function CartesCadeaux() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-soft via-rose-soft to-bg-soft border border-gold-soft/40 p-10 md:p-16">
            <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-gold/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

            <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Gift className="h-3.5 w-3.5" />
                  <span>Cartes cadeaux</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-text-deep">
                  Offrir un moment de{" "}
                  <span className="font-display-italic text-gold-gradient">
                    reconnexion
                  </span>
                  .
                </h2>
                <p className="text-lg text-text-medium leading-relaxed max-w-xl">
                  Une séance individuelle, un cercle, une expérience collective : un cadeau qui prend soin, qui dépose et qui ouvre.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/cartes-cadeaux" className="btn-primary">
                    Découvrir les cartes cadeaux
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact?sujet=carte-cadeau" className="btn-secondary">
                    Demander une carte cadeau
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[5/7] rounded-3xl bg-gradient-to-br from-bg-deep to-accent-deep p-8 shadow-[0_24px_60px_rgba(31,26,46,0.25)] overflow-hidden">
                  <div className="absolute inset-0 grain pointer-events-none" />
                  <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/30 blur-3xl pointer-events-none" />
                  <div className="relative h-full flex flex-col justify-between text-text-on-dark">
                    <div>
                      <div className="flex items-center gap-2 text-gold mb-2">
                        <Etincelle size={14} />
                      </div>
                      <p className="text-xs uppercase tracking-[0.32em] text-gold-soft">
                        Etincel de bien être
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-display-italic text-2xl">Une étincelle</p>
                      <p className="font-display text-3xl leading-tight">
                        Pour celle, celui que vous aimez.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-gold-soft">
                      <span>Carte cadeau</span>
                      <span>Personnalisable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
