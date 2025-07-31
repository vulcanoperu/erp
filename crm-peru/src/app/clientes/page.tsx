'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Client } from '@/types';
import { formatDocument } from '@/utils/validations';
import { Search, Plus, Eye, Edit, Trash2, Users, Building2 } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Mock data para demostración
const mockClients: Client[] = [
  {
    id: '1',
    type: 'persona',
    name: 'María González Pérez',
    documentType: 'DNI',
    documentNumber: '12345678',
    email: 'maria.gonzalez@email.com',
    phone: '+51 987654321',
    address: 'Av. Lima 123, Miraflores',
    district: 'Miraflores',
    province: 'Lima',
    department: 'Lima',
    createdAt: new Date('2024-01-10'),
    lastInteraction: new Date('2024-01-15'),
    totalPurchases: 15420.50,
    status: 'activo',
    notes: 'Cliente frecuente, prefiere pagos en efectivo'
  },
  {
    id: '2',
    type: 'empresa',
    name: 'Distribuidora Lima SAC',
    documentType: 'RUC',
    documentNumber: '20123456789',
    email: 'contacto@distribuidoralima.com',
    phone: '+51 01-4567890',
    address: 'Jr. Comercio 456, Lima',
    district: 'Lima',
    province: 'Lima',
    department: 'Lima',
    createdAt: new Date('2023-12-15'),
    lastInteraction: new Date('2024-01-14'),
    totalPurchases: 89750.25,
    status: 'activo'
  },
  {
    id: '3',
    type: 'persona',
    name: 'Carlos Mendoza Silva',
    documentType: 'DNI',
    documentNumber: '87654321',
    email: 'carlos.mendoza@email.com',
    phone: '+51 912345678',
    address: 'Av. Arequipa 789, San Isidro',
    district: 'San Isidro',
    province: 'Lima',
    department: 'Lima',
    createdAt: new Date('2024-01-05'),
    lastInteraction: new Date('2024-01-13'),
    totalPurchases: 3250.75,
    status: 'inactivo',
    notes: 'Último contacto hace más de 30 días'
  }
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'persona' | 'empresa'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'activo' | 'inactivo'>('all');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Clientes' }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.documentNumber.includes(searchTerm) ||
                         client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || client.type === filterType;
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Client['status']) => {
    return status === 'activo' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getTotalClients = () => clients.length;
  const getActiveClients = () => clients.filter(c => c.status === 'activo').length;
  const getPersonClients = () => clients.filter(c => c.type === 'persona').length;
  const getCompanyClients = () => clients.filter(c => c.type === 'empresa').length;

  return (
    <div className="min-h-screen">
      <Header 
        title="Clientes" 
        subtitle="Gestión de clientes y empresas"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="p-6">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalClients()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveClients()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Personas</p>
                <p className="text-2xl font-bold text-gray-900">{getPersonClients()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building2 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Empresas</p>
                <p className="text-2xl font-bold text-gray-900">{getCompanyClients()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controles y filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* Filtros */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'persona' | 'empresa')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="persona">Personas</option>
                <option value="empresa">Empresas</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'activo' | 'inactivo')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
              </select>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Cliente</span>
            </button>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Compras
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
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          client.type === 'persona' ? 'bg-blue-100' : 'bg-orange-100'
                        )}>
                          {client.type === 'persona' ? (
                            <Users className={clsx(
                              "w-5 h-5",
                              client.type === 'persona' ? 'text-blue-600' : 'text-orange-600'
                            )} />
                          ) : (
                            <Building2 className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.district}, {client.province}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        client.type === 'persona' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-orange-100 text-orange-800'
                      )}>
                        {client.type === 'persona' ? 'Persona' : 'Empresa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{client.documentType}</div>
                        <div className="text-gray-500">
                          {formatDocument(client.documentType, client.documentNumber)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{client.email}</div>
                        <div className="text-gray-500">{client.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-medium">S/ {client.totalPurchases.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</div>
                      {client.lastInteraction && (
                        <div className="text-xs text-gray-500">
                          Última: {format(client.lastInteraction, "dd/MM/yyyy", { locale: es })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(client.status)
                      )}>
                        {client.status === 'activo' ? 'Activo' : 'Inactivo'}
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
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                  ? 'No se encontraron clientes con los filtros aplicados.'
                  : 'Comienza agregando tu primer cliente.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}