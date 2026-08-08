import heroVideo from "@/assets/hero-pan.mp4"
import posterImg from "@/assets/about.jpg"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        poster={posterImg}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-32 text-white lg:px-8 lg:pb-28">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-[var(--gold)]">
          Andaman Coast · Thailand
        </p>
        <h1 className="font-display mt-5 max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Anda Cove
          <br />
          Resort &amp; Spa
        </h1>
        <p className="mt-6 max-w-md text-base text-white/85 sm:text-lg">
          A cliffside retreat where the villas end and the sea begins —
          private pools, reef-facing dining, and every sunset held for you.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reserve Your Stay
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore the Villas
          </Button>
        </div>
      </div>
    </section>
  )
}
