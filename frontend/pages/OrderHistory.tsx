import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Receipt } from '@/components/Receipt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReceiptIcon, Eye, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  sweet_name: string;
  selected_quantity: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  email: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  phone_number: string;
  notes?: string;
  created_at: string;
  items: OrderItem[];
}

const OrderHistory = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Load orders from localStorage (in a real app, this would be from the API)
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orderHistory');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, navigate]);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    }
  };

  const handleSearch = (query: string) => {
    // Implement search functionality if needed
  };

  const viewReceipt = (order: Order) => {
    setSelectedOrder(order);
    setShowReceipt(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={false}
        cartCount={0}
        onAuthClick={handleAuthClick}
        onCartClick={() => navigate('/cart')}
        onSearch={handleSearch}
        searchQuery=""
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-candy bg-clip-text text-transparent mb-4">
              Order History
            </h1>
            <p className="text-muted-foreground text-lg">
              View and download receipts for all your orders
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ReceiptIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your order history here.
                </p>
                <Button onClick={() => navigate('/')} variant="candy">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            ₹{order.total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Details</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><strong>Name:</strong> {order.customer_name}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>Phone:</strong> {order.phone_number}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                        <p className="text-sm text-muted-foreground">
                          {order.delivery_address}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.sweet_name} ({item.selected_quantity}) x{item.quantity}
                            </span>
                            <span className="font-medium">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Special Instructions</h4>
                        <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                          {order.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                      <Button 
                        onClick={() => viewReceipt(order)}
                        variant="outline"
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Receipt
                      </Button>
                      <Button 
                        onClick={() => viewReceipt(order)}
                        variant="candy"
                        className="flex-1 sm:flex-none"
                      >
                        <ReceiptIcon className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Receipt Modal */}
      {showReceipt && selectedOrder && (
        <Receipt 
          order={selectedOrder} 
          onClose={() => {
            setShowReceipt(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderHistory;
