import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { OpenAssistantButton } from "@/components/ai/OpenAssistantButton";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tarifs — Pratiques, retraites, formations",
  description:
    "Les tarifs des pratiques avec Céline Dusseval, regroupés par intention. Numérologie 110 €, hypnose 90 €, CellRelease 90 €, constellations 95 €, breathwork 90/140 €, massages 90/120 €, formations 320 €.",
};

type TarifEntry = {
  name: string;
  price: string;
  duration?: string;
  href?: string;
  note?: string;
};

type IntentionGroup = {
  id: string;
  intention: string;
  body: string;
  rows: TarifEntry[];
};

const intentions: IntentionGroup[] = [
  {
    id: "memoires",
    intention: "Venir déposer une mémoire",
    body: "Constellations, hypnose, CellRelease — pour mettre en lumière les loyautés invisibles, les répétitions, les mémoires qui pèsent.",
    rows: [
      { name: "Constellation familiale", duration: "1h30", price: "95 €", href: "/constellations" },
      { name: "Constellation Rebirth (de naissance)", duration: "1h30", price: "95 €", href: "/constellations" },
      { name: "Hypnose & mouvements oculaires", duration: "1h30", price: "90 €", href: "/accompagnements/hypnose" },
      { name: "CellRelease®", duration: "1h30", price: "90 €", href: "/accompagnements/cellrelease" },
    ],
  },
  {
    id: "feminin",
    intention: "Revenir au corps, au cœur, au féminin",
    body: "Massages, soin énergétique, féminin sacré — un retour sensible au corps et à l'intuition.",
    rows: [
      { name: "Massage Libération Reconnexion", duration: "1h20", price: "90 €", href: "/accompagnements/massage-liberation-reconnexion" },
      { name: "Massage Libération Reconnexion", duration: "1h45", price: "120 €", href: "/accompagnements/massage-liberation-reconnexion" },
      { name: "Massage & soin énergétique", duration: "1h", price: "90 €", href: "/accompagnements/massage-energetique" },
      { name: "Réflexologie amérindienne", duration: "1h", price: "90 €", href: "/accompagnements/reflexologie" },
      { name: "Féminin sacré", duration: "Sur demande", price: "Sur demande", href: "/feminin-sacre", note: "Cadre construit avec vous après échange." },
    ],
  },
  {
    id: "souffle",
    intention: "Traverser par le souffle et le mouvement",
    body: "Breathwork, innerdance — pour intégrer par le corps ce que les mots ne suffisent pas à transformer.",
    rows: [
      { name: "Breathwork chamanique", duration: "2h", price: "90 €", href: "/accompagnements/breathwork", note: "Échange préalable nécessaire (contre-indications)." },
      { name: "Breathwork chamanique en duo", duration: "2h", price: "140 €", href: "/accompagnements/breathwork" },
      { name: "Innerdance individuel", duration: "Sur demande", price: "Sur demande", href: "/innerdance" },
    ],
  },
  {
    id: "boussole",
    intention: "Lire les cycles, éclairer le chemin",
    body: "Numérologie symbolique — une boussole qui s'inscrit dans tous les chemins.",
    rows: [
      { name: "Lecture numérologie", duration: "1h30", price: "110 €", href: "/accompagnements/numerologie" },
    ],
  },
  {
    id: "collectif",
    intention: "Vivre une expérience collective",
    body: "Cercles, cérémonies, retraites — la force du groupe et du partage.",
    rows: [
      { name: "Cercle de femmes", duration: "Mensuel", price: "Sur demande", href: "/cercles-de-femmes", note: "Tarif selon le lieu et la formule." },
      { name: "Cérémonie cacao", duration: "1h30 à 3h", price: "Selon format", href: "/cacao", note: "Individuel, en duo ou en cercle — devis après échange." },
      { name: "Innerdance collectif", duration: "Sessions ponctuelles", price: "Sur demande", href: "/innerdance" },
      { name: "Retraite immersive", duration: "3 à 5 jours", price: "Sur demande", href: "/retraites", note: "Détail envoyé à chaque ouverture aux personnes inscrites." },
    ],
  },
  {
    id: "transmission",
    intention: "Apprendre, transmettre",
    body: "Formations en numérologie symbolique — pour celles qui souhaitent recevoir ce langage.",
    rows: [
      { name: "Formation Numérologie · Module 1", duration: "Module complet", price: "320 €", href: "/formations" },
      { name: "Formation Numérologie · Module 2", duration: "Module complet", price: "320 €", href: "/formations" },
    ],
  },
  {
    id: "offrir",
    intention: "Offrir un moment",
    body: "Cartes cadeaux préparées avec soin — montant libre ou pratique précise.",
    rows: [
      { name: "Carte cadeau", duration: "—", price: "Montant libre ou prestation", href: "/cartes-cadeaux" },
    ],
  },
];

