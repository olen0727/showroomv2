'use client'

import React, { createContext, useContext, useState } from 'react'
import { Html } from '@react-three/drei'
import styles from './TransformEditor.module.css'

export type Transform = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

export type TransformState = Record<string, Transform>

const TransformContext = createContext<{
  transforms: TransformState
  updateValue: (name: string, type: keyof Transform, axis: number, value: number) => void
} | null>(null)

export function useTransformStore(initial: TransformState) {
  const [transforms, setTransforms] = useState<TransformState>(initial)

  const updateValue = (name: string, type: keyof Transform, axis: number, value: number) => {
    setTransforms(prev => {
      const current = prev[name]
      if (!current) return prev
      const newValues = [...current[type]] as [number, number, number]
      newValues[axis] = value
      return { ...prev, [name]: { ...current, [type]: newValues } }
    })
  }

  return { transforms, updateValue }
}

export const TransformProvider = TransformContext.Provider

export function useTransform(name: string, fallback: Transform): Transform {
  const ctx = useContext(TransformContext)
  if (!ctx) return fallback
  return ctx.transforms[name] || fallback
}

export function TransformEditorUI({ enabled }: { enabled: boolean }) {
  const ctx = useContext(TransformContext)
  const [selected, setSelected] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  if (!enabled || !ctx) return null
  const { transforms, updateValue } = ctx
  const names = Object.keys(transforms)
  if (names.length === 0) return null

  const target = selected || names[0]
  const tr = transforms[target]

  return (
    <Html>
      <div className={`${styles.container} ${collapsed ? styles.containerCollapsed : styles.containerExpanded}`}>
        <div className={`${styles.header} ${collapsed ? styles.headerCollapsed : styles.headerExpanded}`}>
          {!collapsed && <h3 className={styles.title}>3D 屬性調整器</h3>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`${styles.toggleButton} ${collapsed ? styles.toggleButtonCollapsed : styles.toggleButtonExpanded}`}
          >
            {collapsed ? '展開設定' : '收合'}
          </button>
        </div>

        {!collapsed && (
          <>
            <select
              value={target}
              onChange={e => setSelected(e.target.value)}
              className={styles.selectTarget}
            >
              {names.map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <div className={styles.scrollArea}>
              <TransformGroup name="Position (位移)" type="position" values={tr.position} update={(a: number, v: number) => updateValue(target, 'position', a, v)} min={-20} max={20} step={0.01} />
              <TransformGroup name="Rotation (旋轉)" type="rotation" values={tr.rotation} update={(a: number, v: number) => updateValue(target, 'rotation', a, v)} min={-Math.PI * 2} max={Math.PI * 2} step={0.01} />
              <TransformGroup name="Scale (縮放)" type="scale" values={tr.scale} update={(a: number, v: number) => updateValue(target, 'scale', a, v)} min={0} max={20} step={0.01} />
            </div>
          </>
        )}
      </div>
    </Html>
  )
}

function TransformGroup({ name, values, update, min, max, step }: any) {
  const axes = ['X', 'Y', 'Z']
  return (
    <div className={styles.groupContainer}>
      <div className={styles.groupTitle}>{name}</div>
      {values.map((v: number, i: number) => {
        const valueNum = isNaN(v) ? 0 : v
        const labelClass = i === 0 ? styles.axisLabelX : i === 1 ? styles.axisLabelY : styles.axisLabelZ;
        
        return (
          <div key={i} className={styles.axisRow}>
            <label className={`${styles.axisLabel} ${labelClass}`}>{axes[i]}</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={valueNum}
              onChange={e => update(i, parseFloat(e.target.value))}
              className={styles.rangeInput}
            />
            <input
              type="number"
              value={Number(valueNum).toFixed(2)}
              onChange={e => update(i, parseFloat(e.target.value))}
              step={step}
              className={styles.numberInput}
            />
          </div>
        )
      })}
    </div>
  )
}
