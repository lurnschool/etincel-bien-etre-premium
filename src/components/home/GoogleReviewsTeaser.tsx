"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { contact } from "@/lib/data";

/**
 * Teaser Google Reviews — pas de note inventée, pas de faux avis.
 * Renvoie directement vers la fiche Google de Céline + invite à
 * partager un avis. Présence subtile pour rassurer.
 */
export function GoogleReviewsTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl border border-border-soft bg-bg-card p-6 flex flex-wrap items-center gap-5"
    >
      <div className="flex items-center gap-2 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg text-text-deep leading-tight">
          Avis Google
        </p>
        <p className="text-xs text-text-soft mt-0.5">
          Témoignages publics laissés par les personnes accompagnées
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href={contact.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border-medium bg-bg-card px-4 py-2 text-xs font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
        >
          Voir les avis
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={contact.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-4 py-2 text-xs font-medium text-text-on-dark hover:bg-accent transition-colors"
        >
          Partager mon avis
        </a>
      </div>
    </motion.div>
  );
}
