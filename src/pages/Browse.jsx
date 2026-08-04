import { useEffect, useState } from 'react'
import api, { SERVER_ROOT } from '../api/axios'
import ResourceCard from '../components/ResourceCard'

export default function Browse() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [semester, setSemester] = useState('')
  const [type, setType] = useState('')

  const fetchResources = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (semester) params.semester = semester
      if (type) params.type = type
      const { data } = await api.get('/resources', { params })
      setResources(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchResources() }, [semester, type])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchResources()
  }

  const handleDownload = async (resource) => {
    await api.post(`/resources/${resource._id}/download`)
    const link = document.createElement('a')
    link.href = `${SERVER_ROOT}/api/resources/${resource._id}/file`
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleRate = async (id, rating) => {
    await api.post(`/resources/${id}/rate`, { rating })
    fetchResources()
  }

  const handleEdit = async (id, formData) => {
    await api.put(`/resources/${id}`, formData)
    fetchResources()
  }

  const handleDelete = async (id) => {
    await api.delete(`/resources/${id}`)
    fetchResources()
  }

  const uniqueCourses = new Set(resources.map((r) => r.courseCode)).size
  const uniqueContributors = new Set(resources.map((r) => r.uploader?._id).filter(Boolean)).size

  return (
    <div className="bg-hero bg-pitch-grid min-h-screen relative overflow-hidden">
      <div className="orb orb-green w-96 h-96 -top-20 -left-20" />
      <div className="orb orb-blue w-[28rem] h-[28rem] top-40 -right-32" />

      <div className="max-w-6xl mx-auto px-6 py-10 relative">
        <div className="mb-8 animate-fadeUp">
          <span className="font-body text-[10px] uppercase tracking-widest text-green-hi">Catalog</span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mt-1">Browse the archive</h1>
          <p className="text-textSec text-sm mt-2 font-body">Notes, slides, and question banks shared by CSE students.</p>
        </div>

        {/* Signature stat strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 animate-fadeUp" style={{ animationDelay: '0.05s' }}>
          <div className="stat-card py-4 sm:py-5 text-center">
            <p className="font-display text-3xl sm:text-4xl text-green-hi">{resources.length}</p>
            <p className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-textMuted mt-1">Resources</p>
          </div>
          <div className="stat-card py-4 sm:py-5 text-center">
            <p className="font-display text-3xl sm:text-4xl text-gold">{uniqueCourses}</p>
            <p className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-textMuted mt-1">Courses</p>
          </div>
          <div className="stat-card py-4 sm:py-5 text-center">
            <p className="font-display text-3xl sm:text-4xl text-white">{uniqueContributors}</p>
            <p className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-textMuted mt-1">Contributors</p>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, course, or tag…"
            className="input flex-1 min-w-[200px] px-4 py-2.5 text-sm"
          />
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input px-3 py-2.5 text-sm">
            <option value="">All semesters</option>
            {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="input px-3 py-2.5 text-sm">
            <option value="">All types</option>
            <option value="notes">Notes</option>
            <option value="slides">Slides</option>
            <option value="question">Question Bank</option>
            <option value="lab">Lab Sheet</option>
          </select>
          <button type="submit" className="btn-primary px-6 py-2.5 text-sm">Search</button>
        </form>

        {loading ? (
          <p className="text-textMuted text-sm font-body">Loading catalog…</p>
        ) : resources.length === 0 ? (
          <div className="text-center py-16 card">
            <p className="font-display text-2xl text-white mb-1">The shelf is empty</p>
            <p className="text-textMuted text-sm font-body">No resources match yet — be the first to upload for this course.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <ResourceCard
                key={r._id}
                resource={r}
                onDownload={handleDownload}
                onRate={handleRate}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
