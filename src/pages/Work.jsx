import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import WorkGate from '../components/ui/WorkGate'

const caseStudyIds = ['portfolio-widget', 'email-verification', 'address-reframe']

const caseStudies = [
  {
    id: 'portfolio-widget',
    tag: 'Discovery',
    year: '2026',
    title: "Defining a fintech platform's first portfolio intelligence features from scratch",
    artifact: {
      src: '/figjam-portfolio-widgets.png',
      caption: 'FigJam board used to scope MVP criteria for Beat the Market, Trending Swaps, and Top Movers — presented to my director before going to the CEO.',
    },
    context: "A crypto wallet platform was introducing a biweekly feature launch cadence — shipping something small, intentional, and visible every two weeks. The portfolio widget initiative was the first major application of that cadence. No one had defined what portfolio intelligence should look like for crypto users, there was no existing benchmark, and there were no PRDs for multiple baseline features (unrealized gain/loss, cost basis, percentage allocation per asset) that every credible wallet was already shipping.",
    process: [
      {
        label: "Competitive benchmarking across 11 wallets",
        detail: "Swept eleven wallets and fintech apps to identify table stakes gaps and above-parity opportunities. Confirmed that the platform was missing unrealized gain/loss per asset, total cost basis, and percentage allocation — baseline features with no PRDs found. That audit set the priority order before any feature debate started.",
      },
      {
        label: "Social modelling across four personas",
        detail: "Applied social modelling to the three prioritized features — Beat the Market, Trending Swaps, and Top Movers — stepping into each persona to simulate how they'd encounter each widget before a single line of code was written. The Crypto Curious user never sees Trending Swaps V1. Beat the Market ships descriptive-only first. Top Movers gets a friction tooltip on 'most sold' before launch.",
      },
      {
        label: "Adversarial debate framework for MVP criteria",
        detail: "Ran pro/against debates for each priority feature — the against agent always representing the most at-risk persona. The output of each debate was the minimum feature set needed to convince the skeptic: persona gates, configurable benchmarks, opt-in toggles, explicit 'trending' definitions on the card. Upsized two features based on debate analysis. Four internal documentation pages published.",
      },
    ],
    outcomes: [
      { num: '11', label: 'wallets benchmarked' },
      { num: '3',  label: 'Direction 1 features scoped with MVP criteria' },
      { num: '4',  label: 'documentation pages published' },
    ],
  },
  {
    id: 'email-verification',
    tag: 'Settings',
    year: '2026',
    title: 'Replacing a compliance workaround with a self-serve email update flow',
    context: "The platform had no self-serve email update flow. The process users actually had to follow: create a secondary account, deliberately fail email verification, wait for a compliance handoff, and receive a manual update — up to 24 hours later. Email-related tickets represented approximately 4–10% of total support volume. For a returning user blocked before a transaction, it wasn't just friction — it was a reason to leave.",
    process: [
      {
        label: "Discovery brief to PRD to eight user stories",
        detail: "Ran the full lifecycle from discovery brief through to eight published user stories — four covering the main user-facing flow, four covering internal Operator Portal and CRM sync requirements as a separate scope. Managed both scopes in parallel so engineering could plan them independently without blocking each other.",
      },
      {
        label: "Key decisions that reduced build effort",
        detail: "Two deliberate scoping decisions reduced engineering effort: the email verification screens and OTP logic from onboarding were repurposed without modification — no net-new screens required. The 24-hour cooldown mechanic was designed as a generic, reusable flag that future security-sensitive actions could reuse without rebuilding from scratch.",
      },
      {
        label: "Stakeholder and compliance alignment",
        detail: "Managed design review feedback from two designers, customer success resurface of descoped items, and compliance routing requirements. Every open question was resolved at the PRD stage before engineering began. PRD status: Approved and ready for grooming.",
      },
    ],
    outcomes: [
      { num: '8',    label: 'user stories published' },
      { num: '≥95%', label: 'target self-serve verification rate' },
      { num: '<2%',  label: 'target support ticket volume post-launch' },
    ],
  },
  {
    id: 'address-reframe',
    tag: 'Compliance',
    year: '2026',
    title: "Reframing 'address update' as geolocation re-evaluation to unlock alignment",
    context: "The brief came in as a routine address change feature — the same friction pattern already solved for email and phone. Three stakeholder conversations in, it was clear no one agreed on what 'address update' actually meant from a compliance standpoint. The team was debating KYC verification requirements, proof-of-address documentation, and pending states that shouldn't exist. Everything was blocked.",
    process: [
      {
        label: "Root cause diagnosis: wrong frame, wrong problem",
        detail: "Traced the misalignment to a fundamental framing problem. The platform doesn't verify address authenticity — it re-evaluates user jurisdiction category on address change. These are different problems with different solutions. Retired 'verification' and 'validation' language entirely across all documentation. Landed on 'geolocation re-evaluation' as the correct frame.",
      },
      {
        label: "Discovery Review call alignment",
        detail: "Ran the Discovery Review with the reframe in place. Leadership confirmed jurisdiction re-evaluation is instantaneous — no pending state, no verification window. Proof-of-address documentation was explicitly ruled out of scope: we don't ask for it at signup, asking on update would be inconsistent. Native over web confirmed with documented rationale per an established documentation standard.",
      },
      {
        label: "Integration path and scope resolution",
        detail: "With the reframe settled, clarified the third-party vendor role: address validation and data sync only — not a KYC or identity verification flow. The prohibited country edge case reuses the existing account-disabled flow from KYC, requiring no additional dev effort. Resolved six of eight open questions before development began.",
      },
    ],
    outcomes: [
      { num: '3', label: 'stakeholder review cycles' },
      { num: '0', label: 'open compliance blockers at PRD' },
      { num: '6', label: 'of 8 open questions resolved pre-dev' },
    ],
  },
]

