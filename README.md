# 鉑金香氛 Platinum Parfum

一個以 Next.js 打造的示範電商網站(香水香精選物),採白金 / 香檳金基調的品牌視覺,
包含前台購物流程與後台管理系統。

## 技術棧

- [Next.js 16](https://nextjs.org/)(App Router + Turbopack)
- TypeScript
- Tailwind CSS 4,搭配自訂白金/香檳金設計系統(`src/app/globals.css`)
- `next/font/google`:Playfair Display(英文襯線)+ Noto Serif TC(中文襯線標題)
- [Prisma 7](https://www.prisma.io/) + SQLite(`@prisma/adapter-better-sqlite3` driver adapter)
- Zod(輸入驗證)
- bcryptjs(密碼雜湊)

## 快速開始

```bash
npm install
cp .env.example .env      # 設定 DATABASE_URL 與 SESSION_SECRET
npm run db:migrate        # 建立資料表 (prisma migrate dev)
npm run db:seed           # 匯入分類、商品與管理員帳號
npm run dev                # http://localhost:3000
```

預設管理員帳號(由 `prisma/seed.ts` 建立):

```
Email: admin@example.com
密碼: admin123
```

## 常用指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 產生正式環境建置 |
| `npm run start` | 啟動正式環境伺服器(需先 `build`) |
| `npm run lint` | 執行 ESLint |
| `npm run db:migrate` | 執行 `prisma migrate dev`,依 `prisma/schema.prisma` 建立/更新資料表 |
| `npm run db:seed` | 執行 `prisma/seed.ts`,匯入示範資料與管理員帳號 |
| `npm run db:studio` | 開啟 Prisma Studio 瀏覽資料庫 |

## 功能

**前台(顧客)**
- 首頁 Hero 橫幅 + 香調分類篩選(花香調 / 東方琥珀調 / 木質調 / 柑橘調 / 海洋清新調)
- 商品卡片 hover 互動:圖像縮放光澤、快速加入購物車按鈕
- 商品詳情頁,含數量增減器(`/products/[slug]`)
- 加入購物車即時顯示 toast 提示,購物車圖示數量會有彈跳動畫
- 購物車,以 `localStorage` 保存(`/cart`)
- 結帳流程,建立訂單並扣庫存(`/checkout`)
- 訂單完成確認頁(`/order/[id]`)

**後台(管理員,`/admin`)**
- 登入 / 登出(cookie session,由 `SESSION_SECRET` 簽章)
- 儀表板:商品數、訂單數、待處理訂單、總營收
- 商品管理:新增 / 編輯 / 刪除商品
- 訂單管理:檢視訂單明細、更新訂單狀態

## 環境變數

見 `.env.example`:

- `DATABASE_URL`:SQLite 檔案路徑,預設 `file:./dev.db`
- `SESSION_SECRET`:用來簽署後台登入 cookie 的密鑰,正式環境請改成隨機長字串
