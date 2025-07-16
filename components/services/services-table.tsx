'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Service } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface ServicesTableProps {
  data: Service[];
}

export function ServicesTable({ data }: ServicesTableProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMINISTRATOR';

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 text-xs font-medium">
            Activo
          </Badge>
        );
      case 'INACTIVO':
        return (
          <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/30 text-xs font-medium">
            Inactivo
          </Badge>
        );
      case 'ERROR':
        return (
          <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 text-xs font-medium">
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {estado}
          </Badge>
        );
    }
  };

  const getServiceBadge = (tipo: string) => {
    const colors = {
      ENEL: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      ESSALUD: 'bg-green-500/20 text-green-400 border-green-500/30',
      OSINERGMIN: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      SUNASS: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    
    return (
      <Badge className={`${colors[tipo as keyof typeof colors]} hover:opacity-80 text-xs font-medium`}>
        {tipo}
      </Badge>
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-katrix-pearl-bush/60 text-lg">
          No se encontraron servicios con los filtros aplicados.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-katrix-pearl-bush/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-katrix-pearl-bush/10 hover:bg-katrix-pearl-bush/5">
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">NIC</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Sucursal</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Tipo de Servicio</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Estado</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Última Consulta</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Registrado</TableHead>
            <TableHead className="text-right text-katrix-pearl-bush/80 font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((service) => (
            <TableRow 
              key={service.id} 
              className="hover:bg-katrix-pearl-bush/5 border-katrix-pearl-bush/10 transition-colors duration-200"
            >
              <TableCell className="font-medium text-katrix-pearl-bush font-mono">
                {service.nic}
              </TableCell>
              <TableCell className="text-katrix-pearl-bush/80">
                {service.sucursal}
              </TableCell>
              <TableCell>
                {getServiceBadge(service.tipo_servicio)}
              </TableCell>
              <TableCell>
                {getStatusBadge(service.estado)}
              </TableCell>
              <TableCell className="text-sm text-katrix-pearl-bush/80">
                {format(new Date(service.ultima_consulta), 'dd/MM/yyyy HH:mm', { locale: es })}
              </TableCell>
              <TableCell className="text-sm text-katrix-pearl-bush/60">
                {format(new Date(service.created_at), 'dd/MM/yyyy', { locale: es })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-blue-chill"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-blue-chill"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}