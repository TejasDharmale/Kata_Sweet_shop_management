# Kata Sweet Shop Management 

A modular Sweet Shop application with a FastAPI + PostgreSQL backend and a Vite + React + TypeScript frontend. The project follows an MVC-inspired structure on the backend and a clean component architecture on the frontend.

## Tech Stack
- Backend: FastAPI, SQLAlchemy, Pydantic, JWT (python-jose), Passlib, Uvicorn
- Database: PostgreSQL (psycopg2)
- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- Testing: Pytest, HTTPX (FastAPI TestClient)

## Repository Structure
```
backend/
  app/
    core/         # config, database
    models/       # SQLAlchemy models
    schemas/      # Pydantic schemas
    services/     # auth, deps, utils
    controllers/  # FastAPI routers (auth, sweets)
    main.py       # FastAPI app entry
  tests/
    test_sweets.py
  run_backend.py  # uvicorn runner
  requirements.txt

frontend/
  ... Vite/React app with components, pages, images, and config
```

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL running locally

## Environment
Set your database URL. Default is already configured for local Postgres.
```
DATABASE_URL=postgresql://appuser:StrongPass_123!@127.0.0.1:5432/incubytes
```
If you want to override, create a `.env` file in `backend/` and set `DATABASE_URL` there.

## Backend: Setup & Run
```
cd backend
python -m venv .venv
. .venv/Scripts/activate   # Windows PowerShell
pip install -r requirements.txt
python run_backend.py      # runs on http://localhost:8000
```
- Health: GET http://localhost:8000/health
- Auth routes: `/api/auth/*`
- Sweets routes: `/api/sweets/*`

On first startup, an admin user and sample sweets are seeded.

## Frontend: Setup & Run
```
cd frontend
npm install
npm run dev                 # http://localhost:5173
```
Update API base URL if needed in `frontend/lib/api.ts`.

## Key Features
- JWT-based authentication (login/register)
- Role-based access for admin operations
- CRUD for sweets with search, purchase, restock
- Polished UI with product cards, images, and responsive layout

## MVC-style Backend Overview
- Models: `backend/app/models/models.py`
- Schemas: `backend/app/schemas/schemas.py`
- Controllers (Routers): `backend/app/controllers/*.py`
- Services: `backend/app/services/*.py` (auth, dependencies, utility seeders)
- Core: `backend/app/core/*` for configuration and DB session

## Tests
```
cd backend
pytest -q
```
Tests use a SQLite test database and override dependencies for isolation.

## Notes
- CORS is enabled for Vite dev URLs: `http://localhost:5173`.
- Images and branding are under `frontend/images/`. Header displays the provided logo.

## License
For assignment/evaluation purposes.
