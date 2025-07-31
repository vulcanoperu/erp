'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/validations';
import { Search, Plus, Package, AlertTriangle, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { clsx } from 'clsx';

// Mock data para demostración
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tornillos Phillips 3/4"',
    description: 'Tornillos Phillips de acero inoxidable 3/4 pulgadas',
    sku: 'TOR-PH-075',
    category: 'Ferretería',
    unit: 'unidad',
    buyPrice: 0.50,
    sellPrice: 0.80,
    stock: 150,
    minStock: 20,
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Cemento Portland Tipo I',
    description: 'Cemento Portland Tipo I - Bolsa 42.5kg',
    sku: 'CEM-PT1-425',
    category: 'Construcción',
    unit: 'bolsa',
    buyPrice: 28.50,
    sellPrice: 35.00,
    stock: 8,
    minStock: 10,
    isActive: true,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Tubería PVC 4"',
    description: 'Tubería PVC para desagüe 4 pulgadas x 3 metros',
    sku: 'TUB-PVC-4',
    category: 'Plomería',
    unit: 'metro',
    buyPrice: 15.20,
    sellPrice: 22.00,
    stock: 25,
    minStock: 5,
    isActive: true,
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Pintura Látex Blanca',
    description: 'Pintura látex para interiores color blanco - Galón',
    sku: 'PIN-LAT-BLA',
    category: 'Pinturas',
    unit: 'galón',
    buyPrice: 45.00,
    sellPrice: 65.00,
    stock: 2,
    minStock: 5,
    isActive: true,
    createdAt: new Date('2024-01-04')
  },
  {
    id: '5',
    name: 'Cable THW 12 AWG',
    description: 'Cable eléctrico THW calibre 12 AWG - Metro',
    sku: 'CAB-THW-12',
    category: 'Eléctricos',
    unit: 'metro',
    buyPrice: 2.80,
    sellPrice: 4.20,
    stock: 0,
    minStock: 50,
    isActive: false,
    createdAt: new Date('2024-01-05')
  }
];

const categories = ['Todas', 'Ferretería', 'Construcción', 'Plomería', 'Pinturas', 'Eléctricos'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'lowStock'>('all');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Productos' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = product.isActive;
    if (filterStatus === 'inactive') matchesStatus = !product.isActive;
    if (filterStatus === 'lowStock') matchesStatus = product.stock <= product.minStock;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getTotalProducts = () => products.length;
  const getActiveProducts = () => products.filter(p => p.isActive).length;
  const getLowStockProducts = () => products.filter(p => p.stock <= p.minStock).length;
  const getOutOfStockProducts = () => products.filter(p => p.stock === 0).length;
  const getTotalValue = () => products.reduce((total, p) => total + (p.stock * p.buyPrice), 0);

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { status: 'out', label: 'Agotado', color: 'bg-red-100 text-red-800' };
    if (product.stock <= product.minStock) return { status: 'low', label: 'Stock Bajo', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'ok', label: 'Disponible', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Productos" 
        subtitle="Gestión de inventario y productos"
        breadcrumbs={breadcrumbs}
      />
      
      <div className="p-6">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalProducts()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveProducts()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
                <p className="text-2xl font-bold text-gray-900">{getLowStockProducts()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Agotados</p>
                <p className="text-2xl font-bold text-gray-900">{getOutOfStockProducts()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(getTotalValue())}</p>
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
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* Filtros */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'lowStock')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="lowStock">Stock Bajo</option>
              </select>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precios
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
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{product.sku}</div>
                        <div className="text-sm text-gray-500">{product.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.stock} {product.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Mín: {product.minStock}
                        </div>
                        <span className={clsx(
                          "inline-block px-2 py-1 rounded-full text-xs font-medium mt-1",
                          stockStatus.color
                        )}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">Venta: {formatCurrency(product.sellPrice)}</div>
                          <div className="text-gray-500">Compra: {formatCurrency(product.buyPrice)}</div>
                          <div className="text-xs text-green-600">
                            Margen: {(((product.sellPrice - product.buyPrice) / product.buyPrice) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        )}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
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
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'Todas' || filterStatus !== 'all'
                  ? 'No se encontraron productos con los filtros aplicados.'
                  : 'Comienza agregando tu primer producto.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}