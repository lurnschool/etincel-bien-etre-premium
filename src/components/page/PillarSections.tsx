"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  PourQui — "Ce que vous pouvez venir déposer" en prose                     */
/* -------------------------------------------------------------------------- */

type PourQuiProps = {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  background?: "bg-base" | "paper-warm" | "paper-sand";
};

const BG_CLASS: Record<NonNullable<PourQuiProps["background"]>, string> = {
  "bg-base": "bg-bg-base",
  "paper-warm": "paper-warm",
  "paper-sand": "paper-sand",
};

export function PillarPourQuiSection({
  eyebrow,
  title,
  paragraphs,
  background = "bg-base",
}: PourQuiProps) {
  return (
    <section className={cn("relative py-20 md:py-28", BG_CLASS[background])}>
      <Container>
        <div className="max-w-3xl mx-auto space-y-7 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
              {title}
            </h2>
          </motion.div>

          <div className="space-y-5 max-w-2xl mx-auto pt-4 text-left">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: i * 0.1 }}
                className="text-base md:text-lg leading-relaxed text-text-medium"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Formats — 4 cards douces (titre + body + meta tarif/durée)                */
/* -------------------------------------------------------------------------- */

type FormatCard = {
  id: string;
  title: string;
  body: string;
  meta: string;
};

type FormatsProps = {
  eyebrow: string;
  title: string;
  body: string;
  cards: readonly FormatCard[];
  background?: "bg-base" | "paper-warm" | "paper-sand";
};

export function PillarFormatsSection({
  eyebrow,
  title,
  body,
  cards,
  background = "paper-sand",
}: FormatsProps) {
  return (
    <section className={cn("relative py-20 md:py-28", BG_CLASS[background])}>
      <Container>
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
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            {body}
          </p>
        </motion.div>

        <ul className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.li
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: i * 0.08 }}
              className="group flex flex-col rounded-[1.5rem] bg-bg-card border border-border-soft p-7 md:p-8 hover:border-gold-soft hover:shadow-[0_18px_40px_rgba(31,26,46,0.08)] transition-all duration-500"
            >
              <h3 className="font-display text-xl md:text-2xl text-text-deep leading-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-text-medium flex-1">
                {card.body}
              </p>
              <p className="mt-5 text-[0.7rem] uppercase tracking-[0.28em] text-gold-deep border-t border-border-soft/60 pt-4">
                {card.meta}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ — accordéon doux                                                      */
/* -------------------------------------------------------------------------- */

type FaqEntry = {
  q: string;
  a: string;
};

type FaqProps = {
  eyebrow?: string;
  title?: string;
  items: readonly FaqEntry[];
  background?: "bg-base" | "paper-warm" | "paper-sand";
};

export function PillarFaqSection({
  eyebrow = "Questions douces",
  title = "Quelques points pour vous repérer.",
  items,
  background = "bg-base",
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={cn("relative py-20 md:py-28", BG_CLASS[background])}>
      <Container>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="text-center mb-12 md:mb-14 space-y-5"
          >
            <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
              <span className="text-gold-deep">
                <Etincelle size={11} />
              </span>
              <span>{eyebrow}</span>
            </div>
            <h2 className="font-display text-balance text-2xl md:text-3xl lg:text-[2rem] leading-[1.2] text-text-deep">
              {title}
            </h2>
          </motion.div>

          <ul className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="rounded-[1.25rem] bg-bg-card border border-border-soft overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 md:py-5 text-left hover:bg-bg-soft/50 transition-colors"
                  >
                    <span className="font-display text-base md:text-lg text-text-deep leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-text-soft transition-transform duration-300 shrink-0",
                        isOpen && "rotate-180 text-accent",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm md:text-[0.95rem] leading-relaxed text-text-medium">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Disclaimer — bandeau discret                                              */
/* -------------------------------------------------------------------------- */

export function PillarDisclaimer({ text }: { text: string }) {
  return (
    <section className="bg-bg-base pb-12 md:pb-16">
      <Container>
        <div className="max-w-3xl mx-auto rounded-2xl border border-border-soft bg-bg-soft/40 p-5 text-xs leading-relaxed text-text-soft text-center">
          {text}
        </div>
      </Container>
    </section>
  );
}
