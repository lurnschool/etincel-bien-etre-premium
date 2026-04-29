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
import { whisperLines, disclaimers } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <CinematicHeroSlider />

      <GuidanceCompass />

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
          "Cercles de femmes, breathwork, innerdance, constellations et ateliers : la force du groupe pour traverser, partager et avancer.",
          "Chaque format est une expérience à part entière — pas une variante d'une séance individuelle.",
        ]}
        keywords={[
          "Cercles de femmes",
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
