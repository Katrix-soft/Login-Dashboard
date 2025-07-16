'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, getRecentActivity } from '@/lib/mock-data';
import { AlertTriangle, Clock, XCircle, Database, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { RecentActivityTable } from './recent-activity-table';
import { CostChart } from './cost-chart';
import { DistributionChart } from './distribution-chart';

export function DashboardContent() {
  const [stats, setStats] = useState(mockDashboardStats);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Cargar datos inmediatamente sin delay artificial
    setStats(mockDashboardStats);
    setRecentActivity(getRecentActivity());
  }, []);

  const statsCards = [
    {
      title: 'Deudas Vencidas',
      value: stats.deudas_vencidas,
      description: 'Facturas con pago vencido',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-red-600/20',
      glowColor: 'shadow-red-500/20',
    },
    {
      title: 'Próximos Vencimientos',
      value: stats.proximos_vencimientos,
      description: 'Próximas a vencer (7 días)',
      icon: Clock,
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-yellow-600/20',
      glowColor: 'shadow-yellow-500/20',
    },
    {
      title: 'Errores de Consulta',
      value: stats.errores_consulta,
      description: 'Servicios con errores',
      icon: XCircle,
      color: 'text-orange-400',
      bgGradient: 'from-orange-500/20 to-orange-600/20',
      glowColor: 'shadow-orange-500/20',
    },
    {
      title: 'Total Servicios',
      value: stats.total_servicios,
      description: 'Servicios monitoreados',
      icon: Database,
      color: 'text-katrix-blue-chill',
      bgGradient: 'from-katrix-blue-chill/20 to-katrix-surfie-green/20',
      glowColor: 'shadow-katrix-blue-chill/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3 text-shadow">
            Bienvenido al Panel de Control
          </h1>
          <p className="text-katrix-pearl-bush/80 text-lg">
            Monitorea el estado de tus servicios públicos en tiempo real
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={stat.title}
            className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
            
            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-katrix-pearl-bush/80">
                  {stat.title}
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bgGradient} ${stat.glowColor} shadow-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>

              {/* Value */}
              <div className="text-4xl font-bold text-katrix-pearl-bush mb-2">
                {stat.value}
              </div>

              {/* Description */}
              <p className="text-xs text-katrix-pearl-bush/60">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 - Resumen de Costos */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Resumen de Costos Mensuales
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Análisis de gastos por servicio
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
              <TrendingUp className="h-6 w-6 text-katrix-blue-chill" />
            </div>
          </div>
          
          <CostChart />
        </div>

        {/* Chart 2 - Distribución de Servicios */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Distribución de Servicios
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Por tipo de proveedor
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          
          <DistributionChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Actividad Reciente
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Últimas actualizaciones de facturas y servicios
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <Activity className="h-6 w-6 text-green-400" />
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <RecentActivityTable data={recentActivity} />
        </div>
      </div>
    </div>
  );
}