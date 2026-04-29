import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  Compass,
  Flame,
  Gift,
  Leaf,
  Mountain,
  Quote,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { SmartImage } from "@/components/ui/SmartImage";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { RetreatInterestForm } from "@/components/retraites/RetreatInterestForm";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { temoignages, whisperLines } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";
import { pageVisuals } from "@/lib/visualAssetMap";

export const metadata: Metadata = {
  title: "Retraites bien-être · Gironde & Sud-Ouest",
  description:
    "Des retraites premium en petits groupes : souffle, cacao, féminin sacré, innerdance, cercles, nature. 6 à 12 personnes, accompagnement individuel intégré, écrin choisi avec soin. Liste d'intérêt sur inscription.",
};

const cinqPiliers = [
  {
    icon: Mountain,
    title: "Un écrin choisi",
    description:
      "Domaines en pleine nature, retraites au bord de l'océan ou en moyenne montagne. Lieux sélectionnés un par un, jamais d'usine à séminaires.",
  },
  {
    icon: Users,
    title: "Petit groupe (6 à 12)",
    description:
      "Pas de session de masse. Chaque participante est connue par Céline avant l'arrivée — la qualité du cercle fait la profondeur du travail.",
  },
  {
    icon: Flame,
    title: "Pratiques tenues",
    description:
      "Souffle, cacao, féminin sacré, innerdance, cercles, marche silencieuse, rituel symbolique. Composées comme une partition, jamais empilées.",
  },
  {
    icon: Compass,
    title: "Accompagnement individuel",
    description:
      "Une séance individuelle avec Céline est intégrée dans le déroulé : vous repartez avec un fil personnel, pas seulement une expérience de groupe.",
  },
  {
    icon: Shield,
    title: "Cadre sécure",
    description:
      "Confidentialité totale du cercle, alimentation végétarienne soignée, hébergement individuel ou en duo selon préférence. Zéro injonction spirituelle.",
  },
];

const programmeType = [
  {
    moment: "07h00",
    title: "Réveil doux",
    description: "Tisane, étirements doux, écoute du paysage.",
  },
  {
    moment: "08h30",
    title: "Cercle d'ouverture",
    description: "Pose de l'intention du jour, météo intérieure.",
  },
  {
    moment: "09h30",
    title: "Pratique de souffle",
    description: "Breathwork chamanique ou innerdance — le matin pour mobiliser.",
  },
  {
    moment: "12h30",
    title: "Repas végétarien",
    description: "Préparé sur place, alimentation pensée pour soutenir l'écoute.",
  },
  {
    moment: "14h30",
    title: "Temps libre / nature",
    description: "Marche, sieste, écriture, rien — selon ce qui appelle.",
  },
  {
    moment: "16h00",
    title: "Travail individuel",
    description: "Séance individuelle avec Céline (constellation, numérologie, soin selon votre fil).",
  },
  {
    moment: "19h00",
    title: "Cérémonie cacao",
    description: "Cercle confidentiel, parole tenue, ouverture du cœur en sororité.",
  },
  {
    moment: "21h00",
    title: "Clôture & repos",
    description: "Silence honoré jusqu'au lendemain matin.",
  },
];

const pourQui = [
  "Femmes en transition (rupture, parentalité, virage pro, deuil)",
  "Personnes qui sentent qu'une séance individuelle ne suffit plus",
  "Praticiennes du bien-être qui veulent recevoir, pas tenir l'espace",
  "Curieuses prêtes à s'engager pleinement (pas juste \"essayer\")",
  "Femmes qui cherchent un cercle de qualité, en sécurité",
];

const pourQuiPas = [
  "Recherche d'un séjour spa ou \"bien-être\" léger sans implication",
  "Refus du travail collectif (les cercles sont au cœur du dispositif)",
  "Conditions médicales non stabilisées (cardiaque, psychiatrique, grossesse à risque)",
  "Attente d'une promesse de guérison ou de résultat thérapeutique",
];

const lesFormats = [
  {
    label: "Journée immersive",
    duration: "1 jour",
    investment: "180 € à 280 €",
    description:
      "Un format porte d'entrée — souffle, cacao, cercle. Idéal pour découvrir l'univers Etincel sans s'engager dans un séjour long.",
  },
  {
    label: "Week-end reconnexion",
    duration: "2 à 3 jours",
    investment: "490 € à 780 €",
    description:
      "Vendredi soir au dimanche après-midi. Le format le plus demandé — le travail se déploie vraiment, sans déraciner trop longtemps du quotidien.",
  },
  {
    label: "Retraite longue",
    duration: "5 à 7 jours",
    investment: "1 290 € à 1 890 €",
    description:
      "Le format pour les transformations profondes. Hébergement complet, journées rythmées, séances individuelles intégrées, immersion totale.",
  },
];

