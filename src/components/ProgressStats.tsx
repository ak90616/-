import { categories, vocabByCategory } from "../data";

interface ProgressStatsProps {
  learnedIds: Set<string>;
  starredCount: number;
}

export function ProgressStats({ learnedIds, starredCount }: ProgressStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((cat) => {
        const items = vocabByCategory[cat.id];
        const learned = items.filter((i) => learnedIds.has(i.id)).length;
        const pct = items.length ? Math.round((learned / items.length) * 100) : 0;
        return (
          <div
            key={cat.id}
            className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {cat.emoji} {cat.title}
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">
              {learned}/{items.length}
            </p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
        <p className="text-xs text-amber-700 dark:text-amber-300">★ 已標記重點</p>
        <p className="mt-1 text-lg font-semibold text-amber-700 dark:text-amber-300">{starredCount}</p>
      </div>
    </div>
  );
}
