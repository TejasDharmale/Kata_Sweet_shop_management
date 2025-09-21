
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
        
    except Exception as e:
        print(f"❌ Error creating tables: {str(e)}")
        return False
    
    return True

def show_table_schema():
    """Show the schema of created tables"""
    print("\n📋 Table Schema:")
    print("\n1. USERS table:")
    print("   - id (Primary Key)")
    print("   - email (Unique)")
    print("   - username (Unique)")
    print("   - hashed_password")
    print("   - is_admin (Boolean)")
    print("   - created_at, updated_at")
    
    print("\n2. SWEETS table:")
    print("   - id (Primary Key)")
    print("   - name")
    print("   - category")
    print("   - price")
    print("   - quantity")
    print("   - description")
    print("   - image")
    print("   - created_at, updated_at")
    
    print("\n3. ORDERS table:")
    print("   - id (Primary Key)")
    print("   - user_id (Foreign Key → users.id)")
    print("   - total_amount")
    print("   - status (pending/confirmed/shipped/delivered/cancelled)")
    print("   - delivery_address")
    print("   - phone_number")
    print("   - email")
    print("   - customer_name")
    print("   - notes")
    print("   - created_at, updated_at")
    
    print("\n4. ORDER_ITEMS table:")
    print("   - id (Primary Key)")
    print("   - order_id (Foreign Key → orders.id)")
    print("   - sweet_id (Foreign Key → sweets.id)")
    print("   - sweet_name")
    print("   - selected_quantity (250g/500g/1kg)")
    print("   - quantity (number of pieces)")
    print("   - price")
    print("   - created_at")

if __name__ == "__main__":
    print("🏪 Kata Sweet Shop - Database Setup")
    print("=" * 50)
    
    if create_tables():
        show_table_schema()
        print("\n🎉 Database setup completed successfully!")
        print("\n💡 Next steps:")
        print("   1. Make sure PostgreSQL is running")
        print("   2. Update the database URL in config.py if needed")
        print("   3. Run the backend server: python run_backend.py")
        print("   4. Test the API endpoints")
    else:
        print("\n❌ Database setup failed!")
        sys.exit(1)
