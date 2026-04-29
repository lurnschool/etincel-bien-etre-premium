import Link from "next/link";
import type { Metadata } from "next";
import { Gift, ArrowRight, Heart, Calendar, Mountain } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";

export const metadata: Metadata = {
  title: "Cartes cadeaux",
  description:
    "Offrir un moment de reconnexion : séance individuelle, expérience collective, retraite ou montant libre.",
};

const choix = [
  {
    icon: Heart,
    title: "Une séance individuelle",
    description: "Numérologie, hypnose, CellRelease®, massage énergétique, breathwork, innerdance.",
  },
  {
    icon: Calendar,
    title: "Une expérience collective",
    description: "Cercle de femmes, breathwork collectif, atelier thématique.",
  },
  {
    icon: Mountain,
    title: "Une retraite",
    description: "Acompte ou participation à une retraite immersive (sur demande).",
  },
  {
    icon: Gift,
    title: "Un montant libre",
    description: "À utiliser librement sur l'ensemble des accompagnements proposés.",
  },
];

const faq = [
  {
    q: "Quelle est la durée de validité ?",
    a: "Les cartes cadeaux sont valables un an à compter de leur émission. Cette durée peut être prolongée sur demande.",
  },
  {
    q: "Comment recevoir la carte cadeau ?",
    a: "Après votre demande, Céline vous contacte pour personnaliser la carte (message, prénom). Vous la recevez par email en version élégante imprimable.",
  },
  {
    q: "Peut-on personnaliser le message ?",
    a: "Oui. Chaque carte cadeau peut inclure un message personnel rédigé par vos soins.",
  },
  {
    q: "Comment effectuer le paiement ?",
    a: "Pour l'instant, le paiement se fait directement avec Céline (virement, espèces, chèque). Une page de paiement en ligne sera bientôt disponible.",
  },
];

export default function CartesCadeauxPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Cartes cadeaux"
        title={
          <>
            Offrir un moment de{" "}
            <span className="font-display-italic text-gold-deep">reconnexion</span>
          </>
        }
        description="Un cadeau qui prend soin, qui dépose et qui ouvre. Pour celles et ceux qui comptent vraiment."
      />

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <Reveal>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Que choisir ?</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {choix.map((c) => (
                      <div
                        key={c.title}
                        className="rounded-2xl border border-border-soft bg-bg-card p-5 space-y-2"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                          <c.icon className="h-4 w-4" />
                        </div>
                        <p className="font-display text-lg text-text-deep">{c.title}</p>
                        <p className="text-sm text-text-medium leading-relaxed">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Questions fréquentes</span>
                  </div>
                  <div className="space-y-3">
                    {faq.map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-2xl border border-border-soft bg-bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="cursor-pointer flex items-center justify-between gap-4 list-none">
                          <span className="font-display text-lg text-text-deep">{item.q}</span>
                          <span className="text-text-soft group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-3 text-sm text-text-medium leading-relaxed">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="sticky top-32 rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/40 via-bg-card to-bg-card p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Demande personnalisée</p>
                <p className="font-display text-2xl leading-snug text-text-deep">
                  Une carte qui ressemble à la personne à qui vous l'offrez.
                </p>
                <p className="text-sm text-text-medium">
                  Céline vous accompagne pour choisir le format, personnaliser le message et organiser la remise.
                </p>
                <Link href="/contact?sujet=Carte cadeau" className="btn-primary w-full">
                  Demander une carte cadeau
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-[0.7rem] text-text-soft leading-relaxed pt-3 border-t border-border-soft">
                  Paiement direct avec Céline. Une option de paiement en ligne sécurisé arrive prochainement.
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
