'use client';

import { useAuth } from '@/lib/auth-context';
import { LoginPage } from '@/components/auth/login-page';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router, mounted]);

  // Mostrar loading mientras se verifica autenticación
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-katrix-mesh flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-katrix-blue-chill mx-auto mb-4"></div>
          <p className="text-katrix-pearl-bush">
            Verificando autenticación...
          </p>
        </div>
      </div>
    );
  }

  // Si hay usuario, mostrar loading mientras redirige
  if (user) {
    return (
      <div className="min-h-screen bg-katrix-mesh flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-katrix-blue-chill mx-auto mb-4"></div>
          <p className="text-katrix-pearl-bush">
            Redirigiendo al dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Mostrar login cuando no hay usuario
  return <LoginPage />;
}