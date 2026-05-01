"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Send,
  AlertTriangle,
  Loader2,
  Compass,
  Sparkles,
  Phone,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  { id: "bilan", label: "Par où commencer ?" },
  { id: "cacao", label: "Comment se passe un rituel cacao ?" },
  { id: "constellations", label: "Une constellation familiale, c'est quoi ?" },
  { id: "numerologie", label: "Comment se passe une lecture numérologique ?" },
  { id: "cadeau", label: "Offrir un moment à quelqu'un ?" },
  { id: "retraite", label: "Y a-t-il une prochaine retraite ?" },
];

type QuickAction = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
};

const quickActions: QuickAction[] = [
  {
    id: "bilan",
    label: "Me laisser guider",
    description: "Quelques questions douces pour trouver votre porte d'entrée",
    icon: Compass,
    href: "/diagnostic",
  },
  {
    id: "numerologie",
    label: "Découvrir la numérologie",
    description: "Une lecture symbolique de votre date",
    icon: Sparkles,
    href: "/accompagnements/numerologie",
  },
  {
    id: "rdv",
    label: "Prendre un moment avec Céline",
    description: "Écrire à Céline ou voir les formats",
    icon: Calendar,
    href: "/contact",
  },
];

const intro: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour. Si vous hésitez, je peux vous aider à trouver ce qui résonne pour vous — ou simplement répondre à une question. Si vous préférez parler directement à Céline, son WhatsApp est juste là.",
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
const BUBBLE_DISMISS_KEY = "etincel-ai-bubble-dismissed";
const BUBBLE_DELAY_MS = 6000;

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([intro]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);

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

  // Sprint H — permet à n'importe quel CTA dans la page d'ouvrir le panel
  // via un event custom (utilisé par /tarifs « Demander à la conciergerie »).
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("etincel:open-assistant", handler);
    return () => window.removeEventListener("etincel:open-assistant", handler);
  }, []);

  // Bulle d'invitation : apparaît après BUBBLE_DELAY_MS si jamais fermée
  // dans la session courante. Une fois fermée par l'utilisateur, ne
  // réapparaît pas avant la prochaine visite.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem(BUBBLE_DISMISS_KEY) === "1";
    if (dismissed) return;
    const timer = window.setTimeout(() => setBubbleVisible(true), BUBBLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Si on ouvre le chat, la bulle disparaît silencieusement (le clic vaut
  // déjà confirmation que l'utilisateur a vu et compris l'invitation).
  useEffect(() => {
    // Lorsqu'un utilisateur ouvre le chat alors que la bulle d'invitation
    // est visible, on la masque proprement (effet de coordination UX).
    if (open && bubbleVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBubbleVisible(false);
      try {
        window.sessionStorage.setItem(BUBBLE_DISMISS_KEY, "1");
      } catch {
        // sessionStorage indisponible — la bulle peut juste réapparaître au refresh, pas grave
      }
    }
  }, [open, bubbleVisible]);

  const dismissBubble = () => {
    setBubbleVisible(false);
    try {
      window.sessionStorage.setItem(BUBBLE_DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

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
      ? "Aperçu · activation prochaine"
      : status === "error"
      ? "Indisponible un instant"
      : status === "sending"
      ? "Je vous réponds…"
      : "Je vous écoute.";

  const statusDot =
    status === "fallback" || status === "error"
      ? "bg-rose"
      : status === "sending"
      ? "bg-gold-soft animate-pulse"
      : "bg-gold";

  return (
    <>
      {/* Bulle d'invitation — apparaît automatiquement après quelques secondes */}
      {bubbleVisible && !open && (
        <div
          className="fixed bottom-[5.5rem] right-6 z-40 w-[19rem] max-w-[calc(100vw-3rem)] animate-[bubbleIn_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
            <div className="relative rounded-2xl bg-bg-card/98 backdrop-blur-md border border-gold-soft/50 shadow-[0_18px_44px_rgba(31,26,46,0.16)] p-5">
              {/* Petit triangle pointer vers le bouton */}
              <span
                aria-hidden
                className="absolute -bottom-2 right-7 h-3 w-3 rotate-45 bg-bg-card border-r border-b border-gold-soft/50"
              />

              <button
                onClick={dismissBubble}
                aria-label="Masquer l'invitation"
                className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-text-soft hover:bg-bg-soft hover:text-text-deep transition-colors"
              >
                <X className="h-3 w-3" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-gold-deep">
                  <Etincelle size={11} />
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.28em] text-text-soft">
                  Besoin d&apos;être guidée&nbsp;?
                </span>
              </div>

              <p className="font-display text-[1.05rem] leading-snug text-text-deep mb-1">
                Bonjour. Si vous hésitez, je peux vous orienter.
              </p>
              <p className="text-[0.82rem] leading-relaxed text-text-medium mb-4">
                Posez votre question simplement, ou laissez-vous guider vers ce
                qui résonne pour vous.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="soft-glow group/cta inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-[0.78rem] font-medium text-text-on-dark hover:bg-accent transition-colors"
              >
                Me laisser guider
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}

      <div
        className={cn(
          "group fixed bottom-6 right-6 z-40 flex items-center gap-3",
          open && "pointer-events-none opacity-0 transition-opacity duration-300",
        )}
      >
        <span
          className={cn(
            "pointer-events-none flex items-center gap-2 rounded-full bg-bg-card/95 backdrop-blur-md border border-border-soft pl-4 pr-3 py-1.5 shadow-[0_6px_20px_rgba(31,26,46,0.10)] -translate-x-2 transition-all duration-500 ease-out group-hover:translate-x-0",
            // Le tooltip se masque tant que la bulle d'invitation est affichée
            bubbleVisible ? "opacity-0" : "opacity-0 group-hover:opacity-100",
          )}
          role="tooltip"
        >
          <span className="font-display-italic text-[0.85rem] tracking-tight text-text-deep whitespace-nowrap">
            Besoin d&apos;être guidée&nbsp;?
          </span>
        </span>

        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-full"
          aria-label="Ouvrir l'assistance Etincel"
        >
          {/* Halo extérieur doré très doux */}
          <span
            aria-hidden
            className="absolute inset-[-6px] rounded-full bg-gold-soft/40 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          />
          {/* Anneau doré fin */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full ring-1 ring-gold-soft/60 group-hover:ring-gold/80 transition-colors duration-500"
          />
          {/* Disque principal — fond crème chaud */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-br from-bg-card via-bg-soft to-rose-soft/60 shadow-[0_6px_18px_rgba(31,26,46,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]"
          />
          {/* Étincelle dorée discrète, sans rotation */}
          <span className="relative z-10 text-gold-deep transition-transform duration-500 group-hover:scale-110">
            <Etincelle size={16} />
          </span>
        </motion.button>
      </div>

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
              aria-label="Espace d'orientation Etincel"
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
                      Besoin d&apos;être guidée&nbsp;?
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
                          ? "L'orientation automatique sera activée prochainement"
                          : "Petite pause technique"}
                      </p>
                      <p className="text-text-medium mt-0.5">
                        {status === "fallback"
                          ? "Pour échanger maintenant, le mieux est d'écrire directement à Céline sur WhatsApp — elle vous répondra personnellement."
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
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              >
                {/* Messages — bulles avec avatar Etincelle pour l'assistant */}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5",
                      m.role === "user" ? "justify-end" : "justify-start items-start",
                    )}
                  >
                    {m.role === "assistant" && (
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-gold ring-1 ring-gold/30">
                        <Etincelle size={11} />
                      </span>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                        m.role === "user"
                          ? "bg-accent-deep text-text-on-dark rounded-br-sm"
                          : "bg-bg-soft text-text-deep border border-border-soft rounded-tl-sm",
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {status === "sending" && (
                  <div className="flex gap-2.5 items-start">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-gold ring-1 ring-gold/30">
                      <Etincelle size={11} />
                    </span>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-bg-soft border border-border-soft px-4 py-3 text-sm text-text-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[twinkle_1.2s_ease-in-out_infinite]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[twinkle_1.2s_ease-in-out_0.2s_infinite]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[twinkle_1.2s_ease-in-out_0.4s_infinite]" />
                    </div>
                  </div>
                )}

                {/* Premier état : actions stratégiques mises en avant + suggestions de questions */}
                {messages.length <= 1 && status === "idle" && (
                  <div className="pt-2 space-y-5">
                    <div className="space-y-2">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep px-1 flex items-center gap-2">
                        <Etincelle size={9} />
                        Par où commencer
                      </p>
                      <div className="space-y-2">
                        {quickActions.map((a) => {
                          const Icon = a.icon;
                          const content = (
                            <div className="flex items-center gap-3 rounded-2xl border border-gold-soft/50 bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card p-3.5 hover:border-gold-soft hover:bg-gradient-to-br hover:from-gold-soft/25 hover:to-bg-card transition-all group">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep group-hover:bg-gold-soft transition-colors">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-text-deep leading-tight">
                                  {a.label}
                                </p>
                                <p className="text-[0.7rem] text-text-soft mt-0.5">
                                  {a.description}
                                </p>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-gold-deep transition-transform group-hover:translate-x-0.5" />
                            </div>
                          );
                          return a.href ? (
                            <Link
                              key={a.id}
                              href={a.href}
                              onClick={() => setOpen(false)}
                              className="block"
                            >
                              {content}
                            </Link>
                          ) : (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => setOpen(false)}
                              className="w-full text-left"
                            >
                              {content}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft px-1">
                        Ou posez une question
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestions.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => void send(s.label)}
                            className="rounded-full border border-border-soft bg-bg-soft/40 px-3 py-1.5 text-[0.75rem] text-text-deep hover:border-accent hover:bg-bg-card transition-colors"
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Barre d'actions persistante — toujours visible une fois le chat lancé */}
              {messages.length > 1 && (
                <div className="px-3 py-2.5 border-t border-border-soft bg-bg-soft/40 flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-gold-deep px-1 shrink-0">
                    Actions
                  </span>
                  {quickActions.map((a) => {
                    const Icon = a.icon;
                    return (
                      <Link
                        key={a.id}
                        href={a.href ?? "#"}
                        onClick={() => setOpen(false)}
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-gold-soft/50 bg-bg-card px-2.5 py-1.5 text-[0.7rem] text-text-deep hover:border-gold hover:bg-gold-soft/20 transition-colors"
                      >
                        <Icon className="h-3 w-3 text-gold-deep" />
                        {a.id === "bilan" ? "Bilan" : a.id === "numerologie" ? "Numérologie" : "Tarifs"}
                      </Link>
                    );
                  })}
                  <a
                    href={whatsappLink(whatsappMessages.generic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 px-2.5 py-1.5 text-[0.7rem] text-[#1ebe5a] hover:bg-[#25D366]/20 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    Céline
                  </a>
                </div>
              )}

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
                  {messages.length <= 1 ? (
                    <a
                      href={whatsappLink(whatsappMessages.generic)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.7rem] text-[#1ebe5a] hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      Plutôt écrire à Céline
                    </a>
                  ) : (
                    <span className="text-[0.65rem] text-text-soft">
                      Entrée pour envoyer · Maj+Entrée pour aller à la ligne
                    </span>
                  )}
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
