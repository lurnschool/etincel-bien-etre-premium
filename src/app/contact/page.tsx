import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactRapide } from "@/components/home/ContactRapide";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Échangez avec Céline Dusseval — un message simple, une réponse personnelle sous 48h.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Premier contact"
        title={
          <>
            Échangeons sur{" "}
            <span className="font-display-italic text-gold-deep">votre besoin</span>
          </>
        }
        description="Céline lit chaque message personnellement. Vous recevrez une réponse sous 48h."
      />
      <ContactRapide />
    </>
  );
}
