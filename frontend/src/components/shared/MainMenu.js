import React from "react";

const items = [
  { label: "Ventas", route: "/sales" },
  { label: "Inventario", route: "/inventory" },
  { label: "Clientes", route: "/clients" },
  { label: "Proveedores", route: "/suppliers" },
  { label: "Reportes", route: "/reports" },
  // { label: "Configuración", route: "/config" }, // NO incluir configuración aquí
];

export default function MainMenu() {
  return (
    <nav className="bg-gray-800 shadow font-semibold text-base z-10 border-b border-gray-700">
      <div className="flex justify-center gap-8 py-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.route}
            className="px-3 py-1 rounded transition hover:bg-gray-700 hover:text-white text-gray-100"
            style={{ letterSpacing: "0.03em" }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}