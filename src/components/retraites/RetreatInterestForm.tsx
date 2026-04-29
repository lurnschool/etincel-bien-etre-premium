"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mountain } from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappMessages } from "@/lib/whatsapp";

const retreatTopics = [
  "Retraite féminin sacré",
  "Retraite cacao & souffle",
  "Retraite innerdance",
  "Week-end reconnexion",
  "Toutes — m'envoyer chaque ouverture",
];

/**
 * Formulaire d'inscription à la liste d'intérêt retraites.
 * Envoi simulé tant que Resend n'est pas branché. Après submit,
 * Céline reçoit l'inscription et la personne est confirmée.
 */
export function RetreatInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    topic: retreatTopics[0],
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstname || !form.email || !form.consent) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSubmitted(true);
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
    </form>
  );
}
