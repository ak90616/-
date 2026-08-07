export function formatCents(cents: number): string {
  return `NT$${(cents / 100).toLocaleString("zh-TW", { maximumFractionDigits: 0 })}`;
}
