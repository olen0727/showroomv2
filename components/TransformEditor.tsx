'use client'

import React, { createContext, useContext, useState } from 'react'
import { Html } from '@react-three/drei'

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
      <div style={{
        position: 'fixed',
        bottom: '-100%',
        left: '20vw',
        zIndex: 99999,
        width: collapsed ? '120px' : '320px',
        background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
        borderRadius: '12px',
        color: '#fff',
        fontFamily: 'sans-serif',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: collapsed ? '0' : '16px', borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.2)', paddingBottom: collapsed ? '0' : '8px' }}>
          {!collapsed && <h3 style={{ margin: 0, fontSize: '16px' }}>3D 屬性調整器</h3>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: '#333',
              border: '1px solid #555',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              width: collapsed ? '100%' : 'auto'
            }}
          >
            {collapsed ? '展開設定' : '收合'}
          </button>
        </div>

        {!collapsed && (
          <>
            <select
              value={target}
              onChange={e => setSelected(e.target.value)}
              style={{ width: '100%', marginBottom: '20px', padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', outline: 'none' }}
            >
              {names.map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <div style={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto', paddingRight: '4px' }}>
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
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>{name}</div>
      {values.map((v: number, i: number) => {
        const valueNum = isNaN(v) ? 0 : v
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '12px' }}>
            <label style={{ width: '24px', fontWeight: 'bold', color: i === 0 ? '#ff5555' : i === 1 ? '#55ff55' : '#5555ff' }}>{axes[i]}</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={valueNum}
              onChange={e => update(i, parseFloat(e.target.value))}
              style={{ flex: 1, margin: '0 12px', accentColor: '#4ade80' }}
            />
            <input
              type="number"
              value={Number(valueNum).toFixed(2)}
              onChange={e => update(i, parseFloat(e.target.value))}
              step={step}
              style={{ width: '64px', padding: '4px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', textAlign: 'right', outline: 'none' }}
            />
          </div>
        )
      })}
    </div>
  )
}
