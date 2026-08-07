import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Admin",
    },
  });

  const categories = [
    { name: "花香調", slug: "floral" },
    { name: "東方琥珀調", slug: "oriental" },
    { name: "木質調", slug: "woody" },
    { name: "柑橘調", slug: "citrus" },
    { name: "海洋清新調", slug: "aquatic" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const [floral, oriental, woody, citrus, aquatic] = await Promise.all([
    prisma.category.findUniqueOrThrow({ where: { slug: "floral" } }),
    prisma.category.findUniqueOrThrow({ where: { slug: "oriental" } }),
    prisma.category.findUniqueOrThrow({ where: { slug: "woody" } }),
    prisma.category.findUniqueOrThrow({ where: { slug: "citrus" } }),
    prisma.category.findUniqueOrThrow({ where: { slug: "aquatic" } }),
  ]);

  const products = [
    {
      name: "鉑金限定禮盒",
      slug: "platinum-limited-set",
      description:
        "品牌年度旗艦之作。琥珀、鳶尾與白麝香層疊而成,以鉑金雕花瓶身封存,是低調卻無法忽視的存在。內附 50ml 淡香精與同款香氛蠟燭。",
      priceCents: 680000,
      compareAtPriceCents: null,
      imageEmoji: "🥂",
      badge: "頂奢",
      rating: 5.0,
      reviewCount: 34,
      stock: 18,
      categoryId: oriental.id,
    },
    {
      name: "琥珀鉑金",
      slug: "amber-platinum",
      description: "溫暖琥珀與白麝香交融,尾韻帶著細緻粉末感,是品牌的代表性香氣。",
      priceCents: 498000,
      compareAtPriceCents: null,
      imageEmoji: "✨",
      badge: "暢銷",
      rating: 4.9,
      reviewCount: 214,
      stock: 32,
      categoryId: oriental.id,
    },
    {
      name: "檀木沉香",
      slug: "sandal-oud",
      description: "印度檀木與沉香交織出深邃輪廓,前調微苦,後調轉為溫潤甘甜。",
      priceCents: 568000,
      compareAtPriceCents: null,
      imageEmoji: "🪵",
      badge: "限量",
      rating: 4.9,
      reviewCount: 62,
      stock: 24,
      categoryId: woody.id,
    },
    {
      name: "深夜雪松",
      slug: "midnight-cedar",
      description: "雪松與黑胡椒的冷冽開場,收於乾淨的麝香尾韻,適合夜晚的自己。",
      priceCents: 428000,
      compareAtPriceCents: null,
      imageEmoji: "🌙",
      badge: null,
      rating: 4.7,
      reviewCount: 105,
      stock: 40,
      categoryId: woody.id,
    },
    {
      name: "玫瑰晨露",
      slug: "rose-dew",
      description: "清晨玫瑰與白牡丹交織,溫柔而不張揚,尾韻帶著一絲粉感木質。",
      priceCents: 328000,
      compareAtPriceCents: 358000,
      imageEmoji: "🌹",
      badge: null,
      rating: 4.8,
      reviewCount: 126,
      stock: 45,
      categoryId: floral.id,
    },
    {
      name: "白茉莉之吻",
      slug: "white-jasmine-kiss",
      description: "夜光茉莉與晚香玉的甜美交會,輕盈卻極具記憶點。",
      priceCents: 368000,
      compareAtPriceCents: null,
      imageEmoji: "🤍",
      badge: "新品",
      rating: 4.7,
      reviewCount: 88,
      stock: 38,
      categoryId: floral.id,
    },
    {
      name: "西西里柑橘",
      slug: "sicilian-citrus",
      description: "西西里血橙與檸檬葉的明亮開場,清爽而不失質感,適合日常通勤。",
      priceCents: 298000,
      compareAtPriceCents: 328000,
      imageEmoji: "🍋",
      badge: null,
      rating: 4.6,
      reviewCount: 93,
      stock: 55,
      categoryId: citrus.id,
    },
    {
      name: "晨光佛手柑",
      slug: "morning-bergamot",
      description: "佛手柑與淡雅茶香調和,如晨光灑落般清新舒展。",
      priceCents: 278000,
      compareAtPriceCents: 308000,
      imageEmoji: "☀️",
      badge: null,
      rating: 4.5,
      reviewCount: 71,
      stock: 50,
      categoryId: citrus.id,
    },
    {
      name: "海鹽微風",
      slug: "sea-salt-breeze",
      description: "海鹽礦物香氣搭配淡淡鳶尾,如海岸線上的微風,清透乾淨。",
      priceCents: 308000,
      compareAtPriceCents: null,
      imageEmoji: "🌊",
      badge: null,
      rating: 4.7,
      reviewCount: 58,
      stock: 42,
      categoryId: aquatic.id,
    },
    {
      name: "無花果之泉",
      slug: "fig-spring",
      description: "無花果葉的青綠氣息與白麝香相融,自然而優雅,適合四季。",
      priceCents: 338000,
      compareAtPriceCents: null,
      imageEmoji: "🌿",
      badge: null,
      rating: 4.6,
      reviewCount: 80,
      stock: 36,
      categoryId: aquatic.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
