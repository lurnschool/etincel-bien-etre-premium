import { CinematicHeroSlider } from "@/components/home/CinematicHeroSlider";
import { CorePillars } from "@/components/home/CorePillars";
import { ComplementaryPracticesExplorer } from "@/components/home/ComplementaryPracticesExplorer";
import { MeetCeline } from "@/components/home/MeetCeline";
import { WhatToDeposit } from "@/components/home/WhatToDeposit";
import { QuoteScene } from "@/components/home/QuoteScene";
import { Temoignages } from "@/components/home/Temoignages";
import { GiftCardStudioTeaser } from "@/components/home/GiftCardStudioTeaser";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { ContactRapide } from "@/components/home/ContactRapide";

export default function HomePage() {
  return (
    <>
      {/* 1. Slider hero pleine largeur — orienté business sur 3 piliers */}
      <CinematicHeroSlider />

      {/* 2. Rencontrer Céline — espace personnel fort */}
      <MeetCeline />

      {/* 3. Les 3 piliers — Cacao, Constellations, Numérologie */}
      <CorePillars />

      {/* 4. Pratiques complémentaires — explorer par intention */}
      <ComplementaryPracticesExplorer />

      {/* 5. Ce que vous pouvez venir déposer */}
      <WhatToDeposit />

      {/* 6. Scène féminin sacré pleine largeur avec parallax */}
      <QuoteScene
        image="/images/celine/approche-philosophie.jpg"
        alt="Céline avec son tambour chamanique"
        eyebrow="Féminin sacré · Énergie d'Isis"
        quote="Le féminin n'est pas un concept. C'est une présence à retrouver."
        body="Cercles, rituels symboliques, médecine du cacao, accompagnement individuel — un espace pour habiter à nouveau son corps, ses cycles et son intuition."
        cta={{ label: "Explorer le féminin sacré", href: "/feminin-sacre" }}
      />

      {/* 7. Scène retraites — bande immersive */}
      <QuoteScene
        image="/images/celine/portrait-celine.png"
        alt="Retraite immersive"
        eyebrow="Retraites immersives"
        quote="Une retraite n'est pas une fuite. C'est un retour."
        body="Quelques jours pour ralentir, respirer, partager — souffle, innerdance, cercles, cacao, féminin sacré, nature."
        cta={{ label: "Rejoindre la liste d'intérêt", href: "/retraites#interet" }}
      />

      {/* 8. Témoignages style avis premium */}
      <Temoignages />

      {/* 9. Diagnostic teaser */}
      <DiagnosticTeaser />

      {/* 10. Carte cadeau — teaser */}
      <GiftCardStudioTeaser />

      {/* 11. Lead magnet */}
      <LeadMagnet />

      {/* 12. Contact rapide */}
      <ContactRapide />
    </>
  );
}
