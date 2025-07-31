'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  UserCheck,
  Settings,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    description: 'Panel principal'
  },
  {
    title: 'Clientes',
    icon: Users,
    href: '/clientes',
    description: 'Gestión de clientes'
  },
  {
    title: 'Proveedores',
    icon: UserCheck,
    href: '/proveedores',
    description: 'Gestión de proveedores'
  },
  {
    title: 'Ventas',
    icon: ShoppingCart,
    href: '/ventas',
    description: 'Registro de ventas'
  },
  {
    title: 'Productos',
    icon: Package,
    href: '/productos',
    description: 'Inventario y productos'
  },
  {
    title: 'Cobranzas',
    icon: DollarSign,
    href: '/cobranzas',
    description: 'Pagos y cobranzas'
  },
  {
    title: 'Agenda',
    icon: Calendar,
    href: '/agenda',
    description: 'Tareas y citas'
  },
  {
    title: 'Reportes',
    icon: TrendingUp,
    href: '/reportes',
    description: 'Informes y estadísticas'
  },
  {
    title: 'Configuración',
    icon: Settings,
    href: '/configuracion',
    description: 'Ajustes del sistema'
  }
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50",
          "flex flex-col shadow-lg lg:shadow-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-gray-900">CRM Perú</span>
            </motion.div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center rounded-lg transition-all duration-200",
                  "group relative",
                  isCollapsed ? "p-3 justify-center" : "p-3 space-x-3",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={clsx(
                  "flex-shrink-0 transition-colors",
                  isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700",
                  isCollapsed ? "w-6 h-6" : "w-5 h-5"
                )} />
                
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 min-w-0"
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  </motion.div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.title}
                    <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className={clsx(
            "flex items-center rounded-lg p-3 bg-gray-50",
            isCollapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="font-medium text-gray-900 truncate">Usuario</div>
                <div className="text-sm text-gray-500">Administrador</div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}