'use client'

import { useRef, useEffect, useCallback } from 'react'
import styles from './RoleCards.module.css'

/* ── 三張職能卡片的資料 ── */
const ROLES = [
  {
    id: 'fullstack',
    title: 'FullStack Web Develop',
    subtitle: '零溝通摩擦的跨域效率建築師',
    tags: ['Vue', 'React', 'Python', 'PHP', 'RDB+NoSQL', 'Cloud Platforms', 'SEO', 'a11y'],
    cardClass: 'cardFullstack' as const,
    tagClass: 'tagFullstack' as const,
  },
  {
    id: 'ux',
    title: 'UX Strategist',
    subtitle: '以同理心洞察需求的策略師',
    tags: ['工作坊', '用戶研究', '競品分析', '市場洞察', '服務設計', '原型設計', '商務提案'],
    cardClass: 'cardUx' as const,
    tagClass: 'tagUx' as const,
  },
  {
    id: 'pm',
    title: 'Product Manager',
    subtitle: '精準優先級管理與決策的專案舵手',
    tags: ['需求定義與分析', '策略規劃與執行', '數據分析', '決策力', '團隊溝通與驅動'],
    cardClass: 'cardPm' as const,
    tagClass: 'tagPm' as const,
  },
]

/* ── 工具函式 ── */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function rangeProgress(offset: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (offset - start) / (end - start)))
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/* ── 卡片位置型別（使用 vw / vh 作為位移單位） ── */
type CardPos = { x: number; y: number; scale: number; z: number }

const FRONT: CardPos = { x: 0, y: 20, scale: 1.0, z: 3 }
const BACK_LEFT: CardPos = { x: -30, y: -5, scale: 0.65, z: 1 }
const BACK_RIGHT: CardPos = { x: 30, y: -5, scale: 0.65, z: 1 }

function getCardPos(cardIndex: number, activeIndex: number): CardPos {
  if (cardIndex === activeIndex) return FRONT
  if (cardIndex < activeIndex) return BACK_LEFT
  return BACK_RIGHT
}

function lerpPos(a: CardPos, b: CardPos, t: number): CardPos {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    scale: lerp(a.scale, b.scale, t),
    z: Math.round(lerp(a.z, b.z, t)),
  }
}

/* ── RoleCards HTML Overlay（渲染在 Canvas 外部） ── */
interface RoleCardsOverlayProps {
  scrollOffsetRef: React.RefObject<{ offset: number }>
}

export default function RoleCardsOverlay({ scrollOffsetRef }: RoleCardsOverlayProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const offset = scrollOffsetRef.current.offset

    const appearProgress = rangeProgress(offset, 0.30, 0.45)

    ROLES.forEach((_, index) => {
      const el = cardRefs.current[index]
      if (!el) return

      if (appearProgress <= 0) {
        el.style.opacity = '0'
        el.style.transform = 'translate(-50%, 100%) scale(0.3)'
        return
      }

      let pos: CardPos
      let opacity = 1

      if (offset < 0.45) {
        // 出場動畫：從下方升起
        const easeAppear = easeInOutCubic(appearProgress)
        const target = getCardPos(index, 0)
        pos = {
          x: lerp(0, target.x, easeAppear),
          y: lerp(50, target.y, easeAppear),
          scale: lerp(0.3, target.scale, easeAppear),
          z: target.z,
        }
        opacity = easeAppear
      } else if (offset < 0.60) {
        const t = easeInOutCubic(rangeProgress(offset, 0.45, 0.60))
        pos = lerpPos(getCardPos(index, 0), getCardPos(index, 1), t)
      } else if (offset < 0.78) {
        const t = easeInOutCubic(rangeProgress(offset, 0.60, 0.78))
        pos = lerpPos(getCardPos(index, 1), getCardPos(index, 2), t)
      } else {
        pos = getCardPos(index, 2)
      }

      el.style.opacity = String(opacity)
      el.style.transform = `translate(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh)) scale(${pos.scale})`
      el.style.zIndex = String(pos.z)
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [scrollOffsetRef])

  // 在 mount 時啟動 rAF 迴圈，unmount 時清除
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div className={styles.overlay}>
      {ROLES.map((role, i) => (
        <div
          key={role.id}
          ref={el => { cardRefs.current[i] = el }}
          className={`${styles.cardWrapper} ${styles[role.cardClass]}`}
          style={{ opacity: 0, transform: 'translate(-50%, 100%) scale(0.3)' }}
        >
          <div className={styles.title}>{role.title}</div>
          <div className={styles.subtitle}>{role.subtitle}</div>
          <div className={styles.tags}>
            {role.tags.map((tag) => (
              <span key={tag} className={styles[role.tagClass]}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
