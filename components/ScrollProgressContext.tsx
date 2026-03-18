'use client'

import { createContext, useContext, useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/**
 * 滾動進度 Context
 * 提供 scrollOffset (0~1) 給場景中的子元件。
 * 同時可將 offset 同步至外部 ref，供 Canvas 外的元件使用。
 */

/* ── 型別 ── */
interface ScrollProgressRef {
  offset: number
}

const ScrollProgressContext = createContext<React.RefObject<ScrollProgressRef> | null>(null)

/* ── Provider ── */
interface ScrollProgressProviderProps {
  children: React.ReactNode
  /** 可選的外部 ref，將 offset 同步輸出給 Canvas 外的元件（如 RoleCards overlay） */
  externalRef?: React.RefObject<ScrollProgressRef>
}

export function ScrollProgressProvider({ children, externalRef }: ScrollProgressProviderProps) {
  const scroll = useScroll()
  const progressRef = useRef<ScrollProgressRef>({ offset: 0 })

  useFrame(() => {
    progressRef.current.offset = scroll.offset
    // 同步給外部 ref
    if (externalRef?.current) {
      externalRef.current.offset = scroll.offset
    }
  })

  return (
    <ScrollProgressContext.Provider value={progressRef}>
      {children}
    </ScrollProgressContext.Provider>
  )
}

/* ── 消費 Hook（Canvas 內部使用） ── */
export function useScrollProgress(): React.RefObject<ScrollProgressRef> {
  const ctx = useContext(ScrollProgressContext)
  if (!ctx) {
    throw new Error('useScrollProgress 必須在 ScrollProgressProvider 內使用')
  }
  return ctx
}

export default ScrollProgressContext
