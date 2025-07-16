'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const pathMap: Record<string, string> = {
  dashboard: 'Panel de Control',
  services: 'Servicios',
  create: 'Crear Servicio',
  invoices: 'Facturas',
  settings: 'Configuración',
  admin: 'Administración',
  users: 'Gestión de Usuarios',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link 
        href="/dashboard" 
        className="flex items-center text-katrix-pearl-bush/70 hover:text-katrix-blue-chill transition-colors duration-200 p-1.5 rounded-lg hover:bg-katrix-blue-chill/10"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={segment}>
            <ChevronRight className="h-4 w-4 text-katrix-pearl-bush/50 flex-shrink-0" />
            {isLast ? (
              <span className="font-medium text-katrix-blue-chill bg-katrix-blue-chill/10 px-2.5 py-1 rounded-lg border border-katrix-blue-chill/20 whitespace-nowrap text-sm">
                {label}
              </span>
            ) : (
              <Link 
                href={href}
                className="text-katrix-pearl-bush/70 hover:text-katrix-blue-chill transition-colors duration-200 px-2.5 py-1 rounded-lg hover:bg-katrix-blue-chill/10 whitespace-nowrap text-sm"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}