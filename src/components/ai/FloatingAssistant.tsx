"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Send, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { disclaimers } from "@/lib/data";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Etincelle } from "@/components/ui/Etincelle";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatStatus = "idle" | "sending" | "fallback" | "error";

const suggestions = [
  { id: "bilan", label: "Quelle pratique me correspond ?" },
  { id: "cacao", label: "Comment se passe un rituel cacao ?" },
  { id: "constellations", label: "Constellation familiale, c'est quoi ?" },
  { id: "numerologie", label: "Comment se passe une lecture numérologique ?" },
  { id: "cadeau", label: "Comment offrir une carte cadeau ?" },
  { id: "retraite", label: "Y a-t-il une prochaine retraite ?" },
];

const intro: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour, je suis la conciergerie virtuelle d'Etincel. Je peux vous orienter vers la pratique la plus juste pour votre besoin. Posez-moi votre question — ou choisissez une suggestion ci-dessous.",
};

/**
 * Conciergerie IA — chat conversationnel branché sur l'API Anthropic.
 *
 * - Composant client à droite (le WhatsApp flottant est à gauche).
 * - Appelle /api/ai-chat (route Anthropic, voir src/app/api/ai-chat/route.ts).
 * - Si la route renvoie 404 (export statique GitHub Pages) ou 503
 *   (clé API absente), on passe en mode fallback : message clair, pas de
 *   simulation. La personne est invitée à WhatsApp ou aux liens internes.
 * - Le mode est annoncé honnêtement dans l'en-tête du panneau.
 */
