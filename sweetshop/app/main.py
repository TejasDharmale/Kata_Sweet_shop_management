from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, get_db
from .models import Base
from .routers import auth_router, sweets_router
from .utils import create_admin_user, seed_initial_sweets

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sweet Shop Management System",
    description="A comprehensive API for managing a sweet shop",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router)
app.include_router(sweets_router.router)


@app.on_event("startup")
async def startup_event():
    """Initialize database with admin user and sample data"""
    db = next(get_db())
    try:
        # Create admin user
        create_admin_user(
            db=db,
            email="admin@sweetshop.com",
            username="admin",
            password="admin123"
        )
        
        # Seed initial sweets
        seed_initial_sweets(db)
        
        print("Database initialized successfully!")
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Welcome to Sweet Shop Management System API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}