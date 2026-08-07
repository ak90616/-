import type { CategoryId, VocabItem } from "./types";
import { programmingVocab } from "./programming";
import { semiconductorVocab } from "./semiconductor";
import { dailyVocab } from "./daily";

export * from "./types";
export { categories } from "./categories";

export const allVocab: VocabItem[] = [
  ...programmingVocab,
  ...semiconductorVocab,
  ...dailyVocab,
];

export const vocabByCategory: Record<CategoryId, VocabItem[]> = {
  programming: programmingVocab,
  semiconductor: semiconductorVocab,
  daily: dailyVocab,
};
