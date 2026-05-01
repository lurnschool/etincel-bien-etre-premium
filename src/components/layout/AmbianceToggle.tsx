"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Source du fichier audio d'ambiance.
 *
 * Tant que cette constante est vide, le composant rend un état doux
 * "Ambiance sonore bientôt disponible" (le bouton n'a jamais l'air
 * cassé). Dès qu'un fichier MP3 valide est posé sous /public/audio/
 * et que cette constante pointe dessus, le composant bascule en mode
 * lecteur fonctionnel (fade in/out, loop, volume bas, localStorage).
 *
 * Procédure d'installation : voir /public/audio/LICENSE-ambiance.txt
 */
const AUDIO_SRC = "";

/** Volume cible (audio en ambiance, jamais frontal). */
const TARGET_VOLUME = 0.20;

/** Durée du fade in/out en millisecondes. */
const FADE_MS = 1200;

/** Clé localStorage — préférence utilisateur (cross-session). */
const PREF_KEY = "etincel-ambiance-pref-v1";
/** Clé sessionStorage — chip masquée pour la session courante. */
const DISMISS_KEY = "etincel-ambiance-dismissed-v1";

type Pref = "playing" | "paused" | "unset";

/**
 * AmbianceToggle — Sprint H Lot G + Sprint I Lot 1.
 *
 * Chip flottante bas-centre permettant à la visiteuse d'activer une
 * ambiance sonore douce — jamais d'autoplay imposé.
 *
 * Comportement :
 *  - Pas de fichier audio (AUDIO_SRC vide) → chip neutre cliquable
 *    "Ambiance bientôt", peut être fermée (sessionStorage).
 *  - Avec fichier      → bouton play/pause avec fade in/out,
 *    loop, volume 0.20, préférence mémorisée en localStorage
 *    (la visiteuse retrouve son choix à la prochaine visite).
 *  - Si la préférence est "playing" et le fichier dispo → la
 *    musique reprend automatiquement APRÈS un premier geste de
 *    l'utilisateur (politique navigateur, pas d'autoplay forcé).
 *
 * Position : fixed bottom-6 left-1/2 -translate-x-1/2, z-40 — entre
 * WhatsApp (bas-gauche) et FloatingAssistant (bas-droite).
 *
 * Respect de prefers-reduced-motion (pas d'animation pulse en mode
 * reduced ; le pictogramme reste visible mais immobile).
 */
export function AmbianceToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const available = Boolean(AUDIO_SRC);

  // Restaure le dismiss session — pattern hydration-safe standard.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(DISMISS_KEY) === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(true);
    }
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const steps = Math.max(8, Math.round(FADE_MS / 50));
    const start = audio.volume;
    const delta = (target - start) / steps;
    let i = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      i += 1;
      audio.volume = Math.min(1, Math.max(0, start + delta * i));
      if (i >= steps) {
        if (fadeIntervalRef.current) {
          window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.volume = target;
        onDone?.();
      }
    }, FADE_MS / steps);
  };

  // Restaure la préférence cross-session : si playing → le composant
  // reprend automatiquement la lecture sur le premier geste utilisateur
  // (un autoplay direct est bloqué par le navigateur, c'est normal).
  useEffect(() => {
    if (typeof window === "undefined" || !available) return;
    const pref = (window.localStorage.getItem(PREF_KEY) ?? "unset") as Pref;
    if (pref !== "playing") return;
    const onFirstGesture = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0;
      audio.play().then(() => {
        fadeTo(TARGET_VOLUME);
        setPlaying(true);
      }).catch(() => {
        // Autoplay refusé ou erreur — la chip reste sur "Activer"
      });
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
    // fadeTo est volontairement omis : c'est une fonction stable du composant
    // qui ne dépend que de refs (pas de state), réinitialiser l'effect à
    // chaque render n'apporte rien et risquerait de re-binder les listeners.
  }, [available]);

  const toggle = () => {
    if (!available) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0, () => {
        audio.pause();
        setPlaying(false);
      });
      try {
        window.localStorage.setItem(PREF_KEY, "paused");
      } catch {
        // localStorage indisponible — pas grave
      }
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        fadeTo(TARGET_VOLUME);
        setPlaying(true);
        try {
          window.localStorage.setItem(PREF_KEY, "playing");
        } catch {
          // ok
        }
      }).catch(() => {
        // play() rejeté — état inchangé, l'utilisateur peut retenter
      });
    }
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ok
    }
  };

  if (dismissed) return null;

  // Mode minimal : juste une note de musique discrète, sans texte.
  // Tooltip natif (title) pour l'info "Activer / Couper / Bientôt".
  // Position : bottom-center, rond 36px, n'occulte pas le contenu.
  const tooltip = available
    ? playing
      ? "Couper l'ambiance sonore"
      : "Activer l'ambiance sonore"
    : "Ambiance sonore bientôt disponible";

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
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5"
        role="region"
        aria-label="Ambiance sonore du refuge"
      >
        <button
          type="button"
          onClick={toggle}
          disabled={!available}
          aria-pressed={playing}
          aria-label={tooltip}
          title={tooltip}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md",
            "shadow-[0_4px_14px_rgba(31,26,46,0.12)] transition-colors",
            available
              ? playing
                ? "bg-gold-soft/95 text-gold-deep border border-gold/40 hover:border-gold motion-safe:animate-[center-pulse_3s_ease-in-out_infinite]"
                : "bg-bg-card/95 text-gold-deep border border-gold-soft/60 hover:border-gold cursor-pointer"
              : "bg-bg-card/85 text-text-soft border border-border-soft cursor-not-allowed opacity-75",
          )}
        >
          {available ? (
            playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />
          ) : (
            <Music2 className="h-3.5 w-3.5" />
          )}
        </button>
        {/* Bouton de fermeture mini, visible seulement au hover du conteneur */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer la barre d'ambiance"
          className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-card/85 backdrop-blur-md border border-border-soft/60 text-text-soft hover:text-text-deep transition-opacity opacity-0 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-60"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      </div>
    </>
  );
}
