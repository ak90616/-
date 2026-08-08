import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function Hero() {
  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={`${import.meta.env.BASE_URL}hero-pan.webm`} type="video/webm" />
        <source src={`${import.meta.env.BASE_URL}hero-pan.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[var(--ink)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">
            普吉灣 · 私人海灣度假村
          </p>
          <h1 className="font-display mt-6 text-4xl leading-[1.15] text-[var(--paper)] sm:text-6xl">
            在日出與日落之間，
            <br />
            找到屬於你的灣
          </h1>
          <p className="mt-6 text-base text-[var(--paper-muted)] sm:text-lg">
            無邊際泳池貼著海平面延伸，私人沙灘只留給入住的旅人。
            <br className="hidden sm:block" />
            這是一趟不用趕行程的假期。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            >
              立即訂房
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("pool")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索度假村
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[var(--paper-muted)]">
        往下捲動
      </div>
    </section>
  )
}
