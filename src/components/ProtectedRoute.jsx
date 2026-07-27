import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-[80vh] flex items-center justify-center text-inkSoft text-sm">Loading…</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
