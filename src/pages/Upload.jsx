import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Upload() {
  const [form, setForm] = useState({
    title: '', courseCode: '', courseName: '', semester: '', type: 'notes', tags: '',
  })
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) {
      setError('Please choose a file to upload.')
      return
    }
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => data.append(key, val))
      data.append('file', file)

      // NOTE: Do NOT set Content-Type manually — the browser must add its own
      // multipart boundary, or the backend (multer) cannot parse the file.
      await api.post('/resources', data)
      setSuccess(true)
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-hero bg-pitch-grid min-h-screen relative overflow-hidden">
      <div className="orb orb-gold w-80 h-80 top-10 -right-16" />

      <div className="max-w-xl mx-auto px-6 py-10 relative">
        <div className="mb-8 animate-fadeUp">
          <span className="font-body text-[10px] uppercase tracking-widest text-green-hi">Contribute</span>
          <h1 className="font-display text-4xl text-white mt-1">Add to the archive</h1>
          <p className="text-textSec text-sm mt-2 font-body">Share notes, slides, or question banks with your batch.</p>
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
              Uploaded! Redirecting to the catalog…
            </div>
          )}

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Title</label>
            <input required value={form.title} onChange={update('title')}
              className="input w-full px-3 py-2.5 text-sm"
              placeholder="Midterm Notes — Chapter 4: Compiler Design" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Course code</label>
              <input required value={form.courseCode} onChange={update('courseCode')}
                className="input w-full px-3 py-2.5 text-sm font-mono" placeholder="CSE-321" />
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
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Course name</label>
            <input required value={form.courseName} onChange={update('courseName')}
              className="input w-full px-3 py-2.5 text-sm" placeholder="Compiler Design" />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Resource type</label>
            <select value={form.type} onChange={update('type')}
              className="input w-full px-3 py-2.5 text-sm">
              <option value="notes">Notes</option>
              <option value="slides">Slides</option>
              <option value="question">Question Bank</option>
              <option value="lab">Lab Sheet</option>
            </select>
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">Tags (comma separated)</label>
            <input value={form.tags} onChange={update('tags')}
              className="input w-full px-3 py-2.5 text-sm" placeholder="midterm, chapter4, important" />
          </div>

          <div>
            <label className="block font-body text-[10px] uppercase tracking-widest text-textMuted mb-1.5">
              File (PDF, DOC, PPT, XLSX, image — max 50MB)
            </label>
            <input type="file" required onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-textSec border border-dashed border-white/20 rounded-sm px-3 py-3 bg-[rgba(8,38,61,0.9)] focus-ring file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:bg-green file:text-white file:text-xs file:font-semibold" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm">
            {loading ? 'Uploading…' : 'Upload resource'}
          </button>
        </form>
      </div>
    </div>
  )
}
