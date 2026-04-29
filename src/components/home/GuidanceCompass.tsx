"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { cn } from "@/lib/utils";
import {
  guidanceIntents,
  accompagnementsIndividuels,
  whisperLines,
} from "@/lib/data";

/**
 * Boussole intérieure — l'intention d'abord, la pratique ensuite.
 * Visiteur clique une intention → un panneau latéral s'ouvre avec
 * les recommandations, sans surcharger la grille principale.
 */
export function GuidanceCompass() {
  const [active, setActive] = useState<string | null>(null);
  const intent = guidanceIntents.find((i) => i.id === active);

  const recommendedPractices =
    intent?.recommendations
      .filter((r) => !r.startsWith("/"))
      .map((slug) => accompagnementsIndividuels.find((a) => a.slug === slug))
      .filter(Boolean) ?? [];

  const recommendedPages =
    intent?.recommendations.filter((r) => r.startsWith("/")) ?? [];

  return (
    <section
      id="boussole"
      className="relative section overflow-hidden scroll-mt-20"
    >
      <WhisperLine text={whisperLines[2]} position="left" tone="amethyst" />

      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-deep">
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>La boussole</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-text-deep">
                Par où{" "}
                <span className="font-display-italic text-gold-deep">
                  commencer
                </span>{" "}
                ?
              </h2>
              <p className="text-text-medium leading-relaxed text-base md:text-lg max-w-md">
                Choisissez ce qui résonne aujourd&apos;hui. Le site vous guide vers la porte d&apos;entrée la plus juste — sans rien imposer.
              </p>
              <div className="hidden lg:block pt-6 text-xs uppercase tracking-[0.24em] text-text-soft">
                {active ? "Une recommandation sensible" : "Touchez une intention"}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-2">
            <Reveal>
              <ul className="divide-y divide-border-soft border-t border-b border-border-soft">
                {guidanceIntents.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActive(isActive ? null : item.id)}
                        aria-expanded={isActive}
                        className={cn(
                          "w-full text-left flex items-center justify-between gap-6 py-5 px-2 transition-colors group cursor-pointer",
                          isActive
                            ? "text-accent-deep"
                            : "text-text-deep hover:text-accent",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={cn(
                              "h-1 transition-all duration-500 rounded-full",
                              isActive
                                ? "w-10 bg-gold"
                                : "w-4 bg-border-medium group-hover:w-7 group-hover:bg-accent",
                            )}
                            aria-hidden
                          />
                          <span className="font-display text-xl md:text-[1.6rem] leading-snug">
                            {item.label}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-all",
                            isActive
                              ? "border-gold bg-gold text-text-deep rotate-45"
                              : "border-border-medium text-text-soft group-hover:border-accent group-hover:text-accent",
                          )}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isActive && intent && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-7 pt-1 pl-9 pr-2 space-y-5">
                              <p className="text-text-medium leading-relaxed text-base max-w-xl">
                                {intent.description}
                              </p>
                              {recommendedPractices.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {recommendedPractices.map((p) => (
                                    <Link
                                      key={p!.slug}
                                      href={`/accompagnements/${p!.slug}`}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-border-medium bg-bg-card px-3.5 py-1.5 text-[0.78rem] text-text-deep hover:border-accent hover:text-accent transition-colors"
                                    >
                                      {p!.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                              {recommendedPages.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {recommendedPages.map((href) => (
                                    <Link
                                      key={href}
                                      href={href}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft/60 bg-bg-soft px-3.5 py-1.5 text-[0.78rem] text-gold-deep hover:border-gold hover:bg-gold-soft/30 transition-colors"
                                    >
                                      {labelForHref(href)}
                                    </Link>
                                  ))}
                                </div>
                              )}
                              <Link
                                href={intent.cta.href}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep hover:text-accent transition-colors"
                              >
                                {intent.cta.label}
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-6 flex items-center justify-between text-xs text-text-soft">
                <span className="flex items-center gap-2">
                  <span className="text-gold">
                    <Etincelle size={9} />
                  </span>
                  Diagnostic plus complet en 4 questions
                </span>
                <Link
                  href="/diagnostic"
                  className="link-elegant text-text-medium hover:text-accent"
                >
                  Faire le diagnostic →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function labelForHref(href: string): string {
  const map: Record<string, string> = {
    "/cercles-de-femmes": "Cercles de femmes",
    "/collectif": "Toutes les expériences collectives",
    "/innerdance#collectif": "Innerdance collectif",
    "/feminin-sacre": "Page Féminin sacré",
    "/cartes-cadeaux": "Cartes cadeaux",
    "/formations": "Formations",
    "/retraites": "Retraites",
  };
  return map[href] ?? href;
}
