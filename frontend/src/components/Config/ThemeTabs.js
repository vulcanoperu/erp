
import React, { useState } from "react";
import SecondaryMenu from "../shared/SecondaryMenu";
import MainMenu from "../shared/MainMenu";
const themes = [
  { name: "Claro", preview: "#F5F6FA" },
  { name: "Oscuro", preview: "#222C36" },
  { name: "Azul", preview: "#0D47A1" },
  { name: "Verde", preview: "#14532D" },
  { name: "Rojo", preview: "#B91C1C" },
  { name: "Morado", preview: "#4B006E" },
  { name: "Naranja", preview: "#D97706" },
  { name: "Celeste", preview: "#0369A1" },
  { name: "Gris", preview: "#374151" },
  { name: "Minimal", preview: "#FFFFFF" },
];

const fonts = ["Inter", "Roboto", "Montserrat", "Open Sans", "Lato", "Nunito", "Poppins", "Raleway", "Source Sans Pro", "Ubuntu"];

export default function ThemeTabs() {
  const [theme, setTheme] = useState(0);
  const [font, setFont] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-gray-800 font-semibold mb-4">Elige un tema</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {themes.map((t, idx) => (
          <button
            key={t.name}
            onClick={() => setTheme(idx)}
            className={`w-12 h-12 rounded border-2 ${theme === idx ? "border-gray-900" : "border-gray-200"} flex items-center justify-center`}
            style={{ background: t.preview }}
            title={t.name}
          />
        ))}
      </div>
      <h2 className="text-gray-800 font-semibold mb-3">Elige tipografía</h2>
      <div className="flex flex-wrap gap-3">
        {fonts.map((f, idx) => (
          <button
            key={f}
            onClick={() => setFont(idx)}
            className={`px-3 py-1 rounded border ${font === idx ? "border-gray-900 bg-gray-100" : "border-gray-200"} text-gray-700`}
            style={{ fontFamily: f }}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}