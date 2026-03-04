'use client'

import { useRef } from 'react'
import * as THREE from 'three'

/* ── colour palette (warm cartoon style) ── */
const C = {
  floor:     '#f0e6d4',
  rug1:      '#f97316',   // orange
  rug2:      '#fbbf24',   // yellow
  rug3:      '#fde68a',   // light yellow
  desk:      '#ffffff',
  deskLeg:   '#d4c5b0',
  monitor:   '#1a1a1a',
  screen:    '#0f172a',
  screenGlow:'#4ade80',   // green code colour
  chair:     '#2a2a2a',
  corkboard: '#b5906e',
  cork:      '#c8a87a',
  pin:       '#e84a4a',
  shelf:     '#d4b896',
  wall:      '#ede4d8',
  plant:     '#22c55e',
  plantPot:  '#c47c5a',
  book1:     '#f97316',
  book2:     '#3b82f6',
  book3:     '#10b981',
  mug:       '#ffffff',
  pencilCup: '#e2e8f0',
}

/* ── simple reusable box mesh ── */
function Box({
  position, scale, color, receiveShadow = true, castShadow = false,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  receiveShadow?: boolean
  castShadow?: boolean
}) {
  return (
    <mesh position={position} receiveShadow={receiveShadow} castShadow={castShadow}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

/* ── desk with 4 legs ── */
function Desk() {
  const legH = 0.62
  const legR  = 0.04
  const top: [number, number, number] = [0, legH + 0.03, 0]
  const legs: [number, number, number][] = [
    [-0.75, legH / 2, -0.28],
    [ 0.75, legH / 2, -0.28],
    [-0.75, legH / 2,  0.28],
    [ 0.75, legH / 2,  0.28],
  ]
  return (
    <group>
      {/* surface */}
      <Box position={top} scale={[1.72, 0.06, 0.65]} color={C.desk} castShadow />
      {/* legs */}
      {legs.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[legR, legR, legH, 8]} />
          <meshStandardMaterial color={C.deskLeg} />
        </mesh>
      ))}
      {/* pencil / pen cup */}
      <mesh position={[-0.52, 0.76, 0.02]} castShadow>
        <cylinderGeometry args={[0.05, 0.055, 0.12, 12]} />
        <meshStandardMaterial color={C.pencilCup} />
      </mesh>
      {/* small items on desk */}
      <Box position={[0.62, 0.70, 0.1]}  scale={[0.14, 0.06, 0.09]} color="#60a5fa" castShadow />
      <Box position={[0.78, 0.695, 0.1]} scale={[0.06, 0.05, 0.06]} color="#1a1a1a" castShadow />
    </group>
  )
}

/* ── two monitors ── */
function Monitors() {
  return (
    <group>
      {/* left monitor */}
      <group position={[-0.38, 1.12, -0.18]}>
        <Box position={[0, 0, 0]} scale={[0.54, 0.34, 0.04]} color={C.monitor} castShadow />
        {/* screen */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.48, 0.28]} />
          <meshStandardMaterial color={C.screen} emissive="#1e3a2a" emissiveIntensity={0.5} />
        </mesh>
        {/* code lines glow */}
        {[-0.06, -0.02, 0.02, 0.06].map((y, i) => (
          <mesh key={i} position={[(i % 2 === 0 ? -0.05 : 0.04), y, 0.023]}>
            <planeGeometry args={[0.22 - i * 0.02, 0.012]} />
            <meshStandardMaterial color={C.screenGlow} emissive={C.screenGlow} emissiveIntensity={1.2} />
          </mesh>
        ))}
        {/* stand */}
        <Box position={[0, -0.21, 0.06]} scale={[0.06, 0.06, 0.06]} color={C.monitor} />
        <Box position={[0, -0.26, 0.1]}  scale={[0.16, 0.03, 0.1]}  color={C.monitor} />
      </group>

      {/* right monitor */}
      <group position={[0.38, 1.05, -0.2]}>
        <Box position={[0, 0, 0]} scale={[0.50, 0.32, 0.04]} color={C.monitor} castShadow />
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.44, 0.26]} />
          <meshStandardMaterial color={C.screen} emissive="#1a2e3a" emissiveIntensity={0.5} />
        </mesh>
        {[-0.06, -0.01, 0.04].map((y, i) => (
          <mesh key={i} position={[-0.02, y, 0.023]}>
            <planeGeometry args={[0.28 - i * 0.04, 0.012]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.0} />
          </mesh>
        ))}
        <Box position={[0, -0.20, 0.06]} scale={[0.06, 0.05, 0.06]} color={C.monitor} />
        <Box position={[0, -0.24, 0.1]}  scale={[0.14, 0.03, 0.1]}  color={C.monitor} />
      </group>
    </group>
  )
}

