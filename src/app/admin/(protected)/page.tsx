import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      where: { status: { not: "CANCELLED" } },
      select: { totalCents: true },
    }),
  ]);

  const revenueCents = orders.reduce((sum, o) => sum + o.totalCents, 0);
  const pendingCount = await prisma.order.count({ where: { status: "PENDING" } });

  const stats = [
    { label: "商品總數", value: productCount },
    { label: "訂單總數", value: orderCount },
    { label: "待處理訂單", value: pendingCount },
    { label: "總營收", value: formatCents(revenueCents) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">儀表板</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
