import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
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
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-hero bg-pitch-grid min-h-[100vh] relative overflow-hidden flex items-center justify-center px-6 py-10">
      <div className="orb orb-blue w-96 h-96 -top-24 -right-24" />
      <div className="orb orb-green w-72 h-72 bottom-0 left-0" />

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8 animate-fadeUp">
          <span className="font-body text-[10px] uppercase tracking-widest text-green-hi">Welcome back</span>
          <h1 className="font-display text-4xl text-white mt-2">Sign in</h1>
          <p className="text-textSec text-sm mt-1 font-body">Access notes, slides, and question banks.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4 animate-cardIn">
          <div className="card-top-line" style={{ opacity: 1 }} />

          {error && (
            <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-red-400 text-sm rounded-sm px-3 py-2 font-body">
              {error}
            </div>
          )}

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="input w-full px-3 py-2.5 text-sm" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="input w-full px-3 py-2.5 text-sm" placeholder="Your password" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="w-full text-center text-xs text-textMuted hover:text-textSec transition-colors font-body"
          >
            Forgot password?
          </button>
          {showHelp && (
            <p className="text-xs text-textSec text-center font-body bg-[rgba(255,255,255,0.04)] rounded-sm px-3 py-2">
              Contact your CR or the site admin — they can reset it for you.
            </p>
          )}
        </form>

        <p className="text-center text-sm text-textMuted mt-6 font-body">
          New here?{' '}
          <Link to="/register" className="text-green-hi font-semibold hover:text-white transition-colors">Join StudyHub</Link>
        </p>
      </div>
    </div>
  )
}
