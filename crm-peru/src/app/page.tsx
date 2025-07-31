'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentSales from '@/components/dashboard/RecentSales';
import { 
  DollarSign, 
  Users, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  Package
} from 'lucide-react';
import { Sale, DashboardMetrics } from '@/types';
import { formatCurrency } from '@/utils/validations';

// Mock data para demostración
const mockMetrics: DashboardMetrics = {
  totalSales: 152400,
  salesGrowth: 12.5,
  totalClients: 248,
  newClients: 15,
  pendingTasks: 8,
  overduePayments: 3,
  lowStockProducts: 5,
  monthlyRevenue: [
    45000, 52000, 48000, 61000, 55000, 67000,
    72000, 69000, 75000, 82000, 78000, 85000
  ],
  recentSales: [],
  topProducts: []
};

const mockRecentSales: Sale[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'María González',
    documentType: 'boleta',
    documentNumber: 'B001-00001',
    date: new Date('2024-01-15'),
    items: [],
    subtotal: 850,
    igv: 153,
    total: 1003,
    status: 'pagado',
    paymentMethod: 'efectivo',
    userId: 'user1'
  },
  {
    id: '2',
    clientId: 'client2',
    clientName: 'Distribuidora Lima SAC',
    documentType: 'factura',
    documentNumber: 'F001-00001',
    date: new Date('2024-01-14'),
    items: [],
    subtotal: 2540,
    igv: 457.2,
    total: 2997.2,
    status: 'pendiente',
    paymentMethod: 'credito',
    userId: 'user1'
  },
  {
    id: '3',
    clientId: 'client3',
    clientName: 'Carlos Mendoza',
    documentType: 'boleta',
    documentNumber: 'B001-00002',
    date: new Date('2024-01-13'),
    items: [],
    subtotal: 320,
    igv: 57.6,
    total: 377.6,
    status: 'vencido',
    paymentMethod: 'credito',
    userId: 'user1'
  }
];

const mockRevenueData = mockMetrics.monthlyRevenue.map((revenue, index) => ({
  month: `Mes ${index + 1}`,
  revenue
}));

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockMetrics);
  const [recentSales, setRecentSales] = useState<Sale[]>(mockRecentSales);

  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle="Panel principal de tu negocio"
      />
      
      <div className="p-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Ventas Totales"
            value={formatCurrency(metrics.totalSales)}
            change={metrics.salesGrowth}
            changeType="increase"
            icon={DollarSign}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            subtitle="Este mes"
          />
          
          <MetricCard
            title="Clientes"
            value={metrics.totalClients}
            change={metrics.newClients}
            changeType="increase"
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            subtitle={`+${metrics.newClients} nuevos`}
          />
          
          <MetricCard
            title="Tareas Pendientes"
            value={metrics.pendingTasks}
            icon={Calendar}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
            subtitle="Para hoy"
          />
          
          <MetricCard
            title="Alertas"
            value={metrics.overduePayments + metrics.lowStockProducts}
            icon={AlertCircle}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
            subtitle="Requieren atención"
          />
        </div>

        {/* Gráficos y tablas */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <RevenueChart data={mockRevenueData} />
          </div>
          
          <div className="space-y-6">
            {/* Alertas rápidas */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Pagos Vencidos</p>
                    <p className="text-xs text-red-700">{metrics.overduePayments} clientes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Package className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900">Stock Bajo</p>
                    <p className="text-xs text-yellow-700">{metrics.lowStockProducts} productos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Crecimiento</p>
                    <p className="text-xs text-blue-700">+{metrics.salesGrowth}% este mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ventas recientes */}
        <RecentSales sales={recentSales} />
      </div>
    </div>
  );
}
