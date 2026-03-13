'use client'

import { Html } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Group } from 'three'
import { gsap } from 'gsap'

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
        <div ref={wrapRef} style={styles.container}>
          {/* Name */}
          <h1 style={{ ...styles.name, opacity: 0 }} data-in>
            Your
            <br />
            Name
          </h1>

          {/* Badge */}
          <div style={{ ...styles.badge, opacity: 0 }} data-in>
            FULL STACK DEVELOPER
          </div>

          {/* Tagline */}
          <p style={{ ...styles.tagline, opacity: 0 }} data-in>
            Building immersive experiences
            <br />
            with Three.js · GSAP · Next.js
          </p>
        </div>
      </Html>
    </group>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '420px',
  },
  name: {
    fontSize: '80px',
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    color: '#1a1a1a',
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    textShadow: '0 2px 20px rgba(0,0,0,0.06)',
  },
  badge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    background: '#1e3a8a',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    padding: '8px 18px',
    borderRadius: '5px',
  },
  tagline: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: '#5a5a5a',
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
}
