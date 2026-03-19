'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollProgress } from './ScrollProgressContext'

/* ── 虛擬世界背景與網格參數設定區 ── */
export const VIRTUAL_BG_CONFIG = {
  startOffset: 0.30,  // 開始漸變的時機 (人物剛開始起立)
  endOffset: 0.40,    // 完成漸變的時機 (雷達圖與卡片出現時)

  // 顏色設定
  colorStart: '#f5ede3', // 亮色起始背景 (對齊原有背景)
  colorEnd: '#020617',   // 結束的虛擬深藍色背景 (slate-950)

  // 網格透視（消失點）與地平線參數
  gridY: -1.1,           // 網格(地平線) 高度，調整此值可升降地平線
  gridRotation: [-0.25, -0.5, 0] as [number, number, number], // 調整此 [X, Y, Z] 可改變網格的傾斜角度即「透視消失點」的方向
  gridSize: 100,         // 網格總邊長
  cellSize: 0.5,         // 小格單位大小
  cellColor: '#1e3a8a',  // 小格線顏色 (blue-900)
  sectionSize: 2.5,      // 大格單位大小
  sectionColor: '#3b82f6', // 大格線顏色 (blue-500)
  fadeDistance: 20,      // 地平線邊緣向螢幕深處的淡出距離
  centerOffset: [0, 0] as [number, number], // 網格中心點 X, Z 偏移
}

export default function VirtualBackground() {
  const scrollRef = useScrollProgress()
  const gridMaterialRef = useRef<any>(null)
  const groupRef = useRef<THREE.Group>(null)

  const cStart = useMemo(() => new THREE.Color(VIRTUAL_BG_CONFIG.colorStart), [])
  const cEnd = useMemo(() => new THREE.Color(VIRTUAL_BG_CONFIG.colorEnd), [])
  const currentColor = useMemo(() => new THREE.Color(), [])

  useFrame(({ scene }) => {
    const offset = scrollRef.current.offset
    // 計算進度 (0 -> 1)
    const progress = Math.max(0, Math.min(1, (offset - VIRTUAL_BG_CONFIG.startOffset) / (VIRTUAL_BG_CONFIG.endOffset - VIRTUAL_BG_CONFIG.startOffset)))

    // 1. 動態改變場景背景顏色
    if (!scene.background || !(scene.background instanceof THREE.Color)) {
      scene.background = cStart.clone()
    }

    // 平滑顏色插值
    currentColor.copy(cStart).lerp(cEnd, progress)
    scene.background.copy(currentColor)

    // 2. 網格淡入 (從 0 漸變到 1) 與修復深度穿模
    if (gridMaterialRef.current) {
      gridMaterialRef.current.opacity = progress
      gridMaterialRef.current.depthWrite = false // 強制不寫入深度，讓後畫的人物永遠蓋過它
    }
    if (groupRef.current) {
      groupRef.current.visible = progress > 0
    }
  })

  return (
    <group
      ref={groupRef}
      position={[VIRTUAL_BG_CONFIG.centerOffset[0], VIRTUAL_BG_CONFIG.gridY, VIRTUAL_BG_CONFIG.centerOffset[1]]}
      rotation={VIRTUAL_BG_CONFIG.gridRotation}
    >
      <Grid
        renderOrder={-1}
        ref={(grid: any) => { if (grid) gridMaterialRef.current = grid.material }}
        args={[VIRTUAL_BG_CONFIG.gridSize, VIRTUAL_BG_CONFIG.gridSize]}
        cellSize={VIRTUAL_BG_CONFIG.cellSize}
        cellThickness={0.8}
        cellColor={VIRTUAL_BG_CONFIG.cellColor}
        sectionSize={VIRTUAL_BG_CONFIG.sectionSize}
        sectionThickness={1.5}
        sectionColor={VIRTUAL_BG_CONFIG.sectionColor}
        fadeDistance={VIRTUAL_BG_CONFIG.fadeDistance}
        fadeStrength={1}
      />
    </group>
  )
}
