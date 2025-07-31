'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Sale } from '@/types';
import { formatCurrency } from '@/utils/validations';
import { Search, Plus, FileText, Receipt, Eye, Edit, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock data para demostración
const mockSales: Sale[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'María González',
    documentType: 'boleta',
    documentNumber: 'B001-00001',
    date: new Date('2024-01-15'),
    items: [
      { productId: '1', productName: 'Tornillos Phillips 3/4"', quantity: 20, unitPrice: 0.80, total: 16.00 },
      { productId: '2', productName: 'Cemento Portland', quantity: 2, unitPrice: 35.00, total: 70.00 }
    ],
    subtotal: 86.00,
    igv: 15.48,
    total: 101.48,
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
    items: [
      { productId: '3', productName: 'Tubería PVC 4"', quantity: 10, unitPrice: 22.00, total: 220.00 },
      { productId: '4', productName: 'Pintura Látex Blanca', quantity: 5, unitPrice: 65.00, total: 325.00 }
    ],
    subtotal: 545.00,
    igv: 98.10,
    total: 643.10,
    status: 'pendiente',
    paymentMethod: 'credito',
    dueDate: new Date('2024-02-14'),
    userId: 'user1'
  },
  {
    id: '3',
    clientId: 'client3',
    clientName: 'Carlos Mendoza',
    documentType: 'boleta',
    documentNumber: 'B001-00002',
    date: new Date('2024-01-13'),
    items: [
      { productId: '5', productName: 'Cable THW 12 AWG', quantity: 50, unitPrice: 4.20, total: 210.00 }
    ],
    subtotal: 210.00,
    igv: 37.80,
    total: 247.80,
    status: 'vencido',
    paymentMethod: 'credito',
    dueDate: new Date('2024-01-13'),
    userId: 'user1'
  },
  {
    id: '4',
    clientId: 'client1',
    clientName: 'María González',
    documentType: 'factura',
    documentNumber: 'F001-00002',
    date: new Date('2024-01-12'),
    items: [
      { productId: '1', productName: 'Tornillos Phillips 3/4"', quantity: 100, unitPrice: 0.80, total: 80.00 },
      { productId: '2', productName: 'Cemento Portland', quantity: 5, unitPrice: 35.00, total: 175.00 }
    ],
    subtotal: 255.00,
    igv: 45.90,
    total: 300.90,
    status: 'pagado',
    paymentMethod: 'tarjeta',
    userId: 'user1'
  }
];

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDocumentType, setFilterDocumentType] = useState<'all' | 'boleta' | 'factura'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pagado' | 'pendiente' | 'vencido'>('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<'all' | 'efectivo' | 'tarjeta' | 'transferencia' | 'credito'>('all');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Ventas' }
  ];

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.documentNumber.includes(searchTerm);
    
    const matchesDocumentType = filterDocumentType === 'all' || sale.documentType === filterDocumentType;
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;
    const matchesPaymentMethod = filterPaymentMethod === 'all' || sale.paymentMethod === filterPaymentMethod;
    
    return matchesSearch && matchesDocumentType && matchesStatus && matchesPaymentMethod;
  });

  const getStatusColor = (status: Sale['status']) => {
    switch (status) {
      case 'pagado':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Sale['status']) => {
    switch (status) {
      case 'pagado':
        return 'Pagado';
      case 'pendiente':
        return 'Pendiente';
      case 'vencido':
        return 'Vencido';
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: Sale['paymentMethod']) => {
    switch (method) {
      case 'efectivo':
        return 'Efectivo';
      case 'tarjeta':
        return 'Tarjeta';
      case 'transferencia':
        return 'Transferencia';
      case 'credito':
        return 'Crédito';
      default:
        return method;
    }
  };

  const getTotalSales = () => sales.length;
  const getTotalAmount = () => sales.reduce((total, sale) => total + sale.total, 0);
  const getBoletas = () => sales.filter(s => s.documentType === 'boleta').length;
  const getFacturas = () => sales.filter(s => s.documentType === 'factura').length;
  const getPendingSales = () => sales.filter(s => s.status === 'pendiente').length;
  const getOverdueSales = () => sales.filter(s => s.status === 'vencido').length;

  return (
    <div className="min-h-screen">
      <Header 
        title="Ventas" 
        subtitle="Gestión de ventas, boletas y facturas"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="p-6">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Ventas</p>
                <p className="text-xl font-bold text-gray-900">{getTotalSales()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Monto Total</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(getTotalAmount())}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Receipt className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Boletas</p>
                <p className="text-xl font-bold text-gray-900">{getBoletas()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Facturas</p>
                <p className="text-xl font-bold text-gray-900">{getFacturas()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-xl font-bold text-gray-900">{getPendingSales()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Vencidas</p>
                <p className="text-xl font-bold text-gray-900">{getOverdueSales()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controles y filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar ventas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full xl:w-64"
                />
              </div>
              
              {/* Filtros */}
              <select
                value={filterDocumentType}
                onChange={(e) => setFilterDocumentType(e.target.value as 'all' | 'boleta' | 'factura')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los documentos</option>
                <option value="boleta">Boletas</option>
                <option value="factura">Facturas</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pagado' | 'pendiente' | 'vencido')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pagado">Pagado</option>
                <option value="pendiente">Pendiente</option>
                <option value="vencido">Vencido</option>
              </select>
              
              <select
                value={filterPaymentMethod}
                onChange={(e) => setFilterPaymentMethod(e.target.value as 'all' | 'efectivo' | 'tarjeta' | 'transferencia' | 'credito')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los métodos</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
                <option value="credito">Crédito</option>
              </select>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nueva Venta</span>
            </button>
          </div>
        </div>

        {/* Tabla de ventas */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={clsx(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          sale.documentType === 'factura' ? 'bg-orange-100' : 'bg-purple-100'
                        )}>
                          {sale.documentType === 'factura' ? (
                            <FileText className="w-5 h-5 text-orange-600" />
                          ) : (
                            <Receipt className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {sale.documentNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {sale.documentType === 'factura' ? 'Factura' : 'Boleta'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.clientName}</div>
                      <div className="text-sm text-gray-500">{sale.items.length} producto(s)</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(sale.date, "dd/MM/yyyy", { locale: es })}
                      </div>
                      {sale.dueDate && (
                        <div className={clsx(
                          "text-xs",
                          sale.status === 'vencido' ? 'text-red-600' : 'text-gray-500'
                        )}>
                          Vence: {format(sale.dueDate, "dd/MM/yyyy", { locale: es })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(sale.total)}
                      </div>
                      <div className="text-xs text-gray-500">
                        IGV: {formatCurrency(sale.igv)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getPaymentMethodText(sale.paymentMethod)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(sale.status)
                      )}>
                        {getStatusText(sale.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSales.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay ventas</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterDocumentType !== 'all' || filterStatus !== 'all' || filterPaymentMethod !== 'all'
                  ? 'No se encontraron ventas con los filtros aplicados.'
                  : 'Comienza registrando tu primera venta.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}