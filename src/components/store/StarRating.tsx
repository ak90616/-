export function StarRating({
  rating,
  reviewCount,
  size = "text-xs",
}: {
  rating: number;
  reviewCount: number;
  size?: string;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-[var(--gold)] ${size}`} style={{ letterSpacing: "1px" }}>
        {"★".repeat(full)}
        {half ? "½" : ""}
        {"☆".repeat(Math.max(empty, 0))}
      </span>
      <span className="text-[0.55rem] text-[var(--ink-faint)]">({reviewCount})</span>
    </div>
  );
}
