
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import { storeService } from '@/services/storeService';
import { Product } from '@/types/product';
import { Order } from '@/types/auth';
import { StoreSettings } from '@/types/store';
import AdminHeader from './AdminHeader';
import AdminStats from './AdminStats';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import StoreSettingsComponent from './StoreSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    loadData();
    loadStoreSettings();
  }, []);

  const loadData = () => {
    setProducts(productService.getProducts());
    setOrders(orderService.getOrders());
  };

  const loadStoreSettings = () => {
    storeService.init();
    setStoreSettings(storeService.getSettings());
  };

  const handleProductsChange = () => {
    loadData();
  };

  const handleOrdersChange = () => {
    loadData();
  };

  const handleStoreSettingsChange = () => {
    loadStoreSettings();
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <AdminStats orders={orders} />
        
        <Tabs defaultValue="orders" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">إدارة الطلبات</TabsTrigger>
            <TabsTrigger value="products">إدارة المنتجات</TabsTrigger>
            <TabsTrigger value="settings">إعدادات المتجر</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <AdminOrders orders={orders} onOrdersChange={handleOrdersChange} />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts products={products} onProductsChange={handleProductsChange} />
          </TabsContent>

          <TabsContent value="settings">
            <StoreSettingsComponent onSettingsChange={handleStoreSettingsChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
