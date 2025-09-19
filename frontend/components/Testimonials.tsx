import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  location: string;
  order: string;
  isLive: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment: "Absolutely amazing sweets! The Gulab Jamun was so soft and delicious. Kata Sweet Shop has become our family's go-to place for all celebrations.",
    location: "Mumbai, Maharashtra",
    order: "Gulab Jamun (1kg) - Delivered 2 hours ago",
    isLive: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Best Kaju Katli I've ever tasted! The quality is exceptional and the home delivery was super fast. Highly recommended!",
    location: "Delhi, NCR",
    order: "Kaju Katli (500g) - Delivered 1 hour ago",
    isLive: true
  },
  {
    id: 3,
    name: "Anita Patel",
    rating: 5,
    comment: "The Bengali sweets collection is outstanding. The Rasgulla melted in my mouth. Perfect for our Diwali celebrations!",
    location: "Kolkata, West Bengal",
    order: "Rasgulla (250g) - Delivered 30 minutes ago",
    isLive: true
  },
  {
    id: 4,
    name: "Suresh Reddy",
    rating: 5,
    comment: "Excellent service and quality! The Mysore Pak was exactly like my grandmother used to make. Will definitely order again.",
    location: "Bangalore, Karnataka",
    order: "Mysore Pak (500g) - Delivered 45 minutes ago",
    isLive: true
  },
  {
    id: 5,
    name: "Meera Joshi",
    rating: 5,
    comment: "The Jalebi was crispy and sweet, just perfect! The packaging was beautiful and the delivery was on time. Thank you Kata Sweet Shop!",
    location: "Pune, Maharashtra",
    order: "Jalebi (1kg) - Delivered 1 hour ago",
    isLive: true
  }
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our happy customers who just received their orders
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-candy rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {current.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{current.name}</h3>
                      <p className="text-sm text-muted-foreground">{current.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-primary/20 mb-2" />
                    <p className="text-gray-700 italic">"{current.comment}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Ordered: {current.order}</span>
                    <span>{currentTestimonial + 1} of {testimonials.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
