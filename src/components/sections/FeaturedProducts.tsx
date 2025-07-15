
import { Product } from '@/types/product';
import OptimizedProductCard from '@/components/enhanced/OptimizedProductCard';
import ParallaxSection from '@/components/ParallaxSection';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProduct: (product: Product) => void;
}

export default function FeaturedProducts({ products, onAddToCart, onViewProduct }: FeaturedProductsProps) {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <section id="products-section" className="py-32 section-modern relative">
      <ParallaxSection className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="glass-card inline-block px-8 py-4 mb-8 hover:scale-105 transition-all duration-300">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-bold text-2xl">
              المنتجات المميزة
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text font-amiri">أحدث منتجاتنا</h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed font-cairo">
            اكتشفي مجموعتنا المختارة بعناية من أفضل منتجات العناية بالجمال الطبيعية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {featuredProducts.map((product, index) => (
            <OptimizedProductCard 
              key={product.id}
              product={product} 
              onAddToCart={onAddToCart}
              onViewDetails={onViewProduct}
              index={index}
            />
          ))}
        </div>
      </ParallaxSection>
    </section>
  );
}
