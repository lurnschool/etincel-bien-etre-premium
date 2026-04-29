import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Heart, Users, Mountain, User, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { SmartImage } from "@/components/ui/SmartImage";
import { ImageMosaic } from "@/components/ui/ImageMosaic";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SacredBackdrop } from "@/components/ornaments/SacredBackdrop";
import { accompagnementsIndividuels, whisperLines, disclaimers } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";
import { pageVisuals } from "@/lib/visualAssetMap";

export const metadata: Metadata = {
  title: "Cérémonie cacao",
  description:
    "Une expérience symbolique et sensorielle autour du cacao, pensée comme un espace de présence, d'ouverture du cœur et de partage — en individuel, en cercle ou en retraite. Bordeaux & Gironde.",
};

const cacao = accompagnementsIndividuels.find((p) => p.slug === "cacao-rituel")!;

// Données internes — ancien tarif observé sur le site original :
// 40 € ou 60 € selon événement (à confirmer avec Céline avant publication
// d'un montant ferme). Affichage public : "Tarif selon événement ou format".

const pourQui = [
  "Personnes en recherche de présence et de ralentissement",
  "Femmes qui souhaitent se relier au féminin sacré",
  "Curieuses et curieux d'un rituel sensoriel doux",
  "Personnes en transition souhaitant ouvrir un espace symbolique",
  "Groupes (entreprises, équipes, cercles) demandant une parenthèse alignée",
];

const formats = [
  {
    icon: User,
    title: "Rituel individuel",
    description:
      "Une cérémonie à deux pour un cheminement intime et sur-mesure, ajustée à votre intention du jour.",
    duration: "1h30 à 2h",
    price: "Tarif selon événement ou format",
    href: "/contact?sujet=Rituel%20cacao%20individuel",
    cta: "Demander une date",
  },
  {
    icon: Users,
    title: "Cercle cacao",
    description:
      "Un cercle confidentiel, en petit groupe, qui ouvre un espace de partage en présence — souvent en lien avec un thème ou un cycle.",
    duration: "2h à 3h",
    price: "Tarif selon événement ou format",
    href: "/contact?sujet=Cercle%20cacao",
    cta: "M'inscrire au prochain cercle",
  },
  {
    icon: Mountain,
    title: "Cacao en retraite",
    description:
      "Une cérémonie intégrée à un temps long de retraite immersive — souffle, féminin sacré, silence, nature.",
    duration: "Inclus dans la retraite",
    price: "Compris dans le tarif de la retraite",
    href: "/retraites",
    cta: "Voir les retraites",
  },
];

const deroule = [
  "Accueil dans un espace tenu (yourte, salle dédiée ou nature)",
  "Pose de l'intention et invitation à la présence",
  "Préparation et partage du cacao en pleine conscience",
  "Temps de présence — souffle, mouvement, silence ou parole, selon le cercle",
  "Intégration et clôture du rituel",
];

const faq = [
  {
    q: "Quel est le tarif d'une cérémonie cacao ?",
    a: "Le tarif dépend du format (individuel, cercle, retraite), du lieu et de la durée. Céline construit chaque cérémonie sur mesure — contactez-la directement pour recevoir une proposition adaptée.",
  },
  {
    q: "Quelle quantité de cacao est consommée ?",
    a: "Une dose cérémonielle, douce, qui ouvre l'écoute sans altération psychique. Le cacao utilisé est cru, non sucré, en provenance d'origine équitable.",
  },
  {
    q: "Y a-t-il des contre-indications ?",
    a: "Oui. Les personnes sous antidépresseurs (notamment IMAO ou ISRS), avec une condition cardiaque ou enceintes doivent demander un avis médical avant la cérémonie. Un échange préalable avec Céline est systématique pour valider votre participation.",
  },
  {
    q: "Faut-il avoir déjà pratiqué un rituel ?",
    a: "Non. Les cérémonies sont ouvertes aux personnes débutantes comme expérimentées. Céline tient l'espace pour que chacun·e puisse simplement être présent·e à ce qui se passe.",
  },
  {
    q: "Puis-je organiser une cérémonie pour mon équipe ou mon groupe ?",
    a: "Oui — Céline propose des cercles cacao sur-mesure pour des entreprises, des équipes ou des collectifs. Le format, la durée et le lieu sont définis ensemble.",
  },
  {
    q: "Comment se passe la réservation ?",
    a: "Vous prenez contact via le formulaire, WhatsApp ou téléphone. Céline vous propose un échange préalable pour valider l'intention puis confirme la date et les modalités.",
  },
];

const cacaoMosaic = pageVisuals.cacao;

