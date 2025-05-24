
import React, { useState } from "react";

const tabs = [
  { label: "Agregar usuario", content: <div className="py-4">Aquí va el formulario para agregar usuarios.</div> },
  { label: "Administrar usuarios", content: <div className="py-4">Aquí va el CRUD de usuarios.</div> },
];

export default function UsersTabs() {
  const [tab, setTab] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-xl mx-auto mt-8">
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            onClick={() => setTab(idx)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === idx ? "border-b-2 border-gray-800 text-gray-900" : "text-gray-500"
            } transition`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[tab].content}</div>
    </div>
  );
}