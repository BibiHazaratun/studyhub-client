import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
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

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    setForgotMessage('')
    setForgotLoading(true)
    try {
      const { data } = await api.post('/auth/forgot-password', { email: forgotEmail })
      setForgotMessage(data.message)
    } catch (err) {
      setForgotMessage(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setForgotLoading(false)
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

        {!showForgot ? (
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
              onClick={() => { setShowForgot(true); setForgotMessage('') }}
              className="w-full text-center text-xs text-textMuted hover:text-textSec transition-colors font-body"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotSubmit} className="card p-6 space-y-4 animate-cardIn">
            <div className="card-top-line" style={{ opacity: 1 }} />

            <p className="text-textSec text-sm font-body">
              Enter your email and we'll send you a link to reset your password.
            </p>

            {forgotMessage && (
              <div className="bg-[rgba(22,163,74,0.12)] border border-[rgba(22,163,74,0.35)] text-green-hi text-sm rounded-sm px-3 py-2 font-body">
                {forgotMessage}
              </div>
            )}

            <div>
              <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Email</label>
              <input type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                className="input w-full px-3 py-2.5 text-sm" placeholder="you@example.com" />
            </div>

            <button type="submit" disabled={forgotLoading} className="btn-primary w-full py-3 text-sm">
              {forgotLoading ? 'Sending…' : 'Send reset link'}
            </button>

            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="w-full text-center text-xs text-textMuted hover:text-textSec transition-colors font-body"
            >
              Back to sign in
            </button>
          </form>
        )}

        <p className="text-center text-sm text-textMuted mt-6 font-body">
          New here?{' '}
          <Link to="/register" className="text-green-hi font-semibold hover:text-white transition-colors">Join StudyHub</Link>
        </p>
      </div>
    </div>
  )
}