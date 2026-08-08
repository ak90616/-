import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { LatticeDomePair } from "./LatticeDome"
import { BarCore } from "./BarCore"

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0806"]} />
      <fog attach="fog" args={["#0a0806", 6, 16]} />

      <ambientLight intensity={0.08} />
      <pointLight position={[0, 1.15, 0]} intensity={18} color="#ffab5c" distance={3.4} decay={2} />
      <pointLight position={[0, -0.95, 0]} intensity={12} color="#ffab5c" distance={2.8} decay={2} />
      <spotLight
        position={[1.2, 2.4, 1.6]}
        angle={0.5}
        penumbra={0.6}
        intensity={2.2}
        color="#f6e3c8"
      />

      <LatticeDomePair />
      <BarCore />

      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0f0c09" roughness={0.35} metalness={0.4} />
      </mesh>
      <ContactShadows
        position={[0, -1.84, 0]}
        opacity={0.6}
        scale={12}
        blur={2.2}
        far={3}
      />
    </>
  )
}

export function LoungeApp() {
  return (
    <div className="lounge-shell">
      <Canvas
        className="lounge-canvas"
        shadows
        dpr={[1, 2]}
        camera={{ position: [3.2, 0.1, 3.6], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={2.6}
          maxDistance={11}
          maxPolarAngle={Math.PI * 0.53}
          target={[0, 0.05, 0]}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>

      <div className="lounge-hud">
        <div className="lounge-top">
          <a className="lounge-back" href="./index.html">
            ← Studio Market
          </a>
          <div className="lounge-tag">
            3D Study · #01
            <br />
            Woven Lattice Bar
          </div>
        </div>
        <div className="lounge-title">
          <h1>Lattice Dome Bar</h1>
          <p>
            以 react-three-fiber 依照一張參考照片的比例與弧度重建的風格化 3D
            模型——橢圓編織網罩上下對稱,暖光從網格縫隙透出。拖曳可 360°
            旋轉,滾輪縮放。細節為估算重建,非逐像素還原。
          </p>
          <div className="lounge-hint">drag to orbit · scroll to zoom</div>
        </div>
      </div>
    </div>
  )
}
