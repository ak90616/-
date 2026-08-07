const ITEMS = [
  "免費國際運送",
  "Eau de Parfum",
  "正品保證",
  "Extrait de Parfum",
  "限量收藏版",
  "Parfum de Luxe",
  "7 天退換貨",
  "Niche Fragrance",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg3)]">
      <div className="aurum-marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-4 text-xs tracking-[0.35em] text-[var(--gold)]/40 uppercase"
          >
            {item}
            <span className="inline-block h-[3px] w-[3px] rounded-full bg-[var(--gold)]/25" />
          </span>
        ))}
      </div>
    </div>
  );
}
