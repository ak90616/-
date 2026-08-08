import { Button } from "@/components/ui/button"

import portraitMask from "@/assets/photos/portrait-mask.jpg"
import portraitCity from "@/assets/photos/portrait-city.jpg"
import stageCrowd from "@/assets/photos/stage-crowd.jpg"
import stageMic from "@/assets/photos/stage-mic.jpg"
import stageDuo from "@/assets/photos/stage-duo.jpg"

type Frame = {
  no: string
  src: string
  alt: string
  date: string
  note: string
  rotate: string
}

const frames: Frame[] = [
  {
    no: "01",
    src: portraitMask,
    alt: "戴口罩的人像特寫，紅棕色頭髮，夜間現場燈光",
    date: "'24.11",
    note: "AVAILABLE LIGHT",
    rotate: "-rotate-1",
  },
  {
    no: "02",
    src: portraitCity,
    alt: "夜晚城市燈火前的人像，手扶著頭微笑",
    date: "'23.09",
    note: "HANDHELD · 1/60",
    rotate: "rotate-1",
  },
  {
    no: "03",
    src: stageCrowd,
    alt: "舞台上逆光的捲髮側影，手臂高舉",
    date: "'22.02",
    note: "BACKLIT",
    rotate: "-rotate-1",
  },
  {
    no: "04",
    src: stageMic,
    alt: "表演者拿著麥克風，舉手向觀眾致意",
    date: "'22.02",
    note: "STAGE · LOW LIGHT",
    rotate: "rotate-1",
  },
  {
    no: "05",
    src: stageDuo,
    alt: "兩位表演者在舞台上，其中一人舉起麥克風",
    date: "'22.02",
    note: "NIGHT ROLL",
    rotate: "-rotate-1",
  },
]

