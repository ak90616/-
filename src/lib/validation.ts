import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "slug 只能包含小寫英文字母、數字與連字號"),
  description: z.string().trim().max(2000).default(""),
  priceCents: z.number().int().positive(),
  compareAtPriceCents: z.number().int().positive().nullable().optional(),
  imageEmoji: z.string().trim().min(1).max(8),
  badge: z.string().trim().max(20).nullable().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().trim().min(1),
});
