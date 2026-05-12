import { useState } from 'react'
import ShaderShowcase from '../components/ui/hero'

const prototypes = [
  {
    id: 'shader-hero',
    label: 'Mesh Gradient Hero',
    description: 'Animated GPU shaders with interactive mesh gradients.',
    component: ShaderShowcase,
  },
]

export default function Prototypes() {
  const [active, setActive] = useState(null)

  if (active) {
    const Proto = prototypes.find(p => p.id === active)?.component
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
        <button
          onClick={() => setActive(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 201,
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          ✕ Close
        </button>
        <Proto />
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Prototypes</h1>
      <p>Interactive experiments, animations, and flows worth playing with.</p>
      <div style={{ marginTop: '2.5rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {prototypes.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              textAlign: 'left',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-brand-300)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(105,65,198,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--fg)', marginBottom: '0.5rem' }}>{label}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.6 }}>{description}</p>
            <p style={{ marginTop: '1rem', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600 }}>Open →</p>
          </button>
        ))}
      </div>
    </div>
  )
}
