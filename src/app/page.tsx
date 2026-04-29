import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicHeroSlider } from "@/components/home/CinematicHeroSlider";
import { GuidanceCompass } from "@/components/home/GuidanceCompass";
import { PracticeAtlas } from "@/components/home/PracticeAtlas";
import { EditorialRibbon } from "@/components/home/EditorialRibbon";
import { RetreatImmersionBand } from "@/components/home/RetreatImmersionBand";
import { GiftCardStudioTeaser } from "@/components/home/GiftCardStudioTeaser";
import { Temoignages } from "@/components/home/Temoignages";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { ContactRapide } from "@/components/home/ContactRapide";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { Etincelle } from "@/components/ui/Etincelle";
import { whisperLines, disclaimers } from "@/lib/data";
import { pageVisuals } from "@/lib/visualAssetMap";

export default function HomePage() {
  return (
    <>
      <CinematicHeroSlider />

      <GuidanceCompass />

      {/* Mosaïque éditoriale — incarnation visuelle de l'univers */}
      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="subtle" />
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>L'univers d'Etincel</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Une présence, des rituels, une matière sensible.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Tambour chamanique, cacao cérémoniel, féminin sacré : Céline tisse une pratique vivante autour du corps, du souffle et du symbolique.
              </p>
            </div>
          </Reveal>
          <ImageMosaic items={pageVisuals.home} layout="trio" />
          <Reveal delay={0.2}>
            <p className="mt-8 text-xs uppercase tracking-[0.24em] text-text-soft text-center">
              Visuels à compléter avec photos Céline / extraits Instagram (avec validation)
            </p>
          </Reveal>
        </Container>
      </section>

      <PracticeAtlas />

      <EditorialRibbon
        id="feminin"
        variant="feminin"
        eyebrow="Féminin sacré"
        title={
          <>
            Revenir au corps, à l&apos;intuition et à l&apos;
            <span className="font-display-italic text-gold-gradient">énergie créatrice</span>.
          </>
        }
        body={[
          "Un accompagnement symbolique et énergétique autour du féminin, de la mémoire du corps, des cycles et de la reconnexion à soi.",
          "L'utérus est ici approché comme un territoire symbolique — celui de l'origine, du créatif, de la transformation. Aucun acte médical, aucune promesse de soin gynécologique.",
        ]}
        keywords={[
          "Reconnexion au corps",
          "Cycles & saisons intérieures",
          "Mémoire émotionnelle",
          "Énergie créatrice",
          "Espace de parole",
          "Rituels symboliques",
          "Cercles de femmes",
          "Médecine symbolique de l'utérus",
        ]}
        primaryCta={{ label: "Explorer le féminin sacré", href: "/feminin-sacre" }}
        secondaryCta={{ label: "Découvrir les cercles", href: "/cercles-de-femmes" }}
        footnote={disclaimers.feminin}
        whisper={{ text: whisperLines[0], position: "left" }}
      />

      {/* Bande Cacao — nouveauté Sprint 1 v3 */}
      <section
        id="cacao"
        className="relative w-full overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#3d2a1f] via-[#2d1f15] to-[#1a120b] text-text-on-dark"
      >
        <SacredBackdrop variant="cacao" intensity="medium" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <Reveal className="lg:col-span-7">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <span className="text-gold">
                    <Etincelle size={12} />
                  </span>
                  <span>Cacao sacré · cérémonie</span>
                </div>
                <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-on-dark">
                  Le cacao comme{" "}
                  <span className="font-display-italic text-gold-gradient">
                    cérémonie du cœur
                  </span>
                  .
                </h2>
                <div className="space-y-4 text-text-on-dark-soft text-base md:text-lg leading-relaxed max-w-xl">
                  <p>
                    Une expérience symbolique et sensorielle pour ralentir, ouvrir le cœur, déposer en présence. En individuel, en cercle de femmes ou intégré à une retraite.
                  </p>
                  <p>
                    Pas un soin médical, pas une promesse de guérison — une pratique de présence, héritée des traditions du cacao cérémoniel, adaptée avec discernement.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Link
                    href="/collectif/cacao"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-deep hover:bg-gold-soft hover:-translate-y-0.5 transition-all duration-400"
                  >
                    Découvrir les rituels cacao
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?sujet=Cacao"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
                  >
                    Être informée du prochain rituel
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-5">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:border-l lg:border-white/10 lg:pl-10">
                {[
                  "Présence",
                  "Ouverture du cœur",
                  "Souffle conscient",
                  "Cercle confidentiel",
                  "Rituel sensoriel",
                  "Lenteur",
                  "Symbolique",
                  "Partage",
                ].map((k, i) => (
                  <li
                    key={k}
                    className="flex items-baseline gap-2 text-text-on-dark-soft"
                    style={{ paddingLeft: `${(i % 2) * 8}px` }}
                  >
                    <span className="text-gold">
                      <Etincelle size={9} />
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <EditorialRibbon
        id="collectif"
        variant="collectif"
        eyebrow="Collectif"
        title={
          <>
            Avancer{" "}
            <span className="font-display-italic text-gold-deep">ensemble</span>{" "}
            autrement.
          </>
        }
        body={[
          "Cercles de femmes, cérémonies cacao, breathwork, innerdance, constellations et ateliers : la force du groupe pour traverser, partager et avancer.",
          "Chaque format est une expérience à part entière — pas une variante d'une séance individuelle.",
        ]}
        keywords={[
          "Cercles de femmes",
          "Cérémonie cacao",
          "Breathwork collectif",
          "Innerdance collectif",
          "Constellations familiales",
          "Constellations de naissance",
          "Ateliers thématiques",
          "Week-ends reconnexion",
        ]}
        primaryCta={{ label: "Découvrir les expériences", href: "/collectif" }}
        secondaryCta={{ label: "Voir les prochaines dates", href: "/evenements" }}
        whisper={{ text: whisperLines[8], position: "right" }}
      />

      <RetreatImmersionBand />

      <GiftCardStudioTeaser />

      <Temoignages />

      <DiagnosticTeaser />

      <LeadMagnet />

      <ContactRapide />
    </>
  );
}
