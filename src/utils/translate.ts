import { allVocab } from "../data";

const localDictionary = new Map<string, string>();
for (const item of allVocab) {
  localDictionary.set(item.term.trim().toLowerCase(), item.zh);
}

export interface TranslateResult {
  text: string;
  source: "dictionary" | "api";
}

/**
 * Translates English text to Traditional Chinese.
 * Tries the local vocabulary dictionary first (exact match), then falls back
 * to the free MyMemory API. Throws if both fail so callers can show an error state.
 */
export async function translateToZh(text: string): Promise<TranslateResult> {
  const trimmed = text.trim();
  if (!trimmed) return { text: "", source: "dictionary" };

  const exact = localDictionary.get(trimmed.toLowerCase());
  if (exact) return { text: exact, source: "dictionary" };

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    trimmed,
  )}&langpair=en|zh-TW`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`翻譯服務錯誤（${res.status}）`);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  if (!translated) throw new Error("翻譯服務沒有回傳結果");
  return { text: translated, source: "api" };
}