export default function CacaoPage() {
  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Pilier · Cacao sacré"
        title={
          <>
            Le cacao comme{" "}
            <span className="font-display-italic text-gold-gradient">
              cérémonie du cœur
            </span>
          </>
        }
        description={cacao.pitch}
      />

      <section className="relative section overflow-hidden">
        <SacredBackdrop variant="cacao" />
        <WhisperLine text={whisperLines[13]} position="left" tone="gold" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
            <Reveal>
              <div className="space-y-10">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <span className="text-gold">
                      <Etincelle size={12} />
                    </span>
                    <span>L'intention</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    Une expérience symbolique, sensorielle et profondément humaine.
                  </h2>
                  <div className="space-y-4 text-text-medium leading-relaxed">
                    <p>
                      Le cacao est ici utilisé comme une plante alliée, dans une intention de présence et d&apos;ouverture du cœur. Le rituel se déroule dans un espace tenu, à votre rythme, en individuel ou en cercle.
                    </p>
                    <p>
                      Il ne s&apos;agit ni d&apos;un soin médical, ni d&apos;une promesse de guérison — mais d&apos;un temps de pause profond pour ralentir, écouter, déposer.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Heart className="h-3.5 w-3.5" />
                    <span>Pour qui ?</span>
                  </div>
                  <ul className="space-y-2">
                    {pourQui.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-text-medium"
                      >
                        <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={12} />
                    <span>Le déroulé indicatif</span>
                  </div>
                  <ol className="space-y-3">
                    {deroule.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-4 text-text-medium"
                      >
                        <span className="font-display-italic text-gold-deep tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-text-soft italic">
                    Déroulé indicatif — chaque cérémonie s&apos;adapte au cadre, au groupe et à l&apos;intention du jour.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <SmartImage
                {...cacaoMosaic[0]}
                ratio="portrait"
                className="lg:sticky lg:top-28"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="formats" className="section bg-bg-soft relative overflow-hidden">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <Etincelle size={12} />
                <span>Formats & investissement</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Trois manières de vivre le cacao.
              </h2>
              <p className="text-text-medium leading-relaxed">
                Chaque cérémonie est construite sur-mesure. Le tarif tient compte du format, de la durée, du lieu et du nombre de participant·e·s — Céline vous propose un devis clair après un premier échange.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {formats.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="group flex h-full flex-col gap-4 rounded-3xl border border-border-soft bg-bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-2xl leading-tight text-text-deep">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-medium leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <dl className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-border-soft">
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Durée</dt>
                      <dd className="font-display text-sm text-text-deep">{p.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-text-soft uppercase tracking-[0.18em] mb-0.5">Tarif</dt>
                      <dd className="font-display text-sm text-text-deep">{p.price}</dd>
                    </div>
                  </dl>
                  <Link
                    href={p.href}
                    className="inline-flex items-center justify-between gap-2 rounded-full bg-accent-deep px-4 py-2.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                  >
                    {p.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <ImageMosaic
              items={cacaoMosaic.length >= 2 ? [cacaoMosaic[0], cacaoMosaic[1], cacaoMosaic[0]] : pageVisuals.home}
              layout="trio"
            />
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-deep text-text-on-dark relative overflow-hidden">
        <SacredBackdrop variant="cacao" intensity="medium" />
        <Container className="relative">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <Etincelle size={12} />
                  <span>Précautions</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-on-dark">
                  Quelques repères avant de venir.
                </h2>
                <p className="text-text-on-dark-soft leading-relaxed">
                  Le cacao cérémoniel est consommé en très petite quantité. Un échange préalable est systématique pour vérifier que la pratique vous convient.
                </p>
              </div>
              <ul className="space-y-3 text-text-on-dark-soft">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Personnes sous antidépresseurs (notamment IMAO ou ISRS) : un avis médical est nécessaire.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Conditions cardiaques connues : un avis médical est nécessaire.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Grossesse : modalités à confirmer avec Céline.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-1.5 text-gold"><Etincelle size={10} /></span>
                  Aucune promesse de soin médical, gynécologique ou psychologique.
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Questions fréquentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Avant de vous inscrire.
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

      <section className="section">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-10 md:p-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Réserver une cérémonie</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                  Vivre une{" "}
                  <span className="font-display-italic text-gold-deep">
                    cérémonie cacao
                  </span>
                  .
                </h2>
                <p className="text-text-medium leading-relaxed max-w-xl">
                  Trois manières d&apos;avancer : écrire à Céline pour proposer une date, faire le bilan d&apos;orientation pour vérifier que c&apos;est la pratique juste, ou échanger directement sur WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact?sujet=R%C3%A9server%20une%20c%C3%A9r%C3%A9monie%20cacao"
                  className="btn-primary w-full justify-center"
                >
                  Réserver une cérémonie
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton
                  message={whatsappMessages.cacao}
                  className="w-full justify-center"
                >
                  Échanger sur WhatsApp
                </WhatsAppButton>
                <Link href="/diagnostic" className="btn-secondary w-full justify-center">
                  Faire le bilan d&apos;orientation
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section bg-bg-soft">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-10">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Continuer l&apos;exploration
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Pratiques en résonance.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Constellations", href: "/constellations", desc: "Éclairer les liens invisibles." },
              { label: "Féminin sacré", href: "/feminin-sacre", desc: "Le corps, les cycles, l'intuition." },
              { label: "Cercles de femmes", href: "/cercles-de-femmes", desc: "Un rendez-vous mensuel en sororité." },
              { label: "Retraites", href: "/retraites", desc: "Un temps long pour se déposer." },
            ].map((l, i) => (
              <Reveal key={l.href} delay={i * 0.05}>
                <Link
                  href={l.href}
                  className="group block rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                >
                  <p className="font-display text-lg text-text-deep">{l.label}</p>
                  <p className="text-sm text-text-medium mt-1.5 leading-relaxed">{l.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent mt-3 group-hover:text-accent-deep">
                    Découvrir
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border-soft bg-bg-soft p-6 text-xs text-text-soft leading-relaxed">
              {disclaimers.bienEtre}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
