import { useEffect, useRef } from "react"
import { Reveal } from "@/components/Reveal"

/** Procedurally draws a radiating, translucent petal bloom — a generative stand-in for campaign art. */
function drawBloom(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, w, h)

  const cx = w / 2
  const cy = h / 2
  const petalCount = 64
  const maxLen = Math.min(w, h) * 0.46
  let seed = 42

  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return (seed % 1000) / 1000
  }

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2 + (rand() - 0.5) * 0.18
    const len = maxLen * (0.55 + rand() * 0.45)
    const curve = (rand() - 0.5) * 0.55
    const width = 0.05 + rand() * 0.05

    const tipX = cx + Math.cos(angle) * len
    const tipY = cy + Math.sin(angle) * len
    const perpX = Math.cos(angle + Math.PI / 2)
    const perpY = Math.sin(angle + Math.PI / 2)
    const midX = cx + Math.cos(angle) * len * 0.55 + perpX * len * curve
    const midY = cy + Math.sin(angle) * len * 0.55 + perpY * len * curve

    const grad = ctx.createLinearGradient(cx, cy, tipX, tipY)
    grad.addColorStop(0, "rgba(247, 197, 129, 0.85)")
    grad.addColorStop(0.45, "rgba(226, 150, 88, 0.4)")
    grad.addColorStop(1, "rgba(226, 150, 88, 0)")

    ctx.beginPath()
    ctx.moveTo(cx + perpX * len * width * 0.3, cy + perpY * len * width * 0.3)
    ctx.quadraticCurveTo(midX + perpX * len * width, midY + perpY * len * width, tipX, tipY)
    ctx.quadraticCurveTo(midX - perpX * len * width, midY - perpY * len * width, cx - perpX * len * width * 0.3, cy - perpY * len * width * 0.3)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // fine fiber hairline for the fibrous/feathered edge
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.quadraticCurveTo(midX, midY, tipX, tipY)
    ctx.strokeStyle = "rgba(255, 226, 183, 0.18)"
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxLen * 0.16)
  core.addColorStop(0, "rgba(255, 214, 153, 0.95)")
  core.addColorStop(1, "rgba(255, 214, 153, 0)")
  ctx.beginPath()
  ctx.fillStyle = core
  ctx.arc(cx, cy, maxLen * 0.16, 0, Math.PI * 2)
  ctx.fill()
}

export function Bloom() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const render = () => drawBloom(canvas)
    render()

    const ro = new ResizeObserver(render)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-center lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(90,50,10,0.18),_transparent_65%)]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <canvas
          ref={canvasRef}
          className="bloom-canvas h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]"
          aria-hidden="true"
        />
        <Reveal className="mt-6" delay={80}>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">感官顯影</p>
          <h2 className="font-display mt-4 text-2xl text-[var(--paper)] sm:text-4xl">看見香氣的形狀</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--paper-muted)] sm:text-base">
            當一縷香氣被放大到極限，它看起來會是什麼模樣——
            纖維般的花瓣層層綻放，在暗處發出微光，如同氣味本身的可視化。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
