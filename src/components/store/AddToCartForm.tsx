"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function AddToCartForm({
  product,
}: {
  product: {
    id: string;
    slug: string;
    name: string;
    priceCents: number;
    imageEmoji: string;
    stock: number;
  };
}) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const outOfStock = product.stock === 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        priceCents: product.priceCents,
        imageEmoji: product.imageEmoji,
        stock: product.stock,
      },
      quantity,
    );
    showToast(`已加入「${product.name}」`, `數量 ${quantity}`);
  }

  function handleBuyNow() {
    handleAdd();
    openCart();
  }

  if (outOfStock) {
    return (
      <p className="inline-flex items-center gap-2 border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink-soft)]">
        目前缺貨中,敬請期待補貨
      </p>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
        <span className="text-sm text-[var(--ink-soft)]">數量</span>
        <QuantityStepper value={quantity} max={Math.min(product.stock, 10)} onChange={setQuantity} />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAdd}
          className="border border-[var(--gold)]/40 px-6 py-3 text-[0.58rem] tracking-[0.25em] text-[var(--gold)] uppercase transition-colors hover:bg-[var(--gold)]/10"
        >
          加入購物車
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-gold-gradient px-6 py-3 text-[0.58rem] tracking-[0.25em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          立即購買
        </button>
      </div>
    </div>
  );
}
