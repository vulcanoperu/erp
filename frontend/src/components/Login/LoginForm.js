import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: username, clave: password }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Usuario o contraseña incorrectos.");
      }
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full border rounded px-3 py-2 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPass ? (
              // ojo abierto
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9C6.477 3 2 7.03 2 12s4.477 9 10 9 10-4.03 10-9-4.477-9-10-9z" /></svg>
            ) : (
              // ojo cerrado
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                strokeLinejoin="round" strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-9a9.96 9.96 0 012.181-6.263M3.98 8.2A9.956 9.956 0 012 12c0 4.97 4 9 10 9 2.127 0 4.113-.666 5.719-1.825m1.292-1.433A9.953 9.953 0 0022 12c0-4.97-4.477-9-10-9-1.274 0-2.492.238-3.602.67M21 21L3 3" /></svg>
            )}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/recuperar-contraseña"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;