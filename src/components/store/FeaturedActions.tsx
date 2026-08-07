"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { useQuickView, type QuickViewProduct } from "@/components/store/QuickViewProvider";

export function FeaturedActions({ product }: { product: QuickViewProduct }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { openQuickView } = useQuickView();

  function handleAdd() {
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
    <div className="aurum-rv mt-2 flex flex-wrap gap-3.5">
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className="inline-flex items-center gap-2 bg-gold-gradient px-7 py-3.5 text-[0.56rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:bg-none disabled:bg-[var(--line)] disabled:text-[var(--ink-faint)]"
      >
        {product.stock === 0 ? "補貨通知" : "加入購物車"}
      </button>
      <button
        onClick={() => openQuickView(product)}
        className="inline-flex items-center gap-2 border border-[var(--gold)]/40 px-7 py-3 text-[0.56rem] tracking-[0.3em] text-[var(--gold)] uppercase transition-colors hover:bg-[var(--gold)]/10"
      >
        查看詳情
      </button>
    </div>
  );
}
