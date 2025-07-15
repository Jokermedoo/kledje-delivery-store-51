
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDialog({ product, isOpen, onClose }: ProductDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'skincare' as 'skincare' | 'haircare',
    inStock: true,
    featured: false,
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category,
        inStock: product.inStock,
        featured: product.featured || false,
        image: product.image
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'skincare',
        inStock: true,
        featured: false,
        image: ''
      });
    }
  }, [product]);

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      inStock: formData.inStock,
      featured: formData.featured,
      image: formData.image || '/lovable-uploads/placeholder-product.jpg'
    };

    if (product) {
      productService.updateProduct(product.id, productData);
      toast({
        title: "تم التحديث",
        description: "تم تحديث المنتج بنجاح"
      });
    } else {
      productService.addProduct(productData);
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة المنتج بنجاح"
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="product-name">اسم المنتج *</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="اسم المنتج"
            />
          </div>

          <div>
            <Label htmlFor="product-description">الوصف *</Label>
            <Textarea
              id="product-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="وصف المنتج"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-price">السعر *</Label>
              <Input
                id="product-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="السعر"
              />
            </div>
            
            <div>
              <Label htmlFor="product-original-price">السعر الأصلي</Label>
              <Input
                id="product-original-price"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                placeholder="السعر الأصلي"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="product-category">الفئة</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: 'skincare' | 'haircare') => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skincare">العناية بالبشرة</SelectItem>
                <SelectItem value="haircare">العناية بالشعر</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="product-image">رابط الصورة</Label>
            <Input
              id="product-image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="رابط صورة المنتج"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="product-stock"
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
              />
              <Label htmlFor="product-stock">متوفر في المخزن</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="product-featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="product-featured">منتج مميز</Label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1 btn-primary">
              {product ? 'تحديث' : 'إضافة'}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
