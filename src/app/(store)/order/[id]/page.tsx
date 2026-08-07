import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function OrderConfirmationPage({
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
    <div className="mx-auto max-w-xl">
      <div className="mb-6 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-3 text-2xl font-bold">訂單已送出</h1>
        <p className="mt-1 text-sm text-gray-500">
          我們已收到您的訂單,將盡快為您處理出貨。
        </p>
      </div>

      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <p className="mb-3 font-mono text-xs text-gray-400">訂單編號:{order.id}</p>
        <div className="space-y-2 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.productName} × {item.quantity}
              </span>
              <span>{formatCents(item.unitCents * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
          <span>總計</span>
          <span>{formatCents(order.totalCents)}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
        >
          繼續購物
        </Link>
      </div>
    </div>
  );
}
