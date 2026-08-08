import { useEffect, useRef } from "react"

/**
 * Offsets an element's --parallax-y custom property as it crosses the
 * viewport, so a CSS transform can move it at a different speed than
 * the page scroll. `speed` is px of drift per px the element is away
 * from viewport center; positive drifts the layer down as you scroll past it.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let ticking = false

    function update() {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elCenter = rect.top + rect.height / 2
      const offset = (elCenter - viewportCenter) * speed
      el.style.setProperty("--parallax-y", offset.toFixed(2))
      ticking = false
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [speed])

  return ref
}
