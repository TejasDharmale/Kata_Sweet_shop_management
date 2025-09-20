from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.services.email_service import EmailService

router = APIRouter()

class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

@router.post("/contact")
async def send_contact_email(contact_data: ContactFormData):
    """
    Send contact form email to store owner
    """
    try:
        email_service = EmailService()
        
        # Create email content
        subject = f"Contact Form - {contact_data.subject}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #ea580c, #f59e0b); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #ea580c; }}
                .value {{ margin-top: 5px; }}
                .message {{ background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ea580c; }}
                .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2> New Contact Form Submission - Kata Sweet Shop</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label"> Name:</div>
                        <div class="value">{contact_data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label"> Email:</div>
                        <div class="value">{contact_data.email}</div>
                    </div>
                    <div class="field">
                        <div class="label"> Phone:</div>
                        <div class="value">{contact_data.phone}</div>
                    </div>
                    <div class="field">
                        <div class="label"> Subject:</div>
                        <div class="value">{contact_data.subject}</div>
                    </div>
                    <div class="field">
                        <div class="label"> Message:</div>
                        <div class="message">{contact_data.message.replace(chr(10), '<br>')}</div>
                    </div>
                    <div class="footer">
                        <p>This message was sent from the Kata Sweet Shop contact form.</p>
                        <p>Reply directly to this email to respond to the customer.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send email to store owner
        success = await email_service.send_contact_form_email(
            to_email="tejasdharmale6@gmail.com",
            subject=subject,
            html_content=html_content,
            customer_name=contact_data.name,
            customer_email=contact_data.email
        )
        
        if success:
            return {"message": "Contact form submitted successfully", "status": "success"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
            
    except Exception as e:
        print(f"Error sending contact email: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
