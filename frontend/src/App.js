import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ConfigHome from "./components/Config/ConfigHome";
import CompanyTabs from "./components/Config/CompanyTabs";
import ThemeTabs from "./components/Config/ThemeTabs";
import UsersTabs from "./components/Config/UsersTabs";
import Login from "./pages/Login";

/**
 * Componente para proteger rutas privadas.
 * Solo permite acceso si existe "auth" en localStorage.
 */
function PrivateRoute({ children }) {
  const auth = localStorage.getItem("auth") === "1";
  const location = useLocation();
  return auth ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Ruta Login pública */}
      <Route path="/login" element={<Login />} />

      {/* Redirección: si el usuario entra por "/", lo llevamos siempre a /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas protegidas */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="/home" element={<Home />} />
              {/* Módulo configuración */}
              <Route path="/config" element={<ConfigHome />} />
              <Route path="/config/company" element={<CompanyTabs />} />
              <Route path="/config/themes" element={<ThemeTabs />} />
              <Route path="/config/users" element={<UsersTabs />} />
              {/* Puedes agregar aquí más rutas privadas */}
            </Routes>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}