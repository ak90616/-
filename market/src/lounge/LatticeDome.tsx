import { useMemo } from "react"
import * as THREE from "three"
import { createLatticeTexture } from "./latticeTexture"

// (radius, height) profile of the woven "belly" wall, bottom rim to top
// rim, shared by the hanging canopy and the mirrored base skirt.
const BELLY_PROFILE: [number, number][] = [
  [1.3, 0.0],
  [1.55, 0.1],
  [1.68, 0.24],
  [1.62, 0.38],
  [1.3, 0.5],
  [0.92, 0.58],
]

function bellyLathe(mirror: boolean) {
  const points = BELLY_PROFILE.map(
    ([r, y]) => new THREE.Vector2(r, mirror ? -y : y),
  )
  return new THREE.LatheGeometry(points, 64)
}

function capGeometry() {
  const [capRadius, capY] = BELLY_PROFILE[BELLY_PROFILE.length - 1]
  const geo = new THREE.CircleGeometry(capRadius * 1.02, 64)
  geo.rotateX(-Math.PI / 2)
  geo.translate(0, capY, 0)
  return geo
}

/** One dome shell: warm glowing inner skin + black woven lattice overlay + flat cap. */
function Shell({ mirror }: { mirror: boolean }) {
  const belly = useMemo(() => bellyLathe(mirror), [mirror])
  const cap = useMemo(() => {
    const geo = capGeometry()
    if (mirror) geo.scale(1, -1, 1)
    return geo
  }, [mirror])
  const lattice = useMemo(() => {
    const tex = createLatticeTexture()
    tex.repeat.set(10, 2.4)
    return tex
  }, [])

  return (
    <group>
      <mesh geometry={belly}>
        <meshStandardMaterial
          color="#4a2410"
          emissive="#ff8a3c"
          emissiveIntensity={0.55}
          roughness={0.7}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={belly} renderOrder={1}>
        <meshBasicMaterial
          color="#050403"
          alphaMap={lattice}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={cap}>
        <meshStandardMaterial
          color="#1c1a16"
          roughness={0.75}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/**
 * A pair of oval woven-lattice shells — a hanging canopy and a mirrored
 * base skirt — approximating the lampshade-like bar structure. Stylised
 * from a reference photo; proportions are estimated, not measured.
 */
export function LatticeDomePair({
  canopyY = 1.05,
  skirtY = -0.9,
  ovalX = 1.7,
  ovalZ = 1.05,
}: {
  canopyY?: number
  skirtY?: number
  ovalX?: number
  ovalZ?: number
}) {
  return (
    <group scale={[ovalX, 1, ovalZ]}>
      <group position={[0, canopyY, 0]}>
        <Shell mirror={false} />
      </group>
      <group position={[0, skirtY, 0]}>
        <Shell mirror={true} />
      </group>
    </group>
  )
}
