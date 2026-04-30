"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";

type Tool = {
  name: string;
  family: "memoires" | "feminin" | "corps" | "transverse";
  description: string;
  href: string;
};

const tools: Tool[] = [
  {
    name: "Hypnose",
    family: "memoires",
    description: "Voyage intérieur — utilisé en transgénérationnel ou pour libérer un schéma ancien.",
    href: "/accompagnements/hypnose",
  },
  {
    name: "CellRelease®",
    family: "memoires",
    description: "Libération des mémoires inscrites dans le corps après un travail systémique.",
    href: "/accompagnements/cellrelease",
  },
  {
    name: "Numérologie",
    family: "transverse",
    description: "Lecture symbolique des cycles, des ressources et de la lignée.",
    href: "/accompagnements/numerologie",
  },
  {
    name: "Massage Libération Reconnexion",
    family: "feminin",
    description: "Toucher tenu et profond pour le retour au corps dans l'accompagnement féminin.",
    href: "/accompagnements/massage-liberation-reconnexion",
  },
  {
    name: "Massage énergétique",
    family: "feminin",
    description: "Réactiver la circulation énergétique quand le corps a perdu son habiter.",
    href: "/accompagnements/massage-energetique",
  },
  {
    name: "Réflexologie amérindienne",
    family: "feminin",
    description: "Pratique chamanique mexicaine — corps et symbolique en même temps.",
    href: "/accompagnements/reflexologie",
  },
  {
    name: "Breathwork chamanique",
    family: "corps",
    description: "Le souffle comme passage — intense et profondément libérateur.",
    href: "/accompagnements/breathwork",
  },
  {
    name: "Innerdance",
    family: "corps",
    description: "Immersion sonore et somatique pour laisser émerger le mouvement intérieur.",
    href: "/innerdance",
  },
];

const familyLabels: Record<Tool["family"], { label: string; href: string; color: string }> = {
  memoires: { label: "Mémoires", href: "/memoires-constellations", color: "text-accent" },
  feminin: { label: "Féminin & cacao", href: "/feminin-cacao", color: "text-rose" },
  corps: { label: "Corps & intégration", href: "/corps-integration", color: "text-gold-deep" },
  transverse: { label: "Transverse", href: "/diagnostic", color: "text-gold" },
};

/**
 * Section « Les outils qu'elle peut mobiliser » — présentation éditoriale,
 * pas un catalogue. Chaque outil indique l'axe au service duquel il est
 * mobilisé. Liste légère, sans grosse grille de prestations.
 */
export function ToolsMobilized() {
  return (
    <section className="bg-bg-soft py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-12 lg:col-span-1">
            <span className="block font-display-italic text-[0.85rem] tracking-[0.2em] text-gold-deep">
              § 05
            </span>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.36em] text-gold-deep flex items-center gap-3">
                <Etincelle size={11} />
                Les outils qu&apos;elle peut mobiliser
              </span>
              <h2 className="font-display mt-6 text-balance text-[clamp(36px,5.5vw,72px)] leading-[0.98] tracking-[-0.02em] text-text-deep">
                Pas des prestations isolées —{" "}
                <span className="font-display-italic text-gold-deep">des moyens</span>{" "}
                au service du travail.
              </h2>
              <p className="mt-6 text-text-medium leading-relaxed text-base md:text-lg max-w-xl">
                Hypnose, massage, breathwork, innerdance, numérologie, CellRelease® — chacun trouve sa place dans l&apos;un des trois axes selon ce qui se présente.
              </p>
            </motion.div>
          </div>
        </div>

        <ul className="divide-y divide-border-soft border-y border-border-soft">
          {tools.map((tool, i) => {
            const family = familyLabels[tool.family];
            return (
              <motion.li
                key={tool.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              >
                <Link
                  href={tool.href}
                  className="group grid grid-cols-12 gap-4 lg:gap-6 py-5 md:py-7 items-baseline hover:bg-bg-card/50 -mx-4 lg:-mx-6 px-4 lg:px-6 rounded-2xl transition-colors"
                >
                  <span className="col-span-2 lg:col-span-1 font-display-italic text-[0.85rem] tabular-nums text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 lg:col-span-4">
                    <p className="font-display text-xl md:text-2xl text-text-deep leading-tight group-hover:text-accent transition-colors">
                      {tool.name}
                    </p>
                  </div>
                  <p className="hidden lg:block lg:col-span-5 text-[0.92rem] text-text-medium leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="col-span-12 lg:col-span-2 flex items-center justify-end gap-2 text-[0.72rem] uppercase tracking-[0.22em]">
                    <Link
                      href={family.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`${family.color} hover:underline underline-offset-2`}
                    >
                      {family.label}
                    </Link>
                    <ArrowRight className="h-3 w-3 text-text-soft transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="lg:hidden col-span-12 text-sm text-text-medium leading-relaxed -mt-1">
                    {tool.description}
                  </p>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 max-w-2xl mx-auto text-center">
          <p className="text-sm text-text-soft italic mb-4">
            Céline mobilise ces outils selon votre demande, votre rythme et l&apos;axe principal du travail.
          </p>
          <Link
            href="/accompagnements"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-deep group"
          >
            <Compass className="h-4 w-4" />
            Voir le catalogue complet
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
