#!/usr/bin/env python3
"""
Complete database setup for Kata Sweet Shop
This script creates tables and initializes sample data
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.core.database import engine, Base
from app.models.models import User, Sweet, Order, OrderItem

def create_tables():
    """Create all database tables"""
    print("🔄 Creating database tables...")
    
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✅ All tables created successfully!")
        
        # Print table information
        print("\n📊 Created tables:")
        print("   - users (User accounts)")
        print("   - sweets (Sweet products)")
        print("   - orders (Customer orders)")
        print("   - order_items (Individual items in orders)")
        
        print("\n🔗 Table relationships:")
        print("   - users → orders (one-to-many)")
        print("   - orders → order_items (one-to-many)")
        print("   - sweets → order_items (one-to-many)")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating tables: {str(e)}")
        return False

def show_database_info():
    """Show database connection and table information"""
    print("\n📋 Database Information:")
    print("   🗄️  Database: PostgreSQL")
    print("   🔗 Connection: postgresql://appuser:StrongPass_123!@127.0.0.1:5432/incubytes")
    print("   📊 Tables: users, sweets, orders, order_items")
    
    print("\n📋 Order Table Schema:")
    print("   - id (Primary Key)")
    print("   - user_id (Foreign Key → users.id)")
    print("   - total_amount (Float)")
    print("   - status (pending/confirmed/shipped/delivered/cancelled)")
    print("   - delivery_address (Text)")
    print("   - phone_number (String)")
    print("   - email (String)")
    print("   - customer_name (String)")
    print("   - notes (Text)")
    print("   - created_at, updated_at (DateTime)")
    
    print("\n📋 Order Items Table Schema:")
    print("   - id (Primary Key)")
    print("   - order_id (Foreign Key → orders.id)")
    print("   - sweet_id (Foreign Key → sweets.id)")
    print("   - sweet_name (String)")
    print("   - selected_quantity (250g/500g/1kg)")
    print("   - quantity (number of pieces)")
    print("   - price (Float)")
    print("   - created_at (DateTime)")

def main():
    """Main setup function"""
    print("🏪 Kata Sweet Shop - Database Setup")
    print("=" * 60)
    
    # Step 1: Create tables
    if not create_tables():
        print("\n❌ Database setup failed at table creation!")
        sys.exit(1)
    
    # Step 2: Show database information
    show_database_info()
    
    # Step 3: Ask about sample data
    print("\n" + "=" * 60)
    print("🎯 Next Steps:")
    print("   1. Make sure PostgreSQL is running")
    print("   2. Verify database connection")
    print("   3. Run: python init_sample_data.py (to add sample data)")
    print("   4. Start backend: python run_backend.py")
    print("   5. Test order creation via API")
    
    print("\n💡 How Orders Work:")
    print("   📝 When user places order → stored in 'orders' table")
    print("   📦 Each item → stored in 'order_items' table")
    print("   👤 User info → linked via 'user_id' foreign key")
    print("   📞 Phone & email → stored with each order")
    print("   📍 Delivery address → stored with each order")
    
    print("\n🎉 Database setup completed successfully!")

if __name__ == "__main__":
    main()
