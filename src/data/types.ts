export type CategoryId = "programming" | "semiconductor" | "daily";

export interface VocabItem {
  id: string;
  category: CategoryId;
  subcategory: string;
  term: string;
  zh: string;
  example: string;
  exampleZh: string;
  isKey?: boolean;
}

export interface CategoryMeta {
  id: CategoryId;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}
