import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartForm } from "@/components/store/AddToCartForm";

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
    <div className="animate-fade-up">
      <nav className="mb-8 text-xs tracking-widest text-[var(--ink-faint)]">
        <Link href="/" className="hover:text-[var(--gold-deep)]">
          全部香氛
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/?category=${product.category.slug}`} className="hover:text-[var(--gold-deep)]">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="shimmer flex aspect-square items-center justify-center rounded-3xl bg-gold-gradient-soft">
          <span className="text-[8rem] leading-none drop-shadow-sm sm:text-[10rem]">
            {product.imageEmoji}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.25em] text-[var(--gold-deep)]">
            {product.category.name.toUpperCase()}
          </p>
          <h1 className="font-display mt-3 text-3xl text-[var(--ink)] sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-gold-gradient mt-4 text-2xl font-medium">
            {formatCents(product.priceCents)}
          </p>
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
