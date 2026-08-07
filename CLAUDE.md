# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (Turbopack) at http://localhost:3000
npm run build         # production build
npm run start          # run the production build (after `npm run build`)
npm run lint            # ESLint (flat config, eslint-config-next + react-hooks rules)
npx tsc --noEmit         # type-check without emitting

npm run db:migrate         # prisma migrate dev — apply schema.prisma changes to dev.db
npm run db:seed              # prisma/seed.ts — admin user + demo categories/products
npm run db:studio              # Prisma Studio GUI on the SQLite file
```

There is no test suite in this project.

After changing `prisma/schema.prisma`, run `npm run db:migrate` (creates a migration under
`prisma/migrations/` and regenerates the client into `src/generated/prisma`, which is gitignored
and must never be hand-edited).

## Architecture

Next.js 16 App Router project. Two route groups under `src/app` share the root layout but diverge
in chrome and auth:

- `src/app/(store)/` — public storefront (`/`, `/products/[slug]`, `/cart`, `/checkout`,
  `/order/[id]`). Its `layout.tsx` wraps everything in a `.theme-aurum` div and mounts
  `CartProvider`, `ToastProvider`, `QuickViewProvider`, `CustomCursor`, `ScrollProgress`,
  `ScrollReveal`, `StoreHeader`, `CartSidebar`, and `QuickViewModal` — all storefront-only. The
  route group segment is invisible in URLs.
- `src/app/admin/` — `/admin/login` is unprotected; everything else lives under
  `src/app/admin/(protected)/` whose `layout.tsx` renders the sidebar and reads the session
  server-side via `next/headers` `cookies()` just to display the admin's email.

**Auth**: `src/proxy.ts` (Next 16's replacement for `middleware.ts` — always runs on the Node.js
runtime, so plain `node:crypto` works) gate-checks the `admin_session` cookie for every
`/admin/*` request except `/admin/login`, redirecting to login with a `?next=` param otherwise.
The cookie is a `base64url(payload).base64url(hmac-sha256)` token minted/verified in
`src/lib/session.ts` using `SESSION_SECRET` — not a JWT library, just enough to sign a small
payload. Because the proxy only guards *pages*, every `/api/admin/*` route handler independently
calls `getAdminSession()` (`src/lib/auth.ts`) and returns 401 if there's no valid session — treat
that as required, not optional, when adding new admin API routes.

**Data layer**: Prisma 7 requires an explicit driver adapter even for SQLite — see
`src/lib/prisma.ts`, which wires up `@prisma/adapter-better-sqlite3` with `DATABASE_URL`
(`file:./dev.db`, relative to the project root, matching where `prisma migrate` puts it — not
`prisma/dev.db`). The client is memoized on `globalThis` to survive dev-mode hot reload.

**Checkout**: `POST /api/checkout` (`src/app/api/checkout/route.ts`) is the only place orders are
created. It re-reads product prices/stock from the DB inside a `prisma.$transaction` (never trusts
client-submitted prices), decrements stock, and creates the `Order` + `OrderItem` rows atomically.
Guest carts are pure client state — `src/components/cart/CartProvider.tsx` persists to
`localStorage` and is only ever synced to the server at checkout time; there's no server-side cart
model.

**Money**: stored and passed around as integer cents (`priceCents`, `totalCents`, `unitCents`) to
avoid float rounding; format for display with `formatCents()` in `src/lib/money.ts`. Never store or
compute prices as floats.

**Validation**: `src/lib/validation.ts` holds the Zod schema shared by the admin product
create/update routes; checkout and login validate inline in their own route files since those
schemas aren't reused elsewhere.

**Admin CRUD pattern**: list/detail pages are server components that query Prisma directly; forms
and destructive actions (`ProductForm`, `DeleteButton`, `OrderStatusSelect`, `LogoutButton`) are
small client components that `fetch()` the matching `/api/admin/...` route and call
`router.refresh()` on success. Follow this split rather than introducing a client-side data-fetching
library.

**Design system — two themes, one token set**: `src/app/globals.css` defines CSS custom properties
(`--gold`, `--ink`, `--bg`, `--surface`, `--line`, `--gold-gradient`, etc.) twice: once on `:root`
(light platinum — used by `/admin`, untouched) and again inside a `.theme-aurum` class (dark
champagne-gold — applied only by `(store)/layout.tsx`'s wrapper div). Components never hardcode
which theme they're in; they just use `var(--ink)` / `bg-[var(--surface)]` / utility classes
(`text-gold-gradient`, `bg-gold-gradient`, `.shimmer`, `.animate-fade-up`, `.animate-pop`,
`.animate-toast`, `.aurum-rv`/`.aurum-in` for scroll-reveal) and automatically render correctly
in whichever subtree they're mounted in. When adding storefront UI, reuse these tokens rather than
introducing new colors — and don't reuse admin's rounded-corner/light styling conventions in the
storefront, which is deliberately sharp-edged (no `rounded-*`) and dark.

Fonts: storefront headings use `font-display` → Cormorant Garamond (+ Noto Serif TC for CJK
fallback); storefront body text uses `font-body` → Montserrat. Admin's `font-display` resolves to
Playfair Display instead (still Noto Serif TC fallback) since `.font-display` is overridden inside
`.theme-aurum`. All four families load once via `next/font/google` in `src/app/layout.tsx`.

Storefront-only interactive chrome lives in `src/components/store/`: `CustomCursor` (only enabled
when `matchMedia('(pointer: fine)')` matches, to avoid breaking touch devices), `ScrollProgress`,
`ScrollReveal` (IntersectionObserver adding `.aurum-in` to `.aurum-rv` elements — new sections must
be given both classes and, if anchor-linked from the nav, `scroll-mt-20` so the fixed header doesn't
overlap them on jump), `HeroCanvas` (particle/light-ray animation drawn over
`public/images/img_sand.jpg`), `CartSidebar` (driven by `CartProvider`'s `isOpen`/`openCart`/
`closeCart`/`toggleCart`, not a route), and `QuickViewModal` (driven by `QuickViewProvider`, opened
with a full product object via `openQuickView()` — not just an id, since there's no global product
lookup). Toast feedback goes through `useToast()` from `src/components/ui/ToastProvider.tsx`.

**Product imagery**: products render as a single large emoji (`imageEmoji` field), not photos —
intentional, see the "商品圖片" section of `README.md` for why (some images in the AURUM interface
reference this project was ported from turned out to be real Tom Ford / Hermès product photography
and were deliberately excluded). `public/images/img_sand.jpg` (a generic sand-dune texture) is the
only bundled photo and is only used as the hero canvas background.

## Conventions

- User-facing copy is Traditional Chinese (zh-Hant); keep new UI text consistent with that.
- `prisma/seed.ts` categorizes perfumes by scent family (花香調/木質調/柑橘調/東方琥珀調/海洋清新調)
  — follow that pattern for new products rather than inventing unrelated categories.
- `prisma/seed.ts` is idempotent (`upsert` on unique fields) — safe to re-run against an existing
  database.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
