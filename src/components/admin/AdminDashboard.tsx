
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Product, Order, StoreSettings } from '@/types/supabase';
import AdminHeader from './AdminHeader';
import AdminStats from './AdminStats';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import StoreSettingsComponent from './StoreSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (profile?.role === 'admin') {
      loadData();
      loadStoreSettings();
    }
  }, [profile]);

  const loadData = async () => {
    // Load products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (productsData) {
      setProducts(productsData);
    }

    // Load orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersData) {
      setOrders(ordersData as Order[]);
    }
  };

  const loadStoreSettings = async () => {
    const { data } = await supabase
      .from('store_settings')
      .select('*')
      .single();
    
    if (data) {
      setStoreSettings(data);
    }
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
      <AdminHeader />
      
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
            <StoreSettingsComponent storeSettings={storeSettings} onSettingsChange={handleStoreSettingsChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
