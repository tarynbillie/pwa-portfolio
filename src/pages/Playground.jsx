import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const PROJECTS = [
  {
    to: '/breathing-room',
    eyebrow: 'Personal Prototype',
    title: 'Breathing Room',
    desc: 'See where your time actually goes — and protect what\'s left before it disappears. Built around the idea that you can\'t make good decisions about your time if you can\'t see your capacity clearly.',
    tags: ['React', 'ICS Parsing', 'Data Viz'],
    wip: true,
  },
]

export default function Playground() {
  return (
    <div className="pg-page">
      <div className="pg-header">
        <div className="pg-header-inner">
          <span className="about-eyebrow">Playground</span>
          <h1 className="pg-title">Personal projects</h1>
          <p className="pg-lead">
            Side experiments outside of work — things I build to scratch an itch,
            learn something, or explore an idea that wouldn't fit anywhere else.
          </p>
        </div>
      </div>

      <div className="pg-grid">
        {PROJECTS.map(({ to, eyebrow, title, desc, tags, wip }) => (
          <Link key={to} to={to} className="pg-card">
            <div className="pg-card-top">
              <span className="pg-card-eyebrow">{eyebrow}</span>
              <h2 className="pg-card-title">{title}</h2>
              <p className="pg-card-desc">{desc}</p>
            </div>
            <div className="pg-card-bottom">
              <div className="pg-tags">
                {wip && <span className="pg-tag pg-tag--wip">WIP</span>}
                {tags.map(t => <span key={t} className="pg-tag">{t}</span>)}
              </div>
              <span className="pg-card-cta">
                Open <ArrowRight size={14} strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
