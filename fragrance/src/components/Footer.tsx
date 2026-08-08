import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function Footer() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[var(--ink)] px-6 py-28 text-center lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,39,44,0.16),_transparent_60%)]" />

      <Reveal className="relative mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">準備好，讓香氣說話</p>
        <h2 className="font-display mt-5 text-3xl text-[var(--paper)] sm:text-5xl">
          把 Noble Presence 留在身上一整夜
        </h2>
        <p className="mt-5 text-sm text-[var(--paper-muted)] sm:text-base">
          限量調香工藝，每一瓶都經過手工封裝與編號。
        </p>
        <div className="mt-10">
          <Button size="lg">了解更多</Button>
        </div>
      </Reveal>

      <footer className="relative mt-24 flex flex-col items-center gap-2 border-t border-[var(--line)] pt-8 text-xs text-[var(--paper-muted)]">
        <span className="font-display tracking-[0.2em] text-[var(--paper)]">DIVINY — NOBLE PRESENCE</span>
        <p>這是一個設計概念展示頁，用於互動網頁技術演示，非官方網站，不接受實際訂購</p>
        <p>品牌名稱與商標為原廠所有 &middot; Tom Ford Oud Wood 卡片為情境示意，非商品實拍</p>
      </footer>
    </section>
  )
}
