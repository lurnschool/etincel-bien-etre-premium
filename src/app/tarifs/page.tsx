import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Compass,
  Flame,
  Gift,
  GraduationCap,
  Headphones,
  Heart,
  Mountain,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BilanGiftBanner } from "@/components/layout/BilanGiftBanner";
import { disclaimers } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";
import { parcours, studio } from "@/lib/parcours";

export const metadata: Metadata = {
  title: "Tarifs — Toutes les pratiques",
  description:
    "Tous les tarifs des pratiques d'Etincel : numérologie 110 €, constellations 95 €, hypnose 90 €, breathwork 90/140 €, massages 90/120 €, formations 320 €, cartes cadeaux et retraites. Réservation en ligne sécurisée.",
};

type TarifRow = {
  name: string;
  duration: string;
  price: string;
  description: string;
  reserveHref?: string;
  detailHref: string;
};

type TarifSection = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  rows: TarifRow[];
};

const sections: TarifSection[] = [
  {
    id: "comprendre",
    icon: Compass,
    label: "Comprendre · Numérologie",
    description: "La lecture symbolique des nombres pour éclairer votre trajectoire.",
    rows: [
      {
        name: "Lecture numérologie",
        duration: "1h30",
        price: "110 €",
        description: "Lecture symbolique de votre date de naissance — cycles, talents, ressources.",
        reserveHref: "/reserver/numerologie",
        detailHref: "/accompagnements/numerologie",
      },
      {
        name: "Formation numérologie · Module 1",
        duration: "Module complet",
        price: "320 €",
        description: "Les fondations pour apprendre à lire les nombres.",
        reserveHref: "/reserver/formation-numerologie-m1",
        detailHref: "/formations",
      },
      {
        name: "Formation numérologie · Module 2",
        duration: "Module complet",
        price: "320 €",
        description: "Approfondissement et lecture symbolique avancée.",
        reserveHref: "/reserver/formation-numerologie-m2",
        detailHref: "/formations",
      },
    ],
  },
  {
    id: "apaiser",
    icon: Heart,
    label: "Apaiser · Hypnose & libération",
    description: "Pratiques pour relâcher, libérer un schéma, retrouver du calme.",
    rows: [
      {
        name: "Hypnose & mouvements oculaires",
        duration: "1h30",
        price: "90 €",
        description: "Voyage intérieur, reconnexion à l'inconscient.",
        reserveHref: "/reserver/hypnose",
        detailHref: "/accompagnements/hypnose",
      },
      {
        name: "CellRelease®",
        duration: "1h30",
        price: "90 €",
        description: "Relaxation profonde, libération des mémoires cellulaires.",
        reserveHref: "/reserver/cellrelease",
        detailHref: "/accompagnements/cellrelease",
      },
    ],
  },
  {
    id: "corps",
    icon: Heart,
    label: "Corps · Massages & soins",
    description: "Pour réhabiter le corps, relâcher les tensions, ouvrir le sensible.",
    rows: [
      {
        name: "Massage Libération Reconnexion · 1h20",
        duration: "1h20",
        price: "90 €",
        description: "Massage profond, dialogue main-souffle-corps.",
        reserveHref: "/reserver/massage-liberation-reconnexion",
        detailHref: "/accompagnements/massage-liberation-reconnexion",
      },
      {
        name: "Massage Libération Reconnexion · 1h45",
        duration: "1h45",
        price: "120 €",
        description: "Format long pour un travail en profondeur.",
        reserveHref: "/reserver/massage-liberation-reconnexion",
        detailHref: "/accompagnements/massage-liberation-reconnexion",
      },
      {
        name: "Massage & soin énergétique",
        duration: "1h",
        price: "90 €",
        description: "Toucher, instruments, vibrations — réactivation énergétique.",
        reserveHref: "/reserver/massage-energetique",
        detailHref: "/accompagnements/massage-energetique",
      },
      {
        name: "Réflexologie amérindienne",
        duration: "1h",
        price: "90 €",
        description: "Pratique chamanique mexicaine, ouverture corporelle et symbolique.",
        reserveHref: "/reserver/reflexologie",
        detailHref: "/accompagnements/reflexologie",
      },
    ],
  },
  {
    id: "explorer",
    icon: Flame,
    label: "Souffle & présence",
    description: "Breathwork, innerdance — explorer ce qui demande à émerger.",
    rows: [
      {
        name: "Breathwork chamanique individuel",
        duration: "2h",
        price: "90 €",
        description: "Pratique respiratoire intense — échange préalable systématique.",
        reserveHref: "/reserver/breathwork",
        detailHref: "/accompagnements/breathwork",
      },
      {
        name: "Breathwork chamanique en duo",
        duration: "2h",
        price: "140 €",
        description: "Souffle partagé en duo (couples, mères/filles, amies).",
        reserveHref: "/reserver/breathwork",
        detailHref: "/accompagnements/breathwork",
      },
      {
        name: "Innerdance — sur demande",
        duration: "Selon format",
        price: "Sur demande",
        description: "Immersion sensorielle individuelle ou collective.",
        detailHref: "/innerdance",
      },
    ],
  },
  {
    id: "constellations",
    icon: Users,
    label: "Constellations familiales",
    description: "Éclairer ce qui se transmet, se rejoue, demande à être vu.",
    rows: [
      {
        name: "Constellation individuelle",
        duration: "1h30 à 2h",
        price: "95 €",
        description: "Travail systémique en face-à-face avec Céline.",
        reserveHref: "/reserver/constellation-individuelle",
        detailHref: "/constellations",
      },
      {
        name: "Constellation de naissance Rebirth",
        duration: "1h30 à 2h",
        price: "95 €",
        description: "Voyage symbolique au cœur de votre venue au monde.",
        reserveHref: "/reserver/constellation-naissance-rebirth",
        detailHref: "/constellations",
      },
    ],
  },
  {
    id: "feminin",
    icon: Heart,
    label: "Féminin sacré · accompagnement",
    description: "Cercles, accompagnement individuel, médecine symbolique de l'utérus.",
    rows: [
      {
        name: "Accompagnement féminin sacré",
        duration: "À convenir",
        price: "Sur demande",
        description: "Un accompagnement sensible autour des cycles, du corps et de l'énergie créatrice.",
        detailHref: "/feminin-sacre",
      },
      {
        name: "Cercle de femmes mensuel",
        duration: "3h",
        price: "Sur inscription",
        description: "Un rendez-vous mensuel pour déposer, partager, revenir à soi en sororité.",
        detailHref: "/cercles-de-femmes",
      },
    ],
  },
  {
    id: "cacao",
    icon: Sparkles,
    label: "Cérémonie cacao",
    description: "Rituel sensoriel et symbolique — individuel, en cercle ou en retraite.",
    rows: [
      {
        name: "Rituel cacao individuel",
        duration: "1h30 à 2h",
        price: "Tarif selon événement ou format",
        description: "Une cérémonie à deux, sur-mesure, ajustée à votre intention.",
        detailHref: "/cacao",
      },
      {
        name: "Cercle cacao",
        duration: "2h à 3h",
        price: "Tarif selon événement ou format",
        description: "Cercle confidentiel en petit groupe.",
        detailHref: "/cacao",
      },
      {
        name: "Cacao en retraite",
        duration: "Inclus",
        price: "Compris dans la retraite",
        description: "Cérémonie intégrée à un séjour immersif.",
        detailHref: "/retraites",
      },
    ],
  },
  {
    id: "retraites",
    icon: Mountain,
    label: "Retraites immersives",
    description: "Petits groupes, écrins choisis, accompagnement individuel intégré.",
    rows: [
      {
        name: "Journée immersive",
        duration: "1 jour",
        price: "180 € à 280 €",
        description: "Format porte d'entrée — souffle, cacao, cercle.",
        detailHref: "/retraites#formats",
      },
      {
        name: "Week-end reconnexion",
        duration: "2 à 3 jours",
        price: "490 € à 780 €",
        description: "Vendredi soir au dimanche — le format le plus demandé.",
        detailHref: "/retraites#formats",
      },
      {
        name: "Retraite longue immersive",
        duration: "5 à 7 jours",
        price: "1 290 € à 1 890 €",
        description: "Pour les transformations profondes — pension complète.",
        detailHref: "/retraites#formats",
      },
    ],
  },
  {
    id: "cadeau",
    icon: Gift,
    label: "Cartes cadeaux",
    description: "Six styles personnalisables, paiement Stripe sécurisé, carte définitive immédiate.",
    rows: [
      {
        name: "Carte cadeau · Lecture numérologie",
        duration: "Validité 12 mois",
        price: "110 €",
        description: "Offrir une lecture numérologique complète.",
        reserveHref: "/cartes-cadeaux",
        detailHref: "/cartes-cadeaux",
      },
      {
        name: "Carte cadeau · Constellation",
        duration: "Validité 12 mois",
        price: "95 €",
        description: "Offrir une constellation familiale ou Rebirth.",
        reserveHref: "/cartes-cadeaux",
        detailHref: "/cartes-cadeaux",
      },
      {
        name: "Carte cadeau · Soin énergétique",
        duration: "Validité 12 mois",
        price: "À partir de 90 €",
        description: "Hypnose, CellRelease, massage, réflexologie.",
        reserveHref: "/cartes-cadeaux",
        detailHref: "/cartes-cadeaux",
      },
      {
        name: "Carte cadeau · Montant libre",
        duration: "Validité 12 mois",
        price: "Vous choisissez",
        description: "À utiliser sur l'ensemble des accompagnements.",
        reserveHref: "/cartes-cadeaux",
        detailHref: "/cartes-cadeaux",
      },
    ],
  },
];

