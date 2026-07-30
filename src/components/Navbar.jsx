import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="border-b-2 border-ink/15 bg-paper/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2" onClick={closeMenu}>
          <span className="font-display text-xl sm:text-2xl font-semibold text-ink tracking-tight">StudyHub</span>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-maroon border border-maroon/40 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
            PUC · CSE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          {user ? (
            <>
              <Link to="/" className="text-inkSoft hover:text-ink transition-colors">Browse</Link>
              <Link to="/upload" className="text-inkSoft hover:text-ink transition-colors">Upload</Link>
              <div className="flex items-center gap-3 pl-4 border-l border-ink/15">
                <span className="font-mono text-xs text-inkSoft whitespace-nowrap">
                  {user.name} · Sem {user.semester}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-wide text-maroon hover:text-maroonDark font-medium focus-ring rounded px-2 py-1"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-inkSoft hover:text-ink transition-colors">Sign in</Link>
              <Link
                to="/register"
                className="bg-ink text-paper px-4 py-2 rounded-sm text-sm font-medium hover:bg-inkSoft transition-colors focus-ring"
              >
                Join StudyHub
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus-ring rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-ink/15 bg-paper px-4 py-3 flex flex-col gap-1 font-body text-sm">
          {user ? (
            <>
              <span className="font-mono text-xs text-inkSoft py-2">
                {user.name} · Sem {user.semester}
              </span>
              <Link to="/" onClick={closeMenu} className="py-2 text-inkSoft hover:text-ink transition-colors">Browse</Link>
              <Link to="/upload" onClick={closeMenu} className="py-2 text-inkSoft hover:text-ink transition-colors">Upload</Link>
              <button
                onClick={handleLogout}
                className="text-left py-2 text-xs uppercase tracking-wide text-maroon hover:text-maroonDark font-medium"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="py-2 text-inkSoft hover:text-ink transition-colors">Sign in</Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="mt-1 bg-ink text-paper px-4 py-2 rounded-sm text-sm font-medium hover:bg-inkSoft transition-colors text-center"
              >
                Join StudyHub
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  )
}