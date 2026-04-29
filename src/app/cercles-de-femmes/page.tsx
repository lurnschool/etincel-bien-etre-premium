import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { whisperLines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cercles de femmes — Bordeaux",
  description:
    "Un rendez-vous mensuel pour déposer, partager et revenir à soi en sororité. Un cadre tenu, confidentiel, des rituels doux portés par Céline Dusseval.",
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

const deroule = [
  "Accueil dans un espace tenu — bougies, lumière douce, présence",
  "Pose de l'intention — un mot, une image, ce qui appelle aujourd'hui",
  "Tour de parole en confiance — sans interruption, sans interprétation",
  "Pratique corporelle douce, respiration et ancrage",
  "Rituel symbolique — parfois cacao, parfois objet, parfois silence",
  "Clôture — intégration, gratitude, retour au quotidien",
];

const thematiques = [
  "Cycles intérieurs et saisons du féminin",
  "Reconnexion au corps et au souffle",
  "Mémoires familiales et lignée féminine",
  "Énergie créatrice et expression de soi",
  "Rituels de passage et nouvelles pages",
  "Cacao et ouverture du cœur",
  "Lune et rythmes naturels",
  "Sororité et confidentialité",
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
        <WhisperLine text={whisperLines[8]} position="left" tone="amethyst" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
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
                    <span>À qui cela s&apos;adresse</span>
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

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Le déroulé d&apos;un cercle</span>
                  </div>
                  <ol className="space-y-3">
                    {deroule.map((step, i) => (
                      <li key={step} className="flex items-baseline gap-4 text-text-medium leading-relaxed">
                        <span className="font-display-italic text-gold-deep tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-text-soft italic">
                    Déroulé indicatif — chaque cercle s&apos;ajuste à la thématique et à l&apos;énergie du groupe.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Thématiques possibles</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {thematiques.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border-medium bg-bg-card px-4 py-1.5 text-sm text-text-deep"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-text-soft italic">
                    La thématique du prochain cercle sera annoncée à l&apos;ouverture des inscriptions.
                  </p>
                </div>

                <div className="rounded-3xl border border-rose-soft/60 bg-gradient-to-br from-rose-soft/40 via-bg-card to-bg-card p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Confidentialité</span>
                  </div>
                  <p className="font-display text-2xl text-text-deep leading-snug">
                    Ce qui est partagé reste à l&apos;intérieur du cercle.
                  </p>
                  <p className="text-sm text-text-medium leading-relaxed">
                    La confidentialité est un cadre fondamental du cercle. Aucune trace écrite, aucun partage extérieur, aucun jugement. Vous parlez seulement si vous le souhaitez.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside
                id="inscription"
                className="lg:sticky lg:top-28 rounded-3xl border border-border-soft bg-bg-card p-7 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Prochain cercle</span>
                </div>
                <p className="font-display text-2xl leading-snug text-text-deep">
                  Prochaine date à venir
                </p>
                <p className="text-sm text-text-medium leading-relaxed">
                  Inscrivez-vous à la liste pour être prévenue en priorité dès qu&apos;une nouvelle date est ouverte.
                </p>
                <Link href="/contact?sujet=Cercle de femmes" className="btn-primary w-full">
                  Rejoindre la liste d&apos;intérêt
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?sujet=Question cercle"
                  className="block text-center text-sm text-text-medium hover:text-accent transition-colors py-2"
                >
                  Poser une question
                </Link>
                <p className="text-[0.7rem] text-text-soft leading-relaxed pt-2 border-t border-border-soft">
                  Vos coordonnées ne seront utilisées que pour vous prévenir des prochains cercles. Désinscription à tout moment.
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
