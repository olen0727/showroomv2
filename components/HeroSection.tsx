'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Load 3D scene client-side only (no SSR for WebGL)
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div style={styles.sceneLoading}>
      <div style={styles.loadingDot} />
    </div>
  ),
})

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    const els = textRef.current.querySelectorAll('[data-anim]')
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.5,
      }
    )
  }, [])

  return (
    <section style={styles.hero}>
      {/* Left — text */}
      <div ref={textRef} style={styles.textSide}>
        <h1 style={styles.name} data-anim>
          Your
          <br />
          Name
        </h1>
        <div style={styles.badge} data-anim>
          FULL STACK DEVELOPER
        </div>
        <p style={styles.tagline} data-anim>
          Building immersive web experiences with<br />Three.js, GSAP &amp; Next.js
        </p>
      </div>

      {/* Right — 3D scene */}
      <div style={styles.sceneSide}>
        <Scene3D />
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '0 5vw',
    overflow: 'hidden',
    position: 'relative',
  },
  textSide: {
    flex: '0 0 42%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    zIndex: 2,
  },
  name: {
    fontSize: 'clamp(52px, 7vw, 96px)',
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    color: '#1a1a1a',
    opacity: 0,
  },
  badge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    background: '#1e3a8a',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    padding: '7px 16px',
    borderRadius: '4px',
    opacity: 0,
  },
  tagline: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#555',
    maxWidth: '320px',
    opacity: 0,
  },
  sceneSide: {
    flex: 1,
    height: '100vh',
    position: 'relative',
  },
  sceneLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#f97316',
    animation: 'pulse 1s ease-in-out infinite',
  },
}
