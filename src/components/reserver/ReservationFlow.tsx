"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Phone,
  Send,
  Shield,
  User,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappLink } from "@/lib/whatsapp";
import { createCheckoutSession, generateOrderRef } from "@/lib/stripeProducts";
import { useCart } from "@/lib/cart";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { submitContact } from "@/lib/contactClient";
import { getCalendlyUrl, isCalendlyEnabled } from "@/lib/booking";
import { CalendlyInline } from "@/components/reserver/CalendlyInline";
import { cn } from "@/lib/utils";

export type ReservationPractice = {
  slug: string;
  name: string;
  family: string;
  duration: string;
  price: string;
  format: string;
  pitch: string;
  productId: string;
  whatsappMessage: string;
  disclaimer?: string;
};

const slots = [
  { value: "matin-1", label: "Matin (9h-12h)" },
  { value: "midi", label: "Midi (12h-14h)" },
  { value: "apres-midi", label: "Après-midi (14h-18h)" },
  { value: "soir", label: "Soir (18h-20h)" },
  { value: "flexible", label: "Je suis flexible" },
];

const lieux = [
  { value: "taillan", label: "Le Taillan-Médoc — Cabinet principal" },
  { value: "univers-elles", label: "Univers'elles — Martignas-sur-Jalle" },
  { value: "distance", label: "À distance (visio) — selon pratique" },
  { value: "indecise", label: "Je laisse Céline me proposer" },
];

type Step = "creneau" | "coordonnees" | "paiement" | "succes";

type PaymentMode = "stripe" | "manual";

