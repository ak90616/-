"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { STATUS_LABEL } from "@/components/admin/OrderStatusBadge";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"];

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(next: string) {
    setStatus(next);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "更新失敗");
        setStatus(currentStatus);
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm outline-none transition-shadow focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-light)]"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABEL[s]}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
