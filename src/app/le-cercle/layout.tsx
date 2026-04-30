import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Cercle Etincel — Studio en ligne & communauté",
  description:
    "L'abonnement Studio de Céline Dusseval — méditations guidées, cercles live mensuels en visio, communauté privée. 29 €/mois ou 290 €/an. Inclus dans les parcours 3 mois.",
};

export default function CercleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
