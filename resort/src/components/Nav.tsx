import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 lg:px-12">
      <span className="font-display text-lg tracking-[0.2em] text-[var(--paper)]">
        AURELIA BAY
      </span>
      <Button
        size="sm"
        onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
      >
        訂房
      </Button>
    </header>
  )
}
