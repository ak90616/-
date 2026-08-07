"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">購物車是空的</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          繼續購物
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">購物車</h1>
      <div className="rounded-lg border bg-white shadow-sm divide-y">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-gray-50 text-3xl">
              {item.imageEmoji}
            </div>
            <div className="flex-1">
              <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-gray-500">{formatCents(item.priceCents)}</p>
            </div>
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              className="rounded-md border px-2 py-1.5 text-sm"
            >
              {Array.from({ length: Math.max(item.stock, item.quantity) }, (_, i) => i + 1).map(
                (n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ),
              )}
            </select>
            <div className="w-24 text-right font-medium">
              {formatCents(item.priceCents * item.quantity)}
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              移除
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
        <span className="text-lg font-semibold">總計</span>
        <span className="text-lg font-bold">{formatCents(totalCents)}</span>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/checkout"
          className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
        >
          前往結帳
        </Link>
      </div>
    </div>
  );
}
