import { useMemo, useState, type ReactNode } from "react";
import { allVocab, categories, vocabByCategory, type CategoryId, type VocabItem } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { WordCard } from "./components/WordCard";
import { Flashcard } from "./components/Flashcard";
import { QuizMode } from "./components/QuizMode";
import { VoiceTranslator } from "./components/VoiceTranslator";
import { ProgressStats } from "./components/ProgressStats";

type CategoryFilter = CategoryId | "all" | "starred";
type MainTab = "library" | "voice" | "quiz";
type ViewMode = "list" | "flashcard";

const TABS: { id: MainTab; label: string; emoji: string }[] = [
  { id: "library", label: "字彙庫", emoji: "📚" },
  { id: "voice", label: "語音翻譯", emoji: "🎙️" },
  { id: "quiz", label: "測驗", emoji: "📝" },
];

function filterItems(
  catFilter: CategoryFilter,
  starredIds: Set<string>,
  onlyKey: boolean,
  search: string,
): VocabItem[] {
  let base: VocabItem[] =
    catFilter === "all"
      ? allVocab
      : catFilter === "starred"
        ? allVocab.filter((i) => starredIds.has(i.id))
        : vocabByCategory[catFilter];

  if (onlyKey) base = base.filter((i) => i.isKey);

  const q = search.trim().toLowerCase();
  if (q) {
    base = base.filter(
      (i) =>
        i.term.toLowerCase().includes(q) ||
        i.zh.toLowerCase().includes(q) ||
        i.subcategory.toLowerCase().includes(q),
    );
  }

  return base;
}

function App() {
  const [tab, setTab] = useState<MainTab>("library");
  const [catFilter, setCatFilter] = useState<CategoryFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [onlyKey, setOnlyKey] = useState(false);
  const [search, setSearch] = useState("");

  const [starredArr, setStarredArr] = useLocalStorage<string[]>("tel_starred", []);
  const [learnedArr, setLearnedArr] = useLocalStorage<string[]>("tel_learned", []);

  const starredIds = useMemo(() => new Set(starredArr), [starredArr]);
  const learnedIds = useMemo(() => new Set(learnedArr), [learnedArr]);

  const toggleStar = (id: string) => {
    setStarredArr((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleLearned = (id: string) => {
    setLearnedArr((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const items = useMemo(
    () => filterItems(catFilter, starredIds, onlyKey, search),
    [catFilter, starredIds, onlyKey, search],
  );

  const quizItems = useMemo(
    () => filterItems(catFilter === "all" ? "all" : catFilter, starredIds, onlyKey, ""),
    [catFilter, starredIds, onlyKey],
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold sm:text-xl">🇺🇸 TechEnglish 學園</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                程式語言・半導體・日常英文｜語音朗讀・翻譯・重點複習
              </p>
            </div>
          </div>
          <nav className="mt-4 flex gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === "library" && (
          <div className="space-y-5">
            <ProgressStats learnedIds={learnedIds} starredCount={starredIds.size} />

            <div className="flex flex-wrap items-center gap-2">
              <FilterChip active={catFilter === "all"} onClick={() => setCatFilter("all")}>
                全部
              </FilterChip>
              {categories.map((cat) => (
                <FilterChip key={cat.id} active={catFilter === cat.id} onClick={() => setCatFilter(cat.id)}>
                  {cat.emoji} {cat.title}
                </FilterChip>
              ))}
              <FilterChip active={catFilter === "starred"} onClick={() => setCatFilter("starred")}>
                ★ 重點複習
              </FilterChip>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋單字 / 中文 / 主題…"
                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
              />
              <label className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={onlyKey}
                  onChange={(e) => setOnlyKey(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                只看重點
              </label>
              <div className="flex overflow-hidden rounded-lg border border-slate-200 text-sm dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 ${
                    viewMode === "list"
                      ? "bg-sky-600 text-white"
                      : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  清單
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("flashcard")}
                  className={`px-3 py-1.5 ${
                    viewMode === "flashcard"
                      ? "bg-sky-600 text-white"
                      : "bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  卡片
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400">共 {items.length} 筆</p>

            {viewMode === "list" ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <WordCard
                    key={item.id}
                    item={item}
                    starred={starredIds.has(item.id)}
                    learned={learnedIds.has(item.id)}
                    onToggleStar={() => toggleStar(item.id)}
                    onToggleLearned={() => toggleLearned(item.id)}
                  />
                ))}
                {items.length === 0 && (
                  <p className="col-span-full py-10 text-center text-sm text-slate-400">
                    找不到符合條件的單字，換個關鍵字或分類試試看。
                  </p>
                )}
              </div>
            ) : (
              <Flashcard
                items={items}
                starredIds={starredIds}
                learnedIds={learnedIds}
                onToggleStar={toggleStar}
                onToggleLearned={toggleLearned}
              />
            )}
          </div>
        )}

        {tab === "voice" && <VoiceTranslator />}

        {tab === "quiz" && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <FilterChip active={catFilter === "all"} onClick={() => setCatFilter("all")}>
                全部
              </FilterChip>
              {categories.map((cat) => (
                <FilterChip key={cat.id} active={catFilter === cat.id} onClick={() => setCatFilter(cat.id)}>
                  {cat.emoji} {cat.title}
                </FilterChip>
              ))}
              <FilterChip active={catFilter === "starred"} onClick={() => setCatFilter("starred")}>
                ★ 重點複習
              </FilterChip>
              <label className="ml-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={onlyKey}
                  onChange={(e) => setOnlyKey(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                只考重點
              </label>
            </div>
            <QuizMode items={quizItems} key={`${catFilter}-${onlyKey}`} />
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-8 pt-4 text-center text-xs text-slate-400">
        學習資料會自動儲存在這台裝置的瀏覽器中。語音功能需要 Chrome 等支援 Web Speech API 的瀏覽器。
      </footer>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-sky-600 bg-sky-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

export default App;
