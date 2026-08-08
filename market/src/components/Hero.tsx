import { services } from "@/data/services"
import { ProductBox } from "@/components/ProductBox"
import { Button } from "@/components/ui/button"

export function Hero() {
  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <section id="top" className="relative overflow-hidden border-b border-[var(--line-strong)]">
      <span className="edge-label font-mono-tag pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.3em] text-[var(--ink-muted)] lg:block">
        AUTHENTIC CREATIVE SERVICES · NO SUBSTITUTIONS
      </span>
      <span className="edge-label flip font-mono-tag pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.3em] text-[var(--ink-muted)] lg:block">
        STORE #04 · OPEN DAILY · EST. 2016
      </span>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <div className="font-mono-tag flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            <span>Receipt No. 000482</span>
            <span aria-hidden="true">·</span>
            <span>{dateStr}</span>
            <span aria-hidden="true">·</span>
            <span>Register 01</span>
          </div>

          <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            A creative agency,
            <br />
            <span className="text-[var(--accent)]">shelved.</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-[var(--ink-muted)]">
            Branding, websites, motion and growth — stocked by aisle, priced
            upfront on the box, and restocked every week. Walk in, fill your
            cart, check out.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Selected Work
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ProductBox service={services[0]} />
        </div>
      </div>
    </section>
  )
}
