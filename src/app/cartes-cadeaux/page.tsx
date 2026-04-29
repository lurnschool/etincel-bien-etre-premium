"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Mountain,
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  Send,
  Shield,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  GiftCardPreview,
  type GiftCardData,
  type GiftCardStyle,
  giftCardStyles,
} from "@/components/giftcard/GiftCardPreview";
import { cn } from "@/lib/utils";
import { whatsappMessages } from "@/lib/whatsapp";
import { stripeEnabled } from "@/lib/stripeProducts";

type GiftType = {
  id: string;
  icon: typeof Heart;
  label: string;
  description: string;
  price: string;
  defaultStyle: GiftCardStyle;
  cardLabel: string;
};

const giftTypes: GiftType[] = [
  {
    id: "cacao",
    icon: Sparkles,
    label: "Rituel cacao",
    description: "Une cérémonie sensorielle et symbolique pour ouvrir le cœur.",
    price: "Selon événement",
    defaultStyle: "cacao",
    cardLabel: "Une cérémonie cacao",
  },
  {
    id: "numerologie",
    icon: Heart,
    label: "Lecture numérologie",
    description: "Une lecture symbolique des cycles et ressources.",
    price: "110 €",
    defaultStyle: "elegance",
    cardLabel: "Une lecture numérologique",
  },
  {
    id: "constellation",
    icon: Calendar,
    label: "Constellation",
    description: "Familiale ou de naissance Rebirth.",
    price: "95 €",
    defaultStyle: "feminin",
    cardLabel: "Une constellation",
  },
  {
    id: "soin",
    icon: Heart,
    label: "Massage / soin énergétique",
    description: "Hypnose, CellRelease, massage, réflexologie.",
    price: "À partir de 90 €",
    defaultStyle: "doree",
    cardLabel: "Un soin énergétique",
  },
  {
    id: "collectif",
    icon: Mountain,
    label: "Expérience collective",
    description: "Cercle de femmes, breathwork, innerdance.",
    price: "Sur demande",
    defaultStyle: "retraite",
    cardLabel: "Une expérience collective",
  },
  {
    id: "libre",
    icon: Gift,
    label: "Montant libre",
    description: "À utiliser librement sur l'ensemble des accompagnements.",
    price: "Vous choisissez",
    defaultStyle: "doree",
    cardLabel: "Une parenthèse",
  },
];

const messageSuggestions = [
  "Une parenthèse, parce que tu le mérites.",
  "Un moment pour toi, à ton rythme.",
  "Reviens à toi. Je t'accompagne.",
  "Pour ralentir et se déposer.",
  "Un espace pour ton souffle, ton corps, ton cœur.",
  "Que cette pause te ramène à l'essentiel.",
  "Avec toute ma tendresse, en chemin avec toi.",
  "Pour fêter cette nouvelle étape de ta vie.",
];

const steps = [
  { num: "01", label: "Personnalisez", description: "Choisissez le cadeau, le style, écrivez votre message." },
  { num: "02", label: "Envoyez la demande", description: "Téléchargez l'aperçu, transmettez à Céline." },
  { num: "03", label: "Céline valide", description: "Échange court pour confirmer modalités et règlement." },
  { num: "04", label: "Réception", description: "Carte personnalisée envoyée par email ou imprimée." },
];

