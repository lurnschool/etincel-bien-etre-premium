import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Compass,
  Eye,
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
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { whisperLines, disclaimers, temoignages } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Mémoires & constellations — libérer les loyautés transgénérationnelles",
  description:
    "Constellations familiales, transgénérationnel, mémoires portées avec Céline Dusseval. Mettre en lumière les dynamiques invisibles qui traversent votre histoire pour retrouver une place plus juste. À Bordeaux, Le Taillan-Médoc.",
};

const whatYouCarry = [
  "Une dynamique familiale qui se rejoue malgré vous",
  "Une loyauté ancienne qui pèse sans qu'on sache la nommer",
  "Un schéma transgénérationnel — argent, couple, place, parentalité",
  "Une mémoire d'enfance ou de naissance qui demande la lumière",
  "La sensation de porter une histoire qui n'est pas tout à fait la vôtre",
  "Une question liée à votre venue au monde, à votre lignée",
];

const tools = [
  {
    name: "Constellation familiale",
    description:
      "Le cœur de l'axe — un travail symbolique et systémique pour mettre en lumière les liens, transmissions et loyautés invisibles. En individuel ou en groupe.",
    price: "95 € la séance",
    href: "/constellations",
  },
  {
    name: "Constellation Rebirth · de naissance",
    description:
      "Un voyage symbolique au cœur de votre venue au monde, des empreintes posées au moment de naître et de leurs résonances actuelles.",
    price: "95 € la séance",
    href: "/constellations#rebirth",
  },
  {
    name: "Hypnose transgénérationnelle",
    description:
      "Un voyage intérieur pour reconnecter avec une mémoire ou une figure de la lignée. Mobilisée quand le travail demande une approche plus intime que la mise en cercle.",
    price: "90 € la séance",
    href: "/accompagnements/hypnose",
  },
  {
    name: "CellRelease®",
    description:
      "Une relaxation profonde qui invite à libérer les mémoires inscrites dans le corps — utile en complément d'une constellation pour ancrer ce qui s'est éclairé.",
    price: "90 € la séance",
    href: "/accompagnements/cellrelease",
  },
  {
    name: "Numérologie",
    description:
      "Comme lecture symbolique de votre lignée et des cycles inscrits dans votre date de naissance. Boussole optionnelle pour orienter le travail.",
    price: "110 € la lecture",
    href: "/accompagnements/numerologie",
  },
];

const deroule = [
  {
    num: "01",
    title: "Échange préalable",
    description:
      "Un appel téléphonique court pour comprendre votre demande, votre histoire et choisir le format le plus juste — individuel, groupe, ou Rebirth.",
  },
  {
    num: "02",
    title: "Pose de l'intention",
    description:
      "En arrivant, vous nommez ce que vous venez explorer. Pas de protocole figé — Céline ajuste à ce qui est là.",
  },
  {
    num: "03",
    title: "Mise en place du champ",
    description:
      "Figurines, symboles, ou imaginaire actif selon ce qui se présente. Le système familial devient lisible.",
  },
  {
    num: "04",
    title: "Lecture sensible",
    description:
      "Céline laisse émerger ce qui demande à être vu. Mouvements, paroles, gestes qui dénouent — ou simple présence si c'est ce qui est juste.",
  },
  {
    num: "05",
    title: "Clôture & intégration",
    description:
      "Un temps de ressenti et de mots pour ancrer ce qui s'est levé. Souvent, l'intégration continue les jours et semaines qui suivent.",
  },
];

const faq = [
  {
    q: "Faut-il connaître son arbre généalogique en détail ?",
    a: "Non. Le champ travaille avec ce qui est juste — y compris ce que vous ne savez pas consciemment. Souvent, ce qui se présente n'a pas besoin d'être nommé.",
  },
  {
    q: "Est-ce une thérapie ?",
    a: "Non. C'est une démarche symbolique et systémique de bien-être. Elle ne remplace pas un suivi psychologique ou médical lorsque celui-ci est nécessaire.",
  },
  {
    q: "Combien de séances faut-il ?",
    a: "Une seule séance peut suffire pour un nœud précis. D'autres situations demandent un cheminement plus long — souvent une constellation initiale puis un soin de décantation, et parfois un Rebirth pour boucler le cycle.",
  },
  {
    q: "Différence entre constellation familiale et Rebirth ?",
    a: "La constellation familiale travaille les liens systémiques (parents, ascendants, transmissions). La constellation de naissance Rebirth explore spécifiquement les empreintes posées au moment de votre venue au monde.",
  },
  {
    q: "Et si rien ne se passe pendant la séance ?",
    a: "Aucun travail symbolique ne garantit un résultat visible immédiat. Beaucoup de ressentis émergent dans les semaines qui suivent, ou par des situations qui cessent simplement de se reproduire.",
  },
  {
    q: "Le travail se fait-il en présentiel ?",
    a: "Oui. Les constellations se déroulent au cabinet du Taillan-Médoc, ou à Univers'elles à Martignas-sur-Jalle pour les sessions en groupe.",
  },
];

