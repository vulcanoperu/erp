import React from "react";
import MainMenu from "../components/shared/MainMenu";
import SecondaryMenu from "../components/shared/SecondaryMenu";
import { FaShoppingCart, FaBoxes, FaUsers, FaTruck, FaChartBar } from "react-icons/fa";

const cards = [
  {
    icon: <FaShoppingCart size={36} className="text-blue-500" />,
    title: "Ventas",
    description: "Registra y gestiona tus ventas, consulta historial y administra comprobantes de manera eficiente.",
  },
  {
    icon: <FaBoxes size={36} className="text-green-500" />,
    title: "Inventario",
    description: "Monitorea el stock, controla entradas y salidas y recibe alertas de productos bajos en inventario.",
  },
  {
    icon: <FaUsers size={36} className="text-purple-500" />,
    title: "Clientes",
    description: "Administra la información de tus clientes y consulta su historial de compras y pagos.",
  },
  {
    icon: <FaTruck size={36} className="text-yellow-500" />,
    title: "Proveedores",
    description: "Gestiona tus proveedores, registra compras y haz seguimiento a tus órdenes de abastecimiento.",
  },
  {
    icon: <FaChartBar size={36} className="text-pink-500" />,
    title: "Reportes",
    description: "Genera reportes personalizados de ventas, compras e inventario para una mejor toma de decisiones.",
  },
];

export default function Inicio() {
  const handleLogout = () => {
    // Lógica de cerrar sesión
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <SecondaryMenu onLogout={handleLogout} />
      <MainMenu />
      <div className="flex justify-center mt-12">
        <div className="flex gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 w-56 mx-2 hover:shadow-lg transition"
            >
              {card.icon}
              <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
              <p className="text-gray-500 mt-2 text-sm text-center">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}