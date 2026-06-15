import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { writings } from '../data/writings'

const essays = writings.filter(w => w.type === 'hosted')
const mediumPieces = writings.filter(w => w.type === 'medium')

function FeedItem({ article }) {
  const isHosted = article.type === 'hosted'
  const inner = (
    <>
      <div className="feed-item-top">
        <span className="writing-card-tag">{article.tag}</span>
        <span className="feed-item-meta">{article.date} · {article.readTime}</span>
      </div>
      <h2 className="feed-item-title">{article.title}</h2>
      <p className="feed-item-excerpt">{article.excerpt}</p>
      <span className="feed-item-cta">
        {isHosted ? 'Read essay' : 'Read on Medium'} →
      </span>
    </>
  )

  if (isHosted) {
    return (
      <Link to={`/writing/${article.slug}`} className="feed-item">
        {inner}
      </Link>
    )
  }

  return (
    <a href={article.url} target="_blank" rel="noreferrer" className="feed-item">
      {inner}
    </a>
  )
}

export default function Writing() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    function onScroll() { setShowScrollTop(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="writing-page">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="writing-hero">
        <div className="writing-hero-inner">
          <span className="writing-eyebrow">Writing</span>
          <h1>Ideas, observations,<br />and the occasional confession.</h1>
          <p className="writing-lead">
            I write about the interior life of a career. The human stuff that slides off the resume.
          </p>
        </div>
      </section>

      {/* ── Essays ───────────────────────────────────────────────── */}
      <section className="writing-feed-section">
        <div className="writing-feed-inner">
          <span className="writing-feed-label">Essays</span>
          <div className="writing-feed">
            {essays.map(a => <FeedItem key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── On Medium ────────────────────────────────────────────── */}
      <section className="writing-feed-section writing-feed-section--medium">
        <div className="writing-feed-inner">
          <span className="writing-feed-label">On Medium</span>
          <div className="writing-feed">
            {mediumPieces.map(a => <FeedItem key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      <button
        className={`scroll-top-btn${showScrollTop ? ' scroll-top-btn--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

    </div>
  )
}
