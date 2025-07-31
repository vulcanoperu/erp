'use client';

import { Sale } from '@/types';
import { formatCurrency } from '@/utils/validations';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Eye, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface RecentSalesProps {
  sales: Sale[];
}

export default function RecentSales({ sales }: RecentSalesProps) {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ventas Recientes</h3>
          <p className="text-sm text-gray-600">Últimas transacciones registradas</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Ver todas
        </button>
      </div>

      <div className="space-y-4">
        {sales.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay ventas recientes</p>
          </div>
        ) : (
          sales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {sale.documentType === 'factura' ? 'F' : 'B'}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900 truncate">
                      {sale.clientName}
                    </p>
                    <span className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getStatusColor(sale.status)
                    )}>
                      {getStatusText(sale.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {sale.documentType.charAt(0).toUpperCase() + sale.documentType.slice(1)} {sale.documentNumber}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(sale.date), "dd 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(sale.total)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {sale.paymentMethod}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}