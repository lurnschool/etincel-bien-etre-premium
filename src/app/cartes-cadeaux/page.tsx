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
  CreditCard,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { Etincelle } from "@/components/ui/Etincelle";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  GiftCardPreview,
  type GiftCardData,
  type GiftCardStyle,
  giftCardStyles,
} from "@/components/giftcard/GiftCardPreview";
import { cn } from "@/lib/utils";
import { whatsappMessages } from "@/lib/whatsapp";
import { createCheckoutSession, generateOrderRef, findProduct } from "@/lib/stripeProducts";
import { useCart } from "@/lib/cart";
import { submitContact } from "@/lib/contactClient";

type GiftType = {
  id: string;
  icon: typeof Heart;
  label: string;
  description: string;
  price: string;
  defaultStyle: GiftCardStyle;
  cardLabel: string;
  productId: string;
};

const giftTypes: GiftType[] = [
  {
    id: "constellation",
    icon: Calendar,
    label: "Constellation familiale",
    description: "Constellation familiale ou Rebirth de naissance.",
    price: "95 €",
    defaultStyle: "feminin",
    cardLabel: "Une constellation",
    productId: "carte-cadeau-constellation-95",
  },
  {
    id: "cacao",
    icon: Sparkles,
    label: "Cérémonie cacao",
    description: "Cérémonie cacao sensorielle et symbolique.",
    price: "Tarif selon événement ou format",
    defaultStyle: "cacao",
    cardLabel: "Une cérémonie cacao",
    productId: "carte-cadeau-cacao",
  },
  {
    id: "feminin",
    icon: Heart,
    label: "Accompagnement féminin",
    description: "Cercle ou accompagnement individuel autour du féminin sacré.",
    price: "Sur demande",
    defaultStyle: "feminin",
    cardLabel: "Un accompagnement féminin",
    productId: "carte-cadeau-libre",
  },
  {
    id: "corps",
    icon: Mountain,
    label: "Expérience corporelle",
    description: "Innerdance, breathwork ou pratiques de souffle.",
    price: "À partir de 90 €",
    defaultStyle: "retraite",
    cardLabel: "Une expérience corporelle",
    productId: "carte-cadeau-soin-90",
  },
  {
    id: "retraite",
    icon: Mountain,
    label: "Retraite / immersion",
    description: "Une journée, un week-end ou un séjour long en petit groupe.",
    price: "À partir de 180 €",
    defaultStyle: "retraite",
    cardLabel: "Une retraite",
    productId: "carte-cadeau-libre",
  },
  {
    id: "numerologie",
    icon: Heart,
    label: "Numérologie · lecture symbolique",
    description: "Lecture des cycles, des ressources et de la lignée.",
    price: "110 €",
    defaultStyle: "elegance",
    cardLabel: "Une lecture numérologique",
    productId: "carte-cadeau-numerologie-110",
  },
  {
    id: "libre",
    icon: Gift,
    label: "Montant libre",
    description: "À utiliser librement sur l'ensemble de l'accompagnement.",
    price: "Vous choisissez",
    defaultStyle: "doree",
    cardLabel: "Une parenthèse",
    productId: "carte-cadeau-libre",
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
  { num: "02", label: "Validez & payez", description: "Paiement sécurisé Stripe ou règlement manuel avec Céline." },
  { num: "03", label: "Carte définitive", description: "Une fois payé, la carte est générée avec sa référence officielle." },
  { num: "04", label: "Réception", description: "Carte téléchargeable et envoyée par email à votre proche." },
];

export default function CartesCadeauxPage() {
  const [step, setStep] = useState<"choisir" | "personnaliser" | "valider" | "succes">("choisir");
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
  const [orderRef, setOrderRef] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<"stripe" | "manual" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    consent: false,
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

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

  const downloadFinalPng = async () => {
    if (!finalRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(finalRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `carte-cadeau-etincel-${orderRef || "carte"}.png`
        .toLowerCase()
        .replace(/\s+/g, "-");
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur export PNG", err);
    }
  };

  const { addItem, open: openCart } = useCart();
  const [stripeError, setStripeError] = useState<string | null>(null);

  const customAmountCents = (() => {
    if (!selectedType) return undefined;
    const product = findProduct(selectedType.productId);
    if (!product || product.metadata.customAmount !== "true") return undefined;
    const numeric = parseInt(data.amount.replace(/[^0-9]/g, ""), 10);
    if (Number.isFinite(numeric) && numeric >= 1) return numeric * 100;
    return undefined;
  })();

  const giftNote = (() => {
    if (!selectedType) return undefined;
    const parts = [
      data.toName ? `Pour : ${data.toName}` : null,
      data.fromName ? `De : ${data.fromName}` : null,
      data.message ? `Message : ${data.message}` : null,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" · ") : undefined;
  })();

  const handleAddToCart = () => {
    if (!selectedType) return;
    addItem({
      productId: selectedType.productId,
      quantity: 1,
      customAmountCents,
      noteToCeline: giftNote,
    });
    openCart();
  };

  const handleStripePay = async () => {
    if (!selectedType || !contactInfo.email || !contactInfo.consent) return;
    setProcessing(true);
    setPaymentMode("stripe");
    setStripeError(null);
    const res = await createCheckoutSession(
      [
        {
          productId: selectedType.productId,
          quantity: 1,
          customAmountCents,
          noteToCeline: giftNote,
        },
      ],
      {
        contact: {
          email: contactInfo.email,
          phone: contactInfo.phone,
          firstname: data.fromName,
        },
        metadata: {
          flow: "carte-cadeau",
          gift_type: selectedType.id,
          to_name: data.toName.slice(0, 80),
          occasion: data.occasion.slice(0, 80),
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
        ? "Le paiement Stripe n'est pas encore activé sur cet hébergement. Continuez avec Céline ci-dessous — votre carte cadeau lui est transmise."
        : res.error,
    );
  };

  const handleManualRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !contactInfo.email || !contactInfo.consent) return;
    setPaymentMode("manual");
    const ref = generateOrderRef("DEM");
    setOrderRef(ref);
    // L'envoi email est best-effort — le succès UI passe quoi qu'il arrive
    // car la carte cadeau brouillon est déjà téléchargeable côté client.
    void submitContact({
      intent: "gift-card-manual",
      contact: {
        firstname: data.fromName,
        email: contactInfo.email,
        phone: contactInfo.phone,
      },
      fields: {
        Référence: ref,
        Cadeau: selectedType.label,
        "Pour": data.toName,
        "Montant": data.amount,
        Occasion: data.occasion,
        Style: data.style,
      },
      message: data.message,
    });
    setStep("succes");
  };

  return (
    <>
      <PageRefugeHero
        eyebrow="Offrir un moment"
        greeting="Une attention douce."
        title={
          <>
            Préparer une carte pour quelqu&apos;un que vous{" "}
            <EtincelleAccent variant="letter">aimez</EtincelleAccent>.
          </>
        }
        body="Une carte préparée avec soin, pour offrir une séance, un cercle, une retraite — ou simplement un montant libre. Imprimable, signée par Céline."
        primaryCta={{ label: "Commencer", href: "#choisir" }}
        secondaryCta={{ label: "Poser une question", href: "https://wa.me/33627438104" }}
        visualId="cartes-hero"
        variant="gift"
      />

      <section className="bg-bg-soft border-y border-border-soft">
        <Container>
          <div className="py-6 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {(["choisir", "personnaliser", "valider", "succes"] as const).map((s, i) => {
              const isActive = step === s;
              const idx = ["choisir", "personnaliser", "valider", "succes"].indexOf(step);
              const isPast = i < idx;
              const labels = {
                choisir: "Choisir",
                personnaliser: "Personnaliser",
                valider: "Payer",
                succes: "Carte finale",
              } as const;
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
                    {labels[s]}
                  </span>
                  {i < 3 && <span className="hidden md:block h-px w-12 bg-border-medium" />}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="choisir" className="py-20 md:py-28 scroll-mt-24">
        <Container>
          <AnimatePresence mode="wait">
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
                  <div className="lg:sticky lg:top-28 space-y-4">
                    <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep flex items-center gap-2">
                      <Sparkles className="h-3 w-3" />
                      Aperçu en direct · {selectedType.label}
                    </span>
                    <GiftCardPreview ref={previewRef} data={data} watermark />
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
                    <p className="text-[0.72rem] text-text-soft leading-relaxed pt-1">
                      Filigrane « Aperçu » présent sur cette étape — il disparaît une fois la commande validée.
                    </p>
                    <WhatsAppButton
                      message={whatsappMessages.carteCadeau}
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                    >
                      Une question ? Échanger sur WhatsApp
                    </WhatsAppButton>
                  </div>

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
                      Continuer vers le paiement
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

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

                <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start max-w-5xl mx-auto">
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

                  <div className="space-y-6">
                    <div className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-8 space-y-5">
                      <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                        <Send className="h-3.5 w-3.5" />
                        <span>Vos coordonnées (carte envoyée à cette adresse)</span>
                      </div>
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
                          J&apos;accepte que Céline conserve mes coordonnées pour finaliser et envoyer cette carte cadeau.
                        </span>
                      </label>
                    </div>

                    <div className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-7 md:p-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-accent-deep" />
                        <p className="font-display text-xl text-text-deep">
                          Paiement sécurisé en ligne
                        </p>
                      </div>
                      <p className="text-sm text-text-medium leading-relaxed">
                        Réglez par carte bancaire via Stripe. Vous recevez la carte définitive et sa référence par email immédiatement après le paiement.
                      </p>
                      <button
                        onClick={handleStripePay}
                        disabled={processing || !contactInfo.email || !contactInfo.consent}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processing && paymentMode === "stripe" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Redirection vers Stripe…
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4" />
                            Payer maintenant — {selectedType.price}
                          </>
                        )}
                      </button>
                      <p className="text-[0.7rem] text-text-soft leading-relaxed">
                        Paiement 3D Secure · cartes Visa, MasterCard, Amex acceptées · facturation immédiate.
                      </p>
                      {stripeError && (
                        <div className="rounded-2xl border border-gold-soft/60 bg-bg-soft p-4 text-xs text-text-medium leading-relaxed">
                          {stripeError}
                        </div>
                      )}
                    </div>

                    <div className="rounded-3xl border border-border-soft bg-bg-card p-7 space-y-4">
                      <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-text-soft">
                        <span className="h-px flex-1 bg-border-soft" />
                        <span>OU</span>
                        <span className="h-px flex-1 bg-border-soft" />
                      </div>
                      <p className="font-display text-lg text-text-deep">
                        Ajouter au panier ou régler avec Céline
                      </p>
                      <p className="text-sm text-text-medium leading-relaxed">
                        Vous voulez offrir plusieurs cartes, ou la combiner avec une séance ? Ajoutez au panier puis finalisez l&apos;ensemble. Sinon, virement, espèces ou chèque — Céline vous recontacte personnellement.
                      </p>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="btn-primary w-full justify-center"
                      >
                        Ajouter au panier
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <form onSubmit={handleManualRequest} className="space-y-3">
                        <button
                          type="submit"
                          disabled={!contactInfo.email || !contactInfo.consent}
                          className="btn-secondary w-full justify-center disabled:opacity-50"
                        >
                          <Send className="h-4 w-4" />
                          Envoyer ma demande à Céline
                        </button>
                      </form>
                      <WhatsAppButton
                        message={whatsappMessages.carteCadeau}
                        className="w-full justify-center"
                      >
                        Continuer sur WhatsApp
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "succes" && selectedType && (
              <motion.div
                key="succes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-10 max-w-5xl mx-auto"
              >
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-text-deep leading-tight">
                    {paymentMode === "stripe"
                      ? "Paiement validé. Voici votre carte définitive."
                      : "Demande envoyée. Céline confirmera après réception du règlement."}
                  </h2>
                  <p className="text-text-medium leading-relaxed">
                    Référence : <span className="font-mono font-medium text-text-deep">{orderRef}</span>
                  </p>
                  <p className="text-sm text-text-soft leading-relaxed">
                    {paymentMode === "stripe"
                      ? "La carte ci-dessous est valide. Une copie est envoyée à votre email et à celui de Céline."
                      : "La carte définitive (sans filigrane) sera générée dès que Céline aura validé votre règlement."}
                  </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
                  <div ref={finalRef} className="lg:sticky lg:top-28">
                    <GiftCardPreview
                      data={{
                        ...data,
                        occasion: orderRef,
                      }}
                      watermark={paymentMode !== "stripe"}
                    />
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-7 space-y-4">
                      <p className="font-display text-2xl text-text-deep">
                        Que faire maintenant ?
                      </p>
                      {paymentMode === "stripe" ? (
                        <>
                          <button
                            onClick={downloadFinalPng}
                            className="btn-primary w-full justify-center"
                          >
                            <Download className="h-4 w-4" />
                            Télécharger la carte définitive
                          </button>
                          <p className="text-xs text-text-soft leading-relaxed">
                            Imprimez la carte ou transférez-la à votre proche par email/SMS. Sa référence ({orderRef}) la rend valable lors de la prise de rendez-vous avec Céline.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-text-medium leading-relaxed">
                            Céline reçoit votre commande avec votre référence. Une fois le règlement confirmé (virement / espèces / chèque), elle vous envoie la carte définitive téléchargeable.
                          </p>
                          <WhatsAppButton
                            message={`${whatsappMessages.carteCadeau} Référence : ${orderRef}.`}
                            className="w-full justify-center"
                          >
                            Confirmer le règlement sur WhatsApp
                          </WhatsAppButton>
                        </>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Link href="/" className="btn-secondary w-full justify-center">
                        Retour à l&apos;accueil
                      </Link>
                      <button
                        onClick={() => {
                          setStep("choisir");
                          setSelectedType(null);
                          setData({
                            fromName: "",
                            toName: "",
                            message: "",
                            cardType: "",
                            amount: "",
                            occasion: "",
                            style: "doree",
                          });
                          setContactInfo({ email: "", phone: "", consent: false });
                          setOrderRef("");
                          setPaymentMode(null);
                        }}
                        className="btn-secondary w-full justify-center"
                      >
                        Préparer une autre carte
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

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
