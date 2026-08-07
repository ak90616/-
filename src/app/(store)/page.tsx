import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/ProductCard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: category ? { category: { slug: category } } : undefined,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">全部商品</h1>
        <p className="mt-1 text-sm text-gray-500">探索我們精選的商品</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/"
          className={`rounded-full border px-4 py-1.5 text-sm ${
            !category ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          全部
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/?category=${c.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              category === c.slug
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <p className="col-span-full py-12 text-center text-gray-400">此分類尚無商品</p>
        )}
      </div>
    </div>
  );
}
