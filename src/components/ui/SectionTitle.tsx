import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl text-center items-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 text-xs uppercase tracking-[0.32em]",
            invert ? "text-gold-soft" : "text-gold-deep",
          )}
        >
          <span className="gold-line" aria-hidden />
          <span className="font-medium">{eyebrow}</span>
          <span className="gold-line" aria-hidden />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight",
          invert ? "text-text-on-dark" : "text-text-deep",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            invert ? "text-text-on-dark-soft" : "text-text-medium",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
