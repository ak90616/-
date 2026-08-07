import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-[var(--ink)]">商品管理</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm text-white shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          新增商品
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg)] text-left text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">商品</th>
              <th className="px-4 py-3 font-medium">分類</th>
              <th className="px-4 py-3 font-medium">價格</th>
              <th className="px-4 py-3 font-medium">庫存</th>
              <th className="px-4 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {products.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-[var(--bg)]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{product.imageEmoji}</span>
                    <span className="font-medium text-[var(--ink)]">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{product.category.name}</td>
                <td className="px-4 py-3 text-[var(--ink)]">{formatCents(product.priceCents)}</td>
                <td className="px-4 py-3">
                  {product.stock === 0 ? (
                    <span className="text-red-500">缺貨</span>
                  ) : (
                    <span className="text-[var(--ink)]">{product.stock}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm text-[var(--ink-soft)] hover:text-[var(--gold-deep)]"
                    >
                      編輯
                    </Link>
                    <DeleteButton
                      endpoint={`/api/admin/products/${product.id}`}
                      confirmMessage={`確定要刪除「${product.name}」嗎?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--ink-faint)]">
                  尚無商品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