const faq = [
  {
    q: "Quand sont les prochaines dates ?",
    a: "Les retraites Etincel sont annoncées en avant-première à la liste d'intérêt, entre 6 et 10 semaines avant la date — pour permettre la préparation. Les dates publiques sortent ensuite si des places restent disponibles.",
  },
  {
    q: "Qu'est-ce qui distingue une retraite Etincel d'un autre séjour ?",
    a: "Trois choses : la taille du groupe (6 à 12 personnes maximum), une séance individuelle avec Céline intégrée dans le déroulé, et un cadre éthique strict (zéro injonction spirituelle, alimentation soignée, confidentialité totale).",
  },
  {
    q: "Faut-il un niveau de pratique particulier ?",
    a: "Non. Les retraites accueillent débutantes et expérimentées. Céline ajuste l'intensité au groupe et propose des modulations individuelles pour chaque pratique.",
  },
  {
    q: "Comment se passe l'hébergement ?",
    a: "Selon le lieu retenu : chambre individuelle, en duo (avec une amie ou en partage), ou plus rarement en dortoir féminin de qualité. Précisé pour chaque retraite avant l'inscription définitive.",
  },
  {
    q: "Y a-t-il des contre-indications ?",
    a: "Oui. Le breathwork et le cacao demandent un échange préalable systématique. Antécédents cardiaques, traitements antidépresseurs (IMAO/ISRS), troubles psychiatriques actifs, grossesse à risque : un point individuel est obligatoire avant toute inscription.",
  },
  {
    q: "Comment se passe l'inscription ?",
    a: "1. Inscription à la liste d'intérêt. 2. Annonce du programme par email. 3. Échange préalable avec Céline (téléphone, 20 min). 4. Confirmation et acompte. Aucune retraite n'est ouverte sans cet échange.",
  },
  {
    q: "Tout ce qui se vit reste-t-il confidentiel ?",
    a: "Oui. La confidentialité du groupe est un cadre fondamental, posé dès l'ouverture. Ce qui est partagé reste strictement à l'intérieur du cercle — c'est ce qui rend le travail possible.",
  },
  {
    q: "Que se passe-t-il en cas d'annulation ?",
    a: "Acompte de 30 % conservé en cas d'annulation à plus de 30 jours, 50 % entre 30 et 14 jours. Annulation tardive : possibilité de céder votre place à une personne validée par Céline.",
  },
  {
    q: "Peut-on offrir une retraite ?",
    a: "Oui — par carte cadeau personnalisée. Le bénéficiaire échange ensuite avec Céline pour valider la date qui lui convient.",
  },
];

