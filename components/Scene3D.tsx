'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Environment, ContactShadows, ScrollControls } from '@react-three/drei'
import { ScrollProgressProvider } from './ScrollProgressContext'
import CharacterModel from './CharacterModel'
import DeskRoom from './DeskRoom'
import FloatingElements from './FloatingElements'
import HeroText3D from './HeroText3D'
import VirtualBackground from './VirtualBackground'
import styles from './Scene3D.module.css'

/* 接收外部 ref，將 Canvas 內部的 scroll offset 同步給外部 */
interface Scene3DProps {
  scrollOffsetRef: React.RefObject<{ offset: number }>
}

export default function Scene3D({ scrollOffsetRef }: Scene3DProps) {
  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: [0, 2.4, 7.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        className={styles.canvas}
        shadows
      >
        {/* 燈光 */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 8, 6]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 4, 4]} intensity={0.5} color="#ffe8cc" />
        <pointLight position={[0, 1.1, -0.7]} intensity={0.8} color="#88aaff" />

        <Suspense fallback={null}>
          {/* ScrollControls：5 頁滾動長度 */}
          <ScrollControls pages={5} damping={0.15}>
            <ScrollProgressProvider externalRef={scrollOffsetRef}>
              <ContactShadows
                position={[0, -1.01, 0]}
                opacity={0.25}
                scale={10}
                blur={2.0}
                far={4}
                color="#3b2800"
              />

              <HeroText3D />
              <DeskRoom />
              <VirtualBackground />
              <CharacterModel />
              <FloatingElements />

              <Environment preset="apartment" />
            </ScrollProgressProvider>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
