import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LINKS = [
  { label: "The Resort", href: "#about" },
  { label: "Villas", href: "#rooms" },
  { label: "Experience", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-[var(--sand)]/95 backdrop-blur border-b border-[var(--line)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className={cn("font-display text-lg tracking-[0.08em]", solid ? "text-[var(--ink)]" : "text-white")}>
          Anda Cove
        </a>

        <nav
          className={cn(
            "hidden items-center gap-9 text-xs uppercase tracking-[0.14em] md:flex",
            solid ? "text-[var(--ink-muted)]" : "text-white/85",
          )}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn("transition-colors", solid ? "hover:text-[var(--ink)]" : "hover:text-white")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            size="sm"
            variant={solid ? "default" : "outline"}
            onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reserve
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn("md:hidden", solid ? "text-[var(--ink)]" : "text-white")}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--line)] bg-[var(--sand)] px-5 py-4 text-sm uppercase tracking-[0.12em] text-[var(--ink)] md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="py-2" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            className="py-2 text-[var(--sunset)]"
            onClick={() => setOpen(false)}
          >
            Reserve
          </a>
        </nav>
      )}
    </header>
  )
}
