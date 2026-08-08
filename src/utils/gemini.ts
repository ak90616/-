const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export class GeminiError extends Error {}

async function callGemini(apiKey: string, prompt: string, model = GEMINI_MODEL): Promise<string> {
  const res = await fetch(`${GEMINI_ENDPOINT(model)}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    if (res.status === 400 || res.status === 403) {
      throw new GeminiError("Gemini API key 無效或沒有權限，請確認 key 是否正確。");
    }
    if (res.status === 429) {
      throw new GeminiError("Gemini 已達使用額度上限，請稍後再試。");
    }
    throw new GeminiError(`Gemini 服務錯誤（${res.status}）`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (!text) throw new GeminiError("Gemini 沒有回傳內容，可能是安全過濾擋下了回應。");
  return text.trim();
}

export interface DebateTurn {
  role: "proposer" | "critic" | "final";
  label: string;
  text: string;
}

export interface DebateResult {
  finalAnswer: string;
  turns: DebateTurn[];
}

/**
 * Runs a multi-round self-debate on a single Gemini model: a "proposer" persona
 * drafts/revises an answer while a "critic" persona challenges it, converging on
 * a final answer after `rounds` back-and-forths.
 */
export async function debateForBestAnswer(
  apiKey: string,
  question: string,
  rounds = 2,
  onTurn?: (turn: DebateTurn) => void,
): Promise<DebateResult> {
  const turns: DebateTurn[] = [];
  const emit = (turn: DebateTurn) => {
    turns.push(turn);
    onTurn?.(turn);
  };

  let proposal = await callGemini(
    apiKey,
    `你是一位英文教學專家（提案者）。請針對下面這個英文單字或句子，給出繁體中文翻譯、簡短說明，並附一個例句。\n` +
      `內容：「${question}」\n` +
      `請直接給出你的完整提案，不用加開場白。`,
  );
  emit({ role: "proposer", label: "提案者・初稿", text: proposal });

  for (let i = 0; i < rounds; i++) {
    const critique = await callGemini(
      apiKey,
      `你是一位嚴格的英文教學審查者（質疑者）。請檢查以下針對「${question}」的翻譯提案，找出翻譯不夠精準、例句不自然、或說明不清楚的地方，並具體指出如何改進。若提案已經很好，也請明確指出還能更好的細節。\n\n` +
        `提案內容：\n${proposal}`,
    );
    emit({ role: "critic", label: `質疑者・第 ${i + 1} 輪`, text: critique });

    proposal = await callGemini(
      apiKey,
      `你是提案者。根據以下質疑意見，修正你針對「${question}」的翻譯提案，產出更好的版本。\n\n` +
        `你先前的提案：\n${proposal}\n\n` +
        `質疑意見：\n${critique}\n\n` +
        `請直接給出修正後的完整提案，不用加開場白。`,
    );
    emit({ role: "proposer", label: `提案者・第 ${i + 1} 輪修正`, text: proposal });
  }

  const finalAnswer = await callGemini(
    apiKey,
    `以下是關於「${question}」經過幾輪修正的翻譯提案：\n\n${proposal}\n\n` +
      `請將它整理成最終定案，格式如下（純文字，不要加 markdown 符號）：\n` +
      `翻譯：...\n說明：...\n例句：...`,
  );
  emit({ role: "final", label: "最終答案", text: finalAnswer });

  return { finalAnswer, turns };
}
