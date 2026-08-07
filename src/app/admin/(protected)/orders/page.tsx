import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--ink)] mb-6">訂單管理</h1>

      <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg)] text-left text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">訂單編號</th>
              <th className="px-4 py-3 font-medium">客戶</th>
              <th className="px-4 py-3 font-medium">品項數</th>
              <th className="px-4 py-3 font-medium">金額</th>
              <th className="px-4 py-3 font-medium">狀態</th>
              <th className="px-4 py-3 font-medium">建立時間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-[var(--bg)]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-mono text-xs text-[var(--ink-soft)] hover:text-[var(--gold-deep)] hover:underline"
                  >
                    {order.id.slice(0, 10)}…
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="text-[var(--ink)]">{order.customerName}</div>
                  <div className="text-xs text-[var(--ink-faint)]">{order.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-[var(--ink)]">{order.items.length}</td>
                <td className="px-4 py-3 text-[var(--ink)]">{formatCents(order.totalCents)}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">
                  {order.createdAt.toLocaleString("zh-TW")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--ink-faint)]">
                  尚無訂單
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
