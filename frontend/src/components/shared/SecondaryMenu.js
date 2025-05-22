import React from "react";
import { FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function SecondaryMenu({ onLogout }) {
  return (
    <nav className="absolute right-4 top-4 flex gap-4 items-center z-20">
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
        <FaHome /> Inicio
      </button>
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
        <FaCog /> Configuración
      </button>
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
        onClick={onLogout}
      >
        <FaSignOutAlt /> Cerrar sesión
      </button>
    </nav>
  );
}