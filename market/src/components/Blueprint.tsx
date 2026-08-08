export function Blueprint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <rect x="20" y="20" width="360" height="260" strokeDasharray="2 3" />
      <line x1="20" y1="150" x2="380" y2="150" />
      <line x1="200" y1="20" x2="200" y2="280" />
      <circle cx="200" cy="150" r="70" />
      <circle cx="200" cy="150" r="110" strokeDasharray="1 4" />
      <path d="M40 260 L160 90 L280 260" />
      <path d="M120 260 L240 60 L360 260" strokeDasharray="3 3" />
      <line x1="20" y1="45" x2="60" y2="45" />
      <line x1="40" y1="25" x2="40" y2="65" />
      <line x1="340" y1="255" x2="380" y2="255" />
      <line x1="360" y1="235" x2="360" y2="275" />
    </svg>
  )
}
