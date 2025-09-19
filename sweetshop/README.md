# Sweet Shop Management System - Backend

A comprehensive FastAPI-based backend for managing a sweet shop with user authentication, inventory management, and admin controls.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Sweet Management**: CRUD operations for sweets with admin controls
- **Inventory Management**: Purchase and restock functionality
- **Search & Filter**: Advanced search capabilities by name, category, and price range
- **Admin Controls**: Admin-only operations for managing inventory
- **Test Coverage**: Comprehensive test suite following TDD principles

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Primary database (SQLite for testing)
- **JWT**: Token-based authentication
- **Pytest**: Testing framework
- **Pydantic**: Data validation using Python type annotations

## Project Structure

```
sweetshop/
├─ app/
│  ├─ main.py              # FastAPI application entry point
│  ├─ config.py            # Configuration settings
│  ├─ database.py          # Database connection and session management
│  ├─ models.py            # SQLAlchemy models
│  ├─ schemas.py           # Pydantic schemas for request/response
│  ├─ auth.py              # Authentication utilities
│  ├─ deps.py              # Dependency injection functions
│  ├─ routers/
│  │  ├─ auth_router.py    # Authentication endpoints
│  │  └─ sweets_router.py  # Sweet management endpoints
│  └─ utils.py             # Utility functions
├─ tests/
│  ├─ test_auth.py         # Authentication tests
│  └─ test_sweets.py       # Sweet management tests
├─ .env.example            # Environment variables template
├─ requirements.txt        # Python dependencies
└─ README.md
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- PostgreSQL (for production)
- pip or pipenv

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweetshop
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secret key
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb sweetshop_db
   ```

6. **Run the application**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_auth.py
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get access token

### Sweets Management

- `GET /api/sweets/` - Get all sweets (authenticated)
- `POST /api/sweets/` - Create new sweet (admin only)
- `GET /api/sweets/search` - Search sweets with filters
- `GET /api/sweets/{id}` - Get specific sweet
- `PUT /api/sweets/{id}` - Update sweet (admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (admin only)
- `POST /api/sweets/{id}/purchase` - Purchase sweet
- `POST /api/sweets/{id}/restock` - Restock sweet (admin only)

### Default Admin User

The application creates a default admin user on startup:
- **Email**: admin@sweetshop.com
- **Password**: admin123

## API Documentation

Once the server is running, you can access:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Testing Strategy

The project follows Test-Driven Development (TDD) principles:

1. **Red**: Write failing tests first
2. **Green**: Write minimal code to make tests pass
3. **Refactor**: Improve code while keeping tests green

### Test Coverage

- **Authentication Tests**: User registration, login, validation
- **Sweet Management Tests**: CRUD operations, permissions, inventory
- **Edge Cases**: Error handling, validation, unauthorized access

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost/sweetshop_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Development Workflow

1. Write tests for new functionality
2. Run tests to ensure they fail (Red)
3. Implement minimal code to pass tests (Green)
4. Refactor and optimize (Refactor)
5. Commit with descriptive messages
6. Repeat for next feature

## Contributing

1. Follow TDD principles
2. Write comprehensive tests
3. Use clear commit messages
4. Follow Python PEP 8 style guidelines
5. Add AI co-authorship when using AI tools

## License

This project is licensed under the MIT License.