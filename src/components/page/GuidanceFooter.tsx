"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Gift } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

type Variant =
  | "guidance" // "Pas sûre par où commencer ?" → diagnostic + WhatsApp
  | "contact"  // "Écrivez-moi un mot." → contact + WhatsApp
  | "gift"     // "Offrir un moment ?" → carte cadeau + WhatsApp
  | "dates"    // "Recevoir les prochaines dates ?" → liste d'intérêt + WhatsApp
  | "question" // "Une question simple ?" → WhatsApp + email
  | "program"; // "Demander le programme" → contact + WhatsApp

type Props = {
  /** Quelle action mettre en avant en sortie de page. Défaut : guidance. */
  variant?: Variant;
  /** Surcharge optionnelle du titre. */
  title?: string;
  /** Surcharge optionnelle du corps. */
  body?: string;
  /** Personnalise le message WhatsApp pré-rempli. */
  whatsappMessage?: string;
};

/**
 * GuidanceFooter — bloc de sortie naturelle en bas de page interne.
 *
 * Sprint B "refuge connecté" : remplace BilanGiftBanner (qui empilait
 * 2 cards "Bilan Etincel" + "Offrir une parenthèse").
 *
 * Trois variantes selon la page :
 *  - "guidance" (défaut) — "Pas sûre par où commencer ?" → diagnostic + WhatsApp
 *  - "contact"          — "Une question, un doute ?" → WhatsApp + écrire
 *  - "gift"             — "Offrir un moment ?" → carte cadeau + WhatsApp
 *
 * Toujours une carte douce sur fond paper-sand, max-w-3xl, jamais
 * pleine largeur dramatique. Conversion conservée mais en velours.
 */
export function GuidanceFooter({
  variant = "guidance",
  title,
  body,
  whatsappMessage = whatsappMessages.generic,
}: Props) {
  const config = getConfig(variant, title, body, whatsappMessage);

  return (
    <section className="relative bg-bg-base py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[1.75rem] paper-sand border border-border-soft p-8 md:p-12 text-center space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{config.eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2rem] leading-[1.2] text-text-deep">
            {config.title}
          </h2>
          <p className="text-base leading-relaxed text-text-medium max-w-xl mx-auto">
            {config.body}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <ButtonHalo tone="mixed">
              <Link
                href={config.primary.href}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                {config.primary.icon && <config.primary.icon className="h-4 w-4" />}
                {config.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </ButtonHalo>
            <a
              href={config.secondary.href}
              target={config.secondary.external ? "_blank" : undefined}
              rel={config.secondary.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
            >
              {config.secondary.icon && <config.secondary.icon className="h-4 w-4" />}
              {config.secondary.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getConfig(
  variant: Variant,
  titleOverride: string | undefined,
  bodyOverride: string | undefined,
  whatsappMessage: string,
) {
  const wa = whatsappLink(whatsappMessage);
  switch (variant) {
    case "contact":
      return {
        eyebrow: "Une question ?",
        title: titleOverride ?? "Écrivez-moi un mot.",
        body:
          bodyOverride ??
          "Pas besoin d'avoir les bons mots. Je vous réponds personnellement, à votre rythme.",
        primary: {
          label: "Écrire à Céline",
          href: "/contact",
          icon: MessageCircle,
        },
        secondary: {
          label: "Plutôt sur WhatsApp",
          href: wa,
          icon: MessageCircle,
          external: true,
        },
      };
    case "gift":
      return {
        eyebrow: "Offrir un moment ?",
        title: titleOverride ?? "Une attention douce pour quelqu'un que vous aimez.",
        body:
          bodyOverride ??
          "Une carte préparée avec soin, pour une séance, un cercle, ou simplement un moment de pause.",
        primary: {
          label: "Préparer une attention",
          href: "/cartes-cadeaux",
          icon: Gift,
        },
        secondary: {
          label: "Poser une question",
          href: wa,
          icon: MessageCircle,
          external: true,
        },
      };
    case "dates":
      return {
        eyebrow: "Pour ne pas manquer",
        title: titleOverride ?? "Recevoir les prochaines dates.",
        body:
          bodyOverride ??
          "Pas de calendrier figé — chaque espace s'ouvre quand le moment est juste. Vous serez prévenue en priorité dès qu'une date est posée.",
        primary: {
          label: "Rejoindre la liste d'intérêt",
          href: "/retraites#interet",
          icon: undefined,
        },
        secondary: {
          label: "Écrire à Céline",
          href: wa,
          icon: MessageCircle,
          external: true,
        },
      };
    case "question":
      return {
        eyebrow: "Une question ?",
        title: titleOverride ?? "Posez-la simplement.",
        body:
          bodyOverride ??
          "Le plus rapide, c'est WhatsApp. Vous pouvez aussi écrire un email — Céline répond personnellement.",
        primary: {
          label: "Poser une question",
          href: wa,
          icon: MessageCircle,
        },
        secondary: {
          label: "Écrire un email",
          href: "mailto:etincel33@gmail.com",
          icon: undefined,
          external: true,
        },
      };
    case "program":
      return {
        eyebrow: "Pour aller plus loin",
        title: titleOverride ?? "Demander le programme.",
        body:
          bodyOverride ??
          "Écrivez-moi avec votre intention — je vous envoie le programme détaillé et les prochaines dates ouvertes.",
        primary: {
          label: "Demander le programme",
          href: "/contact?sujet=Programme",
          icon: undefined,
        },
        secondary: {
          label: "Plutôt sur WhatsApp",
          href: wa,
          icon: MessageCircle,
          external: true,
        },
      };
    case "guidance":
    default:
      return {
        eyebrow: "Si vous hésitez",
        title: titleOverride ?? "Pas sûre par où commencer ?",
        body:
          bodyOverride ??
          "Vous pouvez répondre à quelques questions douces pour vous orienter, ou m'écrire directement — je vous répondrai personnellement.",
        primary: {
          label: "Me laisser guider",
          href: "/diagnostic",
          icon: undefined,
        },
        secondary: {
          label: "Écrire à Céline",
          href: wa,
          icon: MessageCircle,
          external: true,
        },
      };
  }
}
