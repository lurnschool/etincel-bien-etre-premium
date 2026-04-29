"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { disclaimers } from "@/lib/data";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const suggestedQuestions = [
  "Quelle pratique correspond à mon besoin ?",
  "Quelle est la différence entre breathwork et innerdance ?",
  "Comment se passe une première séance ?",
  "Comment offrir une carte cadeau ?",
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Bonjour, je suis l'assistant d'Etincel. Je peux vous aider à comprendre les accompagnements proposés par Céline et à trouver la porte d'entrée la plus adaptée à votre besoin.",
  },
];

/**
 * UI prête à connecter à l'API Anthropic.
 * Pour l'instant, l'assistant fonctionne en mode "pré-connexion" :
 * il oriente l'utilisateur vers le contact direct ou le diagnostic
 * sans simuler de réponse IA. Le branchement se fera au sprint 4.
 */
export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      {
        role: "assistant",
        content:
          "Merci pour votre message. L'assistant intelligent sera bientôt en ligne. En attendant, vous pouvez faire le diagnostic en ligne pour identifier la pratique la plus adaptée, ou écrire directement à Céline à etincel33@gmail.com — elle vous répondra personnellement.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full",
          "bg-gradient-to-br from-accent to-accent-deep text-text-on-dark shadow-[0_12px_40px_rgba(74,52,99,0.4)]",
          "hover:shadow-[0_16px_48px_rgba(74,52,99,0.55)] transition-shadow",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir l'assistant"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-gold/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <MessageCircle className="relative h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-bg-deep/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-label="Assistant Etincel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed z-50 flex flex-col bg-bg-card border border-border-soft shadow-[0_30px_80px_rgba(31,26,46,0.25)]",
                "inset-x-4 bottom-4 top-20 rounded-3xl",
                "md:inset-auto md:bottom-6 md:right-6 md:top-auto md:w-[26rem] md:h-[34rem]",
              )}
            >
              <header className="flex items-center justify-between gap-3 p-5 border-b border-border-soft bg-gradient-to-br from-bg-soft to-bg-base rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-deep text-text-on-dark">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-lg leading-none">L'étincelle de conseil</p>
                    <p className="text-xs text-text-soft mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      Bientôt connecté · réponses humaines en attendant
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

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "assistant"
                        ? "bg-bg-soft text-text-deep rounded-tl-md"
                        : "ml-auto bg-accent text-text-on-dark rounded-tr-md",
                    )}
                  >
                    {m.content}
                  </div>
                ))}
                {messages.length <= 1 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-text-soft uppercase tracking-[0.2em]">
                      Quelques pistes
                    </p>
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="block w-full text-left text-sm text-accent border border-border-soft rounded-xl px-3 py-2.5 hover:bg-bg-soft hover:border-accent transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border-soft p-4 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question…"
                    className="flex-1 bg-bg-soft rounded-full px-4 py-2.5 text-sm placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-text-on-dark hover:bg-accent-deep transition-colors"
                    aria-label="Envoyer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                <p className="text-[0.65rem] leading-relaxed text-text-soft">
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
