import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Pathway = "memoires" | "feminin" | "corps" | "transverse";

const pathwayConfig: Record<
  Pathway,
  { label: string; href: string; description: string; linkLabel: string }
> = {
  memoires: {
    label: "Au service du chemin Mémoires & constellations",
    href: "/memoires-constellations",
    description:
      "Cet outil prend tout son sens dans le travail des mémoires, des loyautés et de la place dans la lignée.",
    linkLabel: "Voir le chemin complet",
  },
  feminin: {
    label: "Au service du chemin Féminin & cacao",
    href: "/feminin-cacao",
    description:
      "Cet outil prend tout son sens dans l'accompagnement du corps, des cycles et de l'intuition féminine.",
    linkLabel: "Voir le chemin complet",
  },
  corps: {
    label: "Au service du chemin Corps & intégration",
    href: "/corps-integration",
    description:
      "Cet outil prend tout son sens dans le travail du souffle, du mouvement et de l'expérience intérieure.",
    linkLabel: "Voir le chemin complet",
  },
  transverse: {
    label: "Une boussole transverse",
    href: "/diagnostic",
    description:
      "Cet outil peut s'inscrire dans plusieurs chemins selon ce qui appelle. Une lecture symbolique des cycles, des ressources et de la lignée.",
    linkLabel: "Me laisser guider",
  },
};

/**
 * PathwayBadge — bandeau de recontextualisation en tête de page-outil.
 *
 * Sprint B "refuge connecté" : refondu pour ne plus afficher
 * "Axe 1 / Axe 2 / Axe 3". À la place : phrase douce qui rattache
 * l'outil à son chemin sans architecture visible.
 */
export function PathwayBadge({ pathway }: { pathway: Pathway }) {
  const config = pathwayConfig[pathway];
  return (
    <section className="bg-bg-soft/50 border-b border-border-soft py-5">
      <Container>
        <div className="flex flex-wrap items-start gap-4 md:items-center md:gap-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-card border border-border-soft text-gold-deep shrink-0">
            <Etincelle size={11} />
          </div>
          <div className="flex-1 min-w-[240px]">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft mb-1">
              {config.label}
            </p>
            <p className="text-sm text-text-medium leading-relaxed">
              {config.description}
            </p>
          </div>
          <Link
            href={config.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-text-deep/15 bg-bg-card px-4 py-2 text-xs font-medium text-text-deep hover:border-accent hover:text-accent transition-colors shrink-0"
          >
            {config.linkLabel}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
