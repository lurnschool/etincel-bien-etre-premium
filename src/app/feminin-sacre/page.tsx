import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Heart, Moon, Flower, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { disclaimers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Féminin sacré",
  description:
    "Un accompagnement symbolique et énergétique autour du féminin, de la mémoire du corps, des cycles et de la reconnexion à soi.",
};

const formats = [
  {
    title: "Accompagnement individuel",
    description: "Une séance dédiée à votre histoire et votre rythme.",
    href: "/accompagnements/feminin-sacre",
  },
  {
    title: "Cercles de femmes",
    description: "Un rendez-vous mensuel pour partager en sororité.",
    href: "/cercles-de-femmes",
  },
  {
    title: "Retraites immersives",
    description: "Un temps long pour vous déposer en profondeur.",
    href: "/retraites",
  },
  {
    title: "Ateliers thématiques",
    description: "Des temps courts pour explorer une dimension précise.",
    href: "/collectif#ateliers",
  },
];

const themes = [
  { icon: Heart, title: "Reconnexion au corps", description: "Habiter à nouveau la maison qu'est votre corps." },
  { icon: Moon, title: "Cycles & saisons intérieures", description: "Lire et honorer les rythmes du féminin." },
  { icon: Flower, title: "Énergie créatrice", description: "Réveiller la puissance qui crée, donne et transforme." },
  { icon: BookOpen, title: "Héritages émotionnels", description: "Reconnaître et déposer ce qui n'est pas à vous." },
];

export default function FemininSacrePage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Féminin sacré · médecine symbolique de l'utérus"
        title={
          <>
            Revenir au corps, à l'intuition et à l'
            <span className="font-display-italic text-gold-deep">énergie créatrice</span>
          </>
        }
        description="Un accompagnement symbolique et énergétique autour du féminin, de la mémoire du corps, des cycles et de la reconnexion à soi."
      />

      <PathwayBadge pathway="feminin" />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] items-start">
            <Reveal>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>L'intention</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Un espace pour ce qui se vit dans le silence du corps.
                  </h2>
                  <div className="space-y-4 text-text-medium leading-relaxed">
                    <p>
                      Cet accompagnement s'adresse à celles qui ressentent l'appel d'un travail sensible autour de leur féminin. Il prend la forme d'un dialogue symbolique avec le corps, ses cycles, ses mémoires et son énergie créatrice.
                    </p>
                    <p>
                      L'utérus est ici approché comme un territoire symbolique — celui de l'origine, du créatif, de la transformation. Aucun acte médical, aucune promesse de soin gynécologique. Une pratique de reconnexion sensible, à votre rythme.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Les axes d'exploration</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {themes.map((t) => (
                      <div key={t.title} className="rounded-2xl border border-border-soft bg-bg-card p-5 space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft text-text-deep">
                          <t.icon className="h-4 w-4" />
                        </div>
                        <p className="font-display text-lg text-text-deep">{t.title}</p>
                        <p className="text-sm text-text-medium leading-relaxed">{t.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Les formats possibles</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formats.map((f) => (
                      <Link
                        key={f.href}
                        href={f.href}
                        className="group rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft hover:bg-bg-soft transition-all"
                      >
                        <p className="font-display text-lg text-text-deep flex items-center justify-between">
                          {f.title}
                          <ArrowRight className="h-4 w-4 text-text-soft group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                        </p>
                        <p className="text-sm text-text-medium mt-1">{f.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border-soft">
                  <Link href="/contact?sujet=Féminin sacré" className="btn-primary">
                    Échanger avec Céline
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/cercles-de-femmes" className="btn-secondary">
                    Découvrir les cercles
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="sticky top-32 rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-rose-soft/40 via-bg-card to-bg-card p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Précision importante</p>
                <p className="font-display text-2xl leading-snug text-text-deep">
                  Une démarche de bien-être, pas un soin médical.
                </p>
                <p className="text-sm text-text-medium leading-relaxed">
                  {disclaimers.feminin}
                </p>
                <p className="text-xs text-text-soft leading-relaxed pt-3 border-t border-border-soft">
                  En cas de douleur ou de trouble gynécologique, consultez un professionnel de santé.
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <BilanGiftBanner variant="warm" />
    </>
  );
}
