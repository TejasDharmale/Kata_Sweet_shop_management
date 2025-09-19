import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.main import app
from app.database import get_db, Base
from app.models import User, Sweet
from app.auth import get_password_hash

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def auth_headers(test_db):
    """Create a test user and return auth headers"""
    # Register and login user
    client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpass123"
        }
    )
    
    response = client.post(
        "/api/auth/login",
        data={
            "username": "test@example.com",
            "password": "testpass123"
        }
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def admin_headers(test_db):
    """Create an admin user and return auth headers"""
    db = TestingSessionLocal()
    
    # Create admin user directly in database
    admin_user = User(
        email="admin@example.com",
        username="admin",
        hashed_password=get_password_hash("adminpass123"),
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    db.close()
    
    # Login admin
    response = client.post(
        "/api/auth/login",
        data={
            "username": "admin@example.com",
            "password": "adminpass123"
        }
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_create_sweet_success(admin_headers):
    """Test successful sweet creation by admin"""
    response = client.post(
        "/api/sweets/",
        json={
            "name": "Test Sweet",
            "category": "Test Category",
            "price": 100.0,
            "quantity": 10,
            "description": "A test sweet",
            "image": "🍬"
        },
        headers=admin_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Sweet"
    assert data["category"] == "Test Category"
    assert data["price"] == 100.0
    assert data["quantity"] == 10


def test_create_sweet_unauthorized(auth_headers):
    """Test sweet creation by non-admin user (should fail)"""
    response = client.post(
        "/api/sweets/",
        json={
            "name": "Test Sweet",
            "category": "Test Category",
            "price": 100.0,
            "quantity": 10
        },
        headers=auth_headers
    )
    assert response.status_code == 403
    assert "Not enough permissions" in response.json()["detail"]


def test_get_sweets_success(auth_headers, admin_headers):
    """Test getting list of sweets"""
    # Create a sweet first
    client.post(
        "/api/sweets/",
        json={
            "name": "Test Sweet",
            "category": "Test Category",
            "price": 100.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    
    # Get sweets
    response = client.get("/api/sweets/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["name"] == "Test Sweet"


def test_get_sweets_unauthorized():
    """Test getting sweets without authentication"""
    response = client.get("/api/sweets/")
    assert response.status_code == 401


def test_search_sweets_by_name(auth_headers, admin_headers):
    """Test searching sweets by name"""
    # Create test sweets
    client.post(
        "/api/sweets/",
        json={
            "name": "Chocolate Sweet",
            "category": "Chocolate",
            "price": 150.0,
            "quantity": 5
        },
        headers=admin_headers
    )
    
    client.post(
        "/api/sweets/",
        json={
            "name": "Vanilla Sweet",
            "category": "Vanilla",
            "price": 120.0,
            "quantity": 8
        },
        headers=admin_headers
    )
    
    # Search by name
    response = client.get(
        "/api/sweets/search?name=Chocolate",
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Chocolate Sweet"


def test_search_sweets_by_price_range(auth_headers, admin_headers):
    """Test searching sweets by price range"""
    # Create test sweets
    client.post(
        "/api/sweets/",
        json={
            "name": "Cheap Sweet",
            "category": "Budget",
            "price": 50.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    
    client.post(
        "/api/sweets/",
        json={
            "name": "Expensive Sweet",
            "category": "Premium",
            "price": 200.0,
            "quantity": 3
        },
        headers=admin_headers
    )
    
    # Search by price range
    response = client.get(
        "/api/sweets/search?min_price=100&max_price=250",
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Expensive Sweet"


def test_purchase_sweet_success(auth_headers, admin_headers):
    """Test successful sweet purchase"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Purchase Test Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Purchase sweet
    response = client.post(
        f"/api/sweets/{sweet_id}/purchase",
        json={"quantity": 2},
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["quantity"] == 8  # 10 - 2


def test_purchase_sweet_insufficient_quantity(auth_headers, admin_headers):
    """Test purchasing more than available quantity"""
    # Create a sweet with limited quantity
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Limited Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 2
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Try to purchase more than available
    response = client.post(
        f"/api/sweets/{sweet_id}/purchase",
        json={"quantity": 5},
        headers=auth_headers
    )
    assert response.status_code == 400
    assert "Insufficient quantity" in response.json()["detail"]


def test_restock_sweet_success(admin_headers):
    """Test successful sweet restocking by admin"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Restock Test Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 5
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Restock sweet
    response = client.post(
        f"/api/sweets/{sweet_id}/restock",
        json={"quantity": 10},
        headers=admin_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["quantity"] == 15  # 5 + 10


def test_restock_sweet_unauthorized(auth_headers, admin_headers):
    """Test restocking by non-admin user (should fail)"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Restock Test Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 5
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Try to restock as regular user
    response = client.post(
        f"/api/sweets/{sweet_id}/restock",
        json={"quantity": 10},
        headers=auth_headers
    )
    assert response.status_code == 403
    assert "Not enough permissions" in response.json()["detail"]


def test_update_sweet_success(admin_headers):
    """Test successful sweet update by admin"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Original Sweet",
            "category": "Original",
            "price": 100.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Update sweet
    response = client.put(
        f"/api/sweets/{sweet_id}",
        json={
            "name": "Updated Sweet",
            "price": 150.0
        },
        headers=admin_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Sweet"
    assert data["price"] == 150.0
    assert data["category"] == "Original"  # Unchanged


def test_delete_sweet_success(admin_headers):
    """Test successful sweet deletion by admin"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Delete Test Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Delete sweet
    response = client.delete(f"/api/sweets/{sweet_id}", headers=admin_headers)
    assert response.status_code == 200
    assert "deleted successfully" in response.json()["message"]
    
    # Verify sweet is deleted
    get_response = client.get(f"/api/sweets/{sweet_id}", headers=admin_headers)
    assert get_response.status_code == 404


def test_delete_sweet_unauthorized(auth_headers, admin_headers):
    """Test sweet deletion by non-admin user (should fail)"""
    # Create a sweet
    create_response = client.post(
        "/api/sweets/",
        json={
            "name": "Delete Test Sweet",
            "category": "Test",
            "price": 100.0,
            "quantity": 10
        },
        headers=admin_headers
    )
    sweet_id = create_response.json()["id"]
    
    # Try to delete as regular user
    response = client.delete(f"/api/sweets/{sweet_id}", headers=auth_headers)
    assert response.status_code == 403
    assert "Not enough permissions" in response.json()["detail"]