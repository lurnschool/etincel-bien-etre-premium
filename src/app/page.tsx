import { CinematicHeroSlider } from "@/components/home/CinematicHeroSlider";
import { EditorialIntro } from "@/components/home/EditorialIntro";
import { GuidanceCompass } from "@/components/home/GuidanceCompass";
import { MeetCeline } from "@/components/home/MeetCeline";
import { WhatToDeposit } from "@/components/home/WhatToDeposit";
import { PracticesScroll } from "@/components/home/PracticesScroll";
import { QuoteScene } from "@/components/home/QuoteScene";
import { Temoignages } from "@/components/home/Temoignages";
import { GiftCardStudioTeaser } from "@/components/home/GiftCardStudioTeaser";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { ContactRapide } from "@/components/home/ContactRapide";

export default function HomePage() {
  return (
    <>
      {/* 1. Slider hero pleine largeur avec photos réelles */}
      <CinematicHeroSlider />

      {/* 2. Citation + portrait — entrée narrative */}
      <EditorialIntro />

      {/* 3. Boussole intérieure — choisir une intention */}
      <GuidanceCompass />

      {/* 4. Rencontrer Céline — portrait + récit */}
      <MeetCeline />

      {/* 5. Ce que vous pouvez venir déposer */}
      <WhatToDeposit />

      {/* 6. Galerie horizontale des pratiques */}
      <PracticesScroll />

      {/* 5. Scène féminin sacré pleine largeur avec parallax */}
      <QuoteScene
        image="/images/celine/approche-philosophie.jpg"
        alt="Céline avec son tambour chamanique au lever du soleil"
        eyebrow="Féminin sacré · Énergie d'Isis"
        quote="Le féminin n'est pas un concept. C'est une présence à retrouver."
        body="Cercles, rituels symboliques, médecine du cacao, accompagnement individuel — un espace pour habiter à nouveau son corps, ses cycles et son intuition."
        cta={{ label: "Explorer le féminin sacré", href: "/feminin-sacre" }}
      />

      {/* 6. Scène cacao */}
      <QuoteScene
        image="/images/celine/portrait-celine.png"
        alt="Cérémonie cacao"
        eyebrow="Cacao sacré · Cérémonie du cœur"
        quote="Le cacao invite à ralentir, écouter, ressentir."
        body="Une expérience sensorielle et symbolique pour ouvrir le cœur en présence — en individuel, en cercle, en retraite."
        cta={{ label: "Découvrir les rituels cacao", href: "/cacao" }}
      />

      {/* 7. Scène retraites — bande immersive */}
      <QuoteScene
        image="/images/celine/approche-philosophie.jpg"
        alt="Retraite immersive"
        eyebrow="Retraites immersives"
        quote="Une retraite n'est pas une fuite. C'est un retour."
        body="Quelques jours pour ralentir, respirer, partager — souffle, innerdance, cercles, cacao, féminin sacré, nature."
        cta={{ label: "Rejoindre la liste d'intérêt", href: "/retraites#interet" }}
      />

      {/* 8. Témoignages — version magazine */}
      <Temoignages />

      {/* 9. Diagnostic teaser */}
      <DiagnosticTeaser />

      {/* 10. Carte cadeau — teaser élégant */}
      <GiftCardStudioTeaser />

      {/* 11. Lead magnet */}
      <LeadMagnet />

      {/* 11. Contact rapide */}
      <ContactRapide />
    </>
  );
}
