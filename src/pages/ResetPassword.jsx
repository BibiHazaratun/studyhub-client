import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await api.post(`/auth/reset-password/${token}`, { password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset link is invalid or has expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-hero bg-pitch-grid min-h-[100vh] relative overflow-hidden flex items-center justify-center px-6 py-10">
      <div className="orb orb-green w-96 h-96 -top-24 -left-24" />
      <div className="orb orb-gold w-72 h-72 bottom-0 right-0" />

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8 animate-fadeUp">
          <span className="font-body text-[10px] uppercase tracking-widest text-green-hi">Reset access</span>
          <h1 className="font-display text-4xl text-white mt-2">New password</h1>
          <p className="text-textSec text-sm mt-1 font-body">Choose a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4 animate-cardIn">
          <div className="card-top-line" style={{ opacity: 1 }} />

          {error && (
            <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-red-400 text-sm rounded-sm px-3 py-2 font-body">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-[rgba(22,163,74,0.12)] border border-[rgba(22,163,74,0.35)] text-green-hi text-sm rounded-sm px-3 py-2 font-body">
              Password reset successfully! Redirecting to sign in…
            </div>
          )}

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">New password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="input w-full px-3 py-2.5 text-sm" placeholder="At least 6 characters" />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Confirm password</label>
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="input w-full px-3 py-2.5 text-sm" placeholder="Re-enter password" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
            {loading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>

        <p className="text-center text-sm text-textMuted mt-6 font-body">
          <Link to="/login" className="text-green-hi font-semibold hover:text-white transition-colors">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}