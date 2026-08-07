import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/store/Hero";
import { Marquee } from "@/components/store/Marquee";
import { FeaturedBanner } from "@/components/store/FeaturedBanner";
import { ShopSection } from "@/components/store/ShopSection";
import { GallerySection } from "@/components/store/GallerySection";
import { ReviewsSection } from "@/components/store/ReviewsSection";
import { ContactSection } from "@/components/store/ContactSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const shopProducts = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    compareAtPriceCents: p.compareAtPriceCents,
    imageEmoji: p.imageEmoji,
    badge: p.badge,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    categoryName: p.category.name,
    categorySlug: p.category.slug,
  }));

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedBanner />
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
      <ShopSection products={shopProducts} categories={categories} />
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
      <GallerySection />
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
      <ReviewsSection />
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
      <ContactSection />
    </>
  );
}
