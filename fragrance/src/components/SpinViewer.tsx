import { useEffect, useState } from "react"
import { useSpinViewer } from "@/hooks/useSpinViewer"

const FRAME_COUNT = 28

function frameSrc(index: number) {
  return `${import.meta.env.BASE_URL}spin/frame_${String(index + 1).padStart(3, "0")}.webp`
}

export function SpinViewer() {
  const { ref, frameIndex, tilt, spot, active, handlers } = useSpinViewer(FRAME_COUNT)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Preload the whole sequence so scrubbing never shows a blank frame.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="group relative mx-auto aspect-[9/16] w-full max-w-[340px] touch-pan-y select-none sm:max-w-[380px]"
      onPointerMove={(e) => {
        setHasInteracted(true)
        handlers.onPointerMove(e)
      }}
      onPointerDown={handlers.onPointerDown}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
    >
      <div
        className="absolute inset-x-6 bottom-[-6%] h-10 rounded-full bg-black/60 blur-2xl"
        style={{
          transform: `translateX(${tilt.ry * 0.8}px) scale(${active ? 1.15 : 1})`,
          transition: active ? "transform 90ms linear" : "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <div
        className="relative h-full w-full overflow-hidden rounded-[28px] shadow-[0_30px_60px_var(--shadow-deep)]"
        style={{
          transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${active ? 1.03 : 1})`,
          transition: active ? "transform 90ms linear" : "transform 550ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        <img
          src={frameSrc(frameIndex)}
          alt="DIVINY Noble Presence 瓶身特寫，隨滑鼠位置轉動視角"
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.22), transparent 60%)`,
            mixBlendMode: "soft-light",
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-4 flex justify-center transition-opacity duration-500 ${hasInteracted ? "opacity-0" : "opacity-100"}`}
      >
        <span className="rounded-full bg-black/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[var(--paper)] backdrop-blur">
          移動滑鼠旋轉瓶身
        </span>
      </div>
    </div>
  )
}
