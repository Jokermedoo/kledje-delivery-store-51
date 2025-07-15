import React, { useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types/product';
import { Minus, Plus, Trash2, ShoppingBag, Gift, Truck } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface SmartCartSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function SmartCartSidebar({ 
  isOpen, 
  onOpenChange, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: SmartCartSidebarProps) {
  
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const freeShippingThreshold = 300;
    const needsForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const hasDiscount = subtotal > 500;
    const discountAmount = hasDiscount ? subtotal * 0.05 : 0; // خصم 5% للطلبات فوق 500 جنيه
    const total = subtotal - discountAmount;

    return {
      subtotal,
      itemsCount,
      needsForFreeShipping,
      hasDiscount,
      discountAmount,
      total,
      savings: cartItems.reduce((sum, item) => {
        return sum + ((item.originalPrice || item.price) - item.price) * item.quantity;
      }, 0)
    };
  }, [cartItems]);

  const suggestedProducts = [
    { id: 'suggest-1', name: 'كريم ليلي مرطب', price: 89, image: '/placeholder-product.jpg' },
    { id: 'suggest-2', name: 'سيروم فيتامين E', price: 159, image: '/placeholder-product.jpg' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-3 text-xl">
            <div className="glass-card p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            سلة التسوق
            {cartSummary.itemsCount > 0 && (
              <Badge variant="secondary" className="scale-90">
                {cartSummary.itemsCount} منتج
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="glass-card p-8 rounded-3xl max-w-sm mx-auto">
              <ShoppingBag className="h-20 w-20 text-muted-foreground mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-3 font-amiri">سلة التسوق فارغة</h3>
              <p className="text-muted-foreground mb-6 font-cairo">
                اكتشفي مجموعتنا الرائعة من منتجات العناية
              </p>
              <Button 
                onClick={() => onOpenChange(false)}
                className="btn-primary w-full"
              >
                تصفح المنتجات
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* شريط التقدم للشحن المجاني */}
            {cartSummary.needsForFreeShipping > 0 && (
              <div className="mx-6 mb-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">
                      أضيفي {cartSummary.needsForFreeShipping} جنيه للحصول على شحن مجاني
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((cartSummary.subtotal / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* قائمة المنتجات */}
            <div className="flex-1 overflow-auto px-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="glass-card p-4 rounded-xl transition-all duration-300 hover:shadow-glow">
                  <div className="flex gap-4">
                    <div className="relative">
                      <LazyImage
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      {item.originalPrice && item.originalPrice > item.price && (
                        <Badge className="absolute -top-2 -right-2 scale-75 bg-red-500">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="font-bold text-foreground leading-tight font-cairo">
                        {item.name}
                      </h4>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-lg font-amiri">
                          {item.price} جنيه
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-muted-foreground line-through text-sm font-amiri">
                            {item.originalPrice} جنيه
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ملخص السلة */}
            <div className="p-6 space-y-4 border-t border-border">
              {/* المجموع الفرعي */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold">{cartSummary.subtotal} جنيه</span>
                </div>
                
                {cartSummary.savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>وفرتِ:</span>
                    <span className="font-bold">-{cartSummary.savings} جنيه</span>
                  </div>
                )}
                
                {cartSummary.hasDiscount && (
                  <div className="flex justify-between text-green-600">
                    <div className="flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      <span>خصم 5%:</span>
                    </div>
                    <span className="font-bold">-{cartSummary.discountAmount.toFixed(0)} جنيه</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* المجموع الإجمالي */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span>المجموع:</span>
                <span className="text-primary">{cartSummary.total.toFixed(0)} جنيه مصري</span>
              </div>

              {/* شحن مجاني */}
              {cartSummary.needsForFreeShipping === 0 && (
                <div className="glass-card p-3 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex items-center gap-2 text-green-700">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm font-medium">🎉 تهانينا! شحن مجاني</span>
                  </div>
                </div>
              )}

              {/* زر الدفع */}
              <Button 
                className="w-full btn-primary py-6 text-lg font-tajawal"
                onClick={onCheckout}
              >
                إتمام الطلب - الدفع عند الاستلام
              </Button>

              {/* معلومات إضافية */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 معاملات آمنة | 📞 خدمة عملاء 24/7 | 🚚 توصيل سريع
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}