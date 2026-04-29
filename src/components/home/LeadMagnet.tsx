"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";

/**
 * Capture du lead magnet PDF "5 portes pour revenir à soi".
 * Pas d'envoi réel branché — l'API d'envoi (Resend ou équivalent)
 * sera connectée au sprint 4. En attendant, on confirme la demande
 * et on rappelle que Céline contactera la personne par email.
 */
export function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstname || !form.email || !form.consent) return;
    setSubmitted(true);
  };

  return (
    <section className="section relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-bg-deep text-text-on-dark p-10 md:p-16">
            <div className="absolute inset-0 grain opacity-30" />
            <div className="absolute -top-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-[140px]" />
            <div className="absolute -bottom-32 right-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-[140px]" />

            <div className="relative grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-soft">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Guide offert</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-text-on-dark">
                  5 portes pour{" "}
                  <span className="font-display-italic text-gold-gradient">
                    revenir à soi
                  </span>
                </h2>
                <p className="text-lg text-text-on-dark-soft leading-relaxed max-w-xl">
                  Cinq invitations sensibles pour reconnaître les signaux du corps, ralentir et retrouver votre étincelle intérieure.
                </p>
                <ul className="space-y-2 text-sm text-text-on-dark-soft">
                  {[
                    "Reconnaître la fatigue émotionnelle",
                    "Identifier les nœuds qui demandent à être déposés",
                    "Choisir une pratique qui vous correspond",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-gold">
                        <Etincelle size={10} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-bg-card text-text-deep p-8 md:p-10 space-y-4 text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40">
                      <CheckCircle2 className="h-7 w-7 text-gold-deep" />
                    </div>
                    <h3 className="font-display text-2xl">Merci, c'est noté.</h3>
                    <p className="text-text-medium leading-relaxed">
                      Le guide vous sera envoyé dès qu'il sera publié — Céline finalise actuellement les illustrations. En attendant, écrivez-lui à etincel33@gmail.com pour toute question.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-bg-card text-text-deep p-8 md:p-10 space-y-5"
                  >
                    <div className="space-y-1.5">
                      <label htmlFor="lead-firstname" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                        Prénom
                      </label>
                      <input
                        id="lead-firstname"
                        type="text"
                        required
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                        className="w-full rounded-full bg-bg-soft px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                        placeholder="Comment souhaitez-vous être appelée ?"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lead-email" className="text-xs uppercase tracking-[0.24em] text-text-soft">
                        Email
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-full bg-bg-soft px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                        placeholder="vous@email.fr"
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
                        J'accepte de recevoir le guide ainsi que d'éventuels messages d'Etincel de bien être. Je peux me désinscrire à tout moment.
                      </span>
                    </label>
                    <button type="submit" className="btn-primary w-full">
                      Recevoir le guide
                    </button>
                    <p className="text-[0.65rem] text-text-soft text-center">
                      Vos données sont utilisées uniquement par Etincel — jamais transmises.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
