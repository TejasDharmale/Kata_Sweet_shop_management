import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import all main page images
import mainPageImage1 from '@/images/Main page logo.webp';
import mainPageImage2 from '@/images/main page img 2.jpg';
import mainPageImage3 from '@/images/main page img 3.jpg';
import mainPageImage4 from '@/images/main page img 4.jpg';

interface ImageSliderProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const images = [
  {
    src: mainPageImage1,
    alt: 'Kata Sweet Shop - Traditional Indian Sweets Collection 1'
  },
  {
    src: mainPageImage2,
    alt: 'Kata Sweet Shop - Traditional Indian Sweets Collection 2'
  },
  {
    src: mainPageImage3,
    alt: 'Kata Sweet Shop - Traditional Indian Sweets Collection 3'
  },
  {
    src: mainPageImage4,
    alt: 'Kata Sweet Shop - Traditional Indian Sweets Collection 4'
  }
];

export function ImageSlider({ 
  className = "", 
  autoPlay = true, 
  autoPlayInterval = 4000 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isHovered, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };


  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Container with Cool Effects */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-3xl">
        {/* Image with Parallax Effect */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover transition-all duration-1000 ease-out transform hover:scale-110"
            style={{
              transform: `scale(${isHovered ? 1.1 : 1}) translateY(${isHovered ? -10 : 0}px)`,
            }}
          />
          
          {/* Animated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-amber-600/30 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-saffron-500/10 via-transparent to-orange-300/20"></div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 shadow-2xl border-2 border-white/20"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 shadow-2xl border-2 border-white/20"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </Button>


      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-500 hover:scale-125 ${
              index === currentIndex
                ? 'w-8 h-3 bg-white shadow-lg rounded-full'
                : 'w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>


      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-100 ease-linear"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
