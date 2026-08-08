import type { Service } from "@/data/services"

export function ServiceFacts({ service }: { service: Service }) {
  return (
    <div className="font-mono-tag border-2 border-[var(--ink)] p-3 text-[11px]">
      <div className="border-b-4 border-[var(--ink)] pb-1 text-sm font-bold uppercase tracking-tight">
        Service Facts
      </div>
      <div className="flex items-center justify-between border-b border-[var(--line-strong)] py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
        <span>Serving Size</span>
        <span className="font-semibold text-[var(--ink)]">
          {service.facts[0]?.value}
        </span>
      </div>
      {service.facts.slice(1).map((f) => (
        <div
          key={f.label}
          className="flex items-center justify-between border-b border-[var(--line)] py-1"
        >
          <span className="text-[var(--ink-muted)]">{f.label}</span>
          <span className="text-right font-semibold">{f.value}</span>
        </div>
      ))}
    </div>
  )
}
