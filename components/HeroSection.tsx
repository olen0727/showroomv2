'use client'

import dynamic from 'next/dynamic'

// Load 3D scene client-side only (no SSR for WebGL)
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div style={styles.loading}>
      <span style={styles.dot} />
    </div>
  ),
})

export default function HeroSection() {
  return (
    <section style={styles.hero}>
      <Scene3D />
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  loading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5ede3',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#f97316',
    display: 'block',
  },
}
