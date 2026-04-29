import { Hero } from "@/components/home/Hero";
import { Portes } from "@/components/home/Portes";
import { AccompagnementsHome } from "@/components/home/AccompagnementsHome";
import { CollectifHome } from "@/components/home/CollectifHome";
import { FemininSacreHome } from "@/components/home/FemininSacreHome";
import { CerclesEtRetraites } from "@/components/home/CerclesEtRetraites";
import { Temoignages } from "@/components/home/Temoignages";
import { CartesCadeaux } from "@/components/home/CartesCadeaux";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { DiagnosticTeaser } from "@/components/home/DiagnosticTeaser";
import { ContactRapide } from "@/components/home/ContactRapide";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portes />
      <AccompagnementsHome />
      <CollectifHome />
      <FemininSacreHome />
      <CerclesEtRetraites />
      <Temoignages />
      <DiagnosticTeaser />
      <CartesCadeaux />
      <LeadMagnet />
      <ContactRapide />
    </>
  );
}
