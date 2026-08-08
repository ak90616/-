import aboutImg from "@/assets/about.jpg"
import { Reveal } from "@/components/Reveal"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img
            src={aboutImg}
            alt="Aerial view of Anda Cove's twin infinity pools and beachfront villas at sunset"
            className="w-full rounded-sm object-cover shadow-[0_30px_60px_-25px_rgba(33,27,20,0.45)]"
          />
        </Reveal>

        <Reveal delay={120}>
          <span className="gold-rule" aria-hidden="true" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--ink-muted)]">
            Our Story
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Built into the headland,
            <br />
            not on top of it.
          </h2>
          <p className="mt-6 text-[var(--ink-muted)]">
            Anda Cove sits where a quiet bay meets the tree line — thirty-two
            villas and suites terraced down a forested cliff toward two
            tiered infinity pools and a private stretch of sand. Every roofline
            follows the old sala form; every room keeps the water in view.
          </p>
          <p className="mt-4 text-[var(--ink-muted)]">
            We built it slowly, over three years, working with the same
            longtail-boat families who still bring in the day's catch for
            dinner service. Nothing here is borrowed from a brochure.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
