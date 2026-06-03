import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import WorkGate from '../components/ui/WorkGate'

const caseStudyIds = ['portfolio-widget', 'settings-self-serve', 'q4-support-ops', 'compliance-infra']

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
    context: "A crypto wallet platform was introducing a biweekly feature launch cadence — shipping something small, intentional, and visible every two weeks. The portfolio widget initiative was the first major application of that cadence. No one had defined what portfolio intelligence should look like for crypto users, there was no existing benchmark, and there were no PRDs for multiple baseline features (unrealized gain/loss, cost basis, percentage allocation per asset) that every credible wallet was already shipping. The initiative was structured around three phases: closing table stakes gaps first, then parity-plus features that do what competitors do but better, then a sprint-by-sprint differentiation layer — features that give users a reason to open the app on days when nothing in their portfolio has changed.",
    process: [
      {
        label: "Competitive benchmarking across 11 wallets",
        detail: "Swept eleven wallets and fintech apps to identify table stakes gaps and above-parity opportunities. Confirmed that the platform was missing unrealized gain/loss per asset, total cost basis, and percentage allocation — baseline features with no PRDs found. That audit set the priority order before any feature debate started.",
      },
      {
        label: "Social modelling across four personas",
        detail: "Designed a repeatable prompt framework for each user archetype — each prompt seeded with the persona's risk tolerance, crypto experience level, and primary motivation — then ran it against every feature before a single screen was designed. The Crypto Curious user never sees Trending Swaps V1. Beat the Market ships descriptive-only first. Top Movers gets a friction tooltip on 'most sold' before launch. This approach compressed what would have been weeks of research sessions into rapid, structured iteration across all persona-feature combinations.",
      },
      {
        label: "Adversarial debate framework for MVP criteria",
        detail: "Engineered a multi-round adversarial prompt structure — a pro agent advocating for shipping and a locked against agent representing the most at-risk persona — iterated for at least 10 rounds per feature until no new objections surfaced. The output was 17 minimum viable requirements across the three features: persona gates, opt-in toggles, explicit 'trending' definitions, V2 commitments required before V1 ships. Each requirement was then T-shirt sized (XS–L) and classified as sand, pebble, or rock so engineering had a clear effort signal before design kicked off. Two features were explicitly upsized as a direct result — Top Movers from XS to S, Trending Swaps from S to S–M — because the debates surfaced scope that wasn't visible in the initial estimate.",
      },
    ],
    outcomes: [
      { num: '11',  label: 'wallets benchmarked' },
      { num: '17',  label: 'minimum viable requirements defined across 3 features' },
      { num: '3',   label: 'features placed on the roadmap' },
      { num: '20+', label: 'features backlogged, sized, and sequenced' },
    ],
    reflectionHeading: "What followed",
    reflection: "After completing this discovery work, I identified portfolio intelligence as an unowned product surface — a Confluence ownership gap analysis confirmed every other major product area had an assigned PM except this one. Pitched it to my manager as a specialization area, backed by the benchmarking evidence. It became a formal part of my roadmap.",
  },
  {
    id: 'settings-self-serve',
    tag: 'Settings',
    year: '2026',
    title: 'Replacing compliance-gated workarounds with self-serve account management for email and phone updates',
    context: "The same SOP governed both email and phone number updates — users had to create a secondary account, deliberately fail email verification, and wait up to 24 hours for Compliance to complete a manual update. Email-related tickets represented 4–10% of total support volume; phone accounted for another 5% through the same process. Neither flow existed as a designed product experience. For a returning user blocked before a transaction, the wait wasn't friction — it was a reason to leave.",
    process: [
      {
        label: "Paired discovery briefs, two approved PRDs",
        detail: "Ran the full lifecycle from discovery brief through PRD for both email and phone number. Presented both features together — same philosophy, same trust moment, same root cause. Managed parallel scopes so engineering could plan each independently without blocking each other. Both PRDs approved and ready for grooming.",
      },
      {
        label: "Engineering efficiency decisions built into scope",
        detail: "Three deliberate decisions reduced build effort: email verification screens and OTP logic from onboarding were repurposed without modification — no net-new screens required. Phone number verification delegated entirely to the Sumsub SDK, which owns country code selection, format validation, auto-populate, and OTP — minimal custom build. A 24-hour cooldown mechanic was designed as a generic, reusable flag applicable to any future security-sensitive action.",
      },
      {
        label: "Stakeholder alignment across both features",
        detail: "Managed design review feedback from two designers, customer success resurface of descoped items, and compliance routing requirements for both flows in parallel. Every open question resolved at the PRD stage before engineering began. No compliance blockers carried into development on either feature.",
      },
    ],
    outcomes: [
      { num: '~15%', label: 'of total support volume targeted for elimination' },
      { num: '≥95%', label: 'target self-serve verification rate' },
      { num: '0',    label: 'net-new verification screens required' },
    ],
  },
  {
    id: 'q4-support-ops',
    tag: 'Support & Enablement Ops',
    year: '2020–2025',
    title: "Rebuilding Q4's support operation from the inside: AI triage, workflow redesign, and the product advocacy that reduced volume",
    context: "Q4 Inc. built investor relations websites for public companies — high-stakes, time-sensitive support with SLA windows measured in minutes. The operation was reactive: manual triage, inconsistent routing, Time to First Pending at 4.4 hours. The team was scaling headcount to absorb load rather than addressing structural causes. A parallel failure lived in the knowledge layer — documentation was fragmented, agents had no reliable source of truth, and escalations were high because the people handling tickets didn't have what they needed to resolve cases without asking someone else.",
    process: [
      {
        label: "Deployed Forethought AI triage in Salesforce Service Console",
        detail: "Partnered with Business Operations and the internal Salesforce team to evaluate, configure, and deploy Forethought — an AI-powered triage tool — designing queue logic, escalation rules, and routing criteria from scratch. The value wasn't the tool; it was how the system was configured: which signals triggered which routes, what escalation conditions looked like, and how to prevent false-positive routing that would erode analyst trust before the system had a chance to prove itself. Cut Time to First Pending from 4.4 to 1.4 hours — a 70% reduction. Reduced case backlog by 30% during peak quarters.",
      },
      {
        label: "Redesigned workflows using CRM data and process automation",
        detail: "Applied Salesforce and Tableau data to surface volume trends, uncover prioritization failures, and build the analytical case for where manual routing was breaking down. Sustained 90%+ SLA attainment across a team of 13 analysts through two high-growth quarters, including the S&P Global Market Intelligence migration that onboarded approximately 500 new IR sites onto Q4's platform.",
      },
      {
        label: "Advocated for self-serve features that reduced inbound support volume",
        detail: "Identified a category of support tickets that were a product gap, not a people gap — clients creating cases for routine CMS tasks the product should have let them do themselves. Brought quantified volume data into the conversation with Customer Experience and Product, framing the support load as a signal about where the product was failing users. Self-serve features shipped, freeing the team to focus on higher-complexity work.",
      },
      {
        label: "Led end-to-end implementation of Spekit, an AI-powered knowledge platform",
        detail: "Designed and executed the full implementation: content architecture, taxonomy, and migration of 1,500+ assets to a unified source of truth. The Spekit work completed a thread that started on the Team Lead side — AI triage fixed the routing problem, but agents still needed better information to resolve cases without escalating. 30% increase in self-serve knowledge access, 20% faster onboarding ramp, 100% satisfaction on training feedback surveys.",
      },
    ],
    outcomes: [
      { num: '13',     label: 'analysts led through two consecutive high-growth quarters' },
      { num: '70%',    label: 'reduction in Time to First Pending — 4.4 hours to 1.4' },
      { num: '30%',    label: 'reduction in case backlog during peak quarters' },
      { num: '90%+',   label: 'SLA attainment sustained across the team' },
      { num: '~500',   label: 'IR sites onboarded during the S&P Global migration' },
      { num: '30%',    label: 'increase in self-serve knowledge access post-Spekit' },
      { num: '20%',    label: 'faster average onboarding ramp for new agents' },
      { num: '100%',   label: 'satisfaction score on training feedback surveys' },
      { num: '1,500+', label: 'knowledge assets migrated to a unified source of truth' },
      { num: '5',      label: 'lifelong friendships, give or take' },
    ],
  },
  {
    id: 'compliance-infra',
    tag: 'Compliance',
    year: '2026',
    title: 'Three compliance and infrastructure initiatives — from misaligned framing to approval-ready PRDs',
    context: "These three initiatives share a pattern: the real work happens before a single screen is designed. Address update was blocked because stakeholders were debating the wrong problem. Sumsub transaction monitoring closed an AML compliance gap that had no user-facing surface. Transaction email templates exposed an infrastructure scope risk before it became a delivery problem. In each case, the contribution was defining what the problem actually was.",
    process: [
      {
        label: "Address update: reframing the problem unlocked alignment",
        detail: "The brief came in as a routine address change feature. Three stakeholder conversations in, no one agreed on what 'address update' meant from a compliance standpoint — the team was debating KYC verification requirements, proof-of-address documentation, and pending states that shouldn't exist. Traced the misalignment to a fundamental framing problem: the platform doesn't verify address authenticity, it re-evaluates user jurisdiction category on address change. Retired 'verification' and 'validation' language across all documentation. That reframe resolved six of eight open compliance questions before development began. Before handing off, ran a cross-document alignment audit across the PRD and all four user stories — catching and resolving 17 inconsistencies before engineering ever saw the document.",
        reflection: "The requirement arrived as an ambiguous roadmap item with almost no context, and I wrote the brief before fully understanding the product's compliance model. The real learning: when a roadmap item arrives without a problem statement, interrogate the frame before writing a word — not after the discovery brief alignment call.",
      },
      {
        label: "Sumsub transaction monitoring: closing a material AML gap",
        detail: "RockWallet had fraud-focused monitoring via Sardine and identity verification at onboarding via Sumsub KYC — but no continuous AML transaction monitoring. A user who onboards as a school teacher and begins executing million-dollar trades wasn't flagged, because no system was watching for that pattern. Ran a coverage analysis confirming Sardine and Sumsub are complementary, not interchangeable — dual integration, not a migration. Defined the data pipeline requirements to connect RockWallet's transaction data warehouse to Sumsub's risk scoring engine. PRD drafted and presented to leadership at the March 18 Discovery Review.",
      },
      {
        label: "Transaction email templates: scope protection and infrastructure clarity",
        detail: "Leadership flagged an opportunity to upgrade the visual quality of transactional emails on AWS SES — a template and design initiative, not a copy rewrite. Confirmed the platform's email infrastructure stack and identified the Sumsub vs. AWS SES email scope split before it became a delivery risk. When a full copy rewrite was proposed in stakeholder review, escalated it to the room rather than resolving it unilaterally — a scope call with compliance implications isn't a PM decision to make alone. Surfaced a viable path for non-technical template editing post-launch. Brief presented at the March 25 Discovery Review. Low dev effort target maintained throughout.",
      },
    ],
    outcomes: [
      { num: '1',  label: 'active AML compliance gap remediated — high-value trades were going unflagged' },
      { num: '17', label: 'cross-document inconsistencies resolved before engineering handoff' },
      { num: '6',  label: 'of 8 compliance blockers resolved before development began' },
    ],
  },
]

