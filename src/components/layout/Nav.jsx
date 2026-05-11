import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/components', label: 'Components' },
  { to: '/prototypes', label: 'Prototypes' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  return (
    <nav className="nav">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
