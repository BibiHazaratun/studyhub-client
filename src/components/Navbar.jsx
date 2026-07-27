import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b-2 border-ink/15 bg-paper/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-ink tracking-tight">StudyHub</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-maroon border border-maroon/40 px-1.5 py-0.5 rounded-sm">
            PUC · CSE
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-body text-sm">
          {user ? (
            <>
              <Link to="/" className="text-inkSoft hover:text-ink transition-colors">Browse</Link>
              <Link to="/upload" className="text-inkSoft hover:text-ink transition-colors">Upload</Link>
              <div className="flex items-center gap-3 pl-4 border-l border-ink/15">
                <span className="font-mono text-xs text-inkSoft">
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
      </div>
    </header>
  )
}