/* ── cork board on back wall ── */
function CorkBoard() {
  return (
    <group position={[0.2, 1.65, -1.55]}>
      {/* frame */}
      <Box position={[0, 0, 0]} scale={[0.92, 0.68, 0.06]} color="#c9a05a" />
      {/* cork surface */}
      <Box position={[0, 0, 0.025]} scale={[0.84, 0.60, 0.02]} color={C.cork} />
      {/* sticky notes */}
      <Box position={[-0.18,  0.1, 0.04]} scale={[0.22, 0.18, 0.02]} color="#bfdbfe" />
      <Box position={[ 0.16, -0.1, 0.04]} scale={[0.20, 0.16, 0.02]} color="#fef9c3" />
      {/* pins */}
      {[[-0.18, 0.2], [0.16, 0.0]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.06]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={C.pin} />
        </mesh>
      ))}
    </group>
  )
}

/* ── wall shelf with books ── */
function Shelf() {
  return (
    <group position={[-0.82, 1.72, -1.52]}>
      {/* shelf board */}
      <Box position={[0, 0, 0]} scale={[0.44, 0.05, 0.18]} color={C.shelf} castShadow />
      {/* books */}
      <Box position={[-0.1, 0.1, -0.02]} scale={[0.07, 0.18, 0.1]} color={C.book1} castShadow />
      <Box position={[-0.02, 0.1, -0.02]} scale={[0.07, 0.16, 0.1]} color={C.book2} castShadow />
      <Box position={[0.07, 0.1, -0.02]} scale={[0.06, 0.14, 0.1]} color={C.book3} castShadow />
      {/* small plant on shelf */}
      <mesh position={[0.16, 0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.08, 10]} />
        <meshStandardMaterial color="#a16207" />
      </mesh>
      <mesh position={[0.16, 0.16, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={C.plant} />
      </mesh>
    </group>
  )
}

/* ── corner plant ── */
function CornerPlant() {
  return (
    <group position={[1.28, 0, 0.7]}>
      {/* pot */}
      <mesh>
        <cylinderGeometry args={[0.13, 0.1, 0.22, 14]} />
        <meshStandardMaterial color={C.plantPot} />
      </mesh>
      {/* soil */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 14]} />
        <meshStandardMaterial color="#3b2800" />
      </mesh>
      {/* leaves (simple planes) */}
      {[0, 0.7, 1.4, 2.1, 2.8].map((rot, i) => (
        <mesh key={i} position={[0, 0.22 + i * 0.06, 0]} rotation={[0, rot, 0.6 + i * 0.05]}>
          <planeGeometry args={[0.36 - i * 0.02, 0.14]} />
          <meshStandardMaterial color="#16a34a" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ── striped rug ── */
function Rug() {
  const stripes = [
    { scale: [2.0, 0.005, 1.6] as [number,number,number], color: C.rug1 },
    { scale: [1.6, 0.006, 1.2] as [number,number,number], color: C.rug2 },
    { scale: [1.2, 0.007, 0.8] as [number,number,number], color: C.rug3 },
  ]
  return (
    <group position={[0, 0, 0.2]}>
      {stripes.map(({ scale, color }, i) => (
        <mesh key={i} position={[0, i * 0.001, 0]} receiveShadow>
          <boxGeometry args={scale} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

/* ── floor & back wall ── */
function Room() {
  return (
    <>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={C.floor} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 2, -1.6]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color={C.wall} />
      </mesh>
      {/* left wall */}
      <mesh position={[-2.4, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color={C.wall} />
      </mesh>
    </>
  )
}

/* ── chair (simple) ── */
function Chair() {
  return (
    <group position={[0, 0, 0.72]}>
      {/* seat */}
      <Box position={[0, 0.38, 0]} scale={[0.52, 0.06, 0.50]} color={C.chair} castShadow />
      {/* back */}
      <Box position={[0, 0.7, -0.23]} scale={[0.50, 0.6, 0.06]} color={C.chair} castShadow />
      {/* base pole */}
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

/* ── composed room ── */
export default function DeskRoom() {
  return (
    <group>
      <Room />
      <Rug />
      <Chair />
      <Desk />
      <Monitors />
      <CorkBoard />
      <Shelf />
      <CornerPlant />
    </group>
  )
}
