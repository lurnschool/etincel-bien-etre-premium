"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Source du fichier audio d'ambiance. Tant qu'il vaut une chaîne vide,
 * le composant rend une chip "Ambiance sonore bientôt disponible"
 * (état provisoire demandé par le brief). Dès qu'un mp3 est posé sous
 * /public/audio/ambiance.mp3 et que cette constante est renseignée,
 * la chip devient un vrai contrôle play/pause avec volume doux.
 */
const AUDIO_SRC = "";

/** Volume initial — très faible, ambiance et non musique frontale. */
const INITIAL_VOLUME = 0.18;

/** Clé sessionStorage pour mémoriser l'état (pendant la session). */
const SESSION_KEY = "etincel-ambiance-state-v1";

/**
 * AmbianceToggle — Sprint H Lot G.
 *
 * Bouton flottant discret en bas-centre permettant à la visiteuse
 * d'activer une ambiance sonore douce (jamais d'autoplay).
 *
 * Comportement :
 *  - Pas de fichier audio → chip neutre "Ambiance bientôt disponible"
 *    qui peut être fermée par la visiteuse (mémorisé en session).
 *  - Avec fichier → bouton play/pause, volume bas (18 %), pictogramme
 *    qui pulse très doucement quand actif.
 *
 * Toujours respecte prefers-reduced-motion (pas de pulse en mode reduced).
 *
 * Position : fixed bottom-6 left-1/2 -translate-x-1/2, z-40 — entre
 * WhatsApp (bas-gauche) et FloatingAssistant (bas-droite).
 */
export function AmbianceToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const available = Boolean(AUDIO_SRC);

  // Restaure l'état dismissed depuis sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "dismissed") {
      setDismissed(true);
    }
  }, []);

  const toggle = () => {
    if (!available) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = INITIAL_VOLUME;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "dismissed");
    } catch {
      // sessionStorage indisponible — pas grave
    }
  };

  if (dismissed) return null;

  return (
    <>
      {available && (
        <audio
          ref={audioRef}
          src={AUDIO_SRC}
          loop
          preload="none"
          aria-hidden
        />
      )}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
          "flex items-center gap-2 rounded-full bg-bg-card/95 backdrop-blur-md",
          "border border-border-soft shadow-[0_8px_24px_rgba(31,26,46,0.12)]",
          "pl-3 pr-1.5 py-1.5 text-[0.78rem]",
          available ? "hover:border-gold-soft transition-colors" : "opacity-85",
        )}
        role="region"
        aria-label="Ambiance sonore du refuge"
      >
        <button
          type="button"
          onClick={toggle}
          disabled={!available}
          aria-pressed={playing}
          aria-label={
            available
              ? playing
                ? "Mettre en pause l'ambiance sonore"
                : "Activer l'ambiance sonore"
              : "Ambiance sonore bientôt disponible"
          }
          className={cn(
            "flex items-center gap-2 text-text-deep",
            available ? "cursor-pointer" : "cursor-not-allowed text-text-soft",
          )}
        >
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full",
              available
                ? playing
                  ? "bg-gold-soft text-gold-deep motion-safe:animate-[center-pulse_3s_ease-in-out_infinite]"
                  : "bg-bg-soft text-gold-deep"
                : "bg-bg-soft text-text-soft",
            )}
          >
            {available ? (
              playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />
            ) : (
              <Music2 className="h-3 w-3" />
            )}
          </span>
          <span className="font-medium">
            {available
              ? playing
                ? "Ambiance active"
                : "Activer l'ambiance"
              : "Ambiance bientôt"}
          </span>
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer la barre d'ambiance"
          className="flex h-6 w-6 items-center justify-center rounded-full text-text-soft hover:text-text-deep hover:bg-bg-soft transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </>
  );
}
