import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { SpinViewer } from "@/components/SpinViewer"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[720px] items-center overflow-hidden py-28 lg:min-h-[100svh] lg:py-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(184,39,44,0.28), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(122,31,34,0.22), transparent 50%), var(--ink)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent)]">
            Diviny Switzerland · 瑞士調香
          </p>
          <h1 className="font-display mt-6 text-4xl leading-[1.1] text-[var(--paper)] sm:text-6xl">
            焦木餘燼裡，
            <br />
            藏著一團未熄的暗火
          </h1>
          <p className="mt-6 max-w-md text-base text-[var(--paper-muted)] sm:text-lg">
            Noble Presence 以沉木與番紅花交織出深邃的琥珀氣息，
            方形瓶身封存著一場靜默而濃烈的儀式。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => document.getElementById("origin")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索香氣故事
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            >
              立即體驗
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SpinViewer />
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[var(--paper-muted)] lg:block">
        往下捲動
      </div>
    </section>
  )
}
