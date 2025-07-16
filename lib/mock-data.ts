export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMINISTRATOR' | 'OPERATOR';
  avatar?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface Service {
  id: string;
  nic: string;
  sucursal: string;
  tipo_servicio: 'ENEL' | 'ESSALUD' | 'OSINERGMIN' | 'SUNASS';
  estado: 'ACTIVO' | 'INACTIVO' | 'ERROR';
  ultima_consulta: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  service_id: string;
  nic: string;
  sucursal: string;
  tipo_servicio: string;
  numero_factura: string;
  monto: number;
  fecha_vencimiento: string;
  estado_pago: 'PENDIENTE' | 'PAGADO' | 'VENCIDO';
  fecha_emision: string;
  created_at: string;
}

export interface DashboardStats {
  servicios_activos: number;
  deudas_vencidas: number;
  proximos_vencimientos: number;
  errores_consulta: number;
  total_servicios: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@katrixsoft.com',
    name: 'Carlos Administrador',
    role: 'ADMINISTRATOR',
    status: 'ACTIVE',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    email: 'operador@katrixsoft.com',
    name: 'María Operadora',
    role: 'OPERATOR',
    status: 'ACTIVE',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    email: 'juan.perez@katrixsoft.com',
    name: 'Juan Pérez',
    role: 'OPERATOR',
    status: 'INACTIVE',
  }
];

// Mock Services
export const mockServices: Service[] = [
  {
    id: '1',
    nic: '1013048',
    sucursal: 'SUC001',
    tipo_servicio: 'ENEL',
    estado: 'ACTIVO',
    ultima_consulta: '2024-01-15T10:30:00Z',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    nic: '2024567',
    sucursal: 'SUC002',
    tipo_servicio: 'ESSALUD',
    estado: 'ACTIVO',
    ultima_consulta: '2024-01-15T09:15:00Z',
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    nic: '3045678',
    sucursal: 'SUC001',
    tipo_servicio: 'OSINERGMIN',
    estado: 'ERROR',
    ultima_consulta: '2024-01-14T16:45:00Z',
    created_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    nic: '4056789',
    sucursal: 'SUC003',
    tipo_servicio: 'SUNASS',
    estado: 'ACTIVO',
    ultima_consulta: '2024-01-15T08:20:00Z',
    created_at: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    nic: '5067890',
    sucursal: 'SUC002',
    tipo_servicio: 'ENEL',
    estado: 'INACTIVO',
    ultima_consulta: '2024-01-12T14:30:00Z',
    created_at: '2024-01-05T00:00:00Z'
  }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    service_id: '1',
    nic: '1013048',
    sucursal: 'SUC001',
    tipo_servicio: 'ENEL',
    numero_factura: 'ENL-2024-001',
    monto: 145.50,
    fecha_vencimiento: '2024-01-25',
    estado_pago: 'VENCIDO',
    fecha_emision: '2024-01-05',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    service_id: '2',
    nic: '2024567',
    sucursal: 'SUC002',
    tipo_servicio: 'ESSALUD',
    numero_factura: 'ESS-2024-002',
    monto: 320.00,
    fecha_vencimiento: '2024-01-30',
    estado_pago: 'PENDIENTE',
    fecha_emision: '2024-01-10',
    created_at: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    service_id: '4',
    nic: '4056789',
    sucursal: 'SUC003',
    tipo_servicio: 'SUNASS',
    numero_factura: 'SUN-2024-003',
    monto: 89.75,
    fecha_vencimiento: '2024-02-05',
    estado_pago: 'PENDIENTE',
    fecha_emision: '2024-01-12',
    created_at: '2024-01-15T08:20:00Z'
  },
  {
    id: '4',
    service_id: '1',
    nic: '1013048',
    sucursal: 'SUC001',
    tipo_servicio: 'ENEL',
    numero_factura: 'ENL-2024-004',
    monto: 167.30,
    fecha_vencimiento: '2024-01-18',
    estado_pago: 'VENCIDO',
    fecha_emision: '2024-01-01',
    created_at: '2024-01-14T16:45:00Z'
  },
  {
    id: '5',
    service_id: '2',
    nic: '2024567',
    sucursal: 'SUC002',
    tipo_servicio: 'ESSALUD',
    numero_factura: 'ESS-2024-005',
    monto: 245.80,
    fecha_vencimiento: '2024-01-20',
    estado_pago: 'PAGADO',
    fecha_emision: '2024-01-08',
    created_at: '2024-01-13T11:25:00Z'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  servicios_activos: 4,
  deudas_vencidas: 2,
  proximos_vencimientos: 3,
  errores_consulta: 1,
  total_servicios: 5
};

// Helper functions
export function getServicesByFilters(filters: {
  nic?: string;
  sucursal?: string;
  tipo_servicio?: string;
  estado?: string;
}): Service[] {
  return mockServices.filter(service => {
    if (filters.nic && !service.nic.includes(filters.nic)) return false;
    if (filters.sucursal && !service.sucursal.includes(filters.sucursal)) return false;
    if (filters.tipo_servicio && service.tipo_servicio !== filters.tipo_servicio) return false;
    if (filters.estado && service.estado !== filters.estado) return false;
    return true;
  });
}

export function getInvoicesByServiceId(serviceId: string): Invoice[] {
  return mockInvoices.filter(invoice => invoice.service_id === serviceId);
}

export function getRecentActivity(): Invoice[] {
  return mockInvoices
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
}

export function authenticateUser(email: string, password: string): User | null {
  // Normalizar email para comparación
  const normalizedEmail = email.toLowerCase().trim();
  
  const user = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  
  // Verificar credenciales
  if (user && password === 'katrix2024') {
    return user;
  }
  
  // Log para debugging (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('Login attempt:', { email: normalizedEmail, password, found: !!user });
  }
  
  return null;
}