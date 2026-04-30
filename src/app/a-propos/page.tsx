import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { temoignages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Céline Dusseval — accompagnatrice holistique en Gironde",
  description:
    "Céline Dusseval accompagne les mémoires, le féminin et l'intégration par le corps à travers les constellations, le cacao, les retraites et les pratiques sensibles. Bordeaux, Le Taillan-Médoc, Univers'elles.",
};

const postures = [
  {
    title: "Pas une thérapeute",
    description:
      "Céline est accompagnatrice holistique. Elle ne soigne pas, ne diagnostique pas, ne traite pas. Elle tient un cadre où ce qui appelle peut émerger.",
  },
  {
    title: "Pas un catalogue",
    description:
      "Elle n'empile pas les pratiques. Elle accompagne autour de 3 axes : les mémoires, le féminin, le corps. Les outils sont au service du travail, pas l'inverse.",
  },
  {
    title: "Pas une promesse",
    description:
      "Aucune garantie de résultat, de guérison, de libération. Un cadre de bien-être, de développement personnel et de reconnexion à soi.",
  },
  {
    title: "Pas un protocole",
    description:
      "Chaque accompagnement s'ajuste à votre rythme, votre histoire, votre demande. Pas de méthode rigide qui s'impose au-dessus de la personne.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Céline Dusseval · accompagnatrice holistique"
        title={
          <>
            Accompagner les mémoires, le féminin{" "}
            <span className="font-display-italic text-gold-deep">et l&apos;intégration par le corps</span>.
          </>
        }
        description="Céline Dusseval, accompagnatrice holistique en Gironde. Son travail s'inscrit dans une démarche de bien-être et de développement personnel, à travers les constellations, le cacao, les retraites et différentes pratiques sensibles."
      />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] items-start">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-rose-soft via-gold-soft to-accent-soft sticky top-32">
                <div className="absolute inset-0 grain pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-text-deep/80 px-8">
                  <div>
                    <p className="font-display-italic text-2xl">Photo de Céline</p>
                    <p className="text-xs uppercase tracking-[0.24em] mt-2 opacity-70">
                      Visuel HD à intégrer
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Mon approche</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Trois chemins, une même posture.
                  </h2>
                  <div className="space-y-4 text-text-medium leading-relaxed text-base md:text-lg">
                    <p>
                      Mon travail s&apos;est progressivement structuré autour de trois axes — les mémoires (avec les constellations familiales et le travail transgénérationnel), le féminin (avec les cérémonies cacao, les cercles de femmes et l&apos;accompagnement symbolique), et l&apos;intégration par le corps (avec l&apos;innerdance, le breathwork et les retraites).
                    </p>
                    <p>
                      Je n&apos;empile pas les pratiques. Selon ce que la personne porte, je mobilise les outils que j&apos;ai appris au fil des années — hypnose, CellRelease®, massages, soins énergétiques, numérologie — au service du travail. Le travail n&apos;est jamais l&apos;outil. C&apos;est ce qui se passe entre nous, dans le cadre que je tiens.
                    </p>
                    <p>
                      <em>Cette section sera enrichie avec le récit personnel de Céline.</em>
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Ma posture</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Quatre choses{" "}
                    <span className="font-display-italic text-gold-deep">que je ne suis pas</span>.
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {postures.map((p) => (
                      <div key={p.title} className="rounded-2xl border border-border-soft bg-bg-card p-5">
                        <p className="font-display text-lg text-text-deep mb-2">{p.title}</p>
                        <p className="text-sm text-text-medium leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Compass className="h-3.5 w-3.5" />
                    <span>Les 3 axes structurants</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Mon travail, en clair.
                  </h2>
                  <ul className="grid gap-3">
                    <li className="rounded-2xl border border-border-soft bg-bg-soft/50 p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-1">Axe 1</p>
                      <p className="font-display text-xl text-text-deep">Mémoires & constellations</p>
                      <p className="text-sm text-text-medium leading-relaxed mt-1">
                        Travail systémique et transgénérationnel pour libérer les loyautés et schémas hérités.
                      </p>
                      <Link
                        href="/memoires-constellations"
                        className="text-xs text-accent hover:text-accent-deep inline-flex items-center gap-1 mt-2"
                      >
                        Découvrir l&apos;axe
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                    <li className="rounded-2xl border border-border-soft bg-bg-soft/50 p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-1">Axe 2</p>
                      <p className="font-display text-xl text-text-deep">Féminin & cacao</p>
                      <p className="text-sm text-text-medium leading-relaxed mt-1">
                        Cérémonies cacao, cercles de femmes, accompagnement symbolique du féminin et des cycles.
                      </p>
                      <Link
                        href="/feminin-cacao"
                        className="text-xs text-accent hover:text-accent-deep inline-flex items-center gap-1 mt-2"
                      >
                        Découvrir l&apos;axe
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                    <li className="rounded-2xl border border-border-soft bg-bg-soft/50 p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-1">Axe 3</p>
                      <p className="font-display text-xl text-text-deep">Corps & intégration</p>
                      <p className="text-sm text-text-medium leading-relaxed mt-1">
                        Innerdance, breathwork chamanique, retraites immersives — intégrer par le corps.
                      </p>
                      <Link
                        href="/corps-integration"
                        className="text-xs text-accent hover:text-accent-deep inline-flex items-center gap-1 mt-2"
                      >
                        Découvrir l&apos;axe
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border-soft">
                  <Link href="/diagnostic" className="btn-primary">
                    <Compass className="h-4 w-4" />
                    Faire mon bilan d&apos;orientation
                  </Link>
                  <WhatsAppButton message="Bonjour Céline, j'aimerais échanger avec vous.">
                    Échanger sur WhatsApp
                  </WhatsAppButton>
                  <Link href="/contact" className="btn-secondary">
                    Lui écrire
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark">
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="h-8 w-8 text-gold mx-auto" />
              <p className="font-display-italic text-2xl md:text-4xl leading-[1.2] text-text-on-dark">
                « {temoignages[0].quote} »
              </p>
              <p className="text-gold-soft font-display-italic">— {temoignages[0].name}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <BilanGiftBanner variant="warm" />
    </>
  );
}
