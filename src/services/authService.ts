import { User, AuthState } from '@/types/auth';

const USERS_KEY = 'kledje_users';
const CURRENT_USER_KEY = 'kledje_current_user';

// Default admin user
const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@kledje.com',
  name: 'مدير المتجر',
  role: 'admin'
};

// Initialize default users
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]));
  }
};

export const authService = {
  // Initialize the service
  init: () => {
    initializeUsers();
  },

  // Login with email and password (simplified for demo)
  login: (email: string, password: string): User | null => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Simple authentication - in real app, passwords would be hashed
    if (email === 'admin@kledje.com' && password === 'admin123') {
      const user = users.find((u: User) => u.email === email);
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
      }
    }
    
    // For regular users, create account if doesn't exist
    if (email && password && !email.includes('admin')) {
      let user = users.find((u: User) => u.email === email);
      
      if (!user) {
        user = {
          id: `user-${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: 'user' as const
        };
        
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  },

  // Register new user
  register: (email: string, password: string, name: string): User | null => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Check if user already exists
    if (users.find((u: User) => u.email === email)) {
      return null;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return newUser;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Get initial auth state
  getInitialAuthState: (): AuthState => {
    const user = authService.getCurrentUser();
    return {
      user,
      isAuthenticated: !!user
    };
  }
};