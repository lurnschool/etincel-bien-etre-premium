import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Heart, Users, Mountain, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { SmartImage } from "@/components/ui/SmartImage";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { accompagnementsIndividuels, whisperLines } from "@/lib/data";
import { pageVisuals } from "@/lib/visualAssetMap";

export const metadata: Metadata = {
  title: "Cérémonie cacao",
  description:
    "Une expérience symbolique et sensorielle autour du cacao, pensée comme un espace de présence, d'ouverture du cœur et de partage — en individuel, en cercle ou en retraite.",
};

const cacao = accompagnementsIndividuels.find((p) => p.slug === "cacao-rituel")!;

const pourQui = [
  "Personnes en recherche de présence et de ralentissement",
  "Femmes qui souhaitent se relier au féminin sacré",
  "Curieuses et curieux d'un rituel sensoriel doux",
  "Personnes en transition souhaitant ouvrir un espace symbolique",
];

const possibles = [
  {
    icon: User,
    title: "Rituel individuel",
    description:
      "Une cérémonie à deux pour un cheminement intime et sur-mesure.",
    href: "/contact?sujet=Rituel cacao individuel",
  },
  {
    icon: Users,
    title: "Cercle cacao",
    description:
      "Un cercle confidentiel qui ouvre un espace de partage en présence.",
    href: "/contact?sujet=Cercle cacao",
  },
  {
    icon: Mountain,
    title: "Cacao en retraite",
    description:
      "Une cérémonie intégrée à un temps long de retraite immersive.",
    href: "/retraites",
  },
];

const deroule = [
  "Accueil dans un espace tenu (yourte, salle dédiée ou nature)",
  "Pose de l'intention et invitation à la présence",
  "Préparation et partage du cacao en pleine conscience",
  "Temps de présence — souffle, mouvement, silence ou parole, selon le cercle",
  "Intégration et clôture du rituel",
];

const cacaoMosaic = pageVisuals.cacao;

export default function CacaoPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Cacao sacré · cérémonie"
        title={
          <>
            Le cacao comme{" "}
            <span className="font-display-italic text-gold-gradient">
              cérémonie du cœur
            </span>
          </>
        }
        description={cacao.pitch}
      />

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="cacao" />
        <WhisperLine text={whisperLines[13]} position="left" tone="gold" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
            <Reveal>
              <div className="space-y-10">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <span className="text-gold">
                      <Etincelle size={12} />
                    </span>
                    <span>L'intention</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Une expérience symbolique, sensorielle et profondément humaine.
                  </h2>
                  <div className="space-y-4 text-text-medium leading-relaxed">
                    <p>
                      Le cacao est ici utilisé comme une plante alliée, dans une intention de présence et d&apos;ouverture du cœur. Le rituel se déroule dans un espace tenu, à votre rythme, en individuel ou en cercle.
                    </p>
                    <p>
                      Il ne s&apos;agit ni d&apos;un soin médical, ni d&apos;une promesse de guérison — mais d&apos;un temps de pause profond pour ralentir, écouter, déposer.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Heart className="h-3.5 w-3.5" />
                    <span>Pour qui ?</span>
                  </div>
                  <ul className="space-y-2">
                    {pourQui.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-text-medium"
                      >
                        <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Le déroulé indicatif</span>
                  </div>
                  <ol className="space-y-3">
                    {deroule.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-4 text-text-medium"
                      >
                        <span className="font-display-italic text-gold-deep tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-text-soft italic">
                    Déroulé indicatif — chaque cérémonie s&apos;adapte au cadre, au groupe et à l&apos;intention du jour.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <SmartImage
                {...cacaoMosaic[0]}
                ratio="portrait"
                className="lg:sticky lg:top-28"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="individuel" className="section bg-bg-soft relative overflow-hidden">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Trois manières de vivre le cacao</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Individuel, en cercle, en retraite.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {possibles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col gap-4 rounded-3xl border border-border-soft bg-bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-text-deep">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-deep mt-2">
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <ImageMosaic
              items={cacaoMosaic.length >= 2 ? [cacaoMosaic[0], cacaoMosaic[1], cacaoMosaic[0]] : pageVisuals.home}
              layout="trio"
            />
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="cacao" intensity="medium" />
        <Container className="relative">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <Etincelle size={12} />
                  <span>Précautions</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-on-dark">
                  Quelques repères avant de venir.
                </h2>
                <p className="text-text-on-dark-soft leading-relaxed">
                  Le cacao cérémoniel utilisé en cérémonie est consommé en très petite quantité. Un échange préalable est systématique pour vérifier que la pratique vous convient.
                </p>
              </div>
              <ul className="space-y-3 text-text-on-dark-soft">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Personnes sous antidépresseurs (notamment IMAO ou ISRS) : un avis médical est nécessaire.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Conditions cardiaques connues : un avis médical est nécessaire.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Grossesse : modalités à confirmer avec Céline.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Aucune promesse de soin médical, gynécologique ou psychologique.
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Etincelle size={12} />
                  <span>Liste d&apos;intérêt</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Être informée du{" "}
                  <span className="font-display-italic text-gold-deep">
                    prochain rituel
                  </span>
                  .
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Les prochaines dates seront annoncées dès qu&apos;elles seront confirmées. Inscrivez-vous pour être prévenue en priorité.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link href="/contact?sujet=Cacao - liste d'intérêt" className="btn-primary w-full">
                  Rejoindre la liste
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact?sujet=Question cacao" className="btn-secondary w-full">
                  Poser une question
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
