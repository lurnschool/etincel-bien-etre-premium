"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AnkhSymbol,
  LotusOrnament,
  MandalaOrnament,
  ShamanicDrum,
  CacaoCup,
  FlameSpirit,
  TripleSpiral,
  FeminineSun,
  MoonPhases,
} from "./SacredOrnaments";

type Props = {
  variant?:
    | "feminin"
    | "cacao"
    | "retraite"
    | "souffle"
    | "collectif"
    | "reconnexion"
    | "subtle";
  className?: string;
  intensity?: "soft" | "medium";
};

/**
 * Fond décoratif transparent inspiré de l'univers de Céline (Isis,
 * chamanisme doux, féminin sacré). À placer en absolute pointer-events-none.
 * Opacité très faible (5-12%) pour ne jamais gêner la lecture.
 */
export function SacredBackdrop({
  variant = "subtle",
  className,
  intensity = "soft",
}: Props) {
  const opacity = intensity === "soft" ? "opacity-[0.06]" : "opacity-[0.1]";
  const opacityWeak = intensity === "soft" ? "opacity-[0.04]" : "opacity-[0.07]";

  const palette = palettes[variant];

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
    >
      {variant === "feminin" && (
        <>
          <motion.div
            className={cn("absolute -top-20 -left-20", opacity, palette.color)}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
          >
            <MandalaOrnament size={520} />
          </motion.div>
          <div className={cn("absolute top-[35%] right-[8%]", opacityWeak, palette.color)}>
            <AnkhSymbol size={140} strokeWidth={0.8} />
          </div>
          <div className={cn("absolute bottom-[12%] left-[12%]", opacityWeak, palette.color)}>
            <TripleSpiral size={180} strokeWidth={0.7} />
          </div>
        </>
      )}

      {variant === "cacao" && (
        <>
          <div className={cn("absolute top-[15%] left-[6%]", opacity, palette.color)}>
            <CacaoCup size={200} strokeWidth={0.8} />
          </div>
          <motion.div
            className={cn("absolute bottom-[10%] right-[8%]", opacityWeak, palette.color)}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 320, repeat: Infinity, ease: "linear" }}
          >
            <MandalaOrnament size={400} strokeWidth={0.5} />
          </motion.div>
          <div className={cn("absolute top-[55%] right-[18%]", opacityWeak, palette.color)}>
            <FlameSpirit size={120} strokeWidth={0.7} />
          </div>
        </>
      )}

      {variant === "retraite" && (
        <>
          <motion.div
            className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacityWeak, palette.color)}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 480, repeat: Infinity, ease: "linear" }}
          >
            <MandalaOrnament size={780} strokeWidth={0.4} />
          </motion.div>
          <div className={cn("absolute top-[12%] left-[12%]", opacityWeak, palette.color)}>
            <FeminineSun size={140} strokeWidth={0.6} />
          </div>
          <div className={cn("absolute bottom-[15%] right-[12%]", opacityWeak, palette.color)}>
            <MoonPhases size={220} strokeWidth={0.6} />
          </div>
        </>
      )}

      {variant === "souffle" && (
        <>
          <motion.div
            className={cn("absolute top-[15%] right-[10%]", opacity, palette.color)}
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShamanicDrum size={220} strokeWidth={0.7} />
          </motion.div>
          <div className={cn("absolute bottom-[18%] left-[10%]", opacityWeak, palette.color)}>
            <FlameSpirit size={150} strokeWidth={0.7} />
          </div>
        </>
      )}

      {variant === "collectif" && (
        <>
          <div className={cn("absolute top-[10%] left-1/2 -translate-x-1/2", opacityWeak, palette.color)}>
            <MoonPhases size={300} strokeWidth={0.6} />
          </div>
          <motion.div
            className={cn("absolute bottom-[5%] right-[5%]", opacityWeak, palette.color)}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 280, repeat: Infinity, ease: "linear" }}
          >
            <MandalaOrnament size={300} strokeWidth={0.6} />
          </motion.div>
        </>
      )}

      {variant === "reconnexion" && (
        <>
          <motion.div
            className={cn("absolute top-[20%] right-[8%]", opacityWeak, palette.color)}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 360, repeat: Infinity, ease: "linear" }}
          >
            <FeminineSun size={260} strokeWidth={0.5} />
          </motion.div>
          <div className={cn("absolute bottom-[15%] left-[8%]", opacityWeak, palette.color)}>
            <LotusOrnament size={160} strokeWidth={0.7} />
          </div>
        </>
      )}

      {variant === "subtle" && (
        <motion.div
          className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacityWeak, palette.color)}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 420, repeat: Infinity, ease: "linear" }}
        >
          <MandalaOrnament size={640} strokeWidth={0.4} />
        </motion.div>
      )}
    </div>
  );
}

const palettes: Record<NonNullable<Props["variant"]>, { color: string }> = {
  feminin: { color: "text-gold" },
  cacao: { color: "text-gold-deep" },
  retraite: { color: "text-gold-soft" },
  souffle: { color: "text-gold" },
  collectif: { color: "text-gold-deep" },
  reconnexion: { color: "text-gold" },
  subtle: { color: "text-gold-deep" },
};
