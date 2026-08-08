import { ShoppingCart } from "lucide-react"

const LINKS = [
  { label: "Aisles", href: "#services" },
  { label: "Selected Work", href: "#work" },
  { label: "Contact", href: "#cart" },
]

export function Nav({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-strong)] bg-[var(--paper)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--ink)] text-[var(--paper)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M4 4h1.5l1 12.5A2 2 0 0 0 8.5 18.5h8A2 2 0 0 0 18.5 17L20 8H6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="21" r="1.2" fill="currentColor" />
              <circle cx="17" cy="21" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className="font-mono-tag text-sm font-semibold tracking-[0.08em]">
            STUDIO MARKET
          </span>
        </a>

        <nav className="font-mono-tag hidden items-center gap-7 text-xs uppercase tracking-[0.12em] text-[var(--ink-muted)] md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[var(--ink)]">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#cart"
          className="font-mono-tag flex items-center gap-2 border border-[var(--line-strong)] px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors hover:border-[var(--ink)]"
        >
          <ShoppingCart className="size-3.5" />
          Cart
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-white">
            {cartCount}
          </span>
        </a>
      </div>
    </header>
  )
}
