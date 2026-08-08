import { amenities } from "@/data/amenities"
import { Reveal } from "@/components/Reveal"

export function Amenities() {
  return (
    <section id="amenities" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
      <Reveal className="max-w-xl">
        <span className="gold-rule" aria-hidden="true" />
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
          Experience
        </p>
        <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
          Days that move at
          <br />
          the tide's pace.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map(({ icon: Icon, title, description }, i) => (
          <Reveal key={title} delay={i * 80}>
            <Icon className="size-6 text-[var(--sunset)]" strokeWidth={1.5} />
            <h3 className="font-display mt-4 text-xl text-[var(--ink)]">{title}</h3>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
