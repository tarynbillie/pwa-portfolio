import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">Product Manager</span>
          <h1>Hi, I'm Taryn</h1>
          <p>
            This is a living portfolio of UI components, interactive prototypes, and real projects —
            built to explore ideas, sharpen craft, and document the work.
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
  )
}
