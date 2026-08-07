import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  customerEmail: z.string().trim().email(),
  customerPhone: z.string().trim().min(1).max(30),
  address: z.string().trim().min(1).max(300),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1),
        quantity: z.number().int().positive().max(99),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "資料格式錯誤" },
      { status: 400 },
    );
  }

  const { customerName, customerEmail, customerPhone, address, items } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
      });
      const productMap = new Map(products.map((p) => [p.id, p]));

      let totalCents = 0;
      const orderItemsData = items.map((item) => {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new Error(`商品不存在:${item.productId}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`「${product.name}」庫存不足`);
        }
        totalCents += product.priceCents * item.quantity;
        return {
          productId: product.id,
          productName: product.name,
          unitCents: product.priceCents,
          quantity: item.quantity,
        };
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          address,
          totalCents,
          items: { create: orderItemsData },
        },
      });
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "結帳失敗";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
