"use client";

import Link from "next/link";
import { formatCents } from "@/lib/money";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { useQuickView } from "@/components/store/QuickViewProvider";
import { StarRating } from "@/components/store/StarRating";

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  imageEmoji: string;
  badge: string | null;
  rating: number;
  reviewCount: number;
  stock: number;
  categoryName: string;
  categorySlug: string;
};

export function ProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { openQuickView } = useQuickView();
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

  function handleQuickView(e: React.MouseEvent) {
    e.preventDefault();
    openQuickView({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      priceCents: product.priceCents,
      compareAtPriceCents: product.compareAtPriceCents,
      imageEmoji: product.imageEmoji,
      badge: product.badge,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stock,
      categoryName: product.categoryName,
    });
  }

  return (
    <div className="group border border-[var(--line)] bg-[var(--bg)] transition-colors duration-300 hover:bg-[var(--bg2)]">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gold-gradient-soft">
          <div className="flex h-full w-full items-center justify-center text-6xl transition-transform duration-700 ease-out group-hover:scale-110">
            {product.imageEmoji}
          </div>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold-gradient px-2.5 py-1 text-[0.6rem] tracking-[0.15em] text-black uppercase">
              {product.badge}
            </span>
          )}
          {outOfStock && (
            <span className="absolute top-3 right-3 bg-[var(--red)] px-2.5 py-1 text-[0.6rem] tracking-[0.15em] text-white uppercase">
              售罄
            </span>
          )}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 border border-[var(--gold)]/30 bg-[var(--bg)]/90 px-4 py-2 text-[0.55rem] tracking-[0.2em] text-[var(--gold)] uppercase opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            快速查看
          </button>
        </div>
        <div className="flex flex-col gap-1 p-5">
          <span className="text-[0.55rem] tracking-[0.3em] text-[var(--gold)]/50 uppercase">
            {product.categoryName}
          </span>
          <h3 className="font-display text-xl text-[var(--ink)]">{product.name}</h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-lg text-[var(--gold)]">
              {formatCents(product.priceCents)}
            </span>
            {product.compareAtPriceCents && (
              <span className="text-xs text-[var(--ink-faint)] line-through">
                {formatCents(product.compareAtPriceCents)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <button
          onClick={handleQuickAdd}
          disabled={outOfStock}
          className="w-full bg-gold-gradient py-2.5 text-[0.55rem] tracking-[0.25em] text-black uppercase transition-shadow hover:shadow-lg hover:shadow-[#c9a35a]/30 disabled:cursor-not-allowed disabled:bg-none disabled:bg-[var(--line)] disabled:text-[var(--ink-faint)]"
        >
          {outOfStock ? "補貨通知" : "加入購物車"}
        </button>
      </div>
    </div>
  );
}
