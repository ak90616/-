"use client";

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
}: {
  value: number;
  min?: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-[var(--line)]">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center text-lg text-[var(--gold)] transition-colors hover:bg-[var(--gold)]/10 disabled:opacity-30"
        aria-label="減少數量"
      >
        −
      </button>
      <span className="w-8 text-center text-sm tabular-nums text-[var(--ink)]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center text-lg text-[var(--gold)] transition-colors hover:bg-[var(--gold)]/10 disabled:opacity-30"
        aria-label="增加數量"
      >
        +
      </button>
    </div>
  );
}
