import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero">
      <span className="hero-badge">Product designer & builder</span>
      <h1>Design systems, prototypes, and things that ship.</h1>
      <p>
        A living portfolio of UI components, interactive prototypes, and real projects —
        built to explore ideas, sharpen craft, and document the work.
      </p>
      <div className="hero-actions">
        <Link to="/work" className="btn btn-primary">View work</Link>
        <Link to="/about" className="btn btn-secondary">About me</Link>
      </div>
    </div>
  )
}
