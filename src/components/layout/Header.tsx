"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Gift, Headphones, MessageSquare, ReceiptText, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand, contact, navigation, navigationActions, navigationOffers } from "@/lib/data";
import { Etincelle } from "@/components/ui/Etincelle";
import { CartButton } from "@/components/cart/CartButton";

const actionIcons: Record<string, LucideIcon> = {
  Tarifs: ReceiptText,
  Offrir: Gift,
  Contact: MessageSquare,
  "Le Cercle": Headphones,
  "Parcours 3 mois": Sparkles,
};

/**
 * Header éditorial compact — 60-68px.
 * Sprint A "refuge" : nav allégée à 5 items principaux + 1 CTA doux
 * (« Écrire à Céline ») au lieu de l'ancien « Faire mon bilan ».
 * Tarifs/Offrir restent accessibles via le drawer mobile et le footer.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR-safe portal mount — pattern standard pour createPortal
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 16);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Le drawer mobile est rendu via Portal pour sortir du containing block
  // créé par le `backdrop-blur` du header (qui empêche un position:fixed
  // intérieur de couvrir le viewport).
  const mobileDrawer = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-bg-deep/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-bg-base flex flex-col overflow-hidden shadow-[-12px_0_40px_rgba(31,26,46,0.18)]"
          >
            <div className="flex items-center justify-between p-5 border-b border-border-soft shrink-0">
              <span className="flex items-center gap-2">
                <span className="text-gold">
                  <Etincelle size={14} />
                </span>
                <span className="font-display text-lg">Etincel</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-card border border-border-soft"
                aria-label="Fermer le menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.href} className="border-b border-border-soft/60 last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-[1.5rem] leading-tight text-text-deep hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-border-soft space-y-1">
                {[...navigationActions, ...navigationOffers].map((a) => {
                  const Icon = actionIcons[a.label] ?? Compass;
                  return (
                    <Link
                      key={a.href}
                      href={a.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-deep hover:bg-bg-soft hover:text-accent transition-colors"
                    >
                      <Icon className="h-4 w-4 text-gold-deep" />
                      {a.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="p-5 border-t border-border-soft space-y-2.5 shrink-0">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                <MessageSquare className="h-4 w-4" />
                Écrire à Céline
              </Link>
              <Link
                href="/diagnostic"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm text-text-medium py-2 hover:text-accent transition-colors"
              >
                Pas sûre par où commencer ?
              </Link>
              <a
                href={contact.phoneLink}
                className="block text-center text-sm text-text-medium py-2"
              >
                {contact.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-bg-base/97 backdrop-blur-xl border-b",
        scrolled
          ? "border-border-medium shadow-[0_4px_20px_rgba(31,26,46,0.06)]"
          : "border-border-soft/80",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 md:px-8 lg:px-10 transition-all duration-300",
          scrolled ? "h-[60px] md:h-[64px]" : "h-[60px] md:h-[68px]",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0"
          aria-label={`${brand.name} — Accueil`}
        >
          <span className="text-gold transition-transform duration-700 group-hover:rotate-180">
            <Etincelle size={15} />
          </span>
          <span className="flex items-baseline gap-2 leading-none">
            <span className="font-display text-[1.25rem] tracking-tight text-text-deep">
              Etincel
            </span>
            <span className="hidden md:inline font-display-italic text-[0.6rem] tracking-[0.32em] uppercase text-gold-deep">
              de bien être
            </span>
          </span>
        </Link>

        {/* Nav principale (centre) — 7 items, plus de sous-menu */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1 px-3 py-2 text-[0.82rem] font-medium text-text-deep hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions secondaires (droite) — Sprint A : Tarifs/Offrir restent
            accessibles dans le drawer mobile et le footer, mais sortent
            du header desktop pour respirer. */}
        <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
          {/* Petit accès "Pas sûre ?" en lien texte discret */}
          <Link
            href="/diagnostic"
            className="hidden md:inline-flex items-center text-[0.8rem] font-medium text-text-soft hover:text-accent transition-colors mr-3"
          >
            Pas sûre par où commencer&nbsp;?
          </Link>

          {/* Panier */}
          <CartButton className="ml-1" />

          {/* CTA primaire doux : Écrire à Céline */}
          <Link
            href="/contact"
            className="soft-glow hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-[0.78rem] font-medium tracking-wide text-text-on-dark hover:bg-accent transition-colors ml-2"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Écrire à Céline
          </Link>

          {/* Burger mobile */}
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-bg-card/80 backdrop-blur border border-border-soft text-text-deep ml-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {mounted && createPortal(mobileDrawer, document.body)}
    </header>
  );
}
