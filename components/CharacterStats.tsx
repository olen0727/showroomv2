'use client'

import { useRef, useCallback, useEffect } from 'react'
import styles from './CharacterStats.module.css'

const STATS = [
  { en: 'Communication', zh: '溝通', value: 7 },
  { en: 'Logic', zh: '邏輯', value: 10 },
  { en: 'Collaboration', zh: '協作', value: 7 },
  { en: 'Resilience', zh: '抗壓力', value: 9 },
  { en: 'Curiosity', zh: '好奇心', value: 9 },
  { en: 'Empathy', zh: '同理心', value: 7 },
]

export const STATS_POSITION = {
  left: '8vw',
  top: '20vh',
  width: '400px'
}

function rangeProgress(offset: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (offset - start) / (end - start)))
}

interface CharacterStatsOverlayProps {
  scrollOffsetRef: React.RefObject<{ offset: number }>
}

export default function CharacterStatsOverlay({ scrollOffsetRef }: CharacterStatsOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 記錄所有方塊和數字的對應DOM，以便高效刷新
  const statsRefs = useRef<Array<{ blocks: HTMLDivElement[]; val: HTMLDivElement | null }>>([])
  const rafRef = useRef<number>(0)

  // 初始化 refs
  if (statsRefs.current.length === 0) {
    STATS.forEach(() => {
      statsRefs.current.push({ blocks: [], val: null })
    })
  }

  const animate = useCallback(() => {
    if (!scrollOffsetRef.current) return
    const offset = scrollOffsetRef.current.offset
    // 出現時機 0.35 ~ 0.50
    const progress = rangeProgress(offset, 0.35, 0.50)

    if (containerRef.current) {
      containerRef.current.style.opacity = progress > 0 ? String(Math.min(1, progress * 4)) : '0'
      // 滑動進場效果
      const yOffset = (1 - progress) * 40
      containerRef.current.style.transform = `translateY(${yOffset}px)`
    }

    if (progress > 0) {
      STATS.forEach((stat, i) => {
        // 設定每項能力依序長出的微小延遲
        const delay = i * 0.1
        const itemProgress = rangeProgress(progress, delay, 1.0)

        // 算出目前該亮的分數 (整數)
        const currentVal = Math.floor(stat.value * itemProgress)

        const refObj = statsRefs.current[i]
        if (refObj) {
          // 動態切換方塊燈亮
          refObj.blocks.forEach((block, bIndex) => {
            if (block) {
              if (bIndex < currentVal) {
                block.className = `${styles.block} ${styles.blockActive}`
              } else {
                block.className = styles.block
              }
            }
          })

          // 更新跳動數字
          if (refObj.val) {
            refObj.val.innerText = String(currentVal)
          }
        }
      })
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [scrollOffsetRef])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return (
    <div
      ref={containerRef}
      className={styles.panel}
      style={{ left: STATS_POSITION.left, top: STATS_POSITION.top, width: STATS_POSITION.width, opacity: 0 }}
    >
      <div className={styles.highlight} />
      <h2 className={styles.title}>Personal Traits</h2>

      <div className={styles.content}>
        {STATS.map((stat, i) => (
          <div key={stat.en} className={styles.statRow}>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>
                {stat.en} <span className={styles.zhLabel}>{stat.zh}</span>
              </div>
              <div className={styles.blocks}>
                {Array.from({ length: 10 }).map((_, bIndex) => (
                  <div
                    key={bIndex}
                    ref={el => { if (el) statsRefs.current[i].blocks[bIndex] = el }}
                    className={styles.block}
                  />
                ))}
              </div>
            </div>
            <div
              className={styles.statValue}
              ref={el => { if (el) statsRefs.current[i].val = el }}
            >
              0
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
