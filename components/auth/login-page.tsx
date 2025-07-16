'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { authenticateUser } from '@/lib/mock-data';

export function LoginPage() {
  const [email, setEmail] = useState('admin@katrixsoft.com');
  const [password, setPassword] = useState('katrix2024');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = authenticateUser(email.trim(), password);
      if (user) {
        login(user);
      } else {
        setError('Email o contraseña incorrectos. Verifica las credenciales de prueba.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (userType: 'admin' | 'operator') => {
    if (userType === 'admin') {
      setEmail('admin@katrixsoft.com');
      setPassword('katrix2024');
    } else {
      setEmail('operador@katrixsoft.com');
      setPassword('katrix2024');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-katrix-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-katrix-blue-chill/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-katrix-surfie-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-katrix-cloud-burst/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center animate-fade-in">
          <div className="mx-auto h-24 w-24 glass-card rounded-3xl flex items-center justify-center mb-6 glow-hover animate-pulse-glow">
            <Shield className="h-12 w-12 text-katrix-blue-chill" />
          </div>
          <h1 className="text-4xl font-bold text-katrix-pearl-bush mb-3 text-shadow">
            Katrix Insights
          </h1>
          <p className="text-katrix-pearl-bush/80 text-lg">
            Plataforma de Gestión Empresarial
          </p>
        </div>

        {/* Login Panel */}
        <div className="glass-panel rounded-3xl p-8 animate-slide-in-left">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-katrix-pearl-bush mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-katrix-pearl-bush/70">
                Ingresa tus credenciales para acceder
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-katrix-pearl-bush font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@katrixsoft.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="glass-input pl-12 h-12 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-katrix-pearl-bush font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="glass-input pl-12 pr-12 h-12 rounded-xl border-0 text-katrix-pearl-bush placeholder:text-katrix-pearl-bush/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-katrix-pearl-bush/60 hover:text-katrix-pearl-bush h-8 w-8 p-0"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-3 text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="glass-button w-full h-12 rounded-xl font-semibold text-base hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-katrix-black-pearl"></div>
                    <span>Accediendo...</span>
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            <div className="text-center">
              <button className="text-katrix-pearl-bush/70 hover:text-katrix-blue-chill text-sm transition-colors duration-200">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h4 className="text-sm font-semibold text-katrix-pearl-bush mb-3 text-center">
            Credenciales de Prueba
          </h4>
          <div className="text-xs text-katrix-pearl-bush/80 space-y-2">
            <button 
              onClick={() => handleQuickLogin('admin')}
              className="w-full flex justify-between items-center p-2 rounded-lg bg-katrix-blue-chill/10 hover:bg-katrix-blue-chill/20 transition-colors duration-200 cursor-pointer"
            >
              <span className="font-medium">Admin:</span>
              <span className="font-mono">admin@katrixsoft.com</span>
            </button>
            <button 
              onClick={() => handleQuickLogin('operator')}
              className="w-full flex justify-between items-center p-2 rounded-lg bg-katrix-surfie-green/10 hover:bg-katrix-surfie-green/20 transition-colors duration-200 cursor-pointer"
            >
              <span className="font-medium">Operador:</span>
              <span className="font-mono">operador@katrixsoft.com</span>
            </button>
            <div className="text-center text-katrix-pearl-bush/60 mt-2">
              Contraseña: <span className="font-mono">katrix2024</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-katrix-pearl-bush/50 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          © 2024 Katrix Insights. Todos los derechos reservados.
          <div className="text-center text-katrix-pearl-bush/50 text-xs mt-2">
            Haz clic en las credenciales para autocompletar
          </div>
        </div>
      </div>
    </div>
  );
}