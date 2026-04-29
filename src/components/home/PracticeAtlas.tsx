"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { cn } from "@/lib/utils";
import {
  practiceFamilies,
  accompagnementsIndividuels,
  whisperLines,
} from "@/lib/data";

/**
 * Atlas des pratiques — colonne familles à gauche, contenu détaillé à droite.
 * Évite la grille de 12 cartes : on ne montre qu'une famille à la fois.
 */
export function PracticeAtlas() {
  const [familyId, setFamilyId] = useState<string>(practiceFamilies[0].id);
  const family = practiceFamilies.find((f) => f.id === familyId)!;
  const familyPractices = family.practices
    .map((slug) => accompagnementsIndividuels.find((a) => a.slug === slug))
    .filter(Boolean);

  return (
    <section
      id="atlas"
      className="relative section bg-bg-soft overflow-hidden scroll-mt-20"
    >
      <WhisperLine text={whisperLines[6]} position="right" tone="gold" />

      <Container size="wide">
        <Reveal className="max-w-3xl mb-14">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
              <span className="text-gold">
                <Etincelle size={12} />
              </span>
              <span>Atlas des pratiques</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep">
              Les pratiques comme{" "}
              <span className="font-display-italic text-gold-deep">portes d&apos;entrée</span>.
            </h2>
            <p className="text-text-medium leading-relaxed text-base md:text-lg">
              Plutôt qu&apos;une longue liste, six familles pour s&apos;orienter sereinement. Une famille s&apos;ouvre, ses pratiques se révèlent.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[18rem_1fr] gap-2 lg:gap-12">
          <Reveal>
            <ul className="lg:sticky lg:top-28 space-y-1 lg:space-y-0">
              {practiceFamilies.map((f) => {
                const isActive = f.id === familyId;
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => setFamilyId(f.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 text-left py-3.5 px-2 lg:px-3 transition-colors border-b border-border-soft/60 cursor-pointer",
                        isActive
                          ? "text-accent-deep"
                          : "text-text-deep/75 hover:text-accent",
                      )}
                      aria-pressed={isActive}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "h-px transition-all duration-500",
                            isActive ? "w-8 bg-gold" : "w-3 bg-border-medium",
                          )}
                          aria-hidden
                        />
                        <span className="font-display text-lg leading-tight">
                          {f.label}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "text-xs transition-opacity",
                          isActive ? "opacity-100 text-gold-deep" : "opacity-0",
                        )}
                      >
                        ◆
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={family.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.28em] text-gold-deep">
                    Famille
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight text-text-deep">
                    {family.label}
                  </h3>
                  <p className="text-text-medium leading-relaxed">
                    {family.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {familyPractices.map((p, i) => (
                    <PracticeAccordion
                      key={p!.slug}
                      practice={p!}
                      defaultOpen={i === 0}
                    />
                  ))}

                  {family.extraLinks?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border-soft bg-bg-card/60 px-6 py-4 hover:border-gold-soft hover:bg-bg-card transition-all"
                    >
                      <span className="font-display text-xl text-text-deep group-hover:text-accent">
                        {link.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-text-soft group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>

                {familyPractices.length === 0 && !family.extraLinks?.length && (
                  <p className="text-text-soft italic">À venir.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

type PracticeT = (typeof accompagnementsIndividuels)[number];

function PracticeAccordion({
  practice,
  defaultOpen = false,
}: {
  practice: PracticeT;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article
      className={cn(
        "rounded-2xl border bg-bg-card/80 backdrop-blur-sm transition-all duration-500",
        open
          ? "border-gold-soft/60 shadow-[0_12px_40px_rgba(31,26,46,0.06)]"
          : "border-border-soft hover:border-gold-soft/40",
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex items-center gap-4">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              open ? "bg-gold" : "bg-border-medium",
            )}
            aria-hidden
          />
          <span className="font-display text-xl md:text-2xl text-text-deep">
            {practice.name}
          </span>
        </span>
        <span
          className={cn(
            "text-text-soft text-sm transition-transform duration-300",
            open && "rotate-45 text-gold-deep",
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              <p className="text-text-medium leading-relaxed max-w-2xl">
                {practice.pitch}
              </p>
              <p className="text-sm text-text-soft italic max-w-2xl">
                {practice.forWho}
              </p>
              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-soft pt-2">
                <div className="flex items-center gap-1.5">
                  <dt>Format :</dt>
                  <dd className="text-text-medium">{practice.format}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt>Durée :</dt>
                  <dd className="text-text-medium">{practice.duration}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt>Tarif :</dt>
                  <dd className="text-text-medium font-medium">{practice.price}</dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/accompagnements/${practice.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep transition-colors"
                >
                  Voir la page complète
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/contact?sujet=${encodeURIComponent(practice.name)}`}
                  className="inline-flex items-center gap-1.5 text-sm text-text-medium hover:text-accent transition-colors"
                >
                  Demander un rendez-vous
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
