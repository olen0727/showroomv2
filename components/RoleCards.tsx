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
    video: '/video/fullstackvideo.mp4',
  },
  {
    id: 'pm',
    title: 'Project Manager',
    subtitle: '優先級決策與管理的專案舵手',
    tags: ['需求定義與分析', '策略規劃與執行', '數據分析', '決策力', '團隊溝通與驅動'],
    cardClass: 'cardPm' as const,
    tagClass: 'tagPm' as const,
    video: '/video/pm.mp4',
  },
  {
    id: 'ux',
    title: 'UX Strategist',
    subtitle: '以同理心洞察需求的策略師',
    tags: ['工作坊', '用戶研究', '競品分析', '市場洞察', '服務設計', '原型設計', '商務提案'],
    cardClass: 'cardUx' as const,
    tagClass: 'tagUx' as const,
    video: '/video/uxe.mp4',
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
type CardPos = { x: number; y: number; scale: number; z: number; opacity: number }

const FRONT: CardPos = { x: 28, y: 0, scale: 1.0, z: 10, opacity: 1.0 }
const BACK_LEFT: CardPos = { x: -10, y: -5, scale: 0.35, z: 1, opacity: 0 }
const BACK_RIGHT: CardPos = { x: 20, y: -5, scale: 0.35, z: 1, opacity: 0 }

function getCardPos(cardIndex: number, activeIndex: number): CardPos {
  const diff = (cardIndex - activeIndex + 3) % 3
  if (diff === 0) return FRONT
  if (diff === 1) return BACK_LEFT
  return BACK_RIGHT
}

function lerpPos(a: CardPos, b: CardPos, t: number): CardPos {
  const lx = lerp(a.x, b.x, t)
  const ly = lerp(a.y, b.y, t)

  // 計算連線向量
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy)

  let x = lx
  let y = ly

  if (len > 0.1) {
    // 單位法向量
    const nx = -dy / len
    const ny = dx / len

    // 求目前這三點位置的重心 (作為預期的「旋轉中心」)
    const cx = (FRONT.x + BACK_LEFT.x + BACK_RIGHT.x) / 3
    const cy = (FRONT.y + BACK_LEFT.y + BACK_RIGHT.y) / 3

    // 線段中點
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2

    // 從重心指向中點的方向
    const toMidX = mx - cx
    const toMidY = my - cy

    // 確保法向量與中點向外推的方向一致 (若內積 < 0 則反向)
    const dot = nx * toMidX + ny * toMidY
    const sign = dot > 0 ? 1 : -1

    // 設定弧度最高點為線段總長的 35% 左右，產生漂亮的圓彎
    const arcHeight = len * 0.35
    const curve = Math.sin(t * Math.PI) * arcHeight * sign

    x = lx + nx * curve
    y = ly + ny * curve
  }

  return {
    x,
    y,
    scale: lerp(a.scale, b.scale, t),
    z: Math.round(lerp(a.z, b.z, t)),
    opacity: lerp(a.opacity, b.opacity, t),
  }
}

/* ── RoleCards HTML Overlay（渲染在 Canvas 外部） ── */
interface RoleCardsOverlayProps {
  scrollOffsetRef: React.RefObject<{ offset: number }>
}

export default function RoleCardsOverlay({ scrollOffsetRef }: RoleCardsOverlayProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const playingRefs = useRef<boolean[]>([false, false, false])
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const offset = scrollOffsetRef.current.offset

    const appearProgress = rangeProgress(offset, 0.50, 0.65)

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

      if (offset < 0.65) {
        // 出場動畫：從下方升起
        const easeAppear = easeInOutCubic(appearProgress)
        const target = getCardPos(index, 0)
        pos = {
          x: lerp(0, target.x, easeAppear),
          y: lerp(50, target.y, easeAppear),
          scale: lerp(0.3, target.scale, easeAppear),
          z: target.z,
          opacity: target.opacity,
        }
        opacity = easeAppear * pos.opacity
      } else if (offset < 0.80) {
        const t = easeInOutCubic(rangeProgress(offset, 0.65, 0.80))
        pos = lerpPos(getCardPos(index, 0), getCardPos(index, 1), t)
        opacity = pos.opacity
      } else if (offset < 0.95) {
        const t = easeInOutCubic(rangeProgress(offset, 0.80, 0.95))
        pos = lerpPos(getCardPos(index, 1), getCardPos(index, 2), t)
        opacity = pos.opacity
      } else {
        pos = getCardPos(index, 2)
        opacity = pos.opacity
      }

      el.style.opacity = String(opacity)
      el.style.transform = `translate(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh)) scale(${pos.scale})`
      el.style.zIndex = String(pos.z)
      /*影片播放條件*/
      const isFront = Math.abs(pos.x - FRONT.x) < 10 && Math.abs(pos.y - FRONT.y) < 10 && opacity > 0.6
      const videoEl = videoRefs.current[index]
      if (videoEl) {
        if (isFront && !playingRefs.current[index]) {
          playingRefs.current[index] = true
          videoEl.play().catch((e) => console.log('Video play error:', e))
        } else if (!isFront && playingRefs.current[index]) {
          playingRefs.current[index] = false
          videoEl.pause()
        }
      }
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
          className={styles.cardWrapper}
          style={{ opacity: 0, transform: 'translate(-50%, 100%) scale(0.3)' }}
        >
          {/* 視窗 1：影片卡片 */}
          <div className={`${styles.videoCard} ${styles[role.cardClass]}`}>
            <video
              ref={el => { videoRefs.current[i] = el }}
              src={role.video}
              className={styles.videoPlayer}
              muted
              playsInline
              loop
            />
          </div>

          {/* 視窗 2：資訊卡片 */}
          <div className={`${styles.contentCard} ${styles[role.cardClass]}`}>
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
        </div>
      ))}
    </div>
  )
}
