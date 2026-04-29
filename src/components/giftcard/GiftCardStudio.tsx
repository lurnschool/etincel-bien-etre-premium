"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Send, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GiftCardPreview,
  type GiftCardData,
  type GiftCardStyle,
  giftCardStyles,
} from "./GiftCardPreview";

const cardTypes = [
  { id: "seance", label: "Une séance individuelle" },
  { id: "collectif", label: "Une expérience collective" },
  { id: "retraite", label: "Une retraite (acompte)" },
  { id: "montant", label: "Un montant libre" },
  { id: "choisir", label: "À choisir avec Céline" },
];

const occasions = [
  "Anniversaire",
  "Noël",
  "Naissance",
  "Fête des mères",
  "Saint-Valentin",
  "Sans occasion",
];

const messageSuggestions = [
  "Une parenthèse, parce que tu le mérites.",
  "Un moment pour toi, à ton rythme.",
  "Reviens à toi. Je t'accompagne.",
  "Pour ralentir et se déposer.",
];

const initialData: GiftCardData = {
  fromName: "",
  toName: "",
  message: "",
  cardType: "Une séance individuelle",
  amount: "",
  occasion: "",
  style: "doree",
};

/**
 * GiftCardStudio — générateur de carte cadeau personnalisable avec aperçu live.
 * Téléchargement PNG via html-to-image (lib légère, ~16kb).
 * Pas de Stripe : la demande est envoyée à Céline pour finalisation.
 */
export function GiftCardStudio() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GiftCardData>(initialData);
  const [downloading, setDownloading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState({
    email: "",
    phone: "",
    consent: false,
  });

  const update = <K extends keyof GiftCardData>(key: K, value: GiftCardData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const downloadPng = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#faf6f0",
      });
      const link = document.createElement("a");
      link.download = `carte-cadeau-etincel-${data.toName || "personnalisee"}.png`.toLowerCase().replace(/\s+/g, "-");
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur export PNG", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.email || !requestForm.consent) return;
    setRequestSent(true);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">
      {/* Aperçu live */}
      <div className="lg:sticky lg:top-28 space-y-5">
        <div className="text-xs uppercase tracking-[0.28em] text-gold-deep flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5" />
          <span>Aperçu en direct</span>
        </div>
        <GiftCardPreview ref={previewRef} data={data} />
        <div className="flex flex-wrap gap-2">
          {(Object.keys(giftCardStyles) as GiftCardStyle[]).map((s) => {
            const isActive = data.style === s;
            return (
              <button
                key={s}
                onClick={() => update("style", s)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[0.78rem] transition-all",
                  isActive
                    ? "border-accent bg-accent text-text-on-dark"
                    : "border-border-medium text-text-deep hover:border-accent hover:text-accent",
                )}
              >
                {giftCardStyles[s].label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-text-soft italic">
          {giftCardStyles[data.style].description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={downloadPng}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Préparation…" : "Télécharger en PNG"}
          </button>
        </div>
        <p className="text-xs text-text-soft leading-relaxed max-w-md">
          Le téléchargement PDF et le paiement en ligne seront ajoutés prochainement. En attendant, téléchargez l&apos;aperçu PNG et envoyez votre demande à Céline pour finaliser la carte.
        </p>
      </div>

      {/* Formulaire de personnalisation */}
      <div className="space-y-8">
        <Field label="De la part de">
          <input
            value={data.fromName}
            onChange={(e) => update("fromName", e.target.value)}
            placeholder="Votre prénom"
            maxLength={40}
            className="input-field"
          />
        </Field>

        <Field label="Pour">
          <input
            value={data.toName}
            onChange={(e) => update("toName", e.target.value)}
            placeholder="Prénom du / de la bénéficiaire"
            maxLength={40}
            className="input-field"
          />
        </Field>

        <Field
          label="Message personnel"
          hint="Quelques mots qui apparaîtront sur la carte."
        >
          <textarea
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Une parenthèse, parce que tu le mérites…"
            rows={3}
            maxLength={200}
            className="input-field resize-none"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
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
        </Field>

        <Field label="Type de cadeau">
          <div className="flex flex-wrap gap-2">
            {cardTypes.map((t) => {
              const isActive = data.cardType === t.label;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => update("cardType", t.label)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    isActive
                      ? "border-accent bg-accent/10 text-accent-deep"
                      : "border-border-medium text-text-deep hover:border-accent hover:text-accent",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Field>

        <Field
          label="Montant ou prestation"
          hint="Ex : 90 €, 120 €, séance numérologie, à convenir avec Céline."
        >
          <input
            value={data.amount}
            onChange={(e) => update("amount", e.target.value)}
            placeholder="Ex : 90 €, à convenir, séance numérologie…"
            maxLength={30}
            className="input-field"
          />
        </Field>

        <Field label="Occasion (optionnel)">
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) => {
              const isActive = data.occasion === o;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => update("occasion", isActive ? "" : o)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[0.78rem] transition-all",
                    isActive
                      ? "border-accent bg-accent/10 text-accent-deep"
                      : "border-border-medium text-text-deep hover:border-accent hover:text-accent",
                  )}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </Field>

        {/* Demande à Céline */}
        <div className="rounded-2xl border border-border-soft bg-bg-card p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold-deep">
            <Send className="h-3.5 w-3.5" />
            <span>Étape 2 — Demande à Céline</span>
          </div>
          {requestSent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 text-text-deep"
            >
              <CheckCircle2 className="h-7 w-7 text-gold-deep" />
              <p className="font-display text-2xl">Demande envoyée.</p>
              <p className="text-text-medium leading-relaxed">
                Céline reçoit votre demande avec l&apos;aperçu de la carte. Elle vous recontacte pour finaliser le règlement et la livraison personnalisée. En cas d&apos;urgence : etincel33@gmail.com.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleRequest} className="space-y-4">
              <p className="text-sm text-text-medium">
                Téléchargez l&apos;aperçu, puis envoyez-nous une demande pour finaliser la création de votre carte cadeau (paiement, support imprimé ou numérique, message manuscrit éventuel).
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  value={requestForm.email}
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  placeholder="Votre email"
                  className="input-field"
                />
                <input
                  type="tel"
                  value={requestForm.phone}
                  onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                  placeholder="Téléphone (optionnel)"
                  className="input-field"
                />
              </div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={requestForm.consent}
                  onChange={(e) => setRequestForm({ ...requestForm, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                />
                <span>
                  J&apos;accepte que Céline me recontacte pour finaliser cette carte cadeau. Mes données ne sont pas transmises à des tiers.
                </span>
              </label>
              <button type="submit" className="btn-primary">
                Envoyer ma demande à Céline
                <Send className="h-4 w-4" />
              </button>
              <p className="text-[0.65rem] text-text-soft leading-relaxed pt-2 border-t border-border-soft">
                Le paiement en ligne (Stripe) sera disponible prochainement. Pour l&apos;instant, le règlement se fait directement avec Céline (virement, espèces, chèque).
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        :global(.input-field) {
          width: 100%;
          background: var(--bg-soft);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.9rem;
          color: var(--text-deep);
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        :global(.input-field:focus) {
          outline: none;
          border-color: var(--accent);
          background: var(--bg-card);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.24em] text-text-soft">
          {label}
        </span>
        {hint && (
          <span className="text-[0.7rem] text-text-soft/80 italic">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}
