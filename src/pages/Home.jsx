import { Link } from 'react-router-dom'

const featured = {
  tag: 'Discovery',
  year: '2026',
  title: "Defining a fintech platform's first portfolio intelligence features from scratch",
  body: "No benchmarks, no PRDs, no defined ownership. I ran a competitive sweep across eleven wallets, modelled features against four user personas, and used an adversarial debate framework to define minimum viable requirements — placing three features on the roadmap and backlogging 20+ more.",
  metrics: [
    { num: '11',  label: 'wallets benchmarked' },
    { num: '20+', label: 'features backlogged and sequenced' },
  ],
}

const caseStudies = [
  {
    slug: 'settings-self-serve',
    tag: 'Settings',
    year: '2026',
    title: 'Replacing compliance-gated workarounds with self-serve account management',
    body: 'Email and phone updates required a manual Compliance workaround — up to 24 hours, no self-serve path. I ran the full PM lifecycle for both features in parallel, with engineering efficiency built in from day one.',
  },
  {
    slug: 'compliance-infra',
    tag: 'Compliance',
    year: '2026',
    title: 'Three compliance and infrastructure initiatives — from misaligned framing to approval-ready PRDs',
    body: 'Address update, AML transaction monitoring, and transaction email templates. In each case, the real contribution was identifying what the problem actually was before anyone designed a single screen.',
  },
]

export default function Home() {
  return (
    <div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="hero-wrap">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">Product Manager</span>
              <h1>Hi, I'm Taryn</h1>
              <p>
                This is my living portfolio of UI components, interactive prototypes, and real
                projects — built to explore ideas, sharpen craft, and document the work.
                I'm so happy you're here!
              </p>
              <div className="hero-actions">
                <Link to="/work" className="btn btn-primary">View work</Link>
                <Link to="/about" className="btn btn-secondary">About me</Link>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <img src="/taryn.png" alt="Taryn Reithofer" className="hero-photo" />
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
              <Link to="/work#portfolio-widget" className="work-card-link work-card-link--light">
                Read case study →
              </Link>
            </article>

            {/* Secondary cards */}
            {caseStudies.map((cs) => (
              <article key={cs.slug} className="work-card">
                <div className="work-card-meta">
                  <span className="work-card-tag">{cs.tag}</span>
                  <span className="work-card-year">{cs.year}</span>
                </div>
                <h3 className="work-card-title">{cs.title}</h3>
                <p className="work-card-body">{cs.body}</p>
                <Link to={`/work#${cs.slug}`} className="work-card-link">
                  Read case study →
                </Link>
              </article>
            ))}

          </div>
        </div>
      </section>

    </div>
  )
}
