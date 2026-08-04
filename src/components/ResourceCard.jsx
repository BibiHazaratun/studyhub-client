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
  const canManage = isOwner || user?.role === 'admin'

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: resource.title,
    courseCode: resource.courseCode,
    courseName: resource.courseName,
    semester: resource.semester,
    type: resource.type,
    tags: resource.tags?.join(', ') || '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

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
      <div className="card animate-cardIn px-5 py-4" style={{ borderColor: 'rgba(244,197,66,0.4)' }}>
        <div className="space-y-2">
          <input name="title" value={form.title} onChange={handleChange}
            className="input w-full px-3 py-2 text-sm" placeholder="Title" />
          <input name="courseCode" value={form.courseCode} onChange={handleChange}
            className="input w-full px-3 py-2 text-sm font-mono" placeholder="Course Code" />
          <input name="courseName" value={form.courseName} onChange={handleChange}
            className="input w-full px-3 py-2 text-sm" placeholder="Course Name" />
          <div className="flex gap-2">
            <select name="semester" value={form.semester} onChange={handleChange}
              className="input flex-1 px-3 py-2 text-sm">
              {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select name="type" value={form.type} onChange={handleChange}
              className="input flex-1 px-3 py-2 text-sm">
              <option value="notes">Notes</option>
              <option value="slides">Slides</option>
              <option value="question">Question Bank</option>
              <option value="lab">Lab Sheet</option>
            </select>
          </div>
          <input name="tags" value={form.tags} onChange={handleChange}
            className="input w-full px-3 py-2 text-sm" placeholder="Tags (comma separated)" />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={handleSave} className="btn-primary flex-1 py-1.5 text-sm">Save</button>
          <button onClick={() => setEditing(false)} className="btn-ghost flex-1 py-1.5 text-sm">Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-cardIn px-5 pt-4 pb-5">
      <div className="card-top-line" />

      <div className="flex items-start justify-between mb-3">
        <span className="font-body text-xs font-bold text-green-hi tracking-wide">
          {resource.courseCode}
        </span>
        <span className="font-body text-[10px] uppercase tracking-widest text-gold bg-[rgba(244,197,66,0.1)] border border-[rgba(244,197,66,0.25)] px-2 py-0.5 rounded-sm">
          {typeLabels[resource.type] || resource.type}
        </span>
      </div>

      <h3 className="font-display text-xl text-white leading-snug mb-1 normal-case tracking-normal">
        {resource.title}
      </h3>
      <p className="font-body text-sm text-textSec mb-3">
        {resource.courseName} · Semester {resource.semester}
      </p>

      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.map((tag) => (
            <span key={tag} className="font-body text-[10px] text-textMuted border border-borderSub rounded-sm px-1.5 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-dashed border-borderSub">
        <div className="flex items-center gap-3 text-xs text-textMuted font-body">
          <span>{resource.uploader?.name || 'Unknown'}</span>
          <span className="text-white/20">·</span>
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
              <span className={star <= Math.round(avgRating) ? 'text-gold' : 'text-white/15'}>★</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onDownload?.(resource)}
        className="btn-outline-green mt-4 w-full py-2.5 text-xs uppercase"
      >
        Download
      </button>

      {canManage && (
        <div className="flex gap-2 mt-2">
          <button onClick={() => setEditing(true)} className="btn-ghost flex-1 py-1.5 text-xs">Edit</button>
          <button onClick={handleDeleteClick} className="btn-outline-red flex-1 py-1.5 text-xs">Delete</button>
        </div>
      )}
    </div>
  )
}
