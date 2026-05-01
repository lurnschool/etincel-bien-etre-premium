"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Node = {
  label: string;
  body: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 5 à 7 thèmes qui peuvent émerger en constellation. */
  nodes: readonly Node[];
};

/**
 * CircleLinksSection v3 — Sprint F : animations premium subtiles.
 *
 * Ajouts par rapport à v2 :
 *  - Anneaux dorés concentriques avec animation `ring-breath` (pulsation
 *    très douce 6s, motion-safe). Effet "respiration" haut de gamme.
 *  - Point central avec animation `center-pulse` (glow doré qui pulse).
 *  - Nœuds : apparition stagger au scroll (whileInView) avec léger
 *    déplacement depuis l'extérieur vers leur position finale.
 *  - Lignes connectrices SVG en pointillés dorés très discrets, qui
 *    se dessinent au scroll (stroke-dashoffset).
 *  - Reste sur palette papier sable claire (Sprint E), aucun retour au
 *    cosmique.
 */
export function CircleLinksSection({ eyebrow, title, intro, nodes }: Props) {
  const total = nodes.length;

  return (
    <section className="relative paper-sand py-18 md:py-24 overflow-hidden">
      <Container>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.4rem] leading-[1.15] tracking-tight text-text-deep">
            {title}
          </h2>
          {intro && (
            <p className="text-base md:text-lg leading-relaxed text-text-medium">
              {intro}
            </p>
          )}
        </motion.div>

        {/* ============================================================
            MOBILE — schéma compact en symbole + grille 2 colonnes des nœuds
            (sur petit écran, les labels orbital débordent du viewport et
            cassent en 1 mot par ligne. On garde le cercle comme symbole
            décoratif et on liste les nœuds en grille lisible en dessous.)
            ============================================================ */}
        <div className="md:hidden">
          {/* Mini schéma cercle décoratif (220×220) au-dessus de la grille.
              Garde l'esprit "constellation" : anneaux respirant + point
              central + étincelle qui orbite. Pas de labels orbital ici. */}
          <div className="relative w-[220px] h-[220px] mx-auto mb-10" aria-hidden>
            {/* Halo doré sable */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(234,215,175,0.32)_0%,rgba(234,215,175,0.10)_55%,transparent_85%)]" />
            {/* Anneau pointillé tournant en 90s */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -inset-[6%] motion-safe:animate-[slowSpin_90s_linear_infinite]"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(173, 142, 74, 0.32)"
                strokeWidth="0.5"
                strokeDasharray="1.4 2.6"
                strokeLinecap="round"
              />
            </svg>
            {/* 3 anneaux concentriques qui pulsent */}
            <div className="absolute inset-0 rounded-full border border-gold/30 motion-safe:animate-[ring-breath_6s_ease-in-out_infinite]" />
            <div
              className="absolute inset-[14%] rounded-full border border-gold/22 motion-safe:animate-[ring-breath_5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.7s" }}
            />
            <div
              className="absolute inset-[30%] rounded-full border border-gold/16 motion-safe:animate-[ring-breath_4s_ease-in-out_infinite]"
              style={{ animationDelay: "1.4s" }}
            />
            {/* 6 micro-points sur l'anneau intermédiaire pour rappeler les nœuds */}
            {nodes.map((_, i) => {
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              const r = 43;
              const left = 50 + Math.cos(angle) * r;
              const top = 50 + Math.sin(angle) * r;
              return (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gold-deep -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[center-pulse_3s_ease-in-out_infinite]"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              );
            })}
            {/* Point central */}
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-gold-deep motion-safe:animate-[center-pulse_4s_ease-in-out_infinite]" />
            {/* Étincelle orbitale */}
            <div className="absolute -inset-[6%] motion-safe:animate-[slowSpin_72s_linear_infinite]">
              <span className="absolute left-1/2 -top-[3px] -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold-deep shadow-[0_0_10px_rgba(201,168,106,0.65)]" />
            </div>
          </div>

          {/* Grille 2 colonnes des nœuds — lisibles, sans débordement */}
          <ul className="grid grid-cols-2 gap-3">
            {nodes.map((node, i) => (
              <motion.li
                key={node.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.05 }}
                className="rounded-2xl bg-bg-card border border-border-soft p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-deep shrink-0" />
                  <p className="font-display-italic text-[0.95rem] text-gold-deep leading-tight">
                    {node.label}
                  </p>
                </div>
                <p className="text-[0.78rem] leading-relaxed text-text-medium">
                  {node.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ============================================================
            DESKTOP — composition cercle au sol avec labels orbital animés
            (layout original, intact)
            ============================================================ */}
        <div className="hidden md:flex relative max-w-3xl mx-auto aspect-square md:aspect-[5/4] items-center justify-center">
          {/* Cercle au sol stylisé — 3 anneaux dorés qui pulsent doucement,
              + un anneau extérieur en pointillés dorés qui tourne lentement
              (rotation 90s) et un petit point lumineux qui orbite (72s).
              Sprint G : mouvement de rotation léger demandé pour animer la page. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="absolute"
            style={{ width: "min(60%, 22rem)", height: "min(60%, 22rem)" }}
          >
            {/* Anneau extérieur en pointillés dorés — tourne en 90s linear */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -inset-[6%] motion-safe:animate-[slowSpin_90s_linear_infinite]"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(173, 142, 74, 0.32)"
                strokeWidth="0.35"
                strokeDasharray="1.4 2.6"
                strokeLinecap="round"
              />
            </svg>

            {/* Anneau extérieur — pulse 6s */}
            <div className="absolute inset-0 rounded-full border border-gold/30 motion-safe:animate-[ring-breath_6s_ease-in-out_infinite]" />
            {/* Anneau intermédiaire — pulse 5s, decalé */}
            <div
              className="absolute inset-[12%] rounded-full border border-gold/22 motion-safe:animate-[ring-breath_5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.7s" }}
            />
            {/* Anneau intérieur — pulse 4s, encore décalé */}
            <div
              className="absolute inset-[26%] rounded-full border border-gold/16 motion-safe:animate-[ring-breath_4s_ease-in-out_infinite]"
              style={{ animationDelay: "1.4s" }}
            />
            {/* Halo sable doré subtil */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(234,215,175,0.32)_0%,rgba(234,215,175,0.10)_55%,transparent_85%)]" />

            {/* Petit point lumineux qui orbite sur l'anneau extérieur — 72s */}
            <div className="absolute -inset-[6%] motion-safe:animate-[slowSpin_72s_linear_infinite]">
              <span className="absolute left-1/2 -top-[3px] -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold-deep shadow-[0_0_10px_rgba(201,168,106,0.65)]" />
            </div>

            {/* Point central doré qui pulse — focus de la constellation */}
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-gold-deep motion-safe:animate-[center-pulse_4s_ease-in-out_infinite]" />
          </motion.div>

          {/* Lignes connectrices très discrètes (SVG en pointillés dorés)
              qui se dessinent au scroll — effet "constellation qui se trace" */}
          <motion.svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {nodes.map((_, i) => {
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              const r = 44;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <motion.line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="rgba(173, 142, 74, 0.30)"
                  strokeWidth="0.18"
                  strokeDasharray="0.7 1.2"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 0.7 },
                  }}
                  transition={{
                    pathLength: { duration: 1.4, delay: 0.5 + i * 0.1 },
                    opacity: { duration: 0.6, delay: 0.5 + i * 0.1 },
                  }}
                />
              );
            })}
          </motion.svg>

          {/* Nœuds disposés autour — apparition stagger au scroll */}
          {nodes.map((node, i) => {
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            const radiusPct = 44;
            const left = 50 + Math.cos(angle) * radiusPct;
            const top = 50 + Math.sin(angle) * radiusPct;
            // Position de départ : légèrement plus loin du centre (donne l'impression
            // que les nœuds "se posent" depuis l'extérieur en arrivant à leur place)
            const startOffsetX = Math.cos(angle) * 8;
            const startOffsetY = Math.sin(angle) * 8;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.7, x: startOffsetX, y: startOffsetY }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.7 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[170px] md:max-w-[190px] text-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="inline-flex flex-col items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-deep mb-2 motion-safe:animate-[center-pulse_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s` }} />
                  <p className="font-display-italic text-sm md:text-base text-gold-deep mb-1">
                    {node.label}
                  </p>
                  <p className="text-[0.72rem] md:text-xs leading-relaxed text-text-medium px-1">
                    {node.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 md:mt-12 text-center text-xs italic text-text-soft max-w-md mx-auto">
          Aucun thème n&apos;est imposé. C&apos;est ce qui appelle au moment
          de la séance qui se met en place.
        </p>
      </Container>
    </section>
  );
}
