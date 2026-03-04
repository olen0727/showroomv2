'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import CharacterModel from './CharacterModel'
import DeskRoom from './DeskRoom'
import FloatingElements from './FloatingElements'

export default function Scene3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [5.5, 4.5, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[8, 10, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 4, -4]} intensity={0.4} color="#ffe8cc" />
        <pointLight position={[0, 2, -0.5]} intensity={0.6} color="#88aaff" />

        <Suspense fallback={null}>
          {/* Ground shadow */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.3}
            scale={8}
            blur={2.5}
            far={4}
            color="#3b2800"
          />

          {/* Room furniture */}
          <DeskRoom />

          {/* Character model at the desk */}
          <CharacterModel />

          {/* Floating decorative elements */}
          <FloatingElements />

          <Environment preset="apartment" />
        </Suspense>

        {/* Subtle orbit — limited so the scene stays composed */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
          rotateSpeed={0.4}
          autoRotate={false}
          target={[0, 0.8, 0]}
        />
      </Canvas>
    </div>
  )
}
