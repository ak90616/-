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
      <h1 className="text-2xl font-bold mb-6">訂單管理</h1>

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">訂單編號</th>
              <th className="px-4 py-3 font-medium">客戶</th>
              <th className="px-4 py-3 font-medium">品項數</th>
              <th className="px-4 py-3 font-medium">金額</th>
              <th className="px-4 py-3 font-medium">狀態</th>
              <th className="px-4 py-3 font-medium">建立時間</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-mono text-xs text-gray-700 hover:underline"
                  >
                    {order.id.slice(0, 10)}…
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div>{order.customerName}</div>
                  <div className="text-xs text-gray-400">{order.customerEmail}</div>
                </td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3">{formatCents(order.totalCents)}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {order.createdAt.toLocaleString("zh-TW")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
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
