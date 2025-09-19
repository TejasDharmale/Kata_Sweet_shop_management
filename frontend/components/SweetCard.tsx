import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      addItem(sweet.id, sweet.name, sweet.price, sweet.image);
      
      setTimeout(() => {
        setIsAdding(false);
        toast({
          title: "Added to cart!",
          description: `${sweet.name} has been added to your cart.`,
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
      className={`group transition-all duration-300 hover:shadow-candy ${isHovered ? 'scale-105' : ''} ${isOutOfStock ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="aspect-square rounded-lg bg-gradient-soft mb-4 overflow-hidden">
          <img src={sweet.image} alt={sweet.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {sweet.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite?.(sweet.id)}
              className="h-8 w-8 hover:text-red-500"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
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
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₹{sweet.price}
            </span>
            <span className={`text-sm ${isOutOfStock ? 'text-destructive' : 'text-muted-foreground'}`}>
              {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-x-2">
        {isAdmin ? (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit?.(sweet)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete?.(sweet.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button 
            variant={isOutOfStock ? "outline" : "candy"} 
            size="sm" 
            disabled={isOutOfStock || isAdding}
            onClick={handleAddToCart}
            className="w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAdding ? "Adding..." : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}