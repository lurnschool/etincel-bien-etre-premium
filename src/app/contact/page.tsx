import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Heart,
  Users,
  Gift,
  Mountain,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { GoogleReviewsTeaser } from "@/components/home/GoogleReviewsTeaser";
import { EcrivezMoi } from "@/components/home/EcrivezMoi";
import { contact } from "@/lib/data";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { OfferStrip } from "@/components/page/OfferStrip";

export const metadata: Metadata = {
  title: "Écrire à Céline",
  description:
    "Un mot simple, une réponse personnelle de Céline Dusseval. WhatsApp, téléphone, email, et deux lieux d'accueil en Gironde.",
};

const quickLinks = [
  { icon: Sparkles, label: "Rituel cacao", href: "/cacao" },
  { icon: Heart, label: "Lecture numérologique · 110 €", href: "/accompagnements/numerologie" },
  { icon: Users, label: "Constellations · 95 €", href: "/constellations" },
  { icon: Gift, label: "Offrir un moment", href: "/cartes-cadeaux" },
  { icon: Mountain, label: "Retraites & immersions", href: "/retraites" },
];

/**
 * Page /contact — Sprint A "refuge connecté".
 *
 * Sortie du PageHeader dramatique + duplication des cartes de contact
 * (l'ancienne version dupliquait coordonnées + formulaire). Ici :
 *  - PageHeader doux (SEO + entrée éditoriale).
 *  - Bloc "Pas sûre par où commencer ?" non agressif.
 *  - Liens rapides utiles + réseaux sociaux.
 *  - GoogleReviewsTeaser (honnête tant que l'URL Google n'est pas posée).
 *  - EcrivezMoi en bas — formulaire Resend + photo + coordonnées complètes.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Premier contact"
        title={
          <>
            Écrire à{" "}
            <span className="font-display-italic text-gold-deep">Céline</span>
          </>
        }
        description="Un mot simple, une réponse personnelle. Aucun automatisme — Céline lit et répond elle-même."
      />

      <section className="relative bg-bg-base py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Bloc orientation douce */}
            <Reveal className="lg:col-span-7 lg:order-1 order-2">
              <div className="rounded-[1.5rem] paper-sand border border-border-soft p-7 md:p-9 space-y-5">
                <div className="inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-text-soft">
                  <span className="text-gold-deep">
                    <Etincelle size={11} />
                  </span>
                  <span>Si vous hésitez</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-text-deep leading-tight">
                  Pas sûre par où commencer&nbsp;?
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Vous pouvez répondre à quelques questions douces pour vous
                  orienter, ou m&apos;écrire directement — je vous répondrai
                  personnellement.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <ButtonHalo tone="mixed">
                    <Link
                      href="/diagnostic"
                      className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-2.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                    >
                      Me laisser guider
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </ButtonHalo>
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-5 py-2.5 text-sm text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Écrire sur WhatsApp
                  </a>
                </div>
                <p className="text-xs text-text-soft italic pt-1">
                  Réponse personnelle de Céline — pas de robot, pas de chatbot
                  scripté.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft mb-3 px-1">
                  Accès rapides
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {quickLinks.map((q) => (
                    <li key={q.label}>
                      <Link
                        href={q.href}
                        className="group flex items-center gap-3 rounded-2xl border border-border-soft bg-bg-card px-4 py-3 hover:border-gold-soft transition-colors"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-soft text-gold-deep">
                          <q.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm text-text-deep flex-1">{q.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-text-soft group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Réseaux + GoogleReviews */}
            <Reveal delay={0.1} className="lg:col-span-5 lg:order-2 order-1 space-y-5">
              <div className="rounded-2xl bg-bg-card border border-border-soft p-6 space-y-4">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft">
                  Réseaux
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href={contact.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram — Céline Dusseval"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href={contact.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook — Etincel"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <FacebookIcon size={16} />
                  </a>
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp — écrire à Céline"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-medium text-text-deep hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon size={15} />
                  </a>
                </div>
                <p className="text-xs text-text-soft mt-2">
                  {contact.social.instagram.label}
                </p>
              </div>
              <GoogleReviewsTeaser />
            </Reveal>
          </div>
        </Container>
      </section>

      <div id="message">
        <EcrivezMoi />
      </div>

      <OfferStrip
        intro="Vous pensez à quelqu'un qui aurait besoin d'un moment chez Céline ? Une carte préparée avec soin peut être offerte — montant libre ou expérience précise."
        ctaLabel="Préparer une carte"
      />
    </>
  );
}
