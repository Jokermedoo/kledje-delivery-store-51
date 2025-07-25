import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/supabase';
import ProductDialog from './ProductDialog';

interface AdminProductsProps {
  products: Product[];
  onProductsChange: () => void;
}

export default function AdminProducts({ products, onProductsChange }: AdminProductsProps) {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: "تم الحذف",
          description: "تم حذف المنتج بنجاح"
        });
        onProductsChange();
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف المنتج",
          variant: "destructive"
        });
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    onProductsChange();
  };

  return (
    <>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة المنتجات ({products.length})</CardTitle>
          <Button onClick={handleAddProduct} className="btn-primary">
            <Plus className="h-4 w-4 ml-2" />
            إضافة منتج جديد
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border border-border rounded-lg p-4 bg-card">
                <img 
                  src={product.image_url || '/placeholder.svg'} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                
                <h4 className="font-semibold mb-2 text-card-foreground">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary">{product.price} جنيه</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant={product.stock_quantity > 0 ? "default" : "secondary"}>
                      {product.stock_quantity > 0 ? `متوفر (${product.stock_quantity})` : "نفد"}
                    </Badge>
                    {product.is_active && (
                      <Badge variant="outline" className="text-xs">
                        نشط
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-xs text-muted-foreground">
                    الفئة: {product.category_ar}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditProduct(product)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProductDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
}