export default function Work() {
  const { hash } = useLocation()

  const [activeTab, setActiveTab] = useState(() => {
    const id = window.location.hash.slice(1)
    return id === 'vault-widgets' ? 'prototypes' : 'case-studies'
  })

  const [pendingScroll, setPendingScroll] = useState(null)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    if (id === 'vault-widgets') {
      setActiveTab('prototypes')
    } else if (caseStudyIds.includes(id)) {
      setActiveTab('case-studies')
    }
    setPendingScroll(id)
  }, [hash])

  useEffect(() => {
    if (!pendingScroll) return
    const el = document.getElementById(pendingScroll)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setPendingScroll(null)
    }
  }, [pendingScroll, activeTab])

  return (
    <WorkGate>
      <div className="work-page">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="work-page-header">
          <span className="work-page-eyebrow">Selected Work</span>
          <h1 className="work-page-title">Case Studies</h1>
          <p className="work-page-lead">
            Real projects with full context — the problem, the process, and what shipped.
            This content is shared in confidence and not for public distribution.
          </p>
        </div>

        {/* ── Sub-nav ───────────────────────────────────────────── */}
        <div className="work-subnav">
          <button
            className={`work-tab${activeTab === 'case-studies' ? ' work-tab--active' : ''}`}
            onClick={() => setActiveTab('case-studies')}
          >
            Case Studies
          </button>
          <button
            className={`work-tab${activeTab === 'prototypes' ? ' work-tab--active' : ''}`}
            onClick={() => setActiveTab('prototypes')}
          >
            Prototypes
          </button>
        </div>

        {/* ── Case studies ──────────────────────────────────────── */}
        {activeTab === 'case-studies' && (
          <div className="case-studies">
            {caseStudies.map((cs, i) => (
              <section key={cs.id} id={cs.id} className="case-study">
                <div className="case-study-inner">

                  <div className="case-study-header">
                    <div className="case-study-meta">
                      <span className="case-study-tag">{cs.tag}</span>
                      <span className="case-study-year">{cs.year}</span>
                    </div>
                    <h2 className="case-study-title">{cs.title}</h2>
                  </div>

                  {cs.artifact && (
                    <figure className="case-study-artifact">
                      <img src={cs.artifact.src} alt={cs.artifact.caption} />
                      <figcaption className="case-study-artifact-caption">{cs.artifact.caption}</figcaption>
                    </figure>
                  )}

                  <div className="case-study-body">
                    <div className="case-study-left">
                      <p className="case-study-context">{cs.context}</p>

                      <div className="case-study-process">
                        <h3 className="case-study-process-heading">What I did</h3>
                        {cs.process.map(({ label, detail }) => (
                          <div key={label} className="case-study-step">
                            <span className="case-study-step-label">{label}</span>
                            <p className="case-study-step-detail">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="case-study-right">
                      <h3 className="case-study-outcomes-heading">Outcomes</h3>
                      <div className="case-study-outcomes">
                        {cs.outcomes.map(({ num, label }) => (
                          <div key={label} className="case-study-outcome">
                            <span className="case-study-outcome-num">{num}</span>
                            <span className="case-study-outcome-label">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
                {i < caseStudies.length - 1 && <div className="case-study-divider" />}
              </section>
            ))}
          </div>
        )}

        {/* ── Prototypes ────────────────────────────────────────── */}
        {activeTab === 'prototypes' && (
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
        )}

      </div>
    </WorkGate>
  )
}
