import { useState } from "react"
import type { Service } from "@/data/services"

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amt))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt))
  return `rgb(${r}, ${g}, ${b})`
}

const W = 176
const H = 236
const D = 52
const IDLE = { x: 4, y: -18 }

export function ProductBox({ service }: { service: Service }) {
  const [tilt, setTilt] = useState(IDLE)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: 4 - py * 24, y: -18 + px * 46 })
  }

  return (
    <div
      className="box-stage box-float mx-auto"
      style={{ width: W, height: H }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt(IDLE)}
    >
      <div
        className="box-3d relative"
        style={{
          width: W,
          height: H,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* front label */}
        <div
          className="box-face flex flex-col justify-between p-4"
          style={{
            width: W,
            height: H,
            transform: `translateZ(${D / 2}px)`,
            background: service.color,
            color: "#f6f4ea",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="font-mono-tag rounded border border-white/40 px-1.5 py-0.5 text-[9px] tracking-[0.14em]">
              AISLE {String(service.aisle).padStart(2, "0")}
            </span>
            <span className="font-mono-tag text-[9px] tracking-[0.14em] opacity-80">
              STUDIO MKT
            </span>
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">{service.name}</div>
            <div className="font-mono-tag mt-2 text-[9px] tracking-[0.14em] opacity-80">
              NET {service.netWeight}
            </div>
          </div>
        </div>
        {/* back */}
        <div
          className="box-face"
          style={{
            width: W,
            height: H,
            transform: `rotateY(180deg) translateZ(${D / 2}px)`,
            background: shade(service.color, -18),
          }}
        />
        {/* right */}
        <div
          className="box-face"
          style={{
            width: D,
            height: H,
            top: 0,
            left: (W - D) / 2,
            transform: `rotateY(90deg) translateZ(${W / 2}px)`,
            background: shade(service.color, -28),
          }}
        />
        {/* left */}
        <div
          className="box-face"
          style={{
            width: D,
            height: H,
            top: 0,
            left: (W - D) / 2,
            transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
            background: shade(service.color, -34),
          }}
        />
        {/* top */}
        <div
          className="box-face"
          style={{
            width: W,
            height: D,
            top: (H - D) / 2,
            left: 0,
            transform: `rotateX(90deg) translateZ(${H / 2}px)`,
            background: shade(service.color, 26),
          }}
        />
        {/* bottom */}
        <div
          className="box-face"
          style={{
            width: W,
            height: D,
            top: (H - D) / 2,
            left: 0,
            transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
            background: shade(service.color, -46),
          }}
        />
      </div>
    </div>
  )
}
