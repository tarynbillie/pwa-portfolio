import { useState, useEffect } from 'react'
import { Eye, EyeOff, ExternalLink } from 'lucide-react'

const NAV_GROUPS = [
  {
    group: 'Foundation',
    items: [
      { id: 'colors',     label: 'Colors' },
      { id: 'typography', label: 'Typography' },
    ],
  },
  {
    group: 'Elements',
    items: [
      { id: 'buttons',  label: 'Buttons' },
      { id: 'inputs',   label: 'Inputs' },
      { id: 'tags',     label: 'Tags & Labels' },
      { id: 'tabs',     label: 'Tabs' },
      { id: 'divider',  label: 'Divider' },
    ],
  },
  {
    group: 'Patterns',
    items: [
      { id: 'outcome-stat',  label: 'Outcome Stat' },
      { id: 'process-step',  label: 'Process Step' },
      { id: 'work-gate',     label: 'Work Gate' },
    ],
  },
]

const ALL_SECTIONS = NAV_GROUPS.flatMap(g => g.items)

const NEUTRAL = [
  { step: '50',  hex: '#fafafa' },
  { step: '100', hex: '#f5f5f5' },
  { step: '200', hex: '#e5e5e5' },
  { step: '300', hex: '#d4d4d4' },
  { step: '400', hex: '#a3a3a3' },
  { step: '500', hex: '#737373' },
  { step: '600', hex: '#525252' },
  { step: '700', hex: '#404040' },
  { step: '800', hex: '#262626' },
  { step: '900', hex: '#171717' },
]

const BRAND = [
  { step: '50',  hex: '#f9f5ff' },
  { step: '100', hex: '#f4ebff' },
  { step: '200', hex: '#e9d7fe' },
  { step: '300', hex: '#d6bbfb' },
  { step: '400', hex: '#b692f6' },
  { step: '500', hex: '#9e77ed' },
  { step: '600', hex: '#7f56d9' },
  { step: '700', hex: '#6941c6' },
  { step: '800', hex: '#53389e' },
  { step: '900', hex: '#42307d' },
]

const SEMANTIC = [
  { name: '--bg',           hex: '#ffffff', label: 'Background' },
  { name: '--surface',      hex: '#fafafa', label: 'Surface' },
  { name: '--fg',           hex: '#171717', label: 'Foreground' },
  { name: '--muted',        hex: '#525252', label: 'Muted' },
  { name: '--border',       hex: '#e5e5e5', label: 'Border' },
  { name: '--accent',       hex: '#6941c6', label: 'Accent' },
  { name: '--accent-hover', hex: '#53389e', label: 'Accent Hover' },
]

const TYPE_SCALE = [
  { token: '--text-sm',    size: '14px', sample: 'The quick brown fox jumps over the lazy dog', weight: 400 },
  { token: '--text-md',    size: '16px', sample: 'The quick brown fox jumps over the lazy dog', weight: 400 },
  { token: '--text-lg',    size: '18px', sample: 'The quick brown fox jumps',                   weight: 400 },
  { token: '--text-xl',    size: '20px', sample: 'The quick brown fox jumps',                   weight: 500 },
  { token: '--display-sm', size: '30px', sample: 'Display Small',                               weight: 600 },
  { token: '--display-md', size: '36px', sample: 'Display Medium',                              weight: 600 },
  { token: '--display-lg', size: '48px', sample: 'Display Large',                               weight: 700 },
  { token: '--display-xl', size: '60px', sample: 'Display XL',                                  weight: 700 },
]

