# Project conventions

- UI components: use shadcn/ui (new-york style, Tailwind v4, `@/` path alias). It's already
  set up — see `components.json`, `src/lib/utils.ts`, `src/components/ui/`. Add new
  components there instead of hand-rolling styled primitives.
- `ui.shadcn.com` is blocked by this environment's network policy, so the `shadcn` CLI
  (`init`/`add`) cannot reach its registry. Add components by hand-writing the standard
  shadcn source into `src/components/ui/` (matching the existing `button.tsx`) rather than
  running the CLI.
