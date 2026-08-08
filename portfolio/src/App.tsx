import { Button } from "@/components/ui/button"

import portraitMask from "@/assets/photos/portrait-mask.jpg"
import portraitCity from "@/assets/photos/portrait-city.jpg"
import stageCrowd from "@/assets/photos/stage-crowd.jpg"
import stageMic from "@/assets/photos/stage-mic.jpg"
import stageDuo from "@/assets/photos/stage-duo.jpg"

type Photo = {
  src: string
  alt: string
  tag: string
  span?: string
}

const photos: Photo[] = [
  {
    src: portraitMask,
    alt: "戴口罩的人像特寫，紅棕色頭髮，夜間現場燈光",
    tag: "Portrait",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: portraitCity,
    alt: "夜晚城市燈火前的人像，手扶著頭微笑",
    tag: "Portrait",
  },
  {
    src: stageCrowd,
    alt: "舞台上逆光的捲髮側影，手臂高舉",
    tag: "Live",
  },
  {
    src: stageMic,
    alt: "表演者拿著麥克風，舉手向觀眾致意",
    tag: "Live",
    span: "sm:col-span-2",
  },
  {
    src: stageDuo,
    alt: "兩位表演者在舞台上，其中一人舉起麥克風",
    tag: "Live",
  },
]

const email = "zhixiangzhang14@gmail.com"
const instagramHandle = "chang_chih_"

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <div className="glow-blob left-[-10%] top-[-10%] h-96 w-96 bg-[var(--accent)]" />
      <div className="glow-blob right-[-10%] top-[20%] h-96 w-96 bg-[var(--accent-2)]" />

      <header className="glass-nav fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            Kai<span className="text-[var(--accent)]">.</span>
          </a>
          <nav className="flex gap-6 text-sm text-[var(--muted)]">
            <a href="#work" className="transition-colors hover:text-[var(--fg)]">
              Work
            </a>
            <a href="#about" className="transition-colors hover:text-[var(--fg)]">
              About
            </a>
            <a href="#contact" className="transition-colors hover:text-[var(--fg)]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* hero */}
        <section className="mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-5 pt-24 sm:px-8">
          <p className="font-mono-tag mb-4 text-xs tracking-[0.2em] text-[var(--muted)]">
            PHOTOGRAPHY PORTFOLIO
          </p>
          <h1 className="text-6xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
            Hi, I'm <span className="text-gradient">Kai</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            拍夜晚的人像跟現場演出。喜歡不打光、讓氣氛自己說話的瞬間。
            目前在台灣接案，開放合作邀約。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work">
              <Button size="lg">看作品</Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline">
                聯絡我
              </Button>
            </a>
          </div>
        </section>

        {/* work / gallery */}
        <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected Work
            </h2>
            <p className="font-mono-tag hidden text-xs tracking-[0.15em] text-[var(--muted)] sm:block">
              05 PHOTOS
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:auto-rows-[220px]">
            {photos.map((photo) => (
              <figure
                key={photo.src}
                className={`card group relative aspect-[4/3] sm:aspect-auto ${photo.span ?? ""}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="card-photo h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="font-mono-tag absolute bottom-3 left-3 translate-y-2 text-xs tracking-[0.15em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.tag.toUpperCase()}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* about */}
        <section
          id="about"
          className="border-t border-[var(--line)] px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_1fr]">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              About
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-[var(--muted)]">
              <p>
                我是 Kai，拍人像跟現場演出。不打燈、不補閃，讓現場的光線跟氣氛留在照片裡。
                目前住在台灣，接人像、活動與樂團現場拍攝的案子。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="chip">Available Light</span>
                <span className="chip">Portrait</span>
                <span className="chip">Live / Concert</span>
                <span className="chip">Based in Taiwan</span>
                <span className="chip">Open for bookings</span>
              </div>
            </div>
          </div>
        </section>

        {/* contact */}
        <section
          id="contact"
          className="border-t border-[var(--line)] px-5 py-24 text-center sm:px-8 sm:py-32"
        >
          <p className="font-mono-tag mb-4 text-xs tracking-[0.2em] text-[var(--muted)]">
            LET'S WORK TOGETHER
          </p>
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Got a shoot in mind?
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${email}`}>
              <Button size="lg">寄信給我</Button>
            </a>
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button size="lg" variant="outline">
                Instagram
              </Button>
            </a>
          </div>
          <p className="font-mono-tag mt-8 text-xs tracking-[0.1em] text-[var(--muted)]">
            {email}
          </p>
        </section>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-2 border-t border-[var(--line)] px-5 py-8 text-center text-xs text-[var(--muted)] sm:flex-row sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} Kai — Taiwan</span>
        <a href="#top" className="transition-colors hover:text-[var(--fg)]">
          Back to top ↑
        </a>
      </footer>
    </div>
  )
}

export default App
