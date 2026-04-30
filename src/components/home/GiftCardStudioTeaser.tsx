import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { GiftCardPreview } from "@/components/giftcard/GiftCardPreview";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { whisperLines } from "@/lib/data";

const previewData = {
  fromName: "Léa",
  toName: "Camille",
  message: "Une parenthèse, parce que tu le mérites.",
  cardType: "Une séance individuelle",
  amount: "À convenir",
  occasion: "Anniversaire",
  style: "doree" as const,
};

/**
 * Teaser de la home pointant vers le studio complet sur /cartes-cadeaux.
 * Affiche un aperçu réel de la carte cadeau pour donner envie.
 */
export function GiftCardStudioTeaser() {
  return (
    <section className="relative section overflow-hidden">
      <WhisperLine text={whisperLines[9]} position="right" tone="amethyst" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>Studio carte cadeau</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-text-deep">
                Composez une{" "}
                <span className="font-display-italic text-gold-deep">
                  carte cadeau
                </span>{" "}
                qui ressemble à la personne.
              </h2>
              <p className="text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
                Choisissez le style, écrivez le message, prévisualisez en direct, téléchargez l&apos;aperçu. Céline finalise ensuite avec vous le format et le règlement.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-text-medium pt-2">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                  4 univers visuels
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                  Aperçu en direct
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                  Téléchargement PNG
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                  Paiement direct avec Céline
                </li>
              </ul>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="/cartes-cadeaux"
                  className="btn-primary"
                >
                  Créer ma carte cadeau
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/cartes-cadeaux#formats" className="btn-secondary">
                  Voir les formats
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-gold-soft/40 via-rose-soft/30 to-bg-soft rounded-[2.5rem] -z-10 blur-2xl" />
              <div className="relative">
                <GiftCardPreview data={previewData} />
              </div>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.24em] text-text-soft text-center">
                Aperçu — exemple de personnalisation
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
