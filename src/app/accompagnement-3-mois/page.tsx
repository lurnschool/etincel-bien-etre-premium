import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Compass,
  Heart,
  MessageCircle,
  Mountain,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { Etincelle } from "@/components/ui/Etincelle";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { parcours } from "@/lib/parcours";

export const metadata: Metadata = {
  title: "Parcours 3 mois — Accompagnement personnalisé par Céline Dusseval",
  description:
    "Trois parcours d'accompagnement sur 12 semaines, conçus par Céline Dusseval après un échange préalable. Reflet (1 800 €), Boussole (2 400 €), Métamorphose (3 200 €) — paiement échelonné, Studio Le Cercle inclus.",
};

const steps = [
  {
    num: "01",
    icon: Compass,
    title: "Vous faites le bilan « La boussole »",
    description: "8 questions sensibles pour cerner votre élan du moment. Gratuit, 4 minutes, sans engagement.",
  },
  {
    num: "02",
    icon: Phone,
    title: "Échange préalable de 30 min avec Céline",
    description: "Elle vous appelle, écoute votre demande, comprend votre rythme. Aucune vente forcée — c'est elle qui décide si elle peut vous accompagner.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Céline conçoit votre parcours",
    description: "À partir de votre profil, elle attribue le parcours le plus juste (Reflet, Boussole ou Métamorphose) et l'ajuste finement à votre situation.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Vous validez et démarrez",
    description: "Paiement échelonné Stripe sécurisé · acompte 30 % à l'inscription · solde sur 3 ou 6 mois selon le format.",
  },
];

const whyPremium = [
  {
    icon: MessageCircle,
    title: "Suivi WhatsApp continu",
    description: "Entre les séances, Céline reste joignable pour ajuster, soutenir, accueillir un appel. Pas de file d'attente — réponse personnelle.",
  },
  {
    icon: Star,
    title: "Accès prioritaire",
    description: "Vous obtenez les créneaux qui vous arrangent, et vous êtes prévenue avant tout le monde des prochaines retraites.",
  },
  {
    icon: Sparkles,
    title: "Le Cercle Etincel offert",
    description: "L'abonnement Studio (29 €/mois) est inclus pendant toute la durée du parcours. Vous accédez aux méditations, cercles live et communauté.",
  },
  {
    icon: Heart,
    title: "Synthèse écrite et bilan final",
    description: "À mi-parcours et en fin, Céline vous remet une lecture écrite de votre cheminement. Un cadeau à relire dans 6 mois ou 2 ans.",
  },
];

const faq = [
  {
    q: "Pourquoi un parcours plutôt que des séances unitaires ?",
    a: "Pour deux raisons. D'abord, l'effet de cumul : 6 ou 8 séances sur 3 mois ne se contentent pas d'additionner — elles créent une trajectoire que des séances espacées ne déplacent pas. Ensuite, c'est Céline qui tient le fil entre chaque rendez-vous, ce qui n'existe pas dans un format unitaire.",
  },
  {
    q: "Comment Céline choisit-elle le parcours qui me convient ?",
    a: "Lors de l'échange préalable de 30 minutes (gratuit, sans engagement). Elle écoute votre demande, votre histoire, votre rythme. Si aucun des trois parcours ne correspond, elle vous le dira honnêtement et vous orientera autrement.",
  },
  {
    q: "Puis-je modifier les briques de mon parcours en cours de route ?",
    a: "Oui. Les parcours sont une trame, pas un protocole rigide. Si une séance prévue ne fait plus sens à mi-parcours, Céline propose un ajustement. La structure reste mais les pratiques précises se calibrent.",
  },
  {
    q: "Et si je dois annuler en cours de parcours ?",
    a: "Vous restez libre. L'acompte de 30 % est non remboursable mais les séances restantes sont remboursées au prorata si vous arrêtez avant 6 semaines. Au-delà, le parcours engagé est dû — sauf cas de force majeure (maladie, deuil, etc.) qui se règle au cas par cas.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Oui — Stripe 3D Secure, comme pour les séances unitaires. L'échelonnement (3× ou 6×) est intégré et sans frais. Vous payez l'acompte à l'inscription, puis la suite est prélevée automatiquement chaque mois.",
  },
  {
    q: "Et après les 3 mois, qu'est-ce qui se passe ?",
    a: "Beaucoup de personnes prolongent — soit en reprenant un autre parcours, soit en gardant uniquement le Studio (Le Cercle Etincel à 29 €/mois) pour rester en lien. C'est votre choix. Aucun engagement de continuer.",
  },
];

