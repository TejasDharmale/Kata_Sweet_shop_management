import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiClient, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  googleAuth: (googleUser: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (password.length < 3) {
      throw new Error('Password must be at least 3 characters');
    }
    
    const mockUser: User = {
      id: 1,
      email,
      username: email.split('@')[0],
      is_admin: email === 'admin@sweetshop.com',
      created_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('access_token', 'mock-token');
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    // Mock registration - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 3) {
      throw new Error('Password must be at least 3 characters');
    }
    
    // Auto-login after registration
    await login(email, password);
  };

  const googleAuth = async (googleUser: any) => {
    try {
      // Mock Google authentication - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 2,
        email: googleUser.email,
        username: googleUser.name || googleUser.email?.split('@')[0] || 'google_user',
        is_admin: false,
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('access_token', 'google-mock-token');
      localStorage.setItem('google_user_data', JSON.stringify(googleUser));
      
      console.log('Google authentication successful:', mockUser);
    } catch (error) {
      console.error('Google authentication failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('cart');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false,
    login,
    register,
    googleAuth,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}