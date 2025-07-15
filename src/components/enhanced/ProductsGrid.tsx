import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import OptimizedProductCard from './OptimizedProductCard';
import { SearchBar } from './SearchBar';
import { PaginationComponent } from './PaginationComponent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Badge } from '@/components/ui/badge';

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  title?: string;
  showSearch?: boolean;
  itemsPerPage?: number;
}

export function ProductsGrid({
  products,
  onAddToCart,
  onViewDetails,
  title = "جميع المنتجات",
  showSearch = true,
  itemsPerPage = 12
}: ProductsGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // تحديث المنتجات المفلترة عند تغيير المنتجات الأساسية
  React.useEffect(() => {
    setFilteredProducts(products);
    setCurrentPage(1);
  }, [products]);

  // حساب المنتجات للصفحة الحالية
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleResultsChange = (results: Product[]) => {
    setFilteredProducts(results);
    setCurrentPage(1); // إعادة تعيين للصفحة الأولى عند البحث
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // التمرير لأعلى عند تغيير الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={targetRef as React.RefObject<HTMLElement>}
      className="py-16 section-modern relative"
    >
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <div className={`text-center mb-12 ${
          isIntersecting ? 'animate-fade-in' : 'opacity-0 translate-y-8'
        }`}>
          <div className="glass-card inline-block px-6 py-3 mb-6 hover:scale-105 transition-all duration-300">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-bold text-xl">
              {title}
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-3xl md:text-5xl font-bold glow-text font-amiri">
              اكتشفي مجموعتنا
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredProducts.length} منتج
            </Badge>
          </div>
        </div>

        {/* شريط البحث */}
        {showSearch && (
          <div className={`mb-12 ${
            isIntersecting ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          } transition-all duration-700 delay-200`}>
            <SearchBar 
              products={products}
              onResultsChange={handleResultsChange}
            />
          </div>
        )}

        {/* شبكة المنتجات */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 ${
              isIntersecting ? 'animate-fade-in' : 'opacity-0'
            } transition-all duration-700 delay-400`}>
              {paginatedProducts.map((product, index) => (
                <OptimizedProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  index={index}
                />
              ))}
            </div>

            {/* صفحات التنقل */}
            {totalPages > 1 && (
              <div className={`${
                isIntersecting ? 'animate-fade-in' : 'opacity-0'
              } transition-all duration-700 delay-600`}>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          /* رسالة عدم وجود نتائج */
          <div className="text-center py-16">
            <div className="glass-card max-w-md mx-auto p-8 rounded-3xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2 font-amiri">لا توجد نتائج</h3>
              <p className="text-muted-foreground font-cairo">
                جربي تعديل معايير البحث أو تصفح جميع المنتجات
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}