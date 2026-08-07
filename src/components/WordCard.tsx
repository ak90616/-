import { useState } from "react";
import type { VocabItem } from "../data";
import { StarButton } from "./StarButton";
import { SpeakButton } from "./SpeakButton";

interface WordCardProps {
  item: VocabItem;
  starred: boolean;
  learned: boolean;
  onToggleStar: () => void;
  onToggleLearned: () => void;
}

export function WordCard({ item, starred, learned, onToggleStar, onToggleLearned }: WordCardProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div
      className={`group rounded-xl border p-4 transition-colors ${
        learned
          ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {item.subcategory}
            </span>
            {item.isKey && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                重點
              </span>
            )}
          </div>
          <p className="mt-2 break-words text-lg font-semibold text-slate-900 dark:text-slate-100">
            {item.term}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <SpeakButton text={item.term} />
          <StarButton active={starred} onToggle={onToggleStar} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowTranslation((s) => !s)}
        className="mt-2 text-left text-sm text-slate-500 underline decoration-dotted underline-offset-4 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
      >
        {showTranslation ? item.zh : "點一下顯示中文翻譯"}
      </button>

      {showTranslation && (
        <div className="mt-3 space-y-1 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
          <p className="text-slate-700 dark:text-slate-300">{item.example}</p>
          <p className="text-slate-500 dark:text-slate-400">{item.exampleZh}</p>
        </div>
      )}

      <label className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <input
          type="checkbox"
          checked={learned}
          onChange={onToggleLearned}
          className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        已熟記
      </label>
    </div>
  );
}
