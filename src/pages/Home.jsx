import { Link } from 'react-router-dom'

const stats = [
  { num: '5',   label: 'Features owned end-to-end' },
  { num: '20+', label: 'Features backlogged, sized, and sequenced' },
  { num: '6',   label: 'Prototypes built with AI' },
  { num: '11',  label: 'Wallets competitively benchmarked' },
]

const featured = {
  slug: 'portfolio-intelligence',
  tag: 'Portfolio Intelligence',
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
    slug: 'account-management',
    tag: 'Account Management',
    year: '2026',
    title: 'Replacing compliance-gated workarounds with self-serve account management',
    body: 'Two account management features with no self-serve path and significant compliance surface. I ran the full PM lifecycle for both in parallel, with engineering efficiency decisions built into scope from day one.',
  },
  {
    slug: 'compliance-infrastructure',
    tag: 'Compliance & Infrastructure',
    year: '2026',
    title: 'Three compliance and infrastructure initiatives — from misaligned framing to approval-ready PRDs',
    body: 'Three initiatives where the real work happened before design started. In each case, the contribution was identifying what the problem actually was — and reframing it so the right solution became obvious.',
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
              <h1>Hi, I'm Taryn Reithofer</h1>
              <p>
                This is my living portfolio of UI components, interactive prototypes, and real
                projects — built to explore ideas, sharpen craft, and document the work.
                I'm so happy you're here!
              </p>
              <div className="hero-actions">
                <a href="#case-studies" className="btn btn-primary">View work</a>
                <Link to="/about" className="btn btn-secondary">About me</Link>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <img src="/taryn.png" alt="Taryn Reithofer" className="hero-photo" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="about-stats">
        {stats.map(({ num, label }) => (
          <div key={label} className="about-stat">
            <span className="about-stat-num">{num}</span>
            <span className="about-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Featured Work ────────────────────────────────────────── */}
      <section id="case-studies" className="home-work">
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
              <Link to={`/work/${featured.slug}`} className="work-card-link work-card-link--light">
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
                <Link to={`/work/${cs.slug}`} className="work-card-link">
                  Read case study →
                </Link>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ── Let's talk ──────────────────────────────────────────── */}
      <section className="about-contact">
        <div className="about-contact-inner">
          <span className="about-eyebrow">Let's talk</span>
          <h2>Open to new opportunities.</h2>
          <p>
            If you're building something ambitious in fintech — where empathy isn't an afterthought,
            it's the whole point — I'd love to hear from you.
          </p>
          <a
            href="https://www.linkedin.com/messaging/compose/?recipient=tarynreithofer"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Get in touch
          </a>
          <div className="about-contact-links">
            <a href="mailto:tarynbillie@gmail.com">tarynbillie@gmail.com</a>
            <span aria-hidden="true">·</span>
            <a href="https://linkedin.com/in/tarynreithofer" target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/tarynbillie" target="_blank" rel="noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href="/taryn-reithofer-resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </section>

    </div>
  )
}
