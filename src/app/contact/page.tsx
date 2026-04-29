import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
  Users,
  Gift,
  Mountain,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactRapide } from "@/components/home/ContactRapide";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { contact } from "@/lib/data";
import { pageVisuals } from "@/lib/visualAssetMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Échangez avec Céline Dusseval — un message simple, une réponse personnelle.",
};

const quickLinks = [
  { icon: Heart, label: "Une séance individuelle", href: "/accompagnements" },
  { icon: Users, label: "Un cercle ou un atelier", href: "/collectif" },
  { icon: Mountain, label: "Une retraite", href: "/retraites" },
  { icon: Gift, label: "Une carte cadeau", href: "/cartes-cadeaux" },
  { icon: HelpCircle, label: "Une question simple", href: "#message" },
];

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
        description="Un message simple, une réponse personnelle de Céline. Aucun téléphone surtaxé, aucune réponse automatique."
      />

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="subtle" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="space-y-8 lg:sticky lg:top-28">
                <SmartImage
                  {...pageVisuals.contact[0]}
                  ratio="portrait"
                  className="max-w-sm"
                />
                <div className="space-y-5 max-w-md">
                  <p className="font-display text-2xl text-text-deep leading-snug">
                    « Chaque message reçoit une réponse de ma part — jamais d&apos;automatisme. »
                  </p>
                  <p className="text-sm text-text-soft italic">
                    Céline Dusseval
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href={contact.phoneLink}
                    className="flex items-center gap-4 rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-text-soft">Téléphone</p>
                      <p className="font-display text-xl text-text-deep">{contact.phone}</p>
                    </div>
                  </a>
                  <a
                    href={contact.emailLink}
                    className="flex items-center gap-4 rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-text-soft">Email</p>
                      <p className="font-display text-xl text-text-deep break-all">{contact.email}</p>
                    </div>
                  </a>
                  <div className="rounded-2xl border border-border-soft bg-bg-card p-5 flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep shrink-0">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="text-sm text-text-medium leading-relaxed">
                      <p className="font-display text-base text-text-deep">{contact.addressMain.label}</p>
                      <p>{contact.addressMain.street}</p>
                      <p>{contact.addressMain.city}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-text-soft">
                        Aussi à {contact.addressSecondary.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-7 md:p-8">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep mb-3">
                    <Etincelle size={12} />
                    <span>Vous hésitez ?</span>
                  </div>
                  <p className="font-display text-2xl md:text-3xl text-text-deep leading-tight mb-3">
                    Vous ne savez pas quoi choisir ?
                  </p>
                  <p className="text-text-medium leading-relaxed mb-5">
                    Faites d&apos;abord le diagnostic — quelques questions douces pour identifier la pratique la plus juste.
                  </p>
                  <Link href="/diagnostic" className="btn-primary">
                    Faire le diagnostic
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-text-soft mb-3">
                    Liens rapides
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
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <div id="message">
        <ContactRapide />
      </div>
    </>
  );
}
