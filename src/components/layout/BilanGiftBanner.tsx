import Link from "next/link";
import { ArrowRight, Compass, Gift } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";

type Variant = "soft" | "deep" | "warm";

const variants: Record<Variant, { wrap: string; section: string }> = {
  soft: {
    wrap: "bg-bg-soft",
    section: "py-16 md:py-20",
  },
  deep: {
    wrap: "bg-bg-deep text-text-on-dark",
    section: "py-16 md:py-20",
  },
  warm: {
    wrap: "bg-gradient-to-br from-rose-soft/40 via-bg-soft to-bg-soft",
    section: "py-16 md:py-20",
  },
};

/**
 * Double porte d'entrée — Bilan + Carte cadeau.
 * À insérer en bas de chaque page secondaire pour offrir une voie
 * de conversion claire au visiteur même s'il n'est pas prêt à réserver.
 */
export function BilanGiftBanner({
  variant = "soft",
  title = "Pas encore décidée ?",
  subtitle = "Deux portes d'entrée douces pour avancer à votre rythme.",
}: {
  variant?: Variant;
  title?: string;
  subtitle?: string;
}) {
  const v = variants[variant];
  const isDeep = variant === "deep";

  return (
    <section className={`${v.wrap} ${v.section}`}>
      <Container>
        <Reveal>
          <div className="max-w-2xl space-y-3 mb-10">
            <span
              className={`text-[0.7rem] uppercase tracking-[0.36em] flex items-center gap-3 ${
                isDeep ? "text-gold-soft" : "text-gold-deep"
              }`}
            >
              <Etincelle size={11} />
              Aller plus loin
            </span>
            <h2
              className={`font-display text-3xl md:text-4xl leading-tight ${
                isDeep ? "text-text-on-dark" : "text-text-deep"
              }`}
            >
              {title}
            </h2>
            <p
              className={`leading-relaxed ${
                isDeep ? "text-text-on-dark-soft" : "text-text-medium"
              }`}
            >
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Link
              href="/diagnostic"
              className={`group block rounded-3xl border p-7 md:p-8 h-full transition-all duration-500 ${
                isDeep
                  ? "border-white/15 bg-white/5 backdrop-blur-sm hover:border-gold/60 hover:bg-white/10"
                  : "border-border-soft bg-bg-card hover:border-gold-soft hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isDeep ? "bg-gold-soft/30 text-gold" : "bg-gold-soft/40 text-gold-deep"
                  }`}
                >
                  <Compass className="h-5 w-5" />
                </div>
                <span
                  className={`text-[0.65rem] uppercase tracking-[0.28em] ${
                    isDeep ? "text-gold-soft" : "text-gold-deep"
                  }`}
                >
                  Gratuit · 4 min
                </span>
              </div>
              <h3
                className={`font-display text-2xl md:text-[1.7rem] leading-tight mb-2 ${
                  isDeep ? "text-text-on-dark" : "text-text-deep"
                }`}
              >
                La boussole Etincel
              </h3>
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  isDeep ? "text-text-on-dark-soft" : "text-text-medium"
                }`}
              >
                Huit questions sensibles pour identifier la pratique la plus juste pour votre moment de vie. Bilan personnalisé envoyé par email + guide PDF de 6 pages offert.
              </p>
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  isDeep ? "text-gold-soft group-hover:text-gold" : "text-accent group-hover:text-accent-deep"
                }`}
              >
                Faire mon bilan
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <Link
              href="/cartes-cadeaux"
              className={`group block rounded-3xl border p-7 md:p-8 h-full transition-all duration-500 ${
                isDeep
                  ? "border-white/15 bg-white/5 backdrop-blur-sm hover:border-gold/60 hover:bg-white/10"
                  : "border-border-soft bg-bg-card hover:border-gold-soft hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isDeep ? "bg-gold-soft/30 text-gold" : "bg-gold-soft/40 text-gold-deep"
                  }`}
                >
                  <Gift className="h-5 w-5" />
                </div>
                <span
                  className={`text-[0.65rem] uppercase tracking-[0.28em] ${
                    isDeep ? "text-gold-soft" : "text-gold-deep"
                  }`}
                >
                  6 styles · paiement Stripe
                </span>
              </div>
              <h3
                className={`font-display text-2xl md:text-[1.7rem] leading-tight mb-2 ${
                  isDeep ? "text-text-on-dark" : "text-text-deep"
                }`}
              >
                Offrir une parenthèse
              </h3>
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  isDeep ? "text-text-on-dark-soft" : "text-text-medium"
                }`}
              >
                Une carte cadeau personnalisée pour un proche — séance, rituel, cercle ou montant libre. Composez en 3 étapes, recevez la carte définitive avec sa référence après paiement.
              </p>
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  isDeep ? "text-gold-soft group-hover:text-gold" : "text-accent group-hover:text-accent-deep"
                }`}
              >
                Composer une carte
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
