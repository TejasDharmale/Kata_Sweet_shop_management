import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Dict, Any
import os
from datetime import datetime
import asyncio

class EmailService:
    def __init__(self):
        # Email configuration - you can set these as environment variables
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.sender_email = os.getenv("SENDER_EMAIL", "tejasdharmale6@gmail.com")
        self.sender_password = os.getenv("SENDER_PASSWORD", "")
        self.sender_name = "Kata Sweet Shop"
    
    def send_order_confirmation_email(self, user_email: str, user_name: str, order_data: Dict[str, Any]):
        """Send order confirmation email to customer"""
        
        subject = f"Order Confirmation - Order #{order_data['order_id']}"
        
        # Create HTML email content
        html_content = self._create_order_confirmation_html(user_name, order_data)
        text_content = self._create_order_confirmation_text(user_name, order_data)
        
        # Send email
        self._send_email(user_email, subject, html_content, text_content)
    
    def send_order_status_update_email(self, user_email: str, user_name: str, order_data: Dict[str, Any], status: str):
        """Send order status update email to customer"""
        
        subject = f"Order Update - Order #{order_data['order_id']}"
        
        # Create HTML email content based on status
        html_content = self._create_status_update_html(user_name, order_data, status)
        text_content = self._create_status_update_text(user_name, order_data, status)
        
        # Send email
        self._send_email(user_email, subject, html_content, text_content)
    
    def _create_order_confirmation_html(self, user_name: str, order_data: Dict[str, Any]) -> str:
        """Create HTML content for order confirmation email"""
        
        order_items_html = ""
        for item in order_data['order_items']:
            order_items_html += f"""
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">{item['sweet_name']}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">{item['selected_quantity']}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">{item['quantity']}</td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">₹{item['price']}</td>
            </tr>
            """
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Order Confirmation - Kata Sweet Shop</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🍯 Kata Sweet Shop</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Traditional Indian Sweets</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #ff6b35; margin-top: 0;">Thank You for Your Order!</h2>
                <p>Dear <strong>{user_name}</strong>,</p>
                <p>We're delighted to confirm that we've received your order and it's being prepared with love and care!</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #ff6b35;">Order Details</h3>
                <p><strong>Order ID:</strong> #{order_data['order_id']}</p>
                <p><strong>Order Date:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                <p><strong>Customer Name:</strong> {order_data.get('customer_name', user_name)}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #ff6b35;">Pricing Breakdown</h3>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ff6b35;">
                    <p style="margin: 5px 0;"><strong>Subtotal:</strong> ₹{order_data.get('subtotal', sum(item['price'] for item in order_data['order_items']))}</p>
                    <p style="margin: 5px 0;"><strong>Tax (18% GST):</strong> ₹{order_data.get('tax', round(sum(item['price'] for item in order_data['order_items']) * 0.18))}</p>
                    <hr style="margin: 10px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #ff6b35;"><strong>Total Amount:</strong> ₹{order_data['total_amount']}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #ff6b35;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <thead>
                        <tr style="background: #ff6b35; color: white;">
                            <th style="padding: 12px; text-align: left;">Sweet Name</th>
                            <th style="padding: 12px; text-align: center;">Size</th>
                            <th style="padding: 12px; text-align: center;">Quantity</th>
                            <th style="padding: 12px; text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order_items_html}
                    </tbody>
                </table>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #ff6b35;">Delivery Information</h3>
                <p><strong>Delivery Address:</strong> {order_data['delivery_address']}</p>
                <p><strong>Phone Number:</strong> {order_data['phone_number']}</p>
                {f'<p><strong>Special Notes:</strong> {order_data["notes"]}</p>' if order_data.get('notes') else ''}
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #4caf50;">
                <h3 style="color: #4caf50; margin-top: 0;">🚚 Delivery Status</h3>
                <p><strong>Your package will be delivered soon!</strong></p>
                <p>We'll send you another email once your order is on its way. Estimated delivery time: 2-4 hours for local orders.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                <h3 style="color: #ff6b35; margin-top: 0;">Need Help?</h3>
                <p>If you have any questions about your order, please contact us:</p>
                <p><strong>Phone:</strong> +91 9067722873</p>
                <p><strong>Email:</strong> tejasdharmale6@gmail.com</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                <p>Thank you for choosing Kata Sweet Shop! 🍯</p>
                <p>This email was sent to {user_email}</p>
            </div>
        </body>
        </html>
        """
    
    def _create_order_confirmation_text(self, user_name: str, order_data: Dict[str, Any]) -> str:
        """Create plain text content for order confirmation email"""
        
        order_items_text = ""
        for item in order_data['order_items']:
            order_items_text += f"- {item['sweet_name']} ({item['selected_quantity']}) x{item['quantity']} = ₹{item['price']}\n"
        
        return f"""
