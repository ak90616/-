# 鉑金香氛 Platinum Parfum

一個以 Next.js 打造的示範電商網站(香水香精選物)。前台採深色奢華風格(暗色背景 +
香檳金點綴、自訂游標、Hero 光影動畫、購物車側欄、快速預覽視窗),後台維持獨立的白金
淺色管理介面,兩者共用同一套真實資料庫與購物 / 結帳流程。

## 技術棧

- [Next.js 16](https://nextjs.org/)(App Router + Turbopack)
- TypeScript
- Tailwind CSS 4,雙主題設計系統(`src/app/globals.css`):`:root` 為後台用的淺色白金主題,
  `.theme-aurum`(僅包住前台路由群組)覆寫為深色鉑金主題,兩者互不影響
- `next/font/google`:Cormorant Garamond + Montserrat(前台)、Playfair Display + Noto
  Serif TC(後台 / 中文標題共用)
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

**前台(顧客,深色鉑金主題)**
- 全螢幕 Hero:canvas 繪製的粒子 + 光束動畫(疊在 `public/images/img_sand.jpg` 沙丘紋理上)
- 自訂游標(僅桌面 `pointer: fine` 裝置啟用)、捲動進度條、滾動淡入動畫
- 頂部跑馬燈、精選商品橫幅、品牌故事區塊、顧客評價、聯絡表單(靜態展示)
- 商品區:依香調分類篩選(花香調 / 東方琥珀調 / 木質調 / 柑橘調 / 海洋清新調)+ 排序
- 商品卡片:hover 縮放光澤、標籤(新品/限量/暢銷/頂奢)、星等評分、快速預覽視窗
- 購物車側邊欄(非跳轉頁面),以 `localStorage` 保存,結帳流程建立訂單並扣庫存
- 加入購物車即時顯示 toast 提示,購物車圖示數量有彈跳動畫

**後台(管理員,`/admin`,淺色白金主題,獨立於前台視覺)**
- 登入 / 登出(cookie session,由 `SESSION_SECRET` 簽章)
- 儀表板:商品數、訂單數、待處理訂單、總營收
- 商品管理:新增 / 編輯 / 刪除商品,含標籤、評分、評論數、折扣原價等欄位
- 訂單管理:檢視訂單明細、更新訂單狀態

## 商品圖片

目前商品以 emoji 呈現(`imageEmoji` 欄位),尚未使用真實商品攝影。原因與後續計畫:
使用者提供的介面範本內嵌照片中,有 3 張其實是真實品牌(Tom Ford、Hermès)的商業攝影,
已從 `public/images/` 移除,不放上這個站台冒充自家商品照。等有正式、已取得授權的商品照
後,可直接替換 `ProductCard` / 商品詳情頁 / Quick View 中的 emoji 呈現方式。

## 環境變數

見 `.env.example`:

- `DATABASE_URL`:SQLite 檔案路徑,預設 `file:./dev.db`
- `SESSION_SECRET`:用來簽署後台登入 cookie 的密鑰,正式環境請改成隨機長字串
