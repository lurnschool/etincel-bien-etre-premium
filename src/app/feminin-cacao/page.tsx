import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calendar,
  Compass,
  Flower,
  Heart,
  Quote,
  Shield,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { whisperLines, disclaimers, temoignages } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Féminin & cacao — accompagnement de la femme · Bordeaux",
  description:
    "Cérémonies cacao, cercles de femmes, accompagnement symbolique du féminin sacré. Revenir au corps, au cœur, aux cycles et à l'intuition avec Céline Dusseval. Bordeaux, Le Taillan-Médoc, Univers'elles.",
};

const whatYouCarry = [
  "Une déconnexion progressive de votre corps et de vos sensations",
  "Le sentiment de ne plus habiter votre féminin pleinement",
  "Le besoin d'un espace tenu, sans injonction, pour ralentir",
  "Une question autour de vos cycles, votre énergie créatrice, votre intuition",
  "L'envie d'une sororité réelle, pas d'un groupe de partage superficiel",
  "Le désir d'ouvrir le cœur après une période de fermeture ou de blessure",
];

const formats = [
  {
    icon: Heart,
    title: "Cérémonie cacao individuelle",
    description:
      "Une cérémonie à deux, sur-mesure, ajustée à votre intention du jour. Le cacao y est accompagné de présence tenue, parfois d'hypnose, parfois de massage si le retour au corps est l'enjeu.",
    duration: "1h30 à 2h",
    price: "Tarif selon événement ou format",
    href: "/cacao",
  },
  {
    icon: Users,
    title: "Cercle cacao en sororité",
    description:
      "Un cercle confidentiel en petit groupe, souvent en lien avec un thème (lune, transition, féminin sacré). L'effet du collectif change la profondeur du travail.",
    duration: "2h à 3h",
    price: "Tarif selon événement ou format",
    href: "/cacao",
  },
  {
    icon: User,
    title: "Accompagnement féminin sacré",
    description:
      "Un accompagnement individuel autour du féminin sacré et de la symbolique de l'utérus, pensé comme un espace de reconnexion à soi, à son corps, à son histoire et à son énergie créatrice.",
    duration: "À convenir avec Céline",
    price: "Sur demande",
    href: "/feminin-sacre",
  },
  {
    icon: Calendar,
    title: "Cercle de femmes mensuel",
    description:
      "Un rendez-vous mensuel pour déposer, partager, revenir à soi en sororité. Cadre tenu, confidentialité totale, rituels doux.",
    duration: "3h",
    price: "Sur inscription",
    href: "/cercles-de-femmes",
  },
];

const tools = [
  {
    name: "Massage Libération Reconnexion",
    description: "Mobilisé quand le retour au corps demande un toucher tenu et profond — pas comme prestation autonome, mais comme passage dans l'accompagnement féminin.",
    href: "/accompagnements/massage-liberation-reconnexion",
  },
  {
    name: "Massage énergétique",
    description: "Pour réactiver la circulation énergétique quand le corps a perdu son habiter.",
    href: "/accompagnements/massage-energetique",
  },
  {
    name: "Hypnose intégrée",
    description: "Parfois mobilisée dans les cérémonies pour ouvrir une dimension symbolique plus profonde.",
    href: "/accompagnements/hypnose",
  },
  {
    name: "Réflexologie amérindienne",
    description: "Quand un travail subtil entre corps et symbolique appelle.",
    href: "/accompagnements/reflexologie",
  },
];

