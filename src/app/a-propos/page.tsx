import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { cta } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos de Céline Dusseval",
  description:
    "Praticienne holistique en Gironde, Céline accompagne avec écoute, douceur et respect du rythme de chacun.",
};

const postures = [
  { title: "Écoute", description: "Un espace où chaque mot, chaque silence a sa place." },
  { title: "Douceur", description: "Une présence rassurante qui ne précipite jamais le mouvement." },
  { title: "Intuition", description: "Une lecture sensible de ce qui demande à émerger." },
  { title: "Cadre", description: "Une posture professionnelle, claire, confidentielle." },
  { title: "Respect du rythme", description: "Le vôtre — pas celui d'un protocole." },
  { title: "Non-jugement", description: "Tout ce qui est partagé est accueilli." },
];

const venuechercher = [
  "Apaiser une fatigue émotionnelle",
  "Comprendre un schéma qui se répète",
  "Traverser une transition de vie",
  "Revenir au corps après une période difficile",
  "Explorer son féminin",
  "Vivre une expérience collective profonde",
  "Se former à la numérologie",
  "Rallumer une étincelle intérieure",
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={
          <>
            Céline Dusseval,{" "}
            <span className="font-display-italic text-gold-deep">accompagnatrice</span>{" "}
            bien-être
          </>
        }
        description="Une praticienne holistique en Gironde qui accueille des personnes en quête de sens, de réconciliation, de transformation."
      />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] items-start">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-rose-soft via-gold-soft to-accent-soft sticky top-32">
                <div className="absolute inset-0 grain pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-text-deep/80 px-8 space-y-3">
                  <div>
                    <p className="font-display-italic text-2xl">Photo de Céline</p>
                    <p className="text-xs uppercase tracking-[0.24em] mt-2 opacity-70">Visuel à intégrer</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Mon histoire</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Trouver l'endroit en soi où tout est possible.
                  </h2>
                  <div className="space-y-4 text-text-medium leading-relaxed">
                    <p>
                      Mon chemin m'a conduite vers les pratiques qui invitent à se déposer, à écouter, à transformer ce qui demande à l'être. Numérologie, hypnose, pratiques énergétiques, breathwork, constellations : autant de portes pour rencontrer ce qui se vit dans le silence du corps.
                    </p>
                    <p>
                      <em>Cette section sera enrichie avec le récit personnel de Céline (à valider).</em>
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Ma posture</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Une présence qui ne précipite rien.
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {postures.map((p) => (
                      <div key={p.title} className="rounded-2xl border border-border-soft bg-bg-card p-5">
                        <p className="font-display text-lg text-text-deep mb-1">{p.title}</p>
                        <p className="text-sm text-text-medium leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Ce que les personnes viennent chercher</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Les raisons qui mènent ici.
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {venuechercher.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-text-medium">
                        <span className="mt-2 text-gold">
                          <Etincelle size={10} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border-soft">
                  <Link href={cta.primary.href} className="btn-primary">
                    {cta.primary.label}
                  </Link>
                  <Link href={cta.secondary.href} className="btn-secondary">
                    {cta.secondary.label}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
