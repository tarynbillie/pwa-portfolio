import { Link } from 'react-router-dom'

const featured = {
  tag: 'Discovery',
  year: '2026',
  title: "Defining a fintech platform's first portfolio intelligence features from scratch",
  body: "Finance users wanted more than a balance view — they wanted signal. I ran a competitive benchmarking sweep across eleven wallets and crypto apps, applied an Opportunity Solution Tree to map the opportunity space, and surfaced three high-confidence priority widgets to bring into scoping.",
  metrics: [
    { num: '11', label: 'products benchmarked' },
    { num: '3',  label: 'priority widgets' },
    { num: '4',  label: 'documentation pages published' },
  ],
}

const caseStudies = [
  {
    slug: 'email-verification',
    tag: 'Settings',
    year: '2026',
    title: 'Full PM lifecycle for a compliance-adjacent email verification flow',
    body: 'Email updates touch authentication, compliance routing, and user trust all at once. I ran this from discovery brief to eight published user stories — managing a separate Operator Portal scope alongside the main PRD and resolving edge cases before they reached engineering.',
    metrics: [
      { num: '8', label: 'user stories shipped' },
      { num: '2', label: 'scopes: user & operator' },
    ],
  },
  {
    slug: 'address-reframe',
    tag: 'Compliance',
    year: '2026',
    title: "Reframing 'address update' as geolocation re-evaluation to unlock alignment",
    body: 'The brief started as a routine field update. Working through compliance requirements, I identified that the platform re-evaluates user jurisdiction on address change — not address authenticity. That reframe eliminated a pending state conflict and gave every stakeholder a shared mental model.',
    metrics: [
      { num: '3', label: 'stakeholder review cycles' },
      { num: '0', label: 'open compliance blockers at PRD' },
    ],
  },
]

export default function Home() {
  return (
    <div>

      {/* ── Hero — purple dot-grid ───────────────────────────────── */}
      <div className="hero-wrap">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">Product Manager</span>
              <h1>Hi, I'm Taryn</h1>
              <p>
                This is my living portfolio of UI components, interactive prototypes, and real projects —
                built to explore ideas, sharpen craft, and document the work. I'm so happy you're here!
              </p>
              <div className="hero-actions">
                <Link to="/work" className="btn btn-primary">View work</Link>
                <Link to="/about" className="btn btn-secondary">About me</Link>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <img
                src="/taryn.png"
                alt="Taryn Reithofer"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Work ────────────────────────────────────────── */}
      <section className="home-work">
        <div className="home-work-inner">
          <span className="home-eyebrow">Selected Work</span>
          <h2 className="home-work-heading">Case Studies</h2>

          <div className="home-work-grid">

            {/* Featured card — dark */}
            <article className="work-card work-card--featured">
              <div className="work-card-meta">
                <span className="work-card-tag work-card-tag--light">{featured.tag}</span>
                <span className="work-card-year work-card-year--light">{featured.year}</span>
              </div>
              <h3 className="work-card-title work-card-title--light">{featured.title}</h3>
              <p className="work-card-body work-card-body--light">{featured.body}</p>
              <div className="work-card-metrics work-card-metrics--dark">
                {featured.metrics.map(({ num, label }) => (
                  <div key={label}>
                    <span className="work-card-metric-num work-card-metric-num--light">{num}</span>
                    <span className="work-card-metric-label work-card-metric-label--light">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/work#portfolio-widget" className="work-card-link work-card-link--light">Read case study →</Link>
            </article>

            {/* Secondary cards */}
            {caseStudies.map((cs) => (
              <article key={cs.tag} className="work-card">
                <div className="work-card-meta">
                  <span className="work-card-tag">{cs.tag}</span>
                  <span className="work-card-year">{cs.year}</span>
                </div>
                <h3 className="work-card-title">{cs.title}</h3>
                <p className="work-card-body">{cs.body}</p>
                <div className="work-card-metrics">
                  {cs.metrics.map(({ num, label }) => (
                    <div key={label}>
                      <span className="work-card-metric-num">{num}</span>
                      <span className="work-card-metric-label">{label}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/work#${cs.slug}`} className="work-card-link">Read case study →</Link>
              </article>
            ))}

          </div>
        </div>
      </section>

    </div>
  )
}