export default function CartesCadeauxPage() {
  const [step, setStep] = useState<"choisir" | "personnaliser" | "valider">("choisir");
  const [selectedType, setSelectedType] = useState<GiftType | null>(null);
  const [data, setData] = useState<GiftCardData>({
    fromName: "",
    toName: "",
    message: "",
    cardType: "",
    amount: "",
    occasion: "",
    style: "doree",
  });
  const [requestSent, setRequestSent] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    consent: false,
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const selectGift = (g: GiftType) => {
    setSelectedType(g);
    setData((d) => ({
      ...d,
      cardType: g.cardLabel,
      amount: g.price,
      style: g.defaultStyle,
    }));
    setStep("personnaliser");
  };

  const update = <K extends keyof GiftCardData>(key: K, value: GiftCardData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const downloadPng = async () => {
    if (!previewRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `carte-cadeau-etincel-${data.toName || "carte"}.png`
        .toLowerCase()
        .replace(/\s+/g, "-");
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur export PNG", err);
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.email || !contactInfo.consent) return;
    setRequestSent(true);
  };

  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Cartes cadeaux"
        title={
          <>
            Offrir une{" "}
            <span className="font-display-italic text-gold-deep">parenthèse</span>{" "}
            de reconnexion.
          </>
        }
        description="Une carte cadeau personnalisée pour offrir un moment sensible — séance, rituel, cercle ou montant libre."
      />

      {/* Indicateur d'étapes */}
      <section className="bg-bg-soft border-y border-border-soft">
        <Container>
          <div className="py-6 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {(["choisir", "personnaliser", "valider"] as const).map((s, i) => {
              const isActive = step === s;
              const isPast =
                (step === "personnaliser" && s === "choisir") ||
                (step === "valider" && (s === "choisir" || s === "personnaliser"));
              return (
                <div key={s} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-display-italic text-[0.85rem] tabular-nums",
                      isActive
                        ? "text-gold-deep"
                        : isPast
                        ? "text-text-medium"
                        : "text-text-soft/50",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-base md:text-lg",
                      isActive
                        ? "text-text-deep"
                        : isPast
                        ? "text-text-medium"
                        : "text-text-soft/50",
                    )}
                  >
                    {s === "choisir" ? "Choisir" : s === "personnaliser" ? "Personnaliser" : "Valider"}
                  </span>
                  {i < 2 && (
                    <span className="hidden md:block h-px w-12 bg-border-medium" />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contenu */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimatePresence mode="wait">
            {/* ÉTAPE 1 — Choix */}
            {step === "choisir" && (
              <motion.div
                key="choisir"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Reveal>
                  <div className="max-w-2xl space-y-4 mb-12">
                    <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                      <Etincelle size={11} />
                      Étape 1 — Que souhaitez-vous offrir ?
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                      Six manières d&apos;offrir un moment.
                    </h2>
                  </div>
                </Reveal>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {giftTypes.map((g, i) => (
                    <Reveal key={g.id} delay={i * 0.05}>
                      <button
                        onClick={() => selectGift(g)}
                        className="group w-full text-left flex h-full flex-col rounded-3xl border border-border-soft bg-bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-[0_24px_60px_rgba(31,26,46,0.08)]"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep mb-5">
                          <g.icon className="h-4 w-4" />
                        </div>
                        <h3 className="font-display text-2xl text-text-deep mb-2 leading-tight">
                          {g.label}
                        </h3>
                        <p className="text-sm text-text-medium leading-relaxed flex-1">
                          {g.description}
                        </p>
                        <div className="mt-6 pt-6 border-t border-border-soft flex items-center justify-between">
                          <span className="font-display text-base text-gold-deep">
                            {g.price}
                          </span>
                          <ArrowRight className="h-4 w-4 text-text-soft transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ÉTAPE 2 — Personnaliser */}
            {step === "personnaliser" && selectedType && (
              <motion.div
                key="personnaliser"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <button
                  onClick={() => setStep("choisir")}
                  className="text-sm text-text-medium hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  ← Changer de cadeau
                </button>

                <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] items-start">
                  {/* Aperçu */}
                  <div className="lg:sticky lg:top-28 space-y-4">
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep flex items-center gap-2">
                      <Sparkles className="h-3 w-3" />
                      Aperçu en direct · {selectedType.label}
                    </span>
                    <GiftCardPreview ref={previewRef} data={data} />
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(giftCardStyles) as GiftCardStyle[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => update("style", s)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-[0.72rem] transition-all",
                            data.style === s
                              ? "border-accent bg-accent text-text-on-dark"
                              : "border-border-medium text-text-deep hover:border-accent",
                          )}
                        >
                          {giftCardStyles[s].label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={downloadPng}
                      className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger l&apos;aperçu PNG
                    </button>
                  </div>

                  {/* Formulaire */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.24em] text-text-soft">
                        De la part de
                      </label>
                      <input
                        value={data.fromName}
                        onChange={(e) => update("fromName", e.target.value)}
                        placeholder="Votre prénom"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.24em] text-text-soft">
                        Pour
                      </label>
                      <input
                        value={data.toName}
                        onChange={(e) => update("toName", e.target.value)}
                        placeholder="Prénom du / de la bénéficiaire"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.24em] text-text-soft">
                        Message personnel
                      </label>
                      <textarea
                        value={data.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={3}
                        maxLength={200}
                        placeholder="Une parenthèse, parce que tu le mérites…"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {messageSuggestions.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => update("message", m)}
                            className="text-[0.7rem] rounded-full border border-border-soft bg-bg-soft px-3 py-1 text-text-soft hover:border-accent hover:text-accent transition-colors"
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedType.id === "libre" && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.24em] text-text-soft">
                          Montant
                        </label>
                        <input
                          value={data.amount}
                          onChange={(e) => update("amount", e.target.value)}
                          placeholder="Ex : 80 €, 120 €…"
                          className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>
                    )}

                    <button
                      onClick={() => setStep("valider")}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ÉTAPE 3 — Valider */}
            {step === "valider" && selectedType && (
              <motion.div
                key="valider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  onClick={() => setStep("personnaliser")}
                  className="text-sm text-text-medium hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
                >
                  ← Modifier la carte
                </button>

                {requestSent ? (
                  <div className="max-w-2xl mx-auto text-center space-y-5 rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-12">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl text-text-deep leading-tight">
                      Demande envoyée à Céline.
                    </h2>
                    <p className="text-text-medium leading-relaxed max-w-lg mx-auto">
                      Céline reçoit votre carte avec votre message et vos coordonnées. Elle vous recontactera personnellement pour finaliser le règlement et la livraison.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center pt-4">
                      <WhatsAppButton message={whatsappMessages.carteCadeau}>
                        Échanger directement sur WhatsApp
                      </WhatsAppButton>
                      <Link href="/" className="btn-secondary">
                        Retour à l&apos;accueil
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start max-w-5xl mx-auto">
                    {/* Récap */}
                    <div className="space-y-5 lg:sticky lg:top-28">
                      <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                        Récapitulatif
                      </span>
                      <div className="rounded-2xl border border-border-soft bg-bg-card p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <selectedType.icon className="h-5 w-5 text-gold-deep mt-1 shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-text-soft mb-1">Cadeau</p>
                            <p className="font-display text-xl text-text-deep">{selectedType.label}</p>
                            <p className="text-sm text-text-medium">{selectedType.price}</p>
                          </div>
                        </div>
                        <div className="border-t border-border-soft pt-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-text-soft">De</span><span className="text-text-deep">{data.fromName || "—"}</span></div>
                          <div className="flex justify-between"><span className="text-text-soft">Pour</span><span className="text-text-deep">{data.toName || "—"}</span></div>
                          <div className="flex justify-between"><span className="text-text-soft">Style</span><span className="text-text-deep">{giftCardStyles[data.style].label}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Validation */}
                    <div className="space-y-6">
                      <div className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8 space-y-5">
                        <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                          <Send className="h-3.5 w-3.5" />
                          <span>Étape finale — vos coordonnées</span>
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl text-text-deep leading-tight">
                          Céline finalise avec vous.
                        </h2>
                        <p className="text-sm text-text-medium leading-relaxed">
                          Laissez-nous votre email — Céline vous recontacte pour valider le règlement et préparer la carte.
                        </p>
                        <form onSubmit={handleSendRequest} className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={contactInfo.email}
                              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                              className="bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                            />
                            <input
                              type="tel"
                              placeholder="Téléphone (optionnel)"
                              value={contactInfo.phone}
                              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                              className="bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                            />
                          </div>
                          <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer">
                            <input
                              type="checkbox"
                              required
                              checked={contactInfo.consent}
                              onChange={(e) => setContactInfo({ ...contactInfo, consent: e.target.checked })}
                              className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                            />
                            <span>
                              J&apos;accepte que Céline me recontacte pour finaliser cette carte cadeau. Mes données ne sont pas transmises à des tiers.
                            </span>
                          </label>
                          <button type="submit" className="btn-primary w-full">
                            <Send className="h-4 w-4" />
                            Envoyer ma demande à Céline
                          </button>
                        </form>
                      </div>

                      {/* WhatsApp + Stripe */}
                      <div className="rounded-3xl border border-[#25D366]/30 bg-[#25D366]/5 p-7 space-y-4">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#1ebe5a]">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Plus rapide</span>
                        </div>
                        <p className="font-display text-xl text-text-deep">
                          Finaliser directement avec Céline sur WhatsApp
                        </p>
                        <WhatsAppButton message={whatsappMessages.carteCadeau} className="w-full justify-center">
                          Continuer sur WhatsApp
                        </WhatsAppButton>
                      </div>

                      {!stripeEnabled && (
                        <p className="flex items-start gap-3 text-xs text-text-soft leading-relaxed border border-border-soft bg-bg-soft rounded-2xl p-4">
                          <Shield className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>
                            Le paiement en ligne sécurisé sera disponible prochainement. Pour l&apos;instant, le règlement se fait directement avec Céline (virement, espèces, chèque).
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Comment ça marche */}
      <section id="formats" className="bg-bg-soft py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-2xl space-y-4 mb-14">
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Comment ça marche
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                Quatre étapes simples.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.05}>
                <article className="relative">
                  <span className="font-display-italic text-3xl text-gold-deep/40">
                    {s.num}
                  </span>
                  <h3 className="font-display text-xl text-text-deep mt-2">{s.label}</h3>
                  <p className="text-sm text-text-medium mt-2 leading-relaxed">{s.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
