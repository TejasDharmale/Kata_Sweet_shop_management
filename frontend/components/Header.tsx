import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Heart, ShoppingBag, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/images/Emblem Style Logo for Kata Sweet Shop.png";

interface HeaderProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  cartCount?: number;
  onAuthClick: () => void;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Header({ 
  isAuthenticated = false, 
  isAdmin = false, 
  cartCount = 0, 
  onAuthClick, 
  onCartClick, 
  onSearch,
  searchQuery 
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src={logoImage} 
              alt="Kata Sweet Shop Emblem Logo" 
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
            <h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-candy bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              Kata Sweet Shop
            </h1>
            {isAdmin && (
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs sm:text-sm">Admin</Badge>
            )}
          </div>

          {/* Search - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
              <Input
                placeholder="Search for sweets..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-14 pr-4 py-4 bg-muted/50 border-2 focus:border-primary transition-colors text-base"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const query = prompt('Search sweets:');
                if (query) onSearch(query);
              }}
              className="h-12 w-12"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/favorites')}
                className="hover:text-red-500 transition-colors h-12 w-12 sm:h-14 sm:w-14"
              >
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
              <span className="text-sm text-muted-foreground mt-1">Favorites</span>
            </div>
            
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/cart')}
                className={`relative h-12 w-12 sm:h-14 sm:w-14 ${cartCount > 0 ? 'text-accent' : ''}`}
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0 flex items-center justify-center text-sm"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <span className="text-sm text-muted-foreground mt-1">Cart</span>
            </div>

            {isAuthenticated && (
              <>
                <div className="flex flex-col items-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/purchase')}
                    className="hover:text-primary transition-colors h-12 w-12 sm:h-14 sm:w-14"
                  >
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <span className="text-sm text-muted-foreground mt-1">Purchase</span>
                </div>

                <div className="flex flex-col items-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/order-history')}
                    className="hover:text-primary transition-colors h-12 w-12 sm:h-14 sm:w-14"
                  >
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <span className="text-sm text-muted-foreground mt-1">Orders</span>
                </div>
              </>
            )}

            <div className="flex flex-col items-center">
              <Button 
                variant={isAuthenticated ? "ghost" : "candy"} 
                size="default"
                onClick={onAuthClick}
                className="flex items-center space-x-2 sm:space-x-3 h-12 px-3 sm:px-6"
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg hidden xs:inline">{isAuthenticated ? "Profile" : "Login"}</span>
              </Button>
              <span className="text-sm text-muted-foreground mt-1">{isAuthenticated ? "Profile" : "Login"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}