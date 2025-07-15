
import { ShoppingCart, Search, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User as UserType } from '@/types/auth';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearchClick?: () => void;
  user?: UserType | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({ cartItemsCount, onCartClick, onSearchClick, user, onLogin, onLogout }: HeaderProps) {
  const handleAdminClick = () => {
    window.location.href = '/admin';
  };

  return (
    <header className="glass-card border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl hover-glow">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 aurora-bg opacity-50"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="glass-card p-2 rounded-xl hover:animate-glow">
              <img 
                src="/lovable-uploads/9d8b59e3-ff2b-428f-bea9-4301b56293b4.png" 
                alt="كليدچ"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary font-amiri glow-text">كليدچ</h1>
              <p className="text-xs md:text-sm text-muted-foreground font-tajawal">Kledje</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-tajawal text-premium relative group">
              الرئيسية
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/products" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-tajawal text-premium relative group">
              المنتجات
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-tajawal text-premium relative group">
              من نحن
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/contact" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-tajawal text-premium relative group">
              اتصل بنا
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onSearchClick}
              className="glass-card hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 group"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="glass-card hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 group"
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative glass-card hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 group"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-bounce" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center p-0 text-xs font-bold animate-glow font-amiri"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={handleAdminClick}>
                      لوحة التحكم
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" onClick={onLogin}>
                تسجيل الدخول
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