export default function MemoiresPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Axe 1 · Mémoires & constellations"
        title={
          <>
            Libérer les{" "}
            <span className="font-display-italic text-gold-gradient">mémoires</span>{" "}
            qui ne vous appartiennent plus.
          </>
        }
        description="Constellations familiales, travail transgénérationnel, mémoires portées. Mettre en lumière les loyautés et les dynamiques invisibles qui traversent votre histoire — pour retrouver une place plus juste. Pas de promesse de guérison, mais un cadre où ce qui pèse depuis longtemps peut enfin être vu."
      />

      <section className="bg-bg-deep text-text-on-dark py-10 border-y border-white/10 relative overflow-hidden">
        <SacredBackdrop variant="feminin" intensity="soft" />
        <Container className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "95 €", label: "constellation · 1h30 à 2h" },
              { value: "1+1+1", label: "individuel · groupe · Rebirth" },
              { value: "100 %", label: "confidentialité du cercle" },
              { value: "0", label: "promesse de guérison médicale" },
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
        <SacredBackdrop variant="feminin" />
        <WhisperLine text={whisperLines[0]} position="left" tone="amethyst" />
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-28">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Eye className="h-3.5 w-3.5" />
                  Ce que vous portez
                </span>
                <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-text-deep">
                  Quand l'invisible{" "}
                  <span className="font-display-italic text-gold-deep">travaille</span>{" "}
                  en silence.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Certaines histoires, loyautés ou blocages semblent nous traverser sans nous appartenir totalement. Avant le travail systémique, c'est souvent le ressenti d'une répétition ou d'un poids qui appelle.
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

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5" />
                Comment Céline travaille
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Les outils mobilisés au service de cet axe.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Aucune pratique n'est une fin en soi. Selon votre demande, votre rythme et ce qui se présente, Céline mobilise un ou plusieurs de ces outils — la constellation reste le cœur, les autres viennent en soutien.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <article className="rounded-3xl border border-border-soft bg-bg-card p-6 md:p-7 h-full flex flex-col">
                  <h3 className="font-display text-xl text-text-deep leading-tight mb-2">
                    {t.name}
                  </h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1 mb-4">
                    {t.description}
                  </p>
                  <div className="pt-4 border-t border-border-soft flex items-center justify-between">
                    <span className="text-sm text-gold-deep font-medium">{t.price}</span>
                    <Link
                      href={t.href}
                      className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-deep group"
                    >
                      En savoir plus
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-4">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                  <Compass className="h-3.5 w-3.5" />
                  Comment ça se passe
                </span>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Le déroulé d'une constellation.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Indicatif — chaque séance est ajustée à votre intention et à ce qui demande à émerger. Aucun protocole figé.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="space-y-px border-y border-border-soft">
                {deroule.map((step) => (
                  <Reveal key={step.num}>
                    <li className="flex items-baseline gap-4 py-5 md:py-6 border-b border-border-soft last:border-b-0">
                      <span className="font-display-italic text-[0.85rem] tabular-nums text-gold-deep shrink-0">
                        {step.num}
                      </span>
                      <div>
                        <p className="font-display text-xl text-text-deep leading-snug">
                          {step.title}
                        </p>
                        <p className="text-sm text-text-medium leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-6 text-xs text-text-soft italic">
                Aucune promesse de résolution garantie. Le travail constellation ouvre un espace — ce qui s'en dégage demande parfois du temps pour s'ancrer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="feminin" intensity="medium" />
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Quote className="h-8 w-8 text-gold mx-auto" />
              <p className="font-display-italic text-2xl md:text-4xl leading-[1.2] text-text-on-dark">
                « {temoignages[1].quote} »
              </p>
              <p className="text-gold-soft font-display-italic">— {temoignages[1].name}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de réserver une constellation.
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

      <section className="section">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Users className="h-3.5 w-3.5" />
                  <span>Premier pas</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Demander un{" "}
                  <span className="font-display-italic text-gold-deep">échange préalable</span>.
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Aucune constellation ne se fait sans un premier échange. Céline vous appelle pour comprendre votre intention et vous proposer le format le plus juste.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact?sujet=Constellations" className="btn-primary w-full justify-center">
                  Demander un échange
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton message={whatsappMessages.constellations} className="w-full justify-center">
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

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link
                href="/feminin-cacao"
                className="group rounded-2xl border border-border-soft bg-bg-card p-6 hover:border-gold-soft transition-colors"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep mb-2">Axe 2</p>
                <p className="font-display text-xl text-text-deep">Féminin & cacao</p>
                <p className="text-sm text-text-medium mt-2 leading-relaxed">
                  Revenir au corps, au cœur et au féminin.
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
              <span>{disclaimers.bienEtre}</span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
