import React from "react";
import { FaShoppingCart, FaBoxes, FaUsers, FaTruck, FaChartBar } from "react-icons/fa";

const items = [
  { icon: <FaShoppingCart />, label: "Ventas" },
  { icon: <FaBoxes />, label: "Inventario" },
  { icon: <FaUsers />, label: "Clientes" },
  { icon: <FaTruck />, label: "Proveedores" },
  { icon: <FaChartBar />, label: "Reportes" },
];

export default function MainMenu() {
  return (
    <nav className="flex justify-center gap-8 py-4 bg-white shadow font-bold text-lg z-10">
      {items.map((item) => (
        <button key={item.label} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-50 transition text-blue-700">
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
}