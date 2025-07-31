export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vendedor' | 'asistente';
  company: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Client {
  id: string;
  type: 'persona' | 'empresa';
  name: string;
  documentType: 'DNI' | 'RUC';
  documentNumber: string;
  email?: string;
  phone?: string;
  address?: string;
  district?: string;
  province?: string;
  department?: string;
  createdAt: Date;
  lastInteraction?: Date;
  totalPurchases: number;
  status: 'activo' | 'inactivo';
  notes?: string;
}

export interface Provider {
  id: string;
  name: string;
  ruc: string;
  category: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  totalPurchases: number;
  status: 'activo' | 'inactivo';
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  category: string;
  unit: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Sale {
  id: string;
  clientId: string;
  clientName: string;
  documentType: 'boleta' | 'factura';
  documentNumber: string;
  date: Date;
  items: SaleItem[];
  subtotal: number;
  igv: number;
  total: number;
  status: 'pendiente' | 'pagado' | 'vencido';
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia' | 'credito';
  dueDate?: Date;
  userId: string;
  notes?: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  saleId: string;
  clientId: string;
  amount: number;
  date: Date;
  method: 'efectivo' | 'tarjeta' | 'transferencia';
  reference?: string;
  userId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'llamada' | 'reunion' | 'seguimiento' | 'otro';
  priority: 'baja' | 'media' | 'alta';
  status: 'pendiente' | 'completada' | 'cancelada';
  assignedTo: string;
  clientId?: string;
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
}

export interface DashboardMetrics {
  totalSales: number;
  salesGrowth: number;
  totalClients: number;
  newClients: number;
  pendingTasks: number;
  overduePayments: number;
  lowStockProducts: number;
  monthlyRevenue: number[];
  recentSales: Sale[];
  topProducts: { name: string; sales: number }[];
}