"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Heart,
  Loader2,
  Lock,
  MessageCircle,
  PenLine,
  Repeat,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { Etincelle } from "@/components/ui/Etincelle";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { studio } from "@/lib/parcours";
import { createCheckoutSession } from "@/lib/stripeProducts";
import { whatsappMessages, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const iconMap = {
  Headphones,
  Users,
  Repeat,
  PenLine,
  MessageCircle,
  Zap,
} as const;

const sampleContent = [
  { title: "Méditation · Apaiser une colère", duration: "12 min", category: "Apaisement" },
  { title: "Méditation · Revenir au sol", duration: "18 min", category: "Ancrage" },
  { title: "Méditation · Ouvrir le cœur", duration: "22 min", category: "Cacao" },
  { title: "Méditation · S'endormir doucement", duration: "30 min", category: "Sommeil" },
  { title: "Cercle live · Le souffle qui libère", duration: "90 min", category: "Live mensuel" },
  { title: "Carnet d'écriture · Ce que je pose en 2026", duration: "Audio + PDF", category: "Carnet mensuel" },
];

export default function CerclePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [processing, setProcessing] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setProcessing(true);
    setStripeError(null);
    const productId = plan === "yearly" ? studio.productYearly : studio.productMonthly;
    const res = await createCheckoutSession(
      [{ productId, quantity: 1 }],
      {
        mode: "subscription",
        metadata: {
          flow: "le-cercle",
          plan: plan === "yearly" ? "annuel" : "mensuel",
        },
      },
    );
    if (res.ok) {
      window.location.href = res.url;
      return;
    }
    setProcessing(false);
    setStripeError(
      res.fallback
        ? "L'abonnement Stripe n'est pas encore activé sur cet hébergement. Écrivez à Céline pour rejoindre Le Cercle — elle vous envoie le lien personnel."
        : res.error,
    );
  };

  return (
    <>
      <PageRefugeHero
        eyebrow="Le Cercle · communauté en ligne"
        greeting="Un espace en continu."
        title={
          <>
            Le Cercle{" "}
            <EtincelleAccent variant="signature" withSparkle>
              Etincel
            </EtincelleAccent>.
          </>
        }
        body={studio.description}
        primaryCta={{ label: "Rejoindre Le Cercle", href: "#abonner" }}
        secondaryCta={{ label: "Poser une question", href: "https://wa.me/33627438104" }}
        variant="portrait"
        visualId="about-portrait-secondaire"
      />
      <span id="abonner" />

      <section className="bg-bg-soft border-y border-border-soft py-8">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-text-deep">
            {[
              { value: "30+", label: "méditations guidées" },
              { value: "1/mois", label: "cercle live en visio" },
              { value: "30j", label: "replays disponibles" },
              { value: "0 €", label: "engagement, résiliation 1 clic" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="font-display text-3xl text-gold-deep">{s.value}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-soft">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5" />
                Ce que vous trouvez dans le Cercle
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Six piliers pour avancer{" "}
                <span className="font-display-italic text-gold-deep">à votre rythme</span>.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Pas une chaîne YouTube de méditation générique. Tout est créé par Céline, pour ses clientes — celles qu&apos;elle accompagne en cabinet, et celles qui veulent rester en lien entre les séances.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {studio.pillars.map((p, i) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <Reveal key={p.title} delay={i * 0.05}>
                  <article className="rounded-3xl border border-border-soft bg-bg-card p-7 h-full">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl text-text-deep leading-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-text-medium leading-relaxed">{p.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Headphones className="h-3.5 w-3.5" />
                Aperçu du catalogue
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Quelques contenus, pour vous donner une idée.
              </h2>
              <p className="text-text-medium leading-relaxed">
                La bibliothèque s&apos;enrichit chaque mois. Les contenus sont organisés par intention (apaiser, ancrer, ouvrir le cœur, retrouver le sommeil, féminin sacré).
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sampleContent.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <article className="rounded-2xl border border-border-soft bg-bg-card p-5 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep shrink-0">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-deep mb-0.5">
                      {item.category}
                    </p>
                    <p className="font-display text-base text-text-deep leading-tight">{item.title}</p>
                    <p className="text-xs text-text-soft mt-1">{item.duration}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-soft text-center italic">
            Les titres sont indicatifs. Le catalogue complet est accessible aux abonnées dès l&apos;inscription.
          </p>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        {/* SacredBackdrop retiré Sprint D — palette refuge prend le relais */}
        <Container className="relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <Reveal>
              <div className="space-y-5">
                <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft flex items-center gap-3">
                  <Heart className="h-3.5 w-3.5" />
                  La communauté du Cercle
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-on-dark">
                  Pas un groupe de bavardage —{" "}
                  <span className="font-display-italic text-gold-soft">un cercle tenu</span>.
                </h2>
                <div className="space-y-4 text-text-on-dark-soft leading-relaxed">
                  <p>
                    L&apos;espace WhatsApp privé du Cercle Etincel est un endroit rare : Céline y pose une intention chaque semaine, propose un prompt d&apos;écriture, partage un audio court, accueille les questions.
                  </p>
                  <p>
                    Les membres se relient entre elles, mais sans le brouhaha des groupes ouverts. Le cadre est clair : confidentialité totale, pas de débat polémique, une qualité de présence comme dans les cercles physiques.
                  </p>
                  <p>
                    C&apos;est un espace optionnel — vous accédez au reste du Studio sans rejoindre le groupe si vous préférez. Mais celles qui le rejoignent en font souvent la partie qu&apos;elles préfèrent.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-8 space-y-5">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold-soft">
                  Ce que Céline y dépose
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Une intention chaque dimanche",
                      desc: "Quelque chose à porter dans la semaine — un mot, un geste, une question.",
                    },
                    {
                      title: "Un audio mensuel d'écriture",
                      desc: "Un prompt + 10 min de Céline qui parle, pour ceux qui veulent écrire.",
                    },
                    {
                      title: "Des invitations ponctuelles",
                      desc: "Avant tout le monde, les nouvelles dates de retraites et de parcours.",
                    },
                    {
                      title: "Une présence régulière",
                      desc: "Pas tous les jours. Mais quand elle est là, c'est qu'il y a quelque chose à partager.",
                    },
                  ].map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-display text-base text-text-on-dark">{b.title}</p>
                        <p className="text-xs text-text-on-dark-soft mt-0.5 leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="section">
        <Container size="narrow">
          <Reveal>
            <div className="text-center space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center justify-center gap-3">
                <Etincelle size={11} />
                Rejoindre le Cercle
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Deux formules, un seul accès complet.
              </h2>
              <p className="text-text-medium leading-relaxed max-w-xl mx-auto">
                Aucun engagement. Vous restez tant que ça vous nourrit, vous arrêtez en un clic.
              </p>
            </div>
          </Reveal>

          <>
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center rounded-full border border-border-medium bg-bg-card p-1">
                  <button
                    type="button"
                    onClick={() => setPlan("monthly")}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      plan === "monthly"
                        ? "bg-accent-deep text-text-on-dark"
                        : "text-text-medium hover:text-text-deep",
                    )}
                  >
                    Mensuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan("yearly")}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      plan === "yearly"
                        ? "bg-accent-deep text-text-on-dark"
                        : "text-text-medium hover:text-text-deep",
                    )}
                  >
                    Annuel
                    <span className="ml-2 text-[0.65rem] uppercase tracking-[0.18em] bg-gold-soft text-gold-deep rounded-full px-2 py-0.5">
                      −17 %
                    </span>
                  </button>
                </div>
              </div>

              <Reveal>
                <div className="rounded-[2rem] border-2 border-gold-soft/50 bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card p-8 md:p-12 text-center space-y-6">
                  <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold-deep">
                      {plan === "yearly" ? "Abonnement annuel" : "Abonnement mensuel"}
                    </p>
                    <p className="font-display text-6xl md:text-7xl text-text-deep">
                      {plan === "yearly" ? studio.yearlyPriceLabel : studio.monthlyPriceLabel}
                    </p>
                    <p className="text-sm text-text-soft">
                      {plan === "yearly"
                        ? `${studio.yearlySavingsLabel} · soit 24,17 €/mois`
                        : "facturé chaque mois · résiliation 1 clic"}
                    </p>
                  </div>

                  <ul className="text-left space-y-2 max-w-md mx-auto">
                    {[
                      "Accès complet au catalogue de méditations",
                      "1 cercle live mensuel en visio + replay",
                      "Audio mensuel d'écriture & introspection",
                      "Communauté WhatsApp privée avec Céline",
                      "Accès prioritaire aux retraites et parcours",
                      plan === "yearly" ? "2 mois offerts par rapport au mensuel" : "Sans engagement",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-text-medium">
                        <CheckCircle2 className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={handleSubscribe}
                    disabled={processing}
                    className="orbit-shine w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-deep px-7 py-4 text-base font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirection vers Stripe…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Rejoindre le Cercle — {plan === "yearly" ? studio.yearlyPriceLabel + "/an" : studio.monthlyPriceLabel + "/mois"}
                      </>
                    )}
                  </button>

                  <p className="text-[0.7rem] text-text-soft">
                    Paiement sécurisé Stripe · CB / Visa / MasterCard / Amex · résiliation en 1 clic
                  </p>
                </div>
              </Reveal>

              {stripeError && (
                <div className="mt-6 max-w-xl mx-auto rounded-2xl border border-gold-soft/60 bg-bg-card p-5 text-sm text-text-medium leading-relaxed space-y-3">
                  <p>{stripeError}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={whatsappLink(`Bonjour Céline, je souhaite rejoindre Le Cercle (formule ${plan === "yearly" ? "annuelle" : "mensuelle"}). Pouvez-vous m'envoyer le lien ?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white hover:bg-[#1ebe5a] transition-colors"
                    >
                      Continuer sur WhatsApp
                    </a>
                    <a
                      href={`mailto:etincel33@gmail.com?subject=${encodeURIComponent("Rejoindre Le Cercle")}&body=${encodeURIComponent(`Bonjour Céline, je souhaite rejoindre Le Cercle (formule ${plan === "yearly" ? "annuelle (290 €/an)" : "mensuelle (29 €/mois)"}).`)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-bg-card border border-border-soft px-4 py-2 text-xs font-medium text-text-deep hover:bg-bg-soft transition-colors"
                    >
                      Envoyer un email
                    </a>
                  </div>
                </div>
              )}

              <p className="mt-6 text-center text-xs text-text-soft italic">
                Vous suivez déjà un parcours 3 mois ? Le Cercle est inclus pendant la durée du parcours — pas besoin de souscrire.
              </p>
            </>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de rejoindre.
              </h2>
            </div>
            <div className="space-y-3">
              {studio.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border-soft bg-bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer flex items-center justify-between gap-4 list-none">
                    <span className="font-display text-lg text-text-deep">{item.q}</span>
                    <span className="text-text-soft group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-text-medium leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-8 md:p-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Aller plus loin</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Le Cercle vous a séduite ?{" "}
                  <span className="font-display-italic text-gold-deep">
                    Découvrez les parcours 3 mois.
                  </span>
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Pour un accompagnement plus structuré : Reflet, Boussole, Métamorphose. Studio inclus pendant toute la durée du parcours.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/accompagnement-3-mois" className="btn-primary w-full justify-center">
                  Voir les parcours 3 mois
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/diagnostic" className="btn-secondary w-full justify-center">
                  Faire mon bilan
                </Link>
                <WhatsAppButton message={whatsappMessages.generic} variant="outline" className="w-full justify-center">
                  Une question ? WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed flex items-start gap-3">
              <Shield className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
              <span>
                Les contenus du Cercle Etincel sont des outils de bien-être et de développement personnel. Ils ne remplacent pas un suivi médical, psychologique ou thérapeutique. Chaque méditation est précédée d&apos;une mention de précaution si nécessaire.
              </span>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
