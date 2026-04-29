"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  Mail,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { accompagnementsIndividuels } from "@/lib/data";
import { whatsappMessages } from "@/lib/whatsapp";

type Question = {
  id: string;
  label: string;
  options: { value: string; label: string; tag?: string[] }[];
  multiple?: boolean;
};

const questions: Question[] = [
  {
    id: "ressenti",
    label: "Ce que je ressens en ce moment",
    multiple: true,
    options: [
      { value: "fatigue", label: "Fatigue émotionnelle", tag: ["apaiser", "corps"] },
      { value: "blocage", label: "Un blocage qui se répète", tag: ["apaiser", "explorer"] },
      { value: "clarte", label: "Besoin de clarté", tag: ["comprendre"] },
      { value: "transition", label: "Une transition de vie", tag: ["comprendre", "explorer"] },
      { value: "corps", label: "Besoin de revenir au corps", tag: ["corps"] },
      { value: "feminin", label: "Un appel du féminin", tag: ["feminin"] },
      { value: "coeur", label: "Une envie d'ouvrir le cœur", tag: ["cacao"] },
      { value: "offrir", label: "Une envie d'offrir un moment", tag: ["offrir"] },
    ],
  },
  {
    id: "format",
    label: "Je préfère",
    options: [
      { value: "individuel", label: "Un accompagnement individuel" },
      { value: "collectif", label: "Une expérience collective" },
      { value: "deux", label: "Les deux" },
      { value: "indecise", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "attire",
    label: "Ce qui m'attire le plus",
    multiple: true,
    options: [
      { value: "respiration", label: "La respiration", tag: ["explorer"] },
      { value: "massage", label: "Le toucher / massage", tag: ["corps"] },
      { value: "numerologie", label: "La numérologie", tag: ["comprendre"] },
      { value: "hypnose", label: "L'hypnose", tag: ["apaiser"] },
      { value: "innerdance", label: "L'innerdance", tag: ["explorer"] },
      { value: "cercle", label: "Un cercle de femmes", tag: ["feminin"] },
      { value: "cacao", label: "Un rituel cacao", tag: ["cacao"] },
      { value: "retraite", label: "Une retraite", tag: ["explorer", "feminin"] },
      { value: "formation", label: "Une formation", tag: ["comprendre"] },
    ],
  },
  {
    id: "niveau",
    label: "Mon niveau de connaissance",
    options: [
      { value: "decouvre", label: "Je découvre ces pratiques" },
      { value: "experimente", label: "J'ai déjà pratiqué" },
      { value: "profond", label: "Je cherche quelque chose de profond" },
      { value: "guidee", label: "Je veux être guidée pas à pas" },
    ],
  },
];

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailForm, setEmailForm] = useState({
    firstname: "",
    email: "",
    consent: false,
  });

  const currentQuestion = questions[step];
  const currentAnswers = answers[currentQuestion?.id] || [];

  const toggleAnswer = (value: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];
      if (currentQuestion.multiple) {
        return {
          ...prev,
          [currentQuestion.id]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      }
      return { ...prev, [currentQuestion.id]: [value] };
    });
  };

  const next = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setEmailSubmitted(false);
  };

  // Calcule les tags + intentions à partir des réponses
  const intent = useMemo(() => {
    const tags: string[] = [];
    Object.entries(answers).forEach(([qId, values]) => {
      const q = questions.find((q) => q.id === qId);
      values.forEach((v) => {
        const opt = q?.options.find((o) => o.value === v);
        if (opt?.tag) tags.push(...opt.tag);
      });
    });

    const wantsCollective = answers.format?.includes("collectif");
    const wantsOffrir = tags.includes("offrir");

    // Comptage des familles dominantes
    const counts: Record<string, number> = {};
    tags.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);

    const matched = accompagnementsIndividuels.filter((a) => tags.includes(a.family));
    const principale = matched[0] ?? accompagnementsIndividuels[0];
    const secondaires = matched.slice(1, 4);

    return { tags, sorted, wantsCollective, wantsOffrir, principale, secondaires };
  }, [answers]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.email || !emailForm.consent) return;
    // Envoi simulé — quand Resend sera branché, remplacer par fetch /api/send-mail.
    await new Promise((r) => setTimeout(r, 500));
    setEmailSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Bilan d'orientation Etincel"
        title={
          <>
            Trouver{" "}
            <span className="font-display-italic text-gold-deep">votre porte d&apos;entrée</span>
          </>
        }
        description="Quatre questions douces pour identifier la pratique qui résonne le mieux avec votre besoin du moment."
      />

      <section className="pb-24">
        <Container size="narrow">
          {!showResult ? (
            <Reveal>
              <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-deep">
                    <Compass className="h-3.5 w-3.5" />
                    <span>Question {step + 1} sur {questions.length}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 w-6 rounded-full transition-colors ${
                          i <= step ? "bg-gold" : "bg-border-medium"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-deep mb-2">
                  {currentQuestion.label}
                </h2>
                <p className="text-sm text-text-soft mb-8">
                  {currentQuestion.multiple
                    ? "Vous pouvez sélectionner plusieurs réponses"
                    : "Sélectionnez une réponse"}
                </p>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((option) => {
                    const selected = currentAnswers.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => toggleAnswer(option.value)}
                        className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${
                          selected
                            ? "border-accent bg-accent/5 shadow-[0_0_0_3px_rgba(107,79,138,0.1)]"
                            : "border-border-soft hover:border-accent/50 bg-bg-card"
                        }`}
                        type="button"
                      >
                        <span className="font-medium text-text-deep">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center mt-10">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm text-text-medium disabled:opacity-30 hover:text-text-deep transition-colors"
                    type="button"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Précédent
                  </button>
                  <button
                    onClick={next}
                    disabled={currentAnswers.length === 0}
                    className="btn-primary disabled:opacity-50"
                    type="button"
                  >
                    {step === questions.length - 1 ? "Voir mes pistes" : "Suivant"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Recommandation principale */}
              <div className="rounded-[2rem] border border-gold-soft/60 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                      Votre porte d&apos;entrée principale
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl text-text-deep mt-1">
                      {intent.principale.name}
                    </h2>
                  </div>
                </div>
                <p className="text-text-medium leading-relaxed text-base md:text-lg">
                  {intent.principale.pitch}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/accompagnements/${intent.principale.slug}`}
                    className="btn-primary"
                  >
                    Découvrir cette pratique
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/contact?sujet=${encodeURIComponent(intent.principale.name)}`}
                    className="btn-secondary"
                  >
                    Demander un rendez-vous
                  </Link>
                </div>
              </div>

              {/* Recommandations secondaires */}
              {intent.secondaires.length > 0 && (
                <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-10 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                      D&apos;autres pistes qui résonnent
                    </p>
                    <h3 className="font-display text-2xl text-text-deep mt-1">
                      Ces pratiques vous correspondent aussi
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {intent.secondaires.map((reco) => (
                      <Link
                        key={reco.slug}
                        href={`/accompagnements/${reco.slug}`}
                        className="group rounded-2xl border border-border-soft bg-bg-soft/50 p-5 hover:border-gold-soft hover:bg-bg-card transition-all"
                      >
                        <h4 className="font-display text-lg text-text-deep mb-1">
                          {reco.name}
                        </h4>
                        <p className="text-sm text-text-medium leading-relaxed line-clamp-2">
                          {reco.pitch}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs text-accent mt-3 group-hover:text-accent-deep">
                          Découvrir
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA contextuels selon l'intention */}
              <div className="grid gap-3 sm:grid-cols-2">
                {intent.wantsCollective && (
                  <Link
                    href="/cercles-de-femmes"
                    className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep mb-1">
                      Vous aimez le collectif
                    </p>
                    <p className="font-display text-lg text-text-deep">
                      Rejoindre un cercle de femmes →
                    </p>
                  </Link>
                )}
                {intent.tags.includes("cacao") && (
                  <Link
                    href="/cacao"
                    className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep mb-1">
                      L&apos;ouverture du cœur
                    </p>
                    <p className="font-display text-lg text-text-deep">
                      Découvrir les rituels cacao →
                    </p>
                  </Link>
                )}
                {intent.tags.some((t) => ["explorer", "feminin"].includes(t)) && (
                  <Link
                    href="/retraites#interet"
                    className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep mb-1">
                      Aller plus loin
                    </p>
                    <p className="font-display text-lg text-text-deep">
                      Liste d&apos;intérêt retraite →
                    </p>
                  </Link>
                )}
                {intent.wantsOffrir && (
                  <Link
                    href="/cartes-cadeaux"
                    className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep mb-1">
                      Offrir un moment
                    </p>
                    <p className="font-display text-lg text-text-deep">
                      Composer une carte cadeau →
                    </p>
                  </Link>
                )}
              </div>

              {/* Email capture */}
              <div className="rounded-[2rem] border border-border-soft bg-bg-deep text-text-on-dark p-8 md:p-10">
                {emailSubmitted ? (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="font-display text-2xl text-text-on-dark">
                      Récapitulatif envoyé à {emailForm.email}.
                    </p>
                    <p className="text-text-on-dark-soft text-sm leading-relaxed max-w-md mx-auto">
                      Vérifiez vos spams si vous ne le voyez pas dans les prochaines minutes. Céline reçoit également une copie et pourra vous proposer un échange si vous le souhaitez.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                      <WhatsAppButton message={whatsappMessages.bilan}>
                        Échanger sur WhatsApp
                      </WhatsAppButton>
                      <Link
                        href={`/contact?sujet=${encodeURIComponent(`Diagnostic — ${intent.principale.name}`)}`}
                        className="btn-secondary"
                      >
                        Demander un rendez-vous
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gold mt-1 shrink-0" />
                      <div>
                        <p className="font-display text-2xl text-text-on-dark mb-1">
                          Recevoir mon résultat par email
                        </p>
                        <p className="text-sm text-text-on-dark-soft leading-relaxed">
                          Garder une trace de cette piste pour y revenir tranquillement.
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Prénom"
                        value={emailForm.firstname}
                        onChange={(e) => setEmailForm({ ...emailForm, firstname: e.target.value })}
                        className="rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-soft/60 focus:outline-none focus:border-gold/50"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={emailForm.email}
                        onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                        className="rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-text-on-dark placeholder:text-text-on-dark-soft/60 focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-text-on-dark-soft cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={emailForm.consent}
                        onChange={(e) => setEmailForm({ ...emailForm, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-white/30 text-gold focus:ring-gold/30"
                      />
                      <span>
                        J&apos;accepte de recevoir mon résultat et d&apos;éventuels messages d&apos;Etincel. Je peux me désinscrire à tout moment.
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors"
                    >
                      Recevoir mon récapitulatif
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-4">
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton message={whatsappMessages.bilan} variant="outline" size="sm">
                    Parler à Céline sur WhatsApp
                  </WhatsAppButton>
                  <Link
                    href={`/contact?sujet=${encodeURIComponent(`Diagnostic — ${intent.principale.name}`)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent text-accent px-4 py-2 text-xs font-medium hover:bg-accent hover:text-text-on-dark transition-colors"
                  >
                    Demander un rendez-vous
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <button
                  onClick={reset}
                  className="text-sm text-text-soft hover:text-text-deep transition-colors"
                  type="button"
                >
                  Refaire le diagnostic
                </button>
              </div>

              <p className="text-xs text-text-soft leading-relaxed text-center max-w-xl mx-auto flex items-center justify-center gap-2 pt-2">
                <Etincelle size={10} />
                Ce diagnostic ne remplace pas un échange avec Céline. Il vous aide simplement à identifier une première porte d&apos;entrée.
              </p>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
