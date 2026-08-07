import { useState } from "react";
import type { VocabItem } from "../data";
import { speak } from "../hooks/useSpeech";

interface QuizQuestion {
  item: VocabItem;
  options: string[];
  correctIndex: number;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(pool: VocabItem[], count: number): QuizQuestion[] {
  const chosen = shuffle(pool).slice(0, Math.min(count, pool.length));
  return chosen.map((item) => {
    const distractors = shuffle(pool.filter((v) => v.id !== item.id))
      .slice(0, 3)
      .map((v) => v.zh);
    const options = shuffle([item.zh, ...distractors]);
    return { item, options, correctIndex: options.indexOf(item.zh) };
  });
}

interface QuizModeProps {
  items: VocabItem[];
}

export function QuizMode({ items }: QuizModeProps) {
  const questionCount = Math.min(10, items.length);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuestions(items, questionCount));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const restart = () => {
    setQuestions(buildQuestions(items, questionCount));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (items.length < 4) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-400 dark:border-slate-700">
        這個分類的單字數量太少（至少需要 4 個）才能出測驗題，換個分類試試看。
      </div>
    );
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">測驗結束</p>
        <p className="mt-2 text-4xl font-bold text-sky-600 dark:text-sky-400">
          {score} / {questions.length}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          正確率 {Math.round((score / questions.length) * 100)}%
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          再測一次
        </button>
      </div>
    );
  }

  const q = questions[current];

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          第 {current + 1} / {questions.length} 題
        </span>
        <span>目前得分：{score}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs text-slate-400">這個英文單字／片語的中文意思是？</p>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{q.item.term}</p>
          <button
            type="button"
            onClick={() => speak(q.item.term)}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800"
            aria-label="朗讀"
          >
            🔊
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.correctIndex;
            const isSelected = idx === selected;
            let style =
              "border-slate-200 hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:hover:bg-slate-800";
            if (selected !== null) {
              if (isCorrect) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
              else if (isSelected) style = "border-red-300 bg-red-50 dark:bg-red-950/30";
              else style = "border-slate-200 opacity-60 dark:border-slate-800";
            }
            return (
              <button
                key={opt}
                type="button"
                disabled={selected !== null}
                onClick={() => choose(idx)}
                className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors dark:text-slate-200 ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {q.item.example} <span className="text-slate-400">— {q.item.exampleZh}</span>
            </p>
          </div>
        )}

        {selected !== null && (
          <button
            type="button"
            onClick={next}
            className="mt-5 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            {current + 1 >= questions.length ? "查看成績" : "下一題 →"}
          </button>
        )}
      </div>
    </div>
  );
}
