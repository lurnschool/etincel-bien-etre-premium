"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { disclaimers } from "@/lib/data";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Etincelle } from "@/components/ui/Etincelle";

type Suggestion = {
  id: string;
  label: string;
  href?: string;
  whatsapp?: string;
};

const suggestions: Suggestion[] = [
  { id: "bilan", label: "Je veux savoir quoi choisir", href: "/diagnostic" },
  { id: "cacao", label: "Je veux découvrir le cacao", href: "/cacao" },
  { id: "numerologie", label: "Je veux une lecture numérologique", href: "/accompagnements/numerologie" },
  { id: "constellations", label: "Je veux explorer les constellations", href: "/constellations" },
  { id: "cadeau", label: "Je veux offrir une carte cadeau", href: "/cartes-cadeaux" },
  { id: "celine", label: "Je veux parler à Céline (WhatsApp)", whatsapp: whatsappMessages.generic },
];

/**
 * Conciergerie premium "Besoin d'être guidée ?"
 * Bouton flottant élégant + panneau glass.
 * Mode "préparation" — l'IA Anthropic n'est pas branchée, le panneau
 * propose des actions concrètes (liens + WhatsApp).
 */
export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", handler);
    }, 100);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full",
          "bg-gradient-to-br from-accent to-accent-deep text-text-on-dark shadow-[0_12px_40px_rgba(74,52,99,0.4)]",
          "pl-3 pr-5 py-3 hover:shadow-[0_16px_48px_rgba(74,52,99,0.55)] transition-all",
          open && "pointer-events-none opacity-0",
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Ouvrir la conciergerie"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-gold/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold text-text-deep">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="relative font-display-italic text-[0.95rem] hidden sm:inline">
          Besoin d&apos;être guidée&nbsp;?
        </span>
        <span className="relative font-display-italic text-[0.95rem] sm:hidden">
          Guidance
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-bg-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              ref={panelRef}
              role="dialog"
              aria-label="Conciergerie Etincel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed z-50 flex flex-col bg-bg-card/95 backdrop-blur-2xl border border-border-soft",
                "shadow-[0_30px_80px_rgba(31,26,46,0.25)]",
                "inset-x-4 bottom-4 top-20 rounded-3xl",
                "md:inset-auto md:bottom-6 md:right-6 md:top-auto md:w-[28rem] md:max-h-[40rem]",
              )}
            >
              {/* Header */}
              <header className="flex items-center justify-between gap-3 p-6 border-b border-border-soft bg-gradient-to-br from-bg-soft/60 to-transparent rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-text-on-dark">
                    <span className="absolute inset-0 rounded-full ring-2 ring-gold/30 animate-pulse" />
                    <Etincelle size={18} />
                  </div>
                  <div>
                    <p className="font-display text-xl leading-none text-text-deep">
                      Etincel
                    </p>
                    <p className="text-[0.7rem] text-text-soft mt-1.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      Conciergerie · mode préparation
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-card border border-border-soft hover:border-accent transition-colors"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              {/* Corps */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div className="space-y-2">
                  <p className="font-display-italic text-[1.4rem] leading-snug text-text-deep">
                    Quelques pistes pour vous orienter.
                  </p>
                  <p className="text-sm text-text-medium leading-relaxed">
                    Choisissez ce qui résonne ou demandez à parler directement à Céline.
                  </p>
                </div>

                <ul className="space-y-2">
                  {suggestions.map((s) => {
                    const isWhatsApp = !!s.whatsapp;
                    const commonClass = cn(
                      "group flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 transition-all",
                      isWhatsApp
                        ? "border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]"
                        : "border-border-soft bg-bg-soft/40 hover:border-accent hover:bg-bg-card",
                    );
                    const labelClass = cn(
                      "font-display text-[0.95rem] leading-snug",
                      isWhatsApp ? "text-[#1ebe5a]" : "text-text-deep group-hover:text-accent",
                    );
                    const arrowClass = cn(
                      "h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5",
                      isWhatsApp ? "text-[#1ebe5a]" : "text-text-soft group-hover:text-accent",
                    );

                    if (isWhatsApp) {
                      return (
                        <li key={s.id}>
                          <a
                            href={whatsappLink(s.whatsapp!)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className={commonClass}
                          >
                            <span className={labelClass}>{s.label}</span>
                            <ArrowRight className={arrowClass} />
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={s.id}>
                        <Link
                          href={s.href ?? "/"}
                          onClick={() => setOpen(false)}
                          className={commonClass}
                        >
                          <span className={labelClass}>{s.label}</span>
                          <ArrowRight className={arrowClass} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Encart bilan */}
                <Link
                  href="/diagnostic"
                  onClick={() => setOpen(false)}
                  className="group block rounded-2xl bg-gradient-to-br from-gold-soft/40 via-rose-soft/30 to-bg-soft border border-gold-soft/60 p-5 hover:border-gold transition-colors"
                >
                  <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep mb-2">
                    <Etincelle size={10} />
                    <span>Bilan d&apos;orientation</span>
                  </div>
                  <p className="font-display text-[1.1rem] text-text-deep leading-snug mb-1">
                    Trouver votre porte d&apos;entrée
                  </p>
                  <p className="text-[0.78rem] text-text-medium leading-relaxed">
                    Quelques questions douces pour identifier la pratique qui résonne.
                  </p>
                </Link>
              </div>

              {/* Footer */}
              <div className="border-t border-border-soft p-5 space-y-3 bg-bg-soft/30">
                <a
                  href={whatsappLink(whatsappMessages.generic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white px-4 py-3 text-sm font-medium hover:bg-[#1ebe5a] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Parler à Céline sur WhatsApp
                </a>
                <p className="text-[0.65rem] text-text-soft leading-relaxed text-center">
                  {disclaimers.ia}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
