import { useEffect, useRef, useState, type PointerEvent } from "react"

/**
 * Drives an interactive "360" product viewer from a short real frame sequence.
 * Pointer X scrubs through the frames (like rotating the bottle) while a
 * CSS 3D tilt is layered on top from both axes, so the motion reads as a
 * single continuous rotation rather than a flat slideshow.
 */
export function useSpinViewer(frameCount: number, restFrame = 5) {
  const ref = useRef<HTMLDivElement>(null)
  const [frameIndex, setFrameIndex] = useState(restFrame)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [spot, setSpot] = useState({ x: 50, y: 35 })
  const [active, setActive] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  function updateFromPoint(clientX: number, clientY: number) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const relY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))

    const nextFrame = Math.min(frameCount - 1, Math.floor(relX * frameCount))
    setFrameIndex(nextFrame)
    setSpot({ x: relX * 100, y: relY * 100 })

    if (!reducedMotion.current) {
      setTilt({
        ry: (relX - 0.5) * 22,
        rx: -(relY - 0.5) * 12,
      })
    }
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    updateFromPoint(e.clientX, e.clientY)
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    setActive(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // pointer capture is best-effort; ignore if unsupported
    }
    updateFromPoint(e.clientX, e.clientY)
  }

  function onPointerEnter() {
    setActive(true)
  }

  function onPointerLeave() {
    setActive(false)
    setFrameIndex(restFrame)
    setTilt({ rx: 0, ry: 0 })
  }

  return {
    ref,
    frameIndex,
    tilt,
    spot,
    active,
    handlers: { onPointerMove, onPointerDown, onPointerEnter, onPointerLeave },
  }
}
