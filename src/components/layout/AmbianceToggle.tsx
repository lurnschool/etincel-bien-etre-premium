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
          "flex items-center gap-1.5 rounded-full bg-bg-card/95 backdrop-blur-md",
          "border border-border-soft shadow-[0_8px_24px_rgba(31,26,46,0.12)]",
          "pl-3 pr-1.5 py-1.5 text-[0.78rem] max-w-[calc(100vw-1.5rem)]",
          available ? "hover:border-gold-soft transition-colors" : "opacity-90",
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
                ? "Couper l'ambiance sonore"
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
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
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
          <span className="font-medium whitespace-nowrap">
            {available
              ? playing
                ? "Couper l'ambiance"
                : "Activer l'ambiance"
              : "Ambiance bientôt disponible"}
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
