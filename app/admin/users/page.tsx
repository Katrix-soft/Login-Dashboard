'use client';

import { useAuth } from '@/lib/auth-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { UsersManagementContent } from '@/components/admin/users-management-content';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UsersManagementPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    } else if (!isLoading && user && user.role !== 'ADMINISTRATOR') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
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

  if (!user || user.role !== 'ADMINISTRATOR') {
    return null;
  }

  return (
    <DashboardLayout>
      <UsersManagementContent />
    </DashboardLayout>
  );
}