"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";

const STORAGE_KEY = "etincel-popup-dismissed";
const DISPLAY_DELAY_MS = 25_000;
const REAPPEAR_DAYS = 14;

type Variant = "diagnostic" | "newsletter";

const variants: Record<Variant, {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}> = {
  diagnostic: {
    eyebrow: "Une porte d'entrée pour vous",
    title: "Vous ne savez pas quel accompagnement choisir ?",
    description:
      "Quelques questions douces pour identifier la pratique qui correspond à votre besoin du moment.",
    cta: { label: "Faire le diagnostic", href: "/diagnostic" },
  },
  newsletter: {
    eyebrow: "Recevoir le guide offert",
    title: "5 portes pour revenir à soi",
    description:
      "Un petit guide pour reconnaître les signaux du corps et retrouver votre étincelle intérieure.",
    cta: { label: "Le recevoir par email", href: "/contact?lead=guide" },
  },
};

export function SmartPopup({ variant = "diagnostic" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const content = variants[variant];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const dismissedAt = Number(stored);
      const elapsedDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (elapsedDays < REAPPEAR_DAYS) return;
    }

    let timeoutId: number | null = null;
    let exitListener: ((event: MouseEvent) => void) | null = null;

    const trigger = () => {
      setOpen(true);
      cleanup();
    };

    const cleanup = () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (exitListener) document.removeEventListener("mouseleave", exitListener);
    };

    timeoutId = window.setTimeout(trigger, DISPLAY_DELAY_MS);
    exitListener = (event) => {
      if (event.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", exitListener);

    return cleanup;
  }, []);

  const dismiss = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-deep/40 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl bg-bg-card border border-border-soft shadow-[0_30px_80px_rgba(31,26,46,0.25)]">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-soft text-text-medium hover:text-text-deep transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative p-8 md:p-10 space-y-5">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                  <span className="text-gold">
                    <Etincelle size={14} />
                  </span>
                  <span>{content.eyebrow}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-[1.1] text-text-deep">
                  {content.title}
                </h3>
                <p className="text-text-medium leading-relaxed">
                  {content.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={content.cta.href}
                    className="btn-primary"
                    onClick={dismiss}
                  >
                    {content.cta.label}
                  </Link>
                  <button
                    onClick={dismiss}
                    className="text-sm text-text-soft hover:text-text-deep transition-colors py-2"
                  >
                    Plus tard, merci
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
