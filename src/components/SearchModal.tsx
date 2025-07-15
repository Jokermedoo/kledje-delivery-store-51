import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import ModernProductCard from './ModernProductCard';

interface SearchModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function SearchModal({ 
  products, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onViewDetails 
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="p-8 h-full flex flex-col">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold glow-text text-center">
              البحث في المنتجات
            </DialogTitle>
          </DialogHeader>

          <div className="relative mb-8">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-card border-primary/20 py-6 pr-12 text-lg focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {searchQuery === '' ? (
              <div className="text-center py-20">
                <div className="glass-card w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">ابدأ بالبحث</h3>
                <p className="text-muted-foreground">اكتب اسم المنتج أو وصفه للعثور على ما تحتاجه</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="glass-card w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-muted-foreground">لا توجد نتائج</h3>
                <p className="text-muted-foreground">لم نعثر على أي منتجات تطابق بحثك</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="floating-element"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <ModernProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onViewDetails={onViewDetails}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {searchQuery && filteredProducts.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                تم العثور على {filteredProducts.length} منتج
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}