export function ReservationFlow({ practice }: { practice: ReservationPractice }) {
  const calendlyUrl = getCalendlyUrl(practice.slug);
  const calendlyActive = isCalendlyEnabled() && Boolean(calendlyUrl);
  const { open: openCart } = useCart();
  const [step, setStep] = useState<Step>("creneau");
  const [slot, setSlot] = useState({
    date: "",
    time: slots[0].value,
    lieu: lieux[0].value,
    note: "",
  });
  const [contact, setContact] = useState({
    firstname: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);
  const [processing, setProcessing] = useState(false);
  const [orderRef, setOrderRef] = useState<string>("");
  const [stripeError, setStripeError] = useState<string | null>(null);

  const slotLabel = slots.find((s) => s.value === slot.time)?.label ?? "";
  const lieuLabel = lieux.find((l) => l.value === slot.lieu)?.label ?? "";

  const isSlotValid = slot.date.length > 0;
  const isContactValid = contact.firstname && contact.email && contact.consent;

  const stripeMessage = `Bonjour Céline, je viens de réserver une séance de ${practice.name} (référence à venir). Mon créneau préféré : ${slot.date} - ${slotLabel} - ${lieuLabel}.`;
  const manualMessage = `Bonjour Céline, je souhaite réserver une séance de ${practice.name} (${practice.price}). Mon créneau préféré : ${slot.date} - ${slotLabel} - ${lieuLabel}. ${slot.note ? `Note : ${slot.note}` : ""}`;
  const noteToCeline = `${practice.name} · ${slot.date} ${slotLabel} · ${lieuLabel}${slot.note ? ` · ${slot.note}` : ""}`;

  const handleStripe = async () => {
    if (!isContactValid) return;
    setPaymentMode("stripe");
    setProcessing(true);
    setStripeError(null);
    const res = await createCheckoutSession(
      [
        {
          productId: practice.productId,
          quantity: 1,
          noteToCeline,
        },
      ],
      {
        contact: {
          firstname: contact.firstname,
          email: contact.email,
          phone: contact.phone,
        },
        metadata: {
          practice: practice.slug,
          slot_date: slot.date,
          slot_time: slot.time,
          slot_lieu: slot.lieu,
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
        ? "Le paiement Stripe n'est pas encore activé sur cet hébergement. Continuez avec Céline en un clic ci-dessous — votre récapitulatif lui est transmis."
        : res.error,
    );
  };

  const handleManual = async () => {
    if (!isContactValid) return;
    setPaymentMode("manual");
    setProcessing(true);
    const ref = generateOrderRef("RDV");
    await submitContact({
      intent: "reservation-manual",
      contact: {
        firstname: contact.firstname,
        email: contact.email,
        phone: contact.phone,
      },
      fields: {
        Référence: ref,
        Pratique: practice.name,
        Tarif: practice.price,
        Date: slot.date,
        Plage: slotLabel,
        Lieu: lieuLabel,
      },
      message: slot.note,
    });
    setProcessing(false);
    setOrderRef(ref);
    setStep("succes");
  };

  return (
    <Container size="narrow">
      {/* Récap pratique sticky */}
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
        <aside className="lg:sticky lg:top-28 self-start space-y-5">
          <div className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-6 space-y-4">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
              Votre réservation
            </p>
            <h2 className="font-display text-2xl text-text-deep leading-tight">
              {practice.name}
            </h2>
            <dl className="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-border-soft">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-text-soft mb-0.5">
                  Durée
                </dt>
                <dd className="font-display text-base text-text-deep">{practice.duration}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-text-soft mb-0.5">
                  Tarif
                </dt>
                <dd className="font-display text-base text-text-deep">{practice.price}</dd>
              </div>
            </dl>
            <p className="text-sm text-text-medium leading-relaxed pt-3 border-t border-border-soft">
              {practice.pitch}
            </p>
          </div>

          <div className="rounded-2xl border border-border-soft bg-bg-card p-5 space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep flex items-center gap-2">
              <Shield className="h-3 w-3" /> Garanties
            </p>
            <ul className="space-y-1.5 text-xs text-text-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                Paiement Stripe sécurisé · 3D Secure
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                Annulation 100% remboursée à 7 jours
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                Échange préalable systématique avec Céline
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                Confidentialité totale de vos données
              </li>
            </ul>
          </div>

          {practice.disclaimer && (
            <p className="text-[0.7rem] text-text-soft leading-relaxed border border-gold-soft/40 bg-bg-soft rounded-2xl p-4 flex gap-3">
              <Etincelle size={10} />
              {practice.disclaimer}
            </p>
          )}
        </aside>

        {/* Stepper */}
        <div className="space-y-6">
          {/* Indicator */}
          <div className="flex items-center gap-3 flex-wrap">
            {(["creneau", "coordonnees", "paiement", "succes"] as Step[]).map((s, i) => {
              const isActive = step === s;
              const idx = ["creneau", "coordonnees", "paiement", "succes"].indexOf(step);
              const isPast = i < idx;
              const labels: Record<Step, string> = {
                creneau: "Créneau",
                coordonnees: "Coordonnées",
                paiement: "Paiement",
                succes: "Confirmé",
              };
              return (
                <div key={s} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-[0.7rem] font-medium tabular-nums transition-colors",
                      isActive
                        ? "bg-accent-deep text-text-on-dark"
                        : isPast
                        ? "bg-gold-soft/60 text-gold-deep"
                        : "bg-bg-soft text-text-soft",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-text-deep" : isPast ? "text-text-medium" : "text-text-soft/60",
                    )}
                  >
                    {labels[s]}
                  </span>
                  {i < 3 && <span className="hidden sm:block h-px w-8 bg-border-medium" />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1 — Créneau */}
            {step === "creneau" && (
              <motion.div
                key="creneau"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-9 space-y-6"
              >
                <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                  <Calendar className="h-3.5 w-3.5" /> Étape 1 — Choisir mon créneau
                </div>

                {calendlyActive && calendlyUrl ? (
                  <>
                    <h3 className="font-display text-2xl md:text-3xl text-text-deep leading-tight">
                      Choisissez directement votre créneau.
                    </h3>
                    <p className="text-sm text-text-medium leading-relaxed">
                      Le calendrier ci-dessous affiche les disponibilités réelles de Céline. Réservez en un clic — confirmation immédiate par email, paiement Stripe sécurisé intégré.
                    </p>
                    <CalendlyInline
                      url={calendlyUrl}
                      prefill={{ name: contact.firstname, email: contact.email }}
                      height={680}
                    />
                    <div className="flex justify-between items-center pt-2 text-xs">
                      <Link
                        href={`/accompagnements/${practice.slug}`}
                        className="inline-flex items-center gap-1.5 text-text-medium hover:text-text-deep"
                      >
                        <ArrowLeft className="h-3 w-3" /> Retour à la pratique
                      </Link>
                      <button
                        type="button"
                        onClick={() => setStep("coordonnees")}
                        className="text-text-soft hover:text-text-deep underline-offset-2 hover:underline"
                      >
                        Préférer le règlement manuel →
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-2xl md:text-3xl text-text-deep leading-tight">
                      Indiquez votre créneau préféré.
                    </h3>
                    <p className="text-sm text-text-medium leading-relaxed">
                      Céline branchera son agenda Calendly prochainement (réservation en temps réel + paiement Stripe intégré). En attendant, indiquez-nous votre disponibilité — Céline vous propose 2 alternatives sous 24h.
                    </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Date préférée
                    </label>
                    <input
                      type="date"
                      required
                      value={slot.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setSlot({ ...slot, date: e.target.value })}
                      className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Plage horaire
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {slots.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => setSlot({ ...slot, time: s.value })}
                          className={cn(
                            "rounded-xl border px-4 py-3 text-sm text-left transition-all",
                            slot.time === s.value
                              ? "border-accent bg-accent/10 text-text-deep"
                              : "border-border-soft bg-bg-card text-text-medium hover:border-accent/50",
                          )}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Lieu préféré
                    </label>
                    <select
                      value={slot.lieu}
                      onChange={(e) => setSlot({ ...slot, lieu: e.target.value })}
                      className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      {lieux.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Note pour Céline (optionnel)
                    </label>
                    <textarea
                      rows={2}
                      value={slot.note}
                      onChange={(e) => setSlot({ ...slot, note: e.target.value })}
                      placeholder="Ce qui vous amène, une intention, une question…"
                      className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link
                    href={`/accompagnements/${practice.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-text-medium hover:text-text-deep"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour à la pratique
                  </Link>
                  <button
                    type="button"
                    onClick={() => setStep("coordonnees")}
                    disabled={!isSlotValid}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                  </>
                )}
              </motion.div>
            )}

            {/* STEP 2 — Coordonnées */}
            {step === "coordonnees" && (
              <motion.div
                key="coordonnees"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-border-soft bg-bg-card p-7 md:p-9 space-y-6"
              >
                <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                  <User className="h-3.5 w-3.5" /> Étape 2 — Vos coordonnées
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-text-deep leading-tight">
                  Pour que Céline vous recontacte.
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      value={contact.firstname}
                      onChange={(e) => setContact({ ...contact, firstname: e.target.value })}
                      placeholder="Votre prénom"
                      className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="vous@email.fr"
                      className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                    Téléphone <span className="opacity-60">(optionnel)</span>
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="06 ..."
                    className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={contact.consent}
                    onChange={(e) => setContact({ ...contact, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                  />
                  <span>
                    J&apos;accepte que Céline conserve mes coordonnées pour finaliser ma réservation. Mes données ne sont pas transmises à des tiers.
                  </span>
                </label>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("creneau")}
                    className="inline-flex items-center gap-1.5 text-sm text-text-medium hover:text-text-deep"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Modifier le créneau
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("paiement")}
                    disabled={!isContactValid}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Paiement */}
            {step === "paiement" && (
              <motion.div
                key="paiement"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-7 md:p-9 space-y-5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-accent-deep" />
                    <p className="font-display text-2xl text-text-deep">
                      Paiement sécurisé Stripe
                    </p>
                  </div>
                  <p className="text-sm text-text-medium leading-relaxed">
                    Réglez par carte bancaire pour confirmer votre réservation immédiatement. Vous recevez un email de confirmation avec votre référence et le lien Google Calendar dès la validation du paiement.
                  </p>
                  <button
                    type="button"
                    onClick={handleStripe}
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing && paymentMode === "stripe" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirection vers Stripe…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Payer avec Stripe — {practice.price}
                      </>
                    )}
                  </button>
                  <p className="text-[0.7rem] text-text-soft leading-relaxed">
                    Paiement 3D Secure · Visa, MasterCard, Amex · facturation immédiate · annulation 100 % remboursée à 7 jours du rendez-vous.
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
                    Ajoutez la séance au panier pour la combiner avec une carte cadeau, un cercle, ou un autre accompagnement. Vous pouvez aussi régler virement, espèces ou chèque le jour J — Céline vous recontacte pour confirmer la date.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <AddToCartButton
                      productId={practice.productId}
                      noteToCeline={noteToCeline}
                      label={`Ajouter ${practice.price} au panier`}
                      onAdded={openCart}
                    />
                    <button
                      type="button"
                      onClick={handleManual}
                      disabled={processing}
                      className="btn-secondary disabled:opacity-50"
                    >
                      {processing && paymentMode === "manual" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Envoi…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Régler avec Céline
                        </>
                      )}
                    </button>
                    <WhatsAppButton message={manualMessage}>
                      Continuer sur WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>

                <div className="flex justify-start pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("coordonnees")}
                    className="inline-flex items-center gap-1.5 text-sm text-text-medium hover:text-text-deep"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Modifier mes coordonnées
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Succès */}
            {step === "succes" && (
              <motion.div
                key="succes"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-8 md:p-10 space-y-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl md:text-4xl text-text-deep leading-tight">
                    {paymentMode === "stripe"
                      ? "Réservation confirmée."
                      : "Demande envoyée à Céline."}
                  </h3>
                  <p className="text-text-medium leading-relaxed">
                    Référence :{" "}
                    <span className="font-mono font-medium text-text-deep">{orderRef}</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-border-soft bg-bg-card p-5 space-y-2.5 text-sm">
                  <p className="font-display text-base text-text-deep mb-2">Récapitulatif</p>
                  <div className="flex justify-between gap-3">
                    <span className="text-text-soft">Pratique</span>
                    <span className="text-text-deep font-medium text-right">{practice.name}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-text-soft">Date préférée</span>
                    <span className="text-text-deep">{slot.date}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-text-soft">Plage horaire</span>
                    <span className="text-text-deep text-right">{slotLabel}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-text-soft">Lieu</span>
                    <span className="text-text-deep text-right">{lieuLabel}</span>
                  </div>
                  <div className="flex justify-between gap-3 pt-2 border-t border-border-soft">
                    <span className="text-text-soft">
                      {paymentMode === "stripe" ? "Payé" : "À régler"}
                    </span>
                    <span className="text-text-deep font-display text-lg">{practice.price}</span>
                  </div>
                </div>

                {paymentMode === "stripe" ? (
                  <p className="text-sm text-text-medium leading-relaxed">
                    Un email de confirmation a été envoyé à <strong>{contact.email}</strong> avec votre facture et le lien Google Calendar. Céline vous appelle dans les 24h pour valider la date exacte avec vous.
                  </p>
                ) : (
                  <p className="text-sm text-text-medium leading-relaxed">
                    Céline reçoit votre demande et vous recontactera personnellement à <strong>{contact.email}</strong> pour confirmer la date et les modalités de règlement.
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={whatsappLink(stripeMessage + ` Référence : ${orderRef}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1ebe5a] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Continuer sur WhatsApp
                  </a>
                  <Link href="/" className="btn-secondary">
                    Retour à l&apos;accueil
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
