"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand, contact, navigation, cta } from "@/lib/data";
import { Etincelle } from "@/components/ui/Etincelle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg-base/85 backdrop-blur-xl border-b border-border-soft/60 shadow-[0_4px_24px_rgba(31,26,46,0.05)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 h-20 md:h-24">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${brand.name} — Accueil`}
        >
          <span className="text-gold transition-transform duration-700 group-hover:rotate-180">
            <Etincelle size={22} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl md:text-[1.7rem] tracking-tight text-text-deep">
              Etincel
            </span>
            <span className="font-display-italic text-[0.7rem] md:text-xs tracking-[0.32em] uppercase text-gold-deep">
              de bien être
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
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
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-text-deep/85 hover:text-accent transition-colors"
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>
                <AnimatePresence>
                  {hasChildren && openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-2 min-w-64"
                    >
                      <div className="rounded-2xl border border-border-soft bg-bg-card shadow-[0_24px_60px_rgba(31,26,46,0.12)] p-2 overflow-hidden">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-2.5 text-sm text-text-deep/80 hover:bg-bg-soft hover:text-accent transition-colors"
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

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneLink}
            className="hidden xl:flex items-center gap-2 text-sm text-text-medium hover:text-accent transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{contact.phone}</span>
          </a>
          <Link
            href={cta.primary.href}
            className="hidden md:inline-flex btn-primary"
          >
            {cta.primary.label}
          </Link>
          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-bg-card border border-border-soft text-text-deep"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
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
              <div className="flex items-center justify-between p-6 border-b border-border-soft">
                <span className="flex items-center gap-2">
                  <span className="text-gold">
                    <Etincelle size={18} />
                  </span>
                  <span className="font-display text-xl">Etincel</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card border border-border-soft"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                {navigation.map((item) => (
                  <div key={item.href} className="border-b border-border-soft/60 last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-display text-2xl text-text-deep hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="p-6 border-t border-border-soft space-y-3">
                <Link
                  href={cta.primary.href}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  {cta.primary.label}
                </Link>
                <a
                  href={contact.phoneLink}
                  className="flex items-center justify-center gap-2 text-sm text-text-medium"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
