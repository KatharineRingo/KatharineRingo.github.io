import { useState } from 'react'
import { profile } from '../data'
import { useTheme } from '../hooks'

const links = ['About', 'Projects', 'Experience', 'Contact']

export default function Nav() {
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Main">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
            <path fill="currentColor" d="M10 6l14 14a24 24 0 0 1 16 0L54 6v28a22 22 0 0 1-44 0z" />
          </svg>
          {profile.name}
        </a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
        <div id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
