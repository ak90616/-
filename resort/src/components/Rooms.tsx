import { ArrowRight } from "lucide-react"
import { rooms } from "@/data/rooms"
import { Reveal } from "@/components/Reveal"

export function Rooms() {
  return (
    <section id="rooms" className="scroll-mt-20 bg-[var(--sand-2)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-xl">
          <span className="gold-rule" aria-hidden="true" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Stay
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Villas &amp; Suites
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[var(--line-strong)] bg-[var(--line-strong)] md:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.name} delay={i * 100} className="flex flex-col bg-[var(--sand-2)] p-8">
              <span className="font-display text-sm text-[var(--gold)]">
                0{i + 1}
              </span>
              <h3 className="font-display mt-3 text-2xl text-[var(--ink)]">{room.name}</h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{room.tagline}</p>

              <dl className="mt-6 flex gap-6 text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                <div>
                  <dt className="opacity-70">Size</dt>
                  <dd className="mt-1 text-[var(--ink)]">{room.size}</dd>
                </div>
                <div>
                  <dt className="opacity-70">Occupancy</dt>
                  <dd className="mt-1 text-[var(--ink)]">{room.occupancy}</dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-2 text-sm text-[var(--ink-muted)]">
                {room.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-end justify-between border-t border-[var(--line)] pt-6">
                <div>
                  <span className="text-2xl font-semibold text-[var(--ink)]">
                    ${room.priceFrom}
                  </span>
                  <span className="text-xs text-[var(--ink-muted)]"> / night</span>
                </div>
                <a
                  href="#book"
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-[var(--sunset)] transition-colors hover:text-[var(--ocean)]"
                >
                  Book <ArrowRight className="size-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