/**
 * Page /tarifs — Sprint D "refuge connecté".
 * Pièce du refuge : LE COIN CLARTÉ. Émotion : clarté, simplicité, confiance.
 *
 * Sortie de : catalogue tableau froid 8 sections × tableau, "Section 01/02/03",
 * Nav sticky anchors, PageHeader, BilanGiftBanner.
 *
 * À la place : 7 groupes par INTENTION (pas par famille technique),
 * tarifs en liste douce — uniquement les confirmés, "Sur demande" / "Selon
 * format" sans honte. Note rose poudré en bas qui invite à parler.
 */
export default function TarifsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Tarifs"
        greeting="Pour vous repérer."
        title={
          <>
            Les tarifs, regroupés par{" "}
            <EtincelleAccent variant="glow">intention</EtincelleAccent>.
          </>
        }
        body="Plutôt qu'un catalogue de prestations, voici les chemins par lesquels les personnes arrivent. Les tarifs sont indicatifs — pour les formats sur mesure, on en parle ensemble."
        primaryCta={{ label: "Écrire à Céline", href: "/contact" }}
        secondaryCta={{ label: "Me laisser guider", href: "/diagnostic" }}
        variant="contact"
      />

      <section className="relative bg-bg-base py-20 md:py-28">
        <Container>
          <ul className="space-y-16 md:space-y-20 max-w-4xl mx-auto">
            {intentions.map((group, idx) => (
              <li key={group.id}>
                <Reveal>
                  <div className="space-y-4 mb-6 md:mb-8">
                    <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                      <span className="text-gold-deep">
                        <Etincelle size={11} />
                      </span>
                      <span>{`Chemin · 0${idx + 1}`}</span>
                    </div>
                    <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.2] text-text-deep">
                      {group.intention}
                    </h2>
                    <p className="text-base leading-relaxed text-text-medium max-w-2xl">
                      {group.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <ul className="space-y-2 rounded-[1.25rem] bg-bg-card border border-border-soft p-2">
                    {group.rows.map((row) => {
                      const Inner = (
                        <>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-base md:text-lg text-text-deep leading-snug">
                              {row.name}
                            </p>
                            {row.note && (
                              <p className="text-xs text-text-soft italic mt-1">{row.note}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {row.duration && row.duration !== "—" && (
                              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-text-soft hidden sm:inline">
                                {row.duration}
                              </span>
                            )}
                            <span className="font-display-italic text-[#b88a3d] text-base md:text-lg">
                              {row.price}
                            </span>
                            {row.href && (
                              <ArrowRight className="h-4 w-4 text-text-soft" />
                            )}
                          </div>
                        </>
                      );
                      return (
                        <li key={row.name + row.price}>
                          {row.href ? (
                            <Link
                              href={row.href}
                              className="group flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-bg-soft/60 transition-colors"
                            >
                              {Inner}
                            </Link>
                          ) : (
                            <div className="flex items-center gap-4 px-4 py-3">{Inner}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Sprint H Lot D — section "Vous ne savez pas quoi choisir ?" :
              3 portes douces (bilan, conciergerie IA, WhatsApp) en cartes
              élégantes. Conversion sans pression : la cliente choisit son
              canal selon son rythme. */}
          <Reveal>
            <div className="mt-20 md:mt-24 max-w-4xl mx-auto rounded-[1.75rem] bg-gradient-to-br from-bg-card via-rose-soft/12 to-gold-soft/18 border border-gold/25 p-8 md:p-10 space-y-6 shadow-[0_12px_40px_rgba(31,26,46,0.06)]">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
                  <span className="text-gold-deep">
                    <Etincelle size={11} />
                  </span>
                  <span>Pour vous aider à choisir</span>
                </div>
                <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2rem] leading-[1.2] text-text-deep">
                  Vous ne savez pas quoi choisir&nbsp;?
                </h2>
                <p className="text-base text-text-medium max-w-xl mx-auto leading-relaxed">
                  C&apos;est normal. Plusieurs portes peuvent ouvrir le même
                  chemin. Voici trois manières simples de s&apos;orienter —
                  prenez celle qui vous parle aujourd&apos;hui.
                </p>
              </div>

              <div className="grid gap-3 md:gap-4 sm:grid-cols-3 pt-2">
                {/* Carte 1 — Bilan d'orientation */}
                <Link
                  href="/diagnostic"
                  className="group flex flex-col items-start gap-2.5 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 hover:border-gold/60 hover:shadow-[0_8px_24px_rgba(201,168,106,0.15)] transition-all"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <Compass className="h-4 w-4" />
                  </span>
                  <p className="font-display text-base md:text-lg text-text-deep leading-snug">
                    Faire mon bilan
                  </p>
                  <p className="text-[0.78rem] text-text-medium leading-relaxed">
                    Quelques questions douces pour identifier le chemin qui
                    appelle aujourd&apos;hui.
                  </p>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-accent-deep font-medium">
                    Commencer
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>

                {/* Carte 2 — Conciergerie IA (ouvre le FloatingAssistant) */}
                <OpenAssistantButton className="group flex flex-col items-start gap-2.5 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 text-left hover:border-accent/60 hover:shadow-[0_8px_24px_rgba(122,96,154,0.15)] transition-all">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <p className="font-display text-base md:text-lg text-text-deep leading-snug">
                    Demander à la conciergerie
                  </p>
                  <p className="text-[0.78rem] text-text-medium leading-relaxed">
                    Une IA douce qui connaît l&apos;univers de Céline et vous
                    oriente en quelques échanges.
                  </p>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-accent-deep font-medium">
                    Ouvrir la conciergerie
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </OpenAssistantButton>

                {/* Carte 3 — WhatsApp direct */}
                <a
                  href={whatsappLink(whatsappMessages.generic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-start gap-2.5 rounded-[1.25rem] bg-bg-card border border-border-soft p-5 hover:border-[#25D366]/60 hover:shadow-[0_8px_24px_rgba(37,211,102,0.15)] transition-all"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/12 text-[#1ea354]">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <p className="font-display text-base md:text-lg text-text-deep leading-snug">
                    Écrire sur WhatsApp
                  </p>
                  <p className="text-[0.78rem] text-text-medium leading-relaxed">
                    Céline lit chaque message personnellement et répond à son
                    rythme — pas de robot.
                  </p>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[0.78rem] text-[#1ea354] font-medium">
                    Ouvrir WhatsApp
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </div>

              {/* CTA halo central — Bilan = chemin recommandé */}
              <div className="flex justify-center pt-3">
                <ButtonHalo tone="mixed">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                  >
                    Me laisser guider
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </ButtonHalo>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 max-w-2xl mx-auto rounded-2xl bg-rose-soft/30 border border-rose/30 p-6 md:p-7 text-sm text-text-medium leading-relaxed text-center">
              <p>
                Ces tarifs sont indicatifs. Ils peuvent évoluer selon le format,
                le lieu, la durée. Le mieux est toujours d&apos;en parler — chaque
                accompagnement est ajusté à ce qui se présente.
              </p>
              <a
                href={whatsappLink(whatsappMessages.generic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#7a4630] hover:text-[#5a2e1c] transition-colors"
              >
                Poser une question simple
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <GuidanceFooter variant="contact" />
    </>
  );
}
