# Deft Innovations — Decoupled Platform

High-performance digital presence powered by **Next.js 16 (App Router)** and a **Python Django 5.x + PostgreSQL** backend.

---

## 📁 Project Structure

```text
deftinnovations.com/
├── backend/                   # Python Django 5.x + PostgreSQL Backend
│   ├── api/                   # Django Ninja REST APIs (/api/v1/)
│   ├── apps/
│   │   ├── blog/              # Articles, categories, authors, tags
│   │   ├── portfolio/         # Case studies, galleries, metrics
│   │   ├── services/          # Capabilities & offerings
│   │   ├── leads/             # Contact inquiries & pipeline
│   │   └── company/           # Team, testimonials, stats
│   ├── core/                  # Django settings, CORS, URLs
│   ├── seed.py                # Database seeder utility
│   ├── manage.py
│   ├── requirements.txt
│   └── venv/                  # Python Virtual Environment
│
└── frontend/                  # Next.js 16 App Router Frontend
    ├── src/
    │   ├── app/               # Pages & Routes (ISR enabled)
    │   ├── components/        # UI & motion components
    │   ├── data/              # Static fallbacks & TypeScript types
    │   └── lib/               # API client (src/lib/api.ts)
    ├── public/                # Static assets & images
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Start the Django Backend

```bash
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```
- **Admin Dashboard**: [http://localhost:8000/admin](http://localhost:8000/admin) (`admin` / `admin123`)
- **Interactive Swagger Docs**: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

### 2. Start the Next.js Frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```
- **Website**: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Monorepo Root Commands

From the root `deftinnovations.com/` directory, you can also run:

```bash
npm run dev              # Starts the frontend dev server
npm run build            # Builds the frontend production bundle
npm run backend:dev      # Starts the Django server
npm run backend:migrate  # Runs Django database migrations
npm run backend:seed     # Seeds initial database content
```
