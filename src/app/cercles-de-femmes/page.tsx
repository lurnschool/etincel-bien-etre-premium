import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";

export const metadata: Metadata = {
  title: "Cercles de femmes",
  description:
    "Un rendez-vous mensuel à Bordeaux pour déposer, partager et revenir à soi en sororité.",
};

const peutVivre = [
  "Un espace de parole confidentiel",
  "Des pratiques corporelles douces",
  "De la respiration et de l'ancrage",
  "Des rituels symboliques",
  "Une sororité sans jugement",
  "Une reconnexion au féminin",
];

const aQuiSadresse = [
  "Aux femmes qui ont besoin de déposer",
  "À celles en transition de vie",
  "À celles qui souhaitent s'écouter dans un cadre tenu",
  "À celles qui n'ont jamais participé à un cercle",
  "À celles qui souhaitent se ressourcer en groupe",
];

export default function CerclesPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Rendez-vous mensuel"
        title={
          <>
            Un cercle pour{" "}
            <span className="font-display-italic text-gold-deep">déposer</span>{" "}
            et revenir à soi
          </>
        }
        description="Une fois par mois, un espace tenu pour partager, écouter et se relier en sororité."
      />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] items-start">
            <Reveal>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Ce que vous pouvez y vivre</span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {peutVivre.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-text-medium">
                        <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>À qui cela s'adresse</span>
                  </div>
                  <ul className="space-y-2">
                    {aQuiSadresse.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-text-medium">
                        <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-rose-soft/60 bg-gradient-to-br from-rose-soft/40 via-bg-card to-bg-card p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Prochain cercle</span>
                  </div>
                  <p className="font-display text-2xl text-text-deep">
                    Prochaine date à venir
                  </p>
                  <p className="text-sm text-text-medium leading-relaxed">
                    Pour être informée dès l'ouverture des inscriptions, laissez-nous votre prénom et votre email — vous recevrez un message dès que la date sera fixée.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside id="inscription" className="sticky top-32 rounded-3xl border border-border-soft bg-bg-card p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Liste d'intérêt</p>
                <p className="font-display text-2xl leading-snug text-text-deep">
                  Être informée du prochain cercle
                </p>
                <p className="text-sm text-text-medium">
                  Inscrivez-vous pour recevoir la prochaine date par email.
                </p>
                <Link href="/contact?sujet=Cercle de femmes" className="btn-primary w-full">
                  S'inscrire à la liste
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-[0.7rem] text-text-soft leading-relaxed pt-2 border-t border-border-soft">
                  Vos coordonnées ne seront utilisées que pour vous prévenir des prochains cercles. Désinscription à tout moment.
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
