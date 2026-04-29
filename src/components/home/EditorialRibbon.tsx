import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhisperLine } from "@/components/ui/WhisperLine";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string[];
  keywords: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  footnote?: string;
  variant?: "feminin" | "collectif" | "warm";
  whisper?: { text: string; position?: "left" | "right" };
};

const variants = {
  feminin: {
    bg: "bg-gradient-to-br from-[#3a1f3d] via-[#2d1830] to-[#4a2742] text-text-on-dark",
    accent: "text-gold-soft",
    title: "text-text-on-dark",
    body: "text-text-on-dark-soft",
    keyword: "border-white/15 bg-white/5 text-text-on-dark-soft hover:border-gold/60 hover:text-gold",
    primary:
      "bg-gold text-text-deep hover:bg-gold-soft hover:-translate-y-0.5",
    secondary:
      "border border-white/25 text-text-on-dark hover:border-gold hover:text-gold",
    footnote: "text-text-on-dark-soft/70 border-white/10",
    halo1: "bg-rose/15",
    halo2: "bg-gold/15",
  },
  collectif: {
    bg: "bg-gradient-to-br from-[#f7e6dc] via-[#fbe9c7] to-[#f1d9d4] text-text-deep",
    accent: "text-gold-deep",
    title: "text-text-deep",
    body: "text-text-medium",
    keyword: "border-text-deep/15 bg-bg-card/70 text-text-deep hover:border-accent hover:text-accent",
    primary: "bg-accent-deep text-text-on-dark hover:bg-accent hover:-translate-y-0.5",
    secondary: "border border-text-deep/20 text-text-deep hover:border-accent hover:text-accent",
    footnote: "text-text-soft border-text-deep/10",
    halo1: "bg-gold/30",
    halo2: "bg-rose/25",
  },
  warm: {
    bg: "bg-gradient-to-br from-[#faf3e6] via-[#f3ecdf] to-[#fdf6e4] text-text-deep",
    accent: "text-gold-deep",
    title: "text-text-deep",
    body: "text-text-medium",
    keyword: "border-border-medium bg-bg-card text-text-deep hover:border-accent hover:text-accent",
    primary: "bg-accent-deep text-text-on-dark hover:bg-accent hover:-translate-y-0.5",
    secondary: "border border-text-deep/20 text-text-deep hover:border-accent hover:text-accent",
    footnote: "text-text-soft border-text-deep/10",
    halo1: "bg-gold/25",
    halo2: "bg-accent/15",
  },
} as const;

/**
 * Bande éditoriale pleine largeur — narration plutôt que cards.
 * Utilisée pour féminin sacré et collectif (et autres bandes).
 */
export function EditorialRibbon({
  id,
  eyebrow,
  title,
  body,
  keywords,
  primaryCta,
  secondaryCta,
  footnote,
  variant = "feminin",
  whisper,
}: Props) {
  const v = variants[variant];

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-24 md:py-32", v.bg)}
    >
      <div className={cn("absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full blur-[140px]", v.halo1)} />
      <div className={cn("absolute -bottom-40 -right-32 h-[36rem] w-[36rem] rounded-full blur-[140px]", v.halo2)} />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      {whisper && (
        <WhisperLine
          text={whisper.text}
          position={whisper.position}
          tone={variant === "feminin" ? "gold" : "amethyst"}
        />
      )}

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6">
              <div className={cn("inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em]", v.accent)}>
                <span className="text-gold">
                  <Etincelle size={12} />
                </span>
                <span>{eyebrow}</span>
              </div>
              <h2 className={cn("font-display text-balance text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight", v.title)}>
                {title}
              </h2>
              <div className={cn("space-y-4 text-base md:text-lg leading-relaxed max-w-xl", v.body)}>
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-400",
                    v.primary,
                  )}
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
                      v.secondary,
                    )}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5">
            <ul className="flex flex-wrap gap-2">
              {keywords.map((k, i) => (
                <li
                  key={k}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    v.keyword,
                  )}
                  style={{
                    transform: `translateY(${(i % 3) * 4}px)`,
                  }}
                >
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {footnote && (
          <Reveal delay={0.3}>
            <p className={cn("mt-12 max-w-2xl text-xs leading-relaxed pt-6 border-t", v.footnote)}>
              {footnote}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
