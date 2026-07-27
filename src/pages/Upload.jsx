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
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-maroon">Contribute</span>
        <h1 className="font-display text-3xl font-semibold text-ink mt-1">Add to the catalog</h1>
        <p className="text-inkSoft text-sm mt-1">Share notes, slides, or question banks with your batch.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/15 rounded-sm shadow-[3px_3px_0_rgba(31,42,36,0.12)] p-6 space-y-4">
        {error && (
          <div className="bg-maroon/10 border border-maroon/30 text-maroonDark text-sm rounded-sm px-3 py-2">{error}</div>
        )}
        {success && (
          <div className="bg-sage/20 border border-sageDark/30 text-inkSoft text-sm rounded-sm px-3 py-2">
            Uploaded! Redirecting to the catalog…
          </div>
        )}

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Title</label>
          <input required value={form.title} onChange={update('title')}
            className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40"
            placeholder="Midterm Notes — Chapter 4: Compiler Design" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Course code</label>
            <input required value={form.courseCode} onChange={update('courseCode')}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm font-mono focus-ring bg-paper/40" placeholder="CSE-321" />
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
          <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Course name</label>
          <input required value={form.courseName} onChange={update('courseName')}
            className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="Compiler Design" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Resource type</label>
          <select value={form.type} onChange={update('type')}
            className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40">
            <option value="notes">Notes</option>
            <option value="slides">Slides</option>
            <option value="question">Question Bank</option>
            <option value="lab">Lab Sheet</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">Tags (comma separated)</label>
          <input value={form.tags} onChange={update('tags')}
            className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm focus-ring bg-paper/40" placeholder="midterm, chapter4, important" />
        </div>

        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-inkSoft mb-1.5">File (PDF, DOC, PPT, image — max 15MB)</label>
          <input type="file" required onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm border border-dashed border-ink/25 rounded-sm px-3 py-3 bg-paper/40 focus-ring" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-ink text-paper font-medium py-2.5 rounded-sm hover:bg-maroon transition-colors focus-ring disabled:opacity-50">
          {loading ? 'Uploading…' : 'Upload resource'}
        </button>
      </form>
    </div>
  )
}