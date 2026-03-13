'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import { gsap } from 'gsap'

useGLTF.preload('/models/meshy.glb')

/*
 * Animations inside Meshy_AI_Meshy_Merged_Animations.glb
 *   [0] "Running"
 *   [1] "Sit_to_standTransition_Female_2"   ← frame 0 = sitting, end = standing
 *   [2] "Walking"
 *
 * Strategy:
 *   1. Play "Sit_to_standTransition_Female_2" reversed (timeScale -1)
 *      so the character animates FROM standing INTO sitting as entrance.
 *   2. When the reverse playback ends (character fully seated), pause there.
 *   3. Subtle GSAP idle float on the whole group.
 */
export default function CharacterModel() {
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/meshy.glb')
  const { actions } = useAnimations(animations, groupRef)

  /* Shadow + double-sided material */
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow    = true
        obj.receiveShadow = true
        if (obj.material instanceof MeshStandardMaterial) {
          obj.material.side = THREE.DoubleSide
        }
      }
    })
  }, [scene])

  /* Animation playback */
  useEffect(() => {
    const sitAction = actions['Sit_to_standTransition_Female_2']
    if (!sitAction) return

    // Start at the END of the clip (standing pose) and play in reverse
    // so it animates: standing → sitting (entrance effect).
    sitAction.reset()
    sitAction.setLoop(THREE.LoopOnce, 1)
    sitAction.clampWhenFinished = true   // hold last frame (= sitting pose)
    sitAction.timeScale = -1             // reverse
    sitAction.time = sitAction.getClip().duration  // start from end
    sitAction.play()
  }, [actions])

  /* GSAP entrance (group drops in) + idle float */
  useEffect(() => {
    if (!groupRef.current) return

    groupRef.current.position.set(0, 3, 0)

    gsap.to(groupRef.current.position, {
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.5,
    })

    // Idle: very subtle up-down float after entrance
    gsap.to(groupRef.current.position, {
      y: 0,
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.0,
    })
  }, [])

  return (
    <group
      ref={groupRef}
      /*
       * Position z=0.35 → character sits in front of the desk.
       * The model height is 2.56 units with feet at y=0, so scale=1 is fine.
       * rotation Y = Math.PI → faces the monitors.
       */
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive object={scene} scale={1.0} />
    </group>
  )
}
