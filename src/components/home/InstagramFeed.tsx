"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Camera } from "lucide-react";
import { Etincelle } from "@/components/ui/Etincelle";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { contact } from "@/lib/data";

/**
 * Un post Instagram en mode "manual" — uniquement avec accord explicite
 * de Céline. La source DOIT être locale (téléchargée légalement) pour
 * éviter tout scraping et garantir la pérennité du visuel.
 */
export type InstagramManualPost = {
  /** Chemin LOCAL de l'image (ex: /images/instagram/2026-04-cercle.jpg) */
  src: string;
  alt: string;
  /** Lien vers le post Instagram réel (https://www.instagram.com/p/XYZ/) */
  permalink?: string;
  caption?: string;
};

type Mode = "manual" | "widget" | "fallback";

type Props = {
  /**
   * Mode de fonctionnement du composant :
   *  - "manual"   : grille de posts validés localement (manualPosts)
   *  - "widget"   : insertion d'un widget tiers (Elfsight, LightWidget,
   *                  Spotlight, SnapWidget, EmbedSocial)
   *  - "fallback" (défaut) : pas de fausses photos — emplacements doux
   *                  "à connecter" + CTA Instagram
   */
  mode?: Mode;
  /** Posts à afficher en mode manual. Au moins 6 recommandés. */
  manualPosts?: InstagramManualPost[];
  /**
   * HTML/script du widget tiers (mode widget).
   * IMPORTANT : à coller depuis un fournisseur de confiance uniquement.
   * Cf. README dans /public/audio/LICENSE-ambiance.txt pour les sources.
   */
  widgetEmbed?: string;
  /** Nombre d'emplacements en mode fallback. Défaut 6. */
  fallbackSlots?: number;
};

/**
 * InstagramFeed — Sprint I Lot 2.
 *
 * Section "L'univers de Céline sur Instagram" avec 3 modes
 * d'intégration possibles, conformes au brief :
 *  - PAS de scraping Instagram
 *  - PAS de fausses photos génériques
 *  - PAS de simulation de feed réel sans source vérifiée
 *
 * Mode par défaut = "fallback" (état honnête tant que Céline n'a pas
 * fourni de posts validés ou qu'un widget n'est pas branché).
 *
 * Pour activer un widget tiers (recommandé : LightWidget gratuit pour
 * un compte personnel non-Business) :
 *   <InstagramFeed mode="widget" widgetEmbed='<script src="...">' />
 *
 * Pour passer en mode posts validés :
 *   <InstagramFeed mode="manual" manualPosts={[
 *     { src: "/images/instagram/post1.jpg", alt: "...", permalink: "..." },
 *     ...
 *   ]} />
 *
 * Quand le compte Céline passera Business/Creator, on pourra
 * brancher l'API Meta officielle via une route /api/instagram et
 * passer un nouveau mode "api" — l'architecture est prête.
 */
