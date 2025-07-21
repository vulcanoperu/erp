import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-blue-500 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Navigation buttons */}
          <div className="flex space-x-4">
            <button className="bg-black/20 text-white px-4 py-2 rounded-full text-sm hover:bg-black/30 transition-colors">
              📋 Más similares
            </button>
            <button className="bg-black/20 text-white px-4 py-2 rounded-full text-sm hover:bg-black/30 transition-colors">
              💾 Guardar
            </button>
            <button className="bg-black/20 text-white px-4 py-2 rounded-full text-sm hover:bg-black/30 transition-colors">
              🔗 Enlace permanente
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-8">
            <div className="bg-green-500 rounded-full px-6 py-4 shadow-lg">
              <h1 className="text-white font-bold text-xl">
                Calculadora<br />
                <span className="text-2xl">Respira</span>
              </h1>
              <p className="text-white text-xs mt-1">Descubre tu huella de carbono</p>
            </div>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex justify-around items-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                🏠
              </div>
              <span className="text-sm">Vivienda</span>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                ✈️
              </div>
              <span className="text-sm">Vacaciones</span>
            </div>
            <div className="w-32"></div> {/* Logo space */}
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                🚗
              </div>
              <span className="text-sm">Transporte</span>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                🗑️
              </div>
              <span className="text-sm">Residuos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - 3D Illustration */}
          <div className="relative">
            <div className="w-full max-w-lg mx-auto relative">
              {/* Planet base */}
              <div className="w-80 h-80 rounded-full planet-3d relative shadow-2xl overflow-hidden">
                {/* Grass texture overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300/30 to-green-700/30"></div>
                
                {/* House */}
                <div className="absolute top-16 left-20 transform -rotate-12 z-10">
                  <div className="w-12 h-8 bg-red-500 rounded-t-lg shadow-md relative">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-red-400 rounded"></div>
                  </div>
                  <div className="w-12 h-10 bg-yellow-100 border-2 border-gray-300 shadow-md relative">
                    <div className="w-3 h-3 bg-blue-400 m-1 border border-blue-600"></div>
                    <div className="w-2 h-4 bg-red-800 mx-auto mt-1"></div>
                  </div>
                </div>

                {/* Trees */}
                <div className="absolute top-12 right-16 z-10">
                  <div className="w-3 h-6 bg-amber-700 shadow-sm"></div>
                  <div className="w-8 h-8 bg-green-600 rounded-full -mt-2 shadow-md"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-full -mt-1 ml-1 shadow-sm"></div>
                </div>
                
                <div className="absolute bottom-20 left-12 z-10">
                  <div className="w-2 h-4 bg-amber-700 shadow-sm"></div>
                  <div className="w-6 h-6 bg-green-600 rounded-full -mt-1 shadow-md"></div>
                </div>

                <div className="absolute top-1/3 left-1/3 z-10">
                  <div className="w-2 h-3 bg-amber-700 shadow-sm"></div>
                  <div className="w-4 h-4 bg-green-600 rounded-full -mt-1 shadow-md"></div>
                </div>

                {/* White stones/rocks scattered */}
                <div className="absolute bottom-16 right-20 z-10">
                  <div className="w-4 h-3 bg-gray-100 rounded-full shadow-md"></div>
                  <div className="w-3 h-2 bg-gray-200 rounded-full ml-2 shadow-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-full -ml-1 shadow-sm"></div>
                </div>

                <div className="absolute top-1/2 left-8 z-10">
                  <div className="w-3 h-2 bg-gray-100 rounded-full shadow-md"></div>
                  <div className="w-2 h-1 bg-white rounded-full ml-1 shadow-sm"></div>
                </div>

                {/* Additional scattered elements */}
                <div className="absolute bottom-1/3 right-1/3 z-10">
                  <div className="w-2 h-2 bg-gray-200 rounded-full shadow-sm"></div>
                </div>

                {/* Smoke/pollution cloud */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 animate-drift">
                  <div className="w-24 h-16 bg-gradient-to-r from-gray-400/80 to-gray-600/80 rounded-full blur-sm"></div>
                  <div className="w-20 h-12 bg-gradient-to-r from-gray-300/70 to-gray-500/70 rounded-full blur-sm -mt-4 ml-4"></div>
                  <div className="w-16 h-10 bg-gradient-to-r from-gray-200/60 to-gray-400/60 rounded-full blur-sm -mt-3 ml-6"></div>
                </div>
              </div>

              {/* Floating leaves with better shapes */}
              <div className="absolute -top-8 -right-4 w-8 h-12 bg-green-500 leaf-shape transform rotate-45 shadow-lg animate-float z-20"></div>
              <div className="absolute top-1/4 -left-8 w-6 h-10 bg-green-400 leaf-shape transform -rotate-12 shadow-lg animate-float-delayed z-20"></div>
              <div className="absolute bottom-1/4 -right-12 w-10 h-16 bg-green-600 leaf-shape transform rotate-12 shadow-lg animate-float z-20"></div>
              <div className="absolute top-1/6 right-1/4 w-5 h-8 bg-green-500 leaf-shape transform rotate-75 shadow-lg animate-float-delayed z-20"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Respira tranquilo<br />
              y descubre tu huella
            </h2>
            
            <p className="text-lg mb-8 leading-relaxed opacity-90">
              La huella de carbono representa una medida la cual hace posible identificar la cantidad 
              de emisiones de gases de efecto invernadero (medidas en CO2) de una empresa o de un 
              producto/servicio. Este análisis abarca todas las etapas de su ciclo de vida, es decir, 
              desde la adquisición de las materias primas hasta su gestión como residuo.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg">
              Iniciar
            </button>
          </div>
        </div>
      </main>

      {/* Social Media Icons */}
      <div className="absolute bottom-8 right-8 flex space-x-3">
        <span className="text-white text-sm mr-2">Compartir en:</span>
        <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
          <FaFacebookF className="text-white text-sm" />
        </a>
        <a href="#" className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500 transition-colors">
          <FaTwitter className="text-white text-sm" />
        </a>
        <a href="#" className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors">
          <FaGooglePlusG className="text-white text-sm" />
        </a>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default LandingPage;