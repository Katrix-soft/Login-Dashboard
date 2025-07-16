'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInvoices, Invoice } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

export function InvoicesContent() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filters, setFilters] = useState({
    search: '',
    tipo_servicio: '',
    estado_pago: '',
    fecha_desde: '',
    fecha_hasta: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isAdmin = user?.role === 'ADMINISTRATOR';

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'PAGADO':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 text-xs font-medium">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pagado
          </Badge>
        );
      case 'PENDIENTE':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30 text-xs font-medium">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case 'VENCIDO':
        return (
          <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 text-xs font-medium">
            <AlertTriangle className="w-3 h-3 mr-1" />
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

  const filteredInvoices = invoices.filter(invoice => {
    if (filters.search && !invoice.numero_factura.toLowerCase().includes(filters.search.toLowerCase()) && 
        !invoice.nic.includes(filters.search)) {
      return false;
    }
    if (filters.tipo_servicio && invoice.tipo_servicio !== filters.tipo_servicio) {
      return false;
    }
    if (filters.estado_pago && invoice.estado_pago !== filters.estado_pago) {
      return false;
    }
    return true;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      // Simular upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`${files.length} archivo(s) subido(s) correctamente`, {
        description: 'Las facturas han sido procesadas y almacenadas'
      });
      
      // Reset file input
      e.target.value = '';
    } catch (error) {
      toast.error('Error al subir archivos', {
        description: 'Por favor, inténtalo de nuevo'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    if (confirm('¿Marcar esta factura como pagada?')) {
      setInvoices(prev => prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, estado_pago: 'PAGADO' as const }
          : invoice
      ));
      toast.success('Factura marcada como pagada');
    }
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta factura?')) {
      setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId));
      toast.success('Factura eliminada correctamente');
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.monto, 0);
  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.estado_pago === 'PENDIENTE')
    .reduce((sum, invoice) => sum + invoice.monto, 0);
  const overdueAmount = filteredInvoices
    .filter(invoice => invoice.estado_pago === 'VENCIDO')
    .reduce((sum, invoice) => sum + invoice.monto, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">
              Gestión de Facturas
            </h1>
            <p className="text-katrix-pearl-bush/80 text-lg">
              Administra y monitorea todas las facturas de servicios públicos
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20 glow">
            <FileText className="h-8 w-8 text-katrix-blue-chill" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-katrix-pearl-bush/80">
              Total Facturas
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
              <DollarSign className="h-6 w-6 text-katrix-blue-chill" />
            </div>
          </div>
          <div className="text-3xl font-bold text-katrix-pearl-bush mb-2">
            {formatCurrency(totalAmount)}
          </div>
          <p className="text-xs text-katrix-pearl-bush/60">
            {filteredInvoices.length} facturas
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-katrix-pearl-bush/80">
              Pendientes
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-katrix-pearl-bush mb-2">
            {formatCurrency(pendingAmount)}
          </div>
          <p className="text-xs text-katrix-pearl-bush/60">
            {filteredInvoices.filter(i => i.estado_pago === 'PENDIENTE').length} facturas
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-katrix-pearl-bush/80">
              Vencidas
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-katrix-pearl-bush mb-2">
            {formatCurrency(overdueAmount)}
          </div>
          <p className="text-xs text-katrix-pearl-bush/60">
            {filteredInvoices.filter(i => i.estado_pago === 'VENCIDO').length} facturas
          </p>
        </div>
      </div>

      {/* Upload Section */}
      {isAdmin && (
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Subir Facturas PDF
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Arrastra y suelta archivos PDF o selecciona desde tu dispositivo
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <Upload className="h-6 w-6 text-green-400" />
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="border-2 border-dashed border-katrix-pearl-bush/30 rounded-xl p-8 text-center hover:border-katrix-blue-chill/50 transition-colors duration-200">
              <Upload className="h-12 w-12 text-katrix-pearl-bush/60 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-katrix-pearl-bush font-medium">
                  Arrastra archivos PDF aquí o haz clic para seleccionar
                </p>
                <p className="text-katrix-pearl-bush/60 text-sm">
                  Formatos soportados: PDF (máximo 10MB por archivo)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-katrix-blue-chill"></div>
                  <span className="text-katrix-pearl-bush/80">Subiendo archivos...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Filtros de Búsqueda
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Filtra las facturas por diferentes criterios
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Filter className="h-6 w-6 text-purple-400" />
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="search" className="text-katrix-pearl-bush font-medium">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="NIC o N° Factura..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="glass-input pl-10 h-10 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-katrix-pearl-bush font-medium">
                Tipo de Servicio
              </Label>
              <Select
                value={filters.tipo_servicio}
                onValueChange={(value) => setFilters(prev => ({ ...prev, tipo_servicio: value === 'all' ? '' : value }))}
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
              <Label className="text-katrix-pearl-bush font-medium">
                Estado de Pago
              </Label>
              <Select
                value={filters.estado_pago}
                onValueChange={(value) => setFilters(prev => ({ ...prev, estado_pago: value === 'all' ? '' : value }))}
              >
                <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="PAGADO">Pagado</SelectItem>
                  <SelectItem value="VENCIDO">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-katrix-pearl-bush font-medium">
                Acciones
              </Label>
              <Button
                onClick={() => setFilters({ search: '', tipo_servicio: '', estado_pago: '', fecha_desde: '', fecha_hasta: '' })}
                className="glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush h-10 w-full rounded-xl"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Facturas Registradas ({filteredInvoices.length})
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Lista completa de facturas con su estado actual
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-katrix-blue-chill/20 to-katrix-surfie-green/20 text-katrix-blue-chill font-semibold">
            {filteredInvoices.length} facturas
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <div className="rounded-xl border border-katrix-pearl-bush/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-katrix-pearl-bush/10 hover:bg-katrix-pearl-bush/5">
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">NIC</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Servicio</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">N° Factura</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Monto</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Vencimiento</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Estado</TableHead>
                  <TableHead className="text-right text-katrix-pearl-bush/80 font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id} 
                    className="hover:bg-katrix-pearl-bush/5 border-katrix-pearl-bush/10 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-katrix-pearl-bush font-mono">
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
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-blue-chill"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-green-400"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {isAdmin && invoice.estado_pago === 'PENDIENTE' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-green-400"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
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
                              onClick={() => handleDeleteInvoice(invoice.id)}
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
        </div>
      </div>
    </div>
  );
}