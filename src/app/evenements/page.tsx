import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { ProchainesDates } from "@/components/page/ProchainesDates";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Prochains espaces à vivre — cercles, retraites, formations",
  description:
    "Cercles de femmes, cérémonies cacao, retraites, formations, ateliers. Les prochaines dates seront annoncées en priorité aux personnes inscrites sur les listes d'intérêt.",
};

const espaces = [
  {
    id: "cercles",
    title: "Cercles de femmes",
    body: "Un rendez-vous mensuel pour déposer, partager, revenir à soi en sororité.",
    detail: "Quand un nouveau cercle s'ouvre, les inscrites reçoivent l'invitation 2 à 3 semaines avant.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20cercles%20de%20femmes" },
    secondary: { label: "En savoir plus", href: "/cercles-de-femmes" },
  },
  {
    id: "cacao",
    title: "Cérémonies cacao",
    body: "Cercles cacao en petit comité, autour d'un thème ou d'une intention.",
    detail: "Les cérémonies sont annoncées une à une — pas de calendrier figé.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20cacao" },
    secondary: { label: "En savoir plus", href: "/cacao" },
  },
  {
    id: "constellations",
    title: "Constellations familiales",
    body: "Sessions ponctuelles en groupe — explorer les loyautés et les dynamiques familiales.",
    detail: "6 à 10 personnes maximum, en présence de Céline, dans un cadre sécure.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20constellations" },
    secondary: { label: "En savoir plus", href: "/constellations" },
  },
  {
    id: "innerdance",
    title: "Innerdance collectif",
    body: "Une immersion sonore et corporelle en petit groupe pour écouter ce qui cherche à émerger.",
    detail: "Sessions occasionnelles, sur invitation aux inscrits.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20innerdance" },
    secondary: { label: "En savoir plus", href: "/innerdance" },
  },
  {
    id: "breathwork",
    title: "Breathwork chamanique",
    body: "Des cercles de souffle, en collectif, pour traverser et déposer ce qui demande à l'être.",
    detail: "Pratique intense — un échange préalable est demandé pour vérifier les contre-indications.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20breathwork" },
    secondary: { label: "En savoir plus", href: "/accompagnements/breathwork" },
  },
  {
    id: "retraites",
    title: "Retraites & immersions",
    body: "Quelques jours en petit groupe — souffle, cacao, cercles, nature.",
    detail: "Annoncées 2 à 3 mois avant l'ouverture aux personnes inscrites.",
    cta: { label: "Recevoir les prochaines dates", href: "/retraites#interet" },
    secondary: { label: "En savoir plus", href: "/retraites" },
  },
  {
    id: "formations",
    title: "Formations en numérologie",
    body: "Modules 1 et 2 — apprendre à lire les nombres comme une boussole symbolique.",
    detail: "Petits groupes de transmission, 1 à 2 fois par an.",
    cta: { label: "Demander le programme", href: "/contact?sujet=Formation%20num%C3%A9rologie" },
    secondary: { label: "En savoir plus", href: "/formations" },
  },
  {
    id: "ateliers",
    title: "Ateliers thématiques",
    body: "Des temps courts pour explorer une pratique ou une thématique spécifique.",
    detail: "Programme tissé au fil de l'année selon les demandes reçues.",
    cta: { label: "Être prévenue", href: "/contact?sujet=Liste%20ateliers" },
    secondary: { label: "En savoir plus", href: "/collectif" },
  },
];

/**
 * Page /evenements — Sprint D "refuge connecté".
 * Pièce du refuge : LE CARNET DE RENDEZ-VOUS — invitations à venir.
 * Émotion : invitation, vivant, à venir.
 *
 * Composition : PageRefugeHero variant "contact" + DetailStrip "rose"
 * + 8 espaces vivants en cards posées + GuidanceFooter "contact".
 */
export default function EvenementsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Prochains espaces à vivre"
        greeting="Quand un espace s'ouvre."
        title={
          <>
            Vous êtes prévenue{" "}
            <EtincelleAccent variant="glow">en priorité</EtincelleAccent>.
          </>
        }
        body="Pas de calendrier figé — chaque espace s'ouvre quand le moment est juste. Choisissez ce qui vous appelle, vous serez prévenue dès qu'une date se pose."
        primaryCta={{ label: "Écrire à Céline", href: "/contact" }}
        secondaryCta={{ label: "Poser une question", href: whatsappLink(whatsappMessages.generic) }}
        variant="contact"
      />

      <DetailStrip
        assetIds={[
          "micro-refuge-1",
          "micro-refuge-2",
          "micro-refuge-3",
          "micro-refuge-4",
          "micro-refuge-5",
          "micro-refuge-6",
        ]}
        tone="rose"
        size="md"
        caption="Fragments d'espaces partagés — d'autres viendront s'ajouter."
      />

      <section className="relative bg-bg-base py-24 md:py-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span>Listes d&apos;intérêt</span>
              </div>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text-medium">
                Choisissez ce qui vous attire. Pas de spam, juste les ouvertures
                réelles, dans votre boîte mail.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-5 md:gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {espaces.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.05}>
                <article className="group flex flex-col h-full rounded-[1.5rem] bg-bg-card border border-border-soft p-7 md:p-8 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500">
                  <h3 className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-text-medium">
                    {e.body}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-text-soft italic">
                    {e.detail}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border-soft/60 flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto">
                    <Link
                      href={e.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {e.cta.label}
                    </Link>
                    <Link
                      href={e.secondary.href}
                      className="inline-flex items-center gap-1 text-sm text-text-soft hover:text-accent transition-colors ml-auto"
                    >
                      {e.secondary.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ProchainesDates
        eyebrow="Prochains événements"
        title="Ce qui s'ouvre dans les prochaines semaines."
        kind="autre"
        notifyLabel="Être prévenue des prochaines ouvertures"
      />

      <GuidanceFooter variant="contact" />
    </>
  );
}
