'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading, router, mounted]);

  // Mostrar loading solo mientras se verifica la autenticación
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-katrix-mesh flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-katrix-blue-chill mx-auto mb-4"></div>
          <p className="text-katrix-pearl-bush">
            Cargando dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay usuario después de cargar, no mostrar nada (se redirigirá)
  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}