"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "header" | "ghost";
  className?: string;
};

export function CartButton({ variant = "header", className }: Props) {
  const { count, open, isReady } = useCart();
  const showBadge = isReady && count > 0;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Panier — ${count} article${count > 1 ? "s" : ""}` : "Ouvrir le panier"}
      className={cn(
        "relative inline-flex items-center justify-center transition-colors",
        variant === "header"
          ? "h-9 w-9 rounded-full bg-bg-card border border-border-soft text-text-deep hover:bg-bg-soft hover:text-accent"
          : "gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-medium text-text-deep hover:text-accent hover:bg-bg-soft",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {variant === "ghost" && <span>Panier</span>}
      {showBadge && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-deep px-1 text-[0.6rem] font-medium text-text-on-dark tabular-nums",
            variant === "ghost" && "static -top-0 -right-0 ml-1",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