const faq = [
  {
    q: "Le cacao est-il psychédélique ?",
    a: "Non. Le cacao cérémoniel utilisé est cru, non sucré, consommé en très petite quantité. Il ouvre l'écoute sans altération psychique. Aucune dimension psychédélique.",
  },
  {
    q: "Y a-t-il des contre-indications ?",
    a: "Oui. Les personnes sous antidépresseurs (IMAO/ISRS), avec une condition cardiaque ou enceintes doivent demander un avis médical avant la cérémonie. Un échange préalable avec Céline est systématique pour valider votre participation.",
  },
  {
    q: "L'accompagnement féminin est-il réservé aux femmes ?",
    a: "Le travail s'inscrit dans une exploration symbolique du féminin et s'adresse principalement aux femmes. Céline peut accueillir d'autres situations sur demande, après échange.",
  },
  {
    q: "La « médecine de l'utérus » est-elle un acte médical ?",
    a: "Non, en aucun cas. Il s'agit d'une approche symbolique et énergétique de reconnexion à l'utérus comme territoire vivant. Aucun acte gynécologique ni médical n'est posé. Cet accompagnement ne remplace pas un suivi médical lorsque celui-ci est nécessaire.",
  },
  {
    q: "Comment se passe un cercle de femmes ?",
    a: "Un cadre tenu : ouverture, intention, parole en cercle, rituel symbolique, clôture. Aucun jugement, confidentialité totale, qualité de présence comme dans les cercles physiques originels.",
  },
  {
    q: "Faut-il avoir déjà pratiqué ?",
    a: "Non. Les cercles et cérémonies sont ouverts aux personnes débutantes comme expérimentées. Céline ajuste l'intensité au groupe et propose des modulations individuelles.",
  },
];

