from typing import Optional
from pydantic import BaseModel, EmailStr

class ContactIn(BaseModel):
    name: str
    company: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    budget: Optional[str] = ""
    service: Optional[str] = ""
    message: str

class ContactOut(BaseModel):
    success: bool
    message: str
    leadId: Optional[int] = None
