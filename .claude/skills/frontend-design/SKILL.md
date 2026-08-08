---
name: frontend-design
description: Use when building, styling, or restyling UI in this repo — new components, pages, sections, or whole demo sites (the root TechEnglish app, portfolio/, market/, or a new sibling app). Covers the shared shadcn/ui + Tailwind v4 setup, the multi-app layout, and per-app theming.
---

# Frontend design conventions

## Repo layout

This repo hosts multiple independent Vite + React + TypeScript apps side by side, not one app with routes:

- root (`/`) — TechEnglish 學園, an English-learning app for engineers
- `portfolio/` — Kai's portfolio site (Supabase-backed uploads)
- `market/` — Studio Market demo site (agency services as supermarket products, react-three-fiber scene)

Each app has its own `package.json`, `vite.config.ts`, `components.json`, `src/lib/utils.ts`, and `src/components/ui/`. A new standalone site is a new top-level sibling directory with its own Vite scaffold (`npm create vite@latest <name> -- --template react-ts`) — not a route bolted onto an existing app.

## shadcn/ui setup (same in every app)

- new-york style, Tailwind v4, base color neutral, CSS variables on, `@/` path alias, icon library lucide-react.
- `ui.shadcn.com` is blocked by this environment's network policy, so `npx shadcn init/add` cannot reach the registry. Add components by hand-writing standard shadcn source into `src/components/ui/`, matching the existing `button.tsx` in that app (CVA `variants`, `cn()` from `@/lib/utils`, `data-slot` attribute, spread `...props`).
- Compose new UI from `src/components/ui/` primitives instead of hand-rolling one-off styled `<div>`s when a shadcn primitive already covers it (Button, Card, Input, Dialog, etc.) — write the ones that don't exist yet rather than working around their absence.

## Theming — check the app's own tokens before styling

- The default shadcn oklch palette lives in each app's `src/index.css` (`--background`, `--foreground`, `--primary`, … under `:root`/`.dark`, mapped in `@theme inline`). The root app uses this default palette as-is.
- Sibling apps override or extend it with their own design language: e.g. `market/src/index.css` defines a packaging/print-label theme (`--ink`, `--paper`, `--accent`, `--line-strong`, `--dark`, `--dark-fg`, `font-mono-tag`) that `market`'s `button.tsx` builds on instead of the default `--primary`/`--secondary` tokens.
- Before styling in a given app, read that app's `index.css` theme block first and use its tokens (e.g. `bg-[var(--ink)]`) — don't reintroduce the generic shadcn palette into an app that has defined its own, and don't hardcode raw hex/rgb colors.

## Visual style

- These are portfolio/demo sites meant to look distinctive, not boilerplate admin-panel UI. Follow the existing apps' lead: scroll-reveal animations (see `market/src/hooks/useReveal.ts`, an `IntersectionObserver` hook), marquees, hero sections with strong typographic identity, and (in `market`) a real react-three-fiber scene rather than CSS tricks for 3D.
- Reuse an app's existing motion/reveal/section-wrapper primitives when adding a new section to that app instead of inventing a parallel pattern.

## Workflow

- Run everything from inside the app's own directory (`cd market && npm run dev`, not from repo root) — each app is a separate Vite project with its own `node_modules`.
- After UI changes, run that app's `npm run lint` (oxlint) and check the page in a browser before considering the change done.

## Removing shadcn/ui

If the user says the trigger phrase "全部的shadcn/ui取消", remove the shadcn/ui setup per the instructions in the root `CLAUDE.md` — delete `components.json`, `src/components/ui/`, `src/lib/utils.ts`, the shadcn CSS theme block in `src/index.css`, the `@/` alias, and the shadcn-only dependencies. Do this without asking for confirmation and report what was removed.
