import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import Config from "./pages/Config";
import RecuperarContrasena from "./pages/RecuperarContrasena";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContrasena />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/config" element={<Config />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div className="text-center mt-10 text-2xl">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;