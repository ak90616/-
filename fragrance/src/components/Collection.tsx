import { Reveal } from "@/components/Reveal"
import { useTilt } from "@/hooks/useTilt"

function ProductCard({
  image,
  alt,
  tag,
  title,
  desc,
  note,
  scrim = "dark",
  delay = 0,
}: {
  image: string
  alt: string
  tag: string
  title: string
  desc: string
  note: string
  scrim?: "dark" | "light"
  delay?: number
}) {
  const { ref, handlers } = useTilt<HTMLElement>()
  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        {...handlers}
        className="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[20px] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300"
      >
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              scrim === "dark"
                ? "linear-gradient(to top, rgba(6,4,3,0.92) 0%, rgba(6,4,3,0.55) 42%, rgba(6,4,3,0.05) 75%)"
                : "linear-gradient(to top, rgba(20,16,10,0.85) 0%, rgba(20,16,10,0.4) 45%, rgba(20,16,10,0.02) 78%)",
          }}
        />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--paper-muted)]">{tag}</span>
        <h3 className="font-display mt-2 text-2xl text-[var(--paper)]">{title}</h3>
        <p className="mt-3 max-w-[22rem] text-sm text-[var(--paper-muted)]">{desc}</p>
        <span className="mt-4 text-[11px] tracking-wide text-[var(--paper-muted)]">{note}</span>
      </article>
    </Reveal>
  )
}

export function Collection() {
  const base = import.meta.env.BASE_URL

  return (
    <section id="collection" className="relative px-6 py-24 lg:px-12 lg:py-28" style={{ background: "var(--ink)" }}>
      <Reveal className="mx-auto mb-12 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">系列選粹</p>
        <h2 className="font-display mt-4 text-3xl text-[var(--paper)] sm:text-4xl">五種暗色調的感官語言</h2>
        <p className="mt-4 max-w-lg text-sm text-[var(--paper-muted)] sm:text-base">
          從東方琥珀到礦石木質，從沉香辛調到柔焦光暈——這是本季選粹的五個切面。
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          image={`${base}products/diviny.jpg`}
          alt="DIVINY Noble Presence 香水瓶立於焦黑沉木與番紅花絲之間，深紅漸層背景"
          tag="本季主角"
          title="Diviny — Noble Presence"
          desc="沉木與番紅花交織的東方琥珀香氣，靜默而濃烈。"
          note="Eau de Parfum · 100ml"
          delay={0}
        />
        <ProductCard
          image={`${base}products/hermes.jpg`}
          alt="Terre d'Hermès 香水瓶立於荒漠岩石上，倒映於水面，暖橘色天空背景"
          tag="Hermès"
          title="Terre d'Hermès"
          desc="礦石感的木質基調，佐以葡萄柚與胡椒的清冽，收於岩蘭草與雪松的沉穩——大地色調的經典之作。"
          note="Eau de Toilette · 100ml"
          delay={60}
        />
        <ProductCard
          image={`${base}products/oudwood-card.jpg`}
          alt="Tom Ford Oud Wood 香水瓶懸於枯枝與苔蘚之間，橘色漸層天空背景"
          tag="Tom Ford"
          title="Oud Wood"
          desc="沉香木與玫瑰木交疊出的辛香調經典，收尾落於溫暖的琥珀與香草。"
          note="Eau de Parfum · 30ml"
          delay={120}
        />
        <ProductCard
          image={`${base}products/paige.jpg`}
          alt="Paige Luminous 膠原蛋白精華凝膠瓶，黑金色柔焦光暈背景"
          tag="Paige"
          title="Luminous"
          desc="黑金交織的柔焦光暈，凝膠般的通透感，讓肌膚的光澤如攝影棚燈光般細緻。"
          note="Collagen Essence Gel"
          scrim="light"
          delay={180}
        />
        <ProductCard
          image={`${base}products/amber-oil.jpg`}
          alt="琥珀色精華油瓶置於石上，一段枯枝與嫩葉相伴，墨綠色背景"
          tag="同系列 · 保養精粹"
          title="琥珀萃取精油"
          desc="植物系的溫潤觸感，質地如琥珀般透亮，喚醒肌膚與香氣同步的儀式感。"
          note="Facial Oil"
          scrim="light"
          delay={240}
        />
      </div>
    </section>
  )
}
