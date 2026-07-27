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
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-maroon">New Library Card</span>
          <h1 className="font-display text-3xl font-semibold text-ink mt-2">Join StudyHub</h1>
          <p className="text-inkSoft text-sm mt-1">For Premier University Chattogram, CSE students.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-ink/15 rounded-sm shadow-[3px_3px_0_rgba(31,42,36,0.12)] p-6 space-y-4">
          {error && (
            <div className="bg-maroon/10 border border-maroon/30 text-maroonDark text-sm rounded-sm px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Full name</label>
            <input required value={form.name} onChange={update('name')}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="Your name" />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={update('email')}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="you@puc.edu.bd" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Student ID</label>
              <input required value={form.studentId} onChange={update('studentId')}
                className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="1101220001" />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Semester</label>
              <select required value={form.semester} onChange={update('semester')}
                className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40">
                <option value="">Select</option>
                {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Password</label>
            <input type="password" required minLength={6} value={form.password} onChange={update('password')}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="At least 6 characters" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-ink text-paper font-medium py-2.5 rounded-sm hover:bg-maroon transition-colors focus-ring disabled:opacity-50">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-inkSoft mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-maroon font-medium hover:text-maroonDark">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
