const ITEMS = [
  "FRESH IDEAS DAILY",
  "NO RETURNS ON CREATIVITY",
  "EVERYTHING BARCODED",
  "SELECTED SERVICES, AISLE 01–06",
  "PRICES INCLUDE TAX ON TASTE",
]

export function Marquee() {
  const content = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="font-mono-tag flex items-center gap-6 px-6 text-xs uppercase tracking-[0.16em]"
        >
          {item}
          <span aria-hidden="true" className="text-[var(--accent)]">
            ✱
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden border-b border-[var(--line-strong)] bg-[var(--ink)] py-3 text-[var(--paper)]">
      <div className="marquee-track">
        {content}
        {content}
      </div>
    </div>
  )
}
