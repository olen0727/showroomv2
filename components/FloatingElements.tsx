'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { gsap } from 'gsap'

/* ── picture frame (floating top-right) ── */
function PictureFrame({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null)

  useEffect(() => {
    if (!ref.current) return
    // entrance
    gsap.fromTo(
      ref.current.position,
      { x: position[0] + 1.5, y: position[1] - 1, z: position[2] },
      { x: position[0], y: position[1], z: position[2], duration: 1.1, ease: 'back.out(1.4)', delay: 1.2 }
    )
    // idle float
    gsap.to(ref.current.position, {
      y: position[1] + 0.12,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.4,
    })
    gsap.to(ref.current.rotation, {
      z: 0.06,
      duration: 3.0,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.4,
    })
  }, [position])

  return (
    <group ref={ref} position={position}>
      {/* outer frame */}
      <mesh>
        <boxGeometry args={[0.36, 0.30, 0.04]} />
        <meshStandardMaterial color="#a8c4e0" />
      </mesh>
      {/* inner white mat */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.28, 0.22]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* landscape icon (mountain + sun) */}
      <mesh position={[0, -0.04, 0.025]}>
        <planeGeometry args={[0.16, 0.1]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* sun circle */}
      <mesh position={[0.04, 0.02, 0.026]}>
        <circleGeometry args={[0.025, 12]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  )
}

/* ── sticky note floating (chat bubble style) ── */
function ChatBubble({ position, color = '#93c5fd' }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<Group>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 0.7, ease: 'back.out(2)', delay: 1.6 }
    )
    gsap.to(ref.current.position, {
      y: position[1] + 0.1,
      duration: 1.8 + Math.random() * 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.6 + Math.random() * 0.5,
    })
  }, [position])

  return (
    <group ref={ref} position={position} scale={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.2, 0.15, 0.03]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* dots */}
      {[-0.05, 0, 0.05].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.018]}>
          <circleGeometry args={[0.014, 8]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      ))}
    </group>
  )
}

/* ── small code tag ── */
function CodeTag({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.position,
      { y: position[1] - 1.5 },
      { y: position[1], duration: 1.0, ease: 'back.out(1.6)', delay: 1.8 }
    )
    gsap.to(ref.current.rotation, {
      y: Math.PI * 2,
      duration: 8,
      ease: 'none',
      repeat: -1,
      delay: 3,
    })
  }, [position])

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.26, 0.16, 0.03]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* bracket symbols (orange lines) */}
      {[-0.07, 0.07].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.018]}>
          <planeGeometry args={[0.03, 0.1]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── composed floating elements ── */
export default function FloatingElements() {
  return (
    <group>
      {/* Picture frame — right side, floating */}
      <PictureFrame position={[1.5, 1.9, -0.6]} />

      {/* Chat bubble — above left shoulder */}
      <ChatBubble position={[-0.8, 2.1, 0.4]} color="#bfdbfe" />

      {/* Floating code tag — upper right */}
      <CodeTag position={[1.2, 2.0, 0.2]} />
    </group>
  )
}
