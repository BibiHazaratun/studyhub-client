const typeLabels = {
  notes: 'Notes',
  slides: 'Slides',
  question: 'Question Bank',
  lab: 'Lab Sheet',
}

export default function ResourceCard({ resource, onDownload, onRate }) {
  const avgRating = resource.averageRating || 0

  return (
    <div className="group relative bg-white border border-ink/15 rounded-sm shadow-[3px_3px_0_rgba(31,42,36,0.12)] hover:shadow-[5px_5px_0_rgba(122,46,46,0.2)] hover:-translate-y-0.5 transition-all duration-150">
      <div className="card-perforation" />

      <div className="px-5 pt-3 pb-5">
        {/* Call number, like a library catalog card */}
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
      </div>
    </div>
  )
}
