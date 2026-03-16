'use client'

import { Html } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Group } from 'three'
import { gsap } from 'gsap'
import styles from './HeroText3D.module.css'

/*
 * Text rendered as HTML inside 3D world-space.
 * Html with `transform` places the div in true perspective —
 * it scales and shifts as the camera rotates, giving the
 * "floating inside the scene" feel.
 *
 * distanceFactor keeps text readable at any zoom level.
 */
export default function HeroText3D() {
  const groupRef = useRef<Group>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return
    const els = wrapRef.current.querySelectorAll<HTMLElement>('[data-in]')

    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.6,
      }
    )

    // Subtle vertical float
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: '+=0.08',
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })
    }
  }, [])

  return (
    <group ref={groupRef} position={[-2.4, 1.4, 2.0]}>
      <Html
        transform={false}
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        zIndexRange={[10, 20]}
      >
        <div ref={wrapRef} className={styles.container}>
          {/* Name */}
          <h1 className={styles.name} style={{ opacity: 0 }} data-in>
            Your
            <br />
            Name
          </h1>

          {/* Badge */}
          <div className={styles.badge} style={{ opacity: 0 }} data-in>
            FULL STACK DEVELOPER
          </div>

          {/* Tagline */}
          <p className={styles.tagline} style={{ opacity: 0 }} data-in>
            Building immersive experiences
            <br />
            with Three.js · GSAP · Next.js
          </p>
        </div>
      </Html>
    </group>
  )
}