export default function FemininCacaoPage() {
  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Axe 2 · Féminin & cacao"
        title={
          <>
            Revenir au corps, au cœur,{" "}
            <span className="font-display-italic text-gold-deep">au féminin</span>.
          </>
        }
        description="Cérémonies cacao, cercles de femmes, accompagnement symbolique autour du féminin sacré et de l'utérus, du corps et de l'intuition. Un espace de douceur, de présence et de reconnexion — pas une thérapie, pas un protocole, un cadre tenu où votre singularité féminine peut respirer."
      />

      <section className="bg-bg-soft border-y border-border-soft py-10">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "1×/mois", label: "cercle de femmes mensuel" },
              { value: "0", label: "injonction spirituelle" },
              { value: "100 %", label: "confidentialité du cercle" },
              { value: "0", label: "promesse médicale ou gynécologique" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="font-display text-3xl md:text-4xl text-gold-deep">{s.value}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-text-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="cacao" />
        <WhisperLine text={whisperLines[15]} position="left" tone="gold" />
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Flower className="h-3.5 w-3.5" />
                  Ce que vous portez
                </span>
                <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-deep">
                  Le féminin n&apos;est pas un concept.{" "}
                  <span className="font-display-italic text-gold-deep">
                    C&apos;est une présence à retrouver.
                  </span>
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Avant les outils, c&apos;est souvent un appel diffus mais persistant — quelque chose d&apos;ancien et de neuf à la fois — qui pousse à frapper à cette porte.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border-soft border-y border-border-soft">
                {whatYouCarry.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <li className="flex items-baseline gap-4 py-5 md:py-6">
                      <span className="font-display-italic text-[0.85rem] tabular-nums text-gold-deep shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl text-text-deep leading-snug">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="cacao" intensity="medium" />
        <Container className="relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <Reveal>
              <div className="space-y-5">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft flex items-center gap-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  Le cacao au cœur de l&apos;axe
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-on-dark">
                  Une cérémonie cacao n&apos;est pas un événement isolé.
                </h2>
                <div className="space-y-4 text-text-on-dark-soft leading-relaxed">
                  <p>
                    Pour Céline, le cacao est une porte centrale de l&apos;accompagnement féminin. Derrière une cérémonie, il y a un processus : un travail de présence, parfois de l&apos;hypnose, parfois un retour au corps par le toucher, parfois un cercle de parole en sororité.
                  </p>
                  <p>
                    Le cacao en lui-même est consommé en très petite quantité, cru, non sucré. Il ouvre l&apos;écoute sans altération. C&apos;est l&apos;espace tenu autour qui permet à ce qui appelle d&apos;émerger — pas la plante seule.
                  </p>
                </div>
                <Link href="/cacao" className="inline-flex items-center gap-2 text-gold-soft hover:text-gold transition-colors">
                  En savoir plus sur les cérémonies cacao
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SmartImage
                fallback="cacao"
                alt="Bol de cacao cérémoniel et tambour chamanique"
                ratio="portrait"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Quatre formats possibles
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Selon votre élan,{" "}
                <span className="font-display-italic text-gold-deep">votre rythme</span>.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Céline ajuste l&apos;approche selon ce qui se présente. L&apos;individuel pour l&apos;intimité d&apos;un face-à-face, le collectif pour la force du miroir et de la sororité.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <article className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8 h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl text-text-deep leading-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-text-medium leading-relaxed mb-5">{f.description}</p>
                  <dl className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-border-soft mb-4">
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Durée</dt>
                      <dd className="font-display text-sm text-text-deep">{f.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Tarif</dt>
                      <dd className="font-display text-sm text-text-deep">{f.price}</dd>
                    </div>
                  </dl>
                  <Link href={f.href} className="text-sm text-accent hover:text-accent-deep inline-flex items-center gap-1.5">
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Compass className="h-3.5 w-3.5" />
                Outils mobilisés
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Le corps, parfois, demande un retour direct.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Céline n&apos;est pas masseuse. Elle utilise le massage et d&apos;autres outils corporels comme passages dans l&apos;accompagnement féminin — quand le corps a besoin d&apos;être réintégré dans le travail symbolique.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.04}>
                <article className="rounded-2xl border border-border-soft bg-bg-card p-5 h-full flex flex-col">
                  <h3 className="font-display text-lg text-text-deep leading-tight mb-2">{t.name}</h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1">{t.description}</p>
                  <Link href={t.href} className="text-xs text-accent mt-3 inline-flex items-center gap-1 hover:text-accent-deep">
                    Découvrir
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="h-8 w-8 text-gold-deep mx-auto" />
              <p className="font-display-italic text-2xl md:text-4xl leading-[1.2] text-text-deep">
                « {temoignages[2].quote} »
              </p>
              <p className="text-gold-deep font-display-italic">— {temoignages[2].name}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de venir.
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
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Heart className="h-3.5 w-3.5" />
                  <span>Premier pas</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Être{" "}
                  <span className="font-display-italic text-gold-deep">accompagnée</span>.
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Une cérémonie ou un cercle commence toujours par un échange préalable. Vous écrivez, Céline vous appelle pour comprendre votre intention et vous proposer le format le plus juste.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact?sujet=F%C3%A9minin%20%26%20cacao" className="btn-primary w-full justify-center">
                  Demander un échange
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton message={whatsappMessages.cacao} className="w-full justify-center">
                  Échanger sur WhatsApp
                </WhatsAppButton>
                <Link href="/diagnostic" className="btn-secondary w-full justify-center">
                  Faire le bilan d&apos;orientation
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BilanGiftBanner
        variant="warm"
        title="Continuer l'exploration"
        subtitle="Cet axe résonne mais d'autres chemins peuvent ouvrir aussi le travail."
      />

      <section className="section">
        <Container>
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link
                href="/memoires-constellations"
                className="group rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft transition-colors"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-2">Axe 1</p>
                <p className="font-display text-xl text-text-deep">Mémoires & constellations</p>
                <p className="text-sm text-text-medium mt-2 leading-relaxed">
                  Libérer les mémoires qui ne vous appartiennent plus.
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-4 group-hover:text-accent-deep">
                  Découvrir
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/corps-integration"
                className="group rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft transition-colors"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-2">Axe 3</p>
                <p className="font-display text-xl text-text-deep">Corps & intégration</p>
                <p className="text-sm text-text-medium mt-2 leading-relaxed">
                  Intégrer par le corps ce que les mots ne suffisent pas à transformer.
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-4 group-hover:text-accent-deep">
                  Découvrir
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <Shield className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
              <span>{disclaimers.feminin}</span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
