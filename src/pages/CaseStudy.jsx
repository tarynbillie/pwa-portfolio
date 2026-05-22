import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import WorkGate from '../components/ui/WorkGate'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudy() {
  const { slug } = useParams()
  const cs = caseStudies.find(c => c.slug === slug)

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  if (!cs) return <Navigate to="/work/portfolio-intelligence" replace />

  const others = caseStudies.filter(c => c.slug !== slug)

  return (
    <WorkGate>
      <div className="work-page">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="work-page-header">
          <div className="work-page-header-inner">
            <div className="cs-hero-meta">
              <span className="work-page-eyebrow">RockWallet</span>
              <span className="case-study-year">{cs.year}</span>
            </div>
            <h1 className="cs-hero-title">{cs.title}</h1>
          </div>
        </div>

        {/* ── Case study body ───────────────────────────────────── */}
        <div className="case-studies">
          <section id={cs.id} className="case-study">
            <div className="case-study-inner">

              <div className="case-study-body">
                <div className="case-study-left">

                  {/* Context */}
                  <div className="case-study-context-block">
                    <h3 className="case-study-process-heading">{cs.contextLabel ?? 'Opportunity'}</h3>
                    {cs.contextParagraphs.map((p, i) => (
                      <p key={i} className="case-study-context">{p}</p>
                    ))}
                  </div>

                  {/* Process */}
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

                  {/* Artifact — inside What I did */}
                  {cs.artifact && (
                    <figure className="case-study-artifact">
                      <img src={cs.artifact.src} alt={cs.artifact.caption} />
                      <figcaption className="case-study-artifact-caption">{cs.artifact.caption}</figcaption>
                    </figure>
                  )}

                  {/* Reflection */}
                  {cs.reflection && (
                    <div className="case-study-reflection">
                      <h3 className="case-study-reflection-heading">{cs.reflectionHeading ?? "What I'd do differently"}</h3>
                      <p className="case-study-reflection-body">{cs.reflection}</p>
                    </div>
                  )}

                  {/* Personal takeaway */}
                  {cs.personalTakeaway && (
                    <div className="case-study-takeaway">
                      <h3 className="case-study-takeaway-heading">Personal Takeaway</h3>
                      {cs.personalTakeaway.split('\n\n').map((p, i) => {
                        const prefix = 'What I carry forward:'
                        if (p.startsWith(prefix)) {
                          return (
                            <p key={i} className="case-study-takeaway-body">
                              <strong>{prefix}</strong>{p.slice(prefix.length)}
                            </p>
                          )
                        }
                        return <p key={i} className="case-study-takeaway-body">{p}</p>
                      })}
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

        {/* ── Next case studies ─────────────────────────────────── */}
        <div className="cs-next">
          <span className="cs-next-heading">More case studies</span>
          <div className="cs-next-grid">
            {others.map(other => (
              <Link key={other.slug} to={`/work/${other.slug}`} className="cs-next-card">
                <div className="cs-next-meta">
                  <span className="case-study-tag">{other.navLabel}</span>
                  <span className="case-study-year">{other.year}</span>
                </div>
                <h4 className="cs-next-title">{other.title}</h4>
                <span className="cs-next-link">Read case study →</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <button
        className={`scroll-top-btn${showScrollTop ? ' scroll-top-btn--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

    </WorkGate>
  )
}
