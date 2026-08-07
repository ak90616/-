"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuickView } from "@/components/store/QuickViewProvider";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCents } from "@/lib/money";
import { StarRating } from "@/components/store/StarRating";

export function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const open = Boolean(product);

  function handleAdd() {
    if (!product) return;
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
    closeQuickView();
    setQuantity(1);
    openCart();
  }

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center p-4 transition-opacity duration-400 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={() => {
          closeQuickView();
          setQuantity(1);
        }}
        className="absolute inset-0 bg-black/70"
      />
      {product && (
        <div
          className={`relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto border border-[var(--line)] bg-[var(--surface)] transition-transform duration-400 sm:grid-cols-2 ${
            open ? "translate-y-0" : "translate-y-5"
          }`}
        >
          <button
            onClick={() => {
              closeQuickView();
              setQuantity(1);
            }}
            aria-label="關閉"
            className="absolute top-3 right-4 z-10 text-xl text-[var(--gold)]/50 transition-colors hover:text-[var(--gold)]"
          >
            ✕
          </button>

          <div className="flex aspect-square items-center justify-center bg-gold-gradient-soft sm:aspect-auto">
            <span className="text-[7rem]">{product.imageEmoji}</span>
          </div>

          <div className="flex flex-col gap-3 p-8">
            <span className="text-[0.55rem] tracking-[0.35em] text-[var(--gold)]/60 uppercase">
              {product.categoryName}
            </span>
            <h3 className="font-display text-3xl text-[var(--ink)]">{product.name}</h3>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <p className="font-body text-sm leading-relaxed text-[var(--ink-soft)]">
              {product.description}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-gold-gradient font-display text-2xl">
                {formatCents(product.priceCents)}
              </span>
              {product.compareAtPriceCents && (
                <span className="text-sm text-[var(--ink-faint)] line-through">
                  {formatCents(product.compareAtPriceCents)}
                </span>
              )}
            </div>

            {product.stock === 0 ? (
              <p className="mt-2 text-sm text-[var(--ink-faint)]">目前缺貨中</p>
            ) : (
              <div className="mt-2 flex items-center gap-4">
                <span className="text-[0.6rem] tracking-[0.2em] text-[var(--ink-soft)] uppercase">
                  數量
                </span>
                <QuantityStepper value={quantity} max={Math.min(product.stock, 10)} onChange={setQuantity} />
              </div>
            )}

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="mt-3 bg-gold-gradient py-3.5 text-[0.6rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:bg-none disabled:bg-[var(--line)] disabled:text-[var(--ink-faint)] disabled:shadow-none"
            >
              {product.stock === 0 ? "補貨通知" : "加入購物車"}
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={() => {
                closeQuickView();
                setQuantity(1);
              }}
              className="text-center text-[0.58rem] tracking-[0.2em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--gold)]"
            >
              查看完整詳情 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
