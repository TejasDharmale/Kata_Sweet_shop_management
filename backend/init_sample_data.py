#!/usr/bin/env python3
"""
Initialize sample data for Kata Sweet Shop
This script creates sample sweets and users for testing
"""

import sys
import os
from datetime import datetime

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.core.database import SessionLocal
from app.models.models import User, Sweet, Order, OrderItem
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def create_sample_data():
    """Create sample users and sweets"""
    print("🔄 Creating sample data...")
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_users = db.query(User).count()
        existing_sweets = db.query(Sweet).count()
        
        if existing_users > 0 or existing_sweets > 0:
            print("⚠️  Sample data already exists. Skipping creation.")
            return True
        
        # Create sample users
        print("👤 Creating sample users...")
        
        sample_users = [
            {
                "email": "admin@katasweets.com",
                "username": "admin",
                "hashed_password": hash_password("admin123"),
                "is_admin": True
            },
            {
                "email": "customer@example.com", 
                "username": "customer",
                "hashed_password": hash_password("customer123"),
                "is_admin": False
            },
            {
                "email": "john@example.com",
                "username": "john_doe",
                "hashed_password": hash_password("password123"),
                "is_admin": False
            }
        ]
        
        for user_data in sample_users:
            user = User(**user_data)
            db.add(user)
        
        db.flush()  # Get user IDs
        
        # Create sample sweets
        print("🍭 Creating sample sweets...")
        
        sample_sweets = [
            {
                "name": "Gulab Jamun",
                "category": "Mithai",
                "price": 349.0,
                "quantity": 50,
                "description": "Soft, spongy balls made of khoya, deep-fried and soaked in sugar syrup",
                "image": "/images/gulab-jamun.jpg"
            },
            {
                "name": "Rasgulla",
                "category": "Bengali Sweets",
                "price": 299.0,
                "quantity": 40,
                "description": "Spongy cottage cheese balls in light sugar syrup",
                "image": "/images/rasgulla.jpg"
            },
            {
                "name": "Kaju Katli",
                "category": "Dry Fruits",
                "price": 899.0,
                "quantity": 30,
                "description": "Diamond-shaped cashew fudge with silver foil",
                "image": "/images/kaju-katli.jpg"
            },
            {
                "name": "Jalebi",
                "category": "Fried Sweets",
                "price": 199.0,
                "quantity": 60,
                "description": "Crispy, golden spirals soaked in sugar syrup",
                "image": "/images/jalebi.jpg"
            },
            {
                "name": "Barfi",
                "category": "Mithai",
                "price": 449.0,
                "quantity": 35,
                "description": "Traditional Indian fudge made with milk and sugar",
                "image": "/images/barfi.jpg"
            },
            {
                "name": "Ladoo",
                "category": "Festival Sweets",
                "price": 399.0,
                "quantity": 45,
                "description": "Round sweet balls made with gram flour and sugar",
                "image": "/images/ladoo.jpg"
            }
        ]
        
        for sweet_data in sample_sweets:
            sweet = Sweet(**sweet_data)
            db.add(sweet)
        
        db.flush()  # Get sweet IDs
        
        # Create sample orders
        print("📦 Creating sample orders...")
        
        # Get created users and sweets
        admin_user = db.query(User).filter(User.email == "admin@katasweets.com").first()
        customer_user = db.query(User).filter(User.email == "customer@example.com").first()
        gulab_jamun = db.query(Sweet).filter(Sweet.name == "Gulab Jamun").first()
        rasgulla = db.query(Sweet).filter(Sweet.name == "Rasgulla").first()
        kaju_katli = db.query(Sweet).filter(Sweet.name == "Kaju Katli").first()
        
        if admin_user and customer_user and gulab_jamun and rasgulla and kaju_katli:
            # Sample order 1
            order1 = Order(
                user_id=customer_user.id,
                total_amount=648.0,
                status="confirmed",
                delivery_address="123 Main Street, Mumbai, Maharashtra 400001",
                phone_number="9876543210",
                email="customer@example.com",
                customer_name="Customer User",
                notes="Please deliver in the evening"
            )
            db.add(order1)
            db.flush()
            
            # Order items for order 1
            order1_items = [
                OrderItem(
                    order_id=order1.id,
                    sweet_id=gulab_jamun.id,
                    sweet_name="Gulab Jamun",
                    selected_quantity="500g",
                    quantity=1,
                    price=349.0
                ),
                OrderItem(
                    order_id=order1.id,
                    sweet_id=rasgulla.id,
                    sweet_name="Rasgulla",
                    selected_quantity="500g",
                    quantity=1,
                    price=299.0
                )
            ]
            
            for item in order1_items:
                db.add(item)
            
            # Sample order 2
            order2 = Order(
                user_id=customer_user.id,
                total_amount=899.0,
                status="delivered",
                delivery_address="456 Park Avenue, Delhi, Delhi 110001",
                phone_number="9876543210",
                email="customer@example.com",
                customer_name="Customer User",
                notes="Gift wrapping requested"
            )
            db.add(order2)
            db.flush()
            
            # Order items for order 2
            order2_item = OrderItem(
                order_id=order2.id,
                sweet_id=kaju_katli.id,
                sweet_name="Kaju Katli",
                selected_quantity="500g",
                quantity=1,
                price=899.0
            )
            db.add(order2_item)
        
        db.commit()
        
       
      
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating sample data: {str(e)}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🏪 Kata Sweet Shop - Sample Data Initialization")
    print("=" * 60)
    
    if create_sample_data():
        print("\n🎉 Sample data initialization completed successfully!")
        print("\n💡 Next steps:")
        print("   1. Start the backend server: python run_backend.py")
        print("   2. Test the API endpoints")
        print("   3. Login with the provided credentials")
    else:
        print("\n❌ Sample data initialization failed!")
        sys.exit(1)
