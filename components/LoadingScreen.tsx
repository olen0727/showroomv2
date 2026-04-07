'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // 當進度達到 100 時，加入一點點延遲再讓畫面向下消失
  useEffect(() => {
    if (progress === 100 && !isLoaded) {
      setIsLoaded(true)
      
      // 延遲 500ms 後開始淡出動畫
      const timeout = setTimeout(() => {
        setIsHidden(true)
      }, 500)
      
      return () => clearTimeout(timeout)
    }
  }, [progress, isLoaded])

  if (isHidden) return null

  // 確保避免閃動，如果尚未進入加載狀態我們顯示 0
  const displayProgress = Math.floor(progress || 0)

  return (
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
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
