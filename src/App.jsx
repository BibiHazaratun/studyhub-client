import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Upload from './pages/Upload'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="footer-wrap border-t border-borderSub bg-[rgba(0,14,22,0.99)] py-8 flex flex-col items-center gap-3">
        <div className="w-80 max-w-[80%] h-px bg-gradient-to-r from-transparent via-[rgba(22,163,74,0.45)] to-transparent" />
        <p className="font-body text-[10px] uppercase tracking-widest text-textMuted">
          StudyHub · Built for Premier University Chattogram, CSE
        </p>
      </footer>
    </div>
  )
}
