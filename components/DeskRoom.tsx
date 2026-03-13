'use client'

import * as THREE from 'three'
import { useTransformStore, TransformProvider, TransformEditorUI, useTransform } from './TransformEditor'

/* ── colour palette ── */
const C = {
  floor:     '#ede5d8',
  rug1:      '#f97316',
  rug2:      '#fbbf24',
  rug3:      '#fde68a',
  desk:      '#ffffff',
  deskLeg:   '#d4c5b0',
  monitor:   '#1a1a1a',
  screen:    '#0f172a',
  chair:     '#2a2a2a',
  plant:     '#22c55e',
  plantPot:  '#c47c5a',
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
 * Layout — character faces +Z (camera).
 * Desk / monitors sit BEHIND the character (negative Z).
 *
 *   camera  ←  character  ←  desk / monitors
 *   z ≈ +7      z = 0          z ≈ -0.9
 */

/* ── desk ── */
function Desk() {
  const t = useTransform('Desk', { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] })
  const legH = 0.62
  const legR = 0.04
  const legs: [number, number, number][] = [
    [-0.75, legH / 2, -0.28],
    [ 0.75, legH / 2, -0.28],
    [-0.75, legH / 2,  0.28],
    [ 0.75, legH / 2,  0.28],
  ]
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* surface */}
      <Box position={[0, legH + 0.03, 0]} scale={[1.8, 0.06, 0.7]} color={C.desk} castShadow />
      {legs.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[legR, legR, legH, 8]} />
          <meshStandardMaterial color={C.deskLeg} />
        </mesh>
      ))}
      {/* pencil cup */}
      <mesh position={[-0.55, 0.76, 0.05]} castShadow>
        <cylinderGeometry args={[0.05, 0.055, 0.12, 12]} />
        <meshStandardMaterial color={C.pencilCup} />
      </mesh>
      {/* small items */}
      <Box position={[0.6, 0.70, 0.05]} scale={[0.14, 0.05, 0.09]} color="#60a5fa" castShadow />
    </group>
  )
}

/* ── two monitors behind/above the character ── */
function Monitors() {
  const t = useTransform('Monitors', { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] })
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* left monitor */}
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

      {/* right monitor */}
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

/* ── chair — seat faces +Z (same as character) ── */
function Chair() {
  const t = useTransform('Chair', { position: [0, 0, -0.3], rotation: [0, 0, 0], scale: [1, 1, 1] })
  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      {/* seat */}
      <Box position={[0, 0.38, 0]} scale={[0.52, 0.06, 0.50]} color={C.chair} castShadow />
      {/* back rest */}
      <Box position={[0, 0.70, -0.23]} scale={[0.50, 0.60, 0.06]} color={C.chair} castShadow />
      {/* pole */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.36, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* 5-star base */}
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

/* ── striped rug ── */
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

/* ── floor only (no walls) ── */
function Floor() {
  const t = useTransform('Floor', { position: [0, -0.002, 0], rotation: [-Math.PI / 2, 0, 0], scale: [1, 1, 1] })
  return (
    <mesh rotation={t.rotation} position={t.position} scale={t.scale} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={C.floor} />
    </mesh>
  )
}

/* ── corner plant (right side) ── */
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

export default function DeskRoom() {
  const store = useTransformStore({
    Floor: { position: [0, -0.002, 0], rotation: [-Math.PI / 2, 0, 0], scale: [1, 1, 1] },
    Rug: { position: [0, 0, -0.4], rotation: [0, 0, 0], scale: [1, 1, 1] },
    Chair: { position: [0, 0, -0.3], rotation: [0, 0, 0], scale: [1, 1, 1] },
    Desk: { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] },
    Monitors: { position: [0, 0, -0.9], rotation: [0, 0, 0], scale: [1, 1, 1] },
    CornerPlant: { position: [1.4, 0, 0.5], rotation: [0, 0, 0], scale: [1, 1, 1] }
  })

  // 設定 ENABLE_EDITOR = false 即可關閉此介面
  const ENABLE_EDITOR = true

  return (
    <TransformProvider value={store}>
      <group>
        <Floor />
        <Rug />
        <Chair />
        <Desk />
        <Monitors />
        <CornerPlant />
        <TransformEditorUI enabled={ENABLE_EDITOR} />
      </group>
    </TransformProvider>
  )
}
