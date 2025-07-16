'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ServicesFiltersProps {
  filters: {
    nic: string;
    sucursal: string;
    tipo_servicio: string;
    estado: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function ServicesFilters({ filters, onFiltersChange }: ServicesFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    const filterValue = value === 'all' ? '' : value;
    onFiltersChange({
      ...filters,
      [key]: filterValue,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      nic: '',
      sucursal: '',
      tipo_servicio: '',
      estado: '',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="space-y-3">
        <Label htmlFor="nic" className="text-katrix-pearl-bush font-medium">
          NIC
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-4 w-4" />
          <Input
            id="nic"
            placeholder="Buscar por NIC..."
            value={filters.nic}
            onChange={(e) => handleFilterChange('nic', e.target.value)}
            className="glass-input pl-10 h-10 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="sucursal" className="text-katrix-pearl-bush font-medium">
          Sucursal
        </Label>
        <Input
          id="sucursal"
          placeholder="Buscar por sucursal..."
          value={filters.sucursal}
          onChange={(e) => handleFilterChange('sucursal', e.target.value)}
          className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="tipo_servicio" className="text-katrix-pearl-bush font-medium">
          Tipo de Servicio
        </Label>
        <Select
          value={filters.tipo_servicio || 'all'}
          onValueChange={(value) => handleFilterChange('tipo_servicio', value)}
        >
          <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
            <SelectValue placeholder="Todos los servicios" />
          </SelectTrigger>
          <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
            <SelectItem value="all">Todos los servicios</SelectItem>
            <SelectItem value="ENEL">ENEL</SelectItem>
            <SelectItem value="ESSALUD">ESSALUD</SelectItem>
            <SelectItem value="OSINERGMIN">OSINERGMIN</SelectItem>
            <SelectItem value="SUNASS">SUNASS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="estado" className="text-katrix-pearl-bush font-medium">
          Estado
        </Label>
        <div className="flex space-x-2">
          <Select
            value={filters.estado || 'all'}
            onValueChange={(value) => handleFilterChange('estado', value)}
          >
            <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="ACTIVO">Activo</SelectItem>
              <SelectItem value="INACTIVO">Inactivo</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFilters}
            className="shrink-0 h-10 w-10 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-red-400 rounded-xl"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}