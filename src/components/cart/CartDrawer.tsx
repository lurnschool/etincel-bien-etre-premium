"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCart, formatEuros } from "@/lib/cart";
import { Etincelle } from "@/components/ui/Etincelle";

export function CartDrawer() {
  const { isOpen, close, enriched, totalCents, updateQuantity, removeItem, count } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110]"
        >
          <div
            className="absolute inset-0 bg-bg-deep/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bg-base flex flex-col overflow-hidden shadow-[-12px_0_40px_rgba(31,26,46,0.18)]"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-border-soft shrink-0">
              <span className="flex items-center gap-2.5">
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>
                  <p className="font-display text-xl text-text-deep leading-none">Votre panier</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text-soft mt-1">
                    {count > 0 ? `${count} article${count > 1 ? "s" : ""}` : "Vide pour l'instant"}
                  </p>
                </span>
              </span>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-card border border-border-soft hover:bg-bg-soft transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto">
              {enriched.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16 space-y-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <ShoppingBag className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <p className="font-display text-2xl text-text-deep">Votre panier est vide.</p>
                    <p className="text-sm text-text-medium leading-relaxed">
                      Ajoutez une séance, une carte cadeau ou un parcours — Céline vous recontacte ensuite pour caler le créneau exact.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Link
                      href="/tarifs"
                      onClick={close}
                      className="btn-primary w-full justify-center"
                    >
                      Voir les accompagnements
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/cartes-cadeaux"
                      onClick={close}
                      className="btn-secondary w-full justify-center"
                    >
                      Offrir une carte cadeau
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="px-6 py-5 space-y-4">
                  {enriched.map((item) => (
                    <li
                      key={item.productId}
                      className="rounded-2xl border border-border-soft bg-bg-card p-4 space-y-3"
                    >
                      <div className="flex justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <p className="font-display text-base text-text-deep leading-tight">
                            {item.product.name}
                          </p>
                          {item.product.description && (
                            <p className="text-xs text-text-medium line-clamp-2">
                              {item.product.description}
                            </p>
                          )}
                        </div>
                        <p className="font-display text-base text-text-deep shrink-0 tabular-nums">
                          {formatEuros(item.lineCents)}
                        </p>
                      </div>

                      {item.noteToCeline && (
                        <p className="text-[0.7rem] italic text-text-soft border-l-2 border-gold-soft pl-3 leading-relaxed">
                          « {item.noteToCeline} »
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border-soft">
                        <div className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-bg-base">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-soft transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-bg-soft transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="inline-flex items-center gap-1.5 text-xs text-text-soft hover:text-accent-deep transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          Retirer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {enriched.length > 0 && (
              <footer className="px-6 py-5 border-t border-border-soft bg-bg-card space-y-4 shrink-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-text-medium">Total</p>
                  <p className="font-display text-2xl text-text-deep tabular-nums">
                    {formatEuros(totalCents)}
                  </p>
                </div>
                <Link
                  href="/panier"
                  onClick={close}
                  className="btn-primary w-full justify-center"
                >
                  Finaliser mon panier
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-[0.65rem] text-text-soft leading-relaxed text-center">
                  Paiement Stripe sécurisé · Céline vous recontacte pour caler le créneau exact dans les 24h.
                </p>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(drawer, document.body);
}
