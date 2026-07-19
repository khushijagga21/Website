import { Environment, MeshReflectorMaterial, SoftShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Sculpture() {
  const g = useRef<THREE.Group>(null)
  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e9e2d4'),
      roughness: 0.28,
      metalness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.28,
      reflectivity: 0.6,
    })
    return m
  }, [])

  const matAccent = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#cc5648'),
      roughness: 0.35,
      metalness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.22,
      reflectivity: 0.7,
    })
    return m
  }, [])

  const matSteel = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#4e748b'),
      roughness: 0.26,
      metalness: 0.55,
      clearcoat: 0.6,
      clearcoatRoughness: 0.24,
      reflectivity: 0.95,
    })
    return m
  }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    const gp = g.current
    if (!gp) return
    gp.rotation.y = THREE.MathUtils.lerp(gp.rotation.y, pointer.x * 0.45 + t * 0.12, 0.08)
    gp.rotation.x = THREE.MathUtils.lerp(gp.rotation.x, -pointer.y * 0.22 + Math.sin(t * 0.55) * 0.04, 0.08)
    gp.position.y = Math.sin(t * 0.8) * 0.05
  })

  return (
    <group ref={g} position={[0, -0.25, 0]}>
      {/* Base plinth */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.35]} />
        <primitive object={mat} attach="material" />
      </mesh>

      {/* Twin volumes */}
      <mesh castShadow receiveShadow position={[-0.55, 0.6, 0.0]}>
        <boxGeometry args={[0.9, 1.2, 0.72]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.55, 0.78, -0.08]}>
        <boxGeometry args={[0.86, 1.55, 0.64]} />
        <primitive object={mat} attach="material" />
      </mesh>

      {/* Bridge slab */}
      <mesh castShadow receiveShadow position={[0, 1.22, 0.16]} rotation={[0, 0.08, 0.03]}>
        <boxGeometry args={[1.62, 0.12, 0.62]} />
        <primitive object={matSteel} attach="material" />
      </mesh>

      {/* Atrium void (negative illusion via inset darker glass) */}
      <mesh castShadow receiveShadow position={[-0.55, 0.68, 0.2]}>
        <boxGeometry args={[0.55, 0.78, 0.2]} />
        <meshPhysicalMaterial
          color="#0e0e10"
          roughness={0.15}
          metalness={0.05}
          transmission={0.55}
          thickness={0.6}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Terracotta fins */}
      {new Array(7).fill(0).map((_, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          position={[0.55, 0.3 + i * 0.18, 0.34]}
          rotation={[0, 0.35, 0]}
        >
          <boxGeometry args={[0.06, 0.14, 0.7]} />
          <primitive object={matAccent} attach="material" />
        </mesh>
      ))}

      {/* Roof cantilever */}
      <mesh castShadow receiveShadow position={[-0.08, 1.58, -0.28]} rotation={[0, -0.35, 0]}>
        <boxGeometry args={[1.9, 0.1, 0.55]} />
        <meshPhysicalMaterial
          color="#d6aa4a"
          roughness={0.22}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Side screen */}
      <mesh castShadow receiveShadow position={[-1.0, 0.78, -0.05]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.08, 1.5, 0.95]} />
        <meshPhysicalMaterial color="#7e9784" roughness={0.4} metalness={0.05} clearcoat={0.4} />
      </mesh>
    </group>
  )
}

export function ArchitectScene() {
  return (
    <>
      <SoftShadows size={18} samples={10} focus={0.5} />

      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={1.35}
        position={[3.5, 4.5, 2.5]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <pointLight intensity={0.55} position={[-3, 1.5, -1]} color={'#4e748b'} />

      <group position={[0, -0.75, 0]}>
        {/* Reflective floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <MeshReflectorMaterial
            blur={[300, 70]}
            resolution={512}
            mixBlur={0.9}
            mixStrength={18}
            roughness={0.9}
            depthScale={0.18}
            minDepthThreshold={0.35}
            maxDepthThreshold={1.2}
            color="#0b0b0d"
            metalness={0.15}
          />
        </mesh>
      </group>

      <Sculpture />

      <Environment preset="city" />
    </>
  )
}

