'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from './mock-data';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para limpiar completamente la caché
  const clearAllCache = () => {
    if (typeof window !== 'undefined') {
      try {
        // Limpiar localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('katrix-') || key.includes('auth') || key.includes('user')) {
            localStorage.removeItem(key);
          }
        });
        
        // Limpiar sessionStorage
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('katrix-') || key.includes('auth') || key.includes('user')) {
            sessionStorage.removeItem(key);
          }
        });
        
        // Limpiar cookies relacionadas
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          if (name.startsWith('katrix-') || name.includes('auth') || name.includes('user')) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          }
        });
        
        console.log('Cache cleared successfully');
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }
  };

  const initializeAuth = () => {
    try {
      // Verificar si estamos en el cliente
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('katrix-user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Validar que el usuario tenga la estructura correcta
            if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.name && parsedUser.role) {
              setUser(parsedUser);
              console.log('User loaded from cache:', parsedUser.email);
            } else {
              console.log('Invalid user data in cache, clearing...');
              localStorage.removeItem('katrix-user');
              clearAllCache();
            }
          } catch (error) {
            console.error('Error parsing stored user:', error);
            localStorage.removeItem('katrix-user');
            clearAllCache();
          }
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Pequeño delay para evitar problemas de hidratación
    const timer = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  // Precargar rutas después de que el usuario esté autenticado
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      router.prefetch('/dashboard');
      router.prefetch('/services');
      router.prefetch('/invoices');
    }
  }, [user, router]);

  const login = (user: User) => {
    try {
      setUser(user);
      if (typeof window !== 'undefined') {
        // Limpiar caché anterior antes de guardar nuevo usuario
        clearAllCache();
        
        // Guardar nuevo usuario con timestamp
        const userWithTimestamp = {
          ...user,
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9)
        };
        
        localStorage.setItem('katrix-user', JSON.stringify(userWithTimestamp));
        localStorage.setItem('katrix-session-active', 'true');
        
        console.log('User logged in successfully:', user.email);
      }
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      
      // Limpiar completamente la caché
      clearAllCache();
      
      console.log('User logged out and cache cleared');
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // En caso de error, forzar limpieza y redirección
      clearAllCache();
      router.replace('/');
    }
  };

  // Verificar sesión periódicamente
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const checkSession = () => {
        const sessionActive = localStorage.getItem('katrix-session-active');
        if (!sessionActive) {
          console.log('Session expired, logging out...');
          logout();
        }
      };

      // Verificar cada 5 minutos
      const interval = setInterval(checkSession, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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