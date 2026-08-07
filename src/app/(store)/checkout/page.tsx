"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatCents } from "@/lib/money";

const inputClass =
  "w-full border-0 border-b border-[var(--line)] bg-transparent py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]";

export default function CheckoutPage() {
  const { items, totalCents, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "結帳失敗");
        return;
      }
      clear();
      router.push(`/order/${data.orderId}`);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="animate-fade-up px-5 py-40 text-center sm:px-10">
        <p className="text-[var(--ink-soft)]">購物車是空的,無法結帳</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-gold-gradient px-7 py-3 text-[0.58rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          繼續選購
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up mx-auto grid max-w-4xl gap-12 px-5 pt-32 pb-24 sm:px-10 md:grid-cols-3">
      <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
        <h1 className="font-display text-3xl text-[var(--ink)]">結帳</h1>

        <div>
          <label className="mb-1.5 block text-[0.55rem] tracking-[0.25em] text-[var(--gold)]/60 uppercase">
            收件人姓名
          </label>
          <input
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[0.55rem] tracking-[0.25em] text-[var(--gold)]/60 uppercase">
            Email
          </label>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(e) => update("customerEmail", e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[0.55rem] tracking-[0.25em] text-[var(--gold)]/60 uppercase">
            電話
          </label>
          <input
            value={form.customerPhone}
            onChange={(e) => update("customerPhone", e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[0.55rem] tracking-[0.25em] text-[var(--gold)]/60 uppercase">
            收件地址
          </label>
          <textarea
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-gradient px-6 py-3.5 text-[0.6rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "處理中…" : `送出訂單・${formatCents(totalCents)}`}
        </button>
        <p className="text-xs text-[var(--ink-faint)]">
          示範用結帳流程,不會產生實際金流交易。
        </p>
      </form>

      <div className="h-fit border border-[var(--line)] bg-[var(--surface)] p-6">
        <h2 className="font-display mb-4 text-lg text-[var(--ink)]">訂單摘要</h2>
        <div className="space-y-3 text-sm">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-3">
              <span className="text-[var(--ink-soft)]">
                {item.name} × {item.quantity}
              </span>
              <span className="shrink-0 text-[var(--ink)]">
                {formatCents(item.priceCents * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-[var(--line)] pt-5">
          <span className="font-display text-[var(--ink)]">總計</span>
          <span className="text-gold-gradient font-medium">{formatCents(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
