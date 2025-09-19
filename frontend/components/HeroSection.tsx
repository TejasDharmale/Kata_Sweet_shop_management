import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypewriterText } from "@/components/TypewriterText";
import { NumericCounter } from "@/components/NumericCounter";
import { ImageSlider } from "@/components/ImageSlider";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreSweets: () => void;
}

export function HeroSection({ onGetStarted, onExploreSweets }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <Badge variant="secondary" className="bg-primary-glow/20 text-black border-primary/20">
               Special Mithai Offers
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Welcome to Our
              <span className="block bg-gradient-candy bg-clip-text text-transparent">
                <TypewriterText 
                  texts={["Kata Sweet Swad", "Kata Sweet Paradise", "Kata Sweet Heaven"]} 
                  speed={150}
                  pauseTime={3000}
                  className="inline-block"
                />
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Discover the finest collection of traditional Indian sweets and authentic mithai. 
              From classic regional favorites to artisanal creations, we bring India's sweetest traditions to you.
            </p>
            
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      variant="candy"
                      size="lg"
                      onClick={onGetStarted}
                      className="text-lg px-8"
                    >
                      Start Shopping
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onExploreSweets}
                      className="text-lg px-8"
                    >
                      Explore Sweets
                    </Button>
                  </div>

                  <p className="text-base font-bold text-muted-foreground text-center lg:text-left mt-4">
                    We also provide home delivery for your convenience
                  </p>
            
            <div className="flex items-center justify-center lg:justify-start space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <NumericCounter end={500} duration={2500} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Sweet Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Delivery & Takeaway</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
          
          <ImageSlider 
            className="w-full h-auto"
            autoPlay={true}
            autoPlayInterval={4000}
          />
        </div>
      </div>
    </section>
  );
}