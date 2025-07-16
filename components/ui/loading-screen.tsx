import React from 'react';
import { Shield } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Cargando...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-katrix-mesh flex items-center justify-center">
      <div className="glass-panel rounded-3xl p-8 text-center animate-fade-in">
        <div className="mx-auto h-16 w-16 glass-card rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow">
          <Shield className="h-8 w-8 text-katrix-blue-chill" />
        </div>
        
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-katrix-blue-chill mx-auto"></div>
          <p className="text-katrix-pearl-bush text-lg font-medium">{message}</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-katrix-blue-chill rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-katrix-blue-chill rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-katrix-blue-chill rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}