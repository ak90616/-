"use client";

import Link from "next/link";
import { formatCents } from "@/lib/money";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/ui/ToastProvider";

type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  imageEmoji: string;
  stock: number;
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const outOfStock = product.stock === 0;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      imageEmoji: product.imageEmoji,
      stock: product.stock,
    });
    showToast(`已加入「${product.name}」`, "可至購物車查看");
  }

  return (
    <div className="animate-fade-up group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="shimmer relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gold-gradient-soft transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-[#c9a35a]/20">
          <span className="text-6xl transition-transform duration-500 ease-out group-hover:scale-110">
            {product.imageEmoji}
          </span>
          {outOfStock && (
            <span className="absolute right-3 top-3 rounded-full bg-[var(--ink)]/80 px-2.5 py-1 text-[10px] tracking-wide text-white">
              售罄
            </span>
          )}
        </div>
        <div className="mt-3">
          <h3 className="font-display text-base text-[var(--ink)] transition-colors group-hover:text-gold-gradient">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--gold-deep)]">
            {formatCents(product.priceCents)}
          </p>
        </div>
      </Link>

      {!outOfStock && (
        <button
          onClick={handleQuickAdd}
          aria-label={`快速加入購物車:${product.name}`}
          className="absolute right-2 top-2 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-[var(--surface)]/90 text-lg text-[var(--ink)] opacity-0 shadow-md backdrop-blur transition-all duration-300 hover:bg-gold-gradient hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >
          +
        </button>
      )}
    </div>
  );
}
