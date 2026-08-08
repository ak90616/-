import gallery1 from "@/assets/gallery-1.jpg"
import gallery2 from "@/assets/gallery-2.jpg"
import gallery3 from "@/assets/gallery-3.jpg"
import { Reveal } from "@/components/Reveal"

const IMAGES = [
  { src: gallery1, alt: "The twin infinity pools stepping down toward the beach at sunset" },
  { src: gallery2, alt: "Longtail boats resting on the bay as the sun sets over the islands" },
  { src: gallery3, alt: "The main pavilion and villas lit for evening among the palms" },
]

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-[var(--dusk)] py-24 text-[var(--dusk-fg)] lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-xl">
          <span className="gold-rule" aria-hidden="true" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--dusk-fg)]/60">
            Gallery
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            The same golden hour,
            <br />
            every evening.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 100}>
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/5] w-full rounded-sm object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
