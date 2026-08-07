import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--ink)] mb-6">新增商品</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
