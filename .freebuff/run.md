# Run Doc — deftinnovations.com

## How to Reproduce Artifacts

1. Copy `.env` from the main checkout into `backend/` if missing:
   ```
   cp /path/to/main-checkout/backend/.env backend/.env
   ```

2. Install Python dependencies and run migrations:
   ```
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   ```

3. Install Node.js dependencies:
   ```
   cd frontend
   npm install
   ```

4. (Optional) Seed the database:
   ```
   cd backend
   source .venv/bin/activate
   python seed.py
   ```

## How to Run the Server

**Backend (Django on port 8000):**
```
cd backend
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

**Frontend (Next.js dev server):**
```
cd frontend
npx next dev --port 3000
```

The frontend fetches data from `http://127.0.0.1:8000` via the `NEXT_PUBLIC_API_URL` env var (defaults to that value).

## Detached Relaunch (when the preview dies)

`nohup ... &` wrappers often get reaped by the runner. The reliable recipe is launchd **with an explicit PATH** (launchd has no nvm/homebrew PATH, and npm's `env node` shebang fails without it — exit code 127):

```bash
# Backend (Django :8000)
launchctl submit -l deft-backend-preview -- /bin/sh -c "cd $PWD/backend && exec $PWD/backend/venv/bin/python manage.py runserver 127.0.0.1:8000 > $PWD/.freebuff/backend.log 2>&1"

# Frontend (Next.js :3000) — PATH export is REQUIRED
launchctl submit -l deft-frontend-preview -- /bin/sh -c "export PATH=/opt/homebrew/bin:\$PATH; cd $PWD/frontend && exec npm run dev > $PWD/.freebuff/preview.log 2>&1"

# When done:
launchctl remove deft-backend-preview deft-frontend-preview
```
