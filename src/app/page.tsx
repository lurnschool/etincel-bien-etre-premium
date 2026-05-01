import { HeroRefuge } from "@/components/home/HeroRefuge";
import { BienvenueEspace } from "@/components/home/BienvenueEspace";
import { CeQueVousVenezDeposer } from "@/components/home/CeQueVousVenezDeposer";
import { LesCheminsQuiSouvrent } from "@/components/home/LesCheminsQuiSouvrent";
import { LesOutilsQueJeMobilise } from "@/components/home/LesOutilsQueJeMobilise";
import { FragmentsDunivers } from "@/components/home/FragmentsDunivers";
import { OffrirUnMoment } from "@/components/home/OffrirUnMoment";
import { CerclesEtRetraites } from "@/components/home/CerclesEtRetraites";
import { GuidanceTeaser } from "@/components/home/GuidanceTeaser";
import { RetoursDexperience } from "@/components/home/RetoursDexperience";
import { EcrivezMoi } from "@/components/home/EcrivezMoi";

/**
 * HOME — Sprint A "refuge connecté".
 *
 * Phrase directrice (à respecter pour tout ajout futur) :
 * "Le site doit être un refuge qui sait guider, pas une vitrine qui
 *  expose, ni un tunnel qui force."
 *
 * Structure 11 sections :
 *  1. HeroRefuge          — photo Céline + phrase d'accueil + 2 CTA doux
 *  2. BienvenueEspace     — texte en "je", ton humain, sans jargon
 *  3. CeQueVousVenezDeposer — prose, pas de grille numérotée
 *  4. LesCheminsQuiSouvrent — 3 récits courts, sans "Axe 1/2/3"
 *  5. LesOutilsQueJeMobilise — mention en prose + ligne de liens texte
 *  6. MonUnivers          — SoftCarousel 6 fragments du refuge
 *  7. OffrirUnMoment      — carte cadeau adoucie, CTA Stripe-ready
 *  8. CerclesEtRetraites  — 3 cartes douces (cercles, cacao, retraites)
 *  9. GuidanceTeaser      — "Pas sûre par où commencer ?" (orientation douce)
 * 10. RetoursDexperience  — 3 témoignages réels en cartes-souvenirs
 * 11. EcrivezMoi          — formulaire Resend + WhatsApp + coordonnées
 *
 * Conversion conservée — chaque section a au moins une porte de sortie
 * (lien vers axe, demande de contact, carte cadeau, liste d'intérêt).
 * IA flottante "Besoin d'être guidée ?" + WhatsApp flottant rendus dans
 * le layout global, présents partout.
 */
export default function HomePage() {
  return (
    <>
      <HeroRefuge />
      <BienvenueEspace />
      <CeQueVousVenezDeposer />
      <LesCheminsQuiSouvrent />
      <LesOutilsQueJeMobilise />
      <FragmentsDunivers />
      <OffrirUnMoment />
      <CerclesEtRetraites />
      <GuidanceTeaser />
      <RetoursDexperience />
      <EcrivezMoi />
    </>
  );
}
