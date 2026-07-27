# StudyHub Frontend — React Client

Library-catalog themed UI for the StudyHub peer notes platform (PUC CSE).

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Make sure the backend server is running at `http://localhost:5000` first.

## Pages

- `/login` — Sign in
- `/register` — Create account
- `/` — Browse resources (protected, requires login)
- `/upload` — Upload a new resource (protected, requires login)

## Design

Palette: aged paper background, deep ink green text, oxblood/maroon accents (like a library due-date stamp), sage green tags.
Type: Lora (display), Inter (body), IBM Plex Mono (course codes / call numbers).
Signature element: resource cards styled as library index cards with a perforated top edge and course code shown as a "call number."
