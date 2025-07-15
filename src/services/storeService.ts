import { StoreSettings, StoreStats } from '@/types/store';
import { orderService } from './orderService';
import { productService } from './productService';

const STORE_SETTINGS_KEY = 'kledje_store_settings';

// Default store settings
const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: 'store-1',
  storeName: 'كلـيدجي - متجر الجمال الطبيعي',
  storeDescription: 'متجرك المتخصص في منتجات العناية الطبيعية والجمال الأصيل',
  storeAddress: 'القاهرة، مصر',
  storePhone: '+20 100 000 0000',
  storeEmail: 'info@kledje.com',
  currency: 'EGP',
  deliveryFee: 50,
  freeDeliveryThreshold: 300,
  workingHours: 'السبت - الخميس: 9 صباحاً - 10 مساءً',
  socialLinks: {
    facebook: 'https://facebook.com/kledje',
    instagram: 'https://instagram.com/kledje',
    whatsapp: '+20 100 000 0000',
  },
  colors: {
    primary: '#D946EF',
    secondary: '#F9FAFB',
    accent: '#EC4899'
  },
  aboutUs: 'نحن متجر متخصص في توفير أفضل منتجات العناية الطبيعية والجمال الأصيل. نسعى لتقديم منتجات عالية الجودة تناسب جميع احتياجاتكم.',
  policies: {
    privacy: 'نحن نحترم خصوصيتكم ونحمي بياناتكم الشخصية...',
    terms: 'الشروط والأحكام الخاصة بالمتجر...',
    return: 'يمكنكم إرجاع المنتجات خلال 14 يوم من الشراء...'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const storeService = {
  // Initialize store settings
  init: () => {
    const existingSettings = localStorage.getItem(STORE_SETTINGS_KEY);
    if (!existingSettings) {
      localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(DEFAULT_STORE_SETTINGS));
    }
  },

  // Get store settings
  getSettings: (): StoreSettings => {
    const settings = localStorage.getItem(STORE_SETTINGS_KEY);
    return settings ? JSON.parse(settings) : DEFAULT_STORE_SETTINGS;
  },

  // Update store settings
  updateSettings: (settings: Partial<StoreSettings>): StoreSettings => {
    const currentSettings = storeService.getSettings();
    const updatedSettings = {
      ...currentSettings,
      ...settings,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(updatedSettings));
    return updatedSettings;
  },

  // Get store statistics
  getStats: (): StoreStats => {
    const orders = orderService.getOrders();
    const products = productService.getProducts();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Get unique customers
    const uniqueCustomers = new Set(orders.map(order => order.userId)).size;

    return {
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length,
      totalCustomers: uniqueCustomers,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      completedOrders: orders.filter(order => order.status === 'delivered').length,
      monthlyRevenue,
      monthlyOrders: monthlyOrders.length
    };
  },

  // Reset store to defaults
  resetToDefaults: (): StoreSettings => {
    const resetSettings = {
      ...DEFAULT_STORE_SETTINGS,
      id: 'store-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(resetSettings));
    return resetSettings;
  }
};