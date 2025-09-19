from sqlalchemy.orm import Session
from .models import User, Sweet
from .auth import get_password_hash


def create_admin_user(db: Session, email: str, username: str, password: str):
    """Create an admin user if it doesn't exist"""
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return existing_user
    
    hashed_password = get_password_hash(password)
    admin_user = User(
        email=email,
        username=username,
        hashed_password=hashed_password,
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    return admin_user


def seed_initial_sweets(db: Session):
    """Seed the database with initial sweets if empty"""
    if db.query(Sweet).count() > 0:
        return
    
    initial_sweets = [
        Sweet(name="Gulab Jamun", category="Mithai", price=120, quantity=25, 
              description="Soft round dumplings soaked in rose-flavored sugar syrup", image="🟤"),
        Sweet(name="Jalebi", category="Mithai", price=80, quantity=50,
              description="Crispy spiral-shaped sweet soaked in sugar syrup", image="🧡"),
        Sweet(name="Rasgulla", category="Bengali Sweet", price=100, quantity=30,
              description="Spongy white balls made from chhana in sugar syrup", image="⚪"),
        Sweet(name="Kaju Katli", category="Dry Fruit Sweet", price=450, quantity=15,
              description="Diamond-shaped cashew fudge with silver leaf", image="💎"),
        Sweet(name="Laddu", category="Traditional", price=60, quantity=40,
              description="Round sweet balls made from gram flour and ghee", image="🟡"),
        Sweet(name="Barfi", category="Milk Sweet", price=200, quantity=0,
              description="Rich milk-based sweet in various flavors", image="🟫"),
        Sweet(name="Sandesh", category="Bengali Sweet", price=150, quantity=20,
              description="Delicate sweet made from fresh paneer", image="🤍"),
        Sweet(name="Mysore Pak", category="South Indian", price=180, quantity=35,
              description="Ghee-rich sweet with gram flour from Karnataka", image="🟨")
    ]
    
    for sweet in initial_sweets:
        db.add(sweet)
    
    db.commit()