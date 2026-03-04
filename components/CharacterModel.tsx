'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Group } from 'three'
import { gsap } from 'gsap'

useGLTF.preload('/models/character.glb')

export default function CharacterModel() {
  const { scene } = useGLTF('/models/character.glb')
  const groupRef = useRef<Group>(null)

  useEffect(() => {
    if (!groupRef.current) return
    // Entrance animation — drop in from above
    gsap.fromTo(
      groupRef.current.position,
      { y: 4 },
      { y: 0, duration: 1.2, ease: 'bounce.out', delay: 0.8 }
    )
    gsap.fromTo(
      groupRef.current,
      { visible: false } as any,
      { visible: true, duration: 0 }
    )

    // Subtle idle float
    gsap.to(groupRef.current.position, {
      y: 0.04,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    })
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, Math.PI * 0.05, 0]}>
      <primitive
        object={scene}
        scale={1.0}
        castShadow
        receiveShadow
      />
    </group>
  )
}
