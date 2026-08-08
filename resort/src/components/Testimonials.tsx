import { Quote } from "lucide-react"
import { testimonials } from "@/data/testimonials"
import { Reveal } from "@/components/Reveal"

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <Quote className="size-6 text-[var(--gold)]" strokeWidth={1.5} />
            <p className="font-display mt-4 text-lg leading-snug text-[var(--ink)]">
              “{t.quote}”
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[var(--ink-muted)]">
              {t.name} · {t.origin}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
