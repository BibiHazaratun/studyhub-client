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
    <div className="bg-hero bg-pitch-grid min-h-screen relative overflow-hidden">
      <div className="orb orb-gold w-96 h-96 -top-20 -right-20" />

      <div className="max-w-5xl mx-auto px-6 py-10 relative">
        <div className="mb-8 animate-fadeUp">
          <span className="font-body text-[10px] uppercase tracking-widest text-gold">Staff</span>
          <h1 className="font-display text-4xl text-white mt-1">User management</h1>
          <p className="text-textSec text-sm mt-2 font-body">View all registered students and manage account access.</p>
        </div>

        {loading ? (
          <p className="text-textMuted text-sm font-body">Loading users…</p>
        ) : error ? (
          <p className="text-red-400 text-sm font-body">{error}</p>
        ) : (
          <div className="card overflow-hidden animate-cardIn">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-borderSub bg-[rgba(255,255,255,0.03)] text-left">
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Name</th>
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Email</th>
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Student ID</th>
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Role</th>
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Status</th>
                    <th className="px-4 py-3 font-body text-[10px] uppercase tracking-widest text-textMuted">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-borderSub last:border-0">
                      <td className="px-4 py-3 text-white whitespace-nowrap">{u.name}</td>
                      <td className="px-4 py-3 text-textSec">{u.email}</td>
                      <td className="px-4 py-3 font-mono text-xs text-textMuted whitespace-nowrap">{u.studentId}</td>
                      <td className="px-4 py-3">
                        <span className="font-body text-[10px] uppercase tracking-widest text-green-hi bg-[rgba(22,163,74,0.12)] px-2 py-0.5 rounded-sm whitespace-nowrap">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {u.banned ? (
                          <span className="font-body text-[10px] uppercase tracking-widest text-red-400 bg-[rgba(239,68,68,0.1)] px-2 py-0.5 rounded-sm">
                            Banned
                          </span>
                        ) : (
                          <span className="font-body text-[10px] uppercase tracking-widest text-textMuted">Active</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {(u.role === 'student' || (isMainAdmin && u.role !== 'admin')) && (
                            <button
                              onClick={() => handleToggleBan(u._id)}
                              className={u.banned ? 'btn-outline-green px-3 py-1.5 text-xs' : 'btn-outline-red px-3 py-1.5 text-xs'}
                            >
                              {u.banned ? 'Unban' : 'Ban'}
                            </button>
                          )}
                          
                          {isMainAdmin && u._id !== currentUser._id && (
                            <select
                              value={u.role}
                              onChange={(e) => handleRoleChange(u._id, e.target.value, u.name)}
                              className="input px-2 py-1.5 text-xs"
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
          </div>
        )}
      </div>
    </div>
  )
}
