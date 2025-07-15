
import { useState } from 'react';
import { Product, CartItem } from '@/types/product';
import { User } from '@/types/auth';
import Header from '@/components/Header';
import ImprovedHeroSection from '@/components/enhanced/ImprovedHeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ProductCategories from '@/components/sections/ProductCategories';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/sections/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingActionButton from '@/components/FloatingActionButton';
import SmartCartSidebar from '@/components/enhanced/SmartCartSidebar';
import ProductModal from '@/components/ProductModal';
import SearchModal from '@/components/SearchModal';
import { SEOHead } from '@/components/enhanced/SEOHead';
import { PerformanceMetrics } from '@/components/enhanced/PerformanceMetrics';

interface ShoppingPageProps {
  products: Product[];
  cartItems: CartItem[];
  user: User | null;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onCheckout: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

export default function ShoppingPage({
  products,
  cartItems,
  user,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  onLogin,
  onLogout
}: ShoppingPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SEOHead />
      <PerformanceMetrics />
      <InteractiveBackground />
      <ScrollProgress />
      
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onSearchClick={() => setIsSearchModalOpen(true)}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      
      <ImprovedHeroSection onScrollToProducts={scrollToProducts} />
      
      <FeaturedProducts 
        products={products}
        onAddToCart={onAddToCart}
        onViewProduct={handleViewProduct}
      />

      <ProductCategories 
        products={products}
        onAddToCart={onAddToCart}
        onViewProduct={handleViewProduct}
      />

      <AboutSection />

      <Footer />

      <FloatingActionButton
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
        cartCount={cartItemsCount}
      />

      <SmartCartSidebar 
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveFromCart}
        onCheckout={onCheckout}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={onAddToCart}
        />
      )}

      <SearchModal
        products={products}
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onAddToCart={onAddToCart}
        onViewDetails={handleViewProduct}
      />
    </div>
  );
}
