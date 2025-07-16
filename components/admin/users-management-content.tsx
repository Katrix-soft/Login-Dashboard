'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/lib/auth-context';
import { mockUsers, User } from '@/lib/mock-data';
import { UserPlus, Edit, Shield, UserCheck, UserX, Users } from 'lucide-react';
import { InviteUserModal } from './invite-user-modal';
import { toast } from 'sonner';

export function UsersManagementContent() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleToggleUserStatus = (userId: string) => {
    if (userId === currentUser?.id) {
      toast.error('No puedes desactivar tu propia cuenta');
      return;
    }

    if (confirm('¿Estás seguro de que quieres cambiar el estado de este usuario?')) {
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : user
      ));
      toast.success('Estado del usuario actualizado');
    }
  };

  const handleChangeRole = (userId: string, newRole: 'ADMINISTRATOR' | 'OPERATOR') => {
    if (userId === currentUser?.id) {
      toast.error('No puedes cambiar tu propio rol');
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar el rol a ${newRole === 'ADMINISTRATOR' ? 'Administrador' : 'Operador'}?`)) {
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, role: newRole }
          : user
      ));
      toast.success('Rol del usuario actualizado');
    }
  };

  const getRoleBadge = (role: string) => {
    return role === 'ADMINISTRATOR' ? (
      <Badge className="text-xs bg-katrix-blue-chill/20 text-katrix-blue-chill border-katrix-blue-chill/30 hover:bg-katrix-blue-chill/30">
        <Shield className="w-3 h-3 mr-1" />
        Administrador
      </Badge>
    ) : (
      <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
        <UserCheck className="w-3 h-3 mr-1" />
        Operador
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'ACTIVE' ? (
      <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30 text-xs">
        <UserCheck className="w-3 h-3 mr-1" />
        Activo
      </Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 text-xs">
        <UserX className="w-3 h-3 mr-1" />
        Inactivo
      </Badge>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">
              Gestión de Usuarios
            </h1>
            <p className="text-katrix-pearl-bush/80 text-lg">
              Administra los miembros del equipo y sus permisos de acceso
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20 glow">
              <Users className="h-8 w-8 text-katrix-blue-chill" />
            </div>
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className="glass-button h-12 px-6 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Invitar Usuario
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
              Usuarios del Sistema ({users.length})
            </h3>
            <p className="text-katrix-pearl-bush/60 text-sm">
              Lista completa de usuarios con acceso a la plataforma
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-katrix-blue-chill/20 to-katrix-surfie-green/20 text-katrix-blue-chill font-semibold">
            {users.filter(u => u.status === 'ACTIVE').length} activos
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <div className="rounded-xl border border-katrix-pearl-bush/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-katrix-pearl-bush/10 hover:bg-katrix-pearl-bush/5">
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Usuario</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Email</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Rol</TableHead>
                  <TableHead className="text-katrix-pearl-bush/80 font-semibold">Estado</TableHead>
                  <TableHead className="text-right text-katrix-pearl-bush/80 font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="hover:bg-katrix-pearl-bush/5 border-katrix-pearl-bush/10 transition-colors duration-200"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-katrix-blue-chill to-katrix-surfie-green flex items-center justify-center text-katrix-pearl-bush text-sm font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-katrix-pearl-bush">
                            {user.name}
                          </div>
                          {user.id === currentUser?.id && (
                            <div className="text-xs text-katrix-blue-chill font-medium">Tú</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-katrix-pearl-bush/80 font-mono">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status || 'ACTIVE')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleChangeRole(
                            user.id, 
                            user.role === 'ADMINISTRATOR' ? 'OPERATOR' : 'ADMINISTRATOR'
                          )}
                          disabled={user.id === currentUser?.id}
                          className="h-8 w-8 p-0 glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-blue-chill rounded-lg"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={(user.status || 'ACTIVE') === 'ACTIVE'}
                          onCheckedChange={() => handleToggleUserStatus(user.id)}
                          disabled={user.id === currentUser?.id}
                          className="data-[state=checked]:bg-katrix-blue-chill"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={(email, role) => {
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            role,
            status: 'ACTIVE'
          };
          setUsers(prev => [...prev, newUser]);
          toast.success(`Usuario ${email} invitado con éxito`);
        }}
      />
    </div>
  );
}