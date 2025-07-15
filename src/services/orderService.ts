import { Order } from '@/types/auth';
import { CartItem, OrderDetails } from '@/types/product';

const ORDERS_KEY = 'kledje_orders';

export const orderService = {
  // Get all orders
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  // Get orders by user ID
  getOrdersByUserId: (userId: string): Order[] => {
    return orderService.getOrders().filter(order => order.userId === userId);
  },

  // Create new order
  createOrder: (userId: string, orderDetails: OrderDetails, cartItems: CartItem[]): Order => {
    const orders = orderService.getOrders();
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId,
      ...orderDetails,
      items: cartItems,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  },

  // Update order status
  updateOrderStatus: (orderId: string, status: Order['status']): Order | null => {
    const orders = orderService.getOrders();
    const index = orders.findIndex(order => order.id === orderId);
    
    if (index === -1) return null;
    
    orders[index] = {
      ...orders[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders[index];
  },

  // Get order by ID
  getOrderById: (orderId: string): Order | null => {
    const orders = orderService.getOrders();
    return orders.find(order => order.id === orderId) || null;
  },

  // Delete order
  deleteOrder: (orderId: string): boolean => {
    const orders = orderService.getOrders();
    const filteredOrders = orders.filter(order => order.id !== orderId);
    
    if (filteredOrders.length === orders.length) return false;
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
    return true;
  }
};