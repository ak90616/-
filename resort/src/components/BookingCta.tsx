import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function BookingCta() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--ocean)] py-24 text-[var(--sand)] lg:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--sunset)]/25 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <span className="gold-rule" aria-hidden="true" />
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            Hold your spot on the headland
          </h2>
          <p className="mt-5 text-[var(--sand)]/80">
            Tell us your dates and we'll send back availability and a
            personal rate within one day.
          </p>

          {submitted ? (
            <p className="mt-10 text-lg text-[var(--gold)]">
              Thank you — our reservations team will be in touch shortly.
            </p>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="h-12 flex-1 rounded-sm border border-[var(--sand)]/30 bg-transparent px-4 text-sm text-[var(--sand)] placeholder:text-[var(--sand)]/50 outline-none focus-visible:border-[var(--gold)]"
              />
              <Button type="submit" size="lg" className="sm:w-auto">
                Check Availability
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
