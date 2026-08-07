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
  imageEmoji: z.string().trim().min(1).max(8),
  stock: z.number().int().min(0),
  categoryId: z.string().trim().min(1),
});
