'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import api from '@/lib/api';
import { useToast } from '@/components/ToastProvider';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: any;
  preferences: any;
  progress: any;
  subscription: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { push } = useToast();

  useEffect(() => {
    // Check for existing auth on mount
    const savedToken = localStorage.getItem('path2ivy_token');
    const savedUser = localStorage.getItem('path2ivy_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('path2ivy_token', token);
      localStorage.setItem('path2ivy_user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      push('Signed in successfully', 'success');
      router.push('/dashboard');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Login failed';
      push(msg, 'error');
      throw new Error(msg);
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      const { token, user } = response.data;
      
      localStorage.setItem('path2ivy_token', token);
      localStorage.setItem('path2ivy_user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      push('Account created successfully', 'success');
      router.push('/onboarding');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed';
      push(msg, 'error');
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('path2ivy_token');
    localStorage.removeItem('path2ivy_user');
    setToken(null);
    setUser(null);
    push('Signed out', 'info');
    router.push('/login');
  };

  const updateUser = (userData: any) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('path2ivy_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    updateUser,
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

export default useAuth;


