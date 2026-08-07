import Link from "next/link";
import { HeroCanvas } from "@/components/store/HeroCanvas";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <HeroCanvas />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="aurum-rv">
          <span className="text-[0.6rem] tracking-[0.5em] text-[var(--gold)] uppercase">
            奢華香氛 · 精萃調香 · Est. 2024
          </span>
        </div>
        <h1
          className="aurum-rv font-display leading-[0.9] font-light text-[#ede8dc]"
          style={{ fontSize: "clamp(3.2rem, 11vw, 8.5rem)", letterSpacing: "0.14em" }}
        >
          鉑金香氛
        </h1>
        <div className="aurum-rv my-1 flex items-center gap-4">
          <span className="block h-px w-14 bg-gradient-to-r from-transparent to-[var(--gold)]/50" />
          <span className="font-display text-sm tracking-[0.4em] text-[var(--gold)] italic">
            Platinum Parfum
          </span>
          <span className="block h-px w-14 bg-gradient-to-l from-transparent to-[var(--gold)]/50" />
        </div>
        <p className="aurum-rv font-display mt-1 max-w-md text-lg font-light text-[var(--ink-soft)] italic">
          每一滴,都是一段無聲的敘事。
          <br />
          細膩萃取,融入時間的溫度與大地的靈魂。
        </p>
        <div className="aurum-rv mt-4 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 bg-gold-gradient px-8 py-3.5 text-[0.55rem] tracking-[0.38em] text-black uppercase shadow-lg shadow-[#c9a35a]/30 transition-transform hover:scale-105"
          >
            立即選購
          </Link>
          <Link
            href="/#featured"
            className="inline-flex items-center border border-[var(--gold)]/40 px-8 py-3 text-[0.55rem] tracking-[0.38em] text-[var(--gold)] uppercase transition-colors hover:bg-[var(--gold)]/10"
          >
            精選商品
          </Link>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="animate-arrow-bounce block h-10 w-px bg-gradient-to-b from-[var(--gold)]/60 to-transparent" />
        <span className="text-[0.5rem] tracking-[0.3em] text-[var(--gold)]/40 uppercase">探索</span>
      </div>
    </section>
  );
}
