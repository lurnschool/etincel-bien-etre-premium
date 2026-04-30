"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  Lock,
  Mail,
  Sparkles,
  Loader2,
  Download,
  Shield,
  Heart,
  Mountain,
  Gift,
  Quote,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappMessages } from "@/lib/whatsapp";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { buildBilan } from "@/lib/bilan";

type Question = {
  id: string;
  label: string;
  hint?: string;
  options: { value: string; label: string; tag?: string[] }[];
  multiple?: boolean;
};

const questions: Question[] = [
  {
    id: "ressenti",
    label: "Ce qui vous traverse en ce moment",
    hint: "Plusieurs réponses possibles — choisissez ce qui résonne le plus.",
    multiple: true,
    options: [
      { value: "fatigue", label: "Une fatigue émotionnelle qui s'installe", tag: ["apaiser", "corps"] },
      { value: "blocage", label: "Un blocage qui se répète, malgré la volonté", tag: ["apaiser", "explorer"] },
      { value: "clarte", label: "Un besoin de clarté sur ma trajectoire", tag: ["comprendre"] },
      { value: "transition", label: "Une transition de vie (deuil, séparation, virage)", tag: ["comprendre", "explorer"] },
      { value: "corps", label: "Le besoin de revenir à mon corps, à mes sensations", tag: ["corps"] },
      { value: "feminin", label: "Un appel autour du féminin, des cycles, de l'intuition", tag: ["feminin"] },
      { value: "coeur", label: "Une envie profonde d'ouvrir mon cœur", tag: ["cacao"] },
      { value: "transmission", label: "Une histoire familiale qui pèse encore", tag: ["constellations"] },
    ],
  },
  {
    id: "contexte",
    label: "Le contexte dans lequel vous arrivez aujourd'hui",
    hint: "Une seule réponse — celle qui décrit le mieux votre moment de vie.",
    options: [
      { value: "transition", label: "Une transition forte (changement, perte, réorientation)" },
      { value: "epuisement", label: "Un épuisement progressif, je sens que je n'avance plus" },
      { value: "quete", label: "Une quête de sens — je veux comprendre" },
      { value: "stable", label: "Une période stable, mais je veux aller plus loin" },
      { value: "explorer", label: "Une curiosité — je découvre ces pratiques" },
    ],
  },
  {
    id: "format",
    label: "Le format dans lequel vous vous sentez le plus juste",
    options: [
      { value: "individuel", label: "Un accompagnement individuel — l'intimité d'un face-à-face" },
      { value: "collectif", label: "Une expérience collective — la force du groupe" },
      { value: "deux", label: "Les deux, selon le moment" },
      { value: "indecise", label: "Je ne sais pas encore — c'est aussi pour ça que je suis là" },
    ],
  },
  {
    id: "attire",
    label: "Ce qui vous attire spontanément",
    hint: "Plusieurs réponses possibles.",
    multiple: true,
    options: [
      { value: "respiration", label: "Le souffle, la respiration consciente", tag: ["explorer"] },
      { value: "massage", label: "Le toucher, le massage, le corps", tag: ["corps"] },
      { value: "numerologie", label: "Les nombres, les cycles, la numérologie", tag: ["comprendre"] },
      { value: "hypnose", label: "L'hypnose, le travail avec l'inconscient", tag: ["apaiser"] },
      { value: "innerdance", label: "L'innerdance, la musique somatique", tag: ["explorer"] },
      { value: "cercle", label: "Les cercles de femmes, la sororité", tag: ["feminin"] },
      { value: "cacao", label: "Le rituel cacao, l'ouverture du cœur", tag: ["cacao"] },
      { value: "retraite", label: "L'immersion, la retraite, le temps long", tag: ["retraite"] },
      { value: "constellations", label: "Les constellations familiales", tag: ["constellations"] },
    ],
  },
  {
    id: "objectif",
    label: "Votre objectif principal sur les 6 prochains mois",
    options: [
      { value: "apaiser", label: "Apaiser une charge émotionnelle, retrouver du calme" },
      { value: "comprendre", label: "Comprendre une situation ou une dynamique de ma vie" },
      { value: "transformer", label: "M'engager dans une transformation profonde" },
      { value: "habiter", label: "Réhabiter mon corps et mes ressentis" },
      { value: "accompagner", label: "Accompagner une transition (parentalité, deuil, rupture)" },
      { value: "ressourcer", label: "Me ressourcer, prendre du recul, retrouver de l'énergie" },
    ],
  },
  {
    id: "frequence",
    label: "À quelle fréquence vous envisagez de pratiquer",
    options: [
      { value: "ponctuel", label: "Une séance ponctuelle pour découvrir" },
      { value: "mensuel", label: "Un rendez-vous régulier (mensuel)" },
      { value: "intensif", label: "Plusieurs séances rapprochées (parcours)" },
      { value: "immersion", label: "Une immersion forte (retraite, week-end)" },
      { value: "indecise", label: "Je laisse Céline me proposer" },
    ],
  },
  {
    id: "niveau",
    label: "Votre niveau de connaissance des pratiques holistiques",
    options: [
      { value: "decouvre", label: "Je découvre — c'est la première fois" },
      { value: "experimente", label: "J'ai déjà pratiqué (yoga, sophrologie, méditation…)" },
      { value: "profond", label: "Je cherche quelque chose de plus profond, je suis prête" },
      { value: "guidee", label: "Je veux être guidée pas à pas, en confiance" },
    ],
  },
  {
    id: "budget",
    label: "Le budget que vous envisagez",
    hint: "Pour vous proposer le format le plus juste — aucun jugement.",
    options: [
      { value: "decouverte", label: "Une séance pour découvrir (autour de 90-110 €)" },
      { value: "court", label: "Quelques séances (300-500 €)" },
      { value: "long", label: "Un vrai parcours (au-delà de 500 €)" },
      { value: "immersion", label: "Une immersion premium (retraite)" },
      { value: "ouvert", label: "Je n'ai pas encore réfléchi" },
    ],
  },
];

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<"intro" | "questions" | "gate" | "result">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [lead, setLead] = useState({ firstname: "", email: "", phone: "", consent: false });
  const [submitting, setSubmitting] = useState(false);

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
    else setPhase("gate");
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setPhase("intro");
    setStep(0);
    setAnswers({});
    setLead({ firstname: "", email: "", phone: "", consent: false });
  };

  const bilan = useMemo(() => buildBilan(answers, lead.firstname), [answers, lead.firstname]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.firstname || !lead.email || !lead.consent) return;
    setSubmitting(true);
    // Envoi simulé — remplacer par fetch /api/send-mail (Resend) une fois branché.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setPhase("result");
  };

  return (
    <>
      <PageHeader
        variant="deep"
        eyebrow="Bilan d'orientation · gratuit · 4 minutes"
        title={
          <>
            La boussole{" "}
            <span className="font-display-italic text-gold-gradient">Etincel</span>.
          </>
        }
        description="Huit questions sensibles pour identifier la pratique la plus juste pour vous, votre rythme et votre moment de vie. Bilan personnalisé envoyé par email + guide PDF de 6 pages offert."
      />

      <section className="pb-24">
        <Container size="narrow">
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Reveal>
                  <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-8 md:p-12 space-y-7">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                      <Compass className="h-3.5 w-3.5" />
                      <span>Bilan personnalisé · 4 minutes</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-text-deep">
                      Une lecture sensible de{" "}
                      <span className="font-display-italic text-gold-deep">votre moment</span>.
                    </h2>
                    <p className="text-text-medium leading-relaxed text-base md:text-lg">
                      Le bilan Etincel n&apos;est ni un test psychologique, ni une lecture spirituelle. C&apos;est une boussole — huit questions pour identifier, parmi les pratiques de Céline, celle qui fait le plus écho à ce que vous traversez aujourd&apos;hui.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 text-sm text-text-medium">
                      <li className="flex items-start gap-3 rounded-2xl border border-border-soft bg-bg-soft/60 p-4">
                        <Sparkles className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        <span>Une recommandation principale + 3 pistes secondaires alignées</span>
                      </li>
                      <li className="flex items-start gap-3 rounded-2xl border border-border-soft bg-bg-soft/60 p-4">
                        <Heart className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        <span>Un profil archétypal qui éclaire votre élan du moment</span>
                      </li>
                      <li className="flex items-start gap-3 rounded-2xl border border-border-soft bg-bg-soft/60 p-4">
                        <Mail className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        <span>Un récap envoyé par email avec liens et tarifs précis</span>
                      </li>
                      <li className="flex items-start gap-3 rounded-2xl border border-border-soft bg-bg-soft/60 p-4">
                        <Download className="h-4 w-4 text-gold-deep mt-0.5 shrink-0" />
                        <span>Le guide PDF « La boussole Etincel » offert</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setPhase("questions")}
                        className="btn-primary"
                      >
                        Commencer le bilan
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <span className="text-xs text-text-soft italic">
                        Aucune carte bancaire · ~4 minutes · vos réponses restent confidentielles
                      </span>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            )}

            {phase === "questions" && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <div className="rounded-[2rem] border border-border-soft bg-bg-card p-7 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-deep">
                      <Compass className="h-3.5 w-3.5" />
                      <span>
                        Question {step + 1} / {questions.length}
                      </span>
                    </div>
                    <div className="flex gap-1.5 max-w-[60%]">
                      {questions.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-300",
                            i < step
                              ? "bg-gold"
                              : i === step
                              ? "bg-gold-deep"
                              : "bg-border-medium",
                          )}
                          style={{ minWidth: 12 }}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl leading-[1.15] text-text-deep mb-2">
                    {currentQuestion.label}
                  </h2>
                  {currentQuestion.hint && (
                    <p className="text-sm text-text-soft mb-8 italic">{currentQuestion.hint}</p>
                  )}
                  {!currentQuestion.hint && (
                    <p className="text-sm text-text-soft mb-8 italic">
                      {currentQuestion.multiple
                        ? "Plusieurs réponses possibles."
                        : "Une seule réponse."}
                    </p>
                  )}

                  <div className="space-y-2.5">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswers.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => toggleAnswer(option.value)}
                          className={cn(
                            "w-full text-left rounded-2xl border px-5 py-4 transition-all flex items-center justify-between gap-4",
                            selected
                              ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(107,79,138,0.15)]"
                              : "border-border-soft hover:border-accent/50 bg-bg-card",
                          )}
                          type="button"
                        >
                          <span className="font-medium text-text-deep">{option.label}</span>
                          <span
                            className={cn(
                              "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                              selected
                                ? "border-accent bg-accent"
                                : "border-border-medium",
                            )}
                            aria-hidden
                          >
                            {selected && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            )}
                          </span>
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
                      {step === questions.length - 1 ? "Voir mon bilan" : "Suivant"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === "gate" && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
                  <div className="rounded-[2rem] border border-border-soft bg-bg-deep text-text-on-dark p-8 md:p-10 space-y-6 relative overflow-hidden">
                    <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

                    <div className="relative space-y-5">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold-soft">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Votre bilan est prêt</span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-on-dark">
                        Plus qu&apos;une étape pour le recevoir.
                      </h2>
                      <p className="text-text-on-dark-soft leading-relaxed">
                        Indiquez votre prénom et votre email — Céline vous envoie immédiatement votre bilan personnalisé, vos pistes secondaires, le tarif précis et le guide PDF « La boussole Etincel ».
                      </p>
                      <ul className="space-y-2.5 text-sm">
                        <li className="flex items-start gap-3 text-text-on-dark-soft">
                          <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                          <span>Récap personnalisé envoyé par email</span>
                        </li>
                        <li className="flex items-start gap-3 text-text-on-dark-soft">
                          <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                          <span>Guide PDF de 6 pages, signé Céline</span>
                        </li>
                        <li className="flex items-start gap-3 text-text-on-dark-soft">
                          <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                          <span>Aucun spam, désinscription en 1 clic</span>
                        </li>
                        <li className="flex items-start gap-3 text-text-on-dark-soft">
                          <Shield className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                          <span>Vos réponses ne sont partagées qu&apos;avec Céline</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form
                    onSubmit={handleLeadSubmit}
                    className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-7 md:p-10 space-y-5"
                  >
                    <p className="font-display text-2xl text-text-deep leading-tight">
                      Recevoir mon bilan personnalisé
                    </p>
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Prénom
                      </label>
                      <input
                        required
                        value={lead.firstname}
                        onChange={(e) => setLead({ ...lead, firstname: e.target.value })}
                        placeholder="Votre prénom"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={lead.email}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        placeholder="vous@email.fr"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Téléphone <span className="opacity-60">(optionnel)</span>
                      </label>
                      <input
                        type="tel"
                        value={lead.phone}
                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                        placeholder="06 ..."
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={lead.consent}
                        onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                      />
                      <span>
                        J&apos;accepte de recevoir mon bilan, le guide PDF et d&apos;éventuels messages d&apos;Etincel. Désinscription possible à tout moment.
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting || !lead.firstname || !lead.email || !lead.consent}
                      className="btn-primary w-full justify-center disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Envoi du bilan…
                        </>
                      ) : (
                        <>
                          Recevoir mon bilan
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase("questions")}
                      className="block w-full text-center text-xs text-text-soft hover:text-text-deep transition-colors"
                    >
                      ← Modifier mes réponses
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Bloc 1 — Profil archétypal */}
                <div className="rounded-[2rem] border border-gold-soft/60 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                        Votre profil — {lead.firstname || "vous"}
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl text-text-deep mt-1 leading-tight">
                        {bilan.profile.title}
                      </h2>
                    </div>
                  </div>
                  <p className="font-display-italic text-xl md:text-2xl text-gold-deep leading-snug">
                    « {bilan.profile.catchphrase} »
                  </p>
                  <p className="text-text-medium leading-relaxed text-base md:text-lg">
                    {bilan.profile.shortDescription}
                  </p>
                </div>

                {/* Bloc 2 — Ce qui se joue pour vous */}
                <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-10 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep flex items-center gap-2">
                      <Etincelle size={11} />
                      <span>Ce qui se joue pour vous</span>
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-text-deep mt-2 leading-tight">
                      Une lecture sensible de vos réponses.
                    </h3>
                  </div>
                  <div className="space-y-4 text-text-medium leading-relaxed">
                    {bilan.whatsAtPlay.map((p, i) => (
                      <p key={i} className="text-base md:text-[1.05rem]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bloc 3 — Pratique principale + raison */}
                <div className="rounded-[2rem] border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-8 md:p-10 space-y-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                        Votre porte d&apos;entrée principale
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-text-deep mt-1">
                        {bilan.whyThisPractice.practice.name}
                      </h3>
                      <p className="text-sm text-text-soft mt-1">
                        {bilan.whyThisPractice.practice.duration} ·{" "}
                        {bilan.whyThisPractice.practice.format}
                      </p>
                    </div>
                    <span className="font-display text-3xl text-gold-deep">
                      {bilan.whyThisPractice.practice.price}
                    </span>
                  </div>
                  <p className="text-text-medium leading-relaxed">
                    {bilan.whyThisPractice.practice.pitch}
                  </p>
                  <div className="rounded-2xl bg-bg-soft/60 border border-border-soft p-5">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold-deep mb-2">
                      Pourquoi cette pratique pour vous
                    </p>
                    <p className="text-sm text-text-medium leading-relaxed">
                      {bilan.whyThisPractice.reason}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href={bilan.reservationHref} className="btn-primary">
                      Réserver une séance
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/accompagnements/${bilan.whyThisPractice.practice.slug}`}
                      className="btn-secondary"
                    >
                      En savoir plus sur la pratique
                    </Link>
                    <WhatsAppButton message={whatsappMessages.bilan} variant="outline">
                      WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>

                {/* Bloc 4 — Parcours 3 mois */}
                <div className="rounded-[2rem] border border-border-soft bg-bg-deep text-text-on-dark p-8 md:p-10 space-y-6 relative overflow-hidden">
                  <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-soft">
                      Votre parcours suggéré · 3 mois
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-text-on-dark mt-1 leading-tight">
                      Un cheminement, pas une séance isolée.
                    </h3>
                    <p className="text-text-on-dark-soft leading-relaxed mt-3 max-w-2xl">
                      Une trajectoire indicative que Céline ajuste avec vous. Chaque brique se réserve séparément — vous restez libre du rythme.
                    </p>
                  </div>

                  <ol className="relative space-y-3">
                    {bilan.parcours3Months.map((m, i) => (
                      <li
                        key={m.month}
                        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6"
                      >
                        <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                          <span className="font-display-italic text-gold tabular-nums text-lg shrink-0">
                            Mois {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-xl md:text-2xl text-text-on-dark">
                            {m.label}
                          </span>
                        </div>
                        <p className="text-sm text-text-on-dark-soft leading-relaxed mb-3">
                          {m.intention}
                        </p>
                        <ul className="space-y-1.5">
                          {m.practices.map((p, j) => (
                            <li key={j} className="flex items-baseline justify-between gap-3 text-sm">
                              {p.href ? (
                                <Link
                                  href={p.href}
                                  className="text-gold-soft hover:text-gold inline-flex items-center gap-1.5 transition-colors"
                                >
                                  <span>{p.name}</span>
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                              ) : (
                                <span className="text-text-on-dark/90">{p.name}</span>
                              )}
                              {p.price && (
                                <span className="text-text-on-dark-soft/80 text-xs shrink-0">{p.price}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>

                  <div className="relative rounded-2xl bg-gold-soft/15 border border-gold-soft/30 p-5">
                    <p className="text-sm text-text-on-dark leading-relaxed">
                      <strong>Envie d&apos;un parcours sur-mesure de 3 mois ?</strong>{" "}
                      Céline construit aussi des accompagnements dédiés (briques choisies ensemble + paiement échelonné). Demandez-lui directement.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <WhatsAppButton
                        message="Bonjour Céline, j'aimerais discuter d'un accompagnement sur 3 mois personnalisé suite à mon bilan."
                        size="sm"
                      >
                        Demander un parcours sur-mesure
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>

                {/* Bloc 5 — Ce que vous pourriez ressentir */}
                <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-10 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                      Après quelques séances
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-text-deep mt-1 leading-tight">
                      Ce que vous pourriez vivre.
                    </h3>
                    <p className="text-sm text-text-soft mt-2 italic">
                      Aucune promesse — chaque cheminement est singulier. Voici ce que de nombreuses personnes accompagnées rapportent.
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {bilan.couldFeel.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-medium leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-gold-deep mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bloc 6 — Mot de Céline */}
                <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/20 via-bg-card to-bg-card p-8 md:p-10 space-y-5">
                  <div className="flex items-center gap-3">
                    <Quote className="h-5 w-5 text-gold-deep" />
                    <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">
                      Le mot de Céline
                    </p>
                  </div>
                  <p className="font-display-italic text-xl md:text-2xl leading-[1.4] text-text-deep">
                    {bilan.celineMessage}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-border-soft">
                    <Link href={bilan.reservationHref} className="btn-primary">
                      Réserver maintenant
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <WhatsAppButton message={whatsappMessages.bilan}>
                      Échanger sur WhatsApp
                    </WhatsAppButton>
                    <Link
                      href={`/contact?sujet=${encodeURIComponent("Bilan — " + bilan.whyThisPractice.practice.name)}`}
                      className="btn-secondary"
                    >
                      Lui écrire
                    </Link>
                  </div>
                </div>

                {/* Bloc 7 — Pratiques secondaires */}
                {bilan.recommendedSecondary.length > 0 && (
                  <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-10 space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
                        En complément
                      </p>
                      <h3 className="font-display text-2xl text-text-deep mt-1">
                        Trois autres pratiques qui résonnent.
                      </h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {bilan.recommendedSecondary.map((reco) => (
                        <Link
                          key={reco.slug}
                          href={`/accompagnements/${reco.slug}`}
                          className="group rounded-2xl border border-border-soft bg-bg-soft/40 p-5 hover:border-gold-soft hover:bg-bg-card transition-all"
                        >
                          <div className="flex items-baseline justify-between gap-3 mb-1">
                            <h4 className="font-display text-lg text-text-deep">{reco.name}</h4>
                            <span className="text-xs text-gold-deep shrink-0">{reco.price}</span>
                          </div>
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

                {/* Bloc 8 — Cartes contextuelles (immersion / cadeau) */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {bilan.suggestRetreat && (
                    <Link
                      href="/retraites#interet"
                      className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors flex items-start gap-3"
                    >
                      <Mountain className="h-5 w-5 text-gold-deep mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-gold-deep mb-1">
                          Vous cherchez une immersion
                        </p>
                        <p className="font-display text-lg text-text-deep">
                          Liste d&apos;intérêt retraites →
                        </p>
                      </div>
                    </Link>
                  )}
                  <Link
                    href="/cartes-cadeaux"
                    className="rounded-2xl border border-border-soft bg-bg-card p-5 hover:border-gold-soft transition-colors flex items-start gap-3"
                  >
                    <Gift className="h-5 w-5 text-gold-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep mb-1">
                        Offrir une parenthèse
                      </p>
                      <p className="font-display text-lg text-text-deep">
                        Composer une carte cadeau →
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="rounded-[2rem] border border-gold-soft/40 bg-gradient-to-br from-gold-soft/30 via-bg-card to-bg-card p-7 md:p-10">
                  <div className="flex flex-wrap items-start gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep shrink-0">
                      <Download className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <p className="font-display text-2xl text-text-deep">
                        Votre guide PDF est prêt, {lead.firstname}.
                      </p>
                      <p className="text-sm text-text-medium leading-relaxed">
                        « La boussole Etincel » — 6 pages signées Céline. Une copie a aussi été envoyée à <strong>{lead.email}</strong>.
                      </p>
                      <a
                        href={asset("/boussole-etincel.pdf")}
                        download="boussole-etincel.pdf"
                        className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-5 py-2.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors mt-2"
                      >
                        <Download className="h-4 w-4" />
                        Télécharger « La boussole Etincel »
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                  <p className="text-xs text-text-soft leading-relaxed flex items-center gap-2">
                    <Etincelle size={10} />
                    Ce bilan ne remplace pas un échange direct avec Céline. Il vous oriente.
                  </p>
                  <button
                    onClick={reset}
                    className="text-sm text-text-soft hover:text-text-deep transition-colors"
                    type="button"
                  >
                    Refaire le bilan
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
