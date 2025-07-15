export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          role: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          name_ar: string;
          description: string | null;
          description_ar: string | null;
          price: number;
          image_url: string | null;
          category: string;
          category_ar: string;
          stock_quantity: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar: string;
          description?: string | null;
          description_ar?: string | null;
          price: number;
          image_url?: string | null;
          category: string;
          category_ar: string;
          stock_quantity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string;
          description?: string | null;
          description_ar?: string | null;
          price?: number;
          image_url?: string | null;
          category?: string;
          category_ar?: string;
          stock_quantity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          phone: string;
          address: string;
          city: string;
          governorate: string;
          notes: string | null;
          total_price: number;
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          phone: string;
          address: string;
          city: string;
          governorate: string;
          notes?: string | null;
          total_price: number;
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          customer_name?: string;
          phone?: string;
          address?: string;
          city?: string;
          governorate?: string;
          notes?: string | null;
          total_price?: number;
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
      store_settings: {
        Row: {
          id: string;
          store_name: string;
          store_name_ar: string;
          store_description: string | null;
          store_description_ar: string | null;
          contact_phone: string | null;
          contact_email: string | null;
          shipping_cost: number;
          currency: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_name?: string;
          store_name_ar?: string;
          store_description?: string | null;
          store_description_ar?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;
          shipping_cost?: number;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_name?: string;
          store_name_ar?: string;
          store_description?: string | null;
          store_description_ar?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;
          shipping_cost?: number;
          currency?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type StoreSettings = Database['public']['Tables']['store_settings']['Row'];