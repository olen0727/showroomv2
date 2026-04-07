'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  // 確保滾動位置在頂部
  useEffect(() => {
    if (!isReady) {
      window.scrollTo(0, 0)
    }
  }, [isReady])

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
