import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/ProductCard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: category ? { category: { slug: category } } : undefined,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div>
      <section className="relative mb-16 overflow-hidden rounded-3xl border border-[var(--line)] bg-gold-gradient-soft px-8 py-16 text-center sm:py-20">
        <p className="text-xs tracking-[0.3em] text-[var(--gold-deep)]">
          PLATINUM PARFUM
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-2xl text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
          馥郁尊寵,
          <span className="text-gold-gradient italic">鉑金之選</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[var(--ink-soft)]">
          每一瓶都是一段故事的凝縮。探索由頂級調香師精心調製的香氛系列,
          尋找屬於你的簽名氣味。
        </p>
        <Link
          href="#collection"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-sm text-white shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
        >
          探索系列
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>

      <div id="collection" className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-2xl text-[var(--ink)]">
          {activeCategory ? activeCategory.name : "全部香氛"}
        </h2>
        <p className="text-xs tracking-widest text-[var(--ink-faint)]">
          {products.length} 款商品
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/"
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !category
              ? "border-transparent bg-gold-gradient text-white"
              : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-gold hover:text-[var(--ink)]"
          }`}
        >
          全部
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/?category=${c.slug}#collection`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === c.slug
                ? "border-transparent bg-gold-gradient text-white"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-gold hover:text-[var(--ink)]"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <div key={product.id} style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
        {products.length === 0 && (
          <p className="col-span-full py-16 text-center text-[var(--ink-faint)]">
            此分類尚無商品
          </p>
        )}
      </div>
    </div>
  );
}
