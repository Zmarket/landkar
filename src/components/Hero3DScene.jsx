import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function makeDollarTexture(size = 512) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = '#0A0E1A'
  ctx.font = `900 ${Math.round(size * 0.78)}px Inter, "Helvetica Neue", Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('$', size / 2, size / 2 + size * 0.04)
  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function generateStarPositions(count = 900) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 3.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
}

function DollarCoin() {
  const ref = useRef()
  const [dollarTex] = useState(() => makeDollarTexture(512))

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.55
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.12
  })

  const coinRadius = 1.55
  const coinThickness = 0.22
  const faceOffset = coinThickness / 2 + 0.002

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={ref}>
        {/* Coin body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[coinRadius, coinRadius, coinThickness, 96]} />
          <meshStandardMaterial
            color="#00F5A0"
            emissive="#00F5A0"
            emissiveIntensity={0.28}
            roughness={0.28}
            metalness={0.9}
          />
        </mesh>
        {/* Inner rim accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[coinRadius * 0.88, 0.025, 16, 96]} />
          <meshStandardMaterial color="#0A0E1A" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Front $ */}
        <mesh position={[0, 0, faceOffset]}>
          <planeGeometry args={[coinRadius * 1.85, coinRadius * 1.85]} />
          <meshBasicMaterial map={dollarTex} transparent alphaTest={0.05} toneMapped={false} />
        </mesh>
        {/* Back $ (mirrored to read correctly from the other side) */}
        <mesh position={[0, 0, -faceOffset]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[coinRadius * 1.85, coinRadius * 1.85]} />
          <meshBasicMaterial map={dollarTex} transparent alphaTest={0.05} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

function WireShell() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x -= delta * 0.08
    ref.current.rotation.y -= delta * 0.12
  })
  return (
    <mesh ref={ref} scale={2.05}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#7B61FF" wireframe transparent opacity={0.35} />
    </mesh>
  )
}

function StarsField() {
  const ref = useRef()
  const [positions] = useState(() => generateStarPositions(900))
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x += delta * 0.02
  })
  return (
    <group ref={ref}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#6B8EFF"
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

function CameraParallax() {
  useFrame((state) => {
    const { mouse, camera } = state
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00F5A0" />
          <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#7B61FF" />
          <pointLight position={[0, 0, 3]} intensity={1.2} color="#6B8EFF" />
          <DollarCoin />
          <WireShell />
          <StarsField />
          <CameraParallax />
          <fog attach="fog" args={['#0A0E1A', 6, 12]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