const tickerText =
  "NIGHT ROLL — 35mm — AVAILABLE LIGHT ONLY — DEVELOPED BY HAND — NO FLASH — "

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="grain-overlay" />
      <div className="scanline-overlay" />
      <div className="vignette" />

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10">
        <a
          href="#top"
          className="font-mono-retro flex items-center gap-2 text-xs tracking-[0.25em] text-[var(--fg)]/80"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          N. ROLL
        </a>
        <nav className="font-mono-retro flex gap-5 text-[11px] tracking-[0.2em] text-[var(--fg)]/60">
          <a href="#roll" className="hover:text-[var(--accent)]">
            INDEX
          </a>
          <a href="#about" className="hover:text-[var(--accent)]">
            ABOUT
          </a>
          <a href="#contact" className="hover:text-[var(--accent)]">
            CONTACT
          </a>
        </nav>
      </header>

      <main id="top">
        {/* hero */}
        <section className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden">
          <img
            src={portraitMask}
            alt="戴口罩的人像特寫，作為作品集封面照片"
            className="frame-photo absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/10 to-transparent" />
          <div className="relative z-10 w-full px-5 pb-24 sm:px-10 sm:pb-28">
            <p className="font-mono-retro mb-3 text-[11px] tracking-[0.3em] text-[var(--accent-2)]">
              PORTFOLIO — ROLL NO. 07
            </p>
            <h1 className="font-display text-5xl italic leading-[0.95] sm:text-7xl md:text-8xl">
              YOUR NAME
            </h1>
            <p className="mt-5 max-w-md text-sm text-[var(--muted)] sm:text-base">
              夜色裡拍下的畫面，用底片的眼光看數位時代。
              現場光、手持、不打閃燈。
            </p>
          </div>
        </section>

        {/* marquee ticker */}
        <div className="filmstrip-rail relative z-10 overflow-hidden py-3">
          <div className="marquee-track font-mono-retro text-xs tracking-[0.3em] text-[var(--accent-2)]">
            <span className="px-4">{tickerText.repeat(4)}</span>
            <span className="px-4" aria-hidden="true">
              {tickerText.repeat(4)}
            </span>
          </div>
        </div>

        {/* the roll / gallery */}
        <section id="roll" className="px-5 py-20 sm:px-10 sm:py-28">
          <div className="mb-12 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl italic sm:text-4xl">
              The Roll
            </h2>
            <p className="font-mono-retro text-[11px] tracking-[0.2em] text-[var(--muted)]">
              05 FRAMES / 35MM
            </p>
          </div>

          <div className="filmstrip-rail rounded-sm">
            <div className="sprockets">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 p-5 sm:grid-cols-2 sm:gap-10 sm:p-10 lg:grid-cols-3">
              {frames.map((frame) => (
                <figure
                  key={frame.no}
                  className={`frame-card ${frame.rotate} rounded-[2px] bg-[var(--paper)] p-2.5 pb-8 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]`}
                >
                  <div className="relative overflow-hidden bg-black">
                    <img
                      src={frame.src}
                      alt={frame.alt}
                      loading="lazy"
                      className="frame-photo aspect-[3/2] w-full object-cover"
                    />
                    <span className="font-mono-retro absolute left-2 top-2 bg-black/60 px-1.5 py-0.5 text-[10px] tracking-widest text-[var(--paper)]">
                      N°{frame.no}
                    </span>
                  </div>
                  <figcaption className="font-mono-retro mt-2 flex items-center justify-between text-[10px] tracking-[0.15em] text-[var(--bg)]/70">
                    <span>{frame.note}</span>
                    <span>{frame.date}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="sprockets">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        </section>

        {/* about */}
        <section
          id="about"
          className="border-t border-[var(--line)] px-5 py-20 sm:px-10 sm:py-28"
        >
          <div className="grid gap-10 sm:grid-cols-[1fr_1fr]">
            <h2 className="font-display text-3xl italic sm:text-4xl">
              About the Roll
            </h2>
            <div className="space-y-5 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              <p>
                長期用底片邏輯拍數位相機——不打光、不補閃，只等現場的光線自己說話。
                拍人像，也拍舞台上的瞬間。這裡收錄的是幾捲比較喜歡的「夜間卷」。
              </p>
              <dl className="font-mono-retro grid grid-cols-2 gap-y-3 border-t border-[var(--line)] pt-5 text-[11px] tracking-[0.15em] text-[var(--fg)]/70 sm:text-xs">
                <dt className="text-[var(--muted)]">GEAR</dt>
                <dd>CANON EOS 6D / 650D</dd>
                <dt className="text-[var(--muted)]">STYLE</dt>
                <dd>AVAILABLE LIGHT, NO FLASH</dd>
                <dt className="text-[var(--muted)]">BASED IN</dt>
                <dd>YOUR CITY</dd>
                <dt className="text-[var(--muted)]">STATUS</dt>
                <dd>OPEN FOR BOOKINGS</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* contact */}
        <section
          id="contact"
          className="border-t border-[var(--line)] px-5 py-20 text-center sm:px-10 sm:py-28"
        >
          <p className="font-mono-retro mb-4 text-[11px] tracking-[0.3em] text-[var(--accent-2)]">
            SHOOT SOMETHING TOGETHER
          </p>
          <h2 className="font-display mx-auto max-w-2xl text-4xl italic leading-tight sm:text-6xl">
            Let's make a night roll.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:you@example.com">
              <Button size="lg">寄信給我</Button>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Button size="lg" variant="outline">
                Instagram
              </Button>
            </a>
          </div>
        </section>
      </main>

      <footer className="font-mono-retro flex flex-col items-center gap-2 border-t border-[var(--line)] px-5 py-8 text-center text-[10px] tracking-[0.2em] text-[var(--muted)] sm:flex-row sm:justify-between sm:px-10">
        <span>© {new Date().getFullYear()} YOUR NAME — ALL FRAMES SHOT ON LOCATION</span>
        <a href="#top" className="hover:text-[var(--accent)]">
          BACK TO TOP ↑
        </a>
      </footer>
    </div>
  )
}

export default App
