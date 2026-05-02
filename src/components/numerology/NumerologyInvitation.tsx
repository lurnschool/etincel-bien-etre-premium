"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Etincelle } from "@/components/ui/Etincelle";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  calculerCheminDeVie,
  getCheminDeVieInfo,
  type CheminDeVieInfo,
} from "@/lib/numerologie";

/**
 * Animation invitation à la numérologie.
 * L'utilisateur entre sa date de naissance, le composant lance une
 * animation de chiffres qui se déposent sur un chemin de vie, puis
 * affiche un message prudent sans interprétation propriétaire.
 *
 * NB : aucune lecture vraie n'est générée — c'est une invitation
 * symbolique qui pousse vers une lecture personnalisée avec Céline.
 */
export function NumerologyInvitation() {
  const today = new Date();
  const [birthdate, setBirthdate] = useState("");
  const [animating, setAnimating] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);
  const [chemin, setChemin] = useState<{ n: number; info: CheminDeVieInfo } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;
    setAnimating(true);
    setRevealed(false);
    setAnimatedNumbers([]);
    setChemin(null);

    const digits = birthdate.replace(/-/g, "").split("").map(Number);
    let i = 0;
    const interval = window.setInterval(() => {
      if (i >= digits.length) {
        window.clearInterval(interval);
        // Calcul du chemin de vie après l'animation des chiffres
        const n = calculerCheminDeVie(birthdate);
        window.setTimeout(() => {
          setAnimating(false);
          if (n !== null) {
            setChemin({ n, info: getCheminDeVieInfo(n) });
          }
          setRevealed(true);
        }, 350);
        return;
      }
      setAnimatedNumbers((prev) => [...prev, digits[i]]);
      i++;
    }, 90);
  };

  const reset = () => {
    setRevealed(false);
    setAnimating(false);
    setAnimatedNumbers([]);
    setChemin(null);
    setBirthdate("");
  };

  return (
    <section className="relative bg-bg-deep text-text-on-dark py-24 md:py-36 overflow-hidden">
      {/* Étoiles + halos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-accent/30 blur-[160px]" />
        <div className="absolute -bottom-40 right-1/4 h-[40rem] w-[40rem] rounded-full bg-gold/15 blur-[160px]" />
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-gold-soft/60"
            style={{
              top: `${(i * 13.7) % 100}%`,
              left: `${(i * 23.3) % 100}%`,
              transform: `scale(${1 + (i % 4)})`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-center space-y-5 mb-14">
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.36em] text-gold-soft">
            <Etincelle size={11} />
            <span>Invitation à la numérologie</span>
          </div>
          <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-text-on-dark max-w-3xl mx-auto">
            Chaque date porte une{" "}
            <span className="font-display-italic text-gold-gradient">
              vibration
            </span>
            .
          </h2>
          <p className="text-text-on-dark-soft leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Entrez votre date de naissance — le site invite quelques chiffres à danser. La vraie lecture, sensible et complète, se fait avec Céline.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-12 space-y-6 max-w-2xl mx-auto"
            >
              <label
                htmlFor="birthdate"
                className="block text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft"
              >
                Votre date de naissance
              </label>
              <div className="relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-soft pointer-events-none" />
                <input
                  id="birthdate"
                  type="date"
                  required
                  max={today.toISOString().split("T")[0]}
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full rounded-full bg-white/10 border border-white/15 pl-12 pr-5 py-4 text-base md:text-lg text-text-on-dark placeholder:text-text-on-dark-soft/40 focus:outline-none focus:border-gold/60"
                />
              </div>

              {/* Animation des chiffres pendant la frappe */}
              {animating && (
                <div className="flex flex-wrap items-center justify-center gap-2 py-6 min-h-[80px]">
                  {animatedNumbers.map((n, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "font-display-italic text-3xl md:text-4xl",
                        i % 2 === 0 ? "text-gold" : "text-gold-soft",
                      )}
                    >
                      {n}
                    </motion.span>
                  ))}
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={!birthdate || animating}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors disabled:opacity-50"
                >
                  {animating ? "Lecture en cours…" : "Entrer dans la danse des nombres"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[0.7rem] text-text-on-dark-soft/60 text-center italic">
                Aucune donnée n&apos;est enregistrée. Cette animation est symbolique.
              </p>
            </motion.form>
          ) : chemin ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-gold-soft/40 bg-white/5 backdrop-blur-md p-8 md:p-12 max-w-3xl mx-auto space-y-7"
            >
              {/* Chiffres de la date qui s'estompent en vibration */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {animatedNumbers.map((n, i) => (
                  <span
                    key={i}
                    className={cn(
                      "font-display-italic text-xl md:text-2xl",
                      i % 3 === 0 ? "text-gold" : i % 3 === 1 ? "text-gold-soft" : "text-rose-soft",
                    )}
                  >
                    {n}
                  </span>
                ))}
              </motion.div>

              {/* Grand chiffre du chemin de vie + halo doré pulsant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center justify-center py-4"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.36em] text-gold-soft mb-3">
                  Votre chemin de vie
                </p>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-gold/40 via-gold-soft/30 to-rose-soft/20 motion-safe:animate-[center-pulse_4s_ease-in-out_infinite]"
                  />
                  <p className="relative font-display text-[5.5rem] md:text-[7rem] leading-none text-gold-gradient drop-shadow-[0_0_30px_rgba(201,168,106,0.4)]">
                    {chemin.n}
                  </p>
                </div>
                {chemin.info.maitre && (
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.32em] text-gold-soft/80 italic">
                    Maître nombre
                  </p>
                )}
              </motion.div>

              {/* Nom + essence */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="text-center space-y-3"
              >
                <h3 className="font-display text-3xl md:text-4xl text-text-on-dark leading-tight">
                  {chemin.info.nom}
                </h3>
                <p className="font-display-italic text-base md:text-lg text-gold-soft tracking-wide">
                  {chemin.info.essence}
                </p>
              </motion.div>

              {/* Message court */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="text-text-on-dark-soft text-base md:text-lg leading-relaxed text-center max-w-xl mx-auto"
              >
                {chemin.info.message}
              </motion.p>

              {/* CTA — réservation lecture complète */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-wrap gap-3 justify-center pt-5 border-t border-white/10"
              >
                <ButtonHalo tone="gold">
                  <Link
                    href="/reserver/numerologie"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-text-deep hover:bg-gold-soft transition-colors"
                  >
                    Recevoir ma lecture complète
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </ButtonHalo>
                <WhatsAppButton message={whatsappMessages.numerologie} variant="outline">
                  Parler à Céline
                </WhatsAppButton>
                <button
                  onClick={reset}
                  className="text-sm text-text-on-dark-soft hover:text-gold transition-colors px-4"
                  type="button"
                >
                  Une autre date
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="text-[0.72rem] text-text-on-dark-soft/70 leading-relaxed text-center max-w-2xl mx-auto pt-3 border-t border-white/5"
              >
                Le chemin de vie n&apos;est qu&apos;une vibration parmi d&apos;autres dans
                votre thème complet. La lecture entière avec Céline déploie aussi
                votre nombre d&apos;expression, votre nombre intime, vos cycles
                actuels, vos ressources et vos défis personnels.
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <a
          href={whatsappLink(whatsappMessages.numerologie)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden"
          aria-hidden
        />
      </div>
    </section>
  );
}
