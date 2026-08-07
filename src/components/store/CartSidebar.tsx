"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCents } from "@/lib/money";

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalCents } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-400 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-[80] flex h-full w-full max-w-[420px] flex-col border-l border-[var(--line)] bg-[var(--surface)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
          <span className="font-display text-xl text-[var(--ink)]">購物車</span>
          <button
            onClick={closeCart}
            aria-label="關閉購物車"
            className="text-[var(--gold)]/60 transition-colors hover:text-[var(--gold)]"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[var(--ink-faint)]">
              <svg viewBox="0 0 24 24" className="h-12 w-12 stroke-[var(--gold)] opacity-30" fill="none" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-display text-lg text-[var(--ink-soft)] italic">購物車是空的</p>
              <span className="text-xs tracking-widest">快去選購心儀的香氛吧</span>
            </div>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 py-4">
                  <div className="flex h-20 w-16 shrink-0 items-center justify-center bg-gold-gradient-soft text-2xl">
                    {item.imageEmoji}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <span className="font-display text-[var(--ink)]">{item.name}</span>
                    <span className="text-gold-gradient text-sm">{formatCents(item.priceCents)}</span>
                    <QuantityStepper
                      value={item.quantity}
                      max={item.stock}
                      onChange={(q) => updateQuantity(item.productId, q)}
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    aria-label={`移除 ${item.name}`}
                    className="self-start text-[var(--ink-faint)] transition-colors hover:text-[var(--red)]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[var(--line)] px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs tracking-[0.26em] text-[var(--ink-soft)] uppercase">小計</span>
              <span className="text-gold-gradient font-display text-xl">{formatCents(totalCents)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-gold-gradient py-3.5 text-center text-[0.6rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-shadow hover:shadow-lg"
            >
              前往結帳
            </Link>
            <button
              onClick={closeCart}
              className="mt-2 w-full py-2.5 text-[0.58rem] tracking-[0.26em] text-[var(--ink-faint)] uppercase transition-colors hover:text-[var(--gold)]"
            >
              繼續選購
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