export default function RetraitesPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Immersions premium · 2026"
        title={
          <>
            Sortir vraiment.{" "}
            <span className="font-display-italic text-gold-gradient">
              Pas juste partir.
            </span>
          </>
        }
        description="Des retraites en petits groupes (6 à 12 personnes) au cœur du Sud-Ouest. Souffle, cacao, féminin sacré, innerdance, cercles. Une séance individuelle avec Céline intégrée. Une expérience pensée comme une transformation, pas comme un séjour."
      />

      <section className="bg-bg-deep text-text-on-dark py-10 border-y border-white/10 relative overflow-hidden">
        <SacredBackdrop variant="retraite" intensity="soft" />
        <Container className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "6 à 12", label: "personnes par retraite" },
              { value: "1+1+1", label: "groupe · individuel · nature" },
              { value: "100%", label: "confidentialité du cercle" },
              { value: "0", label: "injonction spirituelle" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="font-display text-3xl md:text-4xl text-gold">{s.value}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-text-on-dark-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="retraite" />
        <WhisperLine text={whisperLines[17]} position="left" tone="gold" />
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Flame className="h-3.5 w-3.5" />
                  Pourquoi maintenant
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                  Le soin individuel{" "}
                  <span className="font-display-italic text-gold-deep">ne suffit plus</span> à beaucoup.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  En 2026, la majorité des femmes qui poussent la porte d&apos;Etincel ont déjà essayé. Yoga, méditation, sophrologie, peut-être une thérapie. Et pourtant, quelque chose résiste.
                </p>
                <p className="text-text-medium leading-relaxed">
                  L&apos;immersion fait quelque chose qu&apos;une séance d&apos;une heure ne fera jamais : sortir du quotidien, suspendre les rôles, déposer ce qu&apos;on porte sans le savoir. C&apos;est pour cette raison précise que le format retraite explose en France — et c&apos;est pour cette raison que Céline en propose désormais quatre par an, en petits groupes choisis.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "Sortir des rôles",
                  body: "Mère, conjointe, professionnelle, fille — le quotidien empile les rôles. La retraite suspend tout ça pendant quelques jours. C'est là que ce qui était enfoui remonte.",
                },
                {
                  title: "Habiter un cadre tenu",
                  body: "Un groupe choisi, une praticienne formée, des pratiques séquencées avec rigueur. Pas d'animation, pas de spectacle — un espace ferme qui rend la traversée possible.",
                },
                {
                  title: "Recevoir, vraiment",
                  body: "Vous arrivez, vous déposez vos affaires. Tout est pensé : repas, rythme, transitions, lieu. Aucune décision à prendre. Pour beaucoup, c'est le premier vrai relâchement depuis des années.",
                },
                {
                  title: "Repartir avec un fil",
                  body: "La séance individuelle intégrée fait la différence : Céline prend ce qui s'est levé pendant le séjour et vous aide à en faire un fil concret pour la suite. Vous ne repartez pas avec une expérience floue.",
                },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05}>
                  <article className="rounded-3xl border border-border-soft bg-bg-card p-6 md:p-7">
                    <h3 className="font-display text-2xl text-text-deep leading-tight mb-2">
                      {b.title}
                    </h3>
                    <p className="text-text-medium leading-relaxed">{b.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft relative overflow-hidden">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Une retraite Etincel, c&apos;est
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Cinq piliers non négociables.
              </h2>
              <p className="text-text-medium leading-relaxed text-base md:text-lg">
                C&apos;est ce qui sépare une vraie retraite d&apos;un week-end « bien-être » dilué. Aucun de ces cinq points n&apos;est sacrifié, jamais.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cinqPiliers.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="h-full rounded-3xl border border-border-soft bg-bg-card p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep leading-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-text-medium leading-relaxed">{p.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <ImageMosaic items={pageVisuals.retraites.slice(1, 4)} layout="trio" />
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-text-soft text-center">
              Visuels d&apos;ambiance — chaque retraite communique ses photos officielles avant l&apos;inscription
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="programme" className="relative section bg-bg-deep text-text-on-dark overflow-hidden">
        <SacredBackdrop variant="retraite" intensity="medium" />
        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-4">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft flex items-center gap-3">
                  <Clock className="h-3.5 w-3.5" />
                  Programme type · une journée
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-on-dark">
                  Un rythme tenu, pas chargé.
                </h2>
                <p className="text-text-on-dark-soft leading-relaxed">
                  Chaque journée alterne pratique soutenue, repos intégré et temps libre. Le silence est honoré entre 21h et 8h pour permettre à ce qui s&apos;est levé de se déposer.
                </p>
                <p className="text-text-on-dark-soft leading-relaxed text-sm">
                  Ce programme est indicatif — il s&apos;adapte au lieu, à la saison et au groupe. Aucune retraite n&apos;est identique.
                </p>
              </div>
            </Reveal>

            <ol className="lg:col-span-8 relative space-y-3">
              <span className="absolute left-[3.6rem] top-2 bottom-2 w-px bg-gold/20 hidden md:block" aria-hidden />
              {programmeType.map((s, i) => (
                <Reveal key={s.moment} delay={i * 0.04}>
                  <li className="flex items-start gap-5 md:gap-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <span className="font-display-italic text-gold tabular-nums text-base md:text-lg shrink-0 w-12 text-right">
                      {s.moment}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xl text-text-on-dark leading-tight">{s.title}</p>
                      <p className="text-sm text-text-on-dark-soft mt-1.5 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="formats" className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5" />
                Trois formats, trois investissements
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Choisir le format qui vous convient.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Les fourchettes ci-dessous incluent la pension complète (hébergement, repas végétariens, transferts locaux), les pratiques, la séance individuelle et le suivi post-retraite. Le tarif définitif de chaque session est confirmé lors de l&apos;ouverture des inscriptions.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {lesFormats.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <article className="h-full flex flex-col rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep mb-3">
                    {f.duration}
                  </p>
                  <h3 className="font-display text-2xl text-text-deep leading-tight mb-3">
                    {f.label}
                  </h3>
                  <p className="text-text-medium leading-relaxed flex-1">{f.description}</p>
                  <div className="mt-6 pt-5 border-t border-border-soft">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft mb-1">
                      Investissement
                    </p>
                    <p className="font-display text-2xl text-gold-deep">{f.investment}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-3xl mx-auto text-sm text-text-soft leading-relaxed text-center">
              Paiement en 3× sans frais possible · facilités d&apos;échelonnement étudiées au cas par cas · acompte de 30 % à l&apos;inscription · solde à 30 jours.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            <Reveal>
              <article className="rounded-3xl border-2 border-gold-soft/40 bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card p-7 md:p-9 h-full space-y-5">
                <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Pour qui</span>
                </div>
                <h3 className="font-display text-3xl text-text-deep leading-tight">
                  Cette retraite est pour vous si…
                </h3>
                <ul className="space-y-2.5">
                  {pourQui.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-text-medium leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="rounded-3xl border border-border-soft bg-bg-soft p-7 md:p-9 h-full space-y-5">
                <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Pour qui pas</span>
                </div>
                <h3 className="font-display text-3xl text-text-deep leading-tight">
                  Et si elle ne l&apos;est pas, soyons clair.
                </h3>
                <ul className="space-y-2.5">
                  {pourQuiPas.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-text-medium leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-text-soft shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-soft italic pt-3 border-t border-border-soft">
                  Mieux vaut une retraite reportée qu&apos;une retraite vécue à contretemps.
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="retraite" intensity="medium" />
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="h-8 w-8 text-gold mx-auto" />
              <p className="font-display-italic text-2xl md:text-4xl leading-[1.2] text-text-on-dark">
                « {temoignages[0].quote} »
              </p>
              <p className="text-gold-soft font-display-italic">— {temoignages[0].name}, après une retraite Etincel</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <Reveal>
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Mountain className="h-3.5 w-3.5" />
                  Céline · votre passeuse
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                  Une praticienne, pas une influenceuse.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Céline accompagne depuis plus de dix ans, en cabinet et en groupe. Numérologue, praticienne en hypnose, formée au breathwork chamanique, aux constellations familiales et au cacao sacré. Elle ne vend pas un univers — elle tient un cadre.
                </p>
                <p className="text-text-medium leading-relaxed">
                  Sur retraite, elle est <strong>seule animatrice</strong>. Pas de cohorte de coachs externes, pas d&apos;équipe d&apos;animation. Vous savez qui vous accueille, qui vous accompagne dans les pratiques, qui vous reçoit en individuel.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/a-propos" className="btn-secondary">
                    Découvrir le parcours de Céline
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <WhatsAppButton message={whatsappMessages.retraite} variant="outline" size="sm">
                    Lui poser une question
                  </WhatsAppButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SmartImage
                fallback="portrait"
                alt="Céline Dusseval — praticienne et hôte des retraites Etincel"
                ratio="portrait"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        id="interet"
        className="relative section bg-bg-deep text-text-on-dark overflow-hidden"
      >
        <SacredBackdrop variant="retraite" intensity="medium" />
        <Container className="relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <Reveal>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <Etincelle size={12} />
                  <span>Inscription liste d&apos;intérêt 2026</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl leading-tight text-text-on-dark">
                  Quatre retraites cette année. Places limitées.
                </h2>
                <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg max-w-xl">
                  Les retraites Etincel ouvrent en avant-première à la liste d&apos;intérêt. Inscrivez-vous pour recevoir le programme complet 6 à 10 semaines avant la date — assez tôt pour vous organiser, pas trop pour préserver l&apos;exclusivité du groupe.
                </p>
                <ul className="space-y-2 text-sm text-text-on-dark-soft">
                  <li className="flex items-start gap-3">
                    <Etincelle size={10} />
                    Programme détaillé envoyé par email avant publication publique
                  </li>
                  <li className="flex items-start gap-3">
                    <Etincelle size={10} />
                    Échange préalable avec Céline avant toute confirmation
                  </li>
                  <li className="flex items-start gap-3">
                    <Etincelle size={10} />
                    Aucune inscription définitive ici — vous restez libre
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <RetreatInterestForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-4 mb-10">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Questions fréquentes</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de vous inscrire.
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
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-8 md:p-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Gift className="h-3.5 w-3.5" />
                  <span>Offrir une retraite</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Le plus beau cadeau{" "}
                  <span className="font-display-italic text-gold-deep">
                    qu&apos;on puisse faire à une amie qui a tout porté.
                  </span>
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Carte cadeau personnalisée — la bénéficiaire choisit ensuite la retraite qui lui convient avec Céline. Paiement Stripe sécurisé, carte définitive envoyée par email avec sa référence.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/cartes-cadeaux" className="btn-primary w-full justify-center">
                  Composer une carte cadeau
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/diagnostic" className="btn-secondary w-full justify-center">
                  Faire le bilan d&apos;orientation
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BilanGiftBanner variant="warm" />
    </>
  );
}
