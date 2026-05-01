"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { contact, ecrivezMoi } from "@/lib/data";
import { whatsappMessages, whatsappLink } from "@/lib/whatsapp";
import { submitContact } from "@/lib/contactClient";

const motivationOptions = [
  "Une séance individuelle",
  "Un cercle de femmes",
  "Une retraite",
  "Une carte cadeau",
  "Une formation",
  "Autre",
];

/**
 * "Écrivez-moi un mot" — refonte de l'ancien ContactRapide.
 *
 * Sprint A "refuge" :
 *  - Photo Céline en marge gauche (pas une vitrine commerciale).
 *  - Coordonnées en cartes douces, sans bordures dures.
 *  - Formulaire Resend conservé tel quel (intent: "contact").
 *  - Wording adouci : "Envoyer un mot" plutôt que "Envoyer mon message".
 *  - Fallback honnête WhatsApp/email maintenu.
 *
 * La logique technique (submitContact, fallback) est inchangée — seule
 * l'identité visible et le vocabulaire changent.
 */
export function EcrivezMoi() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    motivation: motivationOptions[0]!,
    message: "",
    consent: false,
  });

  const buildPlainBody = () =>
    `Bonjour Céline,\n\nDe : ${form.firstname} <${form.email}>${form.phone ? ` · ${form.phone}` : ""}\nJe viens pour : ${form.motivation}\n${form.message ? `\n${form.message}\n` : ""}\nMerci !`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstname || !form.email || !form.consent) return;
    setSending(true);
    setFallbackMessage(null);
    const res = await submitContact({
      intent: "contact",
      contact: {
        firstname: form.firstname,
        email: form.email,
        phone: form.phone,
      },
      fields: { "Je viens pour": form.motivation },
      message: form.message,
    });
    setSending(false);
    if (res.ok) {
      setSubmitted(true);
      return;
    }
    if (res.fallback) {
      setFallbackMessage(
        "L'envoi par email sera activé prochainement. En attendant, votre mot peut arriver à Céline en un clic, par WhatsApp ou par email — votre message est déjà rédigé pour vous.",
      );
      return;
    }
    setFallbackMessage(
      `L'envoi a rencontré une difficulté. Réessayez dans un instant, ou écrivez à Céline directement.`,
    );
  };

  return (
    <section
      className="relative paper-sand py-24 md:py-32 overflow-hidden"
      aria-labelledby="ecrivez-moi-title"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* En-tête doux */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{ecrivezMoi.eyebrow}</span>
          </div>
          <h2
            id="ecrivez-moi-title"
            className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep"
          >
            {ecrivezMoi.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            {ecrivezMoi.body}
          </p>
        </motion.div>

        <div className="grid gap-10 md:gap-14 lg:grid-cols-12 items-start">
          {/* Colonne gauche — coordonnées + photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Photo lieu */}
            <div className="relative">
              <VisualAsset
                id="home-contact"
                ratio="16:9"
                className="rounded-[1.25rem] shadow-[0_12px_30px_rgba(31,26,46,0.08)]"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>

            {/* Coordonnées en cartes douces */}
            <div className="space-y-3">
              <div className="rounded-2xl bg-bg-card border border-border-soft p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Phone className="h-3.5 w-3.5 text-gold-deep" />
                  <span className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft">
                    Téléphone
                  </span>
                </div>
                <a
                  href={contact.phoneLink}
                  className="font-display text-xl text-text-deep hover:text-accent transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="rounded-2xl bg-bg-card border border-border-soft p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Mail className="h-3.5 w-3.5 text-gold-deep" />
                  <span className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft">
                    Email
                  </span>
                </div>
                <a
                  href={contact.emailLink}
                  className="font-display text-base text-text-deep hover:text-accent transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
              <div className="rounded-2xl bg-bg-card border border-border-soft p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-gold-deep" />
                  <span className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft">
                    Lieux d&apos;accueil
                  </span>
                </div>
                <div className="text-sm text-text-medium leading-relaxed">
                  <p className="font-medium text-text-deep">{contact.addressMain.label}</p>
                  <p>{contact.addressMain.street}</p>
                  <p>{contact.addressMain.city}</p>
                  <p className="pt-2 mt-2 border-t border-border-soft/60 text-text-soft">
                    Aussi à {contact.addressSecondary.label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite — formulaire ou confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[1.5rem] bg-bg-card border border-border-soft p-10 text-center space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40">
                  <CheckCircle2 className="h-7 w-7 text-gold-deep" />
                </div>
                <h3 className="font-display text-3xl text-text-deep">Mot reçu.</h3>
                <p className="text-text-medium leading-relaxed max-w-md mx-auto">
                  Merci. Je vous réponds personnellement à <strong>{form.email}</strong>.
                  Si c&apos;est urgent, vous pouvez aussi m&apos;appeler au {contact.phone}.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-3">
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 px-5 py-2.5 text-sm text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continuer sur WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[1.5rem] bg-bg-card border border-border-soft p-8 md:p-10 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ecrivezmoi-firstname"
                      className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft"
                    >
                      Prénom
                    </label>
                    <input
                      id="ecrivezmoi-firstname"
                      required
                      value={form.firstname}
                      onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ecrivezmoi-email"
                      className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft"
                    >
                      Email
                    </label>
                    <input
                      id="ecrivezmoi-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ecrivezmoi-phone"
                      className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft"
                    >
                      Téléphone <span className="opacity-60">(optionnel)</span>
                    </label>
                    <input
                      id="ecrivezmoi-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ecrivezmoi-motivation"
                      className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft"
                    >
                      Je viens pour
                    </label>
                    <select
                      id="ecrivezmoi-motivation"
                      value={form.motivation}
                      onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      {motivationOptions.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="ecrivezmoi-message"
                    className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft"
                  >
                    Votre mot
                  </label>
                  <textarea
                    id="ecrivezmoi-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Quelques lignes pour me dire ce qui vous amène. Pas besoin d'avoir les bons mots."
                    className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                  />
                </div>
                <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                  />
                  <span>
                    J&apos;accepte que mon message soit utilisé uniquement par
                    Etincel pour me répondre. Aucune transmission à des tiers.
                  </span>
                </label>
                <div className="flex flex-wrap gap-3 items-center pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="soft-glow inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        En route…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer le mot
                      </>
                    )}
                  </button>
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-5 py-2.5 text-sm text-text-deep hover:border-accent hover:text-accent transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Plutôt sur WhatsApp
                  </a>
                </div>
                {fallbackMessage && (
                  <div className="rounded-2xl border border-gold-soft/60 bg-bg-soft p-4 text-xs text-text-medium leading-relaxed space-y-3">
                    <p>{fallbackMessage}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={whatsappLink(buildPlainBody())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#7ea892] to-[#5a8474] px-3 py-1.5 text-xs font-medium text-bg-base hover:from-[#8fbba3] hover:to-[#6b9a86] transition-colors"
                      >
                        Continuer sur WhatsApp
                      </a>
                      <a
                        href={`mailto:${contact.email}?subject=${encodeURIComponent("Un mot via le site Etincel")}&body=${encodeURIComponent(buildPlainBody())}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg-card border border-border-soft px-3 py-1.5 text-xs font-medium text-text-deep hover:bg-bg-soft transition-colors"
                      >
                        Envoyer par email
                      </a>
                    </div>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