Kata Sweet Shop - Order Confirmation

Dear {user_name},

Thank you for your order! We're delighted to confirm that we've received your order and it's being prepared with love and care.

ORDER DETAILS:
Order ID: #{order_data['order_id']}
Order Date: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
Customer Name: {order_data.get('customer_name', user_name)}

PRICING BREAKDOWN:
Subtotal: ₹{order_data.get('subtotal', sum(item['price'] for item in order_data['order_items']))}
Tax (18% GST): ₹{order_data.get('tax', round(sum(item['price'] for item in order_data['order_items']) * 0.18))}
Total Amount: ₹{order_data['total_amount']}

ORDER ITEMS:
{order_items_text}

DELIVERY INFORMATION:
Delivery Address: {order_data['delivery_address']}
Phone Number: {order_data['phone_number']}
{f"Special Notes: {order_data['notes']}" if order_data.get('notes') else ""}

DELIVERY STATUS:
Your package will be delivered soon!
We'll send you another email once your order is on its way. 
Estimated delivery time: 2-4 hours for local orders.

NEED HELP?
Phone: +91 9067722873
Email: tejasdharmale6@gmail.com

Thank you for choosing Kata Sweet Shop!
This email was sent to {user_email}
        """
    
    def _create_status_update_html(self, user_name: str, order_data: Dict[str, Any], status: str) -> str:
        """Create HTML content for status update email"""
        
        status_messages = {
            "confirmed": {
                "title": "Order Confirmed!",
                "message": "Your order has been confirmed and is being prepared.",
                "color": "#4caf50"
            },
            "preparing": {
                "title": "Order Being Prepared",
                "message": "Our chefs are preparing your sweets with love and care.",
                "color": "#ff9800"
            },
            "ready": {
                "title": "Order Ready for Pickup/Delivery",
                "message": "Your order is ready! It will be delivered shortly.",
                "color": "#2196f3"
            },
            "delivered": {
                "title": "Order Delivered!",
                "message": "Your order has been successfully delivered. Enjoy your sweets!",
                "color": "#4caf50"
            },
            "cancelled": {
                "title": "Order Cancelled",
                "message": "Your order has been cancelled as requested.",
                "color": "#f44336"
            }
        }
        
        status_info = status_messages.get(status, {
            "title": "Order Status Update",
            "message": f"Your order status has been updated to: {status}",
            "color": "#ff6b35"
        })
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Order Update - Kata Sweet Shop</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🍯 Kata Sweet Shop</h1>
                <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Traditional Indian Sweets</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: {status_info['color']}; margin-top: 0;">{status_info['title']}</h2>
                <p>Dear <strong>{user_name}</strong>,</p>
                <p>{status_info['message']}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #ff6b35;">Order Details</h3>
                <p><strong>Order ID:</strong> #{order_data['order_id']}</p>
                <p><strong>Current Status:</strong> <span style="color: {status_info['color']}; font-weight: bold;">{status.title()}</span></p>
                <p><strong>Total Amount:</strong> ₹{order_data['total_amount']}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
                <h3 style="color: #ff6b35; margin-top: 0;">Need Help?</h3>
                <p>If you have any questions about your order, please contact us:</p>
                <p><strong>Phone:</strong> +91 9067722873</p>
                <p><strong>Email:</strong> tejasdharmale6@gmail.com</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                <p>Thank you for choosing Kata Sweet Shop! 🍯</p>
                <p>This email was sent to {user_email}</p>
            </div>
        </body>
        </html>
        """
    
    def _create_status_update_text(self, user_name: str, order_data: Dict[str, Any], status: str) -> str:
        """Create plain text content for status update email"""
        
        status_messages = {
            "confirmed": "Your order has been confirmed and is being prepared.",
            "preparing": "Our chefs are preparing your sweets with love and care.",
            "ready": "Your order is ready! It will be delivered shortly.",
            "delivered": "Your order has been successfully delivered. Enjoy your sweets!",
            "cancelled": "Your order has been cancelled as requested."
        }
        
        message = status_messages.get(status, f"Your order status has been updated to: {status}")
        
        return f"""
Kata Sweet Shop - Order Status Update

Dear {user_name},

{message}

ORDER DETAILS:
Order ID: #{order_data['order_id']}
Current Status: {status.title()}
Total Amount: ₹{order_data['total_amount']}

NEED HELP?
Phone: +91 9067722873
Email: tejasdharmale6@gmail.com

Thank you for choosing Kata Sweet Shop!
This email was sent to {user_email}
        """
    
    def _send_email(self, recipient_email: str, subject: str, html_content: str, text_content: str):
        """Send email using SMTP"""
        try:
            # Always log the email content for debugging
            print(f"\n{'='*60}")
            print(f" EMAIL NOTIFICATION")
            print(f"{'='*60}")
            print(f"To: {recipient_email}")
            print(f"Subject: {subject}")
            print(f"From: {self.sender_name} <{self.sender_email}>")
            print(f"{'='*60}")
            print(f" EMAIL CONTENT PREVIEW:")
            print(f"{'='*60}")
            print(f"Plain Text Version:")
            print("-" * 40)
            print(text_content[:500] + "..." if len(text_content) > 500 else text_content)
            print(f"{'='*60}")
            
            # Try to send email if password is configured
            if self.sender_password:
                try:
                    # Create message
                    msg = MIMEMultipart('alternative')
                    msg['Subject'] = subject
                    msg['From'] = f"{self.sender_name} <{self.sender_email}>"
                    msg['To'] = recipient_email
                    
                    # Add text and HTML parts
                    text_part = MIMEText(text_content, 'plain')
                    html_part = MIMEText(html_content, 'html')
                    
                    msg.attach(text_part)
                    msg.attach(html_part)
                    
                    # Connect to server and send email
                    server = smtplib.SMTP(self.smtp_server, self.smtp_port)
                    server.starttls()
                    server.login(self.sender_email, self.sender_password)
                    server.send_message(msg)
                    server.quit()
                    print(f" Email sent successfully to {recipient_email}")
                except Exception as smtp_error:
                    print(f" SMTP Error: {str(smtp_error)}")
                    print(f" Email content logged above for manual sending")
            else:
                print(f"  Email service not configured (no password set)")
                print(f" Email content logged above - you can copy and send manually")
                print(f" To enable email sending, set SENDER_PASSWORD environment variable")
            
            print(f"{'='*60}\n")
                
        except Exception as e:
            print(f" Failed to process email to {recipient_email}: {str(e)}")
            # Don't raise exception to avoid breaking order creation
    
    async def send_contact_form_email(self, to_email: str, subject: str, html_content: str, customer_name: str, customer_email: str):
        """Send contact form email to store owner"""
        try:
            print(f"📧 Sending contact form email to {to_email}")
            print(f"Subject: {subject}")
            print(f"From customer: {customer_name} ({customer_email})")
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = f"{self.sender_name} <{self.sender_email}>"
            msg['To'] = to_email
            msg['Subject'] = subject
            msg['Reply-To'] = customer_email  # Allow direct reply to customer
            
            # Create text version
            text_content = f"""
New Contact Form Submission - Kata Sweet Shop

Name: {customer_name}
Email: {customer_email}
Subject: {subject}

Message:
{html_content.replace('<br>', '\n').replace('<div class="message">', '').replace('</div>', '').replace('<strong>', '').replace('</strong>', '')}

This message was sent from the Kata Sweet Shop contact form.
Reply directly to this email to respond to the customer.
            """
            
            # Attach parts
            text_part = MIMEText(text_content, 'plain', 'utf-8')
            html_part = MIMEText(html_content, 'html', 'utf-8')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            if not self.sender_password:
                print("⚠️ SENDER_PASSWORD not set. Email sending disabled.")
                print("📧 Contact form email would be sent to:", to_email)
                print("📧 Subject:", subject)
                print("📧 Customer:", customer_name, f"({customer_email})")
                return True
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
                
            print(f"✅ Contact form email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to send contact form email to {to_email}: {str(e)}")
            return False