const tierStyles: Record<number, { bg: string; border: string; accent: string; tag: string }> = {
  1: {
    bg: "bg-bg-card",
    border: "border-border-soft",
    accent: "text-gold-deep",
    tag: "Niveau 1 · Apaiser",
  },
  2: {
    bg: "bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card",
    border: "border-gold-soft/40",
    accent: "text-gold-deep",
    tag: "Niveau 2 · Comprendre",
  },
  3: {
    bg: "bg-gradient-to-br from-accent/8 via-bg-card to-bg-card",
    border: "border-accent/30",
    accent: "text-accent-deep",
    tag: "Niveau 3 · Transformer",
  },
};

export default function ParcoursPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow="Accompagnement sur plusieurs mois"
        greeting="Un cadre construit avec vous."
        title={
          <>
            Un parcours pensé{" "}
            <EtincelleAccent variant="glow">pour vous</EtincelleAccent>.
          </>
        }
        body="Quand le moment appelle un cadre plus long. Trois directions possibles — à ajuster ensemble après un échange préalable. Aucun pack rigide, aucune promesse forcée."
        primaryCta={{ label: "Échanger avec Céline", href: "/contact?sujet=Parcours%203%20mois" }}
        secondaryCta={{ label: "Me laisser guider", href: "/diagnostic" }}
        variant="portrait"
        visualId="about-portrait-secondaire"
      />

      <section className="bg-bg-deep text-text-on-dark py-10 border-y border-white/10 relative overflow-hidden">
        <Container className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "12", label: "semaines de cheminement" },
              { value: "1+1+1", label: "échange · parcours · suivi continu" },
              { value: "3×", label: "paiement étalé sans frais" },
              { value: "100 %", label: "remboursable avant la 6e semaine" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="font-display text-3xl md:text-4xl text-gold">{s.value}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-text-on-dark-soft">
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
                <Etincelle size={11} />
                Comment ça marche
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Quatre étapes simples.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Vous ne choisissez pas vous-même votre parcours. C&apos;est Céline qui décide, après vous avoir écoutée. Cette étape change tout : vous arrivez avec une trame déjà tenue par une praticienne expérimentée.
              </p>
            </div>
          </Reveal>

          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <li className="rounded-3xl border border-border-soft bg-bg-card p-6 md:p-7 h-full flex flex-col gap-3">
                  <span className="font-display-italic text-3xl text-gold-deep/40">{s.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl text-text-deep leading-tight">{s.title}</h3>
                  <p className="text-sm text-text-medium leading-relaxed">{s.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section id="parcours" className="section bg-bg-soft relative overflow-hidden">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5" />
                Trois parcours, trois directions
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-text-deep">
                Reflet · Boussole · Métamorphose.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Chacun est une trame complète, pensée par Céline. Lors de l&apos;échange préalable, elle vous attribuera celle qui correspond — pas l&apos;inverse. Ces trois directions couvrent l&apos;essentiel des élans qu&apos;elle accompagne.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {parcours.map((p, i) => {
              const styles = tierStyles[p.level];
              return (
                <Reveal key={p.slug} delay={i * 0.07}>
                  <article
                    className={`relative h-full flex flex-col rounded-[2rem] border-2 ${styles.border} ${styles.bg} p-7 md:p-8`}
                  >
                    <span className={`text-[0.65rem] uppercase tracking-[0.28em] ${styles.accent} mb-3`}>
                      {styles.tag}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl text-text-deep leading-tight mb-2">
                      {p.name}
                    </h3>
                    <p className="font-display-italic text-base md:text-lg text-gold-deep leading-snug mb-4">
                      {p.tagline}
                    </p>
                    <p className="text-sm text-text-medium leading-relaxed mb-5">
                      {p.description}
                    </p>

                    <div className="space-y-2.5 mb-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft">
                        Pour qui
                      </p>
                      <ul className="space-y-1.5">
                        {p.forWhom.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-sm text-text-medium">
                            <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2.5 mb-5 pt-4 border-t border-border-soft">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft">
                        Ce qui est inclus
                      </p>
                      <ul className="space-y-2">
                        {p.bricks.map((b) => (
                          <li key={b.name} className="text-sm text-text-medium">
                            <p className="font-medium text-text-deep">{b.name}</p>
                            {b.detail && (
                              <p className="text-xs text-text-soft leading-relaxed">{b.detail}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 mb-5 pt-4 border-t border-border-soft">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft">
                        Bonus inclus
                      </p>
                      <ul className="space-y-1.5">
                        {p.bonuses.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold-deep mt-0.5 shrink-0" />
                            <span className="text-text-medium leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-5 border-t-2 border-border-soft space-y-3">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-soft mb-1">
                          Investissement total · {p.duration}
                        </p>
                        <p className="font-display text-3xl text-gold-deep">{p.priceLabel}</p>
                        <p className="text-xs text-text-soft mt-1">{p.installments}</p>
                      </div>
                      <Link
                        href={`/contact?sujet=${encodeURIComponent(`Parcours ${p.name} — demande d'échange préalable`)}`}
                        className="btn-primary w-full justify-center"
                      >
                        Demander un échange
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/diagnostic"
                        className="block text-center text-xs text-text-soft hover:text-text-deep transition-colors"
                      >
                        Pas encore sûre ? Faites le bilan d&apos;abord →
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Shield className="h-3.5 w-3.5" />
                Pourquoi un parcours
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Ce qui fait la différence avec des séances séparées.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Un parcours coûte un peu plus cher que la somme des séances unitaires. Voici pourquoi — et pourquoi beaucoup de clientes le redemandent ensuite.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whyPremium.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="rounded-3xl border border-border-soft bg-bg-card p-7 h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-4">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl text-text-deep leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-medium leading-relaxed">{p.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        {/* SacredBackdrop retiré Sprint D */}
        <Container className="relative">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center space-y-5">
              <span className="text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft flex items-center justify-center gap-3">
                <Calendar className="h-3.5 w-3.5" />
                Démarrer
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-text-on-dark">
                Le premier pas est gratuit.
              </h2>
              <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg">
                Le bilan « La boussole » + un échange préalable de 30 min avec Céline. Sans engagement, sans vente forcée. Au bout, vous saurez si l&apos;un des trois parcours est juste pour vous — ou si une autre orientation l&apos;est davantage.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors"
                >
                  <Compass className="h-4 w-4" />
                  Faire mon bilan
                </Link>
                <WhatsAppButton message="Bonjour Céline, j'aimerais en savoir plus sur les parcours 3 mois.">
                  Échanger sur WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de demander un échange.
              </h2>
            </div>
            <div className="space-y-3">
              {faq.map((item) => (
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

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-8 md:p-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Ailleurs sur le site</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Le Cercle Etincel,{" "}
                  <span className="font-display-italic text-gold-deep">
                    inclus dans tous les parcours.
                  </span>
                </h2>
                <p className="text-text-medium leading-relaxed">
                  L&apos;abonnement Studio (méditations, cercles live mensuels, communauté tenue par Céline) est inclus pendant la durée de votre parcours. Découvrez ce qu&apos;il contient.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/le-cercle" className="btn-primary w-full justify-center">
                  Découvrir Le Cercle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/retraites" className="btn-secondary w-full justify-center">
                  <Mountain className="h-4 w-4" />
                  Voir les retraites
                </Link>
                <Link href="/tarifs" className="btn-secondary w-full justify-center">
                  <Users className="h-4 w-4" />
                  Tous les tarifs
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
