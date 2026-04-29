import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Calendar, Mountain, Gift } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { GiftCardStudio } from "@/components/giftcard/GiftCardStudio";

export const metadata: Metadata = {
  title: "Cartes cadeaux",
  description:
    "Composez une carte cadeau personnalisée — séance, expérience collective, retraite ou montant libre. Aperçu en direct, téléchargement PNG, validation avec Céline.",
};

const formats = [
  {
    icon: Heart,
    title: "Une séance individuelle",
    description: "Numérologie, hypnose, CellRelease®, massage, breathwork, innerdance.",
  },
  {
    icon: Calendar,
    title: "Une expérience collective",
    description: "Cercle de femmes, breathwork collectif, innerdance, ateliers.",
  },
  {
    icon: Mountain,
    title: "Une retraite",
    description: "Acompte ou participation à une retraite immersive (sur demande).",
  },
  {
    icon: Gift,
    title: "Un montant libre",
    description: "À utiliser librement sur l'ensemble des accompagnements.",
  },
];

const faq = [
  {
    q: "Quelle est la durée de validité ?",
    a: "Un an à compter de l'émission. Prolongation possible sur simple demande.",
  },
  {
    q: "Comment recevoir la carte ?",
    a: "Après votre demande, Céline vous contacte pour personnaliser la version finale (message, prénom, support imprimé ou PDF). Livraison par email.",
  },
  {
    q: "Peut-on personnaliser le message ?",
    a: "Oui — directement dans le studio ci-dessus. Céline peut aussi y ajouter un mot manuscrit si vous le souhaitez.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Pour l'instant, le paiement se fait directement avec Céline (virement, espèces, chèque). Une option de paiement en ligne sera ajoutée prochainement.",
  },
];

export default function CartesCadeauxPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Studio carte cadeau"
        title={
          <>
            Offrir un moment de{" "}
            <span className="font-display-italic text-gold-deep">reconnexion</span>
          </>
        }
        description="Personnalisez la carte cadeau, prévisualisez le rendu en direct, puis envoyez votre demande à Céline."
      />

      <section className="pb-24">
        <Container>
          <Reveal>
            <GiftCardStudio />
          </Reveal>
        </Container>
      </section>

      <section id="formats" className="py-24 bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Les formats possibles</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Quatre manières d&apos;offrir.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <article className="rounded-2xl border border-border-soft bg-bg-card p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-4">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl text-text-deep mb-2">{f.title}</h3>
                  <p className="text-sm text-text-medium leading-relaxed">{f.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-4 mb-10">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Questions fréquentes</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Bonnes choses à savoir.
              </h2>
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
            <p className="mt-12 text-xs text-text-soft text-center">
              Une demande spécifique ?{" "}
              <Link href="/contact?sujet=Carte cadeau" className="link-elegant">
                Écrire à Céline
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
