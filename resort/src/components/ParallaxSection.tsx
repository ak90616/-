import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useParallax } from "@/hooks/useParallax"
import { Reveal } from "@/components/Reveal"

export function ParallaxSection({
  id,
  image,
  alt,
  eyebrow,
  title,
  children,
  align = "left",
  speed = 0.12,
}: {
  id: string
  image: string
  alt: string
  eyebrow: string
  title: ReactNode
  children: ReactNode
  align?: "left" | "right"
  speed?: number
}) {
  const parallaxRef = useParallax<HTMLDivElement>(speed)

  return (
    <section id={id} className="relative flex h-[100svh] min-h-[560px] items-center overflow-hidden">
      <div ref={parallaxRef} className="parallax-layer absolute inset-x-0 -inset-y-40">
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div
        className={cn(
          "absolute inset-0",
          align === "left"
            ? "bg-gradient-to-r from-black/75 via-black/25 to-transparent"
            : "bg-gradient-to-l from-black/75 via-black/25 to-transparent",
        )}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className={cn("mx-auto max-w-6xl", align === "right" && "flex justify-end")}>
          <Reveal className="max-w-md">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-2)]">{eyebrow}</p>
            <h2 className="font-display mt-4 text-3xl leading-tight text-[var(--paper)] sm:text-5xl">
              {title}
            </h2>
            <div className="mt-5 text-sm leading-relaxed text-[var(--paper-muted)] sm:text-base">
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
