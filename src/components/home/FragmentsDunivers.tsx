"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { VisualAsset } from "@/components/ui/VisualAsset";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { contact } from "@/lib/data";

/**
 * Tuiles affichées dans la grille éditoriale.
 * On garde des assets déjà disponibles dans visualAssetMap pour ne pas
 * créer de placeholders ad-hoc. Quand Céline livrera ses photos
 * d'Insta, il suffira d'ajuster les ids ici (ou côté visualAssetMap).
 */
const fragments = [
  { id: "home-univers-1", span: "row-span-2" },
  { id: "home-univers-2", span: "" },
  { id: "home-univers-3", span: "" },
  { id: "home-univers-4", span: "" },
  { id: "home-univers-5", span: "" },
  { id: "feminin-cacao-tasse", span: "" },
  { id: "home-univers-6", span: "" },
] as const;

/**
 * FragmentsDunivers — Sprint H Lot F.
 *
 * Galerie éditoriale "façon Instagram" maîtrisée — pas un feed live.
 * Donne de la matière visuelle, ancre l'univers de Céline, et invite
 * à la suivre sur Instagram pour la suite.
 *
 * Layout bento simple :
 *  - Col gauche : 1 visuel haut (4:5, span 2 lignes)
 *  - Reste : 6 visuels carrés/4:5 en grille 2 colonnes
 *  - Hover : très léger zoom + lift d'ombre dorée
 *
 * Bouton final : lien Instagram avec icône.
 *
 * À terme : ce composant peut être branché sur l'API Instagram Basic
 * Display ou un widget tiers. Pour l'instant, contenu maîtrisé via
 * visualAssetMap (cohérent direction artistique refuge).
 */
export function FragmentsDunivers() {
  return (
    <section className="relative bg-bg-base py-18 md:py-24 overflow-hidden">
      {/* Halo doré chaud en fond, très diffus */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-[24rem] w-[24rem] rounded-full bg-gold-soft/20 blur-[120px]" />
        <div className="absolute bottom-0 -right-20 h-[22rem] w-[22rem] rounded-full bg-rose-soft/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-5"
        >
          <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-text-soft">
            <span className="text-gold-deep">
              <Etincelle size={11} />
            </span>
            <span>Fragments d&apos;univers</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            Des instants, des lieux, des cercles.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            Un aperçu sensible de ce qui se vit autour de Céline — entre les
            cérémonies, les retraites, les rituels, et les détails du refuge.
          </p>
        </motion.div>

        {/* Grille bento — col gauche large + grille 2-3 cols à droite */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]"
        >
          {fragments.map((f, i) => (
            <FragmentTile key={f.id} id={f.id} span={f.span} index={i} />
          ))}
        </motion.div>

        {/* CTA Instagram */}
        <div className="mt-12 md:mt-14 flex justify-center">
          <a
            href={contact.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-bg-card px-6 py-3 text-sm font-medium text-text-deep hover:border-gold hover:bg-gold-soft/15 transition-colors"
          >
            <InstagramIcon size={16} className="text-gold-deep" />
            Voir plus sur Instagram
            <span className="font-display-italic text-gold-deep text-[0.85rem]">
              @{contact.social.instagram.handle}
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-text-soft transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FragmentTile({
  id,
  span,
  index,
}: {
  id: string;
  span: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: 0.05 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-[1rem] md:rounded-[1.25rem] shadow-[0_6px_18px_rgba(31,26,46,0.08)] ring-1 ring-bg-base/30 hover:shadow-[0_12px_30px_rgba(201,168,106,0.18)] transition-shadow ${span}`}
    >
      <VisualAsset
        id={id}
        fill
        imageClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {/* Overlay très léger au hover, donne une présence dorée subtile */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg-deep/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  );
}
