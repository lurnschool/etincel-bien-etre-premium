import { CinematicHeroSlider } from "@/components/home/CinematicHeroSlider";
import { CorePathwaysShowcase } from "@/components/home/CorePathwaysShowcase";
import { WhatToDeposit } from "@/components/home/WhatToDeposit";
import { MeetCeline } from "@/components/home/MeetCeline";
import { ToolsMobilized } from "@/components/home/ToolsMobilized";
import { QuoteScene } from "@/components/home/QuoteScene";
import { Temoignages } from "@/components/home/Temoignages";
import { GiftCardStudioTeaser } from "@/components/home/GiftCardStudioTeaser";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { ContactRapide } from "@/components/home/ContactRapide";

/**
 * Home Etincel — refondue autour des 3 axes (Mémoires & constellations,
 * Féminin & cacao, Corps & intégration). Ordre stratégique :
 *
 * 1. Hero cinématographique avec Céline en premier
 * 2. Trois chemins pour revenir à soi (3 axes)
 * 3. Ce que vous venez déposer (signaux émotionnels)
 * 4. Rencontrer Céline (posture, pas catalogue)
 * 5. Les outils qu'elle peut mobiliser (présentés comme moyens)
 * 6. Retraites / immersions (parallax)
 * 7. Bilan d'orientation
 * 8. Avis & retours d'expérience (témoignages réels)
 * 9. Cartes cadeaux
 * 10. Contact / WhatsApp / réseaux
 */
export default function HomePage() {
  return (
    <>
      <CinematicHeroSlider />

      <CorePathwaysShowcase />

      <WhatToDeposit />

      <MeetCeline />

      <ToolsMobilized />

      <QuoteScene
        image="/images/celine/portrait-celine.png"
        alt="Retraite immersive"
        eyebrow="Retraites · immersions"
        quote="Une retraite n'est pas une fuite. C'est un retour."
        body="Quelques jours pour ralentir, respirer, partager — souffle, innerdance, cercles, cacao, féminin sacré, nature. 6 à 12 personnes maximum, séance individuelle intégrée, écrins choisis."
        cta={{ label: "Découvrir les retraites", href: "/retraites" }}
      />

      <DiagnosticTeaser />

      <Temoignages />

      <GiftCardStudioTeaser />

      <ContactRapide />
    </>
  );
}
