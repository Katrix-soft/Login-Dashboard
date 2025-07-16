'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  SearchCheck, 
  FileText, 
  Settings, 
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  onCollapseChange: (collapsed: boolean) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ onCollapseChange, isMobile = false, isOpen = false, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCollapse = () => {
    if (isMobile) return;
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapseChange(newCollapsed);
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Panel principal'
    },
    {
      name: 'Servicios',
      href: '/services',
      icon: SearchCheck,
      description: 'Gestión de servicios'
    },
    {
      name: 'Facturas',
      href: '/invoices',
      icon: FileText,
      description: 'Gestión de facturas'
    },
    {
      name: 'Configuración',
      href: '/settings',
      icon: Settings,
      description: 'Configuración del sistema'
    }
  ];

  const adminItems = [
    {
      name: 'Usuarios',
      href: '/admin/users',
      icon: Users,
      description: 'Gestión de usuarios'
    }
  ];

  const quickActions = [
    {
      name: 'Nuevo Servicio',
      href: '/services/create',
      icon: Plus,
      description: 'Agregar servicio'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (!isMounted || !user) {
    return (
      <div className={`h-full bg-katrix-outer-space border-r border-katrix-pearl-bush/10 flex flex-col ${
        isMobile ? 'w-80' : (collapsed ? 'w-16' : 'w-64')
      }`}>
        <div className="p-4">
          <div className="h-8 bg-katrix-pearl-bush/20 rounded-lg mb-2 animate-pulse"></div>
          <div className="h-4 bg-katrix-pearl-bush/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-katrix-outer-space border-r border-katrix-pearl-bush/10 flex flex-col transition-all duration-300 ${
      isMobile ? 'w-80' : (collapsed ? 'w-16' : 'w-64')
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-katrix-pearl-bush/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          {(!collapsed || isMobile) && (
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
                <Shield className="h-6 w-6 text-katrix-blue-chill" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-katrix-pearl-bush">
                  Katrix Insights
                </h1>
                <p className="text-xs text-katrix-pearl-bush/60">
                  Plataforma de Gestión
                </p>
              </div>
            </div>
          )}
          
          {isMobile ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush hover:bg-katrix-blue-chill/20"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="h-8 w-8 p-0 text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush hover:bg-katrix-blue-chill/20"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-3 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {(!collapsed || isMobile) && (
            <h3 className="text-xs font-semibold text-katrix-pearl-bush/60 uppercase tracking-wider mb-3 px-2">
              Navegación
            </h3>
          )}
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center ${collapsed && !isMobile ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2.5'} rounded-xl transition-all duration-200 group ${
                  active 
                    ? 'bg-katrix-blue-chill/20 text-katrix-blue-chill border border-katrix-blue-chill/30' 
                    : 'text-katrix-pearl-bush/70 hover:text-katrix-pearl-bush hover:bg-katrix-pearl-bush/5'
                }`}
              >
                <div className={`${collapsed && !isMobile ? 'p-2.5' : 'p-1.5'} rounded-lg ${
                  active 
                    ? 'bg-katrix-blue-chill/20 text-katrix-blue-chill' 
                    : 'bg-katrix-pearl-bush/10 text-katrix-pearl-bush/70 group-hover:bg-katrix-blue-chill/20 group-hover:text-katrix-blue-chill'
                } transition-all duration-200`}>
                  <Icon className={`${collapsed && !isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
                </div>
                {(!collapsed || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name}</div>
                    <div className="text-xs text-katrix-pearl-bush/50 truncate">
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="space-y-1">
          {(!collapsed || isMobile) && (
            <h3 className="text-xs font-semibold text-katrix-pearl-bush/60 uppercase tracking-wider mb-3 px-2">
              Acciones
            </h3>
          )}
          
          {quickActions.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center ${collapsed && !isMobile ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2.5'} rounded-xl text-katrix-pearl-bush/70 hover:text-katrix-pearl-bush hover:bg-katrix-pearl-bush/5 transition-all duration-200 group`}
              >
                <div className={`${collapsed && !isMobile ? 'p-2.5' : 'p-1.5'} rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-all duration-200`}>
                  <Icon className={`${collapsed && !isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
                </div>
                {(!collapsed || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name}</div>
                    <div className="text-xs text-katrix-pearl-bush/50 truncate">
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Admin Section */}
        {user.role === 'ADMINISTRATOR' && (
          <div className="space-y-1">
            {(!collapsed || isMobile) && (
              <h3 className="text-xs font-semibold text-katrix-pearl-bush/60 uppercase tracking-wider mb-3 px-2">
                Admin
              </h3>
            )}
            
            {adminItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center ${collapsed && !isMobile ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2.5'} rounded-xl transition-all duration-200 group ${
                    active 
                      ? 'bg-katrix-blue-chill/20 text-katrix-blue-chill border border-katrix-blue-chill/30' 
                      : 'text-katrix-pearl-bush/70 hover:text-katrix-pearl-bush hover:bg-katrix-pearl-bush/5'
                  }`}
                >
                  <div className={`${collapsed && !isMobile ? 'p-2.5' : 'p-1.5'} rounded-lg ${
                    active 
                      ? 'bg-katrix-blue-chill/20 text-katrix-blue-chill' 
                      : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'
                  } transition-all duration-200`}>
                    <Icon className={`${collapsed && !isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
                  </div>
                  {(!collapsed || isMobile) && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{item.name}</div>
                      <div className="text-xs text-katrix-pearl-bush/50 truncate">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* User Info & Logout - Tamaño reducido */}
      <div className="p-3 border-t border-katrix-pearl-bush/10 flex-shrink-0">
        {(!collapsed || isMobile) ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-katrix-outer-space/50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-katrix-blue-chill to-katrix-surfie-green flex items-center justify-center text-katrix-pearl-bush text-xs font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-katrix-pearl-bush truncate">
                  {user.name}
                </div>
                <div className="text-xs text-katrix-pearl-bush/60 truncate">
                  {user.role === 'ADMINISTRATOR' ? 'Administrador' : 'Operador'}
                </div>
              </div>
            </div>
            
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-katrix-pearl-bush/80 hover:text-red-400 hover:bg-red-500/10 h-8 rounded-lg text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-katrix-blue-chill to-katrix-surfie-green flex items-center justify-center text-katrix-pearl-bush text-xs font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-katrix-pearl-bush/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg flex items-center justify-center"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}