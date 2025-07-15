export interface StoreSettings {
  id: string;
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  currency: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    twitter?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: string;
  heroImage?: string;
  aboutUs: string;
  policies: {
    privacy: string;
    terms: string;
    return: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StoreStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  completedOrders: number;
  monthlyRevenue: number;
  monthlyOrders: number;
}