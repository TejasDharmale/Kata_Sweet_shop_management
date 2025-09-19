import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface CartItem {
  id: string;
  sweetId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (sweetId: string, name: string, price: number, image: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever items change
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (sweetId: string, name: string, price: number, image: string, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.sweetId === sweetId);
      if (existingItem) {
        return prev.map(item =>
          item.sweetId === sweetId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: Date.now().toString(),
          sweetId,
          name,
          price,
          quantity,
          image
        }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value: CartContextType = {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}