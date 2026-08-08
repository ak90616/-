function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

function digitsFromSeed(seed: string, count: number) {
  const rand = seededRandom(seed)
  return Array.from({ length: count }, () => Math.floor(rand() * 10)).join("")
}

export function Barcode({
  value,
  className,
  showDigits = true,
}: {
  value: string
  className?: string
  showDigits?: boolean
}) {
  const rand = seededRandom(value)
  const bars = Array.from({ length: 46 }, () => (rand() > 0.52 ? 2 : 1))
  const digits = digitsFromSeed(value, 12)
  const totalWidth = bars.reduce((a, b) => a + b, 0) + bars.length

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${totalWidth} 34`}
        preserveAspectRatio="none"
        className="h-8 w-full"
        aria-hidden="true"
      >
        {(() => {
          let x = 0
          return bars.map((w, i) => {
            const rect =
              i % 2 === 0 ? (
                <rect key={i} x={x} y={0} width={w} height={34} fill="currentColor" />
              ) : null
            x += w + 1
            return rect
          })
        })()}
      </svg>
      {showDigits && (
        <div className="font-mono-tag mt-0.5 text-[9px] tracking-[0.2em] opacity-70">
          {digits}
        </div>
      )}
    </div>
  )
}
