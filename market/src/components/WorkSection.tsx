import { Blueprint } from "@/components/Blueprint"
import { Reveal } from "@/components/Reveal"

const WORK = [
  { name: "Fernway Coffee", kind: "Brand + Packaging", tone: "#e0592c" },
  { name: "Linden & Palm", kind: "Website + Motion", tone: "#7d93a8" },
  { name: "Marsh & Co.", kind: "Identity System", tone: "#c99a3e" },
  { name: "Hollow Point Studio", kind: "Growth + Social", tone: "#8a6fa8" },
]

export function WorkSection() {
  return (
    <section id="work" className="relative overflow-hidden border-b border-[var(--dark-line)] bg-[var(--dark)] py-24 text-[var(--dark-fg)]">
      <Blueprint className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-[420px] text-[var(--dark-fg)]/10" />
      <Blueprint className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] text-[var(--dark-fg)]/[0.06]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="font-mono-tag text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Selected Work
          </div>
          <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            We stock brands with the shelf life
            <br />
            to find their own path.
          </h2>
          <p className="mt-5 max-w-lg text-sm text-[var(--dark-fg)]/60">
            We run projects across sectors, with clients who prefer clear
            pricing over long decks, and honest timelines over both.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[var(--dark-line)] bg-[var(--dark-line)] sm:grid-cols-2">
          {WORK.map((w, i) => (
            <Reveal key={w.name} delay={i * 80}>
              <div className="group relative flex h-56 flex-col justify-end overflow-hidden bg-[var(--dark-2)] p-6">
                <div
                  className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-45"
                  style={{
                    background: `radial-gradient(120% 100% at 20% 0%, ${w.tone}, transparent 60%)`,
                  }}
                />
                <Blueprint className="pointer-events-none absolute right-2 top-2 h-28 w-28 text-[var(--dark-fg)]/15" />
                <div className="relative">
                  <div className="font-mono-tag text-[10px] uppercase tracking-[0.14em] text-[var(--dark-fg)]/50">
                    {w.kind}
                  </div>
                  <div className="mt-1 text-xl font-semibold">{w.name}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
