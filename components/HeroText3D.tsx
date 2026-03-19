'use client'

import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import styles from './HeroText3D.module.css'
import { useScrollProgress } from './ScrollProgressContext'

/**
 * 3D 世界空間中的 HTML 文字
 * 隨 scrollOffset 在 0.05~0.20 區間向左飄離並淡出。
 */
export default function HeroText3D() {
  const groupRef = useRef<Group>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const scrollRef = useScrollProgress()

  // 初始位置
  const baseX = -2.4
  const baseY = 1.4

  useFrame(() => {
    if (!groupRef.current) return
    const offset = scrollRef.current.offset

    if (offset < 0.05) {
      // 完全顯示
      groupRef.current.visible = true
      groupRef.current.position.x = baseX
      groupRef.current.position.y = baseY
      groupRef.current.scale.setScalar(1)
      // HTML opacity
      if (wrapRef.current) wrapRef.current.style.opacity = '1'
    } else if (offset < 0.20) {
      groupRef.current.visible = true
      const t = (offset - 0.05) / 0.15 // 0 → 1
      // 向左飄離
      groupRef.current.position.x = baseX - t * 3
      groupRef.current.position.y = baseY + t * 0.5
      groupRef.current.scale.setScalar(Math.max(1 - t, 0))
      // 淡出
      if (wrapRef.current) wrapRef.current.style.opacity = String(Math.max(1 - t * 1.5, 0))
    } else {
      groupRef.current.visible = false
      if (wrapRef.current) wrapRef.current.style.opacity = '0'
    }
  })

  return (
    <group ref={groupRef} position={[baseX, baseY, 2.0]}>
      <Html
        transform={false}
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        zIndexRange={[10, 20]}
      >
        <div ref={wrapRef} className={styles.container}>
          {/* 名稱 */}
          <h1 className={styles.name}>
            I'm Olen
            <br />
            Glad to meet you
          </h1>

          {/* 職稱標籤 */}
          <div className={styles.badge}>
            Welcome to my home
          </div>

          {/* 標語 
          <p className={styles.tagline}>
            Building immersive experiences
            <br />
            with Three.js · GSAP · Next.js
          </p>
          */}
        </div>
      </Html>
    </group>
  )
}
