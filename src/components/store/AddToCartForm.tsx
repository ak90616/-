"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

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
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    setAdded(true);
  }

  function handleBuyNow() {
    handleAdd();
    router.push("/cart");
  }

  if (outOfStock) {
    return <p className="text-red-600 font-medium">目前缺貨中</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="quantity" className="text-sm text-gray-500">
          數量
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="rounded-md border px-3 py-1.5 text-sm"
        >
          {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="rounded-md border border-gray-900 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
        >
          加入購物車
        </button>
        <button
          onClick={handleBuyNow}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          立即購買
        </button>
      </div>
      {added && <p className="mt-2 text-sm text-green-600">已加入購物車</p>}
    </div>
  );
}
