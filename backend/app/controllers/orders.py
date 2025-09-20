from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models.models import Order, OrderItem, User, Sweet
from ..schemas.orders import OrderCreate, OrderResponse, OrderUpdate, OrderItemResponse
from ..services.deps import get_current_user, get_admin_user
from ..services.email_service import EmailService

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("/", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new order"""
    
    # Create the order
    order = Order(
        user_id=current_user.id,
        total_amount=order_data.total_amount,
        delivery_address=order_data.delivery_address,
        phone_number=order_data.phone_number,
        email=order_data.email,
        customer_name=order_data.customer_name or current_user.name,
        notes=order_data.notes
    )
    
    db.add(order)
    db.flush()  # Get the order ID
    
    # Create order items
    for item_data in order_data.order_items:
        # Verify sweet exists
        sweet = db.query(Sweet).filter(Sweet.id == item_data.sweet_id).first()
        if not sweet:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sweet with id {item_data.sweet_id} not found"
            )
        
        # Check if enough quantity is available
        if sweet.quantity < item_data.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient quantity for {sweet.name}. Available: {sweet.quantity}, Requested: {item_data.quantity}"
            )
        
        # Create order item
        order_item = OrderItem(
            order_id=order.id,
            sweet_id=item_data.sweet_id,
            sweet_name=item_data.sweet_name,
            selected_quantity=item_data.selected_quantity,
            quantity=item_data.quantity,
            price=item_data.price
        )
        
        db.add(order_item)
        
        # Update sweet quantity
        sweet.quantity -= item_data.quantity
    
    db.commit()
    db.refresh(order)
    
    # Send order confirmation email
    try:
        print(f"\n🔄 Attempting to send order confirmation email...")
        print(f"📧 User Email: {current_user.email}")
        print(f"👤 User Name: {current_user.name}")
        print(f"🛒 Order ID: {order.id}")
        
        email_service = EmailService()
        
        # Calculate subtotal and tax for email
        subtotal = sum(item.price for item in order.order_items)
        tax = round(subtotal * 0.18)
        
        order_data = {
            "order_id": order.id,
            "total_amount": order.total_amount,
            "subtotal": subtotal,
            "tax": tax,
            "delivery_address": order.delivery_address,
            "phone_number": order.phone_number,
            "customer_name": order.customer_name,
            "notes": order.notes,
            "order_items": [
                {
                    "sweet_name": item.sweet_name,
                    "selected_quantity": item.selected_quantity,
                    "quantity": item.quantity,
                    "price": item.price
                }
                for item in order.order_items
            ]
        }
        
        print(f" Order Data: {order_data}")
        
        # Use the email from the order form if provided, otherwise use user email
        recipient_email = order.email if order.email else current_user.email
        
        # Use customer name from order if available, otherwise use user name
        customer_name = order.customer_name if order.customer_name else current_user.name
        
        email_service.send_order_confirmation_email(
            recipient_email, 
            customer_name, 
            order_data
        )
        
        print(f" Email service called successfully")
        
    except Exception as e:
        print(f" Failed to send order confirmation email: {str(e)}")
        import traceback
        print(f" Full error traceback:")
        traceback.print_exc()
        # Don't fail the order creation if email fails
    
    return order


@router.get("/", response_model=List[OrderResponse])
def get_user_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all orders for the current user"""
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    return orders


@router.get("/admin", response_model=List[OrderResponse])
def get_all_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Get all orders (admin only)"""
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific order"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check if user owns the order or is admin
    if order.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this order"
        )
    
    return order


@router.put("/{order_id}", response_model=OrderResponse)
def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """Update an order (admin only)"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Store old status for comparison
    old_status = order.status
    
    # Update order fields
    for field, value in order_update.dict(exclude_unset=True).items():
        setattr(order, field, value)
    
    db.commit()
    db.refresh(order)
    
    # Send status update email if status changed
    if old_status != order.status:
        try:
            email_service = EmailService()
            order_data = {
                "order_id": order.id,
                "total_amount": order.total_amount,
                "delivery_address": order.delivery_address,
                "phone_number": order.phone_number,
                "notes": order.notes
            }
            user = db.query(User).filter(User.id == order.user_id).first()
            if user:
                email_service.send_order_status_update_email(
                    user.email, 
                    user.name, 
                    order_data, 
                    order.status
                )
        except Exception as e:
            print(f"Failed to send status update email: {str(e)}")
    
    return order


@router.delete("/{order_id}")
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel an order"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check if user owns the order or is admin
    if order.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this order"
        )
    
    # Only allow cancellation if order is pending or confirmed
    if order.status not in ["pending", "confirmed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot cancel order with status: " + order.status
        )
    
    # Restore sweet quantities
    for item in order.order_items:
        sweet = db.query(Sweet).filter(Sweet.id == item.sweet_id).first()
        if sweet:
            sweet.quantity += item.quantity
    
    # Update order status
    order.status = "cancelled"
    
    db.commit()
    
    return {"message": "Order cancelled successfully"}
