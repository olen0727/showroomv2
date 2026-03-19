'use client'

import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { useTransformStore, TransformProvider, TransformEditorUI, useTransform } from './TransformEditor'
import { useScrollProgress } from './ScrollProgressContext'

/* ── 色票 ── */
const C = {
  floor: '#ede5d8',
  rug1: '#f97316',
  rug2: '#fbbf24',
  rug3: '#fde68a',
  desk: '#ffffff',
  deskLeg: '#d4c5b0',
  monitor: '#1a1a1a',
  screen: '#0f172a',
  chair: '#2a2a2a',
  plant: '#22c55e',
  plantPot: '#c47c5a',
  pencilCup: '#e2e8f0',
}

function Box({
  position, scale, color,
  castShadow = false, receiveShadow = true,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  castShadow?: boolean
  receiveShadow?: boolean
}) {
  return (
    <mesh position={position} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

/*
 * Layout — 人物面向 +Z（鏡頭）。
 * 桌子 / 螢幕位於人物背後（負 Z）。
 *
 *   camera  ←  character  ←  desk / monitors
 *   z ≈ +7      z = 0          z ≈ -0.9
 */

/* ── 桌子 ── */
function Desk() {
  const t = useTransform('Desk', { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] })
  const legH = 0.62
  const legR = 0.04
  const legs: [number, number, number][] = [
    [-0.75, legH / 2, -0.28],
    [0.75, legH / 2, -0.28],
    [-0.75, legH / 2, 0.28],
    [0.75, legH / 2, 0.28],
  ]
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* 桌面 */}
      <Box position={[0, legH + 0.03, 0]} scale={[1.8, 0.06, 0.7]} color={C.desk} castShadow />
      {legs.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[legR, legR, legH, 8]} />
          <meshStandardMaterial color={C.deskLeg} />
        </mesh>
      ))}
      {/* 筆筒 */}
      <mesh position={[-0.55, 0.76, 0.05]} castShadow>
        <cylinderGeometry args={[0.05, 0.055, 0.12, 12]} />
        <meshStandardMaterial color={C.pencilCup} />
      </mesh>
      {/* 小物件 */}
      <Box position={[0.6, 0.70, 0.05]} scale={[0.14, 0.05, 0.09]} color="#60a5fa" castShadow />
    </group>
  )
}

/* ── 兩台螢幕 ── */
function Monitors() {
  const t = useTransform('Monitors', { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] })
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* 左螢幕 */}
      <group position={[-0.42, 1.14, -0.05]}>
        <Box position={[0, 0, 0]} scale={[0.56, 0.36, 0.04]} color={C.monitor} castShadow />
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.50, 0.30]} />
          <meshStandardMaterial color={C.screen} emissive="#1e3a2a" emissiveIntensity={0.5} />
        </mesh>
        {[-0.06, -0.01, 0.04, 0.08].map((y, i) => (
          <mesh key={i} position={[-0.02, y, 0.024]}>
            <planeGeometry args={[0.22 - i * 0.02, 0.012]} />
            <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1.2} />
          </mesh>
        ))}
        <Box position={[0, -0.22, 0.06]} scale={[0.06, 0.06, 0.06]} color={C.monitor} />
        <Box position={[0, -0.27, 0.10]} scale={[0.18, 0.03, 0.12]} color={C.monitor} />
      </group>

      {/* 右螢幕 */}
      <group position={[0.42, 1.06, -0.05]}>
        <Box position={[0, 0, 0]} scale={[0.52, 0.33, 0.04]} color={C.monitor} castShadow />
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.46, 0.27]} />
          <meshStandardMaterial color={C.screen} emissive="#1a2e3a" emissiveIntensity={0.5} />
        </mesh>
        {[-0.05, 0.0, 0.05].map((y, i) => (
          <mesh key={i} position={[-0.01, y, 0.024]}>
            <planeGeometry args={[0.28 - i * 0.04, 0.012]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.0} />
          </mesh>
        ))}
        <Box position={[0, -0.20, 0.06]} scale={[0.06, 0.05, 0.06]} color={C.monitor} />
        <Box position={[0, -0.24, 0.10]} scale={[0.14, 0.03, 0.10]} color={C.monitor} />
      </group>
    </group>
  )
}

