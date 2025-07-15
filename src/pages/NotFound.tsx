import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <InteractiveBackground />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* 404 Animation */}
          <div className="mb-12">
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-pulse font-amiri">
                404
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-accent/20 blur-3xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="glass-card p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground font-tajawal">
              الصفحة غير موجودة
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-cairo">
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
              <br />
              يمكنك العودة للصفحة الرئيسية أو البحث عن المنتجات.
            </p>

            {/* Current Path */}
            <div className="glass-card bg-destructive/5 border-destructive/20 p-4 mb-8">
              <p className="text-sm text-muted-foreground font-mono">
                المسار المطلوب: <span className="text-destructive font-bold">{location.pathname}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary px-8 py-6 text-lg font-semibold">
                <Link to="/">
                  <Home className="h-5 w-5 ml-2" />
                  العودة للرئيسية
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="glass-card px-8 py-6 text-lg font-semibold">
                <Link to="/#products-section">
                  <Search className="h-5 w-5 ml-2" />
                  تصفح المنتجات
                </Link>
              </Button>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Link 
              to="/#featured-products" 
              className="glass-card p-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
            >
              <h3 className="font-bold text-primary mb-2 group-hover:text-primary-glow transition-colors font-tajawal">
                المنتجات المميزة
              </h3>
              <p className="text-sm text-muted-foreground font-cairo">
                اكتشف أجود منتجاتنا الطبيعية
              </p>
              <ArrowRight className="h-4 w-4 mx-auto mt-3 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/#skincare" 
              className="glass-card p-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
            >
              <h3 className="font-bold text-primary mb-2 group-hover:text-primary-glow transition-colors font-tajawal">
                العناية بالبشرة
              </h3>
              <p className="text-sm text-muted-foreground font-cairo">
                منتجات طبيعية للبشرة
              </p>
              <ArrowRight className="h-4 w-4 mx-auto mt-3 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/#haircare" 
              className="glass-card p-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
            >
              <h3 className="font-bold text-primary mb-2 group-hover:text-primary-glow transition-colors font-tajawal">
                العناية بالشعر
              </h3>
              <p className="text-sm text-muted-foreground font-cairo">
                منتجات طبيعية للشعر
              </p>
              <ArrowRight className="h-4 w-4 mx-auto mt-3 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
