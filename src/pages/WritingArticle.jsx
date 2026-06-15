import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { writings } from '../data/writings'

export default function WritingArticle() {
  const { slug } = useParams()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    function onScroll() { setShowScrollTop(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const article = writings.find(w => w.slug === slug && w.type === 'hosted')

  if (!article) {
    return (
      <div style={{ padding: '80px 48px', textAlign: 'center' }}>
        <p>Article not found.</p>
        <Link to="/writing">← Back to Writing</Link>
      </div>
    )
  }

  const { title, date, tag, readTime, body } = article

  return (
    <article className="writing-article-page">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="writing-article-header">
        <div className="writing-article-header-inner">
          <Link to="/writing" className="writing-article-back">← Writing</Link>
          <h1 className="writing-article-title">{title}</h1>
          <div className="writing-article-byline">
            <img src="/taryn.png" alt="Taryn Reithofer" className="writing-article-avatar" />
            <div className="writing-article-byline-text">
              <span className="writing-article-author">Taryn Reithofer</span>
              <span className="writing-article-meta">
                <span className="writing-card-tag">{tag}</span>
                {date} · {readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="writing-article-rule" />

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div className="writing-article-body-wrap">
        <div className="writing-article-body">
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <footer className="writing-article-footer">
          <Link to="/writing" className="writing-article-back-footer">← More writing</Link>
        </footer>
      </div>

      <button
        className={`scroll-top-btn${showScrollTop ? ' scroll-top-btn--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

    </article>
  )
}
