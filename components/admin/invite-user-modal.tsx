'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, UserPlus, AlertCircle } from 'lucide-react';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: 'ADMINISTRATOR' | 'OPERATOR') => void;
}

export function InviteUserModal({ isOpen, onClose, onInvite }: InviteUserModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMINISTRATOR' | 'OPERATOR'>('OPERATOR');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('El email es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onInvite(email, role);
      setEmail('');
      setRole('OPERATOR');
      onClose();
    } catch (error) {
      setError('Error al enviar la invitación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setRole('OPERATOR');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md p-0 border-0 bg-transparent shadow-none z-[100]">
        <div className="glass-panel rounded-2xl p-6 text-katrix-pearl-bush backdrop-blur-xl border border-katrix-pearl-bush/20 shadow-2xl">
          <DialogHeader className="space-y-4 mb-6">
            <DialogTitle className="flex items-center space-x-3 text-katrix-pearl-bush text-xl font-semibold">
              <div className="p-2 rounded-xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
                <UserPlus className="h-5 w-5 text-katrix-blue-chill" />
              </div>
              <span>Invitar Usuario</span>
            </DialogTitle>
            <DialogDescription className="text-katrix-pearl-bush/70 text-sm">
              Envía una invitación para que un nuevo usuario se una al equipo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-katrix-pearl-bush font-medium text-sm">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@empresa.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`glass-input pl-11 h-11 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50 focus:ring-2 focus:ring-katrix-blue-chill/50 ${
                    error ? 'ring-2 ring-red-500/50' : ''
                  }`}
                />
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="role" className="text-katrix-pearl-bush font-medium text-sm">
                Rol del Usuario
              </Label>
              <Select value={role} onValueChange={(value: 'ADMINISTRATOR' | 'OPERATOR') => setRole(value)}>
                <SelectTrigger className="glass-input h-11 rounded-xl border-0 text-katrix-pearl-bush focus:ring-2 focus:ring-katrix-blue-chill/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border border-katrix-pearl-bush/20 text-katrix-pearl-bush backdrop-blur-xl z-[110]">
                  <SelectItem value="OPERATOR" className="hover:bg-katrix-blue-chill/20 focus:bg-katrix-blue-chill/20">
                    Operador - Acceso de solo lectura
                  </SelectItem>
                  <SelectItem value="ADMINISTRATOR" className="hover:bg-katrix-blue-chill/20 focus:bg-katrix-blue-chill/20">
                    Administrador - Acceso completo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isLoading}
                className="glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush h-10 px-5 rounded-xl transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="glass-button h-10 px-5 rounded-xl font-semibold hover:scale-105 transition-all duration-200 min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-katrix-black-pearl"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  'Enviar Invitación'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}