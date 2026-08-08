import { Reveal } from "@/components/Reveal"

export function Bloom() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-center lg:px-12 lg:py-32">
      <img
        src={`${import.meta.env.BASE_URL}products/bloom.jpg`}
        alt="半透明的琥珀色花朵狀顯影，纖維狀花瓣層層綻放於黑色背景中，如同氣味被放大顯現的形狀"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">感官顯影</p>
          <h2 className="font-display mt-4 text-2xl text-[var(--paper)] sm:text-4xl">看見香氣的形狀</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--paper-muted)] sm:text-base">
            當一縷香氣被放大到極限，它看起來會是什麼模樣——
            纖維般的花瓣層層綻放，在暗處發出微光，如同氣味本身的可視化。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
