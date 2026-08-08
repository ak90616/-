import { useMemo } from "react"

const JAR_COLORS = ["#e0592c", "#e8a13c", "#3c6b45", "#c23c3c", "#d9b23c", "#8a3c6b"]

function Jars({ count = 7, radius = 0.55 }: { count?: number; radius?: number }) {
  const jars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return {
          x: Math.cos(a) * radius * (0.4 + Math.random() * 0.6),
          z: Math.sin(a) * radius * (0.4 + Math.random() * 0.6),
          color: JAR_COLORS[i % JAR_COLORS.length],
          h: 0.22 + Math.random() * 0.1,
          r: 0.05 + Math.random() * 0.02,
        }
      }),
    [count, radius],
  )

  return (
    <group>
      {jars.map((jar, i) => (
        <group key={i} position={[jar.x, 0.02, jar.z]}>
          <mesh position={[0, jar.h / 2, 0]}>
            <cylinderGeometry args={[jar.r, jar.r * 0.9, jar.h, 16]} />
            <meshPhysicalMaterial
              color={jar.color}
              emissive={jar.color}
              emissiveIntensity={1.1}
              transmission={0.4}
              roughness={0.15}
              thickness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 1, 8]} />
        <meshStandardMaterial color="#2a2118" roughness={0.9} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.22, 0.95 + (i % 2) * 0.15, Math.sin(a) * 0.22]}
            rotation={[0.3, a, 0.4]}
          >
            <coneGeometry args={[0.12, 0.55, 6]} />
            <meshStandardMaterial color="#1f3320" roughness={0.85} />
          </mesh>
        )
      })}
    </group>
  )
}

export function BarCore() {
  return (
    <group>
      {/* elevated round platform the bar sits on */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.72, 1.8, 0.4, 64]} />
        <meshStandardMaterial color="#141210" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* countertop rim */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.74, 1.72, 0.08, 64]} />
        <meshStandardMaterial color="#0d0c0a" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* back-of-bar low cabinet, offset toward -Z */}
      <mesh position={[0, 0.28, -0.55]}>
        <boxGeometry args={[1.9, 0.5, 0.5]} />
        <meshStandardMaterial color="#18140f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.55, -0.55]}>
        <boxGeometry args={[1.92, 0.02, 0.52]} />
        <meshStandardMaterial
          color="#3a2a12"
          emissive="#ffb35c"
          emissiveIntensity={1.4}
        />
      </mesh>

      <group position={[0.4, 0.1, 0.15]}>
        <Jars />
      </group>

      <Plant position={[-2.9, -0.35, 0.6]} />
      <Plant position={[2.85, -0.35, -0.3]} />
    </group>
  )
}
