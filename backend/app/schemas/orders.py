from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class OrderItemCreate(BaseModel):
    sweet_id: int
    sweet_name: str
    selected_quantity: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    total_amount: float
    delivery_address: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    customer_name: Optional[str] = None
    notes: Optional[str] = None
    order_items: List[OrderItemCreate]


class OrderItemResponse(BaseModel):
    id: int
    sweet_id: int
    sweet_name: str
    selected_quantity: str
    quantity: int
    price: float
    created_at: datetime

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    delivery_address: Optional[str]
    phone_number: Optional[str]
    email: Optional[str]
    customer_name: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    order_items: List[OrderItemResponse]

    class Config:
        from_attributes = True


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    delivery_address: Optional[str] = None
    phone_number: Optional[str] = None
    notes: Optional[str] = None
