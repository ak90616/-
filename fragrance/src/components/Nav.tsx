import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 lg:px-12">
      <span className="font-display flex items-baseline gap-2 text-lg tracking-[0.2em] text-[var(--paper)]">
        DIVINY
        <span className="hidden text-[10px] font-sans tracking-[0.3em] text-[var(--paper-muted)] sm:inline">
          NOBLE PRESENCE
        </span>
      </span>
      <Button
        size="sm"
        onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
      >
        探索系列
      </Button>
    </header>
  )
}
