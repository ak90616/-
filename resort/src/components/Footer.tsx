import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function Footer() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[var(--ink)] px-6 py-28 text-center lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,163,76,0.12),_transparent_60%)]" />

      <Reveal className="relative mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">準備好啟程了嗎</p>
        <h2 className="font-display mt-5 text-3xl text-[var(--paper)] sm:text-5xl">
          把海灣，留一晚給自己
        </h2>
        <p className="mt-5 text-sm text-[var(--paper-muted)] sm:text-base">
          即日起訂房即贈夕陽晚宴一場。名額依房型每日限定，售完為止。
        </p>
        <div className="mt-10">
          <Button size="lg">立即訂房</Button>
        </div>
      </Reveal>

      <footer className="relative mt-24 flex flex-col items-center gap-2 border-t border-[var(--line)] pt-8 text-xs text-[var(--paper-muted)]">
        <span className="font-display tracking-[0.2em] text-[var(--paper)]">AURELIA BAY</span>
        <p>這是一個設計概念展示頁，非真實度假村，不接受實際訂房</p>
        <p>&copy; {new Date().getFullYear()} Aurelia Bay Concept Demo</p>
      </footer>
    </section>
  )
}
