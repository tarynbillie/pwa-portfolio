import { NavLink, Link } from 'react-router-dom'
import { Briefcase, Layers, Zap, User, Home } from 'lucide-react'

const links = [
  { to: '/',           label: 'Home',       icon: Home },
  { to: '/work',       label: 'Work',       icon: Briefcase },
  { to: '/components', label: 'Components', icon: Layers },
  { to: '/prototypes', label: 'Prototypes', icon: Zap },
  { to: '/about',      label: 'About',      icon: User },
]

export default function Nav() {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="nav nav-top">
        <Link to="/" className="nav-logo">Taryn Reithofer</Link>
        <div className="nav-links">
          {links.filter(l => l.to !== '/').map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="nav nav-bottom">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'tab-link active' : 'tab-link'}
          >
            <Icon size={20} strokeWidth={1.75} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}
