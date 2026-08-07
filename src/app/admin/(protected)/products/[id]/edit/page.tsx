import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">編輯商品</h1>
      <ProductForm
        categories={categories}
        productId={product.id}
        initial={{
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: (product.priceCents / 100).toString(),
          imageEmoji: product.imageEmoji,
          stock: product.stock.toString(),
          categoryId: product.categoryId,
        }}
      />
    </div>
  );
}
