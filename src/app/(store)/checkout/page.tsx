"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatCents } from "@/lib/money";

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
      <div className="py-16 text-center">
        <p className="text-gray-500">購物車是空的,無法結帳</p>
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
    <div className="grid gap-8 md:grid-cols-3">
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">結帳</h1>

        <div>
          <label className="block text-sm font-medium mb-1">收件人姓名</label>
          <input
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(e) => update("customerEmail", e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">電話</label>
          <input
            value={form.customerPhone}
            onChange={(e) => update("customerPhone", e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">收件地址</label>
          <textarea
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
            rows={2}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "處理中…" : `送出訂單 (${formatCents(totalCents)})`}
        </button>
        <p className="text-xs text-gray-400">
          示範用結帳流程,不會產生實際金流交易。
        </p>
      </form>

      <div className="rounded-lg border bg-white p-5 shadow-sm h-fit">
        <h2 className="mb-3 font-semibold">訂單摘要</h2>
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <span>{formatCents(item.priceCents * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
          <span>總計</span>
          <span>{formatCents(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
