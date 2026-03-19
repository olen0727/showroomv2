'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import { useScrollProgress } from './ScrollProgressContext'

useGLTF.preload('/models/meshy2.glb')

/*
 * Animations inside meshy2.glb
 *   "Sit_and_Doze_Off" : 坐著看書
 *   "Sit_to_standTransition_Female_2" : 起立
 *   "Walking" : 行走
 *
 * 滾動驅動策略：
 *   offset 0.00 ~ 0.10：維持坐著看書動畫（Sit_and_Doze_Off）
 *   offset 0.10 ~ 0.25：正向播放起立動畫（依 offset 比例推進時間）
 *   offset > 0.25：crossfade 切換至 Walking 動畫持續迴圈
 */
export default function CharacterModel() {
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/meshy2.glb')
  const { actions, mixer } = useAnimations(animations, groupRef)
  const scrollRef = useScrollProgress()

  // 記錄動畫狀態避免重複觸發
  const phaseRef = useRef<'sitting' | 'standing' | 'walking'>('sitting')

  /* 設定陰影與雙面材質 */
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        if (obj.material instanceof MeshStandardMaterial) {
          obj.material.side = THREE.DoubleSide
        }
      }
    })
  }, [scene])

  /* 初始化：設定為坐著看書（Sit_and_Doze_Off） */
  useEffect(() => {
    const dozeAction = actions['Sit_and_Doze_Off']
    if (!dozeAction) return

    dozeAction.reset()
    dozeAction.setLoop(THREE.LoopRepeat, Infinity)
    dozeAction.play()
  }, [actions])

  /* 每幀：依據 scrollOffset 控制動畫階段 */
  useFrame((_state, delta) => {
    const offset = scrollRef.current.offset
    const dozeAction = actions['Sit_and_Doze_Off']
    const sitAction = actions['Sit_to_standTransition_Female_2']
    const walkAction = actions['Walking']
    if (!dozeAction || !sitAction || !walkAction) return

    const clipDuration = sitAction.getClip().duration

    if (offset < 0.10) {
      /* ── 坐姿階段 ── */
      if (phaseRef.current !== 'sitting') {
        // 從其他階段退回坐姿
        walkAction.fadeOut(0.3)
        sitAction.fadeOut(0.3)
        
        dozeAction.reset()
        dozeAction.setLoop(THREE.LoopRepeat, Infinity)
        dozeAction.timeScale = 1
        dozeAction.fadeIn(0.3)
        dozeAction.play()
        phaseRef.current = 'sitting'
      }
    } else if (offset < 0.25) {
      /* ── 起立階段：根據 offset 線性推進動畫時間 ── */
      if (phaseRef.current !== 'standing') {
        if (phaseRef.current === 'walking') walkAction.fadeOut(0.3)
        if (phaseRef.current === 'sitting') dozeAction.fadeOut(0.3)
        
        sitAction.reset()
        sitAction.setLoop(THREE.LoopOnce, 1)
        sitAction.clampWhenFinished = true
        sitAction.timeScale = 0 // 暫停自動播放，手動設定時間
        sitAction.fadeIn(0.3)
        sitAction.play()
        phaseRef.current = 'standing'
      }
      
      // 將 offset 0.10~0.25 映射到動畫時間 0~duration
      const standProgress = (offset - 0.10) / 0.15
      sitAction.time = standProgress * clipDuration
    } else {
      /* ── 行走階段 ── */
      if (phaseRef.current !== 'walking') {
        // 確保起立動畫到結尾
        sitAction.time = clipDuration
        sitAction.fadeOut(0.4)
        dozeAction.fadeOut(0.4)

        walkAction.reset()
        walkAction.setLoop(THREE.LoopRepeat, Infinity)
        walkAction.timeScale = 1
        walkAction.fadeIn(0.4)
        walkAction.play()
        phaseRef.current = 'walking'
      }
    }
  })

  return (
    <group
      ref={groupRef}
      /*
       * position z=0 → 人物初始位置。
       * 模型高度 2.56 units，腳底 y=0，scale=1 合適。
       */
      position={[2, -1, 0]}
      rotation={[0, -0.5, 0]}
    >
      <primitive object={scene} scale={1.0} />
    </group>
  )
}
