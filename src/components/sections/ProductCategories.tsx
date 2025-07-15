
import { Product } from '@/types/product';
import ModernProductCard from '@/components/ModernProductCard';
import ParallaxSection from '@/components/ParallaxSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductCategoriesProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductCategories({ products, onAddToCart, onViewProduct }: ProductCategoriesProps) {
  const skincareProducts = products.filter(p => p.category === 'skincare');
  const haircareProducts = products.filter(p => p.category === 'haircare');

  const renderProductGrid = (productList: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {productList.map((product, index) => (
        <div 
          key={product.id}
          className="floating-element hover:scale-105 transition-all duration-500"
          style={{animationDelay: `${index * 0.15}s`}}
        >
          <ModernProductCard 
            product={product} 
            onAddToCart={onAddToCart}
            onViewDetails={onViewProduct}
            index={index}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-32 section-modern relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-secondary/20"></div>
      <ParallaxSection className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text font-amiri">تسوقي حسب الفئة</h2>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto font-cairo">
            اختاري من مجموعتنا الواسعة من منتجات العناية الطبيعية المتميزة
          </p>
        </div>

        <Tabs defaultValue="skincare" className="w-full">
          <TabsList className="glass-card grid w-full grid-cols-2 max-w-2xl mx-auto mb-16 p-3 h-auto hover:shadow-glow transition-all duration-300">
            <TabsTrigger 
              value="skincare" 
              id="skincare"
              className="py-6 px-12 text-2xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white transition-all duration-500 hover:scale-105"
            >
              العناية بالبشرة
            </TabsTrigger>
            <TabsTrigger 
              value="haircare" 
              id="haircare"
              className="py-6 px-12 text-2xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white transition-all duration-500 hover:scale-105"
            >
              العناية بالشعر
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skincare">
            {renderProductGrid(skincareProducts)}
          </TabsContent>
          
          <TabsContent value="haircare">
            {renderProductGrid(haircareProducts)}
          </TabsContent>
        </Tabs>
      </ParallaxSection>
    </section>
  );
}
