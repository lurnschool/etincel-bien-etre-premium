import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Pathway = "memoires" | "feminin" | "corps" | "transverse";

const pathwayConfig: Record<
  Pathway,
  { label: string; href: string; description: string; gradient: string }
> = {
  memoires: {
    label: "Axe 1 · Mémoires & constellations",
    href: "/memoires-constellations",
    description: "Cet outil est mobilisé au service de l'axe Mémoires & constellations — libérer les mémoires, éclairer les loyautés, retrouver une place plus juste dans la lignée.",
    gradient: "from-accent/10 via-bg-soft to-bg-soft",
  },
  feminin: {
    label: "Axe 2 · Féminin & cacao",
    href: "/feminin-cacao",
    description: "Cet outil est mobilisé au service de l'axe Féminin & cacao — revenir au corps, au cœur, aux cycles et à l'intuition. Pas une prestation autonome, un passage dans l'accompagnement féminin.",
    gradient: "from-rose-soft/30 via-bg-soft to-bg-soft",
  },
  corps: {
    label: "Axe 3 · Corps & intégration",
    href: "/corps-integration",
    description: "Cet outil est mobilisé au service de l'axe Corps & intégration — intégrer par le souffle, le mouvement et l'expérience intérieure ce qui demande à se transformer.",
    gradient: "from-gold-soft/25 via-bg-soft to-bg-soft",
  },
  transverse: {
    label: "Boussole transverse",
    href: "/diagnostic",
    description: "Cet outil est une boussole symbolique qui peut s'inscrire dans plusieurs axes selon ce qui appelle. La numérologie comme lecture de cycles, de ressources et de lignée.",
    gradient: "from-gold-soft/20 via-bg-soft to-bg-soft",
  },
};

/**
 * Bandeau de recontextualisation à placer en tête des pages-outils
 * (hypnose, CellRelease, massage, breathwork, innerdance, etc.).
 *
 * Indique clairement que la pratique n'est pas une offre centrale
 * isolée mais un outil mobilisé au service d'un des 3 axes de Céline.
 */
export function PathwayBadge({ pathway }: { pathway: Pathway }) {
  const config = pathwayConfig[pathway];
  return (
    <section className={`bg-gradient-to-r ${config.gradient} border-b border-border-soft py-6`}>
      <Container>
        <div className="flex flex-wrap items-start gap-4 md:items-center md:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card border border-border-medium text-gold-deep shrink-0">
            <Compass className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-[240px]">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-1">
              {config.label}
            </p>
            <p className="text-sm text-text-medium leading-relaxed">{config.description}</p>
          </div>
          <Link
            href={config.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent text-accent bg-bg-card px-4 py-2 text-xs font-medium hover:bg-accent hover:text-text-on-dark transition-colors shrink-0"
          >
            Voir l&apos;axe complet
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
