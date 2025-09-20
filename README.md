# Kata Sweet Shop Management 

A modular Sweet Shop application with a FastAPI + PostgreSQL backend and a Vite + React + TypeScript frontend. The project follows an MVC-inspired structure on the backend and a clean component architecture on the frontend.

## Tech Stack
- Backend: FastAPI, SQLAlchemy, Pydantic, JWT (python-jose), Passlib, Uvicorn
- Database: PostgreSQL (psycopg2)
- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- Testing: Pytest, HTTPX (FastAPI TestClient)

![Sweet Shop Overview](https://github.com/user-attachments/assets/b55a205c-67a4-44d7-a0e2-2e3dcbee8238)

## Repository Structure
backend/
app/
core/ # config, database
models/ # SQLAlchemy models
schemas/ # Pydantic schemas
services/ # auth, deps, utils
controllers/ # FastAPI routers (auth, sweets)
main.py # FastAPI app entry
tests/
test_sweets.py
run_backend.py # uvicorn runner
requirements.txt

frontend/
... Vite/React app with components, pages, images, and config

markdown
Copy code

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL running locally

## Environment
Set your database URL. Default is already configured for local Postgres.
DATABASE_URL=postgresql://appuser:StrongPass_123!@127.0.0.1:5432/incubytes

markdown
Copy code
If you want to override, create a `.env` file in `backend/` and set `DATABASE_URL` there.

## Backend: Setup & Run
cd backend
python -m venv .venv
. .venv/Scripts/activate # Windows PowerShell
pip install -r requirements.txt
python run_backend.py # runs on http://localhost:8000

markdown
Copy code
- Health: GET http://localhost:8000/health
- Auth routes: `/api/auth/*`
- Sweets routes: `/api/sweets/*`

On first startup, an admin user and sample sweets are seeded.

![Backend Swagger](https://github.com/user-attachments/assets/5ac67fe1-43b8-430f-8204-c3dc55f57aae)

## Frontend: Setup & Run
cd frontend
npm install
npm run dev # http://localhost:5173

markdown
Copy code
Update API base URL if needed in `frontend/lib/api.ts`.

## Key Features
- JWT-based authentication (login/register)
- Role-based access for admin operations
- CRUD for sweets with search, purchase, restock
- Polished UI with product cards, images, and responsive layout
- Live customer support chat integration via Tawk.to

## MVC-style Backend Overview
- Models: `backend/app/models/models.py`
- Schemas: `backend/app/schemas/schemas.py`
- Controllers (Routers): `backend/app/controllers/*.py`
- Services: `backend/app/services/*.py` (auth, dependencies, utility seeders)
- Core: `backend/app/core/*` for configuration and DB session

## Tests
cd backend
pytest -q

markdown
Copy code
Tests use a SQLite test database and override dependencies for isolation.

---

### **1. Primary Development Partner**

- **Frontend Development**: Used Claude to build the React + TypeScript frontend with modern UI components, responsive design, and state management  
- **API Integration**: Developed RESTful API endpoints with proper error handling, validation, and documentation  
- **Code Optimization**: Refactored code for better performance, maintainability, and following React best practices  
- **Troubleshooting**: Resolved complex issues like CORS configuration, image optimization, and build processes  

![Frontend Dashboard](https://github.com/user-attachments/assets/829e9703-a430-4dc1-811d-8c56940079e4)

### **2. GitHub Copilot - Code Acceleration**
- **TypeScript Types**: Leveraged Copilot's suggestions for proper TypeScript typing and interface definitions  
- **SQL Queries**: Generated complex database queries and migrations with Copilot's assistance  
- **CSS Styling**: Used Copilot for Tailwind CSS class suggestions and responsive design patterns  

---

## Reflection on AI Impact

### **Positive Impacts**
- Accelerated development (60–70% faster)  
- Real-time learning opportunities  
- Maintained consistent coding standards  
- AI provided alternative problem-solving approaches  
- Helped in creating better documentation  

![AI Impact](https://github.com/user-attachments/assets/90ae81eb-cbdc-4b16-b0b3-4be4d383d01b)

### **Challenges and Learning**
- AI sometimes lacked project context → required human review  
- Debugging AI-generated code was harder  

![Debugging](https://github.com/user-attachments/assets/a63317ce-197a-4853-ace3-045810729481)

### **Responsible AI Usage**
- Always reviewed AI-generated code  
- Treated AI as a **learning tool**  
- Customized suggestions to match standards  
- Thoroughly tested everything  

### **Workflow Integration**
- Iterative cycle: generate → review → test → refine  
- Combined AI with traditional resources  
- Treated AI as a collaborator  

![Workflow](https://github.com/user-attachments/assets/ea785650-41ab-4297-8f28-fe8a434f5c8d)

---

### **Login: Use "Continue with Google" for instant access**
- **Order**: Browse sweets → Add to cart → Checkout → Download PDF receipt  
- **Feedback**: Go to "Community Feedback" → Write review → Submit  
- **Navigation**: Use header (Home/Cart/Orders) and footer links (About/Contact/Policies)  
- **Emails**: All orders and feedback automatically send confirmations  

![UI Orders](https://github.com/user-attachments/assets/85b5fbd0-f7c7-4e57-84dd-ed31e3bafd14)  
![UI Cart](https://github.com/user-attachments/assets/9493b0f4-73b3-45b0-9b46-52796d381e99)

---

## Conclusion
The Kata Sweet Shop Management system showcases how modern web technologies, combined with thoughtful AI integr
