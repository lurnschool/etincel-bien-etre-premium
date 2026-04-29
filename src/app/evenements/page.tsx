import Link from "next/link";
import type { Metadata } from "next";
import {
  Calendar,
  ArrowRight,
  Users,
  Heart,
  Mountain,
  Music,
  Wind,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";

export const metadata: Metadata = {
  title: "Événements & prochaines dates",
  description:
    "Cercles de femmes, rituels cacao, breathwork, innerdance, retraites, formations : retrouvez les prochaines dates dès qu'elles sont confirmées par Céline.",
};

const categories = [
  {
    id: "cercles",
    icon: Users,
    label: "Cercles de femmes",
    description: "Rendez-vous mensuel — sororité, parole, rituels symboliques.",
    href: "/contact?sujet=Liste cercle",
    color: "from-rose-soft/40 to-bg-card",
  },
  {
    id: "cacao",
    icon: Heart,
    label: "Rituels cacao",
    description: "Cérémonie du cœur — en individuel, en cercle ou en retraite.",
    href: "/contact?sujet=Liste cacao",
    color: "from-gold-soft/30 to-bg-card",
  },
  {
    id: "innerdance",
    icon: Music,
    label: "Innerdance collectif",
    description: "Immersion sensorielle — musique, présence, états doux.",
    href: "/contact?sujet=Liste innerdance",
    color: "from-accent-soft/20 to-bg-card",
  },
  {
    id: "breathwork",
    icon: Wind,
    label: "Breathwork chamanique",
    description: "Cérémonie de souffle — traverser, déposer, transmuter.",
    href: "/contact?sujet=Liste breathwork",
    color: "from-bg-soft to-bg-card",
  },
  {
    id: "retraite",
    icon: Mountain,
    label: "Retraites immersives",
    description: "Quelques jours pour ralentir, respirer, partager, se réinhabiter.",
    href: "/retraites#interet",
    color: "from-rose-soft/30 to-bg-card",
  },
  {
    id: "formation",
    icon: GraduationCap,
    label: "Formations",
    description: "Numérologie M1 / M2 — apprendre à lire la symbolique des nombres.",
    href: "/contact?sujet=Liste formation",
    color: "from-gold-soft/20 to-bg-card",
  },
];

export default function EvenementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title={
          <>
            Les prochains{" "}
            <span className="font-display-italic text-gold-deep">rendez-vous</span>
          </>
        }
        description="Aucune date inventée. Quand une date est confirmée par Céline, elle est annoncée ici. En attendant, choisissez la catégorie qui vous intéresse pour être prévenue en priorité."
      />

      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-border-soft bg-gradient-to-br from-bg-soft via-bg-card to-bg-card p-10 md:p-14 text-center mb-16 space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                <Calendar className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-text-deep max-w-2xl mx-auto leading-tight">
                Les prochaines dates seront bientôt annoncées.
              </h2>
              <p className="text-text-medium leading-relaxed max-w-xl mx-auto">
                Céline ouvre ses inscriptions en priorité aux personnes inscrites sur les listes d&apos;intérêt — par catégorie. Choisissez ce qui résonne pour vous.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Listes d&apos;intérêt</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Choisir{" "}
                <span className="font-display-italic text-gold-deep">votre catégorie</span>
              </h2>
              <p className="text-text-medium max-w-2xl">
                Inscrivez-vous une fois — vous recevrez un email dès qu&apos;un nouveau rendez-vous est ouvert dans cette catégorie. Pas de spam, jamais de revente.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  href={c.href}
                  className={`group flex h-full flex-col rounded-3xl border border-border-soft bg-gradient-to-br ${c.color} p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-card border border-border-soft text-gold-deep mb-5">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep mb-2 leading-tight">
                    {c.label}
                  </h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep mt-5">
                    Rejoindre la liste
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <span className="text-gold mt-0.5 shrink-0">
                <Etincelle size={12} />
              </span>
              <span>
                Cette page n&apos;affiche aucun événement passé comme à venir. Le programme est mis à jour uniquement quand de nouvelles dates sont confirmées par Céline.
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 text-center space-y-4">
              <p className="text-sm text-text-medium">
                Une demande spécifique ?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border-medium px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                Écrire à Céline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
