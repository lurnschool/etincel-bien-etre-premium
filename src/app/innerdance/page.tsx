import Link from "next/link";
import type { Metadata } from "next";
import { Music, User, Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { disclaimers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Innerdance",
  description:
    "Une immersion intérieure mêlant musique, présence et corps pour écouter ce qui cherche à émerger.",
};

const cles = [
  "Expérience corporelle",
  "Musique immersive",
  "État de présence",
  "Lâcher-prise",
  "Exploration intérieure",
  "Ressentis sensibles",
];

const pourQui = [
  "Personnes en transition de vie",
  "Besoin de ralentir, de s'écouter",
  "Envie de reconnexion sans mots",
  "Curiosité d'explorer autrement",
];

const ceQueCeNestPas = [
  "Ce n'est pas un acte médical.",
  "Ce n'est pas une thérapie conventionnelle.",
  "Ce n'est pas une promesse de résultat.",
];

export default function InnerdancePage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Pratique sensible"
        title={
          <>
            Innerdance —{" "}
            <span className="font-display-italic text-gold-gradient">
              écouter ce qui émerge
            </span>
          </>
        }
        description="Une immersion intérieure pour écouter ce qui cherche à émerger, à travers la musique, le corps et la présence."
      />

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] items-start">
            <Reveal>
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Ce qui se vit pendant une séance
                  </h2>
                  <p className="text-text-medium leading-relaxed">
                    L'innerdance se vit allongé, dans un espace tenu, soutenu par une musique soigneusement choisie. Pas de chorégraphie, pas de mots à trouver : l'invitation est de se laisser traverser par ce qui se présente, à son propre rythme.
                  </p>
                  <ul className="grid grid-cols-2 gap-3 pt-2">
                    {cles.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-text-medium">
                        <span className="text-gold"><Etincelle size={10} /></span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="individuel" className="rounded-3xl border border-border-soft bg-bg-card p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <User className="h-3.5 w-3.5" />
                    <span>Format individuel</span>
                  </div>
                  <h3 className="font-display text-2xl text-text-deep">
                    Une séance dédiée à votre intériorité
                  </h3>
                  <p className="text-text-medium leading-relaxed">
                    Une bulle de temps protégée, à deux, pour explorer ce qui demande à émerger. Céline ajuste la musique, l'intensité et le rythme à ce que vous traversez.
                  </p>
                  <Link href="/contact?sujet=Innerdance individuel" className="btn-primary self-start">
                    Découvrir une séance
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div id="collectif" className="rounded-3xl border border-border-soft bg-bg-deep text-text-on-dark p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                      <Users className="h-3.5 w-3.5" />
                      <span>Format collectif</span>
                    </div>
                    <h3 className="font-display text-2xl text-text-on-dark mt-2">
                      Une expérience partagée
                    </h3>
                    <p className="text-text-on-dark-soft leading-relaxed mt-3">
                      Un groupe restreint, un même fil sonore, des présences qui se tiennent. La force du collectif amplifie ce qui se passe à l'intérieur de chacun.
                    </p>
                    <Link href="/contact?sujet=Innerdance collectif" className="btn-gold mt-4">
                      Être informée du prochain collectif
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="sticky top-32 space-y-5">
                <div className="rounded-3xl border border-border-soft bg-bg-card p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold mb-1">
                    <Music className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.24em] text-gold-deep">Pour qui ?</span>
                  </div>
                  <ul className="space-y-2 text-sm text-text-medium">
                    {pourQui.map((q) => (
                      <li key={q} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-border-soft bg-bg-soft p-6 space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Ce que ce n'est pas</p>
                  <ul className="space-y-2 text-sm text-text-medium">
                    {ceQueCeNestPas.map((q) => (
                      <li key={q} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-text-soft shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[0.7rem] text-text-soft leading-relaxed px-2">
                  {disclaimers.bienEtre}
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
