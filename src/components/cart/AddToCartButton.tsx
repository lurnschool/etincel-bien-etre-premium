"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  customAmountCents?: number;
  noteToCeline?: string;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onAdded?: () => void;
};

export function AddToCartButton({
  productId,
  customAmountCents,
  noteToCeline,
  label = "Ajouter au panier",
  className,
  variant = "secondary",
  disabled,
  onAdded,
}: Props) {
  const { addItem } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    addItem({
      productId,
      quantity: 1,
      customAmountCents,
      noteToCeline,
    });
    setConfirmed(true);
    onAdded?.();
    window.setTimeout(() => setConfirmed(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-secondary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {confirmed ? (
        <>
          <Check className="h-4 w-4" />
          Ajouté au panier
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
