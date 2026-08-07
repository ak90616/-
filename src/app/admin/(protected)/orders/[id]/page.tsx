import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-[var(--ink)] mb-1">訂單詳情</h1>
      <p className="mb-6 font-mono text-xs text-[var(--ink-faint)]">{order.id}</p>

      <div className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="mb-3 font-semibold text-[var(--ink)]">客戶資訊</h2>
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <dt className="text-[var(--ink-soft)]">姓名</dt>
          <dd className="col-span-2 text-[var(--ink)]">{order.customerName}</dd>
          <dt className="text-[var(--ink-soft)]">Email</dt>
          <dd className="col-span-2 text-[var(--ink)]">{order.customerEmail}</dd>
          <dt className="text-[var(--ink-soft)]">電話</dt>
          <dd className="col-span-2 text-[var(--ink)]">{order.customerPhone}</dd>
          <dt className="text-[var(--ink-soft)]">地址</dt>
          <dd className="col-span-2 text-[var(--ink)]">{order.address}</dd>
          <dt className="text-[var(--ink-soft)]">建立時間</dt>
          <dd className="col-span-2 text-[var(--ink)]">
            {order.createdAt.toLocaleString("zh-TW")}
          </dd>
        </dl>
      </div>

      <div className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="mb-3 font-semibold text-[var(--ink)]">訂單狀態</h2>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="mb-3 font-semibold text-[var(--ink)]">訂購商品</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-[var(--ink-soft)]">
            <tr>
              <th className="py-2 font-medium">商品</th>
              <th className="py-2 font-medium">單價</th>
              <th className="py-2 font-medium">數量</th>
              <th className="py-2 font-medium text-right">小計</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {order.items.map((item) => (
              <tr key={item.id} className="text-[var(--ink)]">
                <td className="py-2">{item.productName}</td>
                <td className="py-2">{formatCents(item.unitCents)}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2 text-right">
                  {formatCents(item.unitCents * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-3 text-right font-semibold text-[var(--ink)]">
                總計
              </td>
              <td className="text-gold-gradient pt-3 text-right font-semibold">
                {formatCents(order.totalCents)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
