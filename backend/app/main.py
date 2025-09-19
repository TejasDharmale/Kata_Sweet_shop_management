from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine
from .core.database import Base
from .controllers import auth as auth_controller
from .controllers import sweets as sweets_controller
from .controllers import orders as orders_controller
from .services.utils import create_admin_user, seed_initial_sweets
from .core.database import get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sweet Shop Management System",
    description="A comprehensive API for managing a sweet shop",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_controller.router)
app.include_router(sweets_controller.router)
app.include_router(orders_controller.router)


@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    try:
        create_admin_user(
            db=db,
            email="admin@sweetshop.com",
            username="admin",
            password="admin123"
        )
        seed_initial_sweets(db)
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Welcome to Sweet Shop Management System API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
