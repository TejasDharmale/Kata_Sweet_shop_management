import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Sweet } from "@/data/mockSweets";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


interface SweetCardProps {
  sweet: Sweet;
  isAdmin?: boolean;
  onPurchase?: (sweetId: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (sweetId: string) => void;
  onToggleFavorite?: (sweetId: string) => void;
  isFavorite?: boolean;
}

export function SweetCard({ 
  sweet, 
  isAdmin = false, 
  onPurchase, 
  onEdit, 
  onDelete, 
  onToggleFavorite,
  isFavorite = false 
}: SweetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('500g');
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isOutOfStock = sweet.quantity === 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    if (onPurchase) {
      onPurchase(sweet.id);
    } else {
      setIsAdding(true);
      addItem(sweet.id, sweet.name, sweet.price, sweet.image, selectedQuantity, 1);
      
      setTimeout(() => {
        setIsAdding(false);
        toast({
          title: "Added to cart!",
          description: `${sweet.name} (${selectedQuantity}) has been added to your cart.`,
        });
        navigate('/cart');
      }, 500);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Mithai': 'bg-amber-100 text-amber-800',
      'Bengali Sweet': 'bg-pink-100 text-pink-800',
      'Dry Fruit Sweet': 'bg-green-100 text-green-800',
      'Traditional': 'bg-purple-100 text-purple-800',
      'Milk Sweet': 'bg-orange-100 text-orange-800',
      'South Indian': 'bg-blue-100 text-blue-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card 
      className={`group transition-all duration-300 hover:shadow-candy ${isHovered ? 'scale-105' : ''} ${isOutOfStock ? 'opacity-75' : ''} h-full flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="aspect-square rounded-lg bg-gradient-soft mb-3 sm:mb-4 overflow-hidden">
          <img src={sweet.image} alt={sweet.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
        
        <div className="space-y-2 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors leading-tight">
              {sweet.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite?.(sweet.id)}
              className="h-7 w-7 sm:h-8 sm:w-8 hover:text-red-500 flex-shrink-0"
            >
              <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
          <Badge variant="secondary" className={getCategoryColor(sweet.category)}>
            {sweet.category}
          </Badge>
          
          {sweet.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {sweet.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              ₹{sweet.price}
            </span>
            <span className={`text-xs sm:text-sm ${isOutOfStock ? 'text-destructive' : 'text-muted-foreground'}`}>
              {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
            </span>
          </div>
          
          {!isAdmin && (
            <div className="space-y-2 mt-auto">
              <label className="text-xs sm:text-sm font-medium">Select Quantity:</label>
              <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
                <SelectTrigger className="w-full h-9 sm:h-10">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250g">250g</SelectItem>
                  <SelectItem value="500g">500g</SelectItem>
                  <SelectItem value="1kg">1kg</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        {isAdmin ? (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit?.(sweet)}
              className="flex-1 h-9 sm:h-10"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Edit</span>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete?.(sweet.id)}
              className="h-9 w-9 sm:h-10 sm:w-10 p-0"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant={isOutOfStock ? "outline" : "candy"} 
            size="sm" 
            disabled={isOutOfStock || isAdding}
            onClick={handleAddToCart}
            className="w-full h-9 sm:h-10"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">
              {isAdding ? "Adding..." : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}