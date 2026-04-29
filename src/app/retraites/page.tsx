import Link from "next/link";
import type { Metadata } from "next";
import { Mountain, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { whisperLines } from "@/lib/data";
import { pageVisuals } from "@/lib/visualAssetMap";

export const metadata: Metadata = {
  title: "Retraites",
  description:
    "Une parenthèse pour ralentir, respirer, se reconnecter et revenir à l'essentiel. Souffle, innerdance, cercles, féminin sacré, cacao, nature.",
};

const aDeposer = [
  "Le rythme rapide qui ne vous appartient plus",
  "Les schémas répétitifs qui demandent à être vus",
  "Les charges émotionnelles silencieuses",
  "Les attentes envers soi-même",
  "Les rôles que l'on n'a pas choisis",
];

const aVivre = [
  "Le silence comme matière première",
  "Le partage en cercle confidentiel",
  "Le souffle comme passage",
  "La nature comme miroir",
  "La sensation retrouvée du présent",
  "La sororité (sur les retraites féminines)",
];

const pratiquesPossibles = [
  { title: "Breathwork", description: "Le souffle comme cérémonie." },
  { title: "Innerdance", description: "Une immersion sensorielle profonde." },
  { title: "Cercle de femmes", description: "Un espace de parole et de présence." },
  { title: "Cérémonie cacao", description: "Le cœur comme territoire de retour." },
  { title: "Féminin sacré", description: "La symbolique du corps et des cycles." },
  { title: "Rituels symboliques", description: "Des passages marqués par le geste." },
  { title: "Pratiques corporelles", description: "Mouvement doux, écoute du corps." },
  { title: "Repos & nature", description: "La forêt, l'océan, le désert — selon le lieu." },
];

const faq = [
  {
    q: "Faut-il un niveau particulier ?",
    a: "Non. Les retraites sont ouvertes aux personnes débutantes comme expérimentées. Céline ajuste les pratiques au groupe et à votre rythme.",
  },
  {
    q: "Comment se passe l'hébergement et les repas ?",
    a: "Les modalités sont précisées au moment de chaque retraite, selon le lieu retenu. L'alimentation est généralement végétarienne pour favoriser un état d'écoute du corps.",
  },
  {
    q: "Existe-t-il des contre-indications ?",
    a: "Certaines pratiques (breathwork, cacao notamment) demandent un échange préalable. Cardiaques, respiratoires, psychiatriques ou grossesse : un point individuel est systématique avant l'inscription.",
  },
  {
    q: "Tout ce qui se vit reste-t-il confidentiel ?",
    a: "Oui. La confidentialité du groupe est un cadre fondamental. Ce qui est partagé reste à l'intérieur du cercle.",
  },
  {
    q: "Comment se passe l'inscription ?",
    a: "Après votre demande, Céline vous propose un échange préalable. Aucune retraite n'est ouverte sans ce premier contact.",
  },
  {
    q: "Puis-je venir seule ?",
    a: "La majorité des participantes viennent seules. Le cadre est pensé pour que chacune se sente accueillie dès l'arrivée.",
  },
  {
    q: "Quel est le format type ?",
    a: "Cela dépend de la retraite : journée, week-end ou plusieurs jours. Le format précis est annoncé dès qu'une nouvelle date est confirmée.",
  },
];

export default function RetraitesPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Immersions premium"
        title={
          <>
            Une parenthèse pour{" "}
            <span className="font-display-italic text-gold-gradient">
              revenir à l&apos;essentiel
            </span>
          </>
        }
        description="Des retraites pensées comme un temps long pour ralentir, respirer, partager et se réinhabiter pleinement."
      />

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="retraite" />
        <WhisperLine text={whisperLines[17]} position="left" tone="gold" />
        <Container>
          <ImageMosaic
            items={pageVisuals.retraites.slice(1, 4)}
            layout="trio"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-text-soft text-center">
              Visuels représentatifs — à compléter avec photos des prochaines retraites
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative section">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Etincelle size={12} />
                  <span>Ce que l&apos;on vient déposer</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Faire de la place — vraiment.
                </h2>
                <ul className="space-y-2.5">
                  {aDeposer.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-medium leading-relaxed"
                    >
                      <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Etincelle size={12} />
                  <span>Ce que l&apos;on vient vivre</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Une présence longue, partagée, incarnée.
                </h2>
                <ul className="space-y-2.5">
                  {aVivre.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-medium leading-relaxed"
                    >
                      <span className="mt-2 text-gold">
                        <Etincelle size={9} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative section bg-bg-soft overflow-hidden">
        <SacredBackdrop variant="retraite" />
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Les pratiques possibles</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Un langage de pratiques, ajusté au groupe.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Aucun protocole figé. Selon la retraite, les pratiques se composent comme une partition sensible.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pratiquesPossibles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <article className="rounded-2xl border border-border-soft bg-bg-card p-5 h-full">
                  <p className="font-display text-lg text-text-deep mb-1.5">
                    {p.title}
                  </p>
                  <p className="text-sm text-text-medium leading-relaxed">
                    {p.description}
                  </p>
                </article>
              </Reveal>
            ))}
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
                  <Mountain className="h-3.5 w-3.5" />
                  <span>Prochaine retraite</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl leading-tight text-text-on-dark">
                  Dates à venir.
                </h2>
                <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg max-w-xl">
                  Le format, le lieu, la durée et le programme seront communiqués dès que la prochaine immersion sera ouverte aux inscriptions. Les places sont limitées et un échange préalable est systématique.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-gold-soft/40 bg-white/5 backdrop-blur-sm p-7 md:p-8 space-y-5">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-soft">
                  Liste d&apos;intérêt
                </p>
                <p className="font-display text-2xl leading-snug text-text-on-dark">
                  Être informée des prochaines retraites
                </p>
                <p className="text-sm text-text-on-dark-soft leading-relaxed">
                  Soyez prévenue dès l&apos;ouverture des inscriptions et de l&apos;annonce du programme.
                </p>
                <div className="space-y-3 pt-2">
                  <Link
                    href="/contact?sujet=Retraite"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors"
                  >
                    Rejoindre la liste
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?sujet=Question retraite"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
                  >
                    Poser une question
                  </Link>
                </div>
              </div>
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
