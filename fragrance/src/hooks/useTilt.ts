import { useRef, type PointerEvent } from "react"

/** Lightweight hover tilt for cards — perspective rotate that follows the pointer. */
export function useTilt<T extends HTMLElement>(maxDeg = 10) {
  const ref = useRef<T>(null)
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  function onPointerMove(e: PointerEvent<T>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${relX * maxDeg}deg) rotateX(${-relY * (maxDeg * 0.8)}deg) translateY(-4px)`
  }

  function onPointerLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ""
  }

  return { ref, handlers: { onPointerMove, onPointerLeave } }
}
