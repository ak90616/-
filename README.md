# 🇺🇸 TechEnglish 學園

給工程師與半導體從業人員的英文學習網頁應用，涵蓋**程式語言**、**半導體**、**日常職場英文**三大主題，並內建**語音朗讀／語音辨識翻譯**與**重點單字複習**功能。

## 功能

- **字彙庫**：三大分類（程式語言 / 半導體 / 日常會話）共近百組單字與情境例句，可切換「清單」或「翻卡片」瀏覽模式，並支援關鍵字搜尋與「只看重點」篩選。
- **語音朗讀**：點擊 🔊 圖示即可用瀏覽器內建的 Text-to-Speech 朗讀英文單字／例句。
- **語音翻譯**：按下麥克風以英文口說（或直接輸入文字），即時辨識並翻譯成中文；常用單字優先比對內建字典，其餘透過線上翻譯 API 查詢。
- **重點標記與複習**：點擊 ★ 將重要單字加入「重點複習」清單，並有獨立分類可以快速複習。
- **測驗模式**：依分類（或只考重點）隨機出四選一中文詞義測驗，附例句解說與成績統計。
- **學習進度**：每個分類的「已熟記」進度會自動儲存在瀏覽器（localStorage），下次造訪不會遺失。

## 技術棧

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Web Speech API（`SpeechSynthesis` 朗讀 / `SpeechRecognition` 語音辨識）
- [MyMemory Translation API](https://mymemory.translated.net/)（免金鑰的線上翻譯備援）

## 開發

```bash
npm install
npm run dev      # 啟動開發伺服器
npm run build    # 編譯 + 打包正式版本
npm run lint     # 執行 oxlint 檢查
```

語音辨識與朗讀功能仰賴瀏覽器的 Web Speech API，建議使用 **Chrome** 開啟以獲得最佳體驗；不支援的瀏覽器仍可使用文字輸入方式進行翻譯。

## 專案結構

```
src/
  data/            單字資料（依分類拆分）與型別定義
  hooks/           語音（TTS/STT）與 localStorage 相關 hooks
  utils/           翻譯 API 工具（含本地字典比對）
  components/      單字卡片、翻卡機、語音翻譯面板、測驗、進度統計等 UI 元件
  App.tsx          分頁與狀態整合
```
