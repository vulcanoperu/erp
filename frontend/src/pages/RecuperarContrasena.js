import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const RecuperarContrasena = () => {
  const [usuario, setUsuario] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [paso, setPaso] = useState(1); // 1: usuario, 2: pregunta, 3: nueva clave
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    setError(""); setExito("");
    try {
      const resp = await fetch(`${API_URL}/pregunta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Usuario no encontrado");
      setPregunta(data.pregunta);
      setPaso(2);
    } catch (err) {
      setError(err.message || "Error de conexión.");
    }
  };

  const handleRespuestaSubmit = async (e) => {
    e.preventDefault();
    setError(""); setExito("");
    try {
      const resp = await fetch(`${API_URL}/validar-respuesta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, respuesta }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Respuesta incorrecta");
      setPaso(3);
    } catch (err) {
      setError(err.message || "Error de conexión.");
    }
  };

  const handleNuevaClaveSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (nuevaClave.length < 3) {
      setError("La nueva contraseña debe tener al menos 3 caracteres.");
      return;
    }
    try {
      const resp = await fetch(`${API_URL}/cambiar-clave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, nuevaClave }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "No se pudo cambiar la contraseña");
      setExito("¡Contraseña restablecida con éxito! Ya puedes ingresar con tu nueva clave.");
      setPaso(4);
    } catch (err) {
      setError(err.message || "Error de conexión.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
      {paso === 1 && (
        <form onSubmit={handleUsuarioSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full border rounded px-3 py-2"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        </form>
      )}
      {paso === 2 && (
        <form onSubmit={handleRespuestaSubmit} className="space-y-4">
          <label className="block text-gray-700 mb-2">{pregunta}</label>
          <input
            type="text"
            placeholder="Respuesta secreta"
            className="w-full border rounded px-3 py-2"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        </form>
      )}
      {paso === 3 && (
        <form onSubmit={handleNuevaClaveSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full border rounded px-3 py-2"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          >
            Guardar nueva contraseña
          </button>
        </form>
      )}
      {paso === 4 && exito && (
        <div className="text-green-600 text-center mb-4">{exito}</div>
      )}
      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
};

export default RecuperarContrasena;