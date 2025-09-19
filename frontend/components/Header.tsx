import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Heart } from "lucide-react";
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
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Kata Sweet Shop Emblem Logo" 
              className="h-12 w-12 object-contain"
            />
            <h1 className="text-3xl font-bold bg-gradient-candy bg-clip-text text-transparent">
              Kata Sweet Shop
            </h1>
            {isAdmin && (
              <Badge variant="secondary" className="ml-2">Admin</Badge>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for sweets..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-12 pr-4 py-3 bg-muted/50 border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/favorites')}
              className="hover:text-red-500 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/cart')}
              className={`relative ${cartCount > 0 ? 'text-accent' : ''}`}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button 
              variant={isAuthenticated ? "ghost" : "candy"} 
              size="sm"
              onClick={onAuthClick}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{isAuthenticated ? "Profile" : "Login"}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}