/* ── 椅子 — 座面朝向 +Z ── */
function Chair() {
  const t = useTransform('Chair', { position: [0, 0, -0.3], rotation: [0, 0, 0], scale: [1, 1, 1] })
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* 座墊 */}
      <Box position={[0, 0.38, 0]} scale={[0.52, 0.06, 0.50]} color={C.chair} castShadow />
      {/* 靠背 */}
      <Box position={[0, 0.70, -0.23]} scale={[0.50, 0.60, 0.06]} color={C.chair} castShadow />
      {/* 支柱 */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.36, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* 五星底座 */}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <mesh key={i} position={[Math.cos(rad) * 0.22, 0.04, Math.sin(rad) * 0.22]} castShadow>
            <boxGeometry args={[0.22, 0.03, 0.04]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        )
      })}
    </group>
  )
}

/* ── 條紋地毯 ── */
function Rug() {
  const t = useTransform('Rug', { position: [0, 0, -0.4], rotation: [0, 0, 0], scale: [1, 1, 1] })
  const stripes = [
    { scale: [2.0, 0.005, 2.0] as [number, number, number], color: C.rug1 },
    { scale: [1.6, 0.006, 1.6] as [number, number, number], color: C.rug2 },
    { scale: [1.2, 0.007, 1.2] as [number, number, number], color: C.rug3 },
  ]
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {stripes.map(({ scale, color }, i) => (
        <mesh key={i} position={[0, i * 0.001, 0]} receiveShadow>
          <boxGeometry args={scale} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

/* ── 地板 ── */
function Floor() {
  const t = useTransform('Floor', { position: [0, -0.002, 0], rotation: [-Math.PI / 2, 0, 0], scale: [1, 1, 1] })
  return (
    <mesh rotation={t.rotation} position={t.position} scale={t.scale} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={C.floor} />
    </mesh>
  )
}

/* ── 角落盆栽 ── */
function CornerPlant() {
  const t = useTransform('CornerPlant', { position: [1.4, 0, 0.5], rotation: [0, 0, 0], scale: [1, 1, 1] })
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      <mesh>
        <cylinderGeometry args={[0.13, 0.10, 0.22, 14]} />
        <meshStandardMaterial color={C.plantPot} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 14]} />
        <meshStandardMaterial color="#3b2800" />
      </mesh>
      {[0, 0.7, 1.4, 2.1, 2.8].map((rot, i) => (
        <mesh key={i} position={[0, 0.22 + i * 0.06, 0]} rotation={[0, rot, 0.6 + i * 0.05]}>
          <planeGeometry args={[0.36 - i * 0.02, 0.14]} />
          <meshStandardMaterial color="#16a34a" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ── 書櫃 ── */
function ShelfBooks({ y, width, depth }: { y: number, width: number, depth: number }) {
  const books = useMemo(() => {
    const arr = []
    let currentX = -width / 2 + 0.05
    const colors = ['#8d5b4c', '#5a6245', '#495267', '#8a4b46', '#c49a6c', '#606470', '#3e3e3e', '#b08b6b', '#9c3d3a', '#2c3e50']

    while (currentX < width / 2 - 0.1) {
      if (Math.random() > 0.85) {
        currentX += Math.random() * 0.1 + 0.05
        continue
      }
      const thickness = Math.random() * 0.03 + 0.02
      const height = Math.random() * 0.12 + 0.18
      const col = colors[Math.floor(Math.random() * colors.length)]

      let rotZ = 0
      if (Math.random() > 0.9) {
        rotZ = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.15 + 0.05)
        currentX += 0.04
      }
      arr.push({ pos: [currentX + thickness / 2, height / 2, 0] as [number, number, number], scale: [thickness, height, depth * 0.8] as [number, number, number], color: col, rotZ })
      currentX += thickness + 0.005
    }
    return arr
  }, [width, depth])

  return (
    <group position={[0, y, 0]}>
      {books.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={[0, 0, b.rotZ]} castShadow receiveShadow>
          <boxGeometry args={b.scale} />
          <meshStandardMaterial color={b.color} />
        </mesh>
      ))}
      {/* 隨機裝飾球 */}
      {Math.random() > 0.75 && (
        <mesh position={[width / 2 - 0.15, 0.08, 0.05]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.2} />
        </mesh>
      )}
    </group>
  )
}

function Bookcase() {
  const t = useTransform('Bookcase', { position: [-1.6, 0, -0.5], rotation: [0, Math.PI / 6, 0], scale: [1, 1, 1] })
  const W = 1.2
  const H = 2.2
  const D = 0.35
  const T = 0.04
  const color = '#241f1c'
  const shelvesY = [0.02, 0.38, 0.74, 1.10, 1.46, 1.82]

  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      <Box position={[-W / 2 + T / 2, H / 2, 0]} scale={[T, H, D]} color={color} castShadow receiveShadow />
      <Box position={[W / 2 - T / 2, H / 2, 0]} scale={[T, H, D]} color={color} castShadow receiveShadow />
      <Box position={[0, H / 2, -D / 2 + T / 2]} scale={[W, H, T]} color={color} receiveShadow />
      <Box position={[0, H - T / 2, 0]} scale={[W, T, D]} color={color} castShadow receiveShadow />
      <Box position={[0, H + 0.02, 0]} scale={[W + 0.06, 0.04, D + 0.04]} color={color} castShadow receiveShadow />

      {shelvesY.map((y, i) => (
        <group key={i}>
          <Box position={[0, y, 0]} scale={[W - T * 2, T, D - 0.02]} color={color} castShadow receiveShadow />
          {i < shelvesY.length && <ShelfBooks y={y + T / 2} width={W - T * 2} depth={D - 0.04} />}
        </group>
      ))}
    </group>
  )
}

/* ── 茶几 ── */
function OpenBook({ position }: { position: [number, number, number] }) {
  const pageColor = '#f5eedc'
  const coverColor = '#6b442a'
  const W = 0.28
  const H = 0.35
  const T = 0.03
  const angle = 0.15

  return (
    <group position={position} rotation={[0, -0.2, 0]}>
      <Box position={[0, -0.015, 0]} scale={[W * 2 + 0.04, 0.01, H + 0.02]} color={coverColor} castShadow />
      <group position={[-0.01, 0, 0]} rotation={[0, 0, angle]}>
        <Box position={[-W / 2, 0, 0]} scale={[W, T, H]} color={pageColor} castShadow receiveShadow />
      </group>
      <group position={[0.01, 0, 0]} rotation={[0, 0, -angle]}>
        <Box position={[W / 2, 0, 0]} scale={[W, T, H]} color={pageColor} castShadow receiveShadow />
      </group>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, H, 8, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={pageColor} />
      </mesh>
    </group>
  )
}

function CoffeeTable() {
  const t = useTransform('CoffeeTable', { position: [-1.2, 0, 1.2], rotation: [0, 0.5, 0], scale: [1, 1, 1] })
  const W = 1.3
  const H = 0.45
  const D = 0.7
  const legT = 0.06
  const boardT = 0.04
  const color = '#3c2f29'

  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      <Box position={[0, H - boardT / 2, 0]} scale={[W, boardT, D]} color={color} castShadow receiveShadow />
      <Box position={[-W / 2 + legT / 2 + 0.02, H / 2 - boardT / 2, -D / 2 + legT / 2 + 0.02]} scale={[legT, H - boardT, legT]} color={color} castShadow receiveShadow />
      <Box position={[W / 2 - legT / 2 - 0.02, H / 2 - boardT / 2, -D / 2 + legT / 2 + 0.02]} scale={[legT, H - boardT, legT]} color={color} castShadow receiveShadow />
      <Box position={[-W / 2 + legT / 2 + 0.02, H / 2 - boardT / 2, D / 2 - legT / 2 - 0.02]} scale={[legT, H - boardT, legT]} color={color} castShadow receiveShadow />
      <Box position={[W / 2 - legT / 2 - 0.02, H / 2 - boardT / 2, D / 2 - legT / 2 - 0.02]} scale={[legT, H - boardT, legT]} color={color} castShadow receiveShadow />
      <Box position={[0, H / 2, -D / 2 + legT / 2 + 0.03]} scale={[W - legT * 2, H * 0.7, 0.02]} color="#2a201c" castShadow receiveShadow />
      <Box position={[0, H / 2, D / 2 - legT / 2 - 0.03]} scale={[W - legT * 2, H * 0.7, 0.02]} color="#2a201c" castShadow receiveShadow />
      <Box position={[-W / 2 + legT / 2 + 0.03, H / 2, 0]} scale={[0.02, H * 0.7, D - legT * 2]} color="#2a201c" castShadow receiveShadow />
      <Box position={[W / 2 - legT / 2 - 0.03, H / 2, 0]} scale={[0.02, H * 0.7, D - legT * 2]} color="#2a201c" castShadow receiveShadow />
      <OpenBook position={[0.1, H + 0.015, -0.05]} />
    </group>
  )
}

/**
 * DeskRoom 主元件
 * 根據 scrollOffset 在 0.10~0.30 區間逐漸縮小並向下移動，
 * 達到 0.30 以上時完全隱藏以提升效能。
 */
export default function DeskRoom() {
  const store = useTransformStore({
    Floor: { position: [0, -1.002, 0], rotation: [-Math.PI / 2, 0, 0], scale: [1, 1, 1] },
    Rug: { position: [1.66, -1, 0.47], rotation: [0, -0.34, 0], scale: [1, 1, 1] },
    Chair: { position: [2.03, -1, 0.15], rotation: [0, -0.37, 0], scale: [1, 1, 1] },
    Desk: { position: [0.97, -1, -0.89], rotation: [0, 1.2, 0], scale: [1.25, 1, 1] },
    Monitors: { position: [0.86, -1.13, -1.09], rotation: [0, 1.21, 0], scale: [1.6, 1, 1] },
    CornerPlant: { position: [1.86, -0.13, 1.77], rotation: [0, 0, 0], scale: [.5, .5, .5] },
    Bookcase: { position: [2.74, -1, -2.33], rotation: [0, -0.39, 0], scale: [2.41, 1, 2] },
    CoffeeTable: { position: [1.45, -1, 1.23], rotation: [0, 2.81, 0], scale: [1.17, 1.66, 1.33] }
  })

  const ENABLE_EDITOR = true
  const groupRef = useRef<Group>(null)
  const scrollRef = useScrollProgress()

  /* 每幀根據 scrollOffset 控制整個房間的 scale 與位置 */
  useFrame(() => {
    if (!groupRef.current) return
    const offset = scrollRef.current.offset

    if (offset < 0.10) {
      // 完全顯示
      groupRef.current.visible = true
      groupRef.current.scale.setScalar(1)
      groupRef.current.position.y = 0
    } else if (offset < 0.30) {
      // 逐漸縮小 + 下沉
      groupRef.current.visible = true
      const t = (offset - 0.10) / 0.20 // 0 → 1
      const s = 1 - t               // 1 → 0
      groupRef.current.scale.setScalar(Math.max(s, 0))
      groupRef.current.position.y = -t * 3 // 向下沉
    } else {
      // 完全隱藏
      groupRef.current.visible = false
    }
  })

  return (
    <TransformProvider value={store}>
      <group ref={groupRef}>
        <Floor />
        <Rug />
        <Chair />
        <Desk />
        <Monitors />
        <CornerPlant />
        <Bookcase />
        <CoffeeTable />
        <TransformEditorUI enabled={ENABLE_EDITOR} />
      </group>
    </TransformProvider>
  )
}
