import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ModernProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  index?: number;
}

export default function ModernProductCard({ product, onAddToCart, onViewDetails, index = 0 }: ModernProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="product-card group cursor-pointer relative overflow-hidden hover-levitate"
      onClick={() => onViewDetails?.(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 aurora-bg"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent/80 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary-glow/70 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-6 left-8 w-1 h-1 bg-secondary/90 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl mb-6 group">
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3 group-hover:brightness-110"
            />
          </div>
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 holographic-element"></div>
          
          {/* Enhanced floating badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {discountPercent > 0 && (
              <div className="glass-card bg-destructive/90 text-white px-3 py-2 backdrop-blur-md hover-glow">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs font-bold">خصم {discountPercent}%</span>
                </div>
              </div>
            )}
            {product.featured && (
              <div className="glass-card bg-primary/90 text-white px-3 py-2 backdrop-blur-md hover-glow">
                <span className="text-xs font-bold">مميز</span>
              </div>
            )}
          </div>
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
              <div className="glass-card px-6 py-3 text-white font-bold neon-glow">
                نفدت الكمية
              </div>
            </div>
          )}
          
          {/* Enhanced action buttons */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Button 
              size="icon" 
              variant="ghost" 
              className="glass-card hover:bg-primary hover:text-white hover-levitate neon-glow w-10 h-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="h-4 w-4 group-hover:animate-pulse" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="glass-card hover:bg-primary hover:text-white hover-levitate neon-glow w-10 h-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4 group-hover:animate-pulse" />
            </Button>
          </div>
          
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight group-hover:text-primary transition-colors duration-300 flex-1 font-tajawal">
              {product.name}
            </h3>
            {isHovered && (
              <div className="ml-2 animate-bounce">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
            )}
          </div>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 font-cairo">
            {product.description}
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-glow font-amiri">
              {product.price} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-sm md:text-base text-muted-foreground/70 line-through relative font-cairo">
                {product.originalPrice} ج.م
                <div className="absolute inset-0 bg-destructive/20 group-hover:bg-destructive/40 transition-colors duration-300"></div>
              </span>
            )}
          </div>
          
          <Button 
            className="w-full btn-primary py-4 md:py-6 text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 font-tajawal"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:animate-bounce" />
            <span>أضف للسلة</span>
          </Button>
        </div>
      </div>
    </div>
  );
}