import { useEffect } from 'react'
import WorkGate from '../components/ui/WorkGate'

export default function WorkPrototypes() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  return (
    <WorkGate>
      <div className="work-page">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="work-page-header">
          <span className="work-page-eyebrow">RockWallet</span>
          <h1 className="work-page-title">Prototypes</h1>
          <p className="work-page-lead">
            Interactive explorations built with AI — connecting Claude to the product's Figma design system to generate UI that reflects the actual product language.
          </p>
        </div>

        {/* ── Prototype entries ─────────────────────────────────── */}
        <div className="work-prototypes">
          <div className="proto-entry" id="vault-widgets">
            <div className="proto-entry-left">
              <div className="proto-entry-meta">
                <span className="case-study-tag">Portfolio Intelligence</span>
                <span className="case-study-year">2026</span>
              </div>
              <h3 className="proto-entry-title">Home Screen Widgets — "Play Around" Concept</h3>
              <p className="proto-entry-desc">
                Three interactive widgets exploring engagement features for a crypto wallet,
                built from priorities surfaced during competitive benchmarking.
                The "What If" Simulator, Rebalance Preview, and Streak &amp; Milestones widgets
                each target a specific persona and risk level, informed by the social modelling work.
              </p>
              <p className="proto-entry-desc">
                Built by connecting Claude to the product's Figma design system — prompting against real component tokens and design patterns to generate UI that reflects the actual product language. Adapted here for portfolio presentation.
              </p>
            </div>
            <div className="proto-iframe-wrap">
              <iframe
                src="/prototypes/vault-widgets-portfolio.html"
                className="proto-iframe"
                title="Home Screen Widgets Prototype"
              />
            </div>
          </div>
        </div>

      </div>
    </WorkGate>
  )
}
