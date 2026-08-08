import { services } from "@/data/services"
import { ServiceCard } from "@/components/ServiceCard"
import { Reveal } from "@/components/Reveal"

export function ServicesSection({
  cart,
  onToggle,
}: {
  cart: Set<string>
  onToggle: (sku: string) => void
}) {
  return (
    <section id="services" className="border-b border-[var(--line-strong)] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono-tag text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              On The Shelf
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Aisle Index
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--ink-muted)]">
            Six services, six aisles. Every box lists what's inside, how long
            it takes, and what it costs — no quote required.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.sku} style={{ transitionDelay: `${i * 60}ms` }}>
              <ServiceCard
                service={s}
                inCart={cart.has(s.sku)}
                onAdd={() => onToggle(s.sku)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