export default function Components() {
  const [activeId, setActiveId] = useState('colors')
  const [pwVisible, setPwVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter(e => e.isIntersecting)
        if (hit.length > 0) setActiveId(hit[0].target.id)
      },
      { rootMargin: '-10% 0px -70% 0px' }
    )
    ALL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="comp-wrap">

      {/* ── Sidebar (desktop) ──────────────────────────────────── */}
      <aside className="comp-sidebar">
        {NAV_GROUPS.map(({ group, items }) => (
          <div key={group} className="comp-sidebar-group">
            <p className="comp-sidebar-group-label">{group}</p>
            {items.map(({ id, label }) => (
              <button
                key={id}
                className={`comp-sidebar-link${activeId === id ? ' comp-sidebar-link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Mobile jump-to select — outside comp-content so it spans full width */}
      <div className="comp-mobile-nav">
        <select
          className="comp-mobile-select"
          value={activeId}
          onChange={e => scrollTo(e.target.value)}
        >
          {NAV_GROUPS.map(({ group, items }) => (
            <optgroup key={group} label={group}>
              {items.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="comp-content">

        {/* Page header */}
        <div className="comp-page-header">
          <span className="comp-page-eyebrow">Design System</span>
          <h1 className="comp-page-title">Component Library</h1>
          <p className="comp-page-desc">
            Every token, element, and pattern that makes up this portfolio — built from scratch
            with Untitled UI's design system and plain CSS custom properties. No component library.
            No UI framework. Just tokens, cascade, and intention.
          </p>
          <div className="comp-page-meta">
            <span className="comp-meta-tag">Vite + React</span>
            <span className="comp-meta-tag">Plain CSS</span>
            <span className="comp-meta-tag">Untitled UI tokens</span>
            <a
              href="https://github.com/tarynbillie/pwa-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="comp-github-link"
            >
              <ExternalLink size={14} />
              View source
            </a>
          </div>
        </div>

        {/* ── Colors ──────────────────────────────────────────── */}
        <section id="colors" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Foundation</p>
            <h2 className="comp-section-title">Colors</h2>
            <p className="comp-section-desc">
              Sourced from Untitled UI. Every value lives as a CSS custom property and is referenced
              only through semantic aliases — no hardcoded hex anywhere in the codebase.
            </p>
          </div>

          <div className="comp-stage comp-stage--col">
            <div className="comp-palette">
              <p className="comp-palette-title">Neutral</p>
              <div className="comp-swatches">
                {NEUTRAL.map(({ step, hex }) => (
                  <div key={step} className="comp-swatch">
                    <div className="comp-swatch-color" style={{ background: hex }} />
                    <span className="comp-swatch-label">{step}</span>
                    <span className="comp-swatch-label">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="comp-palette">
              <p className="comp-palette-title">Brand — Purple</p>
              <div className="comp-swatches">
                {BRAND.map(({ step, hex }) => (
                  <div key={step} className="comp-swatch">
                    <div className="comp-swatch-color" style={{ background: hex }} />
                    <span className="comp-swatch-label">{step}</span>
                    <span className="comp-swatch-label">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="comp-palette">
              <p className="comp-palette-title">Semantic Aliases</p>
              <div className="comp-swatches">
                {SEMANTIC.map(({ name, hex, label }) => (
                  <div key={name} className="comp-swatch comp-swatch--wide">
                    <div className="comp-swatch-color" style={{ background: hex }} />
                    <span className="comp-swatch-label">{label}</span>
                    <span className="comp-swatch-label comp-swatch-label--dim">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Typography ──────────────────────────────────────── */}
        <section id="typography" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Foundation</p>
            <h2 className="comp-section-title">Typography</h2>
            <p className="comp-section-desc">
              Inter across all weights. Eight-step type scale defined as CSS custom properties,
              sourced from Untitled UI.
            </p>
          </div>

          <div className="comp-type-rows">
            {TYPE_SCALE.map(({ token, size, sample, weight }) => (
              <div key={token} className="comp-type-row">
                <div className="comp-type-meta">
                  <span className="comp-type-var">{token}</span>
                  <span className="comp-type-size">{size}</span>
                </div>
                <span
                  className="comp-type-sample"
                  style={{ fontSize: `var(${token})`, fontWeight: weight }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Buttons ─────────────────────────────────────────── */}
        <section id="buttons" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Elements</p>
            <h2 className="comp-section-title">Buttons</h2>
            <p className="comp-section-desc">
              Two variants built on a shared <code>.btn</code> base. Primary uses the accent token;
              secondary uses the border token.
            </p>
          </div>

          <div className="comp-stage">
            <div className="comp-frame">
              <button className="btn btn-primary">Primary button</button>
              <span className="comp-frame-label">.btn.btn-primary</span>
            </div>
            <div className="comp-frame">
              <button className="btn btn-secondary">Secondary button</button>
              <span className="comp-frame-label">.btn.btn-secondary</span>
            </div>
          </div>
        </section>

        {/* ── Inputs ──────────────────────────────────────────── */}
        <section id="inputs" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Elements</p>
            <h2 className="comp-section-title">Inputs</h2>
            <p className="comp-section-desc">
              Text and password inputs with focus, error, and visibility-toggle states — used in the
              Work Gate.
            </p>
          </div>

          <div className="comp-stage">
            <div className="comp-frame">
              <input
                className="work-gate-input"
                type="text"
                placeholder="Default input"
                style={{ maxWidth: 220 }}
                readOnly
              />
              <span className="comp-frame-label">.work-gate-input</span>
            </div>

            <div className="comp-frame">
              <input
                className="work-gate-input work-gate-input--error"
                type="text"
                defaultValue="wrong answer"
                style={{ maxWidth: 220 }}
                readOnly
              />
              <span className="comp-frame-label">.work-gate-input--error</span>
            </div>

            <div className="comp-frame">
              <div className="work-gate-input-wrap" style={{ maxWidth: 220 }}>
                <input
                  className="work-gate-input"
                  type={pwVisible ? 'text' : 'password'}
                  defaultValue="password123"
                  readOnly
                />
                <button
                  type="button"
                  className="work-gate-eye"
                  onClick={() => setPwVisible(v => !v)}
                  aria-label={pwVisible ? 'Hide' : 'Show'}
                >
                  {pwVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <span className="comp-frame-label">Password + visibility toggle</span>
            </div>
          </div>
        </section>

        {/* ── Tags ────────────────────────────────────────────── */}
        <section id="tags" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Elements</p>
            <h2 className="comp-section-title">Tags & Labels</h2>
            <p className="comp-section-desc">
              Used in case study headers to surface category and year at a glance.
            </p>
          </div>

          <div className="comp-stage">
            <div className="comp-frame">
              <span className="case-study-tag">Discovery</span>
              <span className="comp-frame-label">.case-study-tag</span>
            </div>
            <div className="comp-frame">
              <span className="case-study-tag">Settings</span>
              <span className="comp-frame-label">.case-study-tag</span>
            </div>
            <div className="comp-frame">
              <span className="case-study-tag">Compliance</span>
              <span className="comp-frame-label">.case-study-tag</span>
            </div>
            <div className="comp-frame">
              <span className="case-study-year">2026</span>
              <span className="comp-frame-label">.case-study-year</span>
            </div>
          </div>
        </section>

        {/* ── Tabs ────────────────────────────────────────────── */}
        <section id="tabs" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Elements</p>
            <h2 className="comp-section-title">Tabs</h2>
            <p className="comp-section-desc">
              Underline-style navigation used in the Work section subnav. Scrolls horizontally on
              mobile with a hidden scrollbar.
            </p>
          </div>

          <div className="comp-stage comp-stage--col" style={{ padding: 0, background: 'none', border: 'none', gap: '0.75rem' }}>
            <div style={{ borderBottom: '1px solid var(--border)', display: 'flex' }}>
              <button className="work-tab work-tab--active">Discovery</button>
              <button className="work-tab">Settings</button>
              <button className="work-tab">Compliance</button>
              <button className="work-tab">Prototypes</button>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span className="comp-frame-label">.work-tab</span>
              <span className="comp-frame-label">.work-tab.work-tab--active</span>
            </div>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────── */}
        <section id="divider" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Elements</p>
            <h2 className="comp-section-title">Divider</h2>
            <p className="comp-section-desc">A 1px horizontal rule using the border token.</p>
          </div>

          <div className="comp-stage comp-stage--col">
            <hr className="divider" style={{ width: '100%' }} />
            <span className="comp-frame-label">.divider</span>
          </div>
        </section>

        {/* ── Outcome Stat ────────────────────────────────────── */}
        <section id="outcome-stat" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Patterns</p>
            <h2 className="comp-section-title">Outcome Stat</h2>
            <p className="comp-section-desc">
              Stat boxes used in the case study sidebar. Stacks vertically at 3 items; switches
              to a 2×2 grid at 4 using CSS <code>:has()</code> — no JavaScript required.
            </p>
          </div>

          <div className="comp-stage comp-outcome-demo">
            <div className="comp-frame comp-outcome-frame">
              <div className="case-study-outcomes">
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">11</span>
                  <span className="case-study-outcome-label">wallets benchmarked</span>
                </div>
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">3</span>
                  <span className="case-study-outcome-label">features on the roadmap</span>
                </div>
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">20+</span>
                  <span className="case-study-outcome-label">features backlogged</span>
                </div>
              </div>
              <span className="comp-frame-label">3-item vertical stack</span>
            </div>

            <div className="comp-frame comp-outcome-frame">
              <div className="case-study-outcomes">
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">11</span>
                  <span className="case-study-outcome-label">wallets benchmarked</span>
                </div>
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">17</span>
                  <span className="case-study-outcome-label">requirements defined</span>
                </div>
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">3</span>
                  <span className="case-study-outcome-label">features on roadmap</span>
                </div>
                <div className="case-study-outcome">
                  <span className="case-study-outcome-num">20+</span>
                  <span className="case-study-outcome-label">features backlogged</span>
                </div>
              </div>
              <span className="comp-frame-label">4-item 2×2 grid (CSS :has())</span>
            </div>
          </div>
        </section>

        {/* ── Process Step ────────────────────────────────────── */}
        <section id="process-step" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Patterns</p>
            <h2 className="comp-section-title">Process Step</h2>
            <p className="comp-section-desc">
              The label + detail + optional inline reflection pattern used in case study "What I did"
              sections.
            </p>
          </div>

          <div className="comp-stage comp-stage--col">
            <div className="case-study-step">
              <span className="case-study-step-label">Competitive benchmarking across 11 wallets</span>
              <p className="case-study-step-detail">
                Swept eleven wallets and fintech apps to identify table stakes gaps and above-parity
                opportunities. That audit set the priority order before any feature debate started.
              </p>
            </div>

            <div className="case-study-step">
              <span className="case-study-step-label">With an inline reflection</span>
              <p className="case-study-step-detail">
                A step that surfaces a learning directly in the process flow — used when the insight
                belongs to that specific step rather than the case study as a whole.
              </p>
              <div className="case-study-reflection case-study-reflection--inline">
                <h3 className="case-study-reflection-heading">What I'd do differently</h3>
                <p className="case-study-reflection-body">
                  Interrogate the frame before writing a word — not after the discovery brief
                  alignment call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work Gate ───────────────────────────────────────── */}
        <section id="work-gate" className="comp-section">
          <div className="comp-section-header">
            <p className="comp-section-eyebrow">Patterns</p>
            <h2 className="comp-section-title">Work Gate</h2>
            <p className="comp-section-desc">
              Password-protected entry for the Work section. Validates against a{' '}
              <code>VITE_</code> environment variable — no hardcoded fallback, fail-closed by
              default.
            </p>
          </div>

          <div
            className="comp-stage"
            style={{
              background: 'var(--color-brand-50)',
              backgroundImage: 'radial-gradient(var(--color-brand-200) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              justifyContent: 'center',
              padding: '3rem 2rem',
            }}
          >
            <div className="work-gate-inner">
              <span className="work-gate-lock" aria-hidden="true">🔒</span>
              <h1 className="work-gate-heading">Protected work</h1>
              <p className="work-gate-body">
                These case studies contain unpublished work from a previous role.
                If you've received a password, enter it below.
              </p>
              <form className="work-gate-form" onSubmit={e => e.preventDefault()}>
                <div className="work-gate-input-wrap">
                  <input
                    className="work-gate-input"
                    type="password"
                    placeholder="Enter password"
                    readOnly
                  />
                  <button type="button" className="work-gate-eye" aria-label="Show password">
                    <Eye size={16} />
                  </button>
                </div>
                <button className="btn btn-primary" type="button">Unlock</button>
              </form>
              <p className="work-gate-note">
                Don't have the password? Reach out at{' '}
                <a href="mailto:tarynbillie@gmail.com">tarynbillie@gmail.com</a>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
