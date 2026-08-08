import { useMemo, useRef } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import type { Service } from "@/data/services"

const W = 1.5
const H = 2
const D = 0.6

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amt))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt))
  return `rgb(${r}, ${g}, ${b})`
}

function labelTexture(service: Service) {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 682
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = service.color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // subtle top-to-bottom studio light falloff
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
  grad.addColorStop(0, "rgba(255,255,255,0.22)")
  grad.addColorStop(0.4, "rgba(255,255,255,0.02)")
  grad.addColorStop(1, "rgba(0,0,0,0.18)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = "rgba(255,255,255,0.55)"
  ctx.lineWidth = 2
  ctx.strokeRect(28, 28, 88, 34)
  ctx.fillStyle = "#f6f4ea"
  ctx.font = "600 20px ui-monospace, Menlo, monospace"
  ctx.textBaseline = "middle"
  ctx.fillText(`AISLE ${String(service.aisle).padStart(2, "0")}`, 40, 46)

  ctx.font = "600 16px ui-monospace, Menlo, monospace"
  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(246,244,234,0.85)"
  ctx.fillText("STUDIO MKT", canvas.width - 32, 46)
  ctx.textAlign = "left"

  ctx.fillStyle = "#f6f4ea"
  const words = service.name.split(" ")
  ctx.font = "700 46px ui-sans-serif, system-ui, sans-serif"
  let line = ""
  let y = canvas.height - 190
  const lines: string[] = []
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > canvas.width - 80 && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  lines.push(line)
  y = canvas.height - 150 - (lines.length - 1) * 52
  for (const l of lines) {
    ctx.fillText(l, 40, y)
    y += 52
  }

  ctx.font = "600 15px ui-monospace, Menlo, monospace"
  ctx.fillStyle = "rgba(246,244,234,0.8)"
  ctx.fillText(`NET ${service.netWeight}`, 40, canvas.height - 60)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function Packaging({ service }: { service: Service }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0.08, y: -0.32 })
  const front = useMemo(() => labelTexture(service), [service])

  const materials = useMemo(() => {
    const dark = shade(service.color, -60)
    const mid = shade(service.color, -30)
    const light = shade(service.color, 18)
    const finish = { roughness: 0.55, metalness: 0.06 }
    return [
      new THREE.MeshStandardMaterial({ color: mid, ...finish }), // +x right
      new THREE.MeshStandardMaterial({ color: dark, ...finish }), // -x left
      new THREE.MeshStandardMaterial({ color: light, ...finish }), // +y top
      new THREE.MeshStandardMaterial({ color: dark, ...finish }), // -y bottom
      new THREE.MeshStandardMaterial({ map: front, roughness: 0.42, metalness: 0.04 }), // +z front
      new THREE.MeshStandardMaterial({ color: shade(service.color, -45), ...finish }), // -z back
    ]
  }, [service, front])

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    const x = (e.uv?.x ?? 0.5) - 0.5
    const y = (e.uv?.y ?? 0.5) - 0.5
    target.current = { x: 0.08 - y * 0.5, y: -0.32 + x * 0.9 }
  }

  function handlePointerLeave() {
    target.current = { x: 0.08, y: -0.32 }
  }

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.position.y = Math.sin(t * 0.9) * 0.06
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      target.current.x,
      4,
      delta,
    )
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      target.current.y,
      4,
      delta,
    )
  })

  return (
    <group
      ref={group}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[W, H, D]} />
      </mesh>
    </group>
  )
}

export function ProductBox({ service }: { service: Service }) {
  return (
    <div style={{ width: 200, height: 260 }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.4], fov: 28 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[2.4, 3.2, 2.6]}
          intensity={1.35}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-2.6, 1.2, -1.8]} intensity={0.4} color="#7d93a8" />
        <directionalLight position={[0, -1.4, 2]} intensity={0.25} color="#f6f4ea" />
        <Packaging service={service} />
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.45}
          scale={4}
          blur={2.6}
          far={2}
        />
      </Canvas>
    </div>
  )
}
