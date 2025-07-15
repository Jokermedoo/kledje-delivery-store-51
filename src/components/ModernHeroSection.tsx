import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Sparkles, Star, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import FloatingParticles from './FloatingParticles';
import GlowingOrb from './GlowingOrb';

const scrollToProducts = () => {
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
};

export default function ModernHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Glowing orbs */}
        <GlowingOrb size="xl" color="primary" intensity="low" className="top-20 right-20" />
        <GlowingOrb size="lg" color="secondary" intensity="medium" className="bottom-32 left-16" />
        <GlowingOrb size="md" color="accent" intensity="high" className="top-1/2 right-1/4" />
        
        {/* Floating particles */}
        <FloatingParticles count={30} />
        
        {/* Cosmic background mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent aurora-bg"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-primary-glow/15 to-transparent rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
        
        {/* Floating icons */}
        <div className="absolute top-20 left-20 text-primary/30 floating-element">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 right-32 text-primary-glow/30 floating-element" style={{animationDelay: '1s'}}>
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 left-20 text-accent/30 floating-element" style={{animationDelay: '3s'}}>
          <Zap className="w-10 h-10" />
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Badge */}
          <div className="inline-block">
            <Badge 
              className="glass-card text-lg px-8 py-3 border-primary/30 hover-levitate neon-glow"
              variant="outline"
            >
              <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
              منتجات العناية الطبيعية الفاخرة
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="leading-tight">
              <span className="font-amiri text-6xl md:text-8xl lg:text-9xl holographic-text block mb-6 animate-scale-in">كليدچ</span>
              <span className="font-tajawal text-3xl md:text-5xl lg:text-6xl glow-text block animate-slide-up">
                جمالك الطبيعي يبدأ من هنا
              </span>
            </h1>
            
            <p className="font-cairo text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-premium animate-fade-in">
              اكتشفي عالم الجمال الطبيعي مع مجموعتنا المتميزة من منتجات العناية بالبشرة والشعر المصنوعة بعناية فائقة
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card p-6 md:p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold glow-text mb-3 font-amiri group-hover:animate-bounce-gentle">
                <AnimatedCounter end={100} duration={2000} />+
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-tajawal">منتج طبيعي</p>
            </div>
            
            <div className="glass-card p-6 md:p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold glow-text mb-3 font-amiri group-hover:animate-bounce-gentle">
                <AnimatedCounter end={5000} duration={2500} />+
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-tajawal">عميلة سعيدة</p>
            </div>
            
            <div className="glass-card p-6 md:p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold glow-text mb-3 font-amiri group-hover:animate-bounce-gentle">
                <AnimatedCounter end={99} duration={2000} />%
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-tajawal">مكونات طبيعية</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-slide-up">
            <Button 
              size="lg" 
              className="w-full sm:w-auto btn-primary px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold hover:scale-105 transition-all duration-300 font-tajawal"
              onClick={scrollToProducts}
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 animate-pulse" />
              <span>تسوقي الآن</span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold glass-card border-primary/50 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 font-tajawal"
            >
              <Star className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
              اكتشفي المجموعة
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-4 floating-element">
              <p className="text-sm text-muted-foreground font-medium">اكتشفي المنتجات</p>
              <div className="glass-card p-3 rounded-full cursor-pointer hover-levitate neon-glow" onClick={scrollToProducts}>
                <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}