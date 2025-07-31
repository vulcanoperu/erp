'use client';

import { useState } from 'react';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Header({ title, subtitle, breadcrumbs }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'Pago vencido', message: 'Cliente ABC tiene un pago vencido', time: '5 min' },
    { id: 2, title: 'Stock bajo', message: 'Producto XYZ con stock bajo', time: '1 hora' },
    { id: 3, title: 'Nueva tarea', message: 'Tarea asignada para mañana', time: '2 horas' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title and Breadcrumbs */}
        <div className="flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex space-x-2 text-sm text-gray-500 mb-2">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <span className="hidden md:block font-medium">Usuario</span>
            </button>

            <AnimatePresence>
              {showProfile && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowProfile(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">U</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Usuario</div>
                          <div className="text-sm text-gray-500">usuario@empresa.com</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                        <User className="w-4 h-4" />
                        <span>Mi Perfil</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                        <Settings className="w-4 h-4" />
                        <span>Configuración</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 py-2">
                      <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left">
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}