export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([intro]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === "sending") return;

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setStatus("sending");
    setErrorDetail(null);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((_, i) => i > 0).slice(-12), // skip intro
        }),
      });

      if (res.status === 404) {
        setStatus("fallback");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "Le chat IA n'est pas encore activé sur cet hébergement (GitHub Pages ne permet pas d'exécuter l'API). Le site va prochainement basculer sur Vercel pour l'activer. En attendant, écrivez directement à Céline sur WhatsApp — elle vous répondra personnellement.",
          },
        ]);
        return;
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          fallback?: boolean;
        };
        if (data.fallback || res.status === 503) {
          setStatus("fallback");
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content:
                "L'API Anthropic n'est pas configurée sur cet hébergement (clé absente). Le chat sera actif dès le passage sur Vercel avec ANTHROPIC_API_KEY. En attendant, je vous invite à utiliser le bilan d'orientation ou WhatsApp.",
            },
          ]);
          return;
        }
        setStatus("error");
        setErrorDetail(data.error ?? `Erreur ${res.status}`);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "Désolée, je rencontre une difficulté technique pour vous répondre. Le mieux : écrivez directement à Céline sur WhatsApp.",
          },
        ]);
        return;
      }

      const data = (await res.json()) as { text?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.text?.trim() ||
            "Je n'ai pas réussi à générer une réponse. Essayez de reformuler ou contactez Céline sur WhatsApp.",
        },
      ]);
      setStatus("idle");
    } catch (err) {
      setStatus("fallback");
      setErrorDetail(err instanceof Error ? err.message : String(err));
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Le chat IA n'est pas joignable depuis cet hébergement statique. Pour échanger avec Céline maintenant, utilisez WhatsApp ou le bilan d'orientation.",
        },
      ]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const reset = () => {
    setMessages([intro]);
    setStatus("idle");
    setErrorDetail(null);
  };

  const statusLabel =
    status === "fallback"
      ? "Mode aperçu · à activer sur Vercel"
      : status === "error"
      ? "Service IA indisponible"
      : status === "sending"
      ? "L'assistant rédige…"
      : "Conciergerie IA · prête";

  const statusDot =
    status === "fallback" || status === "error"
      ? "bg-rose"
      : status === "sending"
      ? "bg-gold-soft animate-pulse"
      : "bg-gold";

  return (
    <>
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
        aria-label="Ouvrir la conciergerie IA"
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
          Conciergerie IA
        </span>
        <span className="relative font-display-italic text-[0.95rem] sm:hidden">
          IA
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
              aria-label="Conciergerie IA Etincel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed z-50 flex flex-col bg-bg-card backdrop-blur-2xl border border-border-soft",
                "shadow-[0_30px_80px_rgba(31,26,46,0.25)]",
                "inset-x-4 bottom-4 top-20 rounded-3xl",
                "md:inset-auto md:bottom-6 md:right-6 md:top-auto md:w-[30rem] md:h-[calc(100vh-3rem)] md:max-h-[44rem]",
              )}
            >
              <header className="flex items-center justify-between gap-3 p-5 border-b border-border-soft bg-gradient-to-br from-bg-soft/60 to-transparent rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-text-on-dark">
                    <span className="absolute inset-0 rounded-full ring-2 ring-gold/30 animate-pulse" />
                    <Etincelle size={16} />
                  </div>
                  <div>
                    <p className="font-display text-lg leading-none text-text-deep">
                      Etincel · IA
                    </p>
                    <p className="text-[0.68rem] text-text-soft mt-1.5 flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", statusDot)} />
                      {statusLabel}
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

              {(status === "fallback" || status === "error") && (
                <div className="px-5 pt-4">
                  <div className="flex gap-3 rounded-2xl border border-rose/30 bg-rose-soft/20 p-3 text-[0.78rem] text-text-deep leading-relaxed">
                    <AlertTriangle className="h-4 w-4 text-rose mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">
                        {status === "fallback"
                          ? "Chat IA pas encore activé sur cet hébergement"
                          : "Service IA momentanément indisponible"}
                      </p>
                      <p className="text-text-medium mt-0.5">
                        {status === "fallback"
                          ? "GitHub Pages ne peut pas exécuter l'API. Cette interface sera fonctionnelle dès le passage sur Vercel."
                          : "Réessayez dans un instant ou écrivez à Céline sur WhatsApp."}
                      </p>
                      {errorDetail && (
                        <p className="mt-1 text-text-soft text-[0.7rem] font-mono">
                          {errorDetail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                        m.role === "user"
                          ? "bg-accent-deep text-text-on-dark"
                          : "bg-bg-soft text-text-deep border border-border-soft",
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {status === "sending" && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl bg-bg-soft border border-border-soft px-4 py-2.5 text-sm text-text-medium">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                      Recherche en cours…
                    </div>
                  </div>
                )}

                {messages.length <= 1 && status === "idle" && (
                  <div className="pt-2 space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold-deep px-1">
                      Suggestions
                    </p>
                    <ul className="space-y-1.5">
                      {suggestions.map((s) => (
                        <li key={s.id}>
                          <button
                            onClick={() => void send(s.label)}
                            className="w-full text-left rounded-xl border border-border-soft bg-bg-soft/40 px-3.5 py-2.5 text-[0.85rem] text-text-deep hover:border-accent hover:bg-bg-card transition-colors"
                          >
                            {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/diagnostic"
                      onClick={() => setOpen(false)}
                      className="mt-3 block rounded-xl bg-gradient-to-br from-gold-soft/40 via-rose-soft/30 to-bg-soft border border-gold-soft/60 p-4 hover:border-gold transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
                            Bilan d&apos;orientation
                          </p>
                          <p className="font-display text-base text-text-deep mt-1">
                            Trouver votre porte d&apos;entrée
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gold-deep" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-t border-border-soft p-3 space-y-2 bg-bg-soft/30 rounded-b-3xl"
              >
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(input);
                      }
                    }}
                    placeholder="Décrivez votre besoin…"
                    rows={1}
                    className="flex-1 max-h-32 resize-none rounded-2xl border border-border-soft bg-bg-card px-4 py-2.5 text-sm leading-relaxed focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    disabled={status === "sending"}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending" || !input.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-deep text-text-on-dark disabled:opacity-40 hover:bg-accent transition-colors shrink-0"
                    aria-label="Envoyer"
                  >
                    {status === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 px-1">
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.7rem] text-[#1ebe5a] hover:underline"
                  >
                    Plutôt parler à Céline directement →
                  </a>
                  {messages.length > 1 && (
                    <button
                      type="button"
                      onClick={reset}
                      className="text-[0.7rem] text-text-soft hover:text-text-deep transition-colors"
                    >
                      Recommencer
                    </button>
                  )}
                </div>
                <p className="text-[0.62rem] text-text-soft leading-relaxed text-center pt-1">
                  {disclaimers.ia}
                </p>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
