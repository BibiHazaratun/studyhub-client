import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', studentId: '', semester: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ ...form, semester: Number(form.semester) })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account.')
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
          <span className="font-body text-[10px] uppercase tracking-widest text-green-hi">New Member</span>
          <h1 className="font-display text-4xl text-white mt-2">Join StudyHub</h1>
          <p className="text-textSec text-sm mt-1 font-body">For Premier University Chattogram, CSE students.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4 animate-cardIn">
          <div className="card-top-line" style={{ opacity: 1 }} />

          {error && (
            <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-red-400 text-sm rounded-sm px-3 py-2 font-body">
              {error}
            </div>
          )}

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Full name</label>
            <input required value={form.name} onChange={update('name')}
              className="input w-full px-3 py-2.5 text-sm" placeholder="Your name" />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={update('email')}
              className="input w-full px-3 py-2.5 text-sm" placeholder="you@example.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Student ID</label>
              <input required value={form.studentId} onChange={update('studentId')}
                className="input w-full px-3 py-2.5 text-sm" placeholder="0222210005101101" />
            </div>
            <div>
              <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Semester</label>
              <select required value={form.semester} onChange={update('semester')}
                className="input w-full px-3 py-2.5 text-sm">
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Password</label>
            <input type="password" required minLength={6} value={form.password} onChange={update('password')}
              className="input w-full px-3 py-2.5 text-sm" placeholder="At least 6 characters" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm mt-2">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-textMuted mt-6 font-body">
          Already have an account?{' '}
          <Link to="/login" className="text-green-hi font-semibold hover:text-white transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
