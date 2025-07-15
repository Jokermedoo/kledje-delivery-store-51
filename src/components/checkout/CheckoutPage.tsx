
import { CartItem } from '@/types/product';
import { User } from '@/types/auth';
import CheckoutForm from '@/components/CheckoutForm';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';

interface CheckoutPageProps {
  cartItems: CartItem[];
  user: User;
  cartItemsCount: number;
  onOrderSubmit: (orderNum: string) => void;
  onBack: () => void;
  onCartClick: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

export default function CheckoutPage({
  cartItems,
  user,
  cartItemsCount,
  onOrderSubmit,
  onBack,
  onCartClick,
  onLogin,
  onLogout
}: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={onCartClick} 
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      <div className="py-8">
        <CheckoutForm 
          cartItems={cartItems}
          user={user}
          onOrderSubmit={onOrderSubmit}
          onBack={onBack}
        />
      </div>
    </div>
  );
}
