# 🇺🇸 TechEnglish 學園

給工程師與半導體從業人員的英文學習網頁應用，涵蓋**程式語言**、**半導體**、**日常職場英文**三大主題，並內建**語音朗讀／語音辨識翻譯**與**重點單字複習**功能。

## 功能

- **字彙庫**：三大分類（程式語言 / 半導體 / 日常會話）共近百組單字與情境例句，可切換「清單」或「翻卡片」瀏覽模式，並支援關鍵字搜尋與「只看重點」篩選。
- **語音朗讀**：點擊 🔊 圖示即可用瀏覽器內建的 Text-to-Speech 朗讀英文單字／例句。
- **語音翻譯**：按下麥克風以英文口說（或直接輸入文字），即時辨識並翻譯成中文；常用單字優先比對內建字典，其餘透過線上翻譯 API 查詢。
- **重點標記與複習**：點擊 ★ 將重要單字加入「重點複習」清單，並有獨立分類可以快速複習。
- **測驗模式**：依分類（或只考重點）隨機出四選一中文詞義測驗，附例句解說與成績統計。
- **學習進度**：每個分類的「已熟記」進度會自動儲存在瀏覽器（localStorage），下次造訪不會遺失。
- **AI 辯論**：輸入英文單字或句子後，Gemini 會分飾「提案者」與「質疑者」兩個角色互相挑戰、修正數輪，最後產出收斂後的最佳翻譯與例句，並可展開查看完整辯論過程。需自行貼上 Gemini API key（見下方說明）。

## 技術棧

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Web Speech API（`SpeechSynthesis` 朗讀 / `SpeechRecognition` 語音辨識）
- [MyMemory Translation API](https://mymemory.translated.net/)（免金鑰的線上翻譯備援）
- [Gemini API](https://ai.google.dev/)（`gemini-2.5-flash`，用於「AI 辯論」功能）

## Gemini API key（AI 辯論功能）

這個網站是純前端、部署在 GitHub Pages，沒有後端可以安全存放金鑰。因此「AI 辯論」功能採用**使用者自備 key** 的方式：

1. 到 [Google AI Studio](https://aistudio.google.com/apikey) 免費申請一組 Gemini API key。
2. 在「🤖 AI 辯論」分頁貼上你的 key 並按「儲存」。
3. key 只會存在你這台裝置瀏覽器的 `localStorage`，不會經過任何第三方伺服器，但每次辯論都會直接從你的瀏覽器呼叫 Google 的 Gemini API（因此也會直接消耗你這組 key 的額度）。
4. 若在他人裝置上使用或分享畫面，記得自行清除瀏覽器資料以免外洩 key。

## 開發

```bash
npm install
npm run dev      # 啟動開發伺服器
npm run build    # 編譯 + 打包正式版本
npm run lint     # 執行 oxlint 檢查
```

語音辨識與朗讀功能仰賴瀏覽器的 Web Speech API，建議使用 **Chrome** 開啟以獲得最佳體驗；不支援的瀏覽器仍可使用文字輸入方式進行翻譯。

## 部署（GitHub Pages）

`main` 分支每次有新的 push，`.github/workflows/deploy-pages.yml` 就會自動打包並發布到 GitHub Pages。第一次使用前，到該 repo 的 **Settings → Pages → Build and deployment → Source**，選擇 **GitHub Actions**（若尚未設定）。之後網站會在 `https://<你的帳號>.github.io/-/` 上線。

## 專案結構

```
src/
  data/            單字資料（依分類拆分）與型別定義
  hooks/           語音（TTS/STT）與 localStorage 相關 hooks
  utils/           翻譯 API 與 Gemini API 工具（含本地字典比對、AI 辯論邏輯）
  components/      單字卡片、翻卡機、語音翻譯面板、測驗、進度統計、Gemini AI 辯論等 UI 元件
  App.tsx          分頁與狀態整合
```
