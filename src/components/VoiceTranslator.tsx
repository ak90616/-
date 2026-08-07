import { useState } from "react";
import { speak, useSpeechRecognition, useSpeechSupport } from "../hooks/useSpeech";
import { translateToZh } from "../utils/translate";

export function VoiceTranslator() {
  const { ttsSupported, sttSupported } = useSpeechSupport();
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [source, setSource] = useState<"dictionary" | "api" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTranslate = async (input: string) => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setSource(null);
    try {
      const result = await translateToZh(input);
      setTranslation(result.text);
      setSource(result.source);
    } catch {
      setError("翻譯失敗，請檢查網路連線後再試一次。");
    } finally {
      setLoading(false);
    }
  };

  const { listening, transcript, error: sttError, start, stop } = useSpeechRecognition({
    lang: "en-US",
    onResult: (finalText) => {
      setText(finalText);
      runTranslate(finalText);
    },
  });

  const displayText = listening ? transcript || text : text;

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">語音翻譯（英 → 中）</p>
        <p className="mt-1 text-xs text-slate-400">
          按下麥克風開始說英文，或直接在下方輸入文字進行翻譯。
        </p>

        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => (listening ? stop() : start())}
            disabled={!sttSupported}
            aria-pressed={listening}
            className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white shadow transition-colors disabled:cursor-not-allowed disabled:bg-slate-300 ${
              listening ? "mic-active bg-red-500" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            🎤
          </button>
          <p className="text-xs text-slate-400">
            {!sttSupported
              ? "此瀏覽器不支援語音辨識，請改用下方文字輸入（建議使用 Chrome）。"
              : listening
                ? "聆聽中，請說話…"
                : "點擊麥克風開始說話"}
          </p>
          {sttError && <p className="text-xs text-red-500">{sttError}</p>}
        </div>

        <textarea
          value={displayText}
          onChange={(e) => setText(e.target.value)}
          placeholder="輸入或說出英文句子 / 單字…"
          rows={3}
          className="mt-4 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-800 focus:border-sky-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => runTranslate(text)}
            className="flex-1 rounded-lg bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            翻譯
          </button>
          <button
            type="button"
            onClick={() => text && speak(text)}
            disabled={!ttsSupported || !text}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            🔊 朗讀英文
          </button>
        </div>

        <div className="mt-4 min-h-20 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60">
          {loading && <p className="text-sm text-slate-400">翻譯中…</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && !error && translation && (
            <div>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-100">{translation}</p>
              <p className="mt-1 text-xs text-slate-400">
                {source === "dictionary" ? "來源：內建單字庫" : "來源：線上翻譯 API"}
              </p>
            </div>
          )}
          {!loading && !error && !translation && (
            <p className="text-sm text-slate-400">翻譯結果會顯示在這裡。</p>
          )}
        </div>
      </div>
    </div>
  );
}
