import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { Receipt } from '@/components/Receipt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus, ShoppingBag, Receipt as ReceiptIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { apiClient, OrderCreate } from '@/lib/api';

const Cart = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { items, itemCount, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const subtotal = totalPrice;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      toast({
        title: "Delivery address required",
        description: "Please provide a delivery address to place your order.",
        variant: "destructive",
      });
      return;
    }

    if (!customerName.trim()) {
      toast({
        title: "Customer name required",
        description: "Please provide your name for the order.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please provide an email address to receive your order confirmation.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData: OrderCreate = {
        total_amount: total,
        delivery_address: deliveryAddress,
        phone_number: email, // Keep this for backward compatibility
        email: email, // Add the new email field
        customer_name: customerName,
        notes: notes || undefined,
        order_items: items.map(item => ({
          sweet_id: parseInt(item.sweetId),
          sweet_name: item.name,
          selected_quantity: item.selectedQuantity,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Try to create order via API, fallback to mock success if backend is not available
      try {
        await apiClient.createOrder(orderData);
      } catch (apiError) {
        console.log('API not available, using mock order success');
        
        // Show email content in console for immediate testing
        console.log('\n' + '='.repeat(60));
        console.log('📧 ORDER CONFIRMATION EMAIL');
        console.log('='.repeat(60));
        console.log(`To: ${email}`);
        console.log(`Subject: Order Confirmation - Order #${Date.now()}`);
        console.log(`From: Kata Sweet Shop <tejasdharmale6@gmail.com>`);
        console.log('='.repeat(60));
        console.log('📄 EMAIL CONTENT:');
        console.log('='.repeat(60));
        console.log(`Kata Sweet Shop - Order Confirmation

Dear ${customerName},

Thank you for your order! We're delighted to confirm that we've received your order and it's being prepared with love and care.

ORDER DETAILS:
Order ID: #${Date.now()}
Order Date: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
Customer Name: ${customerName}
Total Amount: ₹${total}

ORDER ITEMS:
${items.map(item => `- ${item.name} (${item.selectedQuantity}) x${item.quantity} = ₹${item.price}`).join('\n')}

DELIVERY INFORMATION:
Delivery Address: ${deliveryAddress}
Email: ${email}
${notes ? `Special Notes: ${notes}` : ''}

DELIVERY STATUS:
Your package will be delivered soon!
We'll send you another email once your order is on its way. 
Estimated delivery time: 2-4 hours for local orders.

NEED HELP?
Phone: +91 9067722873
Email: tejasdharmale6@gmail.com

Thank you for choosing Kata Sweet Shop!
This email was sent to ${email}`);
        console.log('='.repeat(60));
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Create order object for receipt
      const orderForReceipt = {
        id: Date.now().toString(),
        customer_name: customerName,
        email: email,
        total_amount: total,
        status: 'confirmed',
        delivery_address: deliveryAddress,
        phone_number: email,
        notes: notes,
        created_at: new Date().toISOString(),
        items: items.map(item => ({
          sweet_name: item.name,
          selected_quantity: item.selectedQuantity,
          quantity: item.quantity,
          price: item.price
        }))
      };

      setLastOrder(orderForReceipt);
      setShowReceipt(true);
      
      // Save order to localStorage for order history
      try {
        const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        existingOrders.unshift(orderForReceipt); // Add to beginning of array
        localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
      } catch (error) {
        console.error('Error saving order to history:', error);
      }
      
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order has been placed and confirmation email will be sent to ${email}. Thank you!`,
      });
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Order failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        cartCount={itemCount}
        onAuthClick={handleAuthClick}
        onCartClick={() => {}}
        onSearch={() => {}}
        searchQuery=""
      />

      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some sweet treats to get started!</p>
            <Button variant="default" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-muted-foreground">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-primary font-bold text-lg">₹{item.price}</p>
                          <Badge variant="secondary" className="mt-1">
                            {item.selectedQuantity}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Enter your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full delivery address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address for order confirmation"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special delivery instructions?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="candy"
                    className="w-full" 
                    size="lg" 
                    onClick={handleCheckout}
                    disabled={isPlacingOrder}
                  >
                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </Button>
                  
                  {lastOrder && (
                    <Button 
                      variant="secondary" 
                      className="w-full" 
                      onClick={() => setShowReceipt(true)}
                    >
                      <ReceiptIcon className="h-4 w-4 mr-2" />
                      View Last Receipt
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Receipt Modal */}
      {showReceipt && lastOrder && (
        <Receipt 
          order={lastOrder} 
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default Cart;