const navItems = [
  ...caseStudies.map(cs => ({ id: cs.id, label: cs.tag })),
  { id: 'prototypes', label: 'Prototypes' },
]

export default function Work() {
  const { hash } = useLocation()

  const [activeSection, setActiveSection] = useState(() => {
    const id = window.location.hash.slice(1)
    if (id === 'vault-widgets') return 'prototypes'
    if (caseStudyIds.includes(id)) return id
    return caseStudyIds[0]
  })

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
    if (id === 'vault-widgets') setActiveSection('prototypes')
    else if (caseStudyIds.includes(id)) setActiveSection(id)
  }, [hash])

  const cs = caseStudies.find(c => c.id === activeSection)

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

        {/* ── Nav ───────────────────────────────────────────────── */}
        <div className="work-subnav-wrap">
          <div className="work-subnav">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                className={`work-tab${activeSection === id ? ' work-tab--active' : ''}`}
                onClick={() => setActiveSection(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Case study ────────────────────────────────────────── */}
        {activeSection !== 'prototypes' && cs && (
          <div className="case-studies">
            <section id={cs.id} className="case-study">
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
                      {cs.process.map(({ label, detail, reflection }) => (
                        <div key={label} className="case-study-step">
                          <span className="case-study-step-label">{label}</span>
                          <p className="case-study-step-detail">{detail}</p>
                          {reflection && (
                            <div className="case-study-reflection case-study-reflection--inline">
                              <h3 className="case-study-reflection-heading">What I'd do differently</h3>
                              <p className="case-study-reflection-body">{reflection}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {cs.reflection && (
                      <div className="case-study-reflection">
                        <h3 className="case-study-reflection-heading">{cs.reflectionHeading ?? "What I'd do differently"}</h3>
                        <p className="case-study-reflection-body">{cs.reflection}</p>
                      </div>
                    )}
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
            </section>
          </div>
        )}

        {/* ── Prototypes ────────────────────────────────────────── */}
        {activeSection === 'prototypes' && (
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
        )}

      </div>
    </WorkGate>
  )
}
