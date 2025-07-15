import React, { memo, useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from './LazyImage';
import { Heart, Eye, ShoppingCart, Sparkles } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  index?: number;
}

const OptimizedProductCard = memo(function OptimizedProductCard({
  product,
  onAddToCart,
  onViewDetails,
  index = 0
}: OptimizedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      ref={targetRef as React.RefObject<HTMLDivElement>}
      className={`product-card group cursor-pointer transition-all duration-700 ${
        isIntersecting ? 'animate-fade-in' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleViewDetails}
    >
      {/* شارة المنتج المميز */}
      {product.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-primary to-primary-glow text-white border-0 px-3 py-1 font-amiri">
            <Sparkles className="w-3 h-3 ml-1" />
            مميز
          </Badge>
        </div>
      )}

      {/* شارة الخصم */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="destructive" className="px-3 py-1 font-bold font-amiri">
            -{discount}%
          </Badge>
        </div>
      )}

      {/* صورة المنتج */}
      <div className="relative overflow-hidden rounded-xl mb-6 group-hover:scale-105 transition-transform duration-500">
        <LazyImage
          src={product.image}
          alt={product.name}
          aspectRatio="square"
          className="w-full h-48 md:h-56"
        />
        
        {/* طبقة التفاعل */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1 btn-primary"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              أضف للسلة
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass-card border-white/30 text-white hover:bg-white/20"
              onClick={handleViewDetails}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* زر القائمة المفضلة */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-3 left-3 glass-card transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'text-gray-600 hover:bg-white hover:text-red-500'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* معلومات المنتج */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-cairo leading-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed font-tajawal line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* السعر */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary font-amiri">
            {product.price} جنيه
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through font-amiri">
              {product.originalPrice} جنيه
            </span>
          )}
        </div>

        {/* حالة المخزون */}
        <div className="flex items-center justify-between">
          <Badge 
            variant={product.inStock ? "default" : "secondary"}
            className={`${
              product.inStock 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-red-100 text-red-800 border-red-200'
            } font-tajawal`}
          >
            {product.inStock ? '✓ متوفر' : '✗ غير متوفر'}
          </Badge>
          
          <span className="text-xs text-muted-foreground font-tajawal">
            {product.category === 'skincare' ? 'العناية بالبشرة' : 'العناية بالشعر'}
          </span>
        </div>

        {/* زر إضافة للسلة */}
        <Button
          className="w-full btn-primary py-6 text-lg font-tajawal"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-5 h-5 ml-2" />
          {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
        </Button>
      </div>
    </div>
  );
});

export default OptimizedProductCard;