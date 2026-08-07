import { useCallback, useEffect, useRef, useState } from "react";

export function speak(text: string, lang = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

export function useSpeechSupport() {
  const [ttsSupported, setTtsSupported] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);

  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    const w = window as unknown as Record<string, unknown>;
    setSttSupported(
      typeof window !== "undefined" && Boolean(w.SpeechRecognition || w.webkitSpeechRecognition),
    );
  }, []);

  return { ttsSupported, sttSupported };
}

interface UseSpeechRecognitionOptions {
  lang?: string;
  onResult?: (transcript: string) => void;
}

export function useSpeechRecognition({ lang = "en-US", onResult }: UseSpeechRecognitionOptions = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const start = useCallback(() => {
    const w = window as unknown as Record<string, unknown>;
    const SpeechRecognitionCtor = (w.SpeechRecognition || w.webkitSpeechRecognition) as
      | (new () => any) // eslint-disable-line @typescript-eslint/no-explicit-any
      | undefined;

    if (!SpeechRecognitionCtor) {
      setError("此瀏覽器不支援語音辨識，建議使用 Chrome。");
      return;
    }

    setError(null);
    setTranscript("");

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      setTranscript(finalText);
      if (event.results[event.results.length - 1].isFinal) {
        onResult?.(finalText.trim());
      }
    };

    recognition.onerror = (event: { error: string }) => {
      setError(event.error === "not-allowed" ? "請允許麥克風權限。" : `辨識發生錯誤：${event.error}`);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [lang, onResult]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  return { listening, transcript, error, start, stop };
}
