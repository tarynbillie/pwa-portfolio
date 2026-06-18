import { Link, NavLink, useMatch } from 'react-router-dom'
import { Briefcase, User, Home, ChevronDown, PenLine } from 'lucide-react'

const workGroups = [
  {
    company: 'RockWallet',
    items: [
      { to: '/work/portfolio-intelligence',    label: 'Portfolio Intelligence' },
      { to: '/work/account-management',        label: 'Account Management' },
      { to: '/work/compliance-infrastructure', label: 'Compliance & Infrastructure' },
      { to: '/work/prototypes',                label: 'Prototypes' },
    ],
  },
  {
    company: 'Q4 Inc.',
    items: [
      { to: '/work/support-operations', label: 'Support & Enablement Ops' },
    ],
  },
]

const playgroundItems = [
  { to: '/breathing-room', label: 'Breathing Room' },
]

export default function Nav() {
  const workMatch       = useMatch('/work/*')
  const playgroundMatch = useMatch('/calendar-clarity') || useMatch('/playground')

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
                {workGroups.map(({ company, items }, gi) => (
                  <div key={company} className={`nav-dropdown-group${gi > 0 ? ' nav-dropdown-group--bordered' : ''}`}>
                    <span className="nav-dropdown-group-label">{company}</span>
                    {items.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `nav-dropdown-item${isActive ? ' active' : ''}`}
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Playground — hover dropdown */}
            <div className="nav-dropdown-wrap">
              <span className={`nav-link nav-dropdown-trigger${playgroundMatch ? ' active' : ''}`}>
                Playground <ChevronDown size={12} strokeWidth={2.5} />
              </span>
              <div className="nav-dropdown">
                {playgroundItems.map(({ to, label }) => (
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
              to="/writing"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Writing
            </NavLink>
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
          to="/writing"
          className={({ isActive }) => isActive ? 'tab-link active' : 'tab-link'}
        >
          <PenLine size={20} strokeWidth={1.75} />
          <span>Writing</span>
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
