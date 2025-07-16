'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockServices, getServicesByFilters } from '@/lib/mock-data';
import { ServicesTable } from './services-table';
import { ServicesFilters } from './services-filters';
import { SearchCheck, Filter } from 'lucide-react';

export function ServicesContent() {
  const [filters, setFilters] = useState({
    nic: '',
    sucursal: '',
    tipo_servicio: '',
    estado: '',
  });

  const filteredServices = getServicesByFilters(filters);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">
              Gestión de Servicios
            </h1>
            <p className="text-katrix-pearl-bush/80 text-lg">
              Administra y monitorea todos los servicios públicos registrados
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20 glow">
            <SearchCheck className="h-8 w-8 text-katrix-blue-chill" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Filtros de Búsqueda
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Utiliza los filtros para encontrar servicios específicos
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
            <Filter className="h-6 w-6 text-katrix-blue-chill" />
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <ServicesFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Services Table */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Servicios Registrados ({filteredServices.length})
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Lista completa de servicios con su estado actual
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-katrix-blue-chill/20 to-katrix-surfie-green/20 text-katrix-blue-chill font-semibold">
            {filteredServices.length} servicios
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <ServicesTable data={filteredServices} />
        </div>
      </div>
    </div>
  );
}