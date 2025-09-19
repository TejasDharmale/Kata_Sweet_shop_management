import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { mockSweets, Sweet } from "@/data/mockSweets";
import { Header } from "@/components/Header";
import { SweetCard } from "@/components/SweetCard";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const { itemCount, addItem } = useCart();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoriteSweets, setFavoriteSweets] = useState<Sweet[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = new Set(JSON.parse(savedFavorites));
      setFavorites(favoriteIds);
      
      // Filter sweets to show only favorites
      const favorites = mockSweets.filter(sweet => favoriteIds.has(sweet.id));
      setFavoriteSweets(favorites);
    }
  }, []);

  const toggleFavorite = (sweetId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(sweetId)) {
        newFavorites.delete(sweetId);
        toast({
          title: "Removed from favorites",
          description: "This sweet has been removed from your favorites.",
        });
      } else {
        newFavorites.add(sweetId);
        toast({
          title: "Added to favorites",
          description: "This sweet has been added to your favorites.",
        });
      }
      
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
      
      // Update favorite sweets list
      const favorites = mockSweets.filter(sweet => newFavorites.has(sweet.id));
      setFavoriteSweets(favorites);
      
      return newFavorites;
    });
  };

  const handleAddToCart = (sweetId: string, name: string, price: number, image: string, selectedQuantity?: string, quantity?: number) => {
    addItem(sweetId, name, price, image, selectedQuantity, quantity);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleSearch = (query: string) => {
    // Search functionality can be added here if needed
    console.log('Search query:', query);
  };

  const handleAuthClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={isAuthenticated}
          cartCount={itemCount}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          onSearch={handleSearch}
          searchQuery=""
        />
        <div className="container mx-auto px-6 py-20 text-center">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Login Required</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please login to view your favorite sweets.
          </p>
          <Button onClick={handleAuthClick} variant="candy" size="lg">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        cartCount={itemCount}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        onSearch={handleSearch}
        searchQuery=""
      />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span>My Favorites</span>
              </h1>
              <p className="text-muted-foreground">
                {favoriteSweets.length} sweet{favoriteSweets.length !== 1 ? 's' : ''} in your favorites
              </p>
            </div>
          </div>
        </div>

        {favoriteSweets.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-8">
              Start adding sweets to your favorites by clicking the heart icon on any sweet.
            </p>
            <Button onClick={() => navigate('/')} variant="candy" size="lg">
              Browse Sweets
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onAddToCart={handleAddToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.has(sweet.id)}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
