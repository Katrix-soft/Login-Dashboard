'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, PlusCircle, Building, Hash } from 'lucide-react';
import { toast } from 'sonner';

export function CreateServiceContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nic: '',
    sucursal: '',
    tipo_servicio: '',
    empresa: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nic.trim()) {
      newErrors.nic = 'El NIC es requerido';
    } else if (!/^\d+$/.test(formData.nic)) {
      newErrors.nic = 'El NIC debe contener solo números';
    }

    if (!formData.sucursal.trim()) {
      newErrors.sucursal = 'La sucursal es requerida';
    }

    if (!formData.tipo_servicio) {
      newErrors.tipo_servicio = 'El tipo de servicio es requerido';
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = 'La empresa es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('✅ Servicio agregado con éxito', {
        description: `NIC ${formData.nic} registrado correctamente`
      });
      
      router.push('/services');
    } catch (error) {
      toast.error('Error al crear el servicio', {
        description: 'Por favor, inténtalo de nuevo'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = Object.values(formData).some(value => value.trim() !== '');
    
    if (hasChanges) {
      if (confirm('¿Estás seguro de que quieres descartar los cambios?')) {
        router.push('/services');
      }
    } else {
      router.push('/services');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">
              Agregar Nuevo Servicio
            </h1>
            <p className="text-katrix-pearl-bush/80 text-lg">
              Registra un nuevo servicio público para monitoreo automático
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20 glow">
            <PlusCircle className="h-8 w-8 text-katrix-blue-chill" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-8 hover:scale-[1.01] transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información del Suministro */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-katrix-pearl-bush/20">
              <div className="p-2 rounded-xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
                <Hash className="h-5 w-5 text-katrix-blue-chill" />
              </div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush">
                Información del Suministro
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="nic" className="text-katrix-pearl-bush font-medium">
                  NIC / Número de Suministro *
                </Label>
                <Input
                  id="nic"
                  type="text"
                  placeholder="Ej: 1013048"
                  value={formData.nic}
                  onChange={(e) => handleInputChange('nic', e.target.value)}
                  className={`glass-input h-12 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50 ${
                    errors.nic ? 'ring-2 ring-red-500/50' : ''
                  }`}
                />
                {errors.nic && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.nic}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="sucursal" className="text-katrix-pearl-bush font-medium">
                  Nombre o Sucursal *
                </Label>
                <Input
                  id="sucursal"
                  type="text"
                  placeholder="Ej: SUC001 - Oficina Principal"
                  value={formData.sucursal}
                  onChange={(e) => handleInputChange('sucursal', e.target.value)}
                  className={`glass-input h-12 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50 ${
                    errors.sucursal ? 'ring-2 ring-red-500/50' : ''
                  }`}
                />
                {errors.sucursal && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.sucursal}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Datos del Proveedor */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-katrix-pearl-bush/20">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <Building className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush">
                Datos del Proveedor
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="tipo_servicio" className="text-katrix-pearl-bush font-medium">
                  Tipo de Servicio *
                </Label>
                <Select
                  value={formData.tipo_servicio}
                  onValueChange={(value) => handleInputChange('tipo_servicio', value)}
                >
                  <SelectTrigger className={`glass-input h-12 rounded-xl border-0 text-katrix-pearl-bush ${
                    errors.tipo_servicio ? 'ring-2 ring-red-500/50' : ''
                  }`}>
                    <SelectValue placeholder="Selecciona el tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
                    <SelectItem value="ENEL">ENEL - Electricidad</SelectItem>
                    <SelectItem value="ESSALUD">ESSALUD - Salud</SelectItem>
                    <SelectItem value="OSINERGMIN">OSINERGMIN - Energía</SelectItem>
                    <SelectItem value="SUNASS">SUNASS - Agua</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipo_servicio && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.tipo_servicio}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="empresa" className="text-katrix-pearl-bush font-medium">
                  Empresa Proveedora *
                </Label>
                <Input
                  id="empresa"
                  type="text"
                  placeholder="Ej: Enel Distribución Perú"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange('empresa', e.target.value)}
                  className={`glass-input h-12 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50 ${
                    errors.empresa ? 'ring-2 ring-red-500/50' : ''
                  }`}
                />
                {errors.empresa && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.empresa}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-katrix-pearl-bush/20">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={isLoading}
              className="glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush h-12 px-8 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="glass-button min-w-[160px] h-12 px-8 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-katrix-black-pearl"></div>
                  <span>Guardando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Guardar Servicio</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}