'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { useScrollProgress } from './ScrollProgressContext'

/**
 * 浮動裝飾元素
 * 隨滾動進度 (offset 0.05~0.25) 向外擴散並縮小消失。
 * GSAP 入場動畫已移除，改由 useFrame 控制。
 */

/* ── 漂浮相框 ── */
function PictureFrame({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 外框 */}
      <mesh>
        <boxGeometry args={[0.36, 0.30, 0.04]} />
        <meshStandardMaterial color="#a8c4e0" />
      </mesh>
      {/* 白色內襯 */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.28, 0.22]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* 風景色塊 */}
      <mesh position={[0, -0.04, 0.025]}>
        <planeGeometry args={[0.16, 0.1]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* 太陽 */}
      <mesh position={[0.04, 0.02, 0.026]}>
        <circleGeometry args={[0.025, 12]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  )
}

/* ── 對話泡泡 ── */
function ChatBubble({ position, color = '#93c5fd' }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.2, 0.15, 0.03]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 圓點 */}
      {[-0.05, 0, 0.05].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.018]}>
          <circleGeometry args={[0.014, 8]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      ))}
    </group>
  )
}

/* ── 程式碼標籤 ── */
function CodeTag({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.26, 0.16, 0.03]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* 括號符號 */}
      {[-0.07, 0.07].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.018]}>
          <planeGeometry args={[0.03, 0.1]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── 浮動元素容器 ── */
export default function FloatingElements() {
  const groupRef = useRef<Group>(null)
  const scrollRef = useScrollProgress()

  // 各元素的初始位置（用於擴散計算）
  const initialPositions = {
    frame:  [1.5,  1.9, -0.6] as [number, number, number],
    bubble: [-0.8, 2.1,  0.4] as [number, number, number],
    code:   [1.2,  2.0,  0.2] as [number, number, number],
  }

  useFrame(() => {
    if (!groupRef.current) return
    const offset = scrollRef.current.offset

    if (offset < 0.05) {
      // 完全顯示
      groupRef.current.visible = true
      groupRef.current.scale.setScalar(1)
      groupRef.current.position.set(0, 0, 0)
    } else if (offset < 0.25) {
      // 擴散 + 縮小
      groupRef.current.visible = true
      const t = (offset - 0.05) / 0.20 // 0 → 1
      const s = 1 - t
      groupRef.current.scale.setScalar(Math.max(s, 0))
      // 向上 + 散開
      groupRef.current.position.y = t * 2
    } else {
      groupRef.current.visible = false
    }
  })

  return (
    <group ref={groupRef}>
      {/* 相框 — 右上 */}
      <PictureFrame position={initialPositions.frame} />
      {/* 對話泡泡 — 左上 */}
      <ChatBubble position={initialPositions.bubble} color="#bfdbfe" />
      {/* 程式碼標籤 — 右上 */}
      <CodeTag position={initialPositions.code} />
    </group>
  )
}
