import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartForm } from "@/components/store/AddToCartForm";
import { StarRating } from "@/components/store/StarRating";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <div className="animate-fade-up mx-auto max-w-5xl px-5 pt-32 pb-24 sm:px-10">
      <nav className="mb-8 text-xs tracking-widest text-[var(--ink-faint)]">
        <Link href="/" className="hover:text-[var(--gold)]">
          全部香氛
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/?category=${product.category.slug}`} className="hover:text-[var(--gold)]">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="shimmer relative flex aspect-square items-center justify-center bg-gold-gradient-soft">
          <span className="text-[8rem] leading-none drop-shadow-sm sm:text-[10rem]">
            {product.imageEmoji}
          </span>
          {product.badge && (
            <span className="absolute top-4 left-4 bg-gold-gradient px-3 py-1 text-[0.6rem] tracking-[0.2em] text-black uppercase">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.25em] text-[var(--gold)]/60 uppercase">
            {product.category.name}
          </p>
          <h1 className="font-display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="text-sm" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-gold-gradient font-display text-2xl">
              {formatCents(product.priceCents)}
            </span>
            {product.compareAtPriceCents && (
              <span className="text-base text-[var(--ink-faint)] line-through">
                {formatCents(product.compareAtPriceCents)}
              </span>
            )}
          </div>
          <p className="mt-5 max-w-md leading-relaxed text-[var(--ink-soft)]">
            {product.description}
          </p>
          <p className="mt-3 text-xs tracking-wide text-[var(--ink-faint)]">
            庫存 {product.stock} 件 · 品牌直送
          </p>

          <div className="mt-8">
            <AddToCartForm
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                imageEmoji: product.imageEmoji,
                stock: product.stock,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
