'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { Breadcrumbs } from './breadcrumbs';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? 64 : 256);

  return (
    <div className="min-h-screen bg-katrix-mesh flex">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
        ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}>
        <Sidebar 
          onCollapseChange={setSidebarCollapsed}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Main Content */}
      <div 
        className="flex flex-col min-h-screen flex-1 transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            isMobile={isMobile}
          />
        </div>
        
        {/* Breadcrumbs */}
        <div className="flex-shrink-0 px-4 md:px-8 py-3 bg-katrix-outer-space/30 border-b border-katrix-pearl-bush/10 flex items-center">
          <Breadcrumbs />
        </div>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}