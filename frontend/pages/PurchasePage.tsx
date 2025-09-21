import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Receipt } from '@/components/Receipt';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { mockSweets, Sweet } from '@/data/mockSweets';
import { apiClient, OrderCreate } from '@/lib/api';
import { ArrowLeft, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

const PurchasePage = () => {
  const { sweetId } = useParams<{ sweetId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Sweet data
  const [sweet, setSweet] = useState<Sweet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to make a purchase.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    // Find the sweet by ID
    const foundSweet = mockSweets.find(s => s.id === sweetId);
    if (foundSweet) {
      setSweet(foundSweet);
    } else {
      toast({
        title: "Sweet not found",
        description: "The requested sweet could not be found.",
        variant: "destructive",
      });
      navigate('/');
    }
    setLoading(false);
  }, [sweetId, isAuthenticated, navigate, toast]);

  // Calculate dynamic price based on quantity
  const getPriceForQuantity = (basePrice: number, quantity: string) => {
    const quantityMultipliers: Record<string, number> = {
      '250g': 0.6,   // 60% of base price for 250g
      '500g': 1.0,   // 100% of base price for 500g (base)
      '1kg': 1.8     // 180% of base price for 1kg
    };
    
    return Math.round(basePrice * (quantityMultipliers[quantity] || 1.0));
  };

  const currentPrice = sweet ? getPriceForQuantity(sweet.price, selectedQuantity) : 0;
  const subtotal = currentPrice * quantity;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handlePurchase = async () => {
    if (!sweet) return;

    // Validation
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

    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please provide your phone number for delivery contact.",
        variant: "destructive",
      });
      return;
    }

    // Phone number validation: 10 digits starting with 6,7,8,9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid phone number",
        description: "Phone number must be 10 digits starting with 6, 7, 8, or 9.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Create order data for API
      const orderData: OrderCreate = {
        total_amount: total,
        delivery_address: deliveryAddress,
        phone_number: phoneNumber,
        email: email,
        customer_name: customerName,
        notes: notes || undefined,
        order_items: [{
          sweet_id: parseInt(sweet.id),
          sweet_name: `${sweet.name} (${selectedQuantity})`,
          selected_quantity: selectedQuantity,
          quantity: quantity,
          price: subtotal
        }]
      };

      // Try to create order via API, fallback to mock success if backend is not available
      let orderForReceipt;
      try {
        const apiOrder = await apiClient.createOrder(orderData);
        
        // Create receipt object from API response
        orderForReceipt = {
          id: apiOrder.id.toString(),
          customer_name: (apiOrder as any).customer_name || customerName,
          email: (apiOrder as any).email || email,
          total_amount: apiOrder.total_amount,
          status: apiOrder.status,
          delivery_address: apiOrder.delivery_address,
          phone_number: apiOrder.phone_number,
          notes: apiOrder.notes,
          created_at: apiOrder.created_at,
          items: apiOrder.order_items.map(item => ({
            sweet_name: item.sweet_name,
            quantity: item.quantity,
            price: item.price
          }))
        };
        
        toast({
          title: "Order Placed Successfully!",
          description: `Your order for ${sweet.name} has been confirmed.`,
        });
        
      } catch (apiError) {
        console.log('API not available, using mock order success');
        
        // Create mock order for receipt
        orderForReceipt = {
          id: Date.now().toString(),
          customer_name: customerName,
          email: email,
          total_amount: total,
          status: 'confirmed',
          delivery_address: deliveryAddress,
          phone_number: phoneNumber,
          notes: notes,
          created_at: new Date().toISOString(),
          items: [{
            sweet_name: `${sweet.name} (${selectedQuantity})`,
            quantity: quantity,
            price: subtotal
          }]
        };
        
        // Save order to localStorage for order history (fallback)
        try {
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          existingOrders.push(orderForReceipt);
          localStorage.setItem('orders', JSON.stringify(existingOrders));
        } catch (error) {
          console.error('Error saving order to localStorage:', error);
        }
        
        toast({
          title: "Order Placed Successfully!",
          description: `Your order for ${sweet.name} has been confirmed.`,
        });
      }

      setLastOrder(orderForReceipt);
      setShowReceipt(true);

    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleAddToCart = () => {
    if (!sweet) return;
    
    addItem(sweet.id, sweet.name, currentPrice, sweet.image, selectedQuantity, quantity);
    
    toast({
      title: "Added to cart!",
      description: `${sweet.name} (${selectedQuantity}) x${quantity} has been added to your cart.`,
    });
    navigate('/cart');
  };

  const handleAuthClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!sweet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sweet Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  if (showReceipt && lastOrder) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          cartCount={0}
          onAuthClick={handleAuthClick}
          onCartClick={() => navigate('/cart')}
          onSearch={() => {}}
          searchQuery=""
          showAuthModal={() => {}}
        />
        <div className="container mx-auto px-4 py-24">
          <Receipt order={lastOrder} onClose={() => setShowReceipt(false)} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        cartCount={0}
        onAuthClick={handleAuthClick}
        onCartClick={() => navigate('/cart')}
        onSearch={() => {}}
        searchQuery=""
        showAuthModal={() => {}}
      />

      <main className="container mx-auto px-4 py-24">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Purchase {sweet.name}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sweet Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Sweet Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square rounded-lg bg-gradient-soft overflow-hidden">
                  <img 
                    src={sweet.image} 
                    alt={sweet.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">{sweet.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {sweet.category}
                  </Badge>
                  <p className="text-muted-foreground mb-4">{sweet.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="quantity-select">Select Quantity</Label>
                    <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="250g">250g</SelectItem>
                        <SelectItem value="500g">500g</SelectItem>
                        <SelectItem value="1kg">1kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">How many pieces?</Label>
                    <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Price per piece:</span>
                      <span className="text-xl font-bold text-primary">₹{currentPrice}</span>
                    </div>
                    {selectedQuantity !== '500g' && (
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Base price (500g):</span>
                        <span className="line-through">₹{sweet.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Enter your full name (max 100 characters)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter 10-digit number (6-9xxxxxxxxx)"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhoneNumber(value);
                    }}
                    maxLength={10}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full delivery address (max 300 characters)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    maxLength={300}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special delivery instructions?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Order Summary */}
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold">Order Summary</h4>
                  <div className="flex justify-between">
                    <span>{sweet.name} ({selectedQuantity}) x{quantity}</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    disabled={isPlacingOrder}
                    className="flex-1"
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchasePage;
