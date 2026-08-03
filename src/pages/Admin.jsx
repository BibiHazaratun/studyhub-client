import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/users')
      setUsers(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleToggleBan = async (id) => {
    try {
      await api.put(`/users/${id}/ban`)
      fetchUsers()
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed')
    }
  }

  const handleResetPassword = async (id, name) => {
    if (!window.confirm(`Reset password for ${name}?`)) return
    try {
      const { data } = await api.put(`/users/${id}/reset-password`)
      alert(`New password for ${name}: ${data.newPassword}\n\nShare this with the student securely.`)
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed')
    }
  }

  const handleRoleChange = async (id, newRole, name) => {
    if (!window.confirm(`Change ${name}'s role to ${newRole}?`)) return
    try {
      await api.put(`/users/${id}/role`, { role: newRole })
      fetchUsers()
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed')
    }
  }

  const isMainAdmin = currentUser?.role === 'admin'

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-maroon">Admin</span>
        <h1 className="font-display text-3xl font-semibold text-ink mt-1">User management</h1>
        <p className="text-inkSoft text-sm mt-1">View all registered students and manage account access.</p>
      </div>

      {loading ? (
        <p className="text-inkSoft text-sm">Loading users…</p>
      ) : error ? (
        <p className="text-maroon text-sm">{error}</p>
      ) : (
        <div className="bg-white border border-ink/15 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/15 bg-ink/5 text-left">
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Name</th>
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Email</th>
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Student ID</th>
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Role</th>
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Status</th>
                <th className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-inkSoft">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-ink/10 last:border-0">
                  <td className="px-4 py-3 text-ink">{u.name}</td>
                  <td className="px-4 py-3 text-inkSoft">{u.email}</td>
                  <td className="px-4 py-3 font-mono text-xs text-inkSoft">{u.studentId}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-sageDark bg-sage/20 px-2 py-0.5 rounded-sm">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.banned ? (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-maroon bg-maroon/10 px-2 py-0.5 rounded-sm">
                        Banned
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-inkSoft">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {u.role === 'student' && (
                        <button
                          onClick={() => handleToggleBan(u._id)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-sm border transition-colors focus-ring ${
                            u.banned
                              ? 'border-sageDark/40 text-sageDark hover:bg-sage/10'
                              : 'border-maroon/40 text-maroon hover:bg-maroon/5'
                          }`}
                        >
                          {u.banned ? 'Unban' : 'Ban'}
                        </button>
                      )}
                      {u.role === 'student' && (
                        <button
                          onClick={() => handleResetPassword(u._id, u.name)}
                          className="text-xs font-medium px-3 py-1.5 rounded-sm border border-ink/20 text-ink hover:bg-ink/5 transition-colors focus-ring"
                        >
                          Reset PW
                        </button>
                      )}
                      {isMainAdmin && u._id !== currentUser._id && (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value, u.name)}
                          className="text-xs border border-ink/20 rounded-sm px-2 py-1.5 bg-white focus-ring"
                        >
                          <option value="student">Student</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}