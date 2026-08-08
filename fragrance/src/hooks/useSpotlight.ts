import { useEffect } from "react"

/** Tracks the pointer and writes --spot-x/--spot-y on <html> for the global ambient glow. */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let ticking = false
    let x = 0
    let y = 0

    function apply() {
      document.documentElement.style.setProperty("--spot-x", `${x}px`)
      document.documentElement.style.setProperty("--spot-y", `${y}px`)
      ticking = false
    }

    function onMove(e: PointerEvent) {
      x = e.clientX
      y = e.clientY
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(apply)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])
}
