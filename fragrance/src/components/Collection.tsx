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

function AmberOilCard() {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <article
      ref={ref}
      {...handlers}
      className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(205,164,58,0.32), transparent 55%), linear-gradient(160deg, var(--sage) 0%, var(--sage-2) 100%)",
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" className="absolute right-7 top-7 h-13 w-13" aria-hidden="true">
        <path
          d="M24 6c8 8 12 14 12 20a12 12 0 1 1-24 0c0-6 4-12 12-20Z"
          stroke="var(--sage-gold)"
          strokeWidth="1.4"
        />
      </svg>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">同系列 · 保養精粹</span>
      <h3 className="font-display mt-2 text-2xl text-[var(--paper)]">琥珀萃取精油</h3>
      <p className="mt-3 max-w-[22rem] text-sm text-[var(--paper-muted)]">
        植物系的溫潤觸感，質地如琥珀般透亮，喚醒肌膚與香氣同步的儀式感。
      </p>
      <span className="mt-4 text-[11px] tracking-wide text-[var(--paper-muted)]">Facial Oil · 30ml</span>
    </article>
  )
}

export function Collection() {
  return (
    <section id="collection" className="relative px-6 py-24 lg:px-12 lg:py-28" style={{ background: "var(--ink)" }}>
      <Reveal className="mx-auto mb-12 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">系列選粹</p>
        <h2 className="font-display mt-4 text-3xl text-[var(--paper)] sm:text-4xl">三種暗色調的感官語言</h2>
        <p className="mt-4 max-w-lg text-sm text-[var(--paper-muted)] sm:text-base">
          從東方琥珀到沉木辛香，再到一抹植物系的溫潤——這是本季選粹的三個切面。
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
        <Reveal>
          <DivinyCard />
        </Reveal>
        <Reveal delay={80}>
          <OudWoodCard />
        </Reveal>
        <Reveal delay={160}>
          <AmberOilCard />
        </Reveal>
      </div>
    </section>
  )
}
