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
    <header className="sticky top-0 z-30 bg-[rgba(0,27,42,0.95)] backdrop-blur border-b border-borderSub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2" onClick={closeMenu}>
          <span className="font-display text-2xl sm:text-3xl text-white tracking-tight">StudyHub</span>
          <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-widest text-green-hi border border-borderGreenHi px-1.5 py-0.5 rounded-sm whitespace-nowrap">
            PUC · CSE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          {user ? (
            <>
              <Link to="/" className="text-textSec hover:text-white transition-colors">Browse</Link>
              <Link to="/upload" className="text-textSec hover:text-white transition-colors">Upload</Link>
              {(user.role === 'admin' || user.role === 'moderator') && (
                <Link to="/admin" className="text-gold hover:text-gold-dim transition-colors font-semibold">
                  {user.role === 'admin' ? 'Admin' : 'Moderator'}
                </Link>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-borderSub">
                <span className="font-body text-xs text-textMuted whitespace-nowrap">
                  {user.name} · Sem {user.semester}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-wide text-textSec hover:text-white font-semibold focus-ring rounded px-2 py-1 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-textSec hover:text-white transition-colors">Sign in</Link>
              <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                Join StudyHub
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus-ring rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-borderSub bg-card px-4 py-3 flex flex-col gap-1 font-body text-sm">
          {user ? (
            <>
              <span className="font-body text-xs text-textMuted py-2">
                {user.name} · Sem {user.semester}
              </span>
              <Link to="/" onClick={closeMenu} className="py-2 text-textSec hover:text-white transition-colors">Browse</Link>
              <Link to="/upload" onClick={closeMenu} className="py-2 text-textSec hover:text-white transition-colors">Upload</Link>
              {(user.role === 'admin' || user.role === 'moderator') && (
                <Link to="/admin" onClick={closeMenu} className="py-2 text-gold hover:text-gold-dim transition-colors font-semibold">
                  {user.role === 'admin' ? 'Admin' : 'Moderator'}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-left py-2 text-xs uppercase tracking-wide text-textSec hover:text-white font-semibold"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="py-2 text-textSec hover:text-white transition-colors">Sign in</Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="mt-1 btn-primary px-4 py-2 text-center"
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
