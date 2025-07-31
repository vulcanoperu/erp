# CRM Perú - Sistema de Gestión para PYMEs

Un sistema CRM moderno, completo y específicamente diseñado para pequeñas y medianas empresas peruanas.

![CRM Perú](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan.svg)

## 🚀 Características Principales

### 📊 Dashboard Inteligente
- Métricas clave en tiempo real
- Gráficos de ingresos mensuales
- Alertas automáticas (pagos vencidos, stock bajo)
- Resumen de ventas recientes

### 👥 Gestión de Clientes
- Registro de personas naturales y empresas
- Validación de DNI y RUC peruanos
- Historial completo de interacciones
- Direcciones con ubigeo nacional

### 📦 Control de Inventario
- Gestión completa de productos y servicios
- Control de stock con alertas automáticas
- Categorización por rubros
- Precios de compra y venta con márgenes

### 💰 Módulo de Ventas
- Emisión de boletas y facturas
- Preparado para integración con SUNAT
- Múltiples métodos de pago
- Control de vencimientos y cobranzas

### 📋 Otras Funcionalidades
- Sistema de proveedores
- Agenda y gestión de tareas
- Módulo de cobranzas y pagos
- Control de usuarios y roles

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Gráficos**: Recharts
- **Formularios**: React Hook Form + Zod
- **Fechas**: date-fns

## 📋 Requisitos del Sistema

- Node.js 18.17 o superior
- npm 9.0 o superior
- Cuenta de Firebase (para base de datos)

## ⚡ Instalación Rápida

1. **Clonar el repositorio**
   ```bash
   git clone <url-repositorio>
   cd crm-peru
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   ```bash
   # Crear proyecto en Firebase Console
   # Habilitar Firestore y Authentication
   # Copiar configuración al archivo .env.local
   ```

4. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   # Editar con tus credenciales de Firebase
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

6. **Acceder a la aplicación**
   ```
   http://localhost:3000
   ```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### Configuración de Firebase

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Firestore Database
3. Habilitar Authentication (Email/Password)
4. Configurar reglas de seguridad según tus necesidades

## 📱 Características Específicas para Perú

### Validaciones Locales
- ✅ Validación de DNI con algoritmo oficial
- ✅ Validación de RUC empresarial
- ✅ Formato de documentos peruanos
- ✅ Departamentos y provincias del Perú

### Moneda y Formato
- 💰 Soles peruanos (PEN) como moneda principal
- 📊 Formato de números según estándares locales
- 📅 Fechas en español

### Facturación Electrónica
- 🧾 Estructura preparada para integración SUNAT
- 📋 Formatos de boletas y facturas estándar
- 🔢 Numeración correlativa de documentos

## 🏗️ Arquitectura del Proyecto

```
crm-peru/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── clientes/          # Módulo de clientes
│   │   ├── productos/         # Gestión de inventario
│   │   ├── ventas/           # Módulo de ventas
│   │   └── layout.tsx        # Layout principal
│   ├── components/
│   │   ├── layout/           # Componentes de layout
│   │   └── dashboard/        # Componentes del dashboard
│   ├── lib/
│   │   └── firebase.ts       # Configuración Firebase
│   ├── types/
│   │   └── index.ts          # Definiciones TypeScript
│   └── utils/
│       └── validations.ts    # Utilidades y validaciones
├── public/                   # Archivos estáticos
└── README.md
```

## 🔐 Seguridad

- ✅ Autenticación con Firebase Auth
- ✅ Validación de formularios con Zod
- ✅ Sanitización de datos de entrada
- ✅ Control de acceso por roles
- ✅ Reglas de seguridad en Firestore

## 📊 Módulos del Sistema

### 1. Dashboard
- Métricas de ventas y clientes
- Gráficos de rendimiento
- Alertas importantes
- Accesos rápidos

### 2. Clientes
- Registro de personas y empresas
- Validación de documentos peruanos
- Historial de compras
- Información de contacto completa

### 3. Productos
- Catálogo de productos/servicios
- Control de stock e inventario
- Precios y márgenes
- Categorización por rubros

### 4. Ventas
- Emisión de boletas y facturas
- Registro de transacciones
- Control de pagos y vencimientos
- Múltiples métodos de pago

### 5. Proveedores
- Registro de proveedores
- Categorización por rubro
- Historial de compras

### 6. Cobranzas
- Seguimiento de pagos
- Reportes de morosidad
- Estados de cuenta

### 7. Agenda
- Calendario de actividades
- Gestión de tareas
- Recordatorios automáticos

## 🚀 Próximas Funcionalidades

- [ ] Integración completa con SUNAT
- [ ] Aplicación móvil (React Native)
- [ ] Reportes avanzados en PDF/Excel
- [ ] Notificaciones push
- [ ] Modo offline (PWA)
- [ ] API REST para integraciones
- [ ] Dashboard de analíticas avanzadas

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu funcionalidad
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📞 Soporte

Si necesitas ayuda o tienes preguntas:

- 📧 Email: soporte@crmperu.com
- 🐛 Issues: [GitHub Issues](issues)
- 📖 Documentación: [Wiki del proyecto](wiki)

## ⭐ Reconocimientos

Desarrollado específicamente para el mercado peruano, considerando las necesidades particulares de las PYMEs locales.

---

**¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!**
