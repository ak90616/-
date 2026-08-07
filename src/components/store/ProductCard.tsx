import Link from "next/link";
import { formatCents } from "@/lib/money";

type Product = {
  slug: string;
  name: string;
  priceCents: number;
  imageEmoji: string;
  stock: number;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center rounded-md bg-gray-50 text-5xl">
        {product.imageEmoji}
      </div>
      <h3 className="mt-3 font-medium group-hover:underline">{product.name}</h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-semibold">{formatCents(product.priceCents)}</span>
        {product.stock === 0 && (
          <span className="text-xs text-red-600">缺貨</span>
        )}
      </div>
    </Link>
  );
}
