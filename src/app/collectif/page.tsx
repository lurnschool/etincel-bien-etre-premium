import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { experiencesCollectives } from "@/lib/data";

export const metadata: Metadata = {
  title: "Les espaces collectifs — cercles, cérémonies, immersions",
  description:
    "Cercles de femmes, cérémonies cacao, breathwork, innerdance, constellations et retraites. Des espaces vivants en petit comité, jamais en série.",
};

export default function CollectifPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Espaces collectifs"
        greeting="Avancer ensemble."
        title={
          <>
            Des espaces vivants pour traverser à{" "}
            <EtincelleAccent variant="glow">plusieurs</EtincelleAccent>.
          </>
        }
        body="Cercles, cérémonies, immersions. Des moments en petit comité où la présence d'autres devient un appui. Aucun n'est en série — chacun s'ouvre quand le moment est juste."
        primaryCta={{ label: "Recevoir les prochaines dates", href: "/evenements" }}
        secondaryCta={{ label: "Écrire à Céline", href: "/contact" }}
        variant="contact"
      />

      <DetailStrip
        assetIds={["micro-refuge-1", "micro-refuge-2", "micro-refuge-3", "micro-refuge-4", "micro-refuge-5", "micro-refuge-6"]}
        tone="warm"
        size="md"
        caption="Fragments d'espaces partagés."
      />

      <section className="relative bg-bg-base py-24 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>Quelques formats</span>
              </div>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-medium">
                Selon ce qui vous attire et le rythme qui vous va, plusieurs
                portes d&apos;entrée sont possibles.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-5 md:gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {experiencesCollectives.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.06}>
                <Link
                  href={e.href}
                  className="group flex flex-col h-full rounded-[1.5rem] bg-bg-card border border-border-soft p-7 md:p-8 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500"
                >
                  <h3 className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                    {e.name}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-text-medium flex-1">
                    {e.pitch}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border-soft/60 flex items-center justify-between">
                    <span className="text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep">
                      {e.rhythm}
                    </span>
                    <ArrowRight className="h-4 w-4 text-text-soft transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <GuidanceFooter variant="contact" />
    </>
  );
}
