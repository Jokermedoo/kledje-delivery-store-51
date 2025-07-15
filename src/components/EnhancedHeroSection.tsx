
import { ArrowDown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCounter from './AnimatedCounter';

export default function EnhancedHeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-tr from-primary-glow/15 to-primary/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-primary-glow/10 to-primary/5 rounded-full blur-3xl floating-element" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-32 left-20 text-primary/30 w-8 h-8 floating-element" />
        <Star className="absolute top-40 right-32 text-primary-glow/40 w-6 h-6 floating-element" style={{animationDelay: '0.5s'}} />
        <Sparkles className="absolute bottom-40 right-20 text-primary/20 w-10 h-10 floating-element" style={{animationDelay: '1.5s'}} />
        <Star className="absolute bottom-32 left-40 text-primary-glow/30 w-7 h-7 floating-element" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge */}
          <div className="glass-card inline-block px-8 py-4 rounded-full mb-12 hover:scale-110 transition-all duration-500 animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-bold text-xl">
              ✨ أحدث منتجات العناية الطبيعية
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight animate-fade-in">
            <span className="block gradient-text-animated">كليدچ</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-muted-foreground mt-4 font-normal">
              Kledje
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 mb-12 max-w-5xl mx-auto leading-relaxed animate-slide-up font-light">
            اكتشفي عالم الجمال الطبيعي مع مجموعتنا المختارة من أفضل منتجات العناية بالبشرة والشعر
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-glow">
              <div className="text-4xl md:text-5xl font-bold glow-text mb-2">
                +<AnimatedCounter end={1000} duration={2000} />
              </div>
              <p className="text-muted-foreground text-xl">عميلة سعيدة</p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-glow">
              <div className="text-4xl md:text-5xl font-bold glow-text mb-2">
                <AnimatedCounter end={100} duration={2000} />%
              </div>
              <p className="text-muted-foreground text-xl">مكونات طبيعية</p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-glow">
              <div className="text-4xl md:text-5xl font-bold glow-text mb-2">
                <AnimatedCounter end={24} duration={2000} />/7
              </div>
              <p className="text-muted-foreground text-xl">دعم عملاء</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scale-in">
            <Button 
              size="lg" 
              className="btn-primary text-xl px-12 py-8 rounded-full hover:scale-110 transition-all duration-500 shadow-glow"
              onClick={scrollToProducts}
            >
              <Sparkles className="ml-2 h-6 w-6" />
              تسوقي الآن
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline text-xl px-12 py-8 rounded-full hover:scale-110 transition-all duration-500"
            >
              اعرفي أكثر
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce cursor-pointer" onClick={scrollToProducts}>
            <ArrowDown className="mx-auto h-8 w-8 text-primary/70 hover:text-primary transition-colors" />
            <p className="text-sm text-muted-foreground mt-2">اسحبي لأسفل لرؤية المنتجات</p>
          </div>
        </div>
      </div>
    </section>
  );
}
