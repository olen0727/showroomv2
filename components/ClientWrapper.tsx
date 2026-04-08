'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  // 裝置尺寸檢查
  useEffect(() => {
    const checkSize = () => {
      setIsSupported(window.innerWidth >= 1024)
    }
    
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // 確保滾動位置在頂部
  useEffect(() => {
    if (!isReady && isSupported) {
      window.scrollTo(0, 0)
    }
  }, [isReady, isSupported])

  // 初始狀態，避免伺服器端渲染時發生 hydration 錯誤
  if (isSupported === null) {
    return (
      <div style={{ backgroundColor: 'var(--bg)', width: '100vw', height: '100vh', position: 'fixed', inset: 0 }} />
    )
  }

  // 裝置尺寸不支援時顯示提示
  if (!isSupported) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'var(--bg)', 
        color: 'var(--text-dark)', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 99999,
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          marginBottom: '1.5rem',
          padding: '1rem',
          border: '1px solid currentColor',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '40px', height: '40px', strokeWidth: 1.5 }}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>
          不支援此裝置解析度
        </h1>
        <p style={{ opacity: 0.7, maxWidth: '400px', lineHeight: 1.6, fontSize: '0.95rem' }}>
          僅支援1024以上解析度裝置瀏覽，確保您獲得最好的瀏覽體驗。<br/>
          請使用電腦或將平板轉為橫向瀏覽。
        </p>
      </div>
    )
  }

  return (
    <>
      <LoadingScreen onComplete={() => setIsReady(true)} />
      <main 
        style={{
          opacity: isReady ? 1 : 0,
          pointerEvents: isReady ? 'auto' : 'none',
          height: isReady ? 'auto' : '100vh',
          overflow: isReady ? 'visible' : 'hidden',
          transition: 'opacity 0.8s cubic-bezier(0.87, 0, 0.13, 1)'
        }}
      >
        {children}
      </main>
    </>
  )
}
