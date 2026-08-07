import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { StarRating } from "@/components/store/StarRating";
import { FeaturedActions } from "@/components/store/FeaturedActions";

export async function FeaturedBanner() {
  const product = await prisma.product.findFirst({
    where: { slug: "amber-platinum" },
    include: { category: true },
  });

  if (!product) return null;

  return (
    <section id="featured" className="scroll-mt-20 bg-[var(--bg2)] px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2 sm:gap-16">
        <div className="aurum-rv relative flex aspect-[3/4] max-h-[500px] items-center justify-center bg-gold-gradient-soft">
          <span className="text-[9rem]">{product.imageEmoji}</span>
          <span className="absolute top-4 left-4 -m-px h-6 w-6 border-t border-l border-[var(--gold)]/40" />
          <span className="absolute right-4 bottom-4 -m-px h-6 w-6 border-r border-b border-[var(--gold)]/40" />
          <span className="absolute top-4 left-4 bg-gold-gradient px-2.5 py-1 text-[0.55rem] tracking-[0.2em] text-black uppercase">
            本週精選
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="aurum-rv text-[0.58rem] tracking-[0.35em] text-[var(--gold)] uppercase">
            至尊系列 · 本週推薦
          </p>
          <h2 className="aurum-rv font-display text-4xl font-light text-[#e8dfc8] sm:text-5xl">
            {product.name}
          </h2>
          <div className="aurum-rv">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="text-sm" />
          </div>
          <p className="aurum-rv my-2 text-sm leading-loose text-[var(--ink-faint)]">
            {product.description}
          </p>
          <p className="aurum-rv text-[0.62rem] tracking-[0.15em] text-[var(--ink-faint)]">
            {product.category.name}
          </p>
          <p className="aurum-rv font-display text-3xl text-[var(--gold)]">
            {formatCents(product.priceCents)}
          </p>
          <FeaturedActions
            product={{
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
              categoryName: product.category.name,
            }}
          />
        </div>
      </div>
    </section>
  );
}
