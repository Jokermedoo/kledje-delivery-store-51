
import { useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '@/types/product';
import { User, AuthState } from '@/types/auth';
import { productService } from '@/services/productService';
import { enhancedProducts } from '@/data/enhancedProducts';
import { authService } from '@/services/authService';
import AuthForm from '@/components/auth/AuthForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import ShoppingPage from '@/components/shopping/ShoppingPage';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import OrderSuccessPage from '@/components/success/OrderSuccessPage';
import { useToast } from '@/hooks/use-toast';

type PageState = 'shopping' | 'checkout' | 'success';

const Index = () => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<PageState>('shopping');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize services
    authService.init();
    productService.init();
    
    // Simulate loading مع البيانات المحسنة
    setTimeout(() => {
      setAuthState(authService.getInitialAuthState());
      setProducts(enhancedProducts);
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleLogin = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
    setShowAuth(false);
  };

  const handleLogout = () => {
    authService.logout();
    setAuthState({ user: null, isAuthenticated: false });
    setCartItems([]);
    setCurrentPage('shopping');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!authState.isAuthenticated) {
      setShowAuth(true);
      toast({
        title: "يجب تسجيل الدخول أولاً",
        description: "قم بتسجيل الدخول لإضافة المنتجات للسلة",
        variant: "destructive"
      });
      return;
    }
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
    });

    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${quantity > 1 ? `${quantity} من ` : ''}${product.name} إلى سلة التسوق`,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم حذف المنتج",
      description: "تم حذف المنتج من سلة التسوق",
    });
  };

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setCurrentPage('checkout');
  };

  const handleOrderSubmit = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentPage('success');
    setCartItems([]);
    
    toast({
      title: "تم تأكيد الطلب",
      description: `رقم الطلب: #${orderNum}`,
    });
  };

  const handleContinueShopping = () => {
    setCurrentPage('shopping');
    setOrderDetails(null);
    setOrderNumber('');
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showAuth && !authState.isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  if (currentPage === 'checkout' && authState.user) {
    return (
      <CheckoutPage
        cartItems={cartItems}
        user={authState.user}
        cartItemsCount={cartItemsCount}
        onOrderSubmit={handleOrderSubmit}
        onBack={() => setCurrentPage('shopping')}
        onCartClick={() => {}}
        onLogin={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'success' && orderNumber) {
    const mockOrderDetails = {
      customerName: authState.user?.name || '',
      phone: '01000000000',
      address: 'العنوان التجريبي',
      city: 'القاهرة',
      governorate: 'القاهرة'
    };

    return (
      <OrderSuccessPage
        orderDetails={mockOrderDetails}
        orderNumber={orderNumber}
        user={authState.user}
        cartItemsCount={cartItemsCount}
        onContinueShopping={handleContinueShopping}
        onCartClick={() => {}}
        onLogin={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <ShoppingPage
      products={products}
      cartItems={cartItems}
      user={authState.user}
      onAddToCart={addToCart}
      onUpdateQuantity={updateQuantity}
      onRemoveFromCart={removeFromCart}
      onCheckout={handleCheckout}
      onLogin={() => setShowAuth(true)}
      onLogout={handleLogout}
    />
  );
};

export default Index;
