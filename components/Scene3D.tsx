'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import CharacterModel from './CharacterModel'
import DeskRoom from './DeskRoom'
import FloatingElements from './FloatingElements'
import HeroText3D from './HeroText3D'
import styles from './Scene3D.module.css'

export default function Scene3D() {
  return (
    <div className={styles.container}>
      <Canvas
        /*
         * Front-facing camera: character faces +Z, camera sits at +Z looking in -Z.
         * Slightly elevated (y=2.4) so we see the desk behind the character.
         * FOV 50 gives a natural portrait-like framing.
         */
        camera={{ position: [0, 2.4, 7.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        className={styles.canvas}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 8, 6]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 4, 4]} intensity={0.5} color="#ffe8cc" />
        {/* Screen glow from monitors behind character */}
        <pointLight position={[0, 1.1, -0.7]} intensity={0.8} color="#88aaff" />

        <Suspense fallback={null}>
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.25}
            scale={10}
            blur={2.0}
            far={4}
            color="#3b2800"
          />

          {/* Floating hero text — left side */}
          <HeroText3D />

          <DeskRoom />
          <CharacterModel />
          <FloatingElements />

          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
          rotateSpeed={0.35}
          target={[0, 1.2, 0]}
        />
      </Canvas>
    </div>
  )
}
