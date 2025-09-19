import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-sweet-shop.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreSweets: () => void;
}

export function HeroSection({ onGetStarted, onExploreSweets }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary-glow/20 text-primary border-primary/20">
              🧿 Special Mithai Offers
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Welcome to Our
              <span className="block bg-gradient-candy bg-clip-text text-transparent animate-sparkle">
                Mithai Paradise
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Discover the finest collection of traditional Indian sweets and authentic mithai. 
              From classic regional favorites to artisanal creations, we bring India's sweetest traditions to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="candy" 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg px-8"
              >
                🛒 Start Shopping
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onExploreSweets}
                className="text-lg px-8"
              >
                🔍 Explore Mithai
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Mithai Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Fresh Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">⭐ 4.9</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-candy opacity-20 rounded-3xl blur-3xl animate-pulse"></div>
            <img 
              src={heroImage} 
              alt="Sweet collection featuring colorful candies and chocolates"
              className="relative rounded-3xl shadow-candy w-full h-auto animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}