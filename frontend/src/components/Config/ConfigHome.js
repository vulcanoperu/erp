import SecondaryMenu from "../shared/SecondaryMenu";
import MainMenu from "../shared/MainMenu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PiBuildingsLight, PiPaletteLight, PiUsersLight } from "react-icons/pi";


const cards = [
  {
    icon: <PiBuildingsLight size={36} className="text-slate-500" />,
    title: "Datos de mi empresa",
    description: "Información fiscal, contacto, logo, etc.",
    route: "/config/company",
  },
  {
    icon: <PiPaletteLight size={36} className="text-slate-500" />,
    title: "Temas",
    description: "Colores y tipografía del sistema.",
    route: "/config/themes",
  },
  {
    icon: <PiUsersLight size={36} className="text-slate-500" />,
    title: "Usuarios",
    description: "Agregar y administrar usuarios.",
    route: "/config/users",
  },
];

export default function ConfigHome() {
  const navigate = useNavigate();

  return (
    <div>
      <SecondaryMenu />
      <MainMenu />
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-wrap gap-8 justify-center">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate(card.route)}
              className="flex flex-col items-center bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-56 mx-2 hover:bg-gray-100 hover:border-gray-400 transition cursor-pointer group"
            >
              <span className="mb-2 group-hover:scale-110 transition">{card.icon}</span>
              <span className="mt-1 text-lg font-medium text-gray-800 group-hover:text-gray-900">{card.title}</span>
              <span className="text-sm text-gray-500 mt-2 text-center">{card.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}