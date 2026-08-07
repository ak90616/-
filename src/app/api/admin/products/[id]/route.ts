import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { productInputSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "未授權" }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "資料格式錯誤" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({ where: { id: parsed.data.categoryId } });
  if (!category) {
    return NextResponse.json({ error: "分類不存在" }, { status: 400 });
  }

  const conflicting = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (conflicting && conflicting.id !== id) {
    return NextResponse.json({ error: "此 slug 已被使用" }, { status: 409 });
  }

  try {
    const product = await prisma.product.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "商品不存在" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "未授權" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "刪除失敗,可能是此商品已被訂單引用" },
      { status: 400 },
    );
  }
}
