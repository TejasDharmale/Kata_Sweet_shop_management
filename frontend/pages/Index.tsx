import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { mockSweets, Sweet } from "@/data/mockSweets";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SweetCard } from "@/components/SweetCard";
import { FilterBar, FilterOptions } from "@/components/FilterBar";
import { AuthModal } from "@/components/AuthModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Testimonials } from "@/components/Testimonials";
import { FeedbackCommunity } from "@/components/FeedbackCommunity";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, isAuthenticated, isAdmin, login, register, googleAuth, logout } = useAuth();
  const { itemCount, addItem } = useCart();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'name'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Load sweets on component mount
  useEffect(() => {
    setSweets(mockSweets);
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = new Set<string>(JSON.parse(savedFavorites));
      setFavorites(favoriteIds);
    }
  }, []);

  // Filter and sort sweets
  const filteredSweets = useMemo(() => {
    let filtered = sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sweet.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || sweet.category === filters.category;
      
      const matchesPrice = filters.priceRange === 'all' || (() => {
        const price = sweet.price;
        switch (filters.priceRange) {
          case '0-200': return price <= 200;
          case '200-300': return price > 200 && price <= 300;
          case '300-400': return price > 300 && price <= 400;
          case '400+': return price > 400;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock': return b.quantity - a.quantity;
        default: return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [sweets, searchQuery, filters]);

  const categories = [...new Set(sweets.map(sweet => sweet.category))];

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsAuthModalOpen(false);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Sweet Shop.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (name: string, email: string, password: string, phone?: string) => {
    try {
      await register(name, email, password, phone);
      setIsAuthModalOpen(false);
      toast({
        title: "Account created!",
        description: "Welcome to Sweet Shop! Start exploring our collection.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive"
      });
    }
  };

  const handleGoogleAuth = async (googleUser: any) => {
    try {
      await googleAuth(googleUser);
      setIsAuthModalOpen(false);
      toast({
        title: "Welcome!",
        description: "Successfully logged in with Google. Enjoy shopping!",
      });
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: error instanceof Error ? error.message : "Google authentication failed",
        variant: "destructive"
      });
    }
  };

  const handlePurchase = async (sweetId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive"
      });
      setIsAuthModalOpen(true);
      return;
    }
    
    const sweet = sweets.find(s => s.id === sweetId);
    if (!sweet || sweet.quantity === 0) {
      toast({
        title: "Out of Stock",
        description: "This sweet is currently out of stock.",
        variant: "destructive"
      });
      return;
    }

    // Add to cart
    addItem(sweet.id, sweet.name, sweet.price, sweet.image);
    
    // Update local inventory
    setSweets(prev => prev.map(s => 
      s.id === sweetId ? { ...s, quantity: s.quantity - 1 } : s
    ));
    
    toast({
      title: "Added to cart!",
      description: `${sweet.name} has been added to your cart.`,
    });
  };

  const handleAddSweet = async (sweetData: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>) => {
    const newSweet: Sweet = {
      ...sweetData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setSweets(prev => [...prev, newSweet]);
    toast({
      title: "Sweet added!",
      description: `${sweetData.name} has been added to inventory.`,
    });
  };

  const handleUpdateSweet = async (updatedSweet: Sweet) => {
    setSweets(prev => prev.map(s => s.id === updatedSweet.id ? updatedSweet : s));
    toast({
      title: "Sweet updated!",
      description: `${updatedSweet.name} has been updated.`,
    });
  };

  const handleDeleteSweet = async (sweetId: string) => {
    const sweet = sweets.find(s => s.id === sweetId);
    setSweets(prev => prev.filter(s => s.id !== sweetId));
    toast({
      title: "Sweet deleted!",
      description: `${sweet?.name} has been removed from inventory.`,
    });
  };

  const handleRestock = async (sweetId: string, quantity: number) => {
    setSweets(prev => prev.map(s => 
      s.id === sweetId ? { ...s, quantity: s.quantity + quantity } : s
    ));
    toast({
      title: "Restocked!",
      description: `Added ${quantity} items to inventory.`,
    });
  };

  const handleToggleFavorite = (sweetId: string) => {
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
      
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
      
      return newFavorites;
    });
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } else {
      setIsAuthModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading sweet collection...</p>
        </div>
      </div>
    );
  }

  if (showAdmin && isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          cartCount={itemCount}
          onAuthClick={handleAuthClick}
          onCartClick={() => {}}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={() => setShowAdmin(false)}>
              Back to Shop
            </Button>
          </div>
          
          <AdminDashboard
            sweets={sweets}
            onAddSweet={handleAddSweet}
            onUpdateSweet={handleUpdateSweet}
            onDeleteSweet={handleDeleteSweet}
            onRestock={handleRestock}
          />
        </main>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onGoogleAuth={handleGoogleAuth}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
          user={user ? {
            name: user.username,
            email: user.email,
            phone: user.phone || ''
          } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        cartCount={itemCount}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onCartClick={() => {}}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      <HeroSection
        onGetStarted={() => {
          document.getElementById('sweets-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreSweets={() => {
          document.getElementById('sweets-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="container mx-auto px-4 py-12" id="sweets-section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Sweet Collection</h2>
            <p className="text-muted-foreground">Discover our carefully curated selection of traditional Indian sweets</p>
          </div>
          {isAdmin && (
            <Button variant="outline" onClick={() => setShowAdmin(true)}>
              Admin Dashboard
            </Button>
          )}
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({ category: 'all', priceRange: 'all', sortBy: 'name' })}
          categories={categories}
          totalResults={filteredSweets.length}
        />

        {!isAuthenticated ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Please log in to view our mithai collection</h3>
            <p className="text-muted-foreground mb-4">Create an account or sign in to explore our sweet offerings</p>
            <Button variant="candy" onClick={() => setIsAuthModalOpen(true)}>
              Get Started
            </Button>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No mithai found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                isAdmin={isAdmin}
                onPurchase={handlePurchase}
                onEdit={handleUpdateSweet}
                onDelete={handleDeleteSweet}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(sweet.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Testimonials />
      <FeedbackCommunity />
      
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleAuth={handleGoogleAuth}
        onLogout={logout}
        isAuthenticated={isAuthenticated}
        user={user ? {
          name: user.username,
          email: user.email,
          phone: user.phone || ''
        } : undefined}
      />
    </div>
  );
};

export default Index;
