'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail,
  Clock,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

export function SettingsContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    invoiceReminders: true,
    systemAlerts: true,
    weeklyReports: false,
    maintenanceAlerts: true
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    language: 'es',
    timezone: 'America/Lima',
    dateFormat: 'dd/MM/yyyy',
    currency: 'PEN',
    autoBackup: true,
    sessionTimeout: '30',
    twoFactorAuth: false
  });

  const handleSaveProfile = async () => {
    if (profileSettings.newPassword && profileSettings.newPassword !== profileSettings.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Perfil actualizado correctamente');
      setProfileSettings(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Configuración de notificaciones guardada');
    } catch (error) {
      toast.error('Error al guardar configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSystem = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Configuración del sistema actualizada');
    } catch (error) {
      toast.error('Error al actualizar configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Datos exportados correctamente', {
        description: 'El archivo se ha descargado a tu dispositivo'
      });
    } catch (error) {
      toast.error('Error al exportar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCache = async () => {
    if (confirm('¿Estás seguro de que quieres limpiar la caché? Esto puede afectar el rendimiento temporalmente.')) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Caché limpiada correctamente');
      } catch (error) {
        toast.error('Error al limpiar la caché');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 text-katrix-pearl-bush relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-katrix-blue-chill/10 to-katrix-surfie-green/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-shadow">
              Configuración del Sistema
            </h1>
            <p className="text-katrix-pearl-bush/80 text-lg">
              Personaliza tu experiencia y administra las preferencias del sistema
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20 glow">
            <Settings className="h-8 w-8 text-katrix-blue-chill" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Configuración de Perfil
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Actualiza tu información personal y credenciales
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-katrix-blue-chill/20 to-katrix-surfie-green/20">
              <User className="h-6 w-6 text-katrix-blue-chill" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-katrix-pearl-bush font-medium">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  value={profileSettings.name}
                  onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-katrix-pearl-bush font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileSettings.email}
                  onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>

              <Separator className="bg-katrix-pearl-bush/20" />

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-katrix-pearl-bush font-medium">
                  Contraseña Actual
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileSettings.currentPassword}
                  onChange={(e) => setProfileSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-katrix-pearl-bush font-medium">
                  Nueva Contraseña
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={profileSettings.newPassword}
                  onChange={(e) => setProfileSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-katrix-pearl-bush font-medium">
                  Confirmar Nueva Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileSettings.confirmPassword}
                  onChange={(e) => setProfileSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="glass-button w-full h-10 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Perfil
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Notificaciones
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Configura cómo y cuándo recibir notificaciones
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Bell className="h-6 w-6 text-yellow-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 space-y-6">
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Notificaciones por Email', icon: Mail },
                { key: 'pushNotifications', label: 'Notificaciones Push', icon: Bell },
                { key: 'invoiceReminders', label: 'Recordatorios de Facturas', icon: Clock },
                { key: 'systemAlerts', label: 'Alertas del Sistema', icon: AlertTriangle },
                { key: 'weeklyReports', label: 'Reportes Semanales', icon: Database },
                { key: 'maintenanceAlerts', label: 'Alertas de Mantenimiento', icon: Settings }
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg glass-card hover:glass-card-hover transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-katrix-pearl-bush/70" />
                    <span className="text-katrix-pearl-bush font-medium">{label}</span>
                  </div>
                  <Switch
                    checked={notificationSettings[key as keyof typeof notificationSettings]}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                    }
                    className="data-[state=checked]:bg-katrix-blue-chill"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handleSaveNotifications}
              disabled={isLoading}
              className="glass-button w-full h-10 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Notificaciones
            </Button>
          </div>
        </div>

        {/* System Settings */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Configuración del Sistema
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Ajustes generales de la aplicación
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-katrix-pearl-bush font-medium">
                  Idioma
                </Label>
                <Select
                  value={systemSettings.language}
                  onValueChange={(value) => setSystemSettings(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-katrix-pearl-bush font-medium">
                  Zona Horaria
                </Label>
                <Select
                  value={systemSettings.timezone}
                  onValueChange={(value) => setSystemSettings(prev => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
                    <SelectItem value="America/Lima">Lima (UTC-5)</SelectItem>
                    <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-katrix-pearl-bush font-medium">
                  Formato de Fecha
                </Label>
                <Select
                  value={systemSettings.dateFormat}
                  onValueChange={(value) => setSystemSettings(prev => ({ ...prev, dateFormat: value }))}
                >
                  <SelectTrigger className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-0 text-katrix-pearl-bush">
                    <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-katrix-pearl-bush font-medium">
                  Tiempo de Sesión (minutos)
                </Label>
                <Input
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  className="glass-input h-10 rounded-xl border-0 text-katrix-pearl-bush"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg glass-card hover:glass-card-hover transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-katrix-pearl-bush/70" />
                  <span className="text-katrix-pearl-bush font-medium">Autenticación de Dos Factores</span>
                </div>
                <Switch
                  checked={systemSettings.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, twoFactorAuth: checked }))
                  }
                  className="data-[state=checked]:bg-katrix-blue-chill"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg glass-card hover:glass-card-hover transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-katrix-pearl-bush/70" />
                  <span className="text-katrix-pearl-bush font-medium">Respaldo Automático</span>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, autoBackup: checked }))
                  }
                  className="data-[state=checked]:bg-katrix-blue-chill"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveSystem}
              disabled={isLoading}
              className="glass-button w-full h-10 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Sistema
            </Button>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-katrix-pearl-bush mb-2">
                Gestión de Datos
              </h3>
              <p className="text-katrix-pearl-bush/60 text-sm">
                Exportar, importar y limpiar datos del sistema
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <Database className="h-6 w-6 text-green-400" />
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 space-y-4">
            <Button
              onClick={handleExportData}
              disabled={isLoading}
              className="glass-button w-full h-10 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </Button>

            <Button
              disabled={isLoading}
              className="glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-katrix-pearl-bush w-full h-10 rounded-xl font-semibold"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar Datos
            </Button>

            <Button
              onClick={handleClearCache}
              disabled={isLoading}
              className="glass-card hover:glass-card-hover text-katrix-pearl-bush/80 hover:text-yellow-400 w-full h-10 rounded-xl font-semibold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpiar Caché
            </Button>

            <Separator className="bg-katrix-pearl-bush/20" />

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-medium">Zona de Peligro</span>
              </div>
              <p className="text-red-400/80 text-sm mb-4">
                Esta acción eliminará permanentemente todos los datos del sistema.
              </p>
              <Button
                disabled={isLoading}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 w-full h-10 rounded-xl font-semibold"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Todos los Datos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}