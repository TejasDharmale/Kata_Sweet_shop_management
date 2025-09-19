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
- Live customer support chat integration via Tawk.to

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

## My AI Usage

### AI Tools Used
- **Claude (Anthropic)**: Primary AI assistant for development guidance
- **GitHub Copilot**: Code completion and suggestions
- **ChatGPT**: Alternative AI assistance for specific coding challenges

### How I Used AI Tools

#### 1. **Claude (Anthropic) - Primary Development Partner**
- **Project Architecture**: Used Claude to design the overall MVC-style backend structure with FastAPI, including proper separation of concerns between models, schemas, controllers, and services
- **Database Design**: Collaborated with Claude to design the PostgreSQL schema for users, sweets, and orders with proper relationships and constraints
- **Authentication System**: Implemented JWT-based authentication with role-based access control using Claude's guidance on security best practices
- **Frontend Development**: Used Claude to build the React + TypeScript frontend with modern UI components, responsive design, and state management
- **API Integration**: Developed RESTful API endpoints with proper error handling, validation, and documentation
- **Code Optimization**: Refactored code for better performance, maintainability, and following React best practices
- **Troubleshooting**: Resolved complex issues like CORS configuration, image optimization, and build processes

#### 2. **GitHub Copilot - Code Acceleration**

- **TypeScript Types**: Leveraged Copilot's suggestions for proper TypeScript typing and interface definitions
- **SQL Queries**: Generated complex database queries and migrations with Copilot's assistance
- **CSS Styling**: Used Copilot for Tailwind CSS class suggestions and responsive design patterns

#### 3. **ChatGPT - Alternative Perspectives**
- **Problem Solving**: Consulted ChatGPT for alternative approaches to complex problems when initial solutions didn't work
- **Code Review**: Used ChatGPT to review and suggest improvements for specific code sections
- **Documentation**: Generated comprehensive documentation and README content with ChatGPT's assistance

### Reflection on AI Impact

#### **Positive Impacts:**
- **Accelerated Development**: AI tools reduced development time by approximately 60-70%, allowing me to focus on higher-level architecture and user experience
- **Learning Enhancement**: AI provided real-time learning opportunities, explaining complex concepts and best practices as we built the project
- **Code Quality**: AI suggestions helped maintain consistent coding standards and catch potential bugs early
- **Creative Problem Solving**: AI offered multiple approaches to challenges, expanding my problem-solving toolkit
- **Documentation**: AI assistance made comprehensive documentation more manageable and thorough

#### **Challenges and Learning:**
- **Context Understanding**: Sometimes AI suggestions didn't perfectly match the project context, requiring careful review and adaptation
- **Debugging Complexity**: When AI-generated code had issues, debugging became more complex as I needed to understand both the problem and the AI's reasoning

#### **Responsible AI Usage:**
- **Code Review**: Always reviewed and understood AI-generated code before implementation
- **Learning First**: Used AI as a learning tool rather than a replacement for understanding core concepts
- **Customization**: Adapted AI suggestions to fit the specific project requirements and coding standards
- **Testing**: Thoroughly tested all AI-assisted code to ensure functionality and security

#### **Workflow Integration:**
- **Iterative Development**: Used AI in an iterative manner - generate, review, test, refine
- **Knowledge Building**: Combined AI assistance with traditional learning resources to build comprehensive understanding
- **Quality Assurance**: Maintained high code quality standards by treating AI as a collaborative partner rather than a replacement for critical thinking

### Conclusion
AI tools significantly enhanced my development workflow by accelerating code generation, providing learning opportunities, and offering alternative problem-solving approaches. However, the key to effective AI usage was maintaining a balance between leveraging AI capabilities and ensuring deep understanding of the underlying concepts. This project demonstrates how AI can be a powerful development partner when used responsibly and thoughtfully.


