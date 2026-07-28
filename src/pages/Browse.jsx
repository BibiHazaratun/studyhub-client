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
  const newTab = window.open('', '_blank')
  await api.post(`/resources/${resource._id}/download`)
  newTab.location.href = `${SERVER_ROOT}${resource.fileUrl}`
}
  const handleRate = async (id, rating) => {
    await api.post(`/resources/${id}/rate`, { rating })
    fetchResources()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-maroon">Catalog</span>
        <h1 className="font-display text-3xl font-semibold text-ink mt-1">Browse notes &amp; resources</h1>
        <p className="text-inkSoft text-sm mt-1">Shared by CSE students, organized by course.</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, course, or tag…"
          className="flex-1 min-w-[200px] border border-ink/20 rounded-sm px-3 py-2 text-sm bg-white focus-ring"
        />
        <select value={semester} onChange={(e) => setSemester(e.target.value)}
          className="border border-ink/20 rounded-sm px-3 py-2 text-sm bg-white focus-ring">
          <option value="">All semesters</option>
          {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}
          className="border border-ink/20 rounded-sm px-3 py-2 text-sm bg-white focus-ring">
          <option value="">All types</option>
          <option value="notes">Notes</option>
          <option value="slides">Slides</option>
          <option value="question">Question Bank</option>
          <option value="lab">Lab Sheet</option>
        </select>
        <button type="submit" className="bg-ink text-paper text-sm font-medium px-5 py-2 rounded-sm hover:bg-maroon transition-colors focus-ring">
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft text-sm">Loading catalog…</p>
      ) : resources.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-ink/20 rounded-sm">
          <p className="font-display text-lg text-ink mb-1">The shelf is empty</p>
          <p className="text-inkSoft text-sm">No resources match yet — be the first to upload for this course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => (
            <ResourceCard key={r._id} resource={r} onDownload={handleDownload} onRate={handleRate} />
          ))}
        </div>
      )}
    </div>
  )
}
