from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Sweet Schemas
class SweetBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int
    description: Optional[str] = None
    image: Optional[str] = None


class SweetCreate(SweetBase):
    pass


class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    description: Optional[str] = None
    image: Optional[str] = None


class SweetResponse(SweetBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Purchase/Restock Schemas
class PurchaseRequest(BaseModel):
    quantity: int = 1


class RestockRequest(BaseModel):
    quantity: int


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
