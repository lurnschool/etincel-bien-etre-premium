import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
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

          <Reveal>
            <div className="mt-16 md:mt-20 max-w-2xl mx-auto rounded-2xl bg-rose-soft/30 border border-rose/30 p-6 md:p-7 text-sm text-text-medium leading-relaxed text-center">
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
