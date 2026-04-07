'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { progress, active } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // 進度達到 100 時，進入 Loaded 狀態
  useEffect(() => {
    if (progress >= 100) {
      setIsLoaded(true)
    }
  }, [progress])

  // 進入 Loaded 狀態後，等待 500ms 開始淡出
  useEffect(() => {
    if (isLoaded && !isFadingOut) {
      const timeoutFade = setTimeout(() => {
        setIsFadingOut(true)
        if (onComplete) onComplete()
      }, 500)
      return () => clearTimeout(timeoutFade)
    }
  }, [isLoaded, isFadingOut, onComplete])

  // 開始淡出後，等待 800ms 動畫結束再隱藏
  useEffect(() => {
    if (isFadingOut && !isHidden) {
      const timeoutHide = setTimeout(() => {
        setIsHidden(true)
      }, 800)
      return () => clearTimeout(timeoutHide)
    }
  }, [isFadingOut, isHidden])

  if (isHidden) return null

  // 確保避免閃動，如果尚未進入加載狀態我們顯示 0
  const displayProgress = Math.floor(progress || 0)

  return (
    <div className={`${styles.container} ${isFadingOut ? styles.loaded : ''}`}>
      <div className={styles.content}>
        <div className={styles.title}>INITIALIZING_SYSTEM</div>
        <div className={styles.progressBarWrapper}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <div className={styles.percentage}>{displayProgress}%</div>
        <div className={styles.statusText}>
          {isLoaded ? 'ACCESS GRANTED' : 'LOADING ASSETS...'}
        </div>
      </div>
    </div>
  )
}
