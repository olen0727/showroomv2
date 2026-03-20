'use client'

import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import { useScrollProgress } from './ScrollProgressContext'

useGLTF.preload('/models/meshy2.glb')

/* 人物位置參數區，可設定 0.10~0.25 期間的移動軌跡 */
export const CHAR_POS = {
  start: [2, -1, 0] as [number, number, number], // 坐著看書時的初始位置 
  end: [0, -1, 0] as [number, number, number], // 起立後完成走動準備的位置 (您可以自由修改此陣列來決定他起立後挪動到哪邊)
}

const posStart = new THREE.Vector3(...CHAR_POS.start)
const posEnd = new THREE.Vector3(...CHAR_POS.end)

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
    // console.log('Current scroll offset:', offset)
    const dozeAction = actions['Sit_and_Doze_Off']
    const sitAction = actions['Sit_to_standTransition_Female_2']
    const walkAction = actions['Walking']
    if (!dozeAction || !sitAction || !walkAction || !groupRef.current) return

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
      groupRef.current.position.copy(posStart) // 強制鎖定在起始位置
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

      // 在起立這段 0.10~0.25 期間，讓人物位置從 start 平滑過渡到 end
      groupRef.current.position.lerpVectors(posStart, posEnd, standProgress)
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
      groupRef.current.position.copy(posEnd) // 行走階段到達結束點
    }
  })

  return (
    <group
      ref={groupRef}
      rotation={[0, -0.5, 0]}
    >
      <primitive object={scene} scale={1.0} />
    </group>
  )
}
