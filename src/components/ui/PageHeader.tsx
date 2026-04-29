import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: "light" | "deep" | "warm";
};

const variants = {
  light: "bg-gradient-to-b from-bg-soft via-bg-base to-bg-base text-text-deep",
  warm: "bg-gradient-to-br from-rose-soft via-bg-soft to-bg-base text-text-deep",
  deep: "bg-bg-deep text-text-on-dark",
};

export function PageHeader({ eyebrow, title, description, variant = "light" }: Props) {
  const isDeep = variant === "deep";
  return (
    <section className={cn("relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24", variants[variant])}>
      <div className="absolute inset-0 pointer-events-none">
        <div className={cn("absolute -top-32 left-1/3 h-96 w-96 rounded-full blur-[140px]", isDeep ? "bg-accent/30" : "bg-gold-soft/40")} />
        <div className={cn("absolute -bottom-20 right-1/4 h-96 w-96 rounded-full blur-[140px]", isDeep ? "bg-gold/20" : "bg-rose-soft/40")} />
      </div>
      <Container className="relative">
        <div className="max-w-3xl space-y-6">
          {eyebrow && (
            <div className={cn("inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em]", isDeep ? "text-gold-soft" : "text-gold-deep")}>
              <span className="text-gold">
                <Etincelle size={14} />
              </span>
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className={cn("font-display text-balance text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight", isDeep ? "text-text-on-dark" : "text-text-deep")}>
            {title}
          </h1>
          {description && (
            <p className={cn("text-lg md:text-xl leading-relaxed max-w-2xl", isDeep ? "text-text-on-dark-soft" : "text-text-medium")}>
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
