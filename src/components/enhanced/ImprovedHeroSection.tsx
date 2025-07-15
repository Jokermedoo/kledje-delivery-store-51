import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles, Star, Users, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ImprovedHeroSectionProps {
  onScrollToProducts: () => void;
}

export default function ImprovedHeroSection({ onScrollToProducts }: ImprovedHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const slides = [
    {
      title: "اكتشفي جمالك الطبيعي",
      subtitle: "مع كليدچ",
      description: "منتجات العناية بالبشرة والشعر الطبيعية بأفضل جودة وأسعار مناسبة",
      gradient: "from-primary/20 via-primary-glow/10 to-secondary/20",
      cta: "تسوقي الآن",
      features: ["منتجات طبيعية 100%", "توصيل مجاني", "ضمان الجودة"]
    },
    {
      title: "عناية فائقة",
      subtitle: "بمكونات طبيعية",
      description: "اختاري الأفضل لبشرتك وشعرك من مجموعتنا المميزة",
      gradient: "from-secondary/20 via-accent/10 to-primary/20",
      cta: "اكتشفي المزيد",
      features: ["خبرة 10 سنوات", "منتجات مختبرة", "آمنة للاستخدام"]
    },
    {
      title: "جودة عالمية",
      subtitle: "بأسعار مناسبة",
      description: "منتجات مختارة بعناية من أفضل الماركات العالمية",
      gradient: "from-accent/20 via-primary/10 to-secondary/20",
      cta: "ابدئي الآن",
      features: ["شحن سريع", "خدمة 24/7", "أسعار تنافسية"]
    }
  ];

  const stats = [
    { label: "عميل راضي", value: 5000, suffix: "+" },
    { label: "منتج طبيعي", value: 200, suffix: "+" },
    { label: "سنة خبرة", value: 10, suffix: "" },
    { label: "محافظة نخدمها", value: 27, suffix: "" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={targetRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* خلفية متحركة محسنة */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-1000`}></div>
        
        {/* شبكة نقطية متحركة */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
      </div>
      
      {/* جزيئات متحركة محسنة */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* المحتوى الرئيسي */}
          <div className={`space-y-8 text-center lg:text-right ${
            isIntersecting ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}>
            {/* شارة الجودة */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">منتجات معتمدة وآمنة</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-foreground mb-4 font-amiri">
                  {slides[currentSlide].title}
                </span>
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-glow font-amiri">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-cairo">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* المميزات */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار الإجراء */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-10 py-7 hover:scale-105 transition-all duration-300 font-tajawal"
                onClick={onScrollToProducts}
              >
                <ShoppingCart className="h-6 w-6 ml-3" />
                <span>{slides[currentSlide].cta}</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-7 glass-card hover:scale-105 transition-all duration-300 font-tajawal border-primary/30 hover:border-primary"
              >
                <Sparkles className="h-6 w-6 ml-3" />
                <span>تعرفي علينا</span>
              </Button>
            </div>
          </div>

          {/* الإحصائيات */}
          <div className={`${
            isIntersecting ? 'animate-scale-in' : 'opacity-0 scale-95'
          } transition-all duration-700 delay-300`}>
            <div className="glass-card p-8 rounded-3xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary font-amiri mb-2">
                      <AnimatedCounter
                        to={stat.value}
                        suffix={stat.suffix}
                        duration={2000 + index * 200}
                      />
                    </div>
                    <div className="text-muted-foreground font-tajawal text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* تقييم العملاء */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-lg">4.9</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>آراء أكثر من 2000 عميل</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* مؤشرات الشرائح */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125 shadow-glow' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* مؤشر التمرير */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}