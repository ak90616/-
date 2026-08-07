"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type QuickViewProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  imageEmoji: string;
  badge: string | null;
  rating: number;
  reviewCount: number;
  stock: number;
  categoryName: string;
};

type QuickViewContextValue = {
  product: QuickViewProduct | null;
  openQuickView: (product: QuickViewProduct) => void;
  closeQuickView: () => void;
};

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<QuickViewProduct | null>(null);

  const openQuickView = useCallback((p: QuickViewProduct) => setProduct(p), []);
  const closeQuickView = useCallback(() => setProduct(null), []);

  const value = useMemo(
    () => ({ product, openQuickView, closeQuickView }),
    [product, openQuickView, closeQuickView],
  );

  return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
