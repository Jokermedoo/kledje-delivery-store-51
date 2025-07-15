import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, ShoppingCart, Star, Minus, Plus, X } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [product.image, product.image, product.image]; // Mock multiple images

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 glass-card border-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 glass-card hover:bg-destructive hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative p-8 bg-gradient-to-br from-accent/20 to-primary/5">
            <div className="sticky top-8">
              <div className="aspect-square rounded-3xl overflow-hidden mb-6 group">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {discountPercent > 0 && (
                  <div className="absolute top-6 right-6">
                    <div className="glass-card bg-destructive/90 text-white px-4 py-2 backdrop-blur-md">
                      <span className="font-bold">خصم {discountPercent}%</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-primary shadow-glow' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col">
            <DialogHeader className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <DialogTitle className="text-3xl font-bold text-foreground leading-tight flex-1">
                  {product.name}
                </DialogTitle>
                <Button variant="ghost" size="icon" className="glass-card hover:bg-primary hover:text-white">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="glass-card">
                  {product.category === 'skincare' ? 'العناية بالبشرة' : 'العناية بالشعر'}
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground mr-2">(127 تقييم)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {product.price} جنيه
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground/70 line-through">
                    {product.originalPrice} جنيه
                  </span>
                )}
              </div>
            </DialogHeader>

            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">وصف المنتج</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  منتج طبيعي 100% مصنوع من أجود المكونات الطبيعية المختارة بعناية لتوفير أفضل النتائج.
                  يتميز بتركيبة فريدة تناسب جميع أنواع البشرة والشعر.
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-4 text-primary">المكونات الرئيسية</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• زيت الأرجان الطبيعي</li>
                  <li>• فيتامين E المغذي</li>
                  <li>• مستخلص الأعشاب الطبيعية</li>
                  <li>• مواد مرطبة طبيعية</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">الكمية:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="glass-card"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center text-lg font-bold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    className="glass-card"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 btn-primary py-6 text-lg font-semibold"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  أضف {quantity} للسلة
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold"
                  onClick={handleAddToCart}
                >
                  اشتر الآن
                </Button>
              </div>

              {!product.inStock && (
                <div className="glass-card p-4 bg-destructive/10 border-destructive/20">
                  <p className="text-destructive font-medium text-center">نفدت الكمية - سيتوفر قريباً</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}