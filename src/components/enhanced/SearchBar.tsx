import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchBarProps {
  products: Product[];
  onResultsChange: (results: Product[]) => void;
  placeholder?: string;
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'featured';
type CategoryFilter = 'all' | 'skincare' | 'haircare';

export function SearchBar({ products, onResultsChange, placeholder = "ابحث عن المنتجات..." }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // تطبيق البحث النصي
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // تطبيق فلتر الفئة
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // تطبيق فلتر المتوفر فقط
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // تطبيق الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ar');
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, debouncedSearchQuery, sortBy, categoryFilter, inStockOnly]);

  // تحديث النتائج عند تغيير المرشحات
  React.useEffect(() => {
    onResultsChange(filteredAndSortedProducts);
  }, [filteredAndSortedProducts, onResultsChange]);

  const clearSearch = () => {
    setSearchQuery('');
    setSortBy('featured');
    setCategoryFilter('all');
    setInStockOnly(false);
  };

  const hasActiveFilters = searchQuery || sortBy !== 'featured' || categoryFilter !== 'all' || inStockOnly;

  return (
    <div className="space-y-4">
      {/* شريط البحث الرئيسي */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 pl-20 py-6 text-lg glass-card border-primary/20 focus:border-primary"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* شريط المرشحات */}
      <div className="flex flex-wrap items-center gap-3">
        {/* زر الفلاتر */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              المرشحات
              {hasActiveFilters && (
                <Badge variant="secondary" className="scale-75">
                  نشط
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              {/* ترتيب حسب */}
              <div>
                <label className="text-sm font-medium mb-2 block">ترتيب حسب:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="featured">المنتجات المميزة</option>
                  <option value="name">الاسم</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>
              </div>

              {/* فئة المنتج */}
              <div>
                <label className="text-sm font-medium mb-2 block">الفئة:</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">جميع المنتجات</option>
                  <option value="skincare">العناية بالبشرة</option>
                  <option value="haircare">العناية بالشعر</option>
                </select>
              </div>

              {/* المتوفر فقط */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked === true)}
                />
                <label htmlFor="inStock" className="text-sm font-medium">
                  المتوفر فقط
                </label>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* عدد النتائج */}
        <Badge variant="outline" className="font-tajawal">
          {filteredAndSortedProducts.length} منتج
        </Badge>

        {/* زر مسح الفلاتر */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearSearch} className="text-muted-foreground">
            مسح الفلاتر
            <X className="w-4 h-4 mr-1" />
          </Button>
        )}
      </div>

      {/* عرض الفلاتر النشطة */}
      <div className="flex flex-wrap gap-2">
        {searchQuery && (
          <Badge variant="secondary" className="gap-1">
            البحث: {searchQuery}
            <X 
              className="w-3 h-3 cursor-pointer" 
              onClick={() => setSearchQuery('')}
            />
          </Badge>
        )}
        {categoryFilter !== 'all' && (
          <Badge variant="secondary" className="gap-1">
            {categoryFilter === 'skincare' ? 'العناية بالبشرة' : 'العناية بالشعر'}
            <X 
              className="w-3 h-3 cursor-pointer" 
              onClick={() => setCategoryFilter('all')}
            />
          </Badge>
        )}
        {inStockOnly && (
          <Badge variant="secondary" className="gap-1">
            متوفر فقط
            <X 
              className="w-3 h-3 cursor-pointer" 
              onClick={() => setInStockOnly(false)}
            />
          </Badge>
        )}
      </div>
    </div>
  );
}