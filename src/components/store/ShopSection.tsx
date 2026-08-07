"use client";

import { useMemo, useState } from "react";
import { ProductCard, type ShopProduct } from "@/components/store/ProductCard";

type Category = { name: string; slug: string };
type SortKey = "default" | "price-asc" | "price-desc" | "rating";

export function ShopSection({
  products,
  categories,
}: {
  products: ShopProduct[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const visibleProducts = useMemo(() => {
    let list =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.categorySlug === activeCategory);

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === "price-desc") list.sort((a, b) => b.priceCents - a.priceCents);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, activeCategory, sort]);

  return (
    <section id="shop" className="scroll-mt-20 px-5 py-20 sm:px-10 sm:py-28">
      <div className="aurum-rv mx-auto mb-10 flex max-w-6xl flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
            Shop — 全部商品
          </p>
          <h2 className="font-display mt-2 text-3xl text-[var(--ink)] sm:text-4xl">探索系列</h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap gap-0.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`border px-4 py-2 text-[0.55rem] tracking-[0.22em] uppercase transition-colors ${
                activeCategory === "all"
                  ? "border-[var(--gold)] bg-[var(--gold)] text-black"
                  : "border-[var(--line)] text-[var(--ink-faint)] hover:text-[var(--gold)]"
              }`}
            >
              全部
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`border px-4 py-2 text-[0.55rem] tracking-[0.22em] uppercase transition-colors ${
                  activeCategory === c.slug
                    ? "border-[var(--gold)] bg-[var(--gold)] text-black"
                    : "border-[var(--line)] text-[var(--ink-faint)] hover:text-[var(--gold)]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[0.5rem] tracking-[0.2em] text-[var(--ink-faint)] uppercase">
              排序
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-[var(--line)] bg-transparent px-2.5 py-1.5 text-[0.55rem] tracking-[0.1em] text-[var(--ink-soft)] outline-none"
            >
              <option value="default">預設</option>
              <option value="price-asc">價格 ↑</option>
              <option value="price-desc">價格 ↓</option>
              <option value="rating">評分</option>
            </select>
          </div>
        </div>
      </div>

      <div className="aurum-rv mx-auto grid max-w-6xl grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {visibleProducts.length === 0 && (
          <p className="col-span-full bg-[var(--bg)] py-16 text-center text-[var(--ink-faint)]">
            此分類尚無商品
          </p>
        )}
      </div>
    </section>
  );
}
