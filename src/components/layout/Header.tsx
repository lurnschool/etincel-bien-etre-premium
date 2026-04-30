"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Compass, Gift, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand, contact, navigation, navigationActions } from "@/lib/data";
import { Etincelle } from "@/components/ui/Etincelle";

const actionIcons = {
  Bilan: Compass,
  Offrir: Gift,
  Contact: MessageSquare,
} as const;

/**
 * Header éditorial compact — 68px desktop / 60px mobile.
 * Toujours opaque pour rester lisible sur toutes les pages
 * (y compris hero variant="deep"). Nav allégée : 5 items principaux
 * + 3 actions secondaires (Bilan en CTA primaire).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

        {/* Nav principale (centre) */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {navigation.map((item) => {
            const hasChildren = "children" in item && item.children?.length;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-[0.82rem] font-medium text-text-deep hover:text-accent transition-colors"
                >
                  {item.label}
                  {hasChildren && <ChevronDown className="h-3 w-3 opacity-60" />}
                </Link>
                <AnimatePresence>
                  {hasChildren && openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[19rem]"
                    >
                      <div className="rounded-2xl border border-border-soft bg-bg-card/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(31,26,46,0.1)] p-2 overflow-hidden">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-2 text-[0.82rem] font-medium text-text-deep hover:bg-bg-soft hover:text-accent transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Actions secondaires (droite) */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {/* Liens texte sur grand écran, icônes sur xl en dessous */}
          <div className="hidden md:flex items-center">
            {navigationActions
              .filter((a) => a.label !== "Bilan")
              .map((action) => {
                const Icon = actionIcons[action.label as keyof typeof actionIcons];
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group inline-flex items-center justify-center h-9 w-9 rounded-full text-text-deep/70 hover:text-accent hover:bg-bg-soft transition-colors relative"
                    aria-label={action.label}
                    title={action.label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap rounded-md bg-text-deep/95 px-2 py-1 text-[0.65rem] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* CTA primaire : Bilan */}
          <Link
            href="/diagnostic"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-[0.78rem] font-medium tracking-wide text-text-on-dark hover:bg-accent transition-colors ml-1"
          >
            <Compass className="h-3.5 w-3.5" />
            Faire mon bilan
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
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
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-bg-base flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border-soft">
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
              <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1">
                {navigation.map((item) => (
                  <div key={item.href} className="border-b border-border-soft/60 last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-display text-[1.5rem] leading-tight text-text-deep hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="pb-3 pl-1 space-y-1">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm text-text-medium hover:text-accent py-1"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-border-soft space-y-1">
                  {navigationActions.map((a) => {
                    const Icon = actionIcons[a.label as keyof typeof actionIcons];
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
              <div className="p-5 border-t border-border-soft space-y-2.5">
                <Link
                  href="/diagnostic"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  <Compass className="h-4 w-4" />
                  Faire mon bilan
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
    </header>
  );
}
