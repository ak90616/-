import { speak } from "../hooks/useSpeech";

interface SpeakButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function SpeakButton({ text, label = "朗讀", className = "" }: SpeakButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label={`${label}：${text}`}
      className={`shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-sky-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-sky-400 ${className}`}
    >
      🔊
    </button>
  );
}
