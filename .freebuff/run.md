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
