import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      let result;

      if (isRegister) {
        result = await register(email, password);
        if (result.success) {
          setMessage("✅ Registro exitoso. Cambiando a iniciar sesión...");
          setTimeout(() => {
            setIsRegister(false);
            setEmail("");
            setPassword("");
            setMessage("");
          }, 1500);
        } else {
          setMessage(`❌ ${result.message}`);
        }
      } else {
        result = await login(email, password);
        if (result.success) {
          setMessage("✅ Inicio de sesión exitoso. Redirigiendo...");
          setTimeout(() => {
            navigate("/HistorialClinicaPage");
          }, 1000);
        } else {
          setMessage(`❌ ${result.message}`);
        }
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Logo/Header */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <span className="text-3xl">🐾</span>
        <h1 className="text-white text-2xl font-bold">LaikaVet</h1>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
            </h2>
            <p className="text-gray-400">
              {isRegister
                ? "Regístrate para acceder a LaikaVet"
                : "Accede a tu cuenta de LaikaVet"}
            </p>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes("✅")
                  ? "bg-green-900 text-green-200"
                  : "bg-red-900 text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </>
              ) : isRegister ? (
                "Registrarse"
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">O</span>
            </div>
          </div>

          {/* Botón para cambiar entre login/registro */}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
              setEmail("");
              setPassword("");
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition duration-200 border border-gray-600"
          >
            {isRegister
              ? "¿Ya tienes cuenta? Inicia Sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          LaikaVet © 2025 - Sistema de Gestión Veterinaria
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
