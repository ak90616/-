# Project conventions

- UI components: use shadcn/ui (new-york style, Tailwind v4, `@/` path alias). It's already
  set up — see `components.json`, `src/lib/utils.ts`, `src/components/ui/`. Add new
  components there instead of hand-rolling styled primitives.
- `ui.shadcn.com` is blocked by this environment's network policy, so the `shadcn` CLI
  (`init`/`add`) cannot reach its registry. Add components by hand-writing the standard
  shadcn source into `src/components/ui/` (matching the existing `button.tsx`) rather than
  running the CLI.
- Trigger phrase: if the user says **"全部的shadcn/ui取消"**, remove the shadcn/ui setup
  from this project entirely — delete `components.json`, `src/components/ui/`,
  `src/lib/utils.ts`, the shadcn CSS theme block in `src/index.css`, the `@/` path alias,
  and the shadcn-related dependencies (`class-variance-authority`, `clsx`,
  `tailwind-merge`, `tw-animate-css`, `@radix-ui/react-slot`, and `lucide-react` if unused
  elsewhere). Don't ask for confirmation on the removal itself — just do it and report what
  was removed.
