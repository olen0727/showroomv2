'use client'

import dynamic from 'next/dynamic'
import styles from './HeroSection.module.css'

// Load 3D scene client-side only (no SSR for WebGL)
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <span className={styles.dot} />
    </div>
  ),
})

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <Scene3D />
    </section>
  )
}

