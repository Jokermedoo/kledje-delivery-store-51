
import { OrderDetails } from '@/types/product';
import { User } from '@/types/auth';
import OrderSuccess from '@/components/OrderSuccess';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';

interface OrderSuccessPageProps {
  orderDetails: OrderDetails;
  orderNumber: string;
  user: User | null;
  cartItemsCount: number;
  onContinueShopping: () => void;
  onCartClick: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

export default function OrderSuccessPage({
  orderDetails,
  orderNumber,
  user,
  cartItemsCount,
  onContinueShopping,
  onCartClick,
  onLogin,
  onLogout
}: OrderSuccessPageProps) {
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
        <OrderSuccess 
          orderDetails={orderDetails}
          orderNumber={orderNumber}
          onContinueShopping={onContinueShopping}
        />
      </div>
    </div>
  );
}
