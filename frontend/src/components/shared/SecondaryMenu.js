import React from "react";
import { useNavigate } from "react-router-dom";

export default function SecondaryMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // O el key que uses para la sesión
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 flex justify-end items-center px-8 py-2 text-sm z-20 border-b border-gray-800">
      <button
        className="text-gray-200 hover:text-white transition mx-2 bg-transparent border-none"
        onClick={() => navigate("/home")}
      >
        Inicio
      </button>
      <button
        className="text-gray-200 hover:text-white transition mx-2 bg-transparent border-none"
        onClick={() => navigate("/config")}
      >
        Configuración
      </button>
      <button
        className="text-gray-200 hover:text-red-400 transition mx-2 bg-transparent border-none"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}