"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function StoreHeader() {
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-wide text-[var(--ink)]">
            鉑金香氛
          </span>
          <span className="font-display hidden text-xs italic tracking-widest text-[var(--gold)] sm:inline">
            Platinum Parfum
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-sm tracking-wide">
          <Link
            href="/"
            className="relative text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-gradient after:transition-all hover:after:w-full"
          >
            全部香氛
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-gradient after:transition-all hover:after:w-full"
          >
            購物車
            {totalQuantity > 0 && (
              <span
                key={totalQuantity}
                className="animate-pop ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-gradient px-1 text-xs font-medium text-white"
              >
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
