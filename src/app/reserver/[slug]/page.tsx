import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReservationFlow, type ReservationPractice } from "@/components/reserver/ReservationFlow";
import { accompagnementsIndividuels } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";

type Params = Promise<{ slug: string }>;

/**
 * Catalogue de réservation — couvre les pratiques individuelles
 * + les constellations + les formations. Pour le cacao (tarif sur
 * mesure), on redirige vers la page /cacao plutôt que vers ce flow.
 */
const reservablePractices: ReservationPractice[] = [
  ...accompagnementsIndividuels
    .filter((p) => p.slug !== "cacao-rituel" && p.slug !== "feminin-sacre" && p.slug !== "innerdance-individuel")
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      family: p.family,
      duration: p.duration,
      price: p.price,
      format: p.format,
      pitch: p.pitch,
      productId: stripeProductIdFor(p.slug),
      whatsappMessage: whatsappMessages[
        (p.slug === "numerologie" ? "numerologie" : "generic") as keyof typeof whatsappMessages
      ],
      disclaimer: p.disclaimer,
    })),
  {
    slug: "constellation-individuelle",
    name: "Constellation individuelle",
    family: "feminin",
    duration: "1h30 à 2h",
    price: "95 €",
    format: "Présentiel",
    pitch:
      "Un travail à deux avec Céline — figurines, symboles ou imaginaire actif selon ce qui se présente.",
    productId: "constellation-95",
    whatsappMessage: whatsappMessages.constellations,
  },
  {
    slug: "constellation-naissance-rebirth",
    name: "Constellation de naissance · Rebirth",
    family: "feminin",
    duration: "1h30 à 2h",
    price: "95 €",
    format: "Présentiel",
    pitch:
      "Un voyage symbolique au cœur de votre venue au monde et des empreintes qu'elle a laissées.",
    productId: "constellation-95",
    whatsappMessage: whatsappMessages.constellations,
  },
  {
    slug: "formation-numerologie-m1",
    name: "Formation Numérologie · Module 1",
    family: "comprendre",
    duration: "Module complet",
    price: "320 €",
    format: "Présentiel",
    pitch: "Les fondations de la numérologie pour lire les cycles d'une vie.",
    productId: "formation-numerologie-m1-320",
    whatsappMessage: "Bonjour Céline, je souhaite m'inscrire à la formation Numérologie Module 1.",
  },
  {
    slug: "formation-numerologie-m2",
    name: "Formation Numérologie · Module 2",
    family: "comprendre",
    duration: "Module complet",
    price: "320 €",
    format: "Présentiel",
    pitch: "Approfondissement et lecture symbolique avancée des nombres.",
    productId: "formation-numerologie-m2-320",
    whatsappMessage: "Bonjour Céline, je souhaite m'inscrire à la formation Numérologie Module 2.",
  },
];

function stripeProductIdFor(slug: string): string {
  const map: Record<string, string> = {
    numerologie: "numerologie-110",
    hypnose: "hypnose-90",
    cellrelease: "cellrelease-90",
    "massage-energetique": "massage-energetique-90",
    "massage-liberation-reconnexion": "massage-liberation-1h20",
    reflexologie: "reflexologie-90",
    breathwork: "breathwork-individuel-90",
  };
  return map[slug] ?? "numerologie-110";
}

export async function generateStaticParams() {
  return reservablePractices.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const practice = reservablePractices.find((p) => p.slug === slug);
  if (!practice) return { title: "Réserver" };
  return {
    title: `Réserver — ${practice.name}`,
    description: `Réservez une séance de ${practice.name} avec Céline Dusseval — ${practice.price}, paiement Stripe sécurisé. ${practice.pitch}`,
  };
}

export default async function ReserverPage({ params }: { params: Params }) {
  const { slug } = await params;
  const practice = reservablePractices.find((p) => p.slug === slug);
  if (!practice) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`Réservation · ${practice.price}`}
        title={
          <>
            Réserver{" "}
            <span className="font-display-italic text-gold-deep">
              {practice.name.toLowerCase()}
            </span>
          </>
        }
        description={`Trois étapes simples : créneau · coordonnées · paiement Stripe sécurisé. Céline vous appelle dans les 24h pour valider la date.`}
      />

      <section className="pb-24 pt-4">
        <ReservationFlow practice={practice} />
      </section>
    </>
  );
}
