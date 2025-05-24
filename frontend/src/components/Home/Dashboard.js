import React from "react";
import { PiShoppingBagLight, PiCubeLight, PiUserLight, PiTruckLight, PiChartBarLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    icon: <PiShoppingBagLight size={38} className="text-slate-500" />,
    title: "Ventas",
    description: "Gestiona tus ventas y comprobantes.",
    route: "/sales",
  },
  {
    icon: <PiCubeLight size={38} className="text-slate-500" />,
    title: "Inventario",
    description: "Controla tu stock y movimientos.",
    route: "/inventory",
  },
  {
    icon: <PiUserLight size={38} className="text-slate-500" />,
    title: "Clientes",
    description: "Administra tus clientes y sus compras.",
    route: "/clients",
  },
  {
    icon: <PiTruckLight size={38} className="text-slate-500" />,
    title: "Proveedores",
    description: "Gestiona proveedores y compras.",
    route: "/suppliers",
  },
  {
    icon: <PiChartBarLight size={38} className="text-slate-500" />,
    title: "Reportes",
    description: "Visualiza reportes y estadísticas.",
    route: "/reports",
  }
  // Se ha eliminado la tarjeta de "Configuración"
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex flex-wrap gap-7 justify-center">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.route)}
            className="flex flex-col items-center bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-52 mx-2 hover:bg-gray-100 hover:border-gray-400 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 group"
            style={{ transition: "all 0.15s" }}
          >
            <span className="mb-2 group-hover:scale-110 transition">{card.icon}</span>
            <span className="mt-1 text-lg font-medium text-gray-800 group-hover:text-gray-900">{card.title}</span>
            <span className="text-sm text-gray-500 mt-2 text-center">{card.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}