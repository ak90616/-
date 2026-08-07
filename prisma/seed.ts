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
    { name: "電子產品", slug: "electronics" },
    { name: "居家生活", slug: "home" },
    { name: "服飾配件", slug: "fashion" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const electronics = await prisma.category.findUniqueOrThrow({
    where: { slug: "electronics" },
  });
  const home = await prisma.category.findUniqueOrThrow({
    where: { slug: "home" },
  });
  const fashion = await prisma.category.findUniqueOrThrow({
    where: { slug: "fashion" },
  });

  const products = [
    {
      name: "無線藍牙耳機",
      slug: "wireless-earbuds",
      description: "高音質無線藍牙耳機,續航力長達 24 小時,支援主動降噪。",
      priceCents: 129900,
      imageEmoji: "🎧",
      stock: 50,
      categoryId: electronics.id,
    },
    {
      name: "智慧手錶",
      slug: "smart-watch",
      description: "支援心率監測、GPS 定位與多種運動模式的智慧手錶。",
      priceCents: 459900,
      imageEmoji: "⌚",
      stock: 30,
      categoryId: electronics.id,
    },
    {
      name: "行動電源 20000mAh",
      slug: "power-bank-20000",
      description: "大容量行動電源,支援 PD 快充,一次可為手機充電 4-5 次。",
      priceCents: 69900,
      imageEmoji: "🔋",
      stock: 100,
      categoryId: electronics.id,
    },
    {
      name: "香氛蠟燭組",
      slug: "scented-candle-set",
      description: "天然大豆蠟製作,附三種香味,營造放鬆居家氛圍。",
      priceCents: 89900,
      imageEmoji: "🕯️",
      stock: 40,
      categoryId: home.id,
    },
    {
      name: "北歐風陶瓷馬克杯",
      slug: "ceramic-mug",
      description: "簡約北歐風設計陶瓷馬克杯,容量 350ml,可微波。",
      priceCents: 39900,
      imageEmoji: "☕",
      stock: 80,
      categoryId: home.id,
    },
    {
      name: "羊毛混紡圍巾",
      slug: "wool-scarf",
      description: "柔軟保暖羊毛混紡圍巾,多色可選,秋冬必備單品。",
      priceCents: 109900,
      imageEmoji: "🧣",
      stock: 60,
      categoryId: fashion.id,
    },
    {
      name: "帆布後背包",
      slug: "canvas-backpack",
      description: "耐用帆布材質後背包,內附筆電夾層,適合通勤與旅行。",
      priceCents: 159900,
      imageEmoji: "🎒",
      stock: 45,
      categoryId: fashion.id,
    },
    {
      name: "極簡皮革錢包",
      slug: "leather-wallet",
      description: "真皮製作極簡短夾,多卡層設計,質感沉穩。",
      priceCents: 129900,
      imageEmoji: "👛",
      stock: 55,
      categoryId: fashion.id,
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
