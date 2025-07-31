import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM Perú - Sistema de Gestión para PYMEs',
  description: 'Sistema CRM moderno y completo diseñado específicamente para pequeñas y medianas empresas peruanas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main content */}
          <div className="flex-1 flex flex-col ml-0 lg:ml-80 transition-all duration-300">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
