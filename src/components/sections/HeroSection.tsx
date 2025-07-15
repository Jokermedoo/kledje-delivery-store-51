
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onScrollToProducts: () => void;
}

export default function HeroSection({ onScrollToProducts }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "اكتشفي جمالك الطبيعي",
      subtitle: "مع كليدچ",
      description: "منتجات العناية بالبشرة والشعر الطبيعية",
      gradient: "from-primary/20 via-primary-glow/10 to-secondary/20"
    },
    {
      title: "عناية فائقة",
      subtitle: "بمكونات طبيعية",
      description: "اختاري الأفضل لبشرتك وشعرك",
      gradient: "from-secondary/20 via-accent/10 to-primary/20"
    },
    {
      title: "جودة عالمية",
      subtitle: "بأسعار مناسبة",
      description: "منتجات مختارة بعناية لجمالك",
      gradient: "from-accent/20 via-primary/10 to-secondary/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-1000`}></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="space-y-8 mb-16">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-foreground mb-4 font-amiri">
                  {slides[currentSlide].title}
                </span>
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-glow font-amiri">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-cairo">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-primary text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 hover:scale-105 transition-all duration-300 font-tajawal"
                onClick={onScrollToProducts}
              >
                <ShoppingCart className="h-6 w-6 ml-3" />
                <span>تسوقي الآن</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 glass-card hover:scale-105 transition-all duration-300 font-tajawal"
              >
                <Sparkles className="h-6 w-6 ml-3" />
                <span>اكتشفي المزيد</span>
              </Button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
