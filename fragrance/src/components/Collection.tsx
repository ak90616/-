import { Reveal } from "@/components/Reveal"
import { useTilt } from "@/hooks/useTilt"

function DivinyCard() {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <article
      ref={ref}
      {...handlers}
      className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(184,39,44,0.5), transparent 60%), radial-gradient(circle at 80% 90%, rgba(200,121,63,0.35), transparent 55%), var(--ink)",
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}spin/frame_011.webp`}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-[68%] w-[62%] object-cover object-top opacity-90"
        style={{ maskImage: "linear-gradient(to bottom, black 55%, transparent 96%)" }}
      />
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">本季主角</span>
      <h3 className="font-display mt-2 text-2xl text-[var(--paper)]">Diviny — Noble Presence</h3>
      <p className="mt-3 max-w-[22rem] text-sm text-[var(--paper-muted)]">
        沉木與番紅花交織的東方琥珀香氣，靜默而濃烈。
      </p>
      <span className="mt-4 text-[11px] tracking-wide text-[var(--paper-muted)]">Eau de Parfum · 100ml</span>
    </article>
  )
}

function HermesCard() {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <article
      ref={ref}
      {...handlers}
      className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      style={{
        background:
          "radial-gradient(circle at 70% 12%, rgba(202,160,106,0.4), transparent 55%), linear-gradient(165deg, var(--sand) 0%, var(--sand-2) 100%)",
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" className="absolute right-7 top-7 h-12 w-12" aria-hidden="true">
        <path d="M6 34c8-4 14-4 20 0M22 34c8-4 14-4 20 0" stroke="#2a1c10" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <circle cx="24" cy="16" r="6" stroke="#2a1c10" strokeWidth="1.4" opacity="0.6" />
      </svg>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#2a1c10]/70">Hermès</span>
      <h3 className="font-display mt-2 text-2xl text-[#241a10]">Terre d'Hermès</h3>
      <p className="mt-3 max-w-[22rem] text-sm text-[#3a2a1a]">
        礦石感的木質基調，佐以葡萄柚與胡椒的清冽，收於岩蘭草與雪松的沉穩——大地色調的經典之作。
      </p>
      <span className="mt-4 text-[11px] tracking-wide text-[#3a2a1a]">Eau de Toilette · 100ml</span>
    </article>
  )
}

function OudWoodCard() {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <article
      ref={ref}
      {...handlers}
      className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      style={{
        background:
          "radial-gradient(circle at 75% 15%, rgba(217,138,61,0.4), transparent 55%), linear-gradient(155deg, var(--olive) 0%, var(--olive-2) 100%)",
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" className="absolute right-7 top-7 h-12 w-12" aria-hidden="true">
        <path d="M16 44c6-10 6-20 0-30M32 44c-6-10-6-20 0-30" stroke="var(--olive-glow)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="24" cy="10" r="4.5" stroke="var(--olive-glow)" strokeWidth="1.4" />
      </svg>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">Tom Ford</span>
      <h3 className="font-display mt-2 text-2xl text-[var(--paper)]">Oud Wood</h3>
      <p className="mt-3 max-w-[22rem] text-sm text-[var(--paper-muted)]">
        沉香木與玫瑰木交疊出的辛香調經典，收尾落於溫暖的琥珀與香草。
      </p>
      <span className="mt-4 text-[11px] tracking-wide text-[var(--paper-muted)]">Eau de Parfum · 30ml</span>
    </article>
  )
}

function PaigeCard() {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <article
      ref={ref}
      {...handlers}
      className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      style={{ background: "#0a0806" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120px 160px at 30% 25%, rgba(212,175,106,0.5), transparent 70%), radial-gradient(90px 120px at 75% 45%, rgba(212,175,106,0.3), transparent 70%), radial-gradient(140px 100px at 55% 75%, rgba(212,175,106,0.22), transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <svg viewBox="0 0 48 48" fill="none" className="absolute right-7 top-7 h-12 w-12" aria-hidden="true">
        <rect x="18" y="6" width="12" height="10" rx="2" stroke="var(--paige-gold)" strokeWidth="1.3" />
        <path d="M16 16h16l-2 26a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2Z" stroke="var(--paige-gold)" strokeWidth="1.3" />
      </svg>
      <span className="relative text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">Paige</span>
      <h3 className="font-display relative mt-2 text-2xl text-[var(--paper)]">Luminous</h3>
      <p className="relative mt-3 max-w-[22rem] text-sm text-[var(--paper-muted)]">
        黑金交織的柔焦光暈，凝膠般的通透感，讓肌膚的光澤如攝影棚燈光般細緻。
      </p>
      <span className="relative mt-4 text-[11px] tracking-wide text-[var(--paper-muted)]">Collagen Essence Gel</span>
    </article>
  )
}

export function Collection() {
  return (
    <section id="collection" className="relative px-6 py-24 lg:px-12 lg:py-28" style={{ background: "var(--ink)" }}>
      <Reveal className="mx-auto mb-12 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">系列選粹</p>
        <h2 className="font-display mt-4 text-3xl text-[var(--paper)] sm:text-4xl">四種暗色調的感官語言</h2>
        <p className="mt-4 max-w-lg text-sm text-[var(--paper-muted)] sm:text-base">
          從東方琥珀到礦石木質，從沉香辛調到柔焦光暈——這是本季選粹的四個切面。
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <DivinyCard />
        </Reveal>
        <Reveal delay={60}>
          <HermesCard />
        </Reveal>
        <Reveal delay={120}>
          <OudWoodCard />
        </Reveal>
        <Reveal delay={180}>
          <PaigeCard />
        </Reveal>
      </div>
    </section>
  )
}
