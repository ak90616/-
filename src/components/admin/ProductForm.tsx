"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = { id: string; name: string };

const inputClass =
  "w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm outline-none transition-shadow focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-light)]";

type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  price: string;
  imageEmoji: string;
  stock: string;
  categoryId: string;
};

export function ProductForm({
  categories,
  initial,
  productId,
}: {
  categories: Category[];
  initial?: ProductFormValues;
  productId?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(productId);
  const [values, setValues] = useState<ProductFormValues>(
    initial ?? {
      name: "",
      slug: "",
      description: "",
      price: "",
      imageEmoji: "📦",
      stock: "0",
      categoryId: categories[0]?.id ?? "",
    },
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const priceCents = Math.round(Number(values.price) * 100);
    const stock = Number(values.stock);

    if (!values.name.trim() || !values.slug.trim()) {
      setError("請輸入商品名稱與網址代稱");
      return;
    }
    if (!Number.isFinite(priceCents) || priceCents <= 0) {
      setError("請輸入有效的價格");
      return;
    }
    if (!Number.isFinite(stock) || stock < 0) {
      setError("請輸入有效的庫存數量");
      return;
    }
    if (!values.categoryId) {
      setError("請選擇分類");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          slug: values.slug,
          description: values.description,
          priceCents,
          imageEmoji: values.imageEmoji || "📦",
          stock,
          categoryId: values.categoryId,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "儲存失敗");
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--ink)]">商品名稱</label>
        <input
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--ink)]">網址代稱 (slug)</label>
        <input
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          className={inputClass}
          placeholder="例如:wireless-earbuds"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--ink)]">商品描述</label>
        <textarea
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputClass}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink)]">價格 (NT$)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink)]">庫存數量</label>
          <input
            type="number"
            min="0"
            step="1"
            value={values.stock}
            onChange={(e) => update("stock", e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink)]">分類</label>
          <select
            value={values.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink)]">圖示 (emoji)</label>
          <input
            value={values.imageEmoji}
            onChange={(e) => update("imageEmoji", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "儲存中…" : "儲存"}
        </button>
      </div>
    </form>
  );
}
