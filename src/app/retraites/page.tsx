import Link from "next/link";
import type { Metadata } from "next";
import { Mountain, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";

export const metadata: Metadata = {
  title: "Retraites",
  description:
    "Une parenthèse pour ralentir, respirer, se reconnecter et revenir à l'essentiel. Souffle, innerdance, cercles, féminin sacré, nature.",
};

const pratiques = [
  "Souffle (breathwork chamanique)",
  "Innerdance",
  "Cercles de femmes",
  "Féminin sacré",
  "Rituels symboliques",
  "Pratiques corporelles",
  "Méditations",
  "Repos et nature",
];

const pourQui = [
  "Personnes en transition de vie",
  "Besoin de ralentir, de se déposer",
  "Envie de vivre une expérience profonde",
  "Femmes en quête d'un espace pour leur féminin",
  "Personnes prêtes à explorer en groupe",
];

const faq = [
  {
    q: "Faut-il un niveau particulier ?",
    a: "Non. Les retraites sont ouvertes aux personnes débutantes comme expérimentées. Céline ajuste les pratiques au groupe.",
  },
  {
    q: "Comment se passe l'hébergement ?",
    a: "Les modalités d'hébergement et de repas seront précisées au moment de chaque retraite, selon le lieu retenu.",
  },
  {
    q: "Existe-t-il des contre-indications ?",
    a: "Certaines pratiques (breathwork notamment) demandent un échange préalable. Cardiaques, respiratoires, psychiatriques ou grossesse : un point individuel est systématique avant l'inscription.",
  },
  {
    q: "Tout ce qui se vit reste-t-il confidentiel ?",
    a: "Oui. La confidentialité du groupe est un cadre fondamental. Ce qui est partagé reste à l'intérieur du cercle.",
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
              revenir à l'essentiel
            </span>
          </>
        }
        description="Des retraites pensées comme un temps long pour ralentir, respirer, partager et se réinhabiter pleinement."
      />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] items-start">
            <Reveal>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Pour qui ?</span>
                  </div>
                  <ul className="space-y-2">
                    {pourQui.map((item) => (
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
                    <span>Ce que l'on vient vivre</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {pratiques.map((p) => (
                      <div key={p} className="rounded-2xl border border-border-soft bg-bg-card p-4 text-sm text-text-medium flex items-center gap-3">
                        <span className="text-gold"><Etincelle size={10} /></span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border-soft bg-bg-deep text-text-on-dark p-8 space-y-3 relative overflow-hidden">
                  <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                      <Mountain className="h-3.5 w-3.5" />
                      <span>Prochaine retraite</span>
                    </div>
                    <p className="font-display text-3xl text-text-on-dark mt-3">
                      Dates à venir
                    </p>
                    <p className="text-text-on-dark-soft leading-relaxed mt-2">
                      Le format, le lieu, la durée et le programme seront communiqués dès que la prochaine immersion sera ouverte aux inscriptions.
                    </p>
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
              <aside id="interet" className="sticky top-32 rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-7 space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Liste d'intérêt</p>
                <p className="font-display text-2xl leading-snug text-text-deep">
                  Être informée des prochaines retraites
                </p>
                <p className="text-sm text-text-medium">
                  Soyez prévenue dès l'ouverture des inscriptions et de l'annonce du programme.
                </p>
                <Link href="/contact?sujet=Retraite" className="btn-primary w-full">
                  Rejoindre la liste
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact?sujet=Question retraite" className="btn-secondary w-full">
                  Poser une question
                </Link>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
