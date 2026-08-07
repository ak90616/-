import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartForm } from "@/components/store/AddToCartForm";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-50 text-9xl">
        {product.imageEmoji}
      </div>
      <div>
        <p className="text-sm text-gray-500">{product.category.name}</p>
        <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold">{formatCents(product.priceCents)}</p>
        <p className="mt-4 whitespace-pre-line text-gray-600">{product.description}</p>
        <p className="mt-2 text-sm text-gray-400">庫存:{product.stock} 件</p>

        <div className="mt-6">
          <AddToCartForm
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              priceCents: product.priceCents,
              imageEmoji: product.imageEmoji,
              stock: product.stock,
            }}
          />
        </div>
      </div>
    </div>
  );
}
