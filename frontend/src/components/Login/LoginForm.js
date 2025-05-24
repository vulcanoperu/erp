import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const API_URL = "http://localhost:4000/api/auth";

export default function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [showRecover, setShowRecover] = useState(false);

  // Recuperar contraseña
  const [recoverStep, setRecoverStep] = useState(1);
  const [recoverUser, setRecoverUser] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [recoverAnswer, setRecoverAnswer] = useState("");
  const [recoverError, setRecoverError] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error de autenticación");
      localStorage.setItem("auth", "1");
      if (onLogin) onLogin();
      window.location.href = "/home";
    } catch (err) {
      setError(err.message);
    }
  };

  // Paso 1: Obtener pregunta secreta
  const handleGetPregunta = async (e) => {
    e.preventDefault();
    setRecoverError("");
    setPregunta("");
    try {
      const res = await fetch(`${API_URL}/obtener-pregunta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: recoverUser }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Usuario no encontrado");
      setPregunta(data.preguntaSecreta);
      setRecoverStep(2);
    } catch (err) {
      setRecoverError(err.message);
    }
  };

  // Paso 2: Validar respuesta secreta
  const handleValidarRespuesta = async (e) => {
    e.preventDefault();
    setRecoverError("");
    try {
      const res = await fetch(`${API_URL}/validar-respuesta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: recoverUser, respuesta: recoverAnswer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Respuesta incorrecta");
      setRecoverStep(3);
    } catch (err) {
      setRecoverError(err.message);
    }
  };

  // Paso 3: Cambiar clave
  const handleNuevaClave = async (e) => {
    e.preventDefault();
    setRecoverError("");
    try {
      const res = await fetch(`${API_URL}/cambiar-clave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: recoverUser, nuevaClave: newPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cambiar la contraseña");
      setShowRecover(false);
      setRecoverStep(1);
      setRecoverUser("");
      setPregunta("");
      setRecoverAnswer("");
      setNewPass("");
      alert("Contraseña cambiada. Ahora puedes iniciar sesión.");
    } catch (err) {
      setRecoverError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Iniciar sesión</h1>
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Usuario"
          autoFocus
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <div className="relative mb-6">
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 pr-10"
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPass((s) => !s)}
            tabIndex={-1}
          >
            {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-slate-500 text-white py-2 rounded hover:bg-slate-600 transition"
        >
          Entrar
        </button>
        <button
          type="button"
          className="mt-4 text-blue-600 text-xs underline hover:text-blue-800"
          onClick={() => setShowRecover(true)}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>

      {/* MODAL DE RECUPERAR CONTRASEÑA */}
      {showRecover && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm relative">
            <button
              onClick={() => {
                setShowRecover(false);
                setRecoverStep(1);
                setRecoverUser("");
                setPregunta("");
                setRecoverAnswer("");
                setNewPass("");
                setRecoverError("");
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
            {recoverStep === 1 && (
              <form onSubmit={handleGetPregunta}>
                <h2 className="text-lg font-bold mb-4">Recuperar contraseña</h2>
                <input
                  className="w-full mb-3 px-3 py-2 border rounded"
                  placeholder="Usuario"
                  value={recoverUser}
                  onChange={(e) => setRecoverUser(e.target.value)}
                  required
                />
                {recoverError && <div className="text-red-600 mb-2 text-sm">{recoverError}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Obtener pregunta secreta
                </button>
              </form>
            )}
            {recoverStep === 2 && (
              <form onSubmit={handleValidarRespuesta}>
                <h2 className="text-lg font-bold mb-4">Pregunta secreta</h2>
                <div className="mb-3 px-2 py-2 bg-gray-100 rounded text-gray-700 text-sm">
                  {pregunta}
                </div>
                <input
                  className="w-full mb-3 px-3 py-2 border rounded"
                  placeholder="Respuesta secreta"
                  value={recoverAnswer}
                  onChange={(e) => setRecoverAnswer(e.target.value)}
                  required
                />
                {recoverError && <div className="text-red-600 mb-2 text-sm">{recoverError}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Validar respuesta
                </button>
              </form>
            )}
            {recoverStep === 3 && (
              <form onSubmit={handleNuevaClave}>
                <h2 className="text-lg font-bold mb-4">Nueva contraseña</h2>
                <div className="relative mb-4">
                  <input
                    className="w-full px-3 py-2 border rounded pr-10"
                    type={showNewPass ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowNewPass((s) => !s)}
                    tabIndex={-1}
                  >
                    {showNewPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {recoverError && <div className="text-red-600 mb-2 text-sm">{recoverError}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Cambiar contraseña
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}