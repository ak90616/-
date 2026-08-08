import { useEffect } from "react"

export type LightboxItem = {
  type: "photo" | "video"
  src: string
  webmSrc?: string
  alt: string
  tag: string
}

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const item = items[index]

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length)
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [index, items.length, onClose, onNavigate])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="關閉"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        ✕
      </button>

      <button
        aria-label="上一張"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index - 1 + items.length) % items.length)
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:left-6"
      >
        ‹
      </button>
      <button
        aria-label="下一張"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index + 1) % items.length)
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-6"
      >
        ›
      </button>

      <div
        className="mx-auto flex max-h-[85svh] max-w-5xl flex-col items-center gap-4 px-14"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "photo" ? (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className="max-h-[75svh] w-auto rounded-xl object-contain"
          />
        ) : (
          <video
            key={item.src}
            controls
            autoPlay
            playsInline
            className="max-h-[75svh] w-auto rounded-xl object-contain"
          >
            <source src={item.src} type="video/mp4" />
            {item.webmSrc && <source src={item.webmSrc} type="video/webm" />}
          </video>
        )}
        <p className="font-mono-tag text-center text-xs tracking-[0.15em] text-[var(--muted)]">
          {item.tag.toUpperCase()} — {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}

export default Lightbox