export default function TarifsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tarifs · paiement sécurisé Stripe"
        title={
          <>
            Tous les tarifs,{" "}
            <span className="font-display-italic text-gold-deep">en clair</span>.
          </>
        }
        description="Aucun tarif caché. Réservation en ligne avec paiement Stripe sécurisé pour la majorité des pratiques. Pour les retraites, le cacao et les pratiques sur-mesure, Céline construit une proposition adaptée après échange."
      />

      <section className="bg-bg-soft border-b border-border-soft py-6">
        <Container>
          <nav className="flex flex-wrap gap-2 justify-center">
            <a
              href="#cercle"
              className="rounded-full border border-gold-soft bg-gold-soft/20 px-4 py-1.5 text-[0.78rem] font-medium text-gold-deep hover:bg-gold-soft/40 transition-colors"
            >
              Le Cercle
            </a>
            <a
              href="#parcours"
              className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[0.78rem] font-medium text-accent-deep hover:bg-accent/20 transition-colors"
            >
              Parcours 3 mois
            </a>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-border-soft bg-bg-card px-4 py-1.5 text-[0.78rem] font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Studio Le Cercle — premier produit récurrent à 29 €/mois */}
      <section id="cercle" className="py-16 md:py-20 bg-gradient-to-br from-gold-soft/20 via-bg-base to-rose-soft/15 border-b border-border-soft scroll-mt-24">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep">
                  <Headphones className="h-3.5 w-3.5" />
                  <span>Abonnement Studio · récurrent</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-text-deep leading-[1.05]">
                  Le Cercle{" "}
                  <span className="font-display-italic text-gold-deep">Etincel</span>.
                </h2>
                <p className="text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
                  Méditations, cercles live mensuels, communauté privée tenue par Céline. L&apos;espace pour avancer à votre rythme entre les séances individuelles.
                </p>
                <ul className="space-y-2 text-sm text-text-medium">
                  {[
                    "30+ méditations guidées (10 à 30 min)",
                    "1 cercle live mensuel en visio + replay 30 jours",
                    "Audio mensuel d'écriture & introspection",
                    "Communauté WhatsApp privée tenue par Céline",
                    "Accès prioritaire aux retraites et parcours",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border-2 border-gold-soft/50 bg-bg-card p-7 md:p-8 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft">
                      Mensuel
                    </span>
                    <span className="font-display text-2xl text-text-deep whitespace-nowrap">
                      {studio.monthlyPriceLabel}
                      <span className="text-sm text-text-soft font-normal">/mois</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 pt-3 border-t border-border-soft">
                    <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-deep flex-1">
                      Annuel · {studio.yearlySavingsLabel}
                    </span>
                    <span className="font-display text-2xl md:text-3xl text-gold-deep whitespace-nowrap shrink-0">
                      {studio.yearlyPriceLabel}
                      <span className="text-sm text-text-soft font-normal">/an</span>
                    </span>
                  </div>
                </div>
                <Link
                  href="/le-cercle"
                  className="btn-primary w-full justify-center"
                >
                  Découvrir Le Cercle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-[0.7rem] text-text-soft text-center">
                  Sans engagement · résiliation 1 clic · Stripe sécurisé
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Parcours 3 mois — produits premium */}
      <section id="parcours" className="py-16 md:py-20 bg-bg-deep text-text-on-dark border-b border-white/10 relative overflow-hidden scroll-mt-24">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-gold/15 blur-[120px] pointer-events-none" />
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft">
                <Star className="h-3.5 w-3.5" />
                <span>Accompagnement personnalisé · 12 semaines</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-text-on-dark leading-[1.05]">
                Trois parcours, conçus par{" "}
                <span className="font-display-italic text-gold-soft">Céline</span>.
              </h2>
              <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg">
                Reflet, Boussole, Métamorphose. Trois directions possibles que Céline attribue après un échange préalable de 30 min. Studio Le Cercle inclus, suivi WhatsApp continu, accès prioritaire.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {parcours.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <article className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 h-full flex flex-col">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft mb-2">
                    Niveau {p.level} · {p.duration}
                  </p>
                  <h3 className="font-display text-3xl text-text-on-dark leading-tight mb-2">
                    {p.name}
                  </h3>
                  <p className="font-display-italic text-base text-gold-soft leading-snug mb-4 flex-1">
                    {p.tagline}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/10 mb-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-soft">
                      Investissement total
                    </p>
                    <p className="font-display text-3xl text-gold">{p.priceLabel}</p>
                    <p className="text-xs text-text-on-dark-soft">{p.installments}</p>
                  </div>
                  <Link
                    href="/accompagnement-3-mois#parcours"
                    className="inline-flex items-center justify-between gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors"
                  >
                    Découvrir le parcours
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-center text-sm text-text-on-dark-soft">
              <Link href="/accompagnement-3-mois" className="text-gold hover:text-gold-soft underline-offset-2 hover:underline inline-flex items-center gap-1.5">
                Comment ça marche · les 4 étapes
                <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-20 space-y-16 md:space-y-20">
        <Container>
          {sections.map((section, sIdx) => (
            <Reveal key={section.id}>
              <article id={section.id} className="space-y-6 scroll-mt-24" style={{ marginTop: sIdx === 0 ? 0 : "5rem" }}>
                <header className="flex items-start gap-4 max-w-2xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep shrink-0">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep mb-1">
                      Section {String(sIdx + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl text-text-deep leading-tight">
                      {section.label}
                    </h2>
                    <p className="text-text-medium leading-relaxed mt-2">{section.description}</p>
                  </div>
                </header>

                <div className="rounded-3xl border border-border-soft bg-bg-card overflow-hidden">
                  <div className="divide-y divide-border-soft">
                    {section.rows.map((row) => (
                      <div
                        key={row.name}
                        className="grid gap-4 md:grid-cols-[1.6fr_auto_auto] md:items-center px-6 py-5 hover:bg-bg-soft/40 transition-colors"
                      >
                        <div>
                          <p className="font-display text-lg text-text-deep leading-tight">
                            {row.name}
                          </p>
                          <p className="text-sm text-text-medium mt-1 leading-relaxed">
                            {row.description}
                          </p>
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-soft mt-2">
                            {row.duration}
                          </p>
                        </div>
                        <p className="font-display text-2xl text-gold-deep md:text-right md:min-w-[8rem]">
                          {row.price}
                        </p>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {row.reserveHref ? (
                            <Link
                              href={row.reserveHref}
                              className="inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-[0.78rem] font-medium text-text-on-dark hover:bg-accent transition-colors"
                            >
                              Réserver
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ) : (
                            <Link
                              href={row.detailHref}
                              className="inline-flex items-center gap-1.5 rounded-full border border-accent text-accent px-4 py-2 text-[0.78rem] font-medium hover:bg-accent hover:text-text-on-dark transition-colors"
                            >
                              Demander
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                          <Link
                            href={row.detailHref}
                            className="inline-flex items-center gap-1.5 rounded-full bg-bg-soft px-4 py-2 text-[0.78rem] font-medium text-text-deep hover:bg-bg-card border border-border-soft transition-colors"
                          >
                            Détail
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-bg-deep text-text-on-dark py-16 md:py-20 relative overflow-hidden">
        <Container className="relative">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                <Calendar className="h-3.5 w-3.5" />
                <span>Modalités de paiement</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-on-dark">
                Trois manières de régler.
              </h2>
              <ul className="grid sm:grid-cols-3 gap-4 mt-8 text-left">
                <li className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-display text-lg text-text-on-dark mb-2">Stripe en ligne</p>
                  <p className="text-sm text-text-on-dark-soft leading-relaxed">
                    Paiement immédiat, 3D Secure, confirmation instantanée par email.
                  </p>
                </li>
                <li className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-display text-lg text-text-on-dark mb-2">Virement</p>
                  <p className="text-sm text-text-on-dark-soft leading-relaxed">
                    Pour les formations et retraites — RIB envoyé après réservation.
                  </p>
                </li>
                <li className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="font-display text-lg text-text-on-dark mb-2">Espèces / chèque</p>
                  <p className="text-sm text-text-on-dark-soft leading-relaxed">
                    Le jour de la séance pour les pratiques individuelles.
                  </p>
                </li>
              </ul>
              <p className="text-sm text-text-on-dark-soft leading-relaxed pt-4">
                Paiement en 3× sans frais possible sur les retraites et les parcours longs · Annulation 100% remboursée jusqu&apos;à 7 jours du rendez-vous.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <WhatsAppButton message={whatsappMessages.generic}>
                  Une question sur les tarifs ?
                </WhatsAppButton>
                <Link href="/contact" className="btn-secondary">
                  Demander un devis sur-mesure
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BilanGiftBanner variant="warm" />

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <GraduationCap className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
              <span>{disclaimers.bienEtre}</span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
