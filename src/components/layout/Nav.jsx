import { Link, NavLink, useMatch } from 'react-router-dom'
import { Briefcase, Layers, User, Home, ChevronDown } from 'lucide-react'

const workItems = [
  { to: '/work/portfolio-intelligence', label: 'Portfolio Intelligence' },
  { to: '/work/account-management',     label: 'Account Management' },
  { to: '/work/compliance-infrastructure', label: 'Compliance & Infrastructure' },
  { to: '/work/prototypes',             label: 'Prototypes' },
]

export default function Nav() {
  const workMatch = useMatch('/work/*')

  return (
    <>
      {/* Desktop top nav */}
      <nav className="nav nav-top">
        <Link to="/" className="nav-logo">Taryn Reithofer</Link>
        <div className="nav-right">
          <div className="nav-links">

            {/* Work — hover dropdown */}
            <div className="nav-dropdown-wrap">
              <span className={`nav-link nav-dropdown-trigger${workMatch ? ' active' : ''}`}>
                Work <ChevronDown size={12} strokeWidth={2.5} />
              </span>
              <div className="nav-dropdown">
                {workItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => `nav-dropdown-item${isActive ? ' active' : ''}`}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink
              to="/components"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Components
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              About
            </NavLink>
          </div>
          <a
            href="https://www.linkedin.com/messaging/compose/?recipient=tarynreithofer"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary nav-cta"
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="nav nav-bottom">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'tab-link active' : 'tab-link'}
        >
          <Home size={20} strokeWidth={1.75} />
          <span>Home</span>
        </NavLink>
        <Link
          to="/work/portfolio-intelligence"
          className={`tab-link${workMatch ? ' active' : ''}`}
        >
          <Briefcase size={20} strokeWidth={1.75} />
          <span>Work</span>
        </Link>
        <NavLink
          to="/components"
          className={({ isActive }) => isActive ? 'tab-link active' : 'tab-link'}
        >
          <Layers size={20} strokeWidth={1.75} />
          <span>Components</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? 'tab-link active' : 'tab-link'}
        >
          <User size={20} strokeWidth={1.75} />
          <span>About</span>
        </NavLink>
      </nav>
    </>
  )
}