export function InstagramFeed({
  mode = "fallback",
  manualPosts,
  widgetEmbed,
  fallbackSlots = 6,
}: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);

  // Injection sécurisée du widget tiers : le fournisseur fournit du
  // HTML + <script> qu'il faut exécuter. dangerouslySetInnerHTML ne
  // ré-exécute pas les <script> tags — on les recrée donc à la main.
  useEffect(() => {
    if (mode !== "widget" || !widgetEmbed || !widgetRef.current) return;
    const container = widgetRef.current;
    container.innerHTML = widgetEmbed;
    // Réinjection des scripts pour qu'ils s'exécutent (les script
    // ajoutés via innerHTML sont inactifs).
    container.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.text = oldScript.text;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [mode, widgetEmbed]);

  return (
    <section className="relative bg-bg-base py-18 md:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-[24rem] w-[24rem] rounded-full bg-gold-soft/15 blur-[120px]" />
        <div className="absolute bottom-0 -right-20 h-[22rem] w-[22rem] rounded-full bg-rose-soft/15 blur-[100px]" />
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
            <span>L&apos;univers de Céline sur Instagram</span>
          </div>
          <h2 className="font-display text-balance text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight text-text-deep">
            Des instants partagés, à vivre en lien.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-medium">
            Cercles, cérémonies, retraites — Céline partage ses fragments de
            refuge sur Instagram&nbsp;
            <span className="font-display-italic text-gold-deep">
              @{contact.social.instagram.handle}
            </span>
            .
          </p>
        </motion.div>

        {/* Contenu selon le mode */}
        {mode === "widget" && widgetEmbed ? (
          <WidgetMode containerRef={widgetRef} />
        ) : mode === "manual" && manualPosts && manualPosts.length > 0 ? (
          <ManualMode posts={manualPosts} />
        ) : (
          <FallbackMode slots={fallbackSlots} />
        )}

        {/* CTA Instagram (toujours visible, peu importe le mode) */}
        <div className="mt-12 md:mt-14 flex justify-center">
          <a
            href={contact.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-bg-card px-6 py-3 text-sm font-medium text-text-deep hover:border-gold hover:bg-gold-soft/15 transition-colors"
          >
            <InstagramIcon size={16} className="text-gold-deep" />
            Voir l&apos;univers de Céline sur Instagram
            <ExternalLink className="h-3.5 w-3.5 text-text-soft transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
 * Mode 1 — manual (posts locaux validés par Céline)
 * ---------------------------------------------------------------- */
function ManualMode({ posts }: { posts: InstagramManualPost[] }) {
  return (
    <ul className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px]">
      {posts.map((p, i) => (
        <motion.li
          key={p.src}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.05 + i * 0.06 }}
          className="group relative overflow-hidden rounded-[1rem] md:rounded-[1.25rem] shadow-[0_6px_18px_rgba(31,26,46,0.08)] ring-1 ring-bg-base/30 hover:shadow-[0_12px_30px_rgba(201,168,106,0.18)] transition-shadow"
        >
          {p.permalink ? (
            <a
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.caption ?? p.alt}
              className="absolute inset-0 z-10"
            />
          ) : null}
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Petit badge Insta en coin */}
          <span className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-bg-card/85 backdrop-blur text-gold-deep">
            <InstagramIcon size={11} />
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------------
 * Mode 2 — widget tiers (Elfsight, LightWidget, Spotlight, etc.)
 * ---------------------------------------------------------------- */
function WidgetMode({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-[1.5rem] bg-bg-card border border-border-soft p-4 md:p-6 min-h-[340px]">
      <div ref={containerRef} className="instagram-widget-slot" />
      <p className="mt-3 text-[0.7rem] text-text-soft italic text-center">
        Feed connecté via widget tiers — données Instagram chargées par le
        prestataire.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------
 * Mode 3 — fallback (par défaut, pas de fausses photos)
 * ---------------------------------------------------------------- */
function FallbackMode({ slots }: { slots: number }) {
  const items = Array.from({ length: slots });
  return (
    <div className="space-y-6">
      <ul className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 auto-rows-[160px] md:auto-rows-[200px]">
        {items.map((_, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.04 + i * 0.05 }}
            className="group relative overflow-hidden rounded-[1rem] md:rounded-[1.25rem] border border-border-soft bg-gradient-to-br from-bg-card via-rose-soft/8 to-gold-soft/12 flex flex-col items-center justify-center gap-2 text-center px-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-card/80 text-gold-deep">
              <Camera className="h-4 w-4" />
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-text-soft">
              Photo Instagram
            </span>
            <span className="text-[0.7rem] text-text-soft italic">
              à connecter
            </span>
          </motion.li>
        ))}
      </ul>
      <p className="text-center text-[0.85rem] text-text-medium italic max-w-xl mx-auto leading-relaxed">
        Le feed Instagram sera connecté ici dès que le compte sera
        relié — soit par widget, soit avec une sélection de posts validés
        par Céline. En attendant, vous pouvez voir son univers directement
        sur Instagram.
      </p>
    </div>
  );
}
