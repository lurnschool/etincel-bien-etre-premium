"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { contact } from "@/lib/data";
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
 * Formulaire de contact rapide branché sur /api/contact (Resend).
 * Si la clé Resend est absente, on bascule sur un fallback honnête
 * proposant WhatsApp et mailto avec le contenu pré-rempli.
 */
export function ContactRapide() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    motivation: motivationOptions[0],
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
        "L'envoi par email n'est pas encore activé sur cet hébergement. Continuez avec Céline en un clic ci-dessous — votre message lui parviendra directement.",
      );
      return;
    }
    setFallbackMessage(
      `L'envoi a échoué : ${res.error}. Réessayez dans un instant ou écrivez à Céline directement.`,
    );
  };

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-bg-base via-rose-soft/12 to-bg-soft/40">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 -left-32 h-96 w-96 rounded-full bg-rose-soft/30 blur-[140px]" />
        <div className="absolute bottom-12 -right-32 h-96 w-96 rounded-full bg-gold-soft/20 blur-[140px]" />
      </div>
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Premier contact"
            title={
              <>
                Échangeons sur{" "}
                <span className="font-display-italic text-gold-deep">votre besoin</span>
              </>
            }
            description="Un message simple, une réponse personnelle. Céline lit chaque demande et vous répondra elle-même."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border-soft bg-bg-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span className="text-xs uppercase tracking-[0.24em] text-text-soft">Téléphone</span>
                </div>
                <a
                  href={contact.phoneLink}
                  className="font-display text-2xl text-text-deep hover:text-accent transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-xs uppercase tracking-[0.24em] text-text-soft">Email</span>
                </div>
                <a
                  href={contact.emailLink}
                  className="font-display text-2xl text-text-deep hover:text-accent transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
              <div className="rounded-2xl border border-border-soft bg-bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-xs uppercase tracking-[0.24em] text-text-soft">Lieux</span>
                </div>
                <div className="space-y-2 text-sm text-text-medium leading-relaxed">
                  <p>
                    <span className="font-medium text-text-deep block">{contact.addressMain.label}</span>
                    {contact.addressMain.street}<br />
                    {contact.addressMain.city}
                  </p>
                  <p className="pt-2 border-t border-border-soft">
                    Aussi à {contact.addressSecondary.label}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-border-soft bg-bg-card p-10 text-center space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40">
                  <CheckCircle2 className="h-7 w-7 text-gold-deep" />
                </div>
                <h3 className="font-display text-3xl text-text-deep">Message reçu.</h3>
                <p className="text-text-medium leading-relaxed max-w-md mx-auto">
                  Merci pour votre confiance. Céline vous répondra personnellement à <strong>{form.email}</strong>. En cas d&apos;urgence, vous pouvez l&apos;appeler au {contact.phone}.
                </p>
                <div className="flex flex-wrap gap-3 justify-center pt-3">
                  <WhatsAppButton message={whatsappMessages.generic}>
                    Continuer sur WhatsApp
                  </WhatsAppButton>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border-soft bg-bg-card p-8 md:p-10 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-firstname" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                      Prénom
                    </label>
                    <input
                      id="contact-firstname"
                      required
                      value={form.firstname}
                      onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                      Email
                    </label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-phone" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                      Téléphone <span className="opacity-60">(optionnel)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl bg-bg-soft px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-motivation" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                      Je viens pour
                    </label>
                    <select
                      id="contact-motivation"
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
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                    Votre message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Quelques lignes pour décrire votre besoin, votre intuition, votre question…"
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
                    J'accepte que mes données soient utilisées uniquement par Etincel de bien être pour répondre à ma demande. Aucune transmission à des tiers.
                  </span>
                </label>
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer mon message
                      </>
                    )}
                  </button>
                  <WhatsAppButton
                    message={whatsappMessages.generic}
                    variant="outline"
                    size="sm"
                  >
                    Plutôt sur WhatsApp
                  </WhatsAppButton>
                </div>
                {fallbackMessage && (
                  <div className="rounded-2xl border border-gold-soft/60 bg-bg-soft p-4 text-xs text-text-medium leading-relaxed space-y-3">
                    <p>{fallbackMessage}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={whatsappLink(buildPlainBody())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1ebe5a] transition-colors"
                      >
                        Continuer sur WhatsApp
                      </a>
                      <a
                        href={`mailto:${contact.email}?subject=${encodeURIComponent("Contact via le site Etincel")}&body=${encodeURIComponent(buildPlainBody())}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg-card border border-border-soft px-3 py-1.5 text-xs font-medium text-text-deep hover:bg-bg-soft transition-colors"
                      >
                        Envoyer par email
                      </a>
                    </div>
                  </div>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
