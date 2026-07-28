# StudyHub — Peer Notes & Resource Sharing Platform

A full-stack web app for CSE students at Premier University Chittagong (PUC) to share, browse, rate, and download course notes, slides, and question banks — organized by course code and semester.

**Live demo:** [studyhub-client-pink.vercel.app](https://studyhub-client-pink.vercel.app)
**Backend API:** [studyhub-server-4857.onrender.com](https://studyhub-server-4857.onrender.com)

---

## Features

- 🔐 JWT-based authentication (register/login)
- 📚 Browse & search resources by course code, semester, and type
- ⬆️ Upload notes, slides, question banks, and lab sheets (PDF, DOC, PPT, images)
- ⭐ Rate resources (1–5 stars) and track download counts
- 🏆 Contribution points awarded on upload — foundation for a leaderboard
- 🔎 Full-text search across title, course name, and tags

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose
**Auth:** JWT + bcrypt password hashing
**File uploads:** Multer
**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

## Screenshots

*(Add 2–3 screenshots here — login page, browse catalog, upload form)*

## Local Setup

### Backend
```bash
cd studyhub-server
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### Frontend
```bash
cd studyhub-client
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

## API Overview

See [studyhub-server README](https://github.com/BibiHazaratun/studyhub-server) for the full endpoint reference.

## Roadmap

- AI-generated resource summaries
- Leaderboard based on contribution points
- Exam-mode quiz generation from uploaded notes

## Author

Built by Bibi Hazaratun Nesa — CSE, Premier University Chittagong.