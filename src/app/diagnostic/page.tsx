"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { accompagnementsIndividuels } from "@/lib/data";

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
  };

  // Calcul ultra simple : compter les tags qui reviennent dans les réponses
  const getRecommendations = () => {
    const tags: string[] = [];
    Object.entries(answers).forEach(([qId, values]) => {
      const q = questions.find((q) => q.id === qId);
      values.forEach((v) => {
        const opt = q?.options.find((o) => o.value === v);
        if (opt?.tag) tags.push(...opt.tag);
      });
    });
    if (tags.length === 0) return accompagnementsIndividuels.slice(0, 3);
    const matched = accompagnementsIndividuels.filter((a) => tags.includes(a.family));
    return matched.length > 0 ? matched.slice(0, 4) : accompagnementsIndividuels.slice(0, 3);
  };

  return (
    <>
      <PageHeader
        eyebrow="Diagnostic en 4 questions"
        title={
          <>
            Trouver{" "}
            <span className="font-display-italic text-gold-deep">votre porte d'entrée</span>
          </>
        }
        description="Quelques minutes pour identifier la pratique qui résonne le mieux avec votre besoin du moment."
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
                  {currentQuestion.multiple ? "Vous pouvez sélectionner plusieurs réponses" : "Sélectionnez une réponse"}
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
              className="space-y-8"
            >
              <div className="rounded-[2rem] border border-border-soft bg-bg-card p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">Vos pistes</p>
                    <p className="font-display text-2xl text-text-deep">
                      Voici ce qui vous correspond
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {getRecommendations().map((reco) => (
                    <div key={reco.slug} className="rounded-2xl border border-border-soft bg-bg-soft/50 p-5">
                      <h3 className="font-display text-xl text-text-deep mb-1.5">{reco.name}</h3>
                      <p className="text-sm text-text-medium leading-relaxed">{reco.pitch}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border-soft">
                  <Link href="/contact?sujet=Diagnostic" className="btn-primary">
                    Échanger avec Céline
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button onClick={reset} className="btn-secondary" type="button">
                    Refaire le diagnostic
                  </button>
                </div>
              </div>

              <p className="text-xs text-text-soft leading-relaxed text-center max-w-xl mx-auto flex items-center justify-center gap-2">
                <Etincelle size={10} />
                Ce diagnostic ne remplace pas un échange avec Céline. Il vous aide simplement à identifier une première porte d'entrée.
              </p>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
