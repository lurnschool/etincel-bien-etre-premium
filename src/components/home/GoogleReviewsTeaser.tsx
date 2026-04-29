"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { contact } from "@/lib/data";

/**
 * Teaser Google Reviews — pas de note inventée, pas de fausse URL.
 *
 * Tant que l'URL Google Business officielle n'est pas confirmée par
 * la cliente (champ `contact.googleReviewsUrl` à valeur explicite
 * commençant par `https://maps.app.goo.gl/` ou `https://g.co/`),
 * on n'affiche PAS de bouton "Voir les avis Google" actif — ni note,
 * ni nombre d'avis. À la place : invitation à laisser un avis dès
 * que la fiche est branchée.
 *
 * Pour activer : remplacer `contact.googleReviewsUrl` dans
 * `src/lib/data.ts` par l'URL officielle Google Maps de Céline.
 */

const PLACEHOLDER_URLS = [
  "https://g.page/r/etincel-de-bien-etre",
  "",
];

function isOfficialUrl(url: string): boolean {
  if (!url) return false;
  if (PLACEHOLDER_URLS.includes(url)) return false;
  return url.startsWith("https://maps.app.goo.gl/") || url.startsWith("https://g.co/");
}

export function GoogleReviewsTeaser() {
  const officialUrl = isOfficialUrl(contact.googleReviewsUrl) ? contact.googleReviewsUrl : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-border-soft bg-bg-card p-6 flex flex-wrap items-center gap-5"
    >
      <div className="flex items-center gap-2 text-gold/40" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg text-text-deep leading-tight">
          Avis Google &amp; retours d&apos;expérience
        </p>
        <p className="text-xs text-text-soft mt-0.5 leading-relaxed">
          Les témoignages réels publiés ci-dessous sont issus du site original. La fiche Google Business sera reliée dès qu&apos;elle aura été confirmée par Céline.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {officialUrl ? (
          <>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-medium bg-bg-card px-4 py-2 text-xs font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
            >
              Voir les avis Google
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-xs font-medium text-text-on-dark hover:bg-accent transition-colors"
            >
              Partager mon avis
            </a>
          </>
        ) : (
          <button
            type="button"
            disabled
            aria-label="Lien Google à connecter — non disponible"
            className="inline-flex items-center gap-1.5 rounded-full border border-border-medium bg-bg-soft px-4 py-2 text-xs font-medium text-text-soft cursor-not-allowed"
          >
            Lien Google à connecter
            <ExternalLink className="h-3 w-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
