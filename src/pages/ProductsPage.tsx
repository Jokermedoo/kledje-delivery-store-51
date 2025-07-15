import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Grid, List, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InteractiveBackground from '@/components/InteractiveBackground';
import ModernProductCard from '@/components/ModernProductCard';
import { products } from '@/data/products';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceFilter, setPriceFilter] = useState('all');

  const skincareProducts = products.filter(p => p.category === 'skincare');
  const haircareProducts = products.filter(p => p.category === 'haircare');

  const sortProducts = (productList: typeof products) => {
    const sorted = [...productList];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
      default:
        return sorted;
    }
  };

  const filterProducts = (productList: typeof products) => {
    if (priceFilter === 'all') return productList;
    
    return productList.filter(product => {
      switch (priceFilter) {
        case 'under-100':
          return product.price < 100;
        case '100-300':
          return product.price >= 100 && product.price <= 300;
        case 'over-300':
          return product.price > 300;
        default:
          return true;
      }
    });
  };

  const renderProductGrid = (productList: typeof products) => {
    const processedProducts = sortProducts(filterProducts(productList));
    
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {processedProducts.map((product, index) => (
            <div 
              key={product.id}
              className="floating-element hover:scale-105 transition-all duration-500"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <ModernProductCard 
                product={product} 
                onAddToCart={() => navigate('/')}
                onViewDetails={() => navigate('/')}
                index={index}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          {processedProducts.map((product, index) => (
            <div 
              key={product.id}
              className="glass-card p-6 flex gap-6 hover:scale-102 transition-all duration-300"
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 font-tajawal">{product.name}</h3>
                <p className="text-muted-foreground mb-4 font-cairo">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary font-amiri">
                    {product.price} ج.م
                  </span>
                  <Button 
                    onClick={() => navigate('/')}
                    className="btn-primary"
                    disabled={!product.inStock}
                  >
                    أضف للسلة
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <InteractiveBackground />
      
      {/* Simple Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="glass-card hover:bg-primary/5 font-tajawal"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </Button>
            <h1 className="text-2xl font-bold text-primary font-amiri">تصفح المنتجات</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text font-amiri">
            جميع المنتجات
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-cairo">
            اكتشف مجموعتنا الكاملة من المنتجات الطبيعية المتميزة
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="font-semibold font-tajawal">الفلاتر:</span>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 glass-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">الاسم</SelectItem>
                  <SelectItem value="price-low">السعر: الأقل أولاً</SelectItem>
                  <SelectItem value="price-high">السعر: الأعلى أولاً</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-40 glass-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأسعار</SelectItem>
                  <SelectItem value="under-100">أقل من 100 ج.م</SelectItem>
                  <SelectItem value="100-300">100 - 300 ج.م</SelectItem>
                  <SelectItem value="over-300">أكثر من 300 ج.م</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="glass-card"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="glass-card"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products by Category */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="glass-card grid w-full grid-cols-3 max-w-3xl mx-auto mb-16 p-3 h-auto">
            <TabsTrigger 
              value="all" 
              className="py-4 px-6 text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white transition-all duration-500 hover:scale-105"
            >
              الكل ({products.length})
            </TabsTrigger>
            <TabsTrigger 
              value="skincare" 
              className="py-4 px-6 text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white transition-all duration-500 hover:scale-105"
            >
              العناية بالبشرة ({skincareProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="haircare" 
              className="py-4 px-6 text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white transition-all duration-500 hover:scale-105"
            >
              العناية بالشعر ({haircareProducts.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderProductGrid(products)}
          </TabsContent>
          
          <TabsContent value="skincare">
            {renderProductGrid(skincareProducts)}
          </TabsContent>
          
          <TabsContent value="haircare">
            {renderProductGrid(haircareProducts)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}