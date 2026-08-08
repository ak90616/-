import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { debateForBestAnswer, GeminiError, type DebateTurn } from "../utils/gemini";

const ROLE_STYLE: Record<DebateTurn["role"], string> = {
  proposer: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40",
  critic: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
  final: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
};

export function GeminiDebate() {
  const [apiKey, setApiKey] = useLocalStorage<string>("tel_gemini_api_key", "");
  const [keyInput, setKeyInput] = useState(apiKey);
  const [question, setQuestion] = useState("");
  const [rounds, setRounds] = useState(2);
  const [turns, setTurns] = useState<DebateTurn[]>([]);
  const [finalAnswer, setFinalAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveKey = () => setApiKey(keyInput.trim());

  const runDebate = async () => {
    if (!apiKey) {
      setError("請先貼上你的 Gemini API key。");
      return;
    }
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setTurns([]);
    setFinalAnswer("");

    try {
      const result = await debateForBestAnswer(apiKey, question.trim(), rounds, (turn) =>
        setTurns((prev) => [...prev, turn]),
      );
      setFinalAnswer(result.finalAnswer);
    } catch (e) {
      setError(e instanceof GeminiError ? e.message : "辯論過程發生未知錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">🤖 Gemini AI 辯論</p>
        <p className="mt-1 text-xs text-slate-400">
          針對你輸入的英文單字或句子，Gemini 會扮演「提案者」與「質疑者」互相挑戰、修正，最後產出最好的翻譯與說明。
        </p>

        <div className="mt-4 flex gap-2">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="貼上你的 Gemini API key"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
          />
          <button
            type="button"
            onClick={saveKey}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            儲存
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          key 只會存在你這台裝置的瀏覽器（localStorage），不會傳到任何伺服器，但仍會直接從瀏覽器打到 Google
          的 Gemini API，請自行注意額度與金鑰保管。可在{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Google AI Studio
          </a>{" "}
          免費取得 key。
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="輸入想深入了解的英文單字或句子…"
          rows={2}
          className="mt-4 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-800 focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />

        <div className="mt-3 flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            辯論輪數
            <select
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="rounded-md border border-slate-200 px-1.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-800"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <button
            type="button"
            onClick={runDebate}
            disabled={loading || !question.trim()}
            className="flex-1 rounded-lg bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "辯論中…" : "開始辯論"}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>

      {finalAnswer && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/40">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">✅ 最終答案</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-100">{finalAnswer}</p>
        </div>
      )}

      {turns.length > 0 && (
        <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <summary className="cursor-pointer text-sm font-medium text-slate-500 dark:text-slate-400">
            查看辯論過程（{turns.length} 則）
          </summary>
          <div className="mt-3 space-y-3">
            {turns.map((turn, i) => (
              <div key={i} className={`rounded-lg border p-3 text-sm ${ROLE_STYLE[turn.role]}`}>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{turn.label}</p>
                <p className="mt-1 whitespace-pre-wrap text-slate-800 dark:text-slate-100">{turn.text}</p>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
