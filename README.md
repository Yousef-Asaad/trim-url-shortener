# Trim — URL Shortener

A full-stack MVP URL shortener built with the MERN stack (MongoDB, Express, React, Node) and TypeScript.

## 🌐 Live Deployment
- **Frontend Live URL:** https://trim-url-shortener.vercel.app/
- **Backend Repository:** [trim-url-shortener-Backend](https://github.com/Yousef-Asaad/trim-url-shortener-Backend)

*Note: For a cleaner deployment workflow on Vercel, the architecture was updated from a monorepo to separate repositories for Frontend and Backend.*
## 1. Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or a connection URI (e.g. MongoDB Atlas)

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 2. Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/trim
BASE_URL=http://localhost:5000
```

### frontend/.env
```
VITE_API_BASE_URL=http://localhost:5000
```

## 3. Architecture

```
root/
├── backend/    Express + TypeScript API, MongoDB via Mongoose
├── frontend/   React + TypeScript + Vite SPA
```

Backend layers:
- `models/` — Mongoose schemas (`Link`, `Click`)
- `services/` — short code generation logic
- `controllers/` — request handlers / business logic
- `routes/` — route → controller wiring
- `middleware/` — centralized error handling
- `utils/` — URL validation

Frontend layers:
- `api/` — Axios calls to the backend
- `pages/` — route-level components (`Home`, `Analytics`)
- `components/` — reusable UI pieces
- `types/` — shared TypeScript interfaces

## 4. Design Decisions

**Why Base62 random code?**
Base62 (A–Z, a–z, 0–9) packs the most entropy per character without needing special URL-encoding, so a 7-character code yields a huge keyspace (62^7 ≈ 3.5 trillion) while staying short and readable. Random generation (instead of sequential IDs or hashing the URL) avoids leaking creation order and avoids extra infrastructure like a counter service.

**Why a separate Click collection?**
Storing each click as its own document (rather than incrementing a counter on `Link`) preserves raw event data — timestamp, referrer, user agent — needed to compute analytics like clicks-per-day and top referrers. It also avoids write contention on the `Link` document and lets analytics queries be added later without changing the write path.

**Index choices**
- `Link.shortCode` — unique index, since every redirect does a lookup by this field; uniqueness also enforces collision-free codes at the database level as a safety net.
- `Click.linkId` — indexed since every analytics query filters clicks by link.
- `Click.timestamp` — indexed since clicks-per-day aggregation groups/sorts by date.

**Why HTTP 302 redirect?**
A 302 (temporary redirect) tells browsers and crawlers not to cache the redirect permanently, which matters because the destination URL behind a short code could change. It also ensures every visit reliably hits the server, which is required to record click analytics — a cached 301 would cause browsers to skip the server entirely on repeat visits, undercounting clicks.

## 5. Future Improvements

- Custom aliases (user-chosen short codes instead of only random ones)
- User authentication and per-user link ownership
- Rate limiting on link creation and redirects to prevent abuse
- Caching (e.g. Redis) for hot short codes to reduce database load on redirects
- Automated tests (unit tests for validation/short code logic, integration tests for API endpoints)
