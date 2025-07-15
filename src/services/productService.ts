import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

const PRODUCTS_KEY = 'kledje_products';

export const productService = {
  // Initialize products
  init: () => {
    const existingProducts = localStorage.getItem(PRODUCTS_KEY);
    if (!existingProducts) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }
  },

  // Get all products
  getProducts: (): Product[] => {
    const products = localStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : defaultProducts;
  },

  // Add new product
  addProduct: (product: Omit<Product, 'id'>): Product => {
    const products = productService.getProducts();
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`
    };
    
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  // Update product
  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const products = productService.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products[index];
  },

  // Delete product
  deleteProduct: (id: string): boolean => {
    const products = productService.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
    return true;
  },

  // Get product by ID
  getProductById: (id: string): Product | null => {
    const products = productService.getProducts();
    return products.find(p => p.id === id) || null;
  }
};