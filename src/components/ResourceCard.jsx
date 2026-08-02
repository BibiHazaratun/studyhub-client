import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const typeLabels = {
  notes: 'Notes',
  slides: 'Slides',
  question: 'Question Bank',
  lab: 'Lab Sheet',
}

export default function ResourceCard({ resource, onDownload, onRate, onEdit, onDelete }) {
  const { user } = useAuth()
  const avgRating = resource.averageRating || 0
  const isOwner = user && resource.uploader && user._id === resource.uploader._id
const canManage = isOwner || user?.role === "admin"
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: resource.title,
    courseCode: resource.courseCode,
    courseName: resource.courseName,
    semester: resource.semester,
    type: resource.type,
    tags: resource.tags?.join(', ') || '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    await onEdit?.(resource._id, form)
    setEditing(false)
  }

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this resource? This cannot be undone.')) {
      onDelete?.(resource._id)
    }
  }

  if (editing) {
    return (
      <div className="bg-white border border-maroon/40 rounded-sm shadow-[3px_3px_0_rgba(122,46,46,0.15)] px-5 py-4">
        <div className="space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-ink/20 rounded-sm px-2 py-1.5 text-sm focus-ring"
            placeholder="Title"
          />
          <input
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
            className="w-full border border-ink/20 rounded-sm px-2 py-1.5 text-sm font-mono focus-ring"
            placeholder="Course Code"
          />
          <input
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
            className="w-full border border-ink/20 rounded-sm px-2 py-1.5 text-sm focus-ring"
            placeholder="Course Name"
          />
          <div className="flex gap-2">
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              className="flex-1 border border-ink/20 rounded-sm px-2 py-1.5 text-sm focus-ring"
            >
              {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="flex-1 border border-ink/20 rounded-sm px-2 py-1.5 text-sm focus-ring"
            >
              <option value="notes">Notes</option>
              <option value="slides">Slides</option>
              <option value="question">Question Bank</option>
              <option value="lab">Lab Sheet</option>
            </select>
          </div>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border border-ink/20 rounded-sm px-2 py-1.5 text-sm focus-ring"
            placeholder="Tags (comma separated)"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-ink text-paper text-sm font-medium py-1.5 rounded-sm hover:bg-maroon transition-colors focus-ring"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="flex-1 border border-ink/20 text-ink text-sm font-medium py-1.5 rounded-sm hover:bg-ink/5 transition-colors focus-ring"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white border border-ink/15 rounded-sm shadow-[3px_3px_0_rgba(31,42,36,0.12)] hover:shadow-[5px_5px_0_rgba(122,46,46,0.2)] hover:-translate-y-0.5 transition-all duration-150">
      <div className="card-perforation" />

      <div className="px-5 pt-3 pb-5">
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-xs font-semibold text-maroon tracking-wide">
            {resource.courseCode}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-sageDark bg-sage/20 px-2 py-0.5 rounded-sm">
            {typeLabels[resource.type] || resource.type}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-ink leading-snug mb-1">
          {resource.title}
        </h3>
        <p className="font-body text-sm text-inkSoft mb-3">
          {resource.courseName} · Semester {resource.semester}
        </p>

        {resource.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resource.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-inkSoft/80 border border-ink/15 rounded-sm px-1.5 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-ink/20">
          <div className="flex items-center gap-3 text-xs text-inkSoft font-body">
            <span>{resource.uploader?.name || 'Unknown'}</span>
            <span className="text-ink/30">·</span>
            <span>{resource.downloadCount} downloads</span>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate?.(resource._id, star)}
                className="text-sm leading-none focus-ring rounded"
                aria-label={`Rate ${star} stars`}
              >
                <span className={star <= Math.round(avgRating) ? 'text-manila' : 'text-ink/15'}>★</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onDownload?.(resource)}
          className="mt-4 w-full bg-ink text-paper text-sm font-medium py-2 rounded-sm hover:bg-maroon transition-colors focus-ring"
        >
          Download
        </button>

        {isOwner && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 border border-ink/20 text-ink text-xs font-medium py-1.5 rounded-sm hover:bg-ink/5 transition-colors focus-ring"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="flex-1 border border-maroon/40 text-maroon text-xs font-medium py-1.5 rounded-sm hover:bg-maroon/5 transition-colors focus-ring"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}