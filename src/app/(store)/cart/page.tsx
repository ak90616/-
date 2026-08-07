"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents } = useCart();

  if (items.length === 0) {
    return (
      <div className="animate-fade-up px-5 py-40 text-center sm:px-10">
        <p className="text-5xl">🤍</p>
        <p className="mt-4 text-[var(--ink-soft)]">購物車還是空的</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-gold-gradient px-7 py-3 text-[0.58rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          探索香氛系列
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-10">
      <h1 className="font-display mb-10 text-3xl text-[var(--ink)]">購物車</h1>
      <div className="divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--surface)]">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-gold-gradient-soft text-3xl">
              {item.imageEmoji}
            </div>
            <div className="flex-1">
              <Link
                href={`/products/${item.slug}`}
                className="font-display text-[var(--ink)] hover:text-[var(--gold)]"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatCents(item.priceCents)}</p>
            </div>
            <QuantityStepper
              value={item.quantity}
              max={item.stock}
              onChange={(q) => updateQuantity(item.productId, q)}
            />
            <div className="w-24 text-right font-medium text-[var(--ink)]">
              {formatCents(item.priceCents * item.quantity)}
            </div>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-[var(--ink-faint)] transition-colors hover:text-[var(--red)]"
            >
              移除
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border border-[var(--line)] bg-[var(--surface)] p-5">
        <span className="font-display text-lg text-[var(--ink)]">總計</span>
        <span className="text-gold-gradient text-xl font-medium">{formatCents(totalCents)}</span>
      </div>

      <div className="mt-8 flex justify-end">
        <Link
          href="/checkout"
          className="bg-gold-gradient px-8 py-3.5 text-[0.58rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          前往結帳
        </Link>
      </div>
    </div>
  );
}
