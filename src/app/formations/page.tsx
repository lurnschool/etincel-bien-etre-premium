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
import { formations } from "@/lib/data";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Formations — Numérologie symbolique",
  description:
    "Formations en numérologie symbolique avec Céline Dusseval — Module 1 (les fondations) et Module 2 (approfondissement). Transmission directe, en petit groupe.",
};

export default function FormationsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Transmission"
        greeting="Apprendre à lire les nombres."
        title={
          <>
            La numérologie comme{" "}
            <EtincelleAccent variant="letter">boussole</EtincelleAccent>{" "}
            symbolique.
          </>
        }
        body="Une transmission en petit comité, à mon rythme et au vôtre. Pas un cours magistral — une initiation à un langage symbolique qui éclaire les cycles, les ressources, les passages."
        primaryCta={{ label: "Demander le programme", href: "/contact?sujet=Formation%20num%C3%A9rologie" }}
        secondaryCta={{ label: "Poser une question", href: whatsappLink(whatsappMessages.numerologie) }}
        visualId="about-portrait-secondaire"
        variant="portrait"
      />

      <DetailStrip
        assetIds={["carnet-1", "carnet-2", "carnet-3", "carnet-4", "carnet-5", "carnet-6"]}
        tone="sand"
        size="md"
        caption="Fragments d'apprentissage — carnets, tracés, transmissions."
      />

      <section className="relative bg-bg-base py-24 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14 space-y-5">
            <Reveal>
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>Deux modules</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
                Une initiation par étapes.
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-text-medium pt-3">
                Le Module 1 pose les fondations — chiffres, vibrations, lecture
                de votre date. Le Module 2 approfondit — cycles, transitions,
                lectures avancées.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {formations.map((f, i) => (
              <Reveal key={f.slug} delay={i * 0.08}>
                <article className="group flex flex-col h-full rounded-[1.5rem] bg-bg-card border border-border-soft p-7 md:p-8 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500">
                  <h3 className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                    {f.name}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-text-medium flex-1">
                    {f.pitch}
                  </p>
                  <p className="mt-5 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep border-t border-border-soft/60 pt-4">
                    {f.duration} · {f.price}
                  </p>
                  <Link
                    href={`/contact?sujet=Formation%20${encodeURIComponent(f.name)}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
                  >
                    Demander le programme
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <GuidanceFooter variant="program" />
    </>
  );
}
