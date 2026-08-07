import { useEffect, useState } from "react";
import type { VocabItem } from "../data";
import { StarButton } from "./StarButton";
import { speak } from "../hooks/useSpeech";

interface FlashcardProps {
  items: VocabItem[];
  starredIds: Set<string>;
  learnedIds: Set<string>;
  onToggleStar: (id: string) => void;
  onToggleLearned: (id: string) => void;
}

export function Flashcard({ items, starredIds, learnedIds, onToggleStar, onToggleLearned }: FlashcardProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-400 dark:border-slate-700">
        沒有符合條件的單字。
      </div>
    );
  }

  const item = items[Math.min(index, items.length - 1)];

  const goNext = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % items.length);
  };
  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-center text-sm text-slate-500 dark:text-slate-400">
        {index + 1} / {items.length} · {item.subcategory}
      </p>

      <div
        className={`flip-card mx-auto h-64 w-full cursor-pointer select-none ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-card-inner relative h-full w-full">
          <div className="flip-card-front absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {item.isKey && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                重點
              </span>
            )}
            <div className="absolute right-4 top-4 flex items-center gap-1">
              <StarButton active={starredIds.has(item.id)} onToggle={() => onToggleStar(item.id)} />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{item.term}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                speak(item.term);
              }}
              className="rounded-full bg-sky-50 px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-300"
            >
              🔊 發音
            </button>
            <p className="text-xs text-slate-400">點卡片查看中文</p>
          </div>
          <div className="flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-sky-200 bg-sky-50 p-6 text-center shadow-sm dark:border-sky-900 dark:bg-sky-950/40">
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.zh}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.example}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.exampleZh}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          ← 上一個
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <input
            type="checkbox"
            checked={learnedIds.has(item.id)}
            onChange={() => onToggleLearned(item.id)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          已熟記
        </label>
        <button
          type="button"
          onClick={goNext}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          下一個 →
        </button>
      </div>
    </div>
  );
}
