"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function StoreHeader() {
  const { totalQuantity } = useCart();

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          極簡商店
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-gray-600">
            全部商品
          </Link>
          <Link href="/cart" className="relative hover:text-gray-600">
            購物車
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-medium text-white">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
