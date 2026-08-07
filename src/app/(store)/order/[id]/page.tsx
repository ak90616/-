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
    <div className="animate-fade-up mx-auto max-w-xl px-5 pt-32 pb-24 sm:px-10">
      <div className="mb-8 text-center">
        <div className="animate-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-2xl text-black shadow-lg shadow-[#c9a35a]/30">
          ✓
        </div>
        <h1 className="font-display mt-5 text-3xl text-[var(--ink)]">訂單已送出</h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          我們已收到您的訂單,將盡快為您悉心包裝出貨。
        </p>
      </div>

      <div className="border border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="mb-4 font-mono text-xs text-[var(--ink-faint)]">訂單編號:{order.id}</p>
        <div className="space-y-3 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <span className="text-[var(--ink-soft)]">
                {item.productName} × {item.quantity}
              </span>
              <span className="shrink-0 text-[var(--ink)]">
                {formatCents(item.unitCents * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-[var(--line)] pt-5">
          <span className="font-display text-[var(--ink)]">總計</span>
          <span className="text-gold-gradient font-medium">{formatCents(order.totalCents)}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block bg-gold-gradient px-8 py-3.5 text-[0.58rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          繼續選購
        </Link>
      </div>
    </div>
  );
}
