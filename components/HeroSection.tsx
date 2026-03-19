'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import styles from './HeroSection.module.css'
import RoleCardsOverlay from './RoleCards'
import CharacterStatsOverlay from './CharacterStats'

// 3D 場景僅在客戶端載入（WebGL 不支援 SSR）
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <span className={styles.dot} />
    </div>
  ),
})

/**
 * Hero Section 主元件
 * 包含 3D Canvas 場景 + HTML 職能卡片 Overlay
 * 兩者透過共享的 scrollOffsetRef 同步滾動進度
 */
export default function HeroSection() {
  // 共享的 scroll offset ref，Canvas 內更新、Canvas 外讀取
  const scrollOffsetRef = useRef({ offset: 0 })

  return (
    <section className={styles.hero}>
      <Scene3D scrollOffsetRef={scrollOffsetRef} />
      <CharacterStatsOverlay scrollOffsetRef={scrollOffsetRef} />
      <RoleCardsOverlay scrollOffsetRef={scrollOffsetRef} />
    </section>
  )
}
