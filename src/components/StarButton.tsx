interface StarButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

export function StarButton({ active, onToggle, size = "md" }: StarButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={active}
      aria-label={active ? "移除重點標記" : "標記為重點"}
      className={`shrink-0 rounded-full transition-colors ${
        size === "sm" ? "p-1 text-lg" : "p-1.5 text-xl"
      } ${active ? "text-amber-400" : "text-slate-300 hover:text-amber-300 dark:text-slate-600"}`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
