'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export function Header({ onMenuClick, isMobile = false }: HeaderProps) {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <header className="header-glass sticky top-0 z-30 px-4 md:px-8 py-6 w-full border-b border-katrix-pearl-bush/10">
        <div className="flex items-center justify-between">
          <div className="shimmer">
            <div className="h-8 bg-katrix-pearl-bush/20 rounded-lg w-48 mb-2"></div>
            <div className="h-4 bg-katrix-pearl-bush/10 rounded-lg w-32"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-80 bg-katrix-pearl-bush/10 rounded-xl shimmer hidden md:block"></div>
            <div className="h-12 w-12 bg-katrix-pearl-bush/10 rounded-xl shimmer"></div>
            <div className="h-8 w-24 bg-katrix-pearl-bush/10 rounded-full shimmer"></div>
            <div className="h-12 w-12 bg-katrix-pearl-bush/10 rounded-full shimmer"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header-glass sticky top-0 z-30 px-4 md:px-8 py-6 animate-fade-in w-full border-b border-katrix-pearl-bush/10">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button for mobile + Welcome Message */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="h-12 w-12 rounded-xl dark-glass-button text-katrix-pearl-bush/80 hover:text-katrix-blue-chill hover:bg-katrix-blue-chill/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-katrix-pearl-bush text-shadow mb-1">
              Hola, {user.name.split(' ')[0]}
            </h1>
            <p className="text-katrix-pearl-bush/70 text-sm hidden md:block">
              Bienvenido de vuelta a tu panel de control
            </p>
          </div>
        </div>

        {/* Right side - Search and Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-5 w-5" />
            <Input
              placeholder="Buscar servicios, facturas..."
              className="dark-search-input pl-12 w-80 h-12 rounded-xl border-0 bg-katrix-outer-space/50 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50 focus:ring-2 focus:ring-katrix-blue-chill/50 focus:bg-katrix-outer-space/70 transition-all duration-200"
            />
          </div>

          {/* Search button for mobile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden h-12 w-12 rounded-xl dark-glass-button text-katrix-pearl-bush/80 hover:text-katrix-blue-chill hover:bg-katrix-blue-chill/10"
          >
            <Search className="h-6 w-6" />
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-12 w-12 rounded-xl dark-glass-button text-katrix-pearl-bush/80 hover:text-katrix-blue-chill hover:bg-katrix-blue-chill/10 transition-all duration-200"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse border-2 border-katrix-outer-space"></span>
          </Button>

          {/* User Role Badge - Hidden on mobile */}
          <div className="hidden md:block px-4 py-2 text-sm font-semibold rounded-full dark-role-badge text-katrix-blue-chill border border-katrix-blue-chill/30 bg-katrix-blue-chill/10">
            {user.role === 'ADMINISTRATOR' ? 'Administrador' : 'Operador'}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full dark-glass-button hover:ring-2 hover:ring-katrix-blue-chill/30 transition-all duration-200">
                <Avatar className="h-12 w-12 ring-2 ring-katrix-blue-chill/30 hover:ring-katrix-blue-chill/50 transition-all duration-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-katrix-blue-chill to-katrix-surfie-green text-katrix-pearl-bush font-bold text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 dark-dropdown border-0 text-katrix-pearl-bush z-50" 
              align="end" 
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2 p-2">
                  <p className="text-sm font-semibold leading-none text-katrix-pearl-bush">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-katrix-pearl-bush/70">
                    {user.email}
                  </p>
                  <div className="md:hidden px-2 py-1 text-xs font-semibold rounded-full dark-role-badge text-katrix-blue-chill border border-katrix-blue-chill/30 bg-katrix-blue-chill/10 text-center">
                    {user.role === 'ADMINISTRATOR' ? 'Administrador' : 'Operador'}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-katrix-pearl-bush/20" />
              <DropdownMenuItem className="text-katrix-pearl-bush hover:bg-katrix-blue-chill/20 focus:bg-katrix-blue-chill/20 cursor-pointer rounded-lg mx-1">
                <User className="mr-3 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-katrix-pearl-bush hover:bg-katrix-blue-chill/20 focus:bg-katrix-blue-chill/20 cursor-pointer rounded-lg mx-1">
                <Settings className="mr-3 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-katrix-pearl-bush/20" />
              <DropdownMenuItem 
                onClick={logout} 
                className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer rounded-lg mx-1"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}