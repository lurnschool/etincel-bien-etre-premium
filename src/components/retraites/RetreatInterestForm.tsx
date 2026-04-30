"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mountain } from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappMessages, whatsappLink } from "@/lib/whatsapp";
import { submitContact } from "@/lib/contactClient";

const retreatTopics = [
  "Retraite féminin sacré",
  "Retraite cacao & souffle",
  "Retraite innerdance",
  "Week-end reconnexion",
  "Toutes — m'envoyer chaque ouverture",
];

/**
 * Formulaire d'inscription à la liste d'intérêt retraites — branché
 * sur /api/contact (Resend). Si la clé est absente, on bascule sur
 * un fallback honnête (WhatsApp / mailto).
 */
export function RetreatInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    topic: retreatTopics[0],
    consent: false,
  });

  const buildBody = () =>
    `Bonjour Céline,\n\nJe souhaite être prévenue à l'ouverture des prochaines retraites (${form.topic}).\n\n${form.firstname} <${form.email}>${form.phone ? ` · ${form.phone}` : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstname || !form.email || !form.consent) return;
    setSending(true);
    setFallbackMessage(null);
    const res = await submitContact({
      intent: "retreat-interest",
      contact: {
        firstname: form.firstname,
        email: form.email,
        phone: form.phone,
      },
      fields: { "Type de retraite": form.topic },
    });
    setSending(false);
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    if (res.fallback) {
      setFallbackMessage(
        "L'envoi par email n'est pas encore activé sur cet hébergement. Continuez avec Céline en un clic ci-dessous.",
      );
      return;
    }
    setFallbackMessage(`L'envoi a échoué : ${res.error}.`);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gold-soft/40 bg-white/8 backdrop-blur-sm p-7 md:p-8 space-y-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="font-display text-2xl text-text-on-dark leading-tight">
          Inscription confirmée, {form.firstname}.
        </p>
        <p className="text-sm text-text-on-dark-soft leading-relaxed">
          Vous recevrez un email à <strong>{form.email}</strong> dès l&apos;ouverture des prochaines retraites correspondant à votre intérêt ({form.topic.toLowerCase()}). Aucune inscription définitive n&apos;est faite — vous restez libre de vous positionner ou non quand le programme sortira.
        </p>
        <WhatsAppButton message={whatsappMessages.retraite} className="w-full justify-center">
          Poser une question sur WhatsApp
        </WhatsAppButton>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gold-soft/40 bg-white/5 backdrop-blur-sm p-7 md:p-8 space-y-5"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-soft">
        <Mountain className="h-3.5 w-3.5" />
        <span>Liste d&apos;intérêt — prochaines retraites</span>
      </div>
      <p className="font-display text-2xl leading-snug text-text-on-dark">
        Soyez prévenue dès l&apos;ouverture des inscriptions.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="Prénom"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          className="rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-soft/60 focus:outline-none focus:border-gold/60"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-soft/60 focus:outline-none focus:border-gold/60"
        />
      </div>
      <input
        type="tel"
        placeholder="Téléphone (optionnel)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-soft/60 focus:outline-none focus:border-gold/60"
      />
      <div className="space-y-1.5">
        <label className="text-xs uppercase tracking-[0.22em] text-gold-soft/80">
          Type de retraite
        </label>
        <select
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark focus:outline-none focus:border-gold/60"
        >
          {retreatTopics.map((t) => (
            <option key={t} value={t} className="bg-bg-deep">
              {t}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 text-[0.72rem] leading-relaxed text-text-on-dark-soft cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 rounded border-white/30 text-gold focus:ring-gold/30"
        />
        <span>
          J&apos;accepte de recevoir les annonces de retraites Etincel par email. Je peux me désinscrire à tout moment.
        </span>
      </label>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Inscription en cours…
            </>
          ) : (
            <>
              Rejoindre la liste
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <Link
          href="/contact?sujet=Question%20retraite"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
        >
          Poser une question
        </Link>
        <WhatsAppButton message={whatsappMessages.retraite} variant="outline" className="w-full justify-center">
          Échanger sur WhatsApp
        </WhatsAppButton>
      </div>
      {fallbackMessage && (
        <div className="rounded-2xl border border-gold-soft/40 bg-white/8 p-4 text-xs text-text-on-dark-soft leading-relaxed space-y-3">
          <p>{fallbackMessage}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={whatsappLink(buildBody())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1ebe5a] transition-colors"
            >
              Continuer sur WhatsApp
            </a>
            <a
              href={`mailto:etincel33@gmail.com?subject=${encodeURIComponent("Intérêt retraite — site Etincel")}&body=${encodeURIComponent(buildBody())}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-text-on-dark hover:border-gold hover:text-gold transition-colors"
            >
              Envoyer par email
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
