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
        <h1 className="text-2xl font-bold">商品管理</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          新增商品
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">商品</th>
              <th className="px-4 py-3 font-medium">分類</th>
              <th className="px-4 py-3 font-medium">價格</th>
              <th className="px-4 py-3 font-medium">庫存</th>
              <th className="px-4 py-3 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{product.imageEmoji}</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{product.category.name}</td>
                <td className="px-4 py-3">{formatCents(product.priceCents)}</td>
                <td className="px-4 py-3">
                  {product.stock === 0 ? (
                    <span className="text-red-600">缺貨</span>
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm text-gray-600 hover:text-gray-900"
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
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
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
