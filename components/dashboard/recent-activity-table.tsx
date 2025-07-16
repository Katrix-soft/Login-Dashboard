'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Invoice } from '@/lib/mock-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RecentActivityTableProps {
  data: Invoice[];
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'PAGADO':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 text-xs font-medium">
            Pagado
          </Badge>
        );
      case 'PENDIENTE':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30 text-xs font-medium">
            Pendiente
          </Badge>
        );
      case 'VENCIDO':
        return (
          <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 text-xs font-medium">
            Vencido
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <div className="rounded-xl border border-katrix-pearl-bush/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-katrix-pearl-bush/10 hover:bg-katrix-pearl-bush/5">
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">NIC</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Servicio</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Nº Factura</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Monto</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Vencimiento</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Estado</TableHead>
            <TableHead className="text-katrix-pearl-bush/80 font-semibold">Actualizado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow 
              key={invoice.id} 
              className="hover:bg-katrix-pearl-bush/5 border-katrix-pearl-bush/10 transition-colors duration-200"
            >
              <TableCell className="font-medium text-katrix-pearl-bush">
                {invoice.nic}
              </TableCell>
              <TableCell>
                {getServiceBadge(invoice.tipo_servicio)}
              </TableCell>
              <TableCell className="text-sm text-katrix-pearl-bush/80 font-mono">
                {invoice.numero_factura}
              </TableCell>
              <TableCell className="font-semibold text-katrix-pearl-bush">
                {formatCurrency(invoice.monto)}
              </TableCell>
              <TableCell className="text-sm text-katrix-pearl-bush/80">
                {format(new Date(invoice.fecha_vencimiento), 'dd/MM/yyyy', { locale: es })}
              </TableCell>
              <TableCell>
                {getStatusBadge(invoice.estado_pago)}
              </TableCell>
              <TableCell className="text-sm text-katrix-pearl-bush/60">
                {format(new Date(invoice.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}