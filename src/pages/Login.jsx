import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in. Check your details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-maroon">Library Card · Sign In</span>
          <h1 className="font-display text-3xl font-semibold text-ink mt-2">Welcome back</h1>
          <p className="text-inkSoft text-sm mt-1">Sign in to browse and share course notes.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-ink/15 rounded-sm shadow-[3px_3px_0_rgba(31,42,36,0.12)] p-6 space-y-4">
          {error && (
            <div className="bg-maroon/10 border border-maroon/30 text-maroonDark text-sm rounded-sm px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40"
              placeholder="you@puc.edu.bd"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper font-medium py-2.5 rounded-sm hover:bg-maroon transition-colors focus-ring disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-inkSoft mt-6">
          New to StudyHub?{' '}
          <Link to="/register" className="text-maroon font-medium hover:text-maroonDark">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
