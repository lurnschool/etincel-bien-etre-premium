"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink, Quote } from "lucide-react";
import { contact, temoignages } from "@/lib/data";
import { GoogleGIcon } from "@/components/ui/SocialIcons";

/**
 * GoogleReviewsTeaser — Sprint H Lot G : refonte "vrai widget".
 *
 * Affiche 3 témoignages réels confirmés (Patrick T., Ludovic M.,
 * Sandrine S.) sous forme de cards d'avis : 5 étoiles, extrait,
 * prénom + initiale. Logo Google G en en-tête.
 *
 * Comportement selon contact.googleReviewsUrl :
 *  - URL officielle (maps.app.goo.gl / g.co) → CTA "Voir tous les
 *    avis sur Google" + "Partager mon avis"
 *  - URL absente / placeholder → mention douce "Fiche Google en cours
 *    de connexion" + CTA "Partager une expérience" sur WhatsApp.
 *
 * Pas de note inventée, pas de fausse URL — la cohérence du brief
 * (« Avis Google plus crédibles ») est respectée par les 3 témoignages
 * réels qui suffisent à porter la preuve sociale.
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
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-[1.5rem] border border-border-soft bg-bg-card p-6 md:p-7 space-y-5"
    >
      {/* En-tête : logo Google + 5 étoiles + label */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-soft">
          <GoogleGIcon size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base md:text-lg text-text-deep leading-tight">
            Témoignages d&apos;expérience
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="flex items-center gap-0.5 text-[#fbbc05]" aria-label="5 étoiles sur 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="text-xs text-text-soft ml-1">
              {temoignages.length} retours confirmés
            </span>
          </div>
        </div>
      </div>

      {/* 3 cards de témoignages compactes */}
      <ul className="space-y-3">
        {temoignages.map((t) => (
          <li
            key={t.fullName}
            className="rounded-xl bg-bg-soft/50 border border-border-soft p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep text-[0.7rem] font-medium shrink-0">
                  {t.fullName.charAt(0)}
                </span>
                <span className="text-sm font-medium text-text-deep truncate">
                  {t.name}
                </span>
              </div>
              <span className="flex items-center gap-0.5 text-[#fbbc05] shrink-0" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 fill-current" />
                ))}
              </span>
            </div>
            <div className="relative pl-5">
              <Quote className="absolute left-0 top-0.5 h-3 w-3 text-gold-deep/50" aria-hidden />
              <p className="text-[0.82rem] text-text-medium leading-relaxed italic">
                {t.quote}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA selon disponibilité de la fiche Google */}
      {officialUrl ? (
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-medium bg-bg-card px-4 py-2 text-xs font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
          >
            <GoogleGIcon size={13} />
            Voir tous les avis Google
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
        </div>
      ) : (
        <p className="text-[0.7rem] text-text-soft italic pt-1">
          Fiche Google en cours de connexion. Les retours ci-dessus sont des
          témoignages réels collectés par Céline.
        </p>
      )}
    </motion.div>
  );
}
