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
import { accompagnementsIndividuels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Les outils que je peux mobiliser",
  description:
    "Hypnose, CellRelease, massages, breathwork, innerdance, numérologie. Les pratiques que Céline mobilise selon ce que vous traversez — pas un catalogue, des outils au service de votre chemin.",
};

export default function AccompagnementsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Les outils"
        greeting="Pas un menu."
        title={
          <>
            Les pratiques que je peux{" "}
            <EtincelleAccent variant="glow">mobiliser</EtincelleAccent>{" "}
            pour vous.
          </>
        }
        body="Aucun de ces outils n'est central. Chacun a sa place selon ce que vous traversez. C'est en parlant ensemble qu'on voit lesquels font sens."
        primaryCta={{ label: "Me laisser guider", href: "/diagnostic" }}
        secondaryCta={{ label: "Écrire à Céline", href: "/contact" }}
        variant="contact"
      />

      <DetailStrip
        assetIds={["micro-refuge-1", "micro-refuge-2", "micro-refuge-3", "micro-refuge-4", "micro-refuge-5", "micro-refuge-6"]}
        tone="warm"
        size="md"
        caption="Fragments du refuge — atmosphères et présences."
      />

      <section className="relative bg-bg-base py-24 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>Vue d&apos;ensemble</span>
              </div>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-medium">
                Vous pouvez parcourir la liste, mais le plus simple est souvent
                de commencer par un mot ou par le bilan d&apos;orientation.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {accompagnementsIndividuels.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/accompagnements/${p.slug}`}
                  className="group flex flex-col h-full rounded-[1.5rem] bg-bg-card border border-border-soft p-6 md:p-7 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500"
                >
                  <h3 className="font-display text-lg md:text-xl text-text-deep leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-medium flex-1">
                    {p.pitch}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border-soft/60 flex items-center justify-between gap-3">
                    <span className="text-[0.7rem] uppercase tracking-[0.28em] text-text-soft">
                      {p.duration} · {p.price}
                    </span>
                    <ArrowRight className="h-4 w-4 text-text-soft transition-transform group-hover:translate-x-0.5 group-hover:text-accent shrink-0" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <GuidanceFooter variant="guidance" />
    </>
  );
}
