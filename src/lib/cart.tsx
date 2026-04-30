"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, type StripeProduct } from "@/lib/stripeProducts";

const STORAGE_KEY = "etincel-cart-v1";

export type CartItem = {
  productId: string;
  quantity: number;
  customAmountCents?: number;
  noteToCeline?: string;
};

export type CartItemEnriched = CartItem & {
  product: StripeProduct;
  unitCents: number;
  lineCents: number;
};

type CartContextValue = {
  items: CartItem[];
  enriched: CartItemEnriched[];
  totalCents: number;
  count: number;
  isReady: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (input: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (it) =>
        it &&
        typeof it.productId === "string" &&
        typeof it.quantity === "number" &&
        it.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage saturé — silencieux côté client
    }
  }, [items, isReady]);

  const addItem = useCallback((input: CartItem) => {
    setItems((current) => {
      const existing = current.find((it) => it.productId === input.productId);
      if (existing) {
        return current.map((it) =>
          it.productId === input.productId
            ? {
                ...it,
                quantity: it.quantity + input.quantity,
                customAmountCents: input.customAmountCents ?? it.customAmountCents,
                noteToCeline: input.noteToCeline ?? it.noteToCeline,
              }
            : it,
        );
      }
      return [...current, input];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((it) => it.productId !== productId)
        : current.map((it) =>
            it.productId === productId ? { ...it, quantity } : it,
          ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((it) => it.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const enriched = useMemo<CartItemEnriched[]>(() => {
    return items
      .map((it) => {
        const product = findProduct(it.productId);
        if (!product) return null;
        const unitCents = it.customAmountCents ?? product.priceCents;
        return {
          ...it,
          product,
          unitCents,
          lineCents: unitCents * it.quantity,
        };
      })
      .filter((x): x is CartItemEnriched => x !== null);
  }, [items]);

  const totalCents = useMemo(
    () => enriched.reduce((sum, it) => sum + it.lineCents, 0),
    [enriched],
  );

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      enriched,
      totalCents,
      count,
      isReady,
      isOpen,
      open,
      close,
      toggle,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [
      items,
      enriched,
      totalCents,
      count,
      isReady,
      isOpen,
      open,
      close,
      toggle,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un <CartProvider>");
  }
  return ctx;
}

export function formatEuros(priceCents: number): string {
  if (priceCents === 0) return "Sur demande";
  const euros = priceCents / 100;
  return euros % 1 === 0
    ? `${euros.toFixed(0)} €`
    : `${euros.toFixed(2).replace(".", ",")} €`;
}
