"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Quote } from "lucide-react";
import { contact, temoignages } from "@/lib/data";
import { GoogleGIcon } from "@/components/ui/SocialIcons";

type LiveReview = {
  authorName: string;
  rating: number;
  relativeTime: string;
  text: string;
  profilePhotoUrl?: string;
};

type LiveReviewsPayload = {
  rating: number | null;
  totalRatings: number | null;
  url: string | null;
  reviews: LiveReview[];
};

/**
 * GoogleReviewsTeaser — Sprint K : avis Google live + fallback.
 *
 * Comportement à 3 niveaux (du meilleur au fallback) :
 *
 * 1. API Google Places configurée (GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID
 *    posées sur Vercel) → fetch /api/google-reviews qui renvoie les
 *    derniers avis réels publiés sur la fiche Google Business + note
 *    moyenne + nombre total d'avis. Cache 24h côté serveur.
 *
 * 2. URL Google Business posée (contact.googleReviewsUrl) mais sans
 *    clé API → on affiche les 3 témoignages statiques + CTA "Voir
 *    tous les avis Google" qui ouvre la fiche réelle.
 *
 * 3. Rien de configuré → témoignages statiques + mention "Fiche en
 *    cours de connexion".
 *
 * Aucune note inventée ni fausse URL. La preuve sociale de base est
 * portée par les 3 témoignages réels (Patrick T., Ludovic M., Sandrine S.).
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

  // Tentative de fetch des avis live au mount. Si la route renvoie
  // 503 (clés absentes) ou autre erreur, on reste sur les statiques.
  const [live, setLive] = useState<LiveReviewsPayload | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/google-reviews/", { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LiveReviewsPayload | null) => {
        if (!cancelled && data?.reviews?.length) {
          setLive(data);
        }
      })
      .catch(() => {
        // Route absente, 503 sans clé, ou autre — on garde le fallback.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Reviews à afficher : live si dispo, sinon témoignages statiques.
  const reviewsToShow = live?.reviews?.length
    ? live.reviews.map((r) => ({
        fullName: r.authorName,
        name:
          r.authorName.split(" ")[0] +
          " " +
          (r.authorName.split(" ")[1]?.charAt(0) ?? "") +
          (r.authorName.split(" ").length > 1 ? "." : ""),
        quote: r.text,
        relativeTime: r.relativeTime,
        rating: r.rating,
      }))
    : temoignages.map((t) => ({
        fullName: t.fullName,
        name: t.name,
        quote: t.quote,
        relativeTime: undefined,
        rating: 5,
      }));

  const liveUrl = live?.url ?? officialUrl;
  const liveRating = live?.rating ?? null;
  const liveCount = live?.totalRatings ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-[1.5rem] border border-border-soft bg-bg-card p-6 md:p-7 space-y-5"
    >
      {/* En-tête : logo Google + note + nombre d'avis (live si dispo) */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-soft">
          <GoogleGIcon size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base md:text-lg text-text-deep leading-tight">
            {live ? "Avis Google" : "Témoignages d'expérience"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="flex items-center gap-0.5 text-[#fbbc05]"
              aria-label={`${liveRating ?? 5} étoiles sur 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-current"
                  style={{
                    opacity:
                      liveRating !== null && i + 1 > Math.round(liveRating)
                        ? 0.25
                        : 1,
                  }}
                />
              ))}
            </span>
            <span className="text-xs text-text-soft ml-1">
              {liveRating !== null && liveCount !== null
                ? `${liveRating.toFixed(1)} · ${liveCount} avis Google`
                : `${temoignages.length} retours confirmés`}
            </span>
          </div>
        </div>
      </div>

      {/* Cards de témoignages — live ou statique */}
      <ul className="space-y-3">
        {reviewsToShow.map((r) => (
          <li
            key={r.fullName + (r.relativeTime ?? "")}
            className="rounded-xl bg-bg-soft/50 border border-border-soft p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep text-[0.7rem] font-medium shrink-0">
                  {r.fullName.charAt(0)}
                </span>
                <span className="text-sm font-medium text-text-deep truncate">
                  {r.name}
                </span>
                {r.relativeTime && (
                  <span className="text-[0.65rem] text-text-soft ml-1 shrink-0">
                    · {r.relativeTime}
                  </span>
                )}
              </div>
              <span
                className="flex items-center gap-0.5 text-[#fbbc05] shrink-0"
                aria-hidden
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-2.5 w-2.5 fill-current"
                    style={{ opacity: i + 1 > r.rating ? 0.25 : 1 }}
                  />
                ))}
              </span>
            </div>
            <div className="relative pl-5">
              <Quote
                className="absolute left-0 top-0.5 h-3 w-3 text-gold-deep/50"
                aria-hidden
              />
              <p className="text-[0.82rem] text-text-medium leading-relaxed italic">
                {r.quote}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA selon disponibilité de la fiche Google */}
      {liveUrl ? (
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-medium bg-bg-card px-4 py-2 text-xs font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
          >
            <GoogleGIcon size={13} />
            Voir tous les avis Google
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={liveUrl}
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
