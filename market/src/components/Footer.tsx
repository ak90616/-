export function Footer() {
  return (
    <footer className="border-t border-[var(--line-strong)] bg-[var(--paper-2)] py-10">
      <div className="font-mono-tag mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-[11px] uppercase tracking-[0.12em] text-[var(--ink-muted)] sm:flex-row sm:justify-between sm:text-left">
        <span>Studio Market © {new Date().getFullYear()} — Store #04</span>
        <span>Open Mon–Fri · Aisles Restocked Weekly</span>
        <span>hello@studiomarket.example</span>
      </div>
    </footer>
